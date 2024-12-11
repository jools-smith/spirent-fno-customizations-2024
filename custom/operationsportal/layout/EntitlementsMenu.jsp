<%@page pageEncoding="UTF-8"%>
<%@page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<%@page import="com.flexnet.products.publicapi.IPermissionENC"%>
<%-- Gather configuration switches and permissions --%>
<%@ page import="com.flexnet.platform.config.AppConfigUtil"%> 

<%    	String hideRegisterForTrial = AppConfigUtil.getConfigString("operationsportal.hideRegisterForTrial");
    	request.setAttribute("hideRegisterForTrial", hideRegisterForTrial );
%>
								
<c:set var="portalStateBean">
    <%=PortalStateBean.PORTAL_STATE_BEAN_ID%>
</c:set>
<c:set var="portalCustomizerBean" value="${sessionScope[portalStateBean].customizerBean}" />
<c:set var="menuPosition" value='${fn:split(sessionScope[portalStateBean].menuPosition, ".")[3]}' />
<c:set var="navType">
    <c:if test="${menuPosition =='left' || menuPosition =='right'}">vertical</c:if>
</c:set>
<c:set var="isChannelPartnerUser" value="${sessionScope[portalStateBean].isChannelPartnerUser}" />
<c:set var="isPublisherUser" value="${sessionScope[portalStateBean].isPublisherUser}" />
<c:set var="isCustomerUser" value="${sessionScope[portalStateBean].isCustomerUser}" />
<c:set var="isLoggedInAsCustomerUser" value="${sessionScope[portalStateBean].isLoggedInAsCutomerUser}" />
<c:set var="isLoggedInUsingPortalAccount" value="${sessionScope[portalStateBean].isLoggedInUsingPortalAccount}" />
<c:set var="isLoggedInAsSelfRegUser" value="${sessionScope[portalStateBean].isLoggedInAsSelfRegUser}" />
<c:set var="isLoggedInWithEntitlementID" value="${sessionScope[portalStateBean].isLoggedInWithEntitlementID}" />
<c:set var="isLoggedInWithLineItemID" value="${sessionScope[portalStateBean].isLoggedInWithLineItemID}" />
<c:set var="showBulkEntitlements" value="false" />
<c:if test="${(isChannelPartnerUser || isPublisherUser) && !isLoggedInWithEntitlementID && !isLoggedInWithLineItemID}">
    <c:set var="showBulkEntitlements" value="true" />
</c:if>

<c:set var="showExpiringEntitlements" value="false" />
<c:if test="${isCustomerUser || isPublisherUser}">
    <c:set var="showExpiringEntitlements" value="true" />
</c:if>

<li class="parent">
    <span class="nav-area-title"><a data-toggle="dropdown" role="button" id="nav-entitlements"><fmt:message key="primaryNav.heading.Entitlements" /></a></span>
    <ul class="one-col" role="menu" aria-labelledby="nav-entitlements">
        <li>
            <div class="span3 nav-column" id="b1">
                <fno-v2:actionlist type="${navType}">
                    <%-- Display "List All Entitlements" (Landing Page) link in list --%>
                    <c:set var="listAllEntitlements">
                        ${appContextPath}/operationsportal/activatables_VIEW.do
                    </c:set>
                    <fno-v2:actionitem linkid="activatable-entitlements"
                        onClick='listAllEntitlements'>
                        <fmt:message key="primaryNav.menu.item.Entitlements" />
                    </fno-v2:actionitem>
                    <!-- TODO: Need to enforce license/permission check before we display "Expiring Entitlements" -->
                    <c:if test="${showExpiringEntitlements}">
	                    <fno:authorize ifAllGranted="<%=IPermissionENC.PORTAL_VIEW_EXPIRING_ENTITLEMENTS.getName()%>">
		                    <c:set var="expiringEntitlementsLandingPage">
		                        ${appContextPath}/operationsportal/expiringEntitlements
		                    </c:set>                    
		                    <fno-v2:actionitem linkid="expiring-entitlements"
		                        onClick='expiringEntitlementsLandingPage'>
		                        <fmt:message key="primaryNav.menu.item.ExpiringEntitlements" />
		                    </fno-v2:actionitem>
	                    </fno:authorize>
                    </c:if>            
                    <c:if test="${showBulkEntitlements}">
                        <%-- Display "List All ..." (Landing Page) action as second action in list--%>
                        <c:set var="listBulkEntitlements">
                            ${appContextPath}/operationsportal/bulkEntitlements_VIEW.do
                        </c:set>
                        <fno-v2:actionitem linkid="bulk-entitlements" onClick='listBulkEntitlements'>
                            <fmt:message key="primaryNav.menu.item.BulkEntitlements" />
                        </fno-v2:actionitem>
                    </c:if>
                    <%-- DR: Spirent, June 19, 2018
                    <c:set var="manualActivationUrl">
                       ${appContextPath}/operationsportal/manualActivation_VIEW.do
                    </c:set>
                    <c:if test="${!portalCustomizerBean.hideLicenseSupportMenu }">
                        <fno-v2:actionitem linkid="manual-activation"
                            onClick='manualActivationUrl'>
                            <fmt:message key="primaryNav.menu.item.ManualActivation" />
                        </fno-v2:actionitem>
                    </c:if>
                     --%>
                    <c:if test="${(isLoggedInUsingPortalAccount || isLoggedInAsSelfRegUser || isLoggedInAsCustomerUser) && !portalCustomizerBean.hideMapActivationIdsLink}">
                        <c:set var="mapIds">/flexnet/operationsportal/redeemEntitlements_VIEW.do?cancelKey=ManageEntitlements</c:set>
                        <fno-v2:actionitem linkid="map-ids" onClick="mapIds">
                            <fmt:message key="operationsportal.manageEntitlements.ButtonLabel.mapIds" />
                        </fno-v2:actionitem>
                    </c:if>
                    
                    <c:if test="${!hideRegisterForTrial}">
	                    <c:if test="${!isLoggedInWithEntitlementID && !isLoggedInWithLineItemID}">
		                    <c:set var="listTrialProducts">
		                        ${appContextPath}/operationsportal/trialRegistrationForExistingUser.do
		                    </c:set>
		                    <fno-v2:actionitem linkid="list-trials" onClick='listTrialProducts'>
		                         <fmt:message key="operationsportal.RegisterTrial.LinkLabel.listTrials" />
		                    </fno-v2:actionitem>
	                    </c:if>
                    </c:if>
                </fno-v2:actionlist>
            </div>
        </li>
    </ul>
</li>