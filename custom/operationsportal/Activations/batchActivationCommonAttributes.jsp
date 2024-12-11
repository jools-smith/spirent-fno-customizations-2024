<%@ page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<%@ page import="com.flexnet.products.publicapi.IPermissionENC"%>
<!--
	Set appropriate resource location for ALL displayed text strings.
	No static text should be imbedded in JSP, JavaScript, or Java source code.
	Instead, a String value should serve as a "key" into a ".properties"
	file which contains and defines the actual text to be displayed on the page.
-->
<%--  fmt:setBundle basename="FLEXnetOperationsPortalText" scope="request" --%>
<%--  fmt:setBundle basename="${moduleResources['operationsportal']}" scope="request"  --%>
<c:set var="batchActivationBean" value="${sessionScope.OPERATIONS_BATCH_ACTIVATION_STATE_BEAN}" />
<c:set var="cancelMessage">
    <fmt:message key="operationsportal.common.msg.cancel" />
</c:set>
<c:set var="portalStateBean">
    <%=PortalStateBean.PORTAL_STATE_BEAN_ID%>
</c:set>
<c:set var="portalCustomizerBean" value="${sessionScope[portalStateBean].customizerBean}" />
<c:set var="isLoggedInWithEntitlementID" value="${sessionScope[portalStateBean].isLoggedInWithEntitlementID}" />
<c:set var="isLoggedInWithLineItemID" value="${sessionScope[portalStateBean].isLoggedInWithLineItemID}" />
<c:set var="isChannelPartnerUser" value="${sessionScope[portalStateBean].isChannelPartnerUser}" />
<c:set var="isPublisherUser" value="${sessionScope[portalStateBean].isPublisherUser}" />
<c:set var="isCustomerUser" value="${sessionScope[portalStateBean].isCustomerUser}" />
<c:set var="baseURL" value="activatables_SIMPLESEARCH.do" />
<c:set var="formName" value="BatchActivationCommonAttributesPageForm" />
<c:set var="searchFieldName" value="searchPhrase" />
<c:set var="pageHeader">
    <fmt:message key="portal.batchActivation.CommonAttributes.header" />
</c:set>
<fno:form action="batchActivationCommonAttributes_VIEW.do" method="POST">
    <html:hidden name="BatchActivationCommonAttributesPageForm" property="soldToId" />
    <html:hidden name="BatchActivationCommonAttributesPageForm" property="ownerId" />
    <div class="LocationBlock">
        <div class="YouAreHereBlock">
            <c:choose>
                <c:when test="${hideHeader && hideMenubar}">
                    <div class="IntroDetail">
                        <span class="TitleDetail"><fmt:message key="${pageHeader}" /> </span>
                        <c:if test='${!hidePageLevelHelpLink}'>
                            <a id="headerHelpLink" href="javascript:showHelp('<c:url value="${helpPath}"/>')" class="editlink"><fmt:message key="operationsPortalLayout.Help" /> </a>
                        </c:if>
                    </div>
                </c:when>
                <c:otherwise>
                    <span class="IntroDetail"><span id="TitleDetail">${pageHeader}</span> </span>
                    <span class="TextDetail"> <c:choose>
                            <c:when test="${BatchActivationCommonAttributesPageForm.needServerId || BatchActivationCommonAttributesPageForm.needNodeLockId || BatchActivationCommonAttributesPageForm.needCustomHost}">
                                <fmt:message key="portal.batchActivation.CommonAttributes.instruction.configureHosts" />
                            </c:when>
                            <c:when test="${BatchActivationCommonAttributesPageForm.needCount}">
                                <fmt:message key="portal.batchActivation.CommonAttributes.instruction.configureCounts" />
                            </c:when>
                            <c:otherwise>
                                <fmt:message key="portal.batchActivation.CommonAttributes.instruction.activationAttributes" />
                            </c:otherwise>
                        </c:choose>
                    </span>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <div class="EditingBlock">
        <c:if test="${BatchActivationCommonAttributesPageForm.showOverridePolicyMessage}">
            <div class="ExtraWideColumnBlock left" id="OverridePolicy">
                <table border="0" cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                        <td align="right" width="40%"><img src="${appContextPath}/resources/operations/Help16.gif" align="absmiddle" /> <span class="infoMessages"><fmt:message key="portal.upgradeLicense.message.overridePolicy" /> </span></td>
                        <td><fno:buttonbar>
                                <fno:button linkid="Portal_BACommonAttrs_OverrideYes" onClick="JavaScript:submitForm('BatchActivationCommonAttributesPageForm','batchActivationCommonAttributes_GENERATE.do?overridePolicy=true');" type="small">
                                    <fmt:message key="portal.upgradeLicense.button.label.override" />
                                </fno:button>
                                <fno:button linkid="Portal_BACommonAttrs_OverrideNo" onClick="JavaScript:submitForm('BatchActivationCommonAttributesPageForm','batchActivationCommonAttributes_GENERATE.do?overridePolicy=false');" type="small">
                                    <fmt:message key="portal.upgradeLicense.button.label.overrideNo" />
                                </fno:button>
                            </fno:buttonbar></td>
                    </tr>
                </table>
            </div>
        </c:if>
        <div class="WideColumnBlock left" id="GenerateLicenses">
            <fieldset>
                <legend>
                    <fmt:message key="portal.batchActivation.CommonAttributes.heading" />
                </legend>
                <ol>
                    <li><label> <fmt:message key="portal.batchActivation.CommonAttributes.label.soldTo" />
                    </label> <span class="LookupDetail">
                        <c:if test='${BatchActivationCommonAttributesPageForm.needSoldTo == "true"}'>
                             <a class="icon-medium icon-search" href="JavaScript:searchForOrgUnit('BatchActivationCommonAttributesPageForm','selectOrg_VIEW.do')"> </a>
                        </c:if>
                        <!-- DR
                        <html:text name="BatchActivationCommonAttributesPageForm" property="soldToDisplayName" readonly="true" />
                         -->
                        <html:text name="batchActivationBean" property="tier1Name" readonly="true" />                   
                    </span></li>
                    <c:if test='${BatchActivationCommonAttributesPageForm.needOwner == "true"}'>
                        <li><label> <fmt:message key="portal.batchActivation.CommonAttributes.label.owner" />
                        </label> <span class="LookupDetail"> <input type="text" name="ownerName" size="35" readonly /> <a class="icon-medium icon-search" href="JavaScript:searchForOwner('BatchActivationCommonAttributesPageForm','selectOwner_VIEW.do')"> </a>
                        </span> <tiles:insert page="/operationsportal/operations_split/toolTipTile.jsp">
                                <tiles:put name="propertyName" value="owner" />
                                <tiles:put name="helpMessageKey" value="portal.batchActivation.CommonAttributes.help.owner" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationCommonAttributesPageForm.needStartDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/dateTile.jsp">
                                <tiles:put name="formName" value="BatchActivationCommonAttributesPageForm" />
                                <tiles:put name="propertyName" value="startDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.startDate" />
                                <tiles:put name="buttonId" value="startDateButton" />
                                <tiles:put name="isRequired" value="true" />
                                <tiles:put name="helpPropertyName" value="startDateStr" />
                                <tiles:put name="helpMessageKey" value="portal.batchActivation.CommonAttributes.help.startDate" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationCommonAttributesPageForm.needVersionDate}">
                        <tiles:insert page="/operationsportal/operations_split/dateTile.jsp">
                            <tiles:put name="formName" value="BatchActivationCommonAttributesPageForm" />
                            <tiles:put name="propertyName" value="versionDateCalendarStr" />
                            <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.versionDate" />
                            <tiles:put name="buttonId" value="versionDateButton" />
                            <tiles:put name="isRequired" value="true" />
                            <tiles:put name="helpPropertyName" value="versionDateStr" />
                            <tiles:put name="helpMessageKey" value="portal.batchActivation.CommonAttributes.help.versionDate" />
                        </tiles:insert>
                    </c:if>
                    <c:if test="${BatchActivationCommonAttributesPageForm.needVersionStartDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/dateTile.jsp">
                                <tiles:put name="formName" value="BatchActivationCommonAttributesPageForm" />
                                <tiles:put name="propertyName" value="versionStartDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.versionStartDate" />
                                <tiles:put name="buttonId" value="versionStartDateButton" />
                                <tiles:put name="isRequired" value="true" />
                                <tiles:put name="helpPropertyName" value="versionStartDateStr" />
                                <tiles:put name="helpMessageKey" value="portal.batchActivation.CommonAttributes.help.versionStartDate" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationCommonAttributesPageForm.consolidateAllowed}">
                        <li><label><fmt:message key="portal.batchActivation.CommonAttributes.label.consolidateLicenses" /></label>
                            <div class="RadioBlock">
                                <span class="RadioDetail"> <html:radio name="BatchActivationCommonAttributesPageForm" property="consolidateTheLicense" value="yes" styleClass="form">
                                        <label><fmt:message key="portal.batchActivation.label.yes" /></label>
                                    </html:radio>
                                </span> <span> <html:radio name="BatchActivationCommonAttributesPageForm" property="consolidateTheLicense" value="no" styleClass="form">
                                        <label><fmt:message key="portal.batchActivation.label.no" /></label>
                                    </html:radio>
                                </span>
                            </div> <tiles:insert page="/operationsportal/operations_split/toolTipTile.jsp">
                                <tiles:put name="propertyName" value="consolidateTheLicense" />
                                <tiles:put name="helpMessageKey" value="portal.batchActivation.CommonAttributes.help.consolidateLicense" />
                            </tiles:insert></li>
                    </c:if>
                    <li><label><fmt:message key="portal.batchActivation.CommonAttributes.label.shipToEmail" /> </label> <span class="LookupDetail"><html:text name="BatchActivationCommonAttributesPageForm" property="shipToEmail" size="35" styleClass="form" /> <a id="contact_selection" class="icon-medium icon-search"
                            style="display: none" href="JavaScript:showEmailContacts('BatchActivationCommonAttributesPageForm','selectEmailContact_VIEW.do' , 'shipToEmail')"></a> </span></li>
                    <li><label><fmt:message key="portal.batchActivation.CommonAttributes.label.shipToAddress" /> </label> <html:textarea name="BatchActivationCommonAttributesPageForm" property="shipToAddress" styleClass="form" cols="35" rows="3" /></li>
                </ol>
            </fieldset>
        </div>
        <div class="WideColumnBlock right" id="SelectedLineItems">
            <fieldset>
                <legend>
                    <fmt:message key="portal.batchActivation.CommonAttributes.label.selectedLineItems" />
                </legend>
                <ol>
                    <li>
                        <div class="SelectedItemsBlock">
                            <fno-v2:table htmlid="Selected_Activatable_Items_Table">
                                <fno-v2:tr header="yes">
                                    <fno-v2:th>
                                        <fmt:message key="portal.batchActivation.CommonAttributes.label.activationId" />
                                    </fno-v2:th>
                                    <fno-v2:th>
                                        <fmt:message key="portal.batchActivation.CommonAttributes.label.productName" />
                                    </fno-v2:th>
                                    <fno-v2:th>
                                        <fmt:message key="portal.batchActivation.CommonAttributes.label.expirationDate" />
                                    </fno-v2:th>
                                </fno-v2:tr>
                                <c:forEach items="${BatchActivationCommonAttributesPageForm.selectedLineItems}" var="object" varStatus="objectStatus">
                                    <fno-v2:tr>
                                        <td valign="top">
                                            <c:out value="${object.activationId}" />
                                        </td>
                                        <td valign="top"><tiles:insert page="/operationsportal/operations_split/common/ProductInfoTile.jsp">
                                                <tiles:put name="prodQuantityMap" beanName="object" beanProperty="orderables" />
                                                <c:if test='${portalCustomizerBean.hideProductVersionColumnInActivationScreens}'>
                                                    <tiles:put name="hideVersion" value="true" />
                                                </c:if>
                                            </tiles:insert></td>
                                        <td valign="top"><c:out value="${object.expirationDate}" /></td>
                                    </fno-v2:tr>
                                </c:forEach>
                            </fno-v2:table>
                        </div>
                </ol>
            </fieldset>
        </div>
    </div>
    <div class="EditingBlock">
        <c:if test="${BatchActivationCommonAttributesPageForm.numberOfLicenseModelAttributes > 0}">
            <div class="WideColumnBlock left" id="LicenseModelActivation">
                <fieldset>
                    <legend>
                        <fmt:message key="portal.upgradeLicense.title.licenseModelAttributes" />
                    </legend>
                    <ol>
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationCommonAttributesPageForm" />
                                <tiles:put name="propertyName" value="licenseModelType" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.LicenseModelType" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationCommonAttributesPageForm" beanProperty="licenseModelType" />
                            </tiles:insert></li>
                        <tiles:insert page="/operationsportal/operations_split/Entitlements/LicenseModelAttributesTile.jsp">
                            <tiles:put name="formName" value="BatchActivationCommonAttributesPageForm" />
                            <tiles:put name="notDraft" value="false" />
                            <tiles:put name="showTimeZone" beanName="BatchActivationCommonAttributesPageForm" beanProperty="needToDefineTimeZone" />
                        </tiles:insert>
                    </ol>
                </fieldset>
            </div>
        </c:if>
    </div>
</fno:form>
<BR>
<div class="ApplyChangesBlock clearfix">
    <div class="page-actions">
        <bean:define id="cancelUrl">
            <c:choose>
                <c:when test="${empty batchActivationBean.unifiedHostId}">
				JavaScript:cancelForm('BatchActivationCommonAttributesPageForm', 'activatables_VIEW.do', '${cancelMessage}')
			</c:when>
                <c:otherwise>
				JavaScript:cancelForm('BatchActivationCommonAttributesPageForm', 'unifiedHost_view.action?unifiedHost.id=${batchActivationBean.unifiedHostId}', '${cancelMessage}')
			</c:otherwise>
            </c:choose>
        </bean:define>
        <a class="btn md light" linkid="Portal_BACommonAttrs_Cancel" href="<%=cancelUrl%>"> <fmt:message key="operationsportal.common.button.cancel" />
        </a>
    </div>
    <div class="process-flow">
        <c:choose>
            <c:when test="${BatchActivationCommonAttributesPageForm.needServerId || BatchActivationCommonAttributesPageForm.needNodeLockId ||
                                    BatchActivationCommonAttributesPageForm.needCustomHost || BatchActivationCommonAttributesPageForm.needCount}">
                <a class="btn md default" linkid="Portal_BACommonAttrs_Next" href="JavaScript:submitForm('BatchActivationCommonAttributesPageForm','batchActivationCommonAttributes_NEXT.do');"> <fmt:message key="operationsportal.common.button.next" />
                </a>
            </c:when>
            <c:otherwise>
                <c:if test='${!portalCustomizerBean.hideVerifyLicenseButton}'>
                    <a class="btn md" linkid="Portal_BACommonAttrs_Verify" href="JavaScript:submitForm('BatchActivationCommonAttributesPageForm','batchActivationCommonAttributes_VERIFY.do');"> <fmt:message key="operationsportal.common.button.verify" />
                    </a>
                </c:if>
                <a class="btn md default" linkid="Portal_BACommonAttrs_Generate" href="JavaScript:submitForm('BatchActivationCommonAttributesPageForm','batchActivationCommonAttributes_GENERATE.do');"> <fmt:message key="operationsportal.common.button.generate" />
                </a>
            </c:otherwise>
        </c:choose>
    </div>
</div>