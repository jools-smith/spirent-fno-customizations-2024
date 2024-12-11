/*
 * COPYRIGHT (C) 2009 by Flexera Software LLC. This software has been provided
 * pursuant to a License Agreement containing restrictions on its use. This
 * software contains valuable trade secrets and proprietary information of
 * Flexera Software LLC and is protected by law. It may not be copied or
 * distributed in any form or medium, disclosed to third parties, reverse
 * engineered or used in any manner not provided for in said License Agreement
 * except with the prior written authorization from Flexera Software LLC.
 */

package com.flexnet.operationsportal.web.actions.activations;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;

import javax.mail.MessagingException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.flexnet.operations.bizobjects.entitlements.ActivatableMaintenanceBO;
import com.flexnet.operations.services.FlexUtil;
import com.flexnet.platform.config.data.ViewEntitledDownloadFilesPageItemServiceConfig;
import com.flexnet.platform.web.utils.*;
import com.spirent.fno.utils.Customization;
import com.spirent.fno.utils.SpirentUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionRedirect;
import org.apache.struts.action.ActionError;
import com.flexerasoftware.esd.esdservice.CheckDownloadPackagesRequest;
import com.flexerasoftware.esd.esdservice.CheckDownloadPackagesResponse;
import com.flexnet.operations.OperationsInitializer;
import com.flexnet.operations.api.IAttributeSet;
import com.flexnet.operations.api.IBulkEntitlement;
import com.flexnet.operations.api.IEntitlement;
import com.flexnet.operations.api.IEntitlementLineItem;
import com.flexnet.operations.api.IEntitlementManager;
import com.flexnet.operations.api.IFlexnetLicenseModel;
import com.flexnet.operations.api.IFulfillmentManager;
import com.flexnet.operations.api.IOperationsQuery;
import com.flexnet.operations.api.IOperatorENC;
import com.flexnet.operations.api.IPartNumber;
import com.flexnet.operations.api.IPartnerOrgManager;
import com.flexnet.operations.api.IProduct;
import com.flexnet.operations.api.IQueryParameterENC;
import com.flexnet.operations.api.IResultsList;
import com.flexnet.operations.api.ISimpleEntitlement;
import com.flexnet.operations.api.ISplitManager;
import com.flexnet.operations.api.IUpgradeUtility;
import com.flexnet.operations.api.IWebRegKey;
import com.flexnet.operations.bizobjects.MaintenanceItemDO;
import com.flexnet.operations.bizobjects.PortalConfigBO;
import com.flexnet.operations.bizobjects.entitlements.BulkEntitlementBO;
import com.flexnet.operations.bizobjects.entitlements.EntitlementLineItemBO;
import com.flexnet.operations.publicapi.CustomAttributeDescriptor;
import com.flexnet.operations.publicapi.CustomHostId;
import com.flexnet.operations.publicapi.Duration;
import com.flexnet.operations.publicapi.Entitlement;
import com.flexnet.operations.publicapi.FulfillmentHelper;
import com.flexnet.operations.publicapi.FulfillmentRequestTypeENC;
import com.flexnet.operations.publicapi.FulfillmentSourceENC;
import com.flexnet.operations.publicapi.LicenseHostId;
import com.flexnet.operations.publicapi.LicenseHostIdPolicy;
import com.flexnet.operations.publicapi.LicenseLifecyclePolicy;
import com.flexnet.operations.publicapi.LicenseModel;
import com.flexnet.operations.publicapi.LicenseTechnology;
import com.flexnet.operations.publicapi.NodeLockedHostId;
import com.flexnet.operations.publicapi.OperationsException;
import com.flexnet.operations.publicapi.OperationsServiceFactory;
import com.flexnet.operations.publicapi.Product;
import com.flexnet.operations.publicapi.ServerHostId;
import com.flexnet.operations.publicapi.StartDateOptionsENC;
import com.flexnet.operations.publicapi.VersionDateOptionsENC;
import com.flexnet.operations.server.dto.trusted.TrustedLineItemDTO;
import com.flexnet.operations.server.dto.trusted.TrustedRequestDTO;
import com.flexnet.operations.server.springbo.trusted.IManageTrustedService;
import com.flexnet.operations.services.ActivatableItemsLandingConfigData;
import com.flexnet.operations.services.LicenseTechnologyHostAttributeImpl;
import com.flexnet.operations.services.email.GetEmailTemplateContentResponse;
import com.flexnet.operations.util.ApplicationUtility;
import com.flexnet.operations.web.actions.OperationsBaseAction;
import com.flexnet.operations.web.actions.product.FlexGeneratorHelper;
import com.flexnet.operations.web.beans.ActivatableItemPropertiesBean;
import com.flexnet.operations.web.beans.BatchActivationStateBean;
import com.flexnet.operations.web.beans.ChannelPartnerBean;
import com.flexnet.operations.web.beans.ChildLineItemActivationStateBean;
import com.flexnet.operations.web.beans.EntitlementsStateBean;
import com.flexnet.operations.web.beans.MaintenanceItemPropertiesBean;
import com.flexnet.operations.web.beans.PaginationAttributesBean;
import com.flexnet.operations.web.beans.PortalStateBean;
import com.flexnet.operations.web.beans.SupportLicensesStateBean;
import com.flexnet.operations.web.beans.TransferLineItemStateBean;
import com.flexnet.operations.web.beans.UICustomizerBean;
import com.flexnet.operations.web.forms.OperationsBaseForm.ColumnInfo;
import com.flexnet.operations.web.forms.product.ProductBean;
import com.flexnet.operations.web.util.CommonUtils;
import com.flexnet.operations.web.util.SessionUtils;
import com.flexnet.operations.web.util.UIUtils;
import com.flexnet.operationsportal.services.ESDService;
import com.flexnet.operationsportal.web.forms.activations.ActivatableItemsLandingPageForm;
import com.flexnet.operationsportal.web.forms.activations.ActivatableItemsLandingPageForm.ObjectInfo;
import com.flexnet.operationsportal.web.forms.activations.LineItemsPrintDetailsForm;
import com.flexnet.platform.bizobjects.User;
import com.flexnet.platform.config.AppConfigUtil;
import com.flexnet.platform.exceptions.FlexnetBaseException;
import com.flexnet.platform.exceptions.FlexnetBaseRuntimeException;
import com.flexnet.platform.exceptions.FlexnetReadOnlyUserException;
import com.flexnet.platform.exceptions.NoDataFoundException;
import com.flexnet.platform.exceptions.SpringBeanException;
import com.flexnet.platform.services.internationalization.InternationalizationService;
import com.flexnet.platform.services.logging.LogMessage;
import com.flexnet.platform.util.PermissionUtil;
import com.flexnet.platform.web.actions.ActionsConstants;
import com.flexnet.products.exceptions.PRDBaseException;
import com.flexnet.products.publicapi.IPermissionENC;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.URL;
import java.util.function.Function;

import org.apache.struts.action.ActionErrors;

public class ActivatableItemsLandingPageAction extends OperationsBaseAction {

    private static final String ACTIVATABLE_IDS = "activatableIDs";

    private static final String UNIFIED_HOST_VIEW = "unifiedHost_view";

    private static final String FORWARD_RELATED_VIEW = "relatedLineItemsView";
    
    public static final String LIST_ENTITLEMENTS = "operationsportal.hideManageEntitlementsLink";
    public static final String TRANSFER_ENTITLEMENTS = "operationsportal.hideTransferEntitlementsButton";
    
    public static final String SPLIT_ENTITLEMENTS = "operationsportal.hideSplitButton";
    
    public static final String SPLIT_BULK_ENTITLEMENTS = "operationsportal.hideEntitlementSplitButton";
    
    public static final String LINE_ITEM_EXPIRATION_DATE = "LINE_ITEM_EXPIRATION_DATE";
    private String orgId="";
    

    private ESDService esd;

    protected String getIDKey() {
        return "id";
    }

    enum Page {
        FIRST, LAST, GOTO
    };

    /*
     * An AJAX request from landing page to get the family of a given line item
     */
    public ActionForward showFamily(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            IOperationsQuery qry = new IOperationsQuery();
            EntitlementsStateBean eBean = SessionUtils.getEntitlementsStateBean(request);

            if (!isShowLineItemsWithZeroCopiesByDefaultWCookie(request)) {
                qry.createQueryParameter(IEntitlement.LINE_ITEM_REMAINING_COPIES_GT_ZERO, null,
                        IOperatorENC.EQUALS);
            }
            //Query parameter to be set to show only un-expired line items.
            if (!isShowExpiredLineItems(request) && isShowUnExpiredLineItems(request)) {
                qry.createQueryParameter((IEntitlement.LINE_ITEM_EXPIRATION_DATE_OR_NULL), FlexUtil.getTodayGMT(), IOperatorENC.GTE);
            }
            //Query parameter to be set to show expired line items.
            else if (isShowExpiredLineItems(request) && !isShowUnExpiredLineItems(request)) {
                qry.createQueryParameter((IEntitlement.LINE_ITEM_EXPIRATION_DATE_NOT_NULL), FlexUtil.getTodayGMT(), IOperatorENC.BEFORE);
                qry.createQueryParameter(IEntitlement.LINE_ITEM_PERMANENT, new Boolean(false),
                        IOperatorENC.EQUALS);
            }
            List<ActivatableItemPropertiesBean> lineItems = entMgr
                    .getRelatedActivatableItemsPropertiesBean(qry, trueForm.getDateFormat(),
                            Long.valueOf(request.getParameter("lineItemId")));
            request.setAttribute("lineItemId", request.getParameter("lineItemId"));
            request.setAttribute("selectOption", request.getParameter("selectOption"));
            request.setAttribute("relatedItems", "true");
            loadFormFromBean(request, trueForm, lineItems);
            SessionUtils.setEntitlementsStateBean(request, eBean);
            response.setHeader("x-ajax-response-status", "success");
        }
        catch (FlexnetBaseException | FlexnetBaseRuntimeException | OperationsException ex) {
            rollback();
            response.setHeader("x-ajax-response-status", "error");
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
        }
        return mapping.findForward(FORWARD_RELATED_VIEW);
    }

    public ActionForward view(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException, IllegalStateException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            if (trueForm.getViewAction().equals("Back")) {
                if (lastView(mapping, form, request, response).equals(FORWARD_SUCCESSFUL)) {
                    return mapping.findForward(FORWARD_VIEW);
                }
            }
            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            IOperationsQuery qry = new IOperationsQuery();
            qry.setBatchSize(getPaginationSize());

            if (!isShowLineItemsWithZeroCopiesByDefaultWCookie(request)) {
                qry.createQueryParameter(IEntitlement.LINE_ITEM_REMAINING_COPIES_GT_ZERO, null,
                        IOperatorENC.EQUALS);
            }
            EntitlementsStateBean eBean = SessionUtils.getEntitlementsStateBean(request);
            //Query parameter to be set to show only un-expired line items.
            if (!isShowExpiredLineItems(request) && isShowUnExpiredLineItems(request)) {
                qry.createQueryParameter((IEntitlement.LINE_ITEM_EXPIRATION_DATE_OR_NULL), FlexUtil.getTodayGMT(), IOperatorENC.GTE);
            }
            //Query parameter to be set to show expired line items.
            else if (isShowExpiredLineItems(request) && !isShowUnExpiredLineItems(request)) {
                qry.createQueryParameter((IEntitlement.LINE_ITEM_EXPIRATION_DATE_NOT_NULL), FlexUtil.getTodayGMT(), IOperatorENC.BEFORE);
                qry.createQueryParameter(IEntitlement.LINE_ITEM_PERMANENT, new Boolean(false),
                        IOperatorENC.EQUALS);
            }

            if (!isDoNotSortResultsByDefault()) {
                qry.setSortBy(IEntitlement.LINE_ITEM_LAST_MODIFIED);
                qry.setSortAscending(false);
            }

            if (UIUtils.displayOnlyLeafLineItemsOnly(null)) {
                qry.setListLeafLinesOnly(true);
                request.setAttribute("showLeafNodes", true);
            }

            IResultsList rl = entMgr.getActivatableItemsPropertiesBean(qry,
                    trueForm.getDateFormat());
            List l = rl.nextPage();
            eBean.setActivatableItemsItemSet(rl);
            loadPagingAttributes(request, trueForm, rl, l,
                    eBean.getActivatableItemsPaginationAttributes());
            String searchBy = trueForm.getSearchCategory();
            if (searchBy == null || searchBy.equals("")) {
                trueForm.setSearchCategory("LINE_ITEM_ID");
            }

            // don't return control to the browser if true
            if (constructAjaxResponse(request, response, trueForm, l)) {
                // if this came from EULA or EC cancel it will be shown and
                // then removed from session
                HttpSession session = request.getSession();
                session.setAttribute("errorMsg", "");
                return null;
            }

            loadFormFromBean(request, trueForm, l);
            request.setAttribute("displayCustomAttr", AppConfigUtil
    				.getConfigBoolean("ops.showMaintenanceLine.customAttributes"));
            SessionUtils.setEntitlementsStateBean(request, eBean);
            return mapping.findForward(FORWARD_VIEW);
        }
        catch (FlexnetBaseException | FlexnetBaseRuntimeException | OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_VIEW);
        }
    }

    private boolean constructAjaxResponse(HttpServletRequest req, HttpServletResponse response,
            ActivatableItemsLandingPageForm form, List objects) throws OperationsException,
            FlexnetBaseException {
        response.setContentType("text/html");
        response.setHeader("Cache-Control", "no-cache");
        int maxRecordsAllowed = 5;
        String results = "";
        PrintWriter out = null;
        String finalStr = "";
        List<LandingDataAllLogins> commonData = new ArrayList<LandingDataAllLogins>();

        try {
            // first check the mode
            String mode = req.getParameter("mode");
            if (mode == null)
                return false;
            if (objects.isEmpty()) {
                results = "";
            }
            else {
                int cnt = 0;

                List<String> lineIds = new ArrayList<String>();
                String csv = "";
                Iterator iter = objects.iterator();
                while (iter.hasNext() && maxRecordsAllowed > cnt) {
                    ActivatableItemPropertiesBean o = (ActivatableItemPropertiesBean)iter.next();
                    loadObjectInfoFromBean(req, form, o);
                    LandingDataAllLogins theData = new LandingDataAllLogins(o, form.getDateFormat());
                    commonData.add(theData);
                    cnt++;
                }
                if (cnt > 0) {
                    finalStr = new PopulateStrings().populateResults(commonData);
                }
                form.setHasDataRecords(true);
            }
            out = response.getWriter();
            out.write(finalStr);
        }
        catch (Exception e) {
            results = "";
        }
        if (out != null)
            out.close();
        return true;
    }

    // For the landing page output common to all kinds of logins
    public class LandingDataAllLogins {
        private String activationId;
        private String lastModifiedDate;
        private String productName;
        private String productDescription;
        private String lineId;

        public LandingDataAllLogins(
                ActivatableItemPropertiesBean form, DateFormat df){
            // load product Name
            Map<ProductBean, Integer> prdMap = form.getEntitledOrderables();
            Set<ProductBean> keySet = prdMap.keySet();
            Object[] parms = keySet.toArray();
            ProductBean bean = (ProductBean)parms[0];
            productName = bean.getName();
            productDescription = bean.getDescription();

            // load activation id, lmdate and lineId
            activationId = form.getActivationId();
            lastModifiedDate = df.format(form.getLastModified());
            lineId = form.getId().toString();
        }

        public String getActivationId() {
            return activationId;
        }

        public String getLastModifiedDate() {
            return lastModifiedDate;
        }

        public String getProductName() {
            return productName;
        }

        public String getLineId() {
            return lineId;
        }

		public String getProductDescription() {
			return productDescription;
		}

		public void setProductDescription(String productDescription) {
			this.productDescription = productDescription;
		}
    }

    public class PopulateStrings {
        final String prodQkey = "&productName=";
        final String openCell = "<tr><td>";
        final String actCellOpen = "<tr><td><a title='";
        final String anchorOpen = "' href=JavaScript:ep.lineItemDetailsPopup('";
        final String anchorClose = "'); ";
        final String classLink = "class='truncate'>";
        final String closeAnchor = "</a>";
        final String closeCell = "</td></tr>";
        final String closeCol = "</td><td>";

        public String populateResults(List<LandingDataAllLogins> commonData) {
            String str = "";

            for (LandingDataAllLogins theData : commonData) {
                str += actCellOpen + theData.getActivationId() + anchorOpen + theData.getLineId()
                        + anchorClose + classLink + theData.getActivationId() + closeAnchor
                        + closeCol + theData.getProductName() + closeCol
                        + theData.getProductDescription() + closeCol
                        + theData.getLastModifiedDate() + closeCell;
            }
            return str;
        }
    }

    protected void loadFormFromBean(HttpServletRequest request,
            ActivatableItemsLandingPageForm trueForm, List objects) throws OperationsException,
            FlexnetBaseException {
        List<String> totalLicenses = new ArrayList<String>();
        if (objects.isEmpty()) {
            loadObjectInfoFromBean(request, trueForm, null);
            trueForm.setHasDataRecords(false);
        }
        else {
            List<String> actIds = new ArrayList<String>();
            Iterator iter = objects.iterator();
            while (iter.hasNext()) {
                ActivatableItemPropertiesBean o = (ActivatableItemPropertiesBean)iter.next();
                loadObjectInfoFromBean(request, trueForm, o);
                totalLicenses.add(Integer.toString(o.getSeatCount()));
                actIds.add(o.getActivationId());
            }
            trueForm.setHasDataRecords(true);
            setHasDownloads(request, actIds, trueForm);
            // grab total licenses outofband and insert into page.
            // Should convert this to a requestScope var at a later time.
            String[] licArray = totalLicenses.toArray(new String[0]);
            request.setAttribute("totalLicenses", licArray);
            request.setAttribute("displayCustomAttr", AppConfigUtil
					.getConfigBoolean("ops.showMaintenanceLine.customAttributes"));
        }
    }

    public ESDService getESDService() {
        if (esd == null) {
            try {
                esd = (ESDService)SpringBeanFactory.getInstance().getBean("esdServiceClient");
            }
            catch (SpringBeanException e) {
                logger.error(new LogMessage("Unable to get ESDService"), e);
                e.printStackTrace();
            }
        }
        return esd;
    }

    private void setHasDownloads(HttpServletRequest request, List<String> actIds,
            ActivatableItemsLandingPageForm trueForm) {

        trueForm.setHasDownloads(false);
        PortalStateBean psb = SessionUtils.getPortalStateBean(request);
        UICustomizerBean cbean = psb.getCustomizerBean();
        if (psb.isLoggedInWithEntitlementID || cbean.isHideDownloadLink()) {
            return;
        }

        List objects = trueForm.getObjects();
        CheckDownloadPackagesRequest req = new CheckDownloadPackagesRequest();
        if(SpringBeanFactory.getInstance().getBean(ViewEntitledDownloadFilesPageItemServiceConfig.class).isGeoLocationIsEnabled()) {
            final String[] orgCountryRegion = OrganizationHelper.getOrgCountryRegion(orgId ,logger);
            if (orgCountryRegion.length > 0) {
                if (!StringUtils.isBlank(orgCountryRegion[0]))
                    req.setOrganizationCountryName(orgCountryRegion[0]);
                if (!StringUtils.isBlank(orgCountryRegion[1]))
                    req.setOrganizationRegionName(orgCountryRegion[1]);
            }
        }
        req.getActivationId().addAll(actIds);
        CheckDownloadPackagesResponse resp;
        try {
            resp = getESDService().checkDownloadPackages(req);

        }
        catch (Exception e) {
            logger.error(new LogMessage(
                    "Exception while checking entitlement for download packages"), e);
            return;
        }
        // Workings of this method depend on the order of activation ids:
        // 1. The order of objects in the Form must be the same as the order of
        // actIds
        // 2. The order of the activation ids in the response must be the same.
        // We trust that 1. is the case because we built the two lists at the
        // same time
        // We will do a sanity check for 2:
        if (actIds.size() != resp.getActivationId().size()
                || actIds.size() != resp.getHasDownloadablePackages().size()) {
            logger.error(new LogMessage(
                    "Invalid response received from ESD service when checking "
                            + "download packages (unequal sizes od activation ids and download package flag lists)"));
            return;
        }
        Iterator<Boolean> hasDnldPkgIter = resp.getHasDownloadablePackages().iterator();
        Iterator<String> respActIdIter = resp.getActivationId().iterator();
        Iterator<String> actIdIter = actIds.iterator();
        for (Iterator<ObjectInfo> objIter = objects.iterator(); objIter.hasNext();) {
            ObjectInfo obj = objIter.next();
            String actId = actIdIter.next();
            String respActId = respActIdIter.next();
            if (!actId.equals(respActId)) {
                logger.error(new LogMessage(
                        "Invalid response received from ESD service when checking "
                                + "download packages (activation ids in response and request differ)"));
                return;
            }
            Boolean hasDownloads = hasDnldPkgIter.next();
            obj.setHasDownloads(hasDownloads);
            if (hasDownloads) {
                trueForm.setHasDownloads(true);
            }
        }

    }

    private void setLeafNodeDisplay(HttpServletRequest request, IOperationsQuery query)
            throws FlexnetBaseException {
        if (UIUtils.displayOnlyLeafLineItemsOnly(query)) {
            request.setAttribute("showLeafNodes", true);
        }
    }

    public ActionForward nextPage(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException, PRDBaseException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            EntitlementsStateBean eBean = SessionUtils.getEntitlementsStateBean(request);
            IResultsList rl = eBean.getActivatableItemsItemSet();
            List l = rl.nextPage();
            PaginationAttributesBean paBean = eBean.getActivatableItemsPaginationAttributes();
            paBean.setHasNext(rl.hasNextPage());
            paBean.setHasPrevious(rl.hasPrevPage());
            paBean.setTotalNumberOfPages(rl.getTotalNumberOfPages());
            paBean.setCurrentPageNumber(rl.getCurrentPageNumber());
            eBean.setActivatableItemsPaginationAttributes(paBean);
            loadPagingAttributes(request, trueForm, rl, l,
                    eBean.getActivatableItemsPaginationAttributes());
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, eBean);
            setLeafNodeDisplay(request, rl.getQuery());
            //method calls to set filter checkbox selection of list entitlements based on cookie values.
            isShowLineItemsWithZeroCopiesByDefaultWCookie(request);
            isShowExpiredLineItems(request);
            isShowUnExpiredLineItems(request);
            return mapping.findForward(FORWARD_SUCCESSFUL);          
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward previousPage(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException, PRDBaseException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            EntitlementsStateBean eBean = SessionUtils.getEntitlementsStateBean(request);
            IResultsList rl = eBean.getActivatableItemsItemSet();
            List l = rl.prevPage();
            loadPagingAttributes(request, trueForm, rl, l,
                    eBean.getActivatableItemsPaginationAttributes());
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, eBean);
            setLeafNodeDisplay(request, rl.getQuery());
            //method calls to set filter checkbox selection of list entitlements based on cookie values.
            isShowLineItemsWithZeroCopiesByDefaultWCookie(request);
            isShowExpiredLineItems(request);
            isShowUnExpiredLineItems(request);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward reload(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException, IllegalStateException, OperationsException, PRDBaseException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            EntitlementsStateBean eBean = SessionUtils.getEntitlementsStateBean(request);
            IResultsList rl = eBean.getActivatableItemsItemSet();
            List l = rl.getCurrentPage();
            loadPagingAttributes(request, trueForm, rl, l,
                    eBean.getActivatableItemsPaginationAttributes());
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, eBean);
            setLeafNodeDisplay(request, rl.getQuery());
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward firstPage(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException, PRDBaseException {
        if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
            return mapping.findForward(ActionsConstants.FN_OOPS);
        }
        return (jumToPage(mapping, form, request, response, Page.FIRST));
    }

    public ActionForward lastPage(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException, PRDBaseException {
        return (jumToPage(mapping, form, request, response, Page.LAST));
    }

    public ActionForward jumToPage(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException, PRDBaseException {
        return (jumToPage(mapping, form, request, response, Page.GOTO));
    }

    public ActionForward jumToPage(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response, Page targetPage)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException, PRDBaseException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            EntitlementsStateBean esBean = SessionUtils.getEntitlementsStateBean(request);
            IResultsList rl = esBean.getActivatableItemsItemSet();
            int pageNumber = 1;
            if (targetPage == Page.LAST) {
                pageNumber = rl.getTotalNumberOfPages();
                PaginationAttributesBean paBean = esBean.getActivatableItemsPaginationAttributes();
                paBean.setHasNext(rl.hasNextPage());
                paBean.setHasPrevious(rl.hasPrevPage());
                paBean.setTotalNumberOfPages(rl.getTotalNumberOfPages());
                paBean.setCurrentPageNumber(rl.getCurrentPageNumber());
                esBean.setActivatableItemsPaginationAttributes(paBean);
            }
            if (targetPage == Page.GOTO)
                pageNumber = trueForm.getPageNumber();
            List l = rl.getPage(pageNumber);
            loadPagingAttributes(request, trueForm, rl, l,
                    esBean.getActivatableItemsPaginationAttributes());
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, esBean);
            setLeafNodeDisplay(request, rl.getQuery());
            //method calls to set filter checkbox selection of list entitlements based on cookie values.
            isShowLineItemsWithZeroCopiesByDefaultWCookie(request);
            isShowExpiredLineItems(request);
            isShowUnExpiredLineItems(request);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    @SuppressWarnings("unchecked")
	public ActionForward sortByColumn(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            String sortColumnKey = trueForm.getSortColumnKey();
            // in case of custom attributes the complete sort key is
            // paramName:AttrName
            String completeSortKey = sortColumnKey;
            EntitlementsStateBean eBean = SessionUtils.getEntitlementsStateBean(request);
            IResultsList rl = eBean.getActivatableItemsItemSet();
            if (sortColumnKey != null && !sortColumnKey.equals("")) {

                IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                        .getEntitlementManager();
                IOperationsQuery qry = rl.getQuery();
                int sepIndex = sortColumnKey.indexOf(":");
                if (sepIndex != -1) {
                    String attrName = sortColumnKey.substring(0, sepIndex);
                    String attrVal = sortColumnKey.substring(sepIndex + 1);
                    sortColumnKey = attrName;
                    qry.setSortAttribute(attrVal);
                }
                qry = setSort(request, qry,
                        (IQueryParameterENC)(getEntitlementsSearchableAttributesMap(request)
                                .get(sortColumnKey)));               
                rl = entMgr.getActivatableItemsPropertiesBean(qry, trueForm.getDateFormat());
                List l = rl.nextPage();
                
                //Added to sort PERMANENT and ExpiryDate in ascending and descending orders
                if(sortColumnKey.equalsIgnoreCase(LINE_ITEM_EXPIRATION_DATE)) {
                	boolean orderByAsc = qry.isSortAscending();
                		Collections.sort(l, (o1, o2) -> {
                			ActivatableItemPropertiesBean a1 = (ActivatableItemPropertiesBean) o1;
		                	ActivatableItemPropertiesBean a2 = (ActivatableItemPropertiesBean) o2;
		                	if(orderByAsc) {
			                    if(a1.getExpirationDate() == null && a2.getExpirationDate() == null) {
			                           return 0;
			                    } else if (a1.getExpirationDate() == null) {
			                           return 1;
			                    } else if (a2.getExpirationDate() == null) {
			                           return -1;
			                    } else {
			                           return a1.getExpirationDate().compareTo(a2.getExpirationDate());
			                    }
			               }else {
			                	if(a1.getExpirationDate() == null && a2.getExpirationDate() == null) {
			                            return 0;
			                     } else if (a1.getExpirationDate() == null) {
			                            return -1;
			                     } else if (a2.getExpirationDate() == null) {
			                            return 1;
			                     } else {
			                            return a2.getExpirationDate().compareTo(a1.getExpirationDate());
			                     }
			
			               }
                		});
                	
                }
                eBean.setActivatableItemsItemSet(rl);
                loadPagingAttributes(request, trueForm, rl, l,
                        eBean.getActivatableItemsPaginationAttributes());
                loadFormFromBean(request, trueForm, l);
                trueForm.setSortColumnKey(completeSortKey);
                setLeafNodeDisplay(request, rl.getQuery());
                SessionUtils.setEntitlementsStateBean(request, eBean);
                return mapping.findForward(FORWARD_SUCCESSFUL);
            }
            else {
                return mapping.findForward(FORWARD_UNSUCCESSFUL);
            }
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward getTotalNumberOfPages(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException, PRDBaseException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            EntitlementsStateBean esBean = SessionUtils.getEntitlementsStateBean(request);
            IResultsList rl = esBean.getActivatableItemsItemSet();

            PaginationAttributesBean paBean = esBean.getActivatableItemsPaginationAttributes();
            paBean.setHasNext(rl.hasNextPage());
            paBean.setHasPrevious(rl.hasPrevPage());
            paBean.setTotalNumberOfPages(rl.getTotalNumberOfPages());
            paBean.setCurrentPageNumber(rl.getCurrentPageNumber());

            esBean.setActivatableItemsPaginationAttributes(paBean);
            List l = rl.getCurrentPage();
            loadPagingAttributes(request, trueForm, rl, l,
                    esBean.getActivatableItemsPaginationAttributes());
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, esBean);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward activate(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, FlexnetBaseException {
        String unSuccessful = FORWARD_UNSUCCESSFUL;
        String unifiedHost = "";
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            // reset any selected hosts by any previous action

            SupportLicensesStateBean supportBean = SessionUtils
                    .getSupportLicensesStateBean(request);
            supportBean.resetSelectedHosts();
            SessionUtils.setSupportLicensesStateBean(request, supportBean);
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            String[] selectedIDs = trueForm.getSelectedObjects();
            if (trueForm.getActIdList() != null && !trueForm.getActIdList().isEmpty()) {
                StringTokenizer tokens = new StringTokenizer(trueForm.getActIdList(), ",");
                int i = 0;
                selectedIDs = new String[tokens.countTokens()];
                while (tokens.hasMoreTokens()) {
                    selectedIDs[i++] = tokens.nextToken();
                }
            }
            boolean sso = false;
            if (selectedIDs != null && selectedIDs.length == 0) {
                Object activationIds = request.getAttribute(ACTIVATABLE_IDS);
                if (activationIds != null) {
                    selectedIDs = (String[])activationIds;
                    unSuccessful = "ssoError";
                    sso = true;
                }
            }

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            unifiedHost = trueForm.getUnifiedHostId();
            boolean hasOverridePermission = false;
            if (PermissionUtil.hasPermissionAlias(IPermissionENC.OVERRIDE_POLICY.getName())) {
                hasOverridePermission = true;
            }

            LicenseTechnology tech = null;
            String[] activationIds = new String[selectedIDs.length];
            int childLineItemCount = 0;
            Product product = null;
            for (int i = 0; i < selectedIDs.length; i++) {
                try {
                    IEntitlementLineItem li = (IEntitlementLineItem)entMgr
                            .getEntitlementLineItemByID(new Long(selectedIDs[i]));
                    tech = li.getLicenseTechnology();
                    EntitlementLineItemBO liBO = (EntitlementLineItemBO)li;
                    product = liBO.getProduct();
                    LicenseModel lm = liBO
                            .getLicenseModelByType(EntitlementLineItemBO.modelType.CERTIFICATE_OR_CUSTOM);
                    if (li != null) {
                        if (lm == null) {
                            if (sso) {
                                setupErrorMessage(request,
                                        "portal.activations.alert.cannotActivateTrustedLineItem",
                                        new String[0]);
                            }
                            else {
                                setupErrorMessage(request,
                                        "activations.alert.cannotActivateTrustedLineItem",
                                        new String[0]);
                            }
                            return mapping.findForward(unSuccessful);
                        }
                        activationIds[i] = li.getActivationID();
                        if (li.isUpgrade() || li.isUpsell() || li.isRenew()) {
                            childLineItemCount = childLineItemCount + 1;
                        }
                        else {
                            int remaingCopies = li.getNumberOfRemainingCopies()
                                    + li.getAvailableExtraActivations();
                            if (remaingCopies <= 0 && !hasOverridePermission) {
                                setupErrorMessage(request,
                                        "portal.activations.message.canNotActivateTheLineItem",
                                        new String[] { li.getActivationID() });
                                return mapping.findForward(unSuccessful);
                            }
                        }
                    }
                }
                catch (OperationsException ex1) {
                    if (ex1.getCause() instanceof NoDataFoundException) {
                        IWebRegKey wrgKey = (IWebRegKey)entMgr.getWebRegKeyByID(new Long(
                                selectedIDs[i]));
                        BulkEntitlementBO beBO = (BulkEntitlementBO)wrgKey.getParentEntitlement();
                        product = beBO.getProduct();
                        LicenseModel lm = beBO
                                .getLicenseModelByType(EntitlementLineItemBO.modelType.CERTIFICATE_OR_CUSTOM);
                        if (lm == null) {
                            setupErrorMessage(request,
                                    "activations.alert.cannotActivateTrustedLineItem",
                                    new String[0]);
                            return mapping.findForward(FORWARD_UNSUCCESSFUL);
                        }
                        tech = wrgKey.getParentEntitlement().getLicenseModel()
                                .getLicenseTechnology();
                        if (wrgKey != null) {
                            activationIds[i] = wrgKey.getWebRegKeyID();
                            if (wrgKey.isUpgrade() || wrgKey.isUpsell()) {
                                childLineItemCount = childLineItemCount + 1;
                            }
                        }
                    }
                    else
                        throw ex1;
                }
            }

            IFulfillmentManager fMgr = OperationsServiceFactory.getFulfillmentManager();

            boolean hasCustomHost = false;
            if (tech == null) {
                setupErrorMessage(request, "portal.security.error.badRequest", new String[0]);
                return mapping.findForward(unSuccessful);
            }
            if (!tech.isFlexNet()) {
                List hostAttrs = null;
                if (product.getHostType() != null)
                    hostAttrs = LicenseTechnologyHostAttributeImpl.getHostAttributesForHost(product
                            .getHostType());
                if (hostAttrs != null && hostAttrs.size() > 0) {
                    hasCustomHost = true;
                }
            }

            if (childLineItemCount != 0) {
                // child line item activation workflow is for flexnet technology
                // and for custom
                // technology with hosts
                if (tech.isFlexNet() || hasCustomHost) {
                    if (selectedIDs.length == 1 && childLineItemCount == 1) {
                        IUpgradeUtility fr = fMgr.getUpgradeFulfillmentUtility(activationIds[0],
                                FulfillmentSourceENC.APPLICATION);
                        ChildLineItemActivationStateBean claBean = SessionUtils
                                .getChildLineItemActivationStateBean(request);
                        claBean.resetCache();
                        claBean.setSelectedActivationId(activationIds[0]);
                        claBean.setNeedServerId(fr.needServerId());
                        claBean.setNeedNodeLockId(fr.needNodeLockId());
                        claBean.setNeedCustomHost(fr.needCustomHost());
                        claBean.setAllowPartialFulfillments(fr.isAllowPartialFulfillments());
                        if (!unifiedHost.isEmpty()) {
                            try {
                                claBean.setUnifiedHostId(trueForm.getUnifiedHostId());
                                if (trueForm.getHostId() != null && !trueForm.getHostId().isEmpty()) {
                                    if (claBean.needCustomHost()) {
                                        claBean.getCustomHostIds();
                                        claBean.addCustomHostId((CustomHostId)fMgr
                                                .getLicenseHostByID(Long.parseLong(trueForm
                                                        .getHostId())));
                                    }
                                    else if (claBean.needServerId()) {
                                        claBean.getServerHostIds();
                                        claBean.addServerHostId((ServerHostId)fMgr
                                                .getLicenseHostByID(Long.parseLong(trueForm
                                                        .getHostId())));
                                    }
                                    else if (claBean.needNodeLockId()) {
                                        claBean.getNodeLockedHostIds();
                                        claBean.addNodeLockedHostId((NodeLockedHostId)fMgr
                                                .getLicenseHostByID(Long.parseLong(trueForm
                                                        .getHostId())));
                                    }
                                }
                            }
                            catch (ClassCastException e) {
                                ActionRedirect redirect = new ActionRedirect(
                                        mapping.findForward(UNIFIED_HOST_VIEW));
                                redirect.addParameter("unifiedHost.id", unifiedHost);
                                redirect.addParameter(
                                        "errorFromBo",
                                        "Activate. "
                                                + "There is a mismatch between host type and line item type");
                                return redirect;
                            }

                        }
                        SessionUtils.setChildLineItemActivationStateBean(request, claBean);
                        return mapping.findForward("SuccessfulChildLineItem");
                    }
                    else {
                        if (!unifiedHost.isEmpty()) {
                            ActionRedirect redirect = new ActionRedirect(
                                    mapping.findForward(UNIFIED_HOST_VIEW));
                            redirect.addParameter("unifiedHost.id", unifiedHost);
                            redirect.addParameter(
                                    "errorFromBo",
                                    "Activate. "
                                            + CommonUtils
                                                    .getResourceString(
                                                            "portal.activations.message.canNotActivateMoreChildLineItems",
                                                            null, ThreadContextUtil.getLocale()));
                            return redirect;
                        }
                        setupErrorMessage(request,
                                "portal.activations.message.canNotActivateMoreChildLineItems",
                                new String[0]);
                        return mapping.findForward(unSuccessful);
                    }
                }
            }

            final FulfillmentHelper fr = fMgr.getFulfillmentHelper(activationIds,
                    FulfillmentSourceENC.APPLICATION, FulfillmentRequestTypeENC.ACTIVATION);

            BatchActivationStateBean baBean = SessionUtils.getBatchActivationStateBean(request);
            baBean.resetCache();
            baBean.setSelectedActivationIds(activationIds);
            baBean.setNeedServerId(fr.needServerId());
            baBean.setNeedCustomHost(fr.needCustomHost());
            baBean.setNeedCount(fr.needCount());
            baBean.setNeedNodeLockId(fr.needNodeLockId());
            baBean.setAllowPartialFulfillments(fr.isAllowPartialFulfillments());

            @Customization("2024-12-11")
            final Function<Void,Void> setup_tier_details = (dummy) -> {
                try {
                    baBean.setTier1ID(null);
                    baBean.setTier1Name(null);

                    SpirentUtils.getFirstTier1ChannelPartner(entMgr
                            .getEntitlementLineItemByActivationID(activationIds[0])
                            .getParentEntitlement()
                            .getEntChannelPartners())
                            .ifPresent(cp -> {
                                baBean.setTier1ID(cp.getOrgUnit().getName());
                                baBean.setTier1Name(cp.getOrgUnit().getDisplayName());
                            });
                    return null;
                }
                catch (final Throwable t) {
                    return SpirentUtils.ManageException(t);
                }
            };

            @Customization("2024-12-11")
            final Object _unused_ = setup_tier_details.apply(null);


            if (!unifiedHost.isEmpty()) {
                try {
                    baBean.setUnifiedHostId(trueForm.getUnifiedHostId());
                    if (trueForm.getHostId() != null && !trueForm.getHostId().isEmpty()) {
                        // check if a custom host is selected from Manage
                        // Machine's page
                        if (baBean.needCustomHost()) {
                            baBean.getCustomHostIds();
                            baBean.addCustomHostId((CustomHostId)fMgr.getLicenseHostByID(Long
                                    .parseLong(trueForm.getHostId())));
                        }
                        // check if a server type host is selected from Manage
                        // Machine's page
                        else if (baBean.needServerId()) {
                            baBean.getServerHostIds();
                            baBean.addServerHostId((ServerHostId)fMgr.getLicenseHostByID(Long
                                    .parseLong(trueForm.getHostId())));
                        }
                        // check if a nodelock type host is selected from Manage
                        // Machine's page
                        else if (baBean.needNodeLockId()) {
                            baBean.getNodeLockedHostIds();
                            baBean.addNodeLockedHostId((NodeLockedHostId)fMgr
                                    .getLicenseHostByID(Long.parseLong(trueForm.getHostId())));
                        }
                    }
                }
                catch (ClassCastException e) {
                    // If there is a mismatch between the type of host selected
                    // on the manage
                    // machines page and the License model attached to a line
                    // item
                    ActionRedirect redirect = new ActionRedirect(
                            mapping.findForward(UNIFIED_HOST_VIEW));
                    redirect.addParameter("unifiedHost.id", unifiedHost);
                    redirect.addParameter("errorFromBo", "Activate. "
                            + "There is a mismatch between host type and line item type");
                    return redirect;
                }
            }

            SessionUtils.setBatchActivationStateBean(request, baBean);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            if (!unifiedHost.isEmpty()) {
                ActionRedirect redirect = new ActionRedirect(mapping.findForward(UNIFIED_HOST_VIEW));
                redirect.addParameter("unifiedHost.id", unifiedHost);
                redirect.addParameter("errorFromBo", "Activate." + ex.getMessage());
                return redirect;
            }
            return mapping.findForward(unSuccessful);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            if (!unifiedHost.isEmpty()) {
                ActionRedirect redirect = new ActionRedirect(mapping.findForward(UNIFIED_HOST_VIEW));
                redirect.addParameter("unifiedHost.id", unifiedHost);
                redirect.addParameter("errorFromBo", "Activate." + ex.getMessage());
                return redirect;
            }
            return mapping.findForward(unSuccessful);
        }
    }

    public ActionForward trustedActivate(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, FlexnetBaseException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            String[] selectedIDs = trueForm.getSelectedObjects();
            String str = "";
            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();

            String[] activationIds = new String[selectedIDs.length];
            List<IEntitlementLineItem> selEntLis = new ArrayList<IEntitlementLineItem>();

            for (int i = 0; i < selectedIDs.length; i++) {
                if (i == 0) {
                    str = str + selectedIDs[i];
                }
                else {
                    str = str + "," + selectedIDs[i];
                }
                try {
                    IEntitlementLineItem li = (IEntitlementLineItem)entMgr
                            .getEntitlementLineItemByID(new Long(selectedIDs[i]));
                    EntitlementLineItemBO liBO = (EntitlementLineItemBO)li;
                    LicenseModel lm = liBO
                            .getLicenseModelByType(EntitlementLineItemBO.modelType.TRUSTED);
                    if (li != null) {
                        if (lm == null) {
                            setupErrorMessage(request,
                                    "activations.alert.canActivateOnlyTrustedLineItem",
                                    new String[0]);
                            return mapping.findForward(FORWARD_UNSUCCESSFUL);
                        }
                        activationIds[i] = li.getActivationID();
                        selEntLis.add(li);
                    }
                }
                catch (OperationsException ex1) {
                    if (ex1.getCause() instanceof NoDataFoundException) {

                        IWebRegKey wrgKey = (IWebRegKey)entMgr.getWebRegKeyByID(new Long(
                                selectedIDs[i]));
                        BulkEntitlementBO beBO = (BulkEntitlementBO)wrgKey.getParentEntitlement();
                        LicenseModel lm = beBO
                                .getLicenseModelByType(EntitlementLineItemBO.modelType.TRUSTED);
                        if (lm == null) {
                            setupErrorMessage(request,
                                    "activations.alert.canActivateOnlyTrustedLineItem",
                                    new String[0]);
                            return mapping.findForward(FORWARD_UNSUCCESSFUL);
                        }

                        if (wrgKey != null) {
                            activationIds[i] = wrgKey.getWebRegKeyID();
                            selEntLis.add(wrgKey.getEntitlementLineItem());
                        }
                    }
                    else
                        throw ex1;
                }
            }
            Iterator<IEntitlementLineItem> iter = selEntLis.iterator();
            List<TrustedLineItemDTO> trustedLiDtos = new ArrayList<TrustedLineItemDTO>();
            while (iter.hasNext()) {
                IEntitlementLineItem liitem = iter.next();
                TrustedLineItemDTO dto = new TrustedLineItemDTO();
                dto.setActivationID(liitem.getActivationID());
                trustedLiDtos.add(dto);
            }
            TrustedRequestDTO reqDTO = new TrustedRequestDTO();
            reqDTO.setTrustedLineItems(trustedLiDtos);
            IManageTrustedService mgr = OperationsServiceFactory.getManageTrustedService();
            mgr.validateRequest(reqDTO);
            ActionForward fwd = mapping.findForward(FORWARD_SUCCESSFUL);
            Map extraParams = new HashMap();
            extraParams.put("actBean.selectedLisStr", str);
            return getRedirect(fwd, extraParams);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward simpleSearch(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, OperationsException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            IOperationsQuery qry = new IOperationsQuery();
            qry.setBatchSize(getPaginationSize());

            if (!isShowLineItemsWithZeroCopiesByDefaultWCookie(request)) {
                qry.createQueryParameter(IEntitlement.LINE_ITEM_REMAINING_COPIES_GT_ZERO, null,
                        IOperatorENC.EQUALS);
            }

            //Query parameter to be set to show only un-expired line items.
            if (!isShowExpiredLineItems(request) && isShowUnExpiredLineItems(request)) {
                qry.createQueryParameter((IEntitlement.LINE_ITEM_EXPIRATION_DATE_OR_NULL), FlexUtil.getTodayGMT(), IOperatorENC.GTE);
            }
            //Query parameter to be set to show expired line items.
            else if (isShowExpiredLineItems(request) && !isShowUnExpiredLineItems(request)) {
                qry.createQueryParameter((IEntitlement.LINE_ITEM_EXPIRATION_DATE_NOT_NULL), FlexUtil.getTodayGMT(), IOperatorENC.BEFORE);
                qry.createQueryParameter(IEntitlement.LINE_ITEM_PERMANENT, new Boolean(false),
                        IOperatorENC.EQUALS);
            }
            String qualifier = trueForm.getSearchQualifier();
            Map searchOperators = SessionUtils.getSearchOperatorsMap(request);
            IOperatorENC operator = (IOperatorENC)searchOperators.get(qualifier);

            String searchPhrase = trueForm.getSearchPhrase();
            if (searchPhrase == null)
                searchPhrase = "";
            String searchBy = trueForm.getSearchCategory();

            if (!"".equals(searchPhrase)) {
                IQueryParameterENC param = (IQueryParameterENC)(getEntitlementsSearchableAttributesMap(request)
                        .get(searchBy));
                if (param != null)
                    qry.createQueryParameter(param, searchPhrase, operator);
            }
            EntitlementsStateBean eBean = SessionUtils.getEntitlementsStateBean(request);

            if (!isDoNotSortResultsByDefault()) {
                qry.setSortBy(IEntitlement.LINE_ITEM_LAST_MODIFIED);
                qry.setSortAscending(false);
            }

            IResultsList rl = entMgr.getActivatableItemsPropertiesBean(qry,
                    trueForm.getDateFormat());
            List l = rl.nextPage();
            eBean.setActivatableItemsItemSet(rl);
            loadPagingAttributes(request, trueForm, rl, l,
                    eBean.getActivatableItemsPaginationAttributes());
            trueForm.setSearchType(SEARCHTYPE_SIMPLE);
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, eBean);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward advancedSearch(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, FlexnetBaseException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            EntitlementsStateBean esBean = SessionUtils.getEntitlementsStateBean(request);
            Map searchCriteriaMap = esBean.getAdvancedSearchCriteriaMap();

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            IOperationsQuery qry = new IOperationsQuery();
            qry.setBatchSize(getPaginationSize());

            UIUtils.updateLineItemQueryWithSearchParameters(qry, request, searchCriteriaMap,
                    ThreadContextUtil.getLocale(), ThreadContextUtil.getTimeZone());

            if (!isDoNotSortResultsByDefault()) {
                qry.setSortBy(IEntitlement.LINE_ITEM_LAST_MODIFIED);
                qry.setSortAscending(false);
            }

            IResultsList rl = entMgr.getActivatableItemsPropertiesBean(qry,
                    trueForm.getDateFormat());
            List l = rl.nextPage();
            esBean.removeAdvancedSearchCriteriaMap();
            esBean.setActivatableItemsItemSet(rl);
            loadPagingAttributes(request, trueForm, rl, l,
                    esBean.getActivatableItemsPaginationAttributes());
            trueForm.setSearchType(SEARCHTYPE_SIMPLE);
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, esBean);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward print(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException, IllegalStateException, FlexnetBaseException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            Set<String> selectedSet = new HashSet<>();
            Collections.addAll(selectedSet, trueForm.getSelectedObjects());

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            LineItemsPrintDetailsForm pForm = new LineItemsPrintDetailsForm();
            initForm(pForm, request);

            for (String selectedOption : selectedSet) {
                IEntitlementLineItem li = null;
                LineItemsPrintDetailsForm.ObjectInfo oInfo = pForm.newObjectInfo();

                try {
                    li = (IEntitlementLineItem)entMgr.getEntitlementLineItemByID(new Long(
                            selectedOption));
                    if (li != null) {
                        oInfo.setId(li.getId().toString());
                        oInfo.setLineItemId(li.getActivationID());
                        if (li.getParentLineItem() != null) {
                            oInfo.setParentLineItemId(li.getParentLineItem().getActivationID());
                        }
                        ISimpleEntitlement se = (ISimpleEntitlement)li.getParentEntitlement();
                        if (CommonUtils.canShowEntitlementId(se)) {
                            oInfo.setParentId(se.getId().toString());
                            oInfo.setEntitlementId(se.getEntitlementID());
                        }
                        oInfo.setSoldTo(se.getSoldTo().getDisplayName());
                        oInfo.setShipToAddress(se.getShipToAddress());
                        oInfo.setShipToEmail(se.getShipToEmail());
                        if (li.getPartNumber() != null) {
                            IPartNumber sku = (IPartNumber)li.getPartNumber();
                            oInfo.setSku(sku.getPartNumber());
                            if (sku.getDescription() != null) {
                                oInfo.setSkuDescription(sku.getDescription());
                            }
                        }
                        Map<Product, Integer> prods = li.getEntitledProducts();
                        if (prods != null && !prods.isEmpty()) {
                            Map<ProductBean, Integer> entitledProds = new HashMap<ProductBean, Integer>();
                            Iterator<Map.Entry<Product, Integer>> iter = prods.entrySet()
                                    .iterator();
                            while (iter.hasNext()) {
                                Map.Entry<Product, Integer> entry = iter.next();
                                Product p = entry.getKey();
                                ProductBean ordBean = new ProductBean();
                                ordBean.setId(p.getId());
                                ordBean.setName(p.getName());
                                ordBean.setVersion(p.getVersion());
                                ordBean.setDescription(p.getDescription());
                                ordBean.setType(p.getProductType());
                                entitledProds.put(ordBean, entry.getValue());
                            }
                            oInfo.setOrderables(entitledProds);
                        }

                        String desc = li.getDescription();
                        if (desc != null) {
                            oInfo.setDescription(desc);
                        }
                        if (li.getExpirationDate() != null) {
                            oInfo.setExpirationDateStr(trueForm.toGMTDateString(li
                                    .getExpirationDate()));
                        }
                        else if (li.getDuration() != null) {
                            Duration dur = li.getDuration();
                            String durationStr = dur.getLength()
                                    + " "
                                    + trueForm.getResourceString(dur.getDurationUnit().toString(),
                                            null);
                            oInfo.setExpirationDateStr(durationStr);
                        }
                        else if (li.isPermanent()) {
                            String permanentStr = trueForm.getResourceString(
                                    "entitlement.expiration.permanent", null);
                            oInfo.setExpirationDateStr(permanentStr);
                        }
                        else {
                            String unknownStr = trueForm.getResourceString(
                                    "entitlement.expiration.unknown", null);
                            oInfo.setExpirationDateStr(unknownStr);
                        }
                        oInfo.setStartDate(li.getStartDate());
                        oInfo.setStartDateStr(trueForm.toGMTDateString(li.getStartDate()));
                        StartDateOptionsENC startDateOption = li.getStartDateOption();
                        if (startDateOption != null) {
                            oInfo.setStartDateOption(startDateOption.toString());
                        }

                        oInfo.setTotalNumberOfCopies(li.getNumberOfCopies());

                        int copies = li.getNumberOfRemainingCopies();
                        if (copies > 0)
                            oInfo.setNumberOfCopiesRemaining(copies);
                        else
                            oInfo.setNumberOfCopiesRemaining(0);

                        oInfo.setState(li.getLineItemState().toString());
                        oInfo.setStartDate(li.getStartDate());

                        if (li.needsDatedVersion()) {
                            oInfo.setVersionDateRequired("true");
                            VersionDateOptionsENC versionDateOption = li.getVersionDateOption();
                            if (versionDateOption != null) {
                                oInfo.setVersionDateOption(versionDateOption.toString());
                                if (li.getVersionDate() != null)
                                    oInfo.setVersionDateStr(trueForm.toGMTDateString(li
                                            .getVersionDate()));
                                Duration dur = li.getVersionDateDuration();
                                if (dur != null) {
                                    oInfo.setVersionDateDuration(dur.getLength());
                                    oInfo.setVersionDateDurationType(dur.getDurationUnit()
                                            .toString());
                                }
                            }
                        }
                        else {
                            oInfo.setVersionDateRequired("false");
                        }

                        if (li.getLicenseModel() != null) {
                            oInfo.setExtraActivationsAllowed(li.getExtraActivationsMax() + "");
                            oInfo.setExtraActivationsAvailable(li.getAvailableExtraActivations()
                                    + "");

                            LicenseModel lm = li.getLicenseModel();

                            if (lm.getLicenseTechnology().isFlexNet()) {
                                IFlexnetLicenseModel selLM = (IFlexnetLicenseModel)lm;
                                if (selLM.isTrustedServer() || selLM.isCountedCertificateModel()) {
                                    oInfo.setShowOverdraft(true);
                                    String resourceStr = trueForm.getResourceString(
                                            "createLicenseModel.when.unlimited", new String[0]);
                                    if (li.getOverdraftMax() == Integer.MAX_VALUE)
                                        oInfo.setOverdraftAllowed(resourceStr);
                                    else
                                        oInfo.setOverdraftAllowed(li.getOverdraftMax() + "");
                                    if (li.getAvailableOverdraftCount() == Integer.MAX_VALUE)
                                        oInfo.setOverdraftAvailable(resourceStr);
                                    else
                                        oInfo.setOverdraftAvailable(li.getAvailableOverdraftCount()
                                                + "");
                                    if (li.getOverdraftCeiling() == Integer.MAX_VALUE)
                                        oInfo.setOverdraftCeiling(resourceStr);
                                    else {
                                        String percent = "";
                                        if (li.isOverdraftCeilingPercent()) {
                                            percent = " %";
                                        }
                                        oInfo.setOverdraftCeiling(li.getOverdraftCeiling()
                                                + percent);
                                    }

                                    if (li.getOverdraftFloor() == Integer.MAX_VALUE)
                                        oInfo.setOverdraftFloor(resourceStr);
                                    else {
                                        String percent = "";
                                        if (li.isOverdraftFloorPercent()) {
                                            percent = " %";
                                        }
                                        oInfo.setOverdraftFloor(li.getOverdraftFloor() + percent);
                                    }
                                }
                            }

                            oInfo.setLicenseModel(lm.getName());
                            IAttributeSet attbs = (IAttributeSet)li.getLicenseModelAttributes();

                            Iterator iter = attbs.getDescriptors().iterator();
                            Boolean allowOneTS = null;
                            Boolean allowManyTS = null;
                            while (iter.hasNext()) {
                                CustomAttributeDescriptor ldesc = (CustomAttributeDescriptor)iter
                                        .next();
                                LineItemsPrintDetailsForm.ObjectInfo.LicenseModelAttributeInfo lmattrInfo = oInfo
                                        .newLicenseModelAttributeInfo();
                                lmattrInfo.setName(ldesc.getName());
                                lmattrInfo.setType(ldesc.getType().toString());
                                if (ldesc.getValidValues() != null) {
                                    lmattrInfo.setValidValues(ldesc.getValidValues());
                                }

                                if (ldesc.getType().isDateType()) {
                                    Date d = attbs.getDateValue(ldesc);
                                    String str = "";
                                    if (d != null)
                                        str = trueForm.toGMTDateString(d);
                                    lmattrInfo.setValue(str);
                                    oInfo.addLicenseModelAttribute(lmattrInfo);
                                }
                                else if (FlexGeneratorHelper.VM_PLATFORMS.equals(ldesc.getName())) {
                                    if (attbs.getStringValue(ldesc) != null) {
                                        if (FlexGeneratorHelper.PHYSICAL.equals(attbs
                                                .getStringValue(ldesc))) {
                                            lmattrInfo.setName(FlexGeneratorHelper.VM_PLATFORMS);
                                            lmattrInfo
                                                    .setValue(FlexGeneratorHelper.RESTRICTED_TO_PHYSICAL);
                                        }
                                        else if (FlexGeneratorHelper.VM_ONLY.equals(attbs
                                                .getStringValue(ldesc))) {
                                            lmattrInfo.setName(FlexGeneratorHelper.VM_PLATFORMS);
                                            lmattrInfo
                                                    .setValue(FlexGeneratorHelper.RESTRICTED_TO_VIRTUAL);
                                        }
                                    }
                                    else {
                                        lmattrInfo.setName(FlexGeneratorHelper.VM_PLATFORMS);
                                        lmattrInfo.setValue(FlexGeneratorHelper.NOT_USED);
                                    }
                                    oInfo.addLicenseModelAttribute(lmattrInfo);

                                }
                                else if (FlexGeneratorHelper.ALLOW_ONE_TERMINAL_SERVER.equals(ldesc
                                        .getName())) {
                                    allowOneTS = new Boolean("false");
                                    if ("true".equals(attbs.getStringValue(ldesc))) {
                                        allowOneTS = new Boolean("true");
                                    }
                                }
                                else if (FlexGeneratorHelper.ALLOW_TERMINAL_SERVER.equals(ldesc
                                        .getName())) {
                                    allowManyTS = new Boolean("false");
                                    if ("true".equals(attbs.getStringValue(ldesc))) {
                                        allowManyTS = new Boolean("true");
                                    }
                                }
                                else {
                                    lmattrInfo.setValue(attbs.getStringValue(ldesc));
                                    oInfo.addLicenseModelAttribute(lmattrInfo);
                                }

                                if (FlexGeneratorHelper.ALLOW_ONE_TERMINAL_SERVER.equals(ldesc
                                        .getName())
                                        || FlexGeneratorHelper.ALLOW_TERMINAL_SERVER.equals(ldesc
                                                .getName())) {
                                    if (allowOneTS != null && allowManyTS != null) {
                                        if (!allowOneTS && !allowManyTS) {
                                            lmattrInfo
                                                    .setName(FlexGeneratorHelper.ALLOW_TERMINAL_SERVER);
                                            lmattrInfo.setValue(FlexGeneratorHelper.NOT_USED);
                                        }
                                        else if (allowOneTS && !allowManyTS) {
                                            lmattrInfo
                                                    .setName(FlexGeneratorHelper.ALLOW_TERMINAL_SERVER);
                                            lmattrInfo.setValue(FlexGeneratorHelper.ONE_CONNECTION);
                                        }
                                        else if (!allowOneTS && allowManyTS) {
                                            lmattrInfo
                                                    .setName(FlexGeneratorHelper.ALLOW_TERMINAL_SERVER);
                                            lmattrInfo
                                                    .setValue(FlexGeneratorHelper.MANY_CONNECTIONS);
                                        }
                                        oInfo.addLicenseModelAttribute(lmattrInfo);
                                    }
                                }
                            }

                            LicenseLifecyclePolicy rehosts = li.getNumberOfRehostsPolicy();
                            if (rehosts.getIsIgnored()) {
                                oInfo.setShowRehosts("false");
                            }
                            else {
                                oInfo.setShowRehosts("true");
                                oInfo.setNumRehosts(rehosts.getNumOperations());
                                oInfo.setNumRehostsDuration(rehosts.getDuration().getLength());
                                oInfo.setNumRehostsDurationUnit(rehosts.getDuration()
                                        .getDurationUnit().toString());
                            }

                            LicenseLifecyclePolicy returns = li.getNumberOfReturnsPolicy();
                            if (returns.getIsIgnored()) {
                                oInfo.setShowReturns("false");
                            }
                            else {
                                oInfo.setShowReturns("true");
                                oInfo.setNumReturns(returns.getNumOperations());
                                oInfo.setNumReturnsDuration(returns.getDuration().getLength());
                                oInfo.setNumReturnsDurationUnit(returns.getDuration()
                                        .getDurationUnit().toString());
                            }

                            LicenseLifecyclePolicy repairs = li.getNumberOfRepairsPolicy();

                            if (repairs.getIsIgnored()) {
                                oInfo.setShowRepairs("false");
                            }
                            else {
                                oInfo.setShowRepairs("true");
                                oInfo.setNumRepairs(repairs.getNumOperations());
                                oInfo.setNumRepairsDuration(repairs.getDuration().getLength());
                                oInfo.setNumRepairsDurationUnit(repairs.getDuration()
                                        .getDurationUnit().toString());
                            }

                            LicenseHostIdPolicy serverHostPolicy = li
                                    .getServerHostIdPolicyForPortal();
                            if (serverHostPolicy.getIsIgnored()) {
                                oInfo.setShowServerHostIdPolicy("false");
                            }
                            else {
                                oInfo.setShowServerHostIdPolicy("true");
                                String[] types = serverHostPolicy.getHostIdTypes();
                                StringBuffer sb = new StringBuffer();
                                if (types != null && types.length > 0) {
                                    for (int ii = 0; ii < types.length; ii++) {
                                        sb.append(ApplicationUtility.getResourceString(types[ii],
                                                new String[0], ThreadContextUtil.getLocale()));
                                        if (ii < types.length - 1)
                                            sb.append(", ");
                                    }
                                }
                                oInfo.setAllowedServerHostsType(sb.toString());
                            }

                            LicenseHostIdPolicy nlHostPolicy = li
                                    .getNodeLockedHostIdPolicyForPortal();
                            if (nlHostPolicy.getIsIgnored()) {
                                oInfo.setShowNlHostIdPolicy("false");
                            }
                            else {
                                oInfo.setShowNlHostIdPolicy("true");
                                String[] types = nlHostPolicy.getHostIdTypes();
                                StringBuffer sb = new StringBuffer();
                                if (types != null && types.length > 0) {
                                    for (int ii = 0; ii < types.length; ii++) {
                                        sb.append(ApplicationUtility.getResourceString(types[ii],
                                                new String[0], ThreadContextUtil.getLocale()));
                                        if (ii < types.length - 1)
                                            sb.append(", ");
                                    }
                                }
                                oInfo.setAllowedNlHostsType(sb.toString());
                            }

                            LicenseHostId[] hosts = li.getHostIds();
                            if (hosts != null && hosts.length > 0) {
                                oInfo.setShowHosts("true");
                                StringBuffer sb = new StringBuffer();
                                for (int ii = 0; ii < hosts.length; ii++) {
                                    sb.append(hosts[ii].getUniqueHostName());
                                    if (ii < hosts.length - 1)
                                        sb.append(", ");
                                }
                                oInfo.setHosts(sb.toString());
                            }
                            else
                                oInfo.setShowHosts("false");
                        }
                        if (li.getAlternateLicenseModel1() != null) {
                            oInfo.setAltLM1(li.getAlternateLicenseModel1().getName());
                        }
                        if (li.getAlternateLicenseModel2() != null) {
                            oInfo.setAltLM2(li.getAlternateLicenseModel2().getName());
                        }

                        // populate Maintenance Items
                        Set mlis = li.getMaintenanceItems();
                        if (mlis != null && !mlis.isEmpty()) {
                            List<MaintenanceItemPropertiesBean> maintenanceItems = new LinkedList<MaintenanceItemPropertiesBean>();
                            Iterator iter = mlis.iterator();
                            while (iter.hasNext()) {
                                ActivatableMaintenanceBO actMaintBO = (ActivatableMaintenanceBO)iter.next();
                                MaintenanceItemDO mi = actMaintBO.getMaintenanceItem();
                                MaintenanceItemPropertiesBean maintBean = new MaintenanceItemPropertiesBean();
                                maintBean.setId(mi.getId());
                                IProduct p = mi.getMaintenance();
                                ProductBean prd = new ProductBean();
                                prd.setName(p.getName());
                                prd.setVersion(p.getVersion());
                                maintBean.setMaintenance(prd);
                                maintBean.setExpirationDate(mi.getExpirationDate());
                                maintBean.setPermanent(mi.isPermanent());
                                maintBean.setStartDate(mi.getStartDate());
                                maintenanceItems.add(maintBean);
                            }
                            oInfo.setMaintenanceItems(maintenanceItems);
                        }
                        if (li.getTimeZone() != null) {
                            oInfo.setFnpTimeZone(li.getTimeZone().getName());
                        }
                        pForm.addObject(oInfo);
                    }
                }
                catch (OperationsException ex1) {
                    if (ex1.getCause() instanceof NoDataFoundException) {
                        try {
                            IWebRegKey wrgKey = (IWebRegKey)entMgr.getWebRegKeyByID(new Long(
                                    selectedOption));
                            if (wrgKey != null) {
                                IBulkEntitlement be = (IBulkEntitlement)wrgKey
                                        .getParentEntitlement();
                                oInfo.setId(wrgKey.getId().toString());
                                oInfo.setLineItemId(wrgKey.getWebRegKeyID());
                                if (CommonUtils.canShowEntitlementId(be)) {
                                    oInfo.setParentId(be.getId().toString());
                                    oInfo.setEntitlementId(be.getEntitlementID());
                                }
                                oInfo.setLineItemId(wrgKey.getWebRegKeyID());
                                oInfo.setSoldTo(be.getSoldTo().getDisplayName());
                                oInfo.setShipToAddress(be.getShipToAddress());
                                oInfo.setShipToEmail(be.getShipToEmail());
                                if (be.getPartNumber() != null) {
                                    IPartNumber sku = (IPartNumber)be.getPartNumber();
                                    oInfo.setSku(sku.getPartNumber());
                                    if (sku.getDescription() != null) {
                                        oInfo.setSkuDescription(sku.getDescription());
                                    }
                                }
                                Map<Product, Integer> prods = be.getEntitledProducts();
                                if (prods != null && !prods.isEmpty()) {
                                    Map<ProductBean, Integer> entitledProds = new HashMap<ProductBean, Integer>();
                                    Iterator<Map.Entry<Product, Integer>> iter = prods.entrySet()
                                            .iterator();
                                    while (iter.hasNext()) {
                                        Map.Entry<Product, Integer> entry = iter.next();
                                        Product p = entry.getKey();
                                        ProductBean ordBean = new ProductBean();
                                        ordBean.setId(p.getId());
                                        ordBean.setName(p.getName());
                                        ordBean.setVersion(p.getVersion());
                                        ordBean.setDescription(p.getDescription());
                                        ordBean.setType(p.getProductType());
                                        entitledProds.put(ordBean, entry.getValue());
                                    }
                                    oInfo.setOrderables(entitledProds);
                                }
                                String desc = wrgKey.getDescription();
                                if (desc != null) {
                                    oInfo.setDescription(desc);
                                }

                                StartDateOptionsENC startDateOption = be.getStartDateOption();
                                if (startDateOption != null) {
                                    oInfo.setStartDateOption(startDateOption.toString());
                                }
                                oInfo.setStartDate(null);
                                String unknownStr = trueForm.getResourceString(
                                        "entitlement.expiration.unknown", null);
                                oInfo.setStartDateStr(unknownStr);
                                if (wrgKey.getExpirationDate() != null) {
                                    oInfo.setExpirationDateStr(trueForm.toGMTDateString(be
                                            .getExpirationDate()));
                                }
                                else if (wrgKey.getDuration() != null) {
                                    Duration dur = be.getDuration();
                                    String durationStr = dur.getLength()
                                            + " "
                                            + trueForm.getResourceString(dur.getDurationUnit()
                                                    .toString(), null);
                                    oInfo.setExpirationDateStr(durationStr);
                                }
                                else if (wrgKey.isPermanent()) {
                                    String permanentStr = trueForm.getResourceString(
                                            "entitlement.expiration.permanent", null);
                                    oInfo.setExpirationDateStr(permanentStr);
                                }
                                else {
                                    oInfo.setExpirationDateStr(unknownStr);
                                }
                                oInfo.setState(be.getEntitlementState().toString());
                                if (be.needsDatedVersion()) {
                                    oInfo.setVersionDateRequired("true");
                                    VersionDateOptionsENC versionDateOption = be
                                            .getVersionDateOption();
                                    if (versionDateOption != null) {
                                        oInfo.setVersionDateOption(versionDateOption.toString());
                                        if (be.getVersionDate() != null)
                                            oInfo.setVersionDateStr(trueForm.toGMTDateString(be
                                                    .getVersionDate()));
                                        Duration dur = be.getVersionDateDuration();
                                        if (dur != null) {
                                            oInfo.setVersionDateDuration(dur.getLength());
                                            oInfo.setVersionDateDurationType(dur.getDurationUnit()
                                                    .toString());
                                        }
                                    }
                                }
                                else {
                                    oInfo.setVersionDateRequired("false");
                                }

                                oInfo.setTotalNumberOfCopies(be.getNumberOfCopies());
                                oInfo.setNumberOfCopiesRemaining(be.getNumberOfCopies());
                                if (be.getLicenseModel() != null) {
                                    oInfo.setExtraActivationsAllowed(be.getExtraActivationsMax()
                                            + "");
                                    LicenseModel lm = be.getLicenseModel();

                                    if (lm.getLicenseTechnology().isFlexNet()) {
                                        IFlexnetLicenseModel selLM = (IFlexnetLicenseModel)lm;
                                        if (selLM.isTrustedServer()
                                                || selLM.isCountedCertificateModel()) {
                                            oInfo.setShowOverdraft(true);
                                            String resourceStr = trueForm.getResourceString(
                                                    "createLicenseModel.when.unlimited",
                                                    new String[0]);
                                            if (be.getOverdraftMax() == Integer.MAX_VALUE) {
                                                oInfo.setOverdraftAllowed(resourceStr);
                                                oInfo.setOverdraftAvailable(resourceStr);
                                            }
                                            else {
                                                oInfo.setOverdraftAllowed(be.getOverdraftMax() + "");
                                                oInfo.setOverdraftAvailable(be.getOverdraftMax()
                                                        + "");
                                            }

                                            if (be.getOverdraftCeiling() == Integer.MAX_VALUE)
                                                oInfo.setOverdraftCeiling(resourceStr);
                                            else {
                                                String percent = "";
                                                if (be.isOverdraftCeilingPercent()) {
                                                    percent = " %";
                                                }
                                                oInfo.setOverdraftCeiling(be.getOverdraftCeiling()
                                                        + percent);
                                            }

                                            if (be.getOverdraftFloor() == Integer.MAX_VALUE)
                                                oInfo.setOverdraftFloor(resourceStr);
                                            else {
                                                String percent = "";
                                                if (be.isOverdraftFloorPercent()) {
                                                    percent = " %";
                                                }
                                                oInfo.setOverdraftFloor(be.getOverdraftFloor()
                                                        + percent);
                                            }

                                        }
                                    }
                                    oInfo.setLicenseModel(lm.getName());
                                    IAttributeSet attbs = (IAttributeSet)be
                                            .getLicenseModelAttributes();

                                    Iterator iter = attbs.getDescriptors().iterator();
                                    while (iter.hasNext()) {
                                        CustomAttributeDescriptor ldesc = (CustomAttributeDescriptor)iter
                                                .next();
                                        LineItemsPrintDetailsForm.ObjectInfo.LicenseModelAttributeInfo lmattrInfo = oInfo
                                                .newLicenseModelAttributeInfo();
                                        lmattrInfo.setName(ldesc.getName());
                                        if (ldesc.getType().isDateType()) {
                                            Date d = attbs.getDateValue(ldesc);
                                            String str = "";
                                            if (d != null)
                                                str = trueForm.toGMTDateString(d);
                                            lmattrInfo.setValue(str);
                                        }
                                        else {
                                            lmattrInfo.setValue(attbs.getStringValue(ldesc));
                                        }
                                        oInfo.addLicenseModelAttribute(lmattrInfo);
                                    }

                                    LicenseLifecyclePolicy rehosts = be.getNumberOfRehostsPolicy();
                                    if (rehosts.getIsIgnored()) {
                                        oInfo.setShowRehosts("false");
                                    }
                                    else {
                                        oInfo.setShowRehosts("true");
                                        oInfo.setNumRehosts(rehosts.getNumOperations());
                                        oInfo.setNumRehostsDuration(rehosts.getDuration()
                                                .getLength());
                                        oInfo.setNumRehostsDurationUnit(rehosts.getDuration()
                                                .getDurationUnit().toString());
                                    }

                                    LicenseLifecyclePolicy returns = be.getNumberOfReturnsPolicy();
                                    if (returns.getIsIgnored()) {
                                        oInfo.setShowReturns("false");
                                    }
                                    else {
                                        oInfo.setShowReturns("true");
                                        oInfo.setNumReturns(returns.getNumOperations());
                                        oInfo.setNumReturnsDuration(returns.getDuration()
                                                .getLength());
                                        oInfo.setNumReturnsDurationUnit(returns.getDuration()
                                                .getDurationUnit().toString());
                                    }

                                    LicenseLifecyclePolicy repairs = be.getNumberOfRepairsPolicy();

                                    if (repairs.getIsIgnored()) {
                                        oInfo.setShowRepairs("false");
                                    }
                                    else {
                                        oInfo.setShowRepairs("true");
                                        oInfo.setNumRepairs(repairs.getNumOperations());
                                        oInfo.setNumRepairsDuration(repairs.getDuration()
                                                .getLength());
                                        oInfo.setNumRepairsDurationUnit(repairs.getDuration()
                                                .getDurationUnit().toString());
                                    }

                                    LicenseHostIdPolicy serverHostPolicy = be
                                            .getServerHostIdPolicyForPortal();
                                    if (serverHostPolicy.getIsIgnored()) {
                                        oInfo.setShowServerHostIdPolicy("false");
                                    }
                                    else {
                                        oInfo.setShowServerHostIdPolicy("true");
                                        String[] types = serverHostPolicy.getHostIdTypes();
                                        StringBuffer sb = new StringBuffer();
                                        if (types != null && types.length > 0) {
                                            for (int ii = 0; ii < types.length; ii++) {
                                                sb.append(ApplicationUtility.getResourceString(
                                                        types[ii], new String[0],
                                                        ThreadContextUtil.getLocale()));
                                                if (ii < types.length - 1)
                                                    sb.append(", ");
                                            }
                                        }
                                        oInfo.setAllowedServerHostsType(sb.toString());
                                    }

                                    LicenseHostIdPolicy nlHostPolicy = be
                                            .getNodeLockedHostIdPolicyForPortal();
                                    if (nlHostPolicy.getIsIgnored()) {
                                        oInfo.setShowNlHostIdPolicy("false");
                                    }
                                    else {
                                        oInfo.setShowNlHostIdPolicy("true");
                                        String[] types = nlHostPolicy.getHostIdTypes();
                                        StringBuffer sb = new StringBuffer();
                                        if (types != null && types.length > 0) {
                                            for (int ii = 0; ii < types.length; ii++) {
                                                sb.append(ApplicationUtility.getResourceString(
                                                        types[ii], new String[0],
                                                        ThreadContextUtil.getLocale()));
                                                if (ii < types.length - 1)
                                                    sb.append(", ");
                                            }
                                        }
                                        oInfo.setAllowedNlHostsType(sb.toString());
                                    }
                                }
                                if (be.getAlternateLicenseModel1() != null) {
                                    oInfo.setAltLM1(be.getAlternateLicenseModel1().getName());
                                }
                                if (be.getAlternateLicenseModel2() != null) {
                                    oInfo.setAltLM2(be.getAlternateLicenseModel2().getName());
                                }
                                if (be.getTimeZone() != null) {
                                    oInfo.setFnpTimeZone(be.getTimeZone().getName());
                                }
                                pForm.addObject(oInfo);
                            }
                        }
                        catch (OperationsException ex2) {
                            throw ex2;
                        }
                    }
                    else
                        throw ex1;
                }
            }
            request.setAttribute(getNonQualifiedClassName(pForm.getClass()), pForm);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseException duh) {
            rollback();
            setupErrorMessageForErrorFromBO(request, duh, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException duh) {
            rollback();
            setupErrorMessageForErrorFromBO(request, duh, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward viewCertificate(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, FlexnetBaseException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            String selectedId = trueForm.getSelectedId();

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            trueForm.setCertificateString(CommonUtils.getActivatableItemCertificateString(entMgr,
                    new Long(selectedId), ThreadContextUtil.getLocale(), getBaseURL(request)));

            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward previewEmailMessage(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response) {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            String selectedId = trueForm.getSelectedId();

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            String[] outputs = new String[3];
            Object[] objs = CommonUtils.getActivatableItemEmailSubjectAndBody(entMgr, new Long(
                    selectedId), ThreadContextUtil.getLocale());
            Entitlement parentEnt = (Entitlement)objs[0];
            GetEmailTemplateContentResponse template = (GetEmailTemplateContentResponse)objs[2];
            String messageSubject = template.getSubject();
            String contentType = null;
            String messageBody = null;
            if (template.getHtmlContent() != null && !template.getHtmlContent().isEmpty()) {
                messageBody = template.getHtmlContent();
                contentType = "text/html";
            }
            else if (template.getTextContent() != null && !template.getTextContent().isEmpty()) {
                messageBody = template.getTextContent();
                contentType = "text/plain";
            }

            if (contentType != null && (contentType).contains("text/html")) {
                trueForm.setHtmlEmail("true");
            }

            if (messageBody != null)
                trueForm.setMessageBody(messageBody);
            if (messageSubject != null)
                trueForm.setMessageSubject(messageSubject);

            String shipTo = CommonUtils.getEntitlementShipToEmail(parentEnt);
			if (shipTo != null) {

				if (StringUtils.isNotBlank(shipTo)
						&& StringUtils.contains(shipTo, User.OBSOLETE_DOMAIN)) {
					shipTo = null;
				}
				trueForm.setShipToEmail(shipTo);
			}

            if (parentEnt.getEntitlementType().equals(IEntitlement.ENTITLEMENT_TYPE_BULK)
                    && ThreadContextUtil.getLineItemID() != null
                    && !"".equals(ThreadContextUtil.getLineItemID())) {
                Long unknown_org_unit_id = ThreadContextUtil.getUnknownOrgUnitId();
                trueForm.setSoldToId(unknown_org_unit_id.toString());
            }
            else {
                trueForm.setSoldToId(parentEnt.getSoldTo().getId().toString());
            }

            // To select a language for email
            super.setLanguages(request, trueForm);

            return mapping.findForward("View");
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward sendEntitlementEmail(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response) throws IOException, FlexnetBaseException,
            MessagingException {
        try {
            if(AppConfigUtil
                    .getConfigBoolean("ops.enable.lineitme.email.captcha")) {
                boolean verify = false;
                String gRecaptchaResponse = request.getParameter("g-recaptcha-response");
                if (gRecaptchaResponse != null) {
                    try {
                        verify = verify(gRecaptchaResponse);
                        if (!verify) {
                            // error msg
                            // return getLoginError(request, mapping, "Recaptch validation is failed",
                            // logMessage)
                            return mapping.findForward(FORWARD_UNSUCCESSFUL);
                        }
                    } catch (IOException e) {
                        ActionErrors errors = new ActionErrors();
                        errors.add("error", new ActionError(e.getMessage()));
                        saveErrors(request, errors);
                        return mapping.findForward(ActionsConstants.FN_OOPS);

                    }
                }
            }
            if (!SecurityUtil.isValidRequest(request)) {
                return processInvalidRequest(mapping, request);
            }
            // If view as end user do not send the e-mail
            if (ThreadContextUtil.isReadOnlySession())
                throw new FlexnetReadOnlyUserException();
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            String sendTo = trueForm.getShipToEmail();

            String[] emailIds = null;
            if (sendTo != null) {
                StringTokenizer st = new StringTokenizer(sendTo, ",");
                emailIds = new String[st.countTokens()];
                int count = 0;
                while (st.hasMoreTokens()) {
                    emailIds[count++] = st.nextToken();
                }
            }

            String language = trueForm.getLanguage();
            Locale localeForEmail = null;
            if (language != null && language.trim() != "") {
                localeForEmail = InternationalizationService.getInstance().getLocale(language);
            }
            else {
                localeForEmail = ThreadContextUtil.getLocale();
            }

            String selectedId = trueForm.getSelectedId();
            GetEmailTemplateContentResponse template = getLocaleSpecificSubjectAndBody(entMgr,
                    selectedId, localeForEmail);

			CommonUtils.emailActivatableItem(entMgr, new Long(selectedId),
					CommonUtils.wrapEmailResponseTemplateInMap(template), emailIds, localeForEmail, getBaseURL(request),
					request.getSession().getId());

            this.setupInfoMessage(request, "previewEmail.infoMessage.sendEmail.success",
                    new String[] { sendTo });
            return mapping.findForward("successful");
        }
        catch (OperationsException ex) {
            rollback();
            if(ex.getMessage()!=null && ex.getMessage().contains("Email could not be sent to the recipients as the entitlement contact is obsolete."))
                this.setupErrorMessage(request, "portal.previewEmail.infoMessage.sendEmail.failureObsolete",
                        new String[] {  });
            else
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward("View");
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward("View");
        }
    }

    private GetEmailTemplateContentResponse getLocaleSpecificSubjectAndBody(
            IEntitlementManager entMgr, String selectedEnt, Locale locale)
            throws OperationsException {
        Object[] objs = CommonUtils.getActivatableItemEmailSubjectAndBody(entMgr, new Long(
                selectedEnt), locale);
        return (GetEmailTemplateContentResponse)objs[2];
    }

    private void loadObjectInfoFromBean(HttpServletRequest request,
            ActivatableItemsLandingPageForm trueForm, ActivatableItemPropertiesBean o)
            throws FlexnetBaseException, OperationsException {

        PortalStateBean portalBean = SessionUtils.getPortalStateBean(request);

        ActivatableItemsLandingConfigData configData = OperationsInitializer
                .getPortalActivatableItemsLandingConfigData();
        List columns = configData.getActivatableItemsCols();

        boolean isEntitlementIdLogin = portalBean.getIsLoggedInWithEntitlementID().booleanValue();
        boolean isLineItemIdLogin = portalBean.getIsLoggedInWithLineItemID().booleanValue();

        ActivatableItemsLandingPageForm.ObjectInfo oInfo = trueForm.newObjectInfo();
        if (o != null) {
            oInfo.setId(o.getId() + "");
        }

        Iterator colIter = columns.iterator();
        while (colIter.hasNext()) {
            PortalConfigBO column = (PortalConfigBO)colIter.next();
            //Changes are done for issue https://jira.flexera.com/browse/SWM-5503
            if (!column.isDisplay() && !column.getFieldName().equals("portal.manageEntitlements.TableColumn.ActivationID"))
                continue;
            
            String fieldName = null;
            if (!column.isDisplay() && column.getFieldName().equals("portal.manageEntitlements.TableColumn.ActivationID")) {
            	fieldName = "actvId";
            }else
            	fieldName = column.getFieldName();
            
            if ("portal.manageEntitlements.TableColumn.ProductDescription".equals(fieldName)) {
                trueForm.setShowProductDescription(true);
                continue;
            }
            if (isLineItemIdLogin) {
                if (fieldName.equals("portal.manageEntitlements.TableColumn.EntitlementID")
                        || fieldName
                                .equals("portal.manageEntitlements.TableColumn.ParentBulkEntitlementID")
                        || fieldName.equals("portal.manageEntitlements.TableColumn.SoldTo")
                        || fieldName.equals("portal.manageEntitlements.TableColumn.LineItemState"))
                    continue;
            }
            else if (isEntitlementIdLogin) {
                if (fieldName.equals("portal.manageEntitlements.TableColumn.EntitlementID")
                        || fieldName
                                .equals("portal.manageEntitlements.TableColumn.ParentBulkEntitlementID"))
                    continue;
            }

            ActivatableItemsLandingPageForm.ColumnInfo cInfo = trueForm.newColumnInfo();

            UICustomizerBean cbean = SessionUtils.getUICustomizerBean(request);
            boolean isHideLicenseSupportMenu = cbean.isHideLicenseSupportMenu();

            cInfo.setFieldName(fieldName);
            cInfo.setScreenName(column.getScreenName());
            cInfo.setSortable(column.isSortable());
            if (isLineItemIdLogin
                    && fieldName.equals("portal.manageEntitlements.TableColumn.ActivationID")) {
                cInfo.setDisplay(false);
            }
            else if (isHideLicenseSupportMenu
                    && fieldName.equals("portal.manageEntitlements.TableColumn.Type")) {
                cInfo.setDisplay(false);
            }
            else if (isHideLicenseSupportMenu
                    && fieldName.equals("portal.manageEntitlements.TableColumn.LicenseModel")) {
                cInfo.setDisplay(false);
            }
            else {
                cInfo.setDisplay(column.isDisplay());
            }
            // else if(isHideLicenseSupportMenu &&
            // fieldName.equals("portal.manageEntitlements.TableColumn.NumberOfCopies")){
            // cInfo.setDisplay(false);
            // }

            cInfo.setTrimType(column.getTrimValue());
            cInfo.setCustomAttribute(column.isCustomAttribute());
            cInfo.setCustomHostAttribute(column.isCustomHostAttribute());
            cInfo.setCustomLineItemAttribute(column.isCustomLineItemAttribute());

            if (fieldName.equals("portal.manageEntitlements.TableColumn.Type")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_ENTITLEMENT_TYPE);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.ActivationID")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_ID);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.EntitlementID")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_ENTITLEMENT_ID);
            }
            else if (fieldName
                    .equals("portal.manageEntitlements.TableColumn.ParentBulkEntitlementID")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_PARENT_BULK_ENTITLEMENT_ID);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.SoldTo")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_SOLD_TO_DISPLAY_NAME);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.BulkEntSoldTo")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_SOLD_TO_DISPLAY_NAME);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.EntitlementState")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_ENTITLEMENT_STATE);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.ProductName")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_ORDERABLE_NAME);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.ProductVersion")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_ORDERABLE_VERSION);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.NumberOfCopies")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_REMAINING_COPIES);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.ExpirationDate")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_EXPIRATION_DATE);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.ShipToEmail")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_SHIP_TO_EMAIL);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.ShipToAddress")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_SHIP_TO_ADDRESS);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.OrderId")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_ORDER_ID);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.OrderLineNumber")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_ORDER_LINE_NUMBER);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.StartDate")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_START_DATE);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.VersionDate")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_VERSION_DATE);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.PartNumber")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_SKU);
            }
            else if (fieldName
                    .equals("portal.manageEntitlements.TableColumn.PartNumberDescription")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_SKU_DESCRIPTION);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.LicenseModel")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_LICENSE_MODEL_NAME);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.Description")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_DESCRIPTION);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.TotalCopies")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_NUMBER_OF_COPIES);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.ParentLineItem")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_PARENT_ENTITLEMENT);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.LineItemState")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_STATE);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.FulfilledAmount")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_FULFILLED_AMOUNT);
            }
            else if (fieldName
                    .equals("portal.manageEntitlements.TableColumn.extraActivationsAllowed")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_EXTRA_ACTIVATIONS_ALLOWED);
            }
            else if (fieldName
                    .equals("portal.manageEntitlements.TableColumn.remainingExtraActivations")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_LINE_ITEM_REMAINING_EXTRA_ACTIVATIONS);
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.overdraftMax")) {
                cInfo.setSortable(false);
                cInfo.setSortColumnName("");
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.overdraftRemaining")) {
                cInfo.setSortable(false);
                cInfo.setSortColumnName("");
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.overdraftCeiling")) {
                cInfo.setSortable(false);
                cInfo.setSortColumnName("");
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.overdraftFloor")) {
                cInfo.setSortable(false);
                cInfo.setSortColumnName("");
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.noOfRehosts")) {
                cInfo.setSortable(false);
                cInfo.setSortColumnName("");
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.noOfReturns")) {
                cInfo.setSortable(false);
                cInfo.setSortColumnName("");
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.noOfRepairs")) {
                cInfo.setSortable(false);
                cInfo.setSortColumnName("");
            }
            else if (fieldName.equals("portal.manageEntitlements.TableColumn.Maintenance")) {
                cInfo.setSortColumnName(UIUtils.SEARCH_MAINTENANCE_EXPIRATION_DATE);
            }
            // NOTE: don't setSortable(true), because
            // it overrides the database setting
            else if (column.isCustomAttribute()) {
                if (configData.isStringAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_STRING_LICENSE_MODEL_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else if (configData.isBooleanAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_BOOLEAN_LICENSE_MODEL_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else if (configData.isNumberAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_NUMBER_LICENSE_MODEL_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else if (configData.isDateAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_DATE_LICENSE_MODEL_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else {
                    // no custom attribute by this name exists
                    cInfo.setSortable(false);
                }
            }
            else if (column.isCustomLineItemAttribute()) {
                if (configData.isStringLineItemAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_STRING_LINE_ITEM_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else if (configData.isBooleanLineItemAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_BOOLEAN_LINE_ITEM_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else if (configData.isNumberLineItemAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_NUMBER_LINE_ITEM_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else if (configData.isDateLineItemAttribute(column.getFieldName())) {
                    cInfo.setSortColumnName(UIUtils.SEARCH_DATE_LINE_ITEM_ATTRIBUTE + ":"
                            + column.getFieldName());
                }
                else {
                    // no custom attribute by this name exists
                    cInfo.setSortable(false);
                }
            }

            cInfo.setDisplayOrder(column.getDisplayOrder());
            cInfo.setDisplaySize(column.getDisplaySize());

            String val = "";

            if (o != null) {
                IPartnerOrgManager pOrgMgr = OperationsServiceFactory.getPartnerOrgManager();

                Map<ProductBean, Integer> prdMap = o.getEntitledOrderables();
                Map<Long, ChannelPartnerBean> cpDos = o.getChannelPartners();

                if (fieldName.equals("portal.manageEntitlements.TableColumn.Type")) {
                    val = o.getType();
                    oInfo.setTypeIcon(o.getIconType());
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.ActivationID")) {
                    val = o.getActivationId();
                }
                else if(fieldName.equals("actvId")) {
                	val = o.getActivationId();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.EntitlementID")) {
                    if (CommonUtils.canShowEntitlementId(new Long(o.getEntitlementUniqueId()))) {
                        oInfo.setParentId(o.getEntitlementUniqueId() + "");
                        val = o.getEntitlementId();
                    }
                }
                else if (fieldName
                        .equals("portal.manageEntitlements.TableColumn.ParentBulkEntitlementID")) {
                    if (o.getParentBulkEntitlementUniqueId() != null) {
                        if (CommonUtils.canShowParentBulkEntitlementId(o
                                .getParentBulkEntitlementUniqueId()))
                            val = o.getParentBulkEntitlementId();
                    }
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.SoldTo")) {
                    val = o.getSoldTo();
                    cInfo.setSoldToName(o.getSoldToName());
                    if (cpDos != null && !cpDos.isEmpty()) {
                        List<String[]> cps = new ArrayList<String[]>();
                        Collection<ChannelPartnerBean> channelPartners = cpDos.values();
                        Iterator<ChannelPartnerBean> cpIter = channelPartners.iterator();
                        while (cpIter.hasNext()) {
                            ChannelPartnerBean cpdo = cpIter.next();
                            if (!IEntitlementLineItem.TYPE_KEY.equals(o.getActivatableItemType())
                                    && cpdo.isEndCustomer()) {
                                continue;
                            }

                            orgId = cpdo.getOrgUnitName();
                            String orgDisplayName = cpdo.getOrgUnitName() + " ("
                                    + cpdo.getOrgUnitDisplayName() + ")";
                            if (!pOrgMgr.canLoggedInUserSeeOrg(cpdo.getOrgUnitId()))
                                orgDisplayName = trueForm
                                        .getResourceString(
                                                "operationsportal.manageEntitlements.label.orgname.withheld",
                                                null);
                            if (cpdo.isCurrentOwner())
                                cps.add(new String[] { cpdo.getPartnerTierName(),
                                        orgDisplayName, "true" });
                            else
                                cps.add(new String[] { cpdo.getPartnerTierName(),
                                        orgDisplayName, "false" });
                        }
                        cInfo.setChannelPartners(cps);
                    }
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.BulkEntSoldTo")) {
                    val = o.getBulkEntSoldTo();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.EntitlementState")) {
                    val = o.getEntitlementState();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.ProductName")) {
                    cInfo.setOrderables(prdMap);
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.ProductVersion")) {
                    Set<ProductBean> keySet = prdMap.keySet();
                    Object[] parms = keySet.toArray();
                    ProductBean bean = (ProductBean)parms[0];
                    val = bean.getVersion();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.Maintenance")) {
                    cInfo.setMaintenanceItems(o.getMaintenanceItems());
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.NumberOfCopies")) {
                  val = o.getRemainingCount() + "";
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.ExpirationDate")) {
                    val = o.getExpiration();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.ShipToEmail")) {
                    val = o.getShipToEmail();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.ShipToAddress")) {
                    val = o.getShipToAddress();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.OrderId")) {
                    val = o.getOrderId();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.OrderLineNumber")) {
                    val = o.getOrderLineNum();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.StartDate")) {
                    val = o.getStartDateStr();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.VersionDate")) {
                    val = o.getVersionDateStr();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.PartNumber")) {
                    val = o.getSku();
                }
                else if (fieldName
                        .equals("portal.manageEntitlements.TableColumn.PartNumberDescription")) {
                    val = o.getSkuDesc();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.LicenseModel")) {
                    val = o.getLicenseModel();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.Description")) {
                    val = o.getDescription();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.TotalCopies")) {
                    val = o.getSeatCount() + "";
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.ParentLineItem")) {
                    val = o.getParentLineItem();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.LineItemState")) {
                    val = o.getState();
                }
                else if (fieldName.equals("portal.manageEntitlements.TableColumn.FulfilledAmount")) {
                  val = o.getFulfilledAmount() + "";
                }
                else if (column.isCustomAttribute()) {
                    val = o.getCustomAttr(fieldName);
                }
                else if (column.isCustomLineItemAttribute()) {
                    val = o.getLineItemAttr(fieldName);
                }
            }
            cInfo.setVal(val);
            oInfo.addColValue(cInfo);
        }
        trueForm.addObject(oInfo);
    }

    public ActionForward transfer(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, FlexnetBaseException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS) || CommonUtils.isConfigHidden(TRANSFER_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            String[] selectedIDs = trueForm.getSelectedObjects();

            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();

            boolean isChildLineItem = false;
            String childLineItemType = "";
            try {
                IEntitlementLineItem li = (IEntitlementLineItem)entMgr
                        .getEntitlementLineItemByID(new Long(selectedIDs[0]));
                if (li != null) {
                    if (li.isTest()) {
                        setupErrorMessage(request,
                                "portal.manageEntitlements.message.canNotTransferTestLineItem",
                                new String[0]);
                        return mapping.findForward(FORWARD_UNSUCCESSFUL);
                    }
                    if (li.isUpgrade()) {
                        childLineItemType = "Upgrade";
                        isChildLineItem = true;
                    }
                    else if (li.isUpsell()) {
                        childLineItemType = "Upsell";
                        isChildLineItem = true;
                    }
                    else if (li.isRenew()) {
                        childLineItemType = "Renew";
                        isChildLineItem = true;
                    }
                }
            }
            catch (OperationsException ex1) {
                if (ex1.getCause() instanceof NoDataFoundException) {
                    IWebRegKey wrgKey = (IWebRegKey)entMgr
                            .getWebRegKeyByID(new Long(selectedIDs[0]));
                    setupErrorMessage(request, "activations.message.canNotTransferWebRegKey",
                            new String[0]);
                    return mapping.findForward(FORWARD_UNSUCCESSFUL);
                }
                else
                    throw ex1;
            }

            TransferLineItemStateBean bean = SessionUtils.getTransferLineItemStateBean(request);
            bean.resetCache();
            bean.setLineItemObjId(selectedIDs[0]);
            bean.setChildLineItem(isChildLineItem);
            bean.setChildLineItemType(childLineItemType);
            SessionUtils.setTransferLineItemStateBean(request, bean);
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward splitLineItem(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, FlexnetBaseException {
        try {
            if (CommonUtils.isConfigHidden(LIST_ENTITLEMENTS) && CommonUtils.isConfigHidden(SPLIT_ENTITLEMENTS) && CommonUtils.isConfigHidden(SPLIT_BULK_ENTITLEMENTS)) {
                return mapping.findForward(ActionsConstants.FN_OOPS);
            }
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            String[] selectedIDs = trueForm.getSelectedObjects();
            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            try {
                IWebRegKey webRegKey = (IWebRegKey)entMgr
                        .getWebRegKeyByID(new Long(selectedIDs[0]));
                this.setupErrorMessage(request,
                        "operationsportal.manageEntitlements.alert.cannotSplitWebRegKey", null);
            }
            catch (OperationsException ex1) {
                if (ex1.getCause() instanceof NoDataFoundException) {
                    try {
                        IEntitlementLineItem li = (IEntitlementLineItem)entMgr
                                .getEntitlementLineItemByID(new Long(selectedIDs[0]));
                        ISplitManager mgr = OperationsServiceFactory.getSplitManager();
                        mgr.canSplitLineItem(li);
                        ActionForward fwd = mapping.findForward(FORWARD_SUCCESSFUL);
                        Map extraParams = new HashMap();
                        extraParams.put("splitBean.lineItemObjId", selectedIDs[0]);
                        return getRedirect(fwd, extraParams);
                    }
                    catch (OperationsException ex2) {
                        throw ex2;
                    }
                }
                else {
                    throw ex1;
                }
            }
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
        catch (FlexnetBaseRuntimeException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward exportAsCSVSize(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, IOException {
        try {
            IResultsList resultList = SessionUtils.getEntitlementsStateBean(request)
                    .getActivatableItemsItemSet();
            ServletOutputStream stream = response.getOutputStream();
            StringBuffer buffer = new StringBuffer();
            buffer.append("{\"exportedCSVSize\"");
            buffer.append(": ");
            buffer.append("\"").append(resultList.getTotalNumberOfRows()).append("\"");
            buffer.append("}");
            stream.print(buffer.toString());
            stream.flush();
            stream.close();
            return null;
        }
        catch (OperationsException ex) {
            rollback();
            setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    public ActionForward exportAsCSV(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response)
            throws IllegalAccessException, InvocationTargetException, NoSuchMethodException,
            IllegalStateException, IOException {
        try {
            ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
            IResultsList resultList = null;
            String selected = request.getParameter("selected");
            List<ActivatableItemPropertiesBean> l = new ArrayList<>();

            if (selected.equalsIgnoreCase(Boolean.TRUE.toString())) {
                IOperationsQuery qry = new IOperationsQuery();
                String[] selectedObjects = trueForm.getSelectedObjects();
                Long[] selectedIds = null;
                if (selectedObjects != null) {
                    selectedIds = new Long[selectedObjects.length];
                    for (int i = 0; i < selectedObjects.length; i++) {
                        selectedIds[i] = new Long(selectedObjects[i]);
                    }
                }
                qry.createQueryParameter(IEntitlement.LINE_ITEM_UNIQUE_ID,
                        selectedIds);
                qry.setBatchSize(getPaginationSize());
                IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                        .getEntitlementManager();
                resultList = entMgr
                        .getActivatableItemsPropertiesBean(qry, trueForm.getDateFormat());
                /*
                 * The result list will be iterated over only for the current
                 * page in order to retrieve the selected items. Here we do not
                 * hit the DB by calling 'nextPage()'.
                 */
                while (resultList.hasNextPage()) {
                    l.addAll(resultList.nextPage());
                }

            }
            else {
                resultList = SessionUtils.getEntitlementsStateBean(request)
                        .getActivatableItemsItemSet();
                IOperationsQuery qry = resultList.getQuery();
                // export everything; build the result list again with leaf line set to false
                qry.setListLeafLinesOnly(false);
                IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                        .getEntitlementManager();
                resultList = entMgr
                        .getActivatableItemsPropertiesBean(qry, trueForm.getDateFormat());
                while (resultList.hasNextPage()) {
                    l.addAll(resultList.nextPage());
                }
            }
            loadFormFromBean(request, trueForm, l);
            String csv = buildCSV(trueForm);
            responseAsCSV(csv, "ActivatableItems.csv", request, response);
            return null;
        }
        catch (OperationsException | FlexnetBaseRuntimeException | FlexnetBaseException e) {
            rollback();
            setupErrorMessageForErrorFromBO(request, e, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }

    private String buildCSV(ActivatableItemsLandingPageForm trueForm) {
        String lineSeparator = System.getProperty("line.separator");
        StringBuffer buffer = new StringBuffer();
        List objects = trueForm.getObjects();
        Iterator objItr = objects.iterator();
        // Iterating for rendering field name headers...
        if (objItr.hasNext()) {
            ActivatableItemsLandingPageForm.ObjectInfo objInfo = (ActivatableItemsLandingPageForm.ObjectInfo)objItr
                    .next();
            List colValues = objInfo.getColValues();
            Iterator colValuesItr = colValues.iterator();
            while (colValuesItr.hasNext()) {
                ColumnInfo colInfo = (ColumnInfo)colValuesItr.next();
                String columnLabel = colInfo.getFieldName() + ".label";
                String columnHeader = InternationalizationService.getInstance().getString(
                        columnLabel);
                if (columnHeader.startsWith("??")) {
                    columnLabel = colInfo.getFieldName();
                    columnHeader = InternationalizationService.getInstance().getString(columnLabel);
                }
                if (columnHeader.startsWith("??")) {
                    columnHeader = colInfo.getFieldName();
                }
                buffer.append(columnHeader);
                if (colValuesItr.hasNext())
                    buffer.append(",");
            }
            buffer.append(lineSeparator);
        }
        objItr = objects.iterator();
        // Iterating for rendering values...
        while (objItr.hasNext()) {
            ActivatableItemsLandingPageForm.ObjectInfo objInfo = (ActivatableItemsLandingPageForm.ObjectInfo)objItr
                    .next();
            List colValues = objInfo.getColValues();
            Iterator colValuesItr = colValues.iterator();
            while (colValuesItr.hasNext()) {
                ColumnInfo colInfo = (ColumnInfo)colValuesItr.next();
                if (colInfo.getFieldName().equals(
                        "portal.manageEntitlements.TableColumn.ProductName")) {
                    Map<ProductBean, Integer> orderablesMap = colInfo.getOrderables();
                    Set<ProductBean> keySet = orderablesMap.keySet();
                    Iterator<ProductBean> itr = keySet.iterator();
                    StringBuffer productBuffer = new StringBuffer();
                    while (itr.hasNext()) {
                        ProductBean bean = itr.next();
                        productBuffer.append(bean.getName());
                        productBuffer.append("(Version:");
                        productBuffer.append(bean.getVersion()).append(",");
                        productBuffer.append("Qty/Copy:");
                        productBuffer.append(orderablesMap.get(bean));
                        productBuffer.append(")");
                        if (itr.hasNext())
                            productBuffer.append(",");
                    }
                    buffer.append(CommonUtils.handleComma(productBuffer.toString()));
                }
                else if (colInfo.getFieldName()
                        .equals("portal.manageEntitlements.TableColumn.Type")) {
                    buffer.append(CommonUtils.handleComma(objInfo.getTypeIcon()));
                }
                else if (colInfo.getFieldName().equals(
                        "portal.manageEntitlements.TableColumn.Maintenance")) {
                    StringBuffer mLiBuffer = new StringBuffer();
                    List<MaintenanceItemPropertiesBean> mList = colInfo.getMaintenanceItems();
                    Iterator<MaintenanceItemPropertiesBean> mListItr = mList.iterator();
                    while (mListItr.hasNext()) {
                        MaintenanceItemPropertiesBean bean = mListItr.next();
                        mLiBuffer.append(bean.getMaintenance().getName());
                        // Use InternationalizationService for value keys, to
                        // match locale
                        mLiBuffer.append("("
                                + InternationalizationService.getInstance().getString(
                                        "operationsportal.maintenanceInfo.version") + ":"
                                + bean.getMaintenance().getVersion());
                        if (bean.getExpirationDate() != null) {
                            mLiBuffer.append(","
                                    + InternationalizationService.getInstance().getString(
                                            "operationsportal.maintenanceInfo.expiration") + ":"
                                    + toGMTDateString(bean.getExpirationDate()) + ")");
                        }
                        else if (bean.isPermanent()) {
                            mLiBuffer.append(","
                                    + InternationalizationService.getInstance().getString(
                                            "operationsportal.maintenanceInfo.expiration")
                                    + ":"
                                    + InternationalizationService.getInstance().getString(
                                            "operationsportal.maintenanceInfo.expirationPermanent")
                                    + ")");
                        }

                        if (mListItr.hasNext())
                            mLiBuffer.append(",");
                    }
                    buffer.append(CommonUtils.handleComma(mLiBuffer.toString()));
                }
                else if (colInfo.getFieldName().equals(
                        "portal.manageEntitlements.TableColumn.SoldTo")) {
                    List<String[]> orgs = colInfo.getChannelPartners();
                    StringBuffer orgBuffer = new StringBuffer();
                    Iterator<String[]> itr = orgs.iterator();
                    while (itr.hasNext()) {
                        String[] orgInfo = itr.next();
                        String orgType = orgInfo[0];
                        String orgName = orgInfo[1];
                        String orgEnumName = InternationalizationService.getInstance().getString(
                                orgType);
                        orgBuffer.append(orgEnumName + ":" + orgName);
                        if (itr.hasNext())
                            orgBuffer.append(",");
                    }
                    buffer.append(CommonUtils.handleComma(orgBuffer.toString()));
                }
                else {
                    buffer.append(CommonUtils.handleComma(colInfo.getVal()));
                }
                if (colValuesItr.hasNext())
                    buffer.append(",");
            }
            buffer.append(lineSeparator);
        }
        return buffer.toString();
    }

    public String lastView(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) {
        ActivatableItemsLandingPageForm trueForm = (ActivatableItemsLandingPageForm)form;
        try {
            IEntitlementManager entMgr = (IEntitlementManager)OperationsServiceFactory
                    .getEntitlementManager();
            EntitlementsStateBean esBean = SessionUtils.getEntitlementsStateBean(request);
            IResultsList rl = esBean.getActivatableItemsItemSet();
            IOperationsQuery qry = rl.getQuery();
            rl = entMgr.getActivatableItemsPropertiesBean(qry, trueForm.getDateFormat());
            List l = rl.nextPage();
            esBean.setActivatableItemsItemSet(rl);

            loadPagingAttributesForLargeData(request, trueForm, rl, l,
                    esBean.getEntitlementsLandingPaginationAttributes());
            trueForm.setSearchType(SEARCHTYPE_SIMPLE);
            trueForm.setSearchCategory("LINE_ITEM_ID");
            loadFormFromBean(request, trueForm, l);
            SessionUtils.setEntitlementsStateBean(request, esBean);
            setLeafNodeDisplay(request, rl.getQuery());
            return FORWARD_SUCCESSFUL;
        }
        catch (Exception ex) {}
        return FORWARD_UNSUCCESSFUL;
    }

    public static boolean verify(String gRecaptchaResponse) throws IOException {

        final String url = "https://www.google.com/recaptcha/api/siteverify";
        if (gRecaptchaResponse == null || "".equals(gRecaptchaResponse)) {
            return false;
        }
        try {
            String secret = AppConfigUtil.getConfigString("authentication.recaptcha.secretkey");
            URL obj = new URL(url);
            HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

            // add reuqest header
            con.setRequestMethod("POST");
            // con.setRequestProperty
            con.setRequestProperty("Accept-Language", "en-US");

            String postParams = "secret=" + secret + "&response=" + gRecaptchaResponse;
            // Send post request
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // parse JSON response and return 'success' value
            JsonReader jsonReader = Json.createReader(new StringReader(response.toString()));
            JsonObject jsonObject = jsonReader.readObject();
            jsonReader.close();

            return jsonObject.getBoolean("success");
        } catch (Exception e) {
            return false;
        }
    }
}
