<%@ page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<c:set var="portalStateBean"> <%=PortalStateBean.PORTAL_STATE_BEAN_ID%> </c:set>
<c:set var="cancelMessage">
    <fmt:message key="operationsportal.warning.cancel" />
</c:set>
<c:set var="portalCustomizerBean" value="${sessionScope[portalStateBean].customizerBean}" />
<c:set var="pageHeader">
    <fmt:message key="portal.batchActivation.Review.heading" />
</c:set>
<fno:form action="batchActivationReview_VIEW.do" method="POST">
    <input type="hidden" name="<c:out value='${sessionScope.flexCustomTokenId}'/>" value="<c:out value='${sessionScope.flexCustomTokenId}'/>">
    <c:if test="${BatchActivationReviewPageForm.showOverridePolicyMessage}">
        <div class="msg msg-is-warn">
			<span class="msg-icon icon-large icon-failed"></span>
			<p><fmt:message key="portal.upgradeLicense.message.overridePolicy" /> 
				<a id="Portal_BAConfigCounts_OverrideYes" href="JavaScript:submitForm('BatchActivationReviewPageForm','batchActivationReview_GENERATE.do?overridePolicy=true');" type="small"> 
				<fmt:message key="portal.upgradeLicense.button.label.override" />
                </a> <a id="Portal_BAConfigCounts_OverrideNo" href="JavaScript:submitForm('BatchActivationReviewPageForm','batchActivationReview_GENERATE.do?overridePolicy=false');" type="small"> <fmt:message key="portal.upgradeLicense.button.label.overrideNo" />
                </a></p>
        </div>
    </c:if>
    <div class="LocationBlock">
        <div class="YouAreHereBlock">
            <c:choose>
                <c:when test="${hideHeader && hideMenubar}">
                    <div class="IntroDetail">
                        <span class="TitleDetail">${pageHeader} </span>
                        <c:if test='${!hidePageLevelHelpLink}'>
                            <a id="headerHelpLink" href="javascript:showHelp('<c:url value="${helpPath}"/>')" class="editlink"><fmt:message key="operationsPortalLayout.Help" /> </a>
                        </c:if>
                    </div>
                </c:when>
                <c:otherwise>
                    <span class="HeadingDetail">${initialHeading}</span>
                    <span class="IntroDetail"><span id="TitleDetail">${pageHeader}</span> </span>
                    <span class="TextDetail"><fmt:message key="portal.batchActivation.Review.instruction.verifyOrGenerate" /> </span>
                </c:otherwise>
            </c:choose>
        </div>
        <div class="SelectionBlock">
            <div class="IntroDetail"></div>
            <div class="SelectedItemsBlock"></div>
        </div>
    </div>
    <div class="EditingBlock">
        <div class="WideColumnBlock left" id="GenerateHosts">
            <fieldset>
                <legend>
                    <fmt:message key="portal.batchActivation.Review.heading" />
                </legend>
                <ol>
                    <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                            <tiles:put name="formName" value="BatchActivationReviewPageForm" />
                            <tiles:put name="propertyName" value="soldToDisplayName" />
                            <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.soldTo" />
                            <tiles:put name="isReadOnly" value="true" />
                            <!-- DSHI - <tiles:put name="propertyValue" beanName="BatchActivationReviewPageForm" beanProperty="soldToDisplayName"/> -->		
							<tiles:put name="propertyValue" beanName="batchActivationBean" beanProperty="tier1Name"/>
                        </tiles:insert></li>
                    <c:if test="${BatchActivationReviewPageForm.needStartDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationReviewPageForm" />
                                <tiles:put name="propertyName" value="startDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.startDate" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationReviewPageForm" beanProperty="startDateCalendarStr" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationReviewPageForm.needVersionDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationReviewPageForm" />
                                <tiles:put name="propertyName" value="versionDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.versionDate" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationReviewPageForm" beanProperty="versionDateCalendarStr" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationReviewPageForm.needVersionStartDate}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationReviewPageForm" />
                                <tiles:put name="propertyName" value="versionStartDateCalendarStr" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.versionStartDate" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationReviewPageForm" beanProperty="versionStartDateCalendarStr" />
                            </tiles:insert></li>
                    </c:if>
                    <c:if test="${BatchActivationReviewPageForm.consolidateAllowed}">
                        <li><label><fmt:message key="portal.batchActivation.CommonAttributes.label.consolidateLicenses" />:</label> <label class="ReadOnlyDetail"> <c:out value="${BatchActivationReviewPageForm.consolidateTheLicense}" />
                        </label></li>
                    </c:if>
                    <c:if test="${BatchActivationReviewPageForm.numberOfLicenseModelAttributes > 0}">
                        <li><tiles:insert page="/operationsportal/operations_split/fieldHelpTile.jsp">
                                <tiles:put name="formName" value="BatchActivationReviewPageForm" />
                                <tiles:put name="propertyName" value="licenseModelType" />
                                <tiles:put name="labelKey" value="portal.batchActivation.CommonAttributes.label.LicenseModelType" />
                                <tiles:put name="isReadOnly" value="true" />
                                <tiles:put name="propertyValue" beanName="BatchActivationReviewPageForm" beanProperty="licenseModelType" />
                            </tiles:insert></li>
                        <tiles:insert page="/operationsportal/operations_split/Entitlements/LicenseModelAttributesTile.jsp">
                            <tiles:put name="formName" value="BatchActivationReviewPageForm" />
                            <tiles:put name="notDraft" value="true" />
                            <tiles:put name="showTimeZone" beanName="BatchActivationReviewPageForm" beanProperty="needToDefineTimeZone" />
                        </tiles:insert>
                    </c:if>
                </ol>
            </fieldset>
        </div>
        <div class="EditTableBlock" style="top: 150px;">
            <div class="ServerHostDetail">
                <fmt:message key="portal.batchActivation.Review.label.fulfillCounts" />
            </div>
            <fno-v2:table cellpadding="5" htmlid="BAConfigCounts_Table">
                <fno-v2:tr header="yes">
                    <fno-v2:th>
                        <fmt:message key="portal.batchActivation.Review.label.host" />
                    </fno-v2:th>
                    <c:if test="${BatchActivationReviewPageForm.needNodeLockId}">
                        <fno-v2:th>
                            <fmt:message key="portal.batchActivation.ConfigureCounts.label.nodelockedHost" />
                        </fno-v2:th>
                    </c:if>
                    <fno-v2:th>
                        <fmt:message key="portal.batchActivation.Review.label.ActivationId" />
                    </fno-v2:th>
                    <fno-v2:th>
                        <fmt:message key="portal.batchActivation.CommonAttributes.label.productName" />
                    </fno-v2:th>
                    <fno-v2:th>
                        <fmt:message key="portal.batchActivation.Review.label.fulfillCount" />
                    </fno-v2:th>
                    <c:if test="${BatchActivationReviewPageForm.showOverdraft}">
                        <fno-v2:th>
                            <fmt:message key="portal.batchActivation.Review.label.overdraftCount" />
                        </fno-v2:th>
                    </c:if>
                </fno-v2:tr>
                <c:forEach items="${BatchActivationReviewPageForm.serverHosts}" var="host" varStatus="hostStatus">
                    <c:set var="numLineItems" value="${BatchActivationReviewPageForm.numLineItems}" />
                    <c:set var="trwithboarder">
                        <c:choose>
                            <c:when test="${numLineItems <= 1}">
       				yes
   				</c:when>
                            <c:otherwise>
       				no
   				</c:otherwise>
                        </c:choose>
                    </c:set>
                    <fno-v2:tr applystyle="trwithboarder">
                        <td valign="top"><c:out value="${host.serverHost}" /></td>
                        <c:if test="${BatchActivationReviewPageForm.needNodeLockId}">
                            <td valign="top"><c:if test="${!empty host.countedNodeLockedHosts}">
                                    <c:forEach items="${host.countedNodeLockedHosts}" var="nodeHost" varStatus="nodeHostStatus">
                                        <c:out value="${nodeHost}" />
                                        <br />
                                    </c:forEach>
                                </c:if></td>
                        </c:if>
                        <c:choose>
                            <c:when test="${!empty host.selectedLineItems}">
                                <td valign="top"><c:out value="${host.selectedLineItems[0].activationId}" /></td>
                                <td valign="top"><tiles:insert page="/operationsportal/operations_split/common/ProductInfoTile.jsp">
                                        <tiles:put name="prodQuantityMap" beanName="host" beanProperty="selectedLineItems[0].orderables" />
                                    </tiles:insert></td>
                                <td valign="top"><c:out value="${host.selectedLineItems[0].fulfillCount}" /></td>
                                <c:if test="${BatchActivationReviewPageForm.showOverdraft}">
                                    <td valign="top"><c:out value="${host.selectedLineItems[0].overdraftCount}" /></td>
                                </c:if>
                            </c:when>
                            <c:otherwise>
                                <td valign="top">&nbsp;</td>
                                <td valign="top">&nbsp;</td>
                                <td valign="top">&nbsp;</td>
                                <c:if test="${BatchActivationReviewPageForm.showOverdraft}">
                                    <td valign="top">&nbsp;</td>
                                </c:if>
                            </c:otherwise>
                        </c:choose>
                    </fno-v2:tr>
                    <c:forEach items="${host.selectedLineItems}" var="lineItem" varStatus="lineItemStatus">
                        <c:if test="${lineItemStatus.index != 0}">
                            <c:set var="trwithboarder1">
                                <c:choose>
                                    <c:when test="${lineItemStatus.index+1 != numLineItems}">
        					no
    					</c:when>
                                    <c:otherwise>
        					yes
    					</c:otherwise>
                                </c:choose>
                            </c:set>
                            <fno-v2:tr applystyle="trwithboarder1">
                                <td valign="top"></td>
                                <c:if test="${BatchActivationReviewPageForm.needNodeLockId}">
                                    <td valign="top"></td>
                                </c:if>
                                <td valign="top"><c:out value="${lineItem.activationId}" /></td>
                                <td valign="top"><tiles:insert page="/operationsportal/operations_split/common/ProductInfoTile.jsp">
                                        <tiles:put name="prodQuantityMap" beanName="lineItem" beanProperty="orderables" />
                                    </tiles:insert></td>
                                <td valign="top"><c:out value="${lineItem.fulfillCount}" /></td>
                                <c:if test="${BatchActivationReviewPageForm.showOverdraft}">
                                    <td valign="top"><c:out value="${lineItem.overdraftCount}" /></td>
                                </c:if>
                            </fno-v2:tr>
                        </c:if>
                    </c:forEach>
                </c:forEach>
            </fno-v2:table>
        </div>
    </div>
</fno:form>
<div class="ApplyChangesBlock clearfix">
    <div class="page-actions">
        <a class="btn md default" id="Portal_BAConfigCounts_Generate" href="JavaScript:submitForm('BatchActivationReviewPageForm','batchActivationReview_GENERATE.do');"> <fmt:message key="operationsportal.common.button.generate" />
        </a>
        <c:if test='${!portalCustomizerBean.hideVerifyLicenseButton}'>
            <a class="btn md" id="Portal_BAConfigCounts_Verify" href="JavaScript:submitForm('BatchActivationReviewPageForm','batchActivationReview_VERIFY.do');"> <fmt:message key="operationsportal.common.button.verify" />
            </a>
        </c:if>
        <bean:define id="cancelUrl">
			JavaScript:cancelForm('BatchActivationReviewPageForm', 'activatables_VIEW.do', '${cancelMessage}')
		</bean:define>
        <a class="btn md light" id="Portal_BAConfigCounts_Cancel" href="<%=cancelUrl%>"> <fmt:message key="operationsportal.common.button.cancel" />
        </a>
    </div>
    <div class="process-flow">
        <a class="btn md" id="Portal_BAConfigCounts_Back" href="batchActivationConfigureCounts_LAST.do"> <fmt:message key="operationsportal.common.button.back" />
        </a>
    </div>
</div>