<%@page pageEncoding="UTF-8"%>
<%@page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<%@page import="com.flexnet.products.publicapi.IPermissionENC"%>
<%-- Import configuration switches --%>
<c:set var="portalStateBean">
    <%=PortalStateBean.PORTAL_STATE_BEAN_ID%>
</c:set>
<c:set var="portalCustomizerBean"
    value="${sessionScope[portalStateBean].customizerBean}" />
<c:set var="menuPosition"
    value='${fn:split(sessionScope[portalStateBean].menuPosition, ".")[3]}' />
<c:set var="navType">
    <c:if test="${menuPosition =='left' || menuPosition =='right'}">vertical</c:if>
</c:set>    
<c:set var="hideHostDeviceTransferJobsLink"
    value="${portalCustomizerBean.hideHostDeviceTransferJobsLink}" />
<c:set var="LoggedInWithEntitlementId"
    value="${sessionScope[portalStateBean].entitlementID}" />
<c:set var="LoggedInWithLineItemId"
    value="${sessionScope[portalStateBean].lineItemID}" />
<c:set var="isLoggedInUsingPortalAccount"
    value="${sessionScope[portalStateBean].isLoggedInUsingPortalAccount}" />
<c:set var="isLoggedInAsCustomerUser"
    value="${sessionScope[portalStateBean].isLoggedInAsCutomerUser}" />
<c:set var="isPublisherUser"
    value="${sessionScope[portalStateBean].isPublisherUser}" />
<c:set var="hideManageHostLink"
    value="${portalCustomizerBean.hideManageHostLink}" />
<c:set var="showConsolidateFunctionality">true</c:set>
<c:set var="lineItemCertificateActivate"
    value="${sessionScope[portalStateBean].lineItemCertificateActivate}" />
<c:set var="lineItemCustomActivate"
    value="${sessionScope[portalStateBean].lineItemCustomActivate}" />
<c:if
    test="${(!empty LoggedInWithEntitlementId || !empty LoggedInWithLineItemId) && !lineItemCertificateActivate && !lineItemCustomActivate}">
    <c:set var="showConsolidateFunctionality">false</c:set>
</c:if>
<c:set var="showConsolidateFeatures"
    value="${sessionScope.OperationsShowConsolidatedLicensesFeature}" />
<li class="parent"><span
    class="nav-area-title"> <a data-toggle="dropdown" role="button"
        id="av-support"> <fmt:message
                key="primaryNav.heading.LicenseSupport" />
    </a>
</span>
    <ul class="one-col" role="menu" aria-labelledby="nav-support">
        <li>
            <div class="span3 nav-column" id="c1">

                <fno-v2:actionlist name="" type="${navType}" >
                    <%-- Display "Search Licenses" (Advanced Search) primary link in list
					<c:set var="searchUrl">
						JavaScript:openSupportLicensesAdvancedSearch('SupportLicensesLandingPageForm', '${appContextPath}/operationsportal/supportLicenses_ADVANCEDSEARCH.do', '${item.link}')
					</c:set>
					<fno-v2:actionitem linkid="SearchLicenses" onClick='searchUrl'>
						<fmt:message key="operationsportal.supportLicenses.ButtonLabel.Search" />
					</fno-v2:actionitem>
                    --%>
                    <%-- Display "List All Licenses" (Landing Page) as link in list--%>
                    <c:set var="listAllLicenses">
                        <c:out
                            value='${appContextPath}/operationsportal/supportLicenses_VIEW.do' />
                    </c:set>
                    <fno-v2:actionitem linkid="ShowAllLicenses"
                        onClick='listAllLicenses'>
                        <fmt:message key="primaryNav.menu.item.Licenses" />
                    </fno-v2:actionitem>
                    <%-- Display "Manage Hosts" and "Host Transfer Jobs" --%>
                    <c:set var="hideManageHostsMenu"
                        value="${hideHostDeviceTransferJobsLink}" />
                    <c:if
                        test='${empty LoggedInWithEntitlementId && empty LoggedInWithLineItemId && !(hideManageHostsMenu) && ((!isLoggedInUsingPortalAccount && isLoggedInAsCustomerUser) || isPublisherUser)}'>
                        <c:if test='${!hideManageHostLink}'>
                        <fno-v2:actionitem linkid="ManageHosts"
                                onClick='${appContextPath}/operationsportal/manageHosts_VIEW.do'>
                                <fmt:message key="primaryNav.menu.item.Hosts" />
                        </fno-v2:actionitem>
                          </c:if>
                        <c:if test='${!hideHostDeviceTransferJobsLink}'>
                          <fno:authorize ifAllGranted="<%=IPermissionENC.PORTAL_TRANSFER_HOSTS_MOVE_DEVICES
									.getName()%>"> 
                            <fno-v2:actionitem linkid="HostTransferJobs"
                                onClick='${appContextPath}/operationsportal/transferHostJob_view.action'>
                                <fmt:message
                                    key="primaryNav.menu.item.HostTransferJobs" />
                            </fno-v2:actionitem>
                          </fno:authorize>  
                        </c:if>
                    </c:if>
                    <%-- Display "Consolidated Licenses" Menu Item --%>
                    <c:if test="${!portalCustomizerBean.hideConsolidateLicensesButton && showConsolidateFunctionality == 'true' && showConsolidateFeatures != 'false'}">
                        <fno-v2:actionitem linkid="ConsolidatedLicenses"
                            onClick='${appContextPath}/operationsportal/consolidatedLicenses_VIEW.do'>
                            <fmt:message
                                key="operationsportal.consolidatedLicenses.menuText" />
                        </fno-v2:actionitem>
                    </c:if>
		    <%-- DR: Spirent, June 19, 2018 - JPS 2024 removed this block
                    <fno:authorize ifAllGranted="<%=IPermissionENC.PORTAL_MANUAL_RETURN.getName()%>">
                    	<c:if test="${!portalCustomizerBean.hideManualReturnLicenseButton}">
		                    <c:set var="manualReturn">${appContextPath}/operationsportal/manualReturn_VIEW.do</c:set>
		                    <fno-v2:actionitem linkid="manual-return"
		                        onClick='manualReturn'>
		                        <fmt:message key="primaryNav.menu.item.ManualReturn" />
		                    </fno-v2:actionitem>
	                    </c:if>
	                    <c:if test="${!portalCustomizerBean.hideManualRepairLicenseButton}">
		                    <c:set var="manualRepair">${appContextPath}/operationsportal/manualRepair_VIEW.do</c:set>
		                    <fno-v2:actionitem linkid="manual-repair"
		                        onClick='manualRepair'>
		                        <fmt:message key="primaryNav.menu.item.ManualRepair" />
		                    </fno-v2:actionitem>
	                    </c:if>
                    </fno:authorize>
		    --%>
                </fno-v2:actionlist>
            </div>
        </li>
    </ul></li>
<%-- End of "Manage Licenses" navigation menu --%>