<%@ page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<c:set var="portalStateBean"> <%=PortalStateBean.PORTAL_STATE_BEAN_ID%> </c:set>


<c:set var="cancelMessage">
    <fmt:message key="operationsportal.warning.cancel" />
</c:set>
<c:set var="portalCustomizerBean" value="${sessionScope[portalStateBean].customizerBean}" />
<c:set var="pageHeader">
    <fmt:message key="portal.batchActivation.ConfigureCounts.heading" />
</c:set>
<fno:form action="batchActivationConfigureCounts_VIEW.do" method="POST">
    <c:if test="${BatchActivationConfigureCountsPageForm.showOverridePolicyMessage}">
        <table>
            <tr>
                <td align="right" width="40%"><img src="${appContextPath}/resources/operations/Help16.gif" /> <span class="infoMessages"><fmt:message key="portal.licenselifeCycle.message.overridePolicy" /> </span></td>
                <td><fno:buttonbar>
                        <fno:button linkid="BAConfigCounts_OverrideYes" onClick="JavaScript:submitForm('BatchActivationConfigureCountsPageForm','batchActivationConfigureCounts_GENERATE.do?overridePolicy=true');" type="small">
                            <fmt:message key="portal.licenselifeCycle.button.label.override" />
                        </fno:button>
                        <fno:button linkid="BAConfigCounts_OverrideNo" onClick="JavaScript:submitForm('BatchActivationConfigureCountsPageForm','batchActivationConfigureCounts_GENERATE.do?overridePolicy=false');" type="small">
                            <fmt:message key="portal.licenselifeCycle.button.label.overrideNo" />
                        </fno:button>
                    </fno:buttonbar></td>
            </tr>
        </table>
    </c:if>
    <div class="LocationBlock">
        <div class="YouAreHereBlock">
            <c:choose>
                <c:when test="${hideHeader && hideMenubar}">
                    <div class="IntroDetail">
                        <span class="TitleDetail"><fmt:message key="${pageHeader}" /> </span>
                        <c:if test='${!hidePageLevelHelpLink}'>
                            <a id="headerHelpLink" href="javascript:showHelp('<c:url value="${helpPath}"/>')" class="editlink"> <fmt:message key="operationsPortalLayout.Help" />
                            </a>
                        </c:if>
                    </div>
                </c:when>
                <c:otherwise>
                    <span class="IntroDetail"><span id="TitleDetail"> ${pageHeader} </span>
                    </span>
                    <span class="TextDetail"> <c:choose>
                            <c:when test="${BatchActivationConfigureCountsPageForm.currentHostLastHost}">
                                <fmt:message key="portal.batchActivation.ConfigureCounts.instruction.reviewPage" />
                            </c:when>
                            <c:when test="${!BatchActivationConfigureCountsPageForm.currentHostLastHost && BatchActivationConfigureCountsPageForm.nextHost != ''}">
                                <fmt:message key="portal.batchActivation.ConfigureCounts.instruction.configureCountsForNextHost">
                                    <fmt:param value="${BatchActivationConfigureCountsPageForm.nextHost}" />
                                </fmt:message>
                            </c:when>
                            <c:otherwise></c:otherwise>
                        </c:choose>
                    </span>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <div class="EditingBlock">
        <div class="ExtraWideColumnBlock left" id="ConfigureHosts">
            <fieldset>
                <legend>
                    <fmt:message key="portal.batchActivation.ConfigureCounts.heading" />
                </legend>
                <ol>
                    <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                            <tiles:put name="formName" value="BatchActivationConfigureCountsPageForm" />
                            <tiles:put name="propertyName" value="soldToDisplayName" />
                            <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.soldTo" />
                            <tiles:put name="isReadOnly" value="true" />
                            <!-- DSHI - <tiles:put name="propertyValue" beanName="BatchActivationConfigureCountsPageForm" beanProperty="soldToDisplayName"/> -->
							<tiles:put name="propertyValue" beanName="batchActivationBean" beanProperty="tier1Name"/>
                        </tiles:insert></li>
                    <c:if test="${BatchActivationConfigureCountsPageForm.needStartDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationConfigureCountsPageForm" />
                                <tiles:put name="propertyName" value="startDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.startDate" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationConfigureCountsPageForm" beanProperty="startDateCalendarStr" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationConfigureCountsPageForm.needVersionDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationConfigureCountsPageForm" />
                                <tiles:put name="propertyName" value="versionDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.versionDate" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationConfigureCountsPageForm" beanProperty="versionDateCalendarStr" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationConfigureCountsPageForm.needVersionStartDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationConfigureCountsPageForm" />
                                <tiles:put name="propertyName" value="versionStartDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.versionStartDate" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationConfigureCountsPageForm" beanProperty="versionStartDateCalendarStr" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationConfigureCountsPageForm.consolidateAllowed}">
                        <li><label><bean:message key="batchActivation.CommonAttributes.label.consolidateLicenses" /></label> <label class="ReadOnlyDetail"><c:out value="${BatchActivationConfigureCountsPageForm.consolidateTheLicense}" /> </label></li>
                    </c:if>
                    <c:if test="${BatchActivationConfigureCountsPageForm.numberOfLicenseModelAttributes > 0}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationConfigureCountsPageForm" />
                                <tiles:put name="propertyName" value="licenseModelType" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.LicenseModelType" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationConfigureCountsPageForm" beanProperty="licenseModelType" />
                            </tiles:insert></li>
                        <tiles:insert page="/operationsportal/operations_split/Entitlements/LicenseModelAttributesTile.jsp">
                            <tiles:put name="formName" value="BatchActivationConfigureCountsPageForm" />
                            <tiles:put name="notDraft" value="true" />
                            <tiles:put name="showTimeZone" beanName="BatchActivationConfigureCountsPageForm" beanProperty="needToDefineTimeZone" />
                        </tiles:insert>
                    </c:if>
                    <c:if test='${BatchActivationConfigureCountsPageForm.needNodeLockId}'>
                        <li><h2>
                                <fmt:message key="portal.batchActivation.ConfigureCounts.label.nodelockedHost" />
                                </h2>
                                <div>
                                    <tiles:insert page="/operationsportal/Activations/LicenseHostsResultsTile.jsp">
                                        <tiles:put name="formName" value="BatchActivationConfigureCountsPageForm" />
                                        <tiles:put name="baseURL" value="batchActivationConfigureCounts_" />
                                        <tiles:put name="isServerType" value="false" />
                                        <tiles:put name="licenseHosts" value="nlLicenseHosts" />
                                        <tiles:put name="singleSelect" value="false" />
                                        <tiles:put name="lineItemId" beanName="BatchActivationConfigureCountsPageForm" beanProperty="firstLineItemID" />
                                        <tiles:put name="fulfillmentId" value="" />
                                        <tiles:put name="overrideSoldTo" beanName="BatchActivationConfigureCountsPageForm" beanProperty="soldToId" />
                                    </tiles:insert>
                                </div></li>
                    </c:if>
                </ol>
            </fieldset>
        </div>
        <div class="WideColumnBlock right" id="SelectedHosts">
            <fieldset>
                <legend>
                    <fmt:message key="portal.batchActivation.CommonAttributes.label.selectedHosts" />
                </legend>
                <ol>
                    <li>
                        <div class="SelectedItemsBlock">
                            <fno-v2:table cellpadding="3" htmlid="Selected_Host_Ids_Table" width="100%">
                                <fno-v2:tr header="yes">
                                    <fno-v2:th width="20" align="center">
                                    </fno-v2:th>
                                    <fno-v2:th>
                                        <c:choose>
                                            <c:when test="${BatchActivationConfigureCountsPageForm.needServerId == 'true'}">
                                                <fmt:message key="portal.batchActivation.ConfigureCounts.label.serverHosts" />
                                            </c:when>
                                            <c:otherwise>
                                                <fmt:message key="portal.batchActivation.ConfigureCounts.label.customHosts" />
                                            </c:otherwise>
                                        </c:choose>
                                    </fno-v2:th>
                                </fno-v2:tr>
                                <c:forEach items="${BatchActivationConfigureCountsPageForm.serverHosts}" var="object" varStatus="objectStatus">
                                    <fno-v2:tr>
                                        <td><c:choose>
                                                <c:when test="${object.currentHost}">
                                                    <img src="${appContextPath}/resources/operations/Forward16.gif">
                                                </c:when>
                                                <c:when test="${object.configured}">
                                                    <img src="${appContextPath}/resources/operations/check.gif">
                                                </c:when>
                                                <c:otherwise>
                                                </c:otherwise>
                                            </c:choose></td>
                                        <td><c:out value="${object.serverHost}" /></td>
                                    </fno-v2:tr>
                                </c:forEach>
                            </fno-v2:table>
                        </div>
                    </li>
                </ol>
            </fieldset>
        </div>
    </div>
    <div class="EditTableBlock clearfix">
        <fno-v2:table htmlid="BAConfigCounts_Table">
            <fno-v2:tr header="yes">
                <fno-v2:th>
                    <fmt:message key="portal.batchActivation.CommonAttributes.label.activationId" />
                </fno-v2:th>
                <fno-v2:th>
                    <fmt:message key="portal.batchActivation.CommonAttributes.label.productName" />
                </fno-v2:th>
                <fno-v2:th styleClass="digit">
                    <a title='<fmt:message key="portal.batchActivation.ConfigureCounts.label.numberOfCopiesRemaining.tooltip"/>'><fmt:message key="portal.batchActivation.ConfigureCounts.label.numberOfCopiesRemaining" /> </a>
                </fno-v2:th>
                <fno-v2:th styleClass="digit">
                    <a title='<fmt:message key="portal.batchActivation.ConfigureCounts.label.numberOfUnallocatedCopiesRemaining.tooltip"/>'><fmt:message key="portal.batchActivation.ConfigureCounts.label.numberOfUnallocatedCopiesRemaining" /> </a>
                </fno-v2:th>
                <c:if test="${BatchActivationConfigureCountsPageForm.numberOfServerHosts > 1}">
                    <fno-v2:th styleClass="digit">
                        <a title='<fmt:message key="portal.batchActivation.ConfigureCounts.label.pendingCopies.tooltip"/>'><fmt:message key="portal.batchActivation.ConfigureCounts.label.pendingCopies" /> </a>
                    </fno-v2:th>
                </c:if>
                <fno-v2:th styleClass="digit">
                    <a title='<fmt:message key="portal.batchActivation.ConfigureCounts.label.extraActivationsAvailable.tooltip"/>'><fmt:message key="portal.batchActivation.ConfigureCounts.label.extraActivationsAvailable" /> </a>
                </fno-v2:th>
                <fno-v2:th styleClass="digit">
                    <fmt:message key="portal.batchActivation.ConfigureCounts.label.fulfillCount" />
                </fno-v2:th>
                <c:if test="${BatchActivationConfigureCountsPageForm.showOverdraft}">
                    <fno-v2:th>
                        <a title='<fmt:message key="portal.batchActivation.ConfigureCounts.label.overdraft.tooltip"/>'><fmt:message key="portal.batchActivation.ConfigureCounts.label.overdraft" /> </a>
                    </fno-v2:th>
                    <fno-v2:th>
                        <fmt:message key="portal.batchActivation.ConfigureCounts.label.overdraftCount" />
                    </fno-v2:th>
                </c:if>
            </fno-v2:tr>
            <c:forEach items="${BatchActivationConfigureCountsPageForm.selectedLineItems}" var="object" varStatus="objectStatus">
                <fno-v2:tr>
                    <td>
                        <% // FNO-13360 %>
                        <c:out value="${object.activationId}" />
                    </td>
                    <td><tiles:insert page="/operationsportal/operations_split/common/ProductInfoTile.jsp">
                            <tiles:put name="prodQuantityMap" beanName="object" beanProperty="orderables" />
                            <c:if test='${portalCustomizerBean.hideProductVersionColumnInActivationScreens}'>
                                <tiles:put name="hideVersion" value="true" />
                            </c:if>
                        </tiles:insert></td>
                    <td><c:out value="${object.remainingCopies}" /></td>
                    <td><c:out value="${object.remainingUnallocatedCopies}" /></td>
                    <c:if test="${BatchActivationConfigureCountsPageForm.numberOfServerHosts > 1}">
                        <td><c:out value="${object.pendingCopies}" /></td>
                    </c:if>
                    <td><c:out value="${object.availableExtraActivations}" /></td>
                    <bean:define id="aidstr">
                        <c:out value="${object.activationId}" />
                    </bean:define>
                    <fno:td>
                        <c:choose>
                            <c:when test="${BatchActivationConfigureCountsPageForm.readOnlyCounts == 'true'}">
                                <html:text name="BatchActivationConfigureCountsPageForm" property='<%="fulfillCount(" + aidstr + ")"%>' size="4" styleClass="InputDataDetail" readonly="true" />
                            </c:when>
                            <c:otherwise>
                                <html:text name="BatchActivationConfigureCountsPageForm" property='<%="fulfillCount(" + aidstr + ")"%>' size="4" styleClass="InputDataDetail" />
                            </c:otherwise>
                        </c:choose>
                    </fno:td>
                    <c:if test="${BatchActivationConfigureCountsPageForm.showOverdraft}">
                        <fno:td>
                            <c:out value="${object.remainingOverdraft}" />
                        </fno:td>
                        <fno:td>
                            <c:choose>
                                <c:when test="${object.needOverdraftCount}">
                                    <html:text name="BatchActivationConfigureCountsPageForm" property='<%="requestedOverdraftCount(" + aidstr + ")"%>' size="4" styleClass="InputDataDetail" />
                                </c:when>
                                <c:otherwise>&nbsp;</c:otherwise>
                            </c:choose>
                        </fno:td>
                    </c:if>
                </fno-v2:tr>
            </c:forEach>
        </fno-v2:table>
    </div>
</fno:form>
<div class="ApplyChangesBlock clearfix">
    <div class="page-actions">
        <c:if test='${!portalCustomizerBean.hideVerifyLicenseButton}'>
            <a class="btn md" id="Portal_BAConfigCounts_Verify" href="JavaScript:submitForm('BatchActivationConfigureCountsPageForm','batchActivationConfigureCounts_VERIFY.do');"> <fmt:message key="operationsportal.common.button.verify" />
            </a>
        </c:if>
        <bean:define id="cancelUrl">
            <c:choose>
                <c:when test="${empty batchActivationBean.unifiedHostId}">
                    JavaScript:cancelForm('BatchActivationConfigureHostsPageForm', 'activatables_VIEW.do', '${cancelMessage}')
                </c:when>
                <c:otherwise>
                    JavaScript:cancelForm('BatchActivationConfigureHostsPageForm', 'unifiedHost_view.action?unifiedHost.id=${batchActivationBean.unifiedHostId}', '${cancelMessage}')
                </c:otherwise>
            </c:choose>
        </bean:define>
        <a class="btn md light" id="Portal_BAConfigCounts_Cancel" href="<%=cancelUrl%>"> <fmt:message key="operationsportal.common.button.cancel" />
        </a>
    </div>
    <div class="process-flow">
        <a class="btn md" id="Portal_BAConfigCounts_Back" href="JavaScript:submitForm('BatchActivationConfigureCountsPageForm','batchActivationConfigureCounts_BACK.do');"> <fmt:message key="operationsportal.common.button.back" />
        </a> <a class="btn md" id="Portal_BAConfigCounts_Next" href="JavaScript:submitForm('BatchActivationConfigureCountsPageForm','batchActivationConfigureCounts_NEXT.do');"> <fmt:message key="operationsportal.common.button.next" />
        </a>
    </div>
</div>
<jsp:include page="/operationsportal/Activations/LicenseHostModalDialog.jsp" />