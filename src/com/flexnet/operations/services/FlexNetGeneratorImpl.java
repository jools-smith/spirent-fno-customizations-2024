/*
 * COPYRIGHT (C) 2009 by Flexera Software LLC.
 * This software has been provided pursuant to a License Agreement
 * containing restrictions on its use.  This software contains
 * valuable trade secrets and proprietary information of
 * Flexera Software LLC and is protected by law.  It may
 * not be copied or distributed in any form or medium, disclosed
 * to third parties, reverse engineered or used in any manner not
 * provided for in said License Agreement except with the prior
 * written authorization from Flexera Software LLC.
 *
 * Created on Jul 20, 2004
 *
 */

package com.flexnet.operations.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.regex.Pattern;

import com.flexnet.operations.api.ILicenseTechnology;
import com.flexnet.operations.bizobjects.ActivationInstance;
import com.flexnet.operations.exceptions.GeneratorValidationException;
import com.flexnet.operations.generator.FlexConsolidator;
import com.flexnet.operations.publicapi.AttributeSet;
import com.flexnet.operations.publicapi.ConsolidatedLicenseResponse;
import com.flexnet.operations.publicapi.CustomAttributeDescriptor;
import com.flexnet.operations.publicapi.Feature;
import com.flexnet.operations.publicapi.FlexFilenameGenerator;
import com.flexnet.operations.publicapi.FulfillmentRecord;
import com.flexnet.operations.publicapi.GeneratorRequest;
import com.flexnet.operations.publicapi.GeneratorResponse;
import com.flexnet.operations.publicapi.LicenseConsolidator;
import com.flexnet.operations.publicapi.LicenseFileDefinition;
import com.flexnet.operations.publicapi.LicenseGeneratorConfig;
import com.flexnet.operations.publicapi.LicenseGeneratorService;
import com.flexnet.operations.publicapi.LicenseGeneratorValidator;
import com.flexnet.operations.publicapi.LicenseModel;
import com.flexnet.operations.publicapi.LicensedItem;
import com.flexnet.operations.publicapi.MultipleLicenseFilenameGenerator;
import com.flexnet.operations.publicapi.OperationsException;
import com.flexnet.operations.publicapi.Product;
import com.flexnet.operations.trusted.TrustedActivationInstance;
import com.flexnet.platform.config.AppConfigUtil;
import com.flexnet.platform.exceptions.FlexnetBaseException;
import com.flexnet.platform.exceptions.FlexnetBaseRuntimeException;
import com.flexnet.products.bizobjects.ClientUniquenessEncoder;
import com.flexnet.products.bizobjects.LicenseModelBO;
import com.flexnet.products.bizobjects.LicenseTechnologyBO;
import com.flexnet.products.bizobjects.LicensedProduct;
import com.flexnet.products.bizobjects.Orderable;
import com.flexnet.products.bizobjects.FeatureBundle;
/** Revenera GCS 2024.12.10 */
import com.spirent.fno.utils.Customization;
import com.spirent.fno.utils.SpirentUtils;
/** end */

public class FlexNetGeneratorImpl implements LicenseGeneratorService, LicenseGeneratorValidator,
        LicenseConsolidator {
    static public final String PACKAGE_OPTION_NONE = LicenseModelBO.PACKAGE_NONE;
    static public final String PACKAGE_OPTION_PACKAGE = LicenseModelBO.PACKAGE_BASIC;
    static public final String PACKAGE_OPTION_SUITE = LicenseModelBO.PACKAGE_SUITE;
    static public final String PACKAGE_OPTION_SUITE_RESERVED = LicenseModelBO.PACKAGE_SUITE_RESERVED;

    // patterns to validate feature/package names and versions
    private static Pattern featurePat = Pattern.compile("[\\p{Alnum}_\\-\\@\\+\\$%&\\.,]+");
    private static Pattern versionPat = Pattern.compile("\\d+(\\.\\d+)?");

    private static FlexFilenameGenerator filenameGen = null;

    static {
        configureFilenameGenerator();
    }

    public void generateLicense(GeneratorRequest request, GeneratorResponse response)
            throws OperationsException {
        try {
            FlexVcg vcg = new FlexVcg(request);
            String licText = vcg.generateCertificate();
            response.setLicenseText(licText);

            // populate the license text in the response
            Map<LicenseFileDefinition, Object> licFiles = new HashMap<LicenseFileDefinition, Object>();
            ILicenseTechnology licTech = (ILicenseTechnology)request.getLicenseTechnology();
            if (licTech != null) {
                LicenseFileDefinition lfd = licTech
                        .getLicenseFileDefinitionByName(LicenseTechnologyBO.FLEXNET_TEXT_FILE_DEFINITION_NAME);
                licFiles.put(lfd, licText);
            }
            response.setLicenseFiles(licFiles);

            if (filenameGen != null) {
                String filename = filenameGen.generateFulfillmentFilename(request);
                response.setLicenseFileName(filename);
            }
        }
        catch (Exception ex) {
            response.setErrorThrown(ex);
        }
    }

    public void validateLicenseModel(LicenseModel model) throws OperationsException {
        try {
            LicenseModelImpl impl = (LicenseModelImpl)model;
            LicenseModelBO mdl = impl.getLicenseModel();

            if (PACKAGE_OPTION_SUITE.equals(mdl.getPackageOption())) {
                /* Fixes to FNO-14122 and FNO-14817 */
                if (mdl.isTrustedType() && mdl.isServedConcurrent()) {
                    // ignore this check for Floating-Borrow & Floating-Concurrent Licenses
                }
                else if (!mdl.isCountedCertificate()) {
                    throw new GeneratorValidationException("packageOption",
                            "FLEXlm_UncountedSuiteInvalid", new Object[] { mdl.getName() });
                }
            }
            if (PACKAGE_OPTION_SUITE_RESERVED.equals(mdl.getPackageOption())) {
                if (!mdl.isServedConcurrent()) {
                    throw new GeneratorValidationException("packageOption",
                            "FLEXlm_UncountedSuiteInvalid", new Object[] { model.getName() });
                }
                if (mdl.getDupGrouping() == null
                        || mdl.getDupGrouping().equals(ClientUniquenessEncoder.NONE)) {
                    throw new GeneratorValidationException("dupGrouping",
                            "FLEXlm_SuiteReservedRequiresDupGroup",
                            new Object[] { model.getName() });
                }
            }
            // TODO don't allow TS_OK or FLOAT_OK unless model.isCounted() && ! model.isFloating()
            // TODO if ! model.isCounted() don't allow HOST_BASED,USER_BASED,
            // BORROW, OVERDRAFT, DUP_GROUP
        }
        catch (FlexnetBaseRuntimeException ex) {
            throw new OperationsException(ex);
        }
    }

    public void validateProduct(Product product) throws OperationsException {
        try {
            if (product.isLicensedProduct() || product.isSuite()) {
                LicensedItem pItem = (LicensedItem)product;
                Feature[] features = pItem.getUniqueFeatures();
                Set featureSet = null;
                int featurecount = features.length ;
                LicensedProduct order = null;
                Orderable orderable =  null;
                Set<FeatureBundle> featureBundle = null;
                if(product.getId()!=null && features.length == 0) {
                    orderable = Orderable.getByID(new Long(product.getId()));
                	if(orderable!=null && orderable.isLicensedProduct()) {
                		order = (LicensedProduct)orderable;
                		featureBundle  = order.getFeatureBundleSet();
                	}
					if (order != null) {
						featureSet = order.getFeatureSet();
					}

					featurecount = featureSet != null ? featureSet.size() : 0;
                }
                if (product.isDeployed()) {
                	if((orderable !=null && orderable.isLicensedProduct()) && ( featurecount==0 && featureBundle.isEmpty()))
                    throw UtilityService.makeOperationsException(
                            "ValidateProduct.emptyFeatureList", new Object[] { product.getName() });
                }
                for (int fx = 0; fx < features.length; fx++) {
                    Feature feature = features[fx];
                    validateFeature(feature);
                }
                LicenseModel[] models = pItem.getLicenseModels();
                LicenseModel packageModel = null;
                for (int ix = 0; ix < models.length && packageModel == null; ix++) {
                    LicenseModel model = models[ix];
                    LicenseModelImpl impl = (LicenseModelImpl)model;
                    LicenseModelBO mdl = impl.getLicenseModel();
                    String packageOption = mdl.getPackageOption();
                    if (packageOption.equals(PACKAGE_OPTION_SUITE)
                            || packageOption.equals(PACKAGE_OPTION_SUITE_RESERVED)
                            || packageOption.equals(PACKAGE_OPTION_PACKAGE)) {
                        packageModel = model;
                    }
                }

                String pkgName = pItem.getPackageName();
                if (pkgName == null || pkgName.trim().equals("")) {
                    if (packageModel != null) {
                        // product must define a package name
                        throw new GeneratorValidationException("packageName",
                                "FLEXlm_ModelRequiresPackageName", new Object[] {
                                        product.getName(), packageModel.getName() });
                    }
                }
                else {
                    // validate package name/version even if there aren't any package models yet
                    // a package name must be a valid feature name
                    if (!featurePat.matcher(pkgName).matches())
                        throw new GeneratorValidationException("pkgName",
                                "FLEXlm_InvalidPackageName", new Object[] { pkgName,
                                        product.getName() });
                    if (pkgName.length() > 30)
                        throw new GeneratorValidationException("pkgName",
                                "FLEXlm_PackageNameTooLong", new Object[] { pkgName,
                                        product.getName() });
                    String pkgVersion = pItem.getPackageVersion();
                    if (!pItem.isDateBasedPackageVersion()) {
                        if (!versionPat.matcher(pkgVersion).matches())
                            throw new GeneratorValidationException("version",
                                    "FLEXlm_InvalidPackageVersion", new Object[] { pkgVersion,
                                            product.getName() });
                        if (pkgVersion.length() > 10)
                            throw new GeneratorValidationException("version",
                                    "FLEXlm_PackageVersionTooLong", new Object[] { pkgVersion,
                                            product.getName() });
                    }
                }

                if (packageModel != null) {
                    // require all packages to have uniform counts
                    // i.e. cardinality of all contained features must be the same
                    int cardinality = 0;
                    for (int ix = 0; ix < features.length; ix++) {
                        Feature feature = features[ix];
                        int count = pItem.getUniqueFeatureCount(feature);
                        if (cardinality == 0)
                            cardinality = count;
                        else if (cardinality != count) {
                            throw new GeneratorValidationException("count",
                                    "FLEXlm_InvalidSuitePackageCounts", new Object[] {
                                            product.getName(), packageModel.getName() });
                        }
                    }
                }
            }
        }
        catch (FlexnetBaseRuntimeException | FlexnetBaseException ex) {
            throw new OperationsException(ex);
        }
    }

    public void validateFeature(Feature feature) throws OperationsException {
        try {
            //String name = feature.getName();
            @Customization("2024-12-10")
            final String name = SpirentUtils.removeSpirentSuffix(feature.getName());

            if (!featurePat.matcher(name).matches())
                throw new GeneratorValidationException("name", "FLEXlm_InvalidFeatureName",
                        new Object[] { name });
            if (name.length() > 30)
                throw new GeneratorValidationException("name", "FLEXlm_FeatureNameTooLong",
                        new Object[] { name });
            if (!feature.isDateBasedVersion()) {
                String version = feature.getVersion();

                if (!versionPat.matcher(version).matches())
                    throw new GeneratorValidationException("version", "FLEXlm_InvalidVersion",
                            new Object[] { version, name });
                if (version.length() > 10)
                    throw new GeneratorValidationException("version", "FLEXlm_VersionTooLong",
                            new Object[] { version, name });
            }
        }
        catch (FlexnetBaseRuntimeException ex) {
            throw new OperationsException(ex);
        }
    }

    public void init(LicenseGeneratorConfig config) {}

    public boolean isEmergencyAllowed() {
        // TODO Auto-generated method stub
        return true;
    }

    public boolean isPublisherErrorCorrectionAllowed() {
        // TODO Auto-generated method stub
        return true;
    }

    public boolean isRehostAllowed() {
        // TODO Auto-generated method stub
        return true;
    }

    public boolean isRepairAllowed() {
        // TODO Auto-generated method stub
        return true;
    }

    public boolean isReturnAllowed() {
        // TODO Auto-generated method stub
        return true;
    }

    public boolean isStopGapAllowed() {
        // TODO Auto-generated method stub
        return true;
    }

    public boolean isUpgradeAllowed() {
        // TODO Auto-generated method stub
        return true;
    }

    public void verifyRequest(GeneratorRequest request, GeneratorResponse response)
            throws OperationsException {
        generateLicense(request, response);
    }

    public ConsolidatedLicenseResponse[] consolidateFulfillments(FulfillmentRecord[] fulfillments)
            throws OperationsException {
        try {
            FlexConsolidator fxc = new FlexConsolidator();
            for (int fx = 0; fx < fulfillments.length; fx++) {
                ActivationInstance activationRecord = (ActivationInstance)ActivationInstance
                        .getActivationinstanceFromFulfillmentRecord(fulfillments[fx]);
                if (activationRecord instanceof TrustedActivationInstance) {
                    throw UtilityService.makeOperationsException(
                            "FlexNetGenerator.cannotConsolidatedTrustedActivations",
                            new Object[] { activationRecord.getFulfillmentId() });
                }
                fxc.add(activationRecord);
            }
            ConsolidatedLicenseResponse[] files = fxc.consolidate();
            if (files == null || files.length == 0)
                return null;

            // generate the attachement file names by calling custom name generator
            ILicenseTechnology ilt = (ILicenseTechnology)fulfillments[0].getLicenseTechnology();
            MultipleLicenseFilenameGenerator multipleFilenameGen = ilt
                    .getMultipleLicenseFilenameGeneratorInterface();

            for (int ii = 0; ii < files.length; ii++) {
                if (multipleFilenameGen != null) {
                    Map<LicenseFileDefinition, String> filenames = multipleFilenameGen
                            .generateConsolidatedLicenseFilenames(files[ii]);
                    files[ii].setLicenseFilenames(filenames);
                }
                // backwards compatibility
                else if (filenameGen != null) {
                    String filename = filenameGen.generateConsolidatedLicenseFilename(files[ii]);
                    Map<LicenseFileDefinition, String> fileNames = new HashMap<LicenseFileDefinition, String>();
                    LicenseFileDefinition dto = ilt
                            .getLicenseFileDefinitionByName(LicenseTechnologyBO.FLEXNET_TEXT_FILE_DEFINITION_NAME);
                    fileNames.put(dto, filename);
                    files[ii].setLicenseFileName(filename);
                    files[ii].setLicenseFilenames(fileNames);
                }
            }

            return files;
        }
        catch (FlexnetBaseException ex) {
            throw new OperationsException(ex);
        }
    }

    private static final String DEFAULT_TRUSTED_HOSTID = "INTERNET=0.0.0.0";

    /**
     * Determine which trusted host ID to use for a product.
     *
     * @param product
     *            Product to check.
     * @return The host ID string to use for trusted activations of this product.
     * @throws OperationsException
     *             If an unexpected error occurs accessing the product's configuration.
     */
    static public String getTrustedHostId(Product product) throws OperationsException {
        LicenseGeneratorConfig licGenConfig = product.getLicenseGeneratorConfiguration();
        AttributeSet attributes = licGenConfig.getAttributes();
        CustomAttributeDescriptor descriptor = attributes.getDescriptor("TRUSTED_HOST_ID");
        String trustedHostId = attributes.getStringValue(descriptor);
        if (null == trustedHostId || "".equals(trustedHostId.trim())) {
            trustedHostId = DEFAULT_TRUSTED_HOSTID;
        }
        return trustedHostId;

    }

    static private FlexFilenameGenerator configureFilenameGenerator() {
        if (filenameGen == null) {
            String generatorClassName = null;
            try {
                generatorClassName = AppConfigUtil
                        .getConfigString("ops.flex.filenamegenerator.classname");
                filenameGen = (FlexFilenameGenerator)Class.forName(generatorClassName)
                        .newInstance();
            }
            catch (Exception e) {
                return null;
            }

        }

        return filenameGen;
    }

}