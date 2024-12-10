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
 */

package com.flexnet.operationsportal.web.actions.activations;

import java.lang.reflect.InvocationTargetException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.flexnet.operations.publicapi.ChannelPartner;
import com.spirent.fno.utils.SpirentUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.flexnet.operations.api.IFulfillmentManager;
import com.flexnet.operations.api.IFulfillmentRecord;
import com.flexnet.operations.publicapi.EntityStateENC;
import com.flexnet.operations.publicapi.OperationsException;
import com.flexnet.operations.publicapi.OperationsServiceFactory;
import com.flexnet.operations.web.beans.FulfillmentPropertiesBean;
import com.flexnet.operations.web.beans.SupportLicensesStateBean;
import com.flexnet.operations.web.util.SessionUtils;
import com.flexnet.operationsportal.web.actions.fulfillments.LicenseFileBaseAction;
import com.flexnet.operationsportal.web.forms.activations.LicenseSummaryLandingPageForm;
import com.flexnet.platform.exceptions.FlexnetBaseException;
import com.flexnet.platform.web.actions.ActionsConstants;
import com.flexnet.platform.web.utils.ThreadContextUtil;

public class LicenseSummaryLandingPageAction extends LicenseFileBaseAction {

    private String FORWARD_SUCCESSFUL_UNIFIED_HOST = "view_unifiedHost";

    public ActionForward view(ActionMapping mapping, ActionForm form, HttpServletRequest request,
            HttpServletResponse response) throws IllegalAccessException, InvocationTargetException,
            NoSuchMethodException, IllegalStateException, FlexnetBaseException {
        try {
            LicenseSummaryLandingPageForm trueForm = (LicenseSummaryLandingPageForm)form;
            SupportLicensesStateBean slBean = SessionUtils.getSupportLicensesStateBean(request);

            IFulfillmentRecord currentFulfillment = null;

            if (slBean.isOfflineActivationContext()) {
                loadFormFromBean(request, trueForm, slBean.getFulfillmentPropBeans());
                trueForm.setTrustedType(true);
                trueForm.setLicenseSummaryPage(true);
                if (slBean.getFulfillmentPropBeans() != null
                        && slBean.getFulfillmentPropBeans().size() > 0) {
                    trueForm.setSoldTo(slBean.getFulfillmentPropBeans().get(0)
                            .getSoldToDisplayName());
                }
            }
            else {
                Set fulfills = slBean.getFulfillments();
                List frs = new LinkedList();
                if (fulfills != null && fulfills.size() > 0) {

                    IFulfillmentManager fmtMgr = OperationsServiceFactory.getFulfillmentManager();
                    Iterator iter = fulfills.iterator();
                    while (iter.hasNext()) {
                        String fulfillId = (String)iter.next();
                        currentFulfillment = fmtMgr.getFulfillmentByFulfillmentID(fulfillId);
                        trueForm.setSoldTo(currentFulfillment.getLineItem().getParentEntitlement()
                                .getSoldTo().getDisplayName());
                        if (EntityStateENC.ON_HOLD.equals(currentFulfillment.getState())) {
                            trueForm.setShowOnHoldMsg(true);
                        }
                        frs.add(new FulfillmentPropertiesBean(currentFulfillment, trueForm
                                .getDateFormat(), ThreadContextUtil.getLocale()));
                    }
                }
                loadFormFromBean(request, trueForm, frs);
            }
            if (slBean.getUnifiedHostId() != null) {
                trueForm.setUnifiedHostId(slBean.getUnifiedHostId());
            }
            if (slBean.isLicenseLifeCycleContext()) {
                trueForm.setLicenseLifeCycleContext("true");
            }
            else {
                trueForm.setLicenseLifeCycleContext("false");
            }
            trueForm.setActivationNeededHost(slBean.isActivationNeededHost());
            trueForm.setActivationNeededCount(slBean.isActivationNeededCount());
            if (trueForm.isShowOnHoldMsg()) {
                this.setupInfoMessage(request, "portal.licenseSummary.message.onholdfulfillment",
                        new String[] {});
            }

            /** Revenera GCS 2024.12.10 */
            if (CollectionUtils.isNotEmpty(slBean.getFulfillments())) {
                final AtomicBoolean found = new AtomicBoolean();

                /// this is a distillation of Lars' code
                for (final Object fulfillId : slBean.getFulfillments()) {

                    final Set<ChannelPartner> partners = OperationsServiceFactory.getFulfillmentManager()
                            .getFulfillmentByFulfillmentID(fulfillId.toString())
                            .getLineItem()
                            .getParentEntitlement()
                            .getEntChannelPartners();

                    SpirentUtils.getFirstTier1ChannelPartner(partners).ifPresent(cp -> {
                        trueForm.setSoldTo(cp.getOrgUnit().getDisplayName());
                        found.set(true);
                    });

                    if (found.get()) {
                        /// probably have gone far enough now
                        break;
                    }
                }
            }
            /** to here */
            return mapping.findForward(FORWARD_SUCCESSFUL);
        }
        catch (OperationsException ex) {
            this.setupErrorMessageForErrorFromBO(request, ex, ActionsConstants.MSG_ERROR);
            return mapping.findForward(FORWARD_UNSUCCESSFUL);
        }
    }
}
