<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<%@ page import="com.flexnet.products.publicapi.IPermissionENC"%>
<%@ page import="com.flexnet.operations.licensing.OperationsLicenseHandler"%>
<script src="${appContextPath}/scripts/EntitlementGrouping.js"></script>
<script src="${appContextPath}/scripts/flexnet.js" language="Javascript"></script>

<tiles:useAttribute id="baseURL" name="baseURL" classname="java.lang.String" />
<tiles:useAttribute id="formName" name="formName" classname="java.lang.String" />
<tiles:useAttribute id="generateButtonBar" name="generateButtonBar" classname="java.lang.String" ignore="true" />
<tiles:useAttribute id="singleSelect" name="singleSelect" classname="java.lang.String" ignore="true" />
<tiles:useAttribute id="showContainerTitle" name="showContainerTitle" classname="java.lang.String" ignore="true" />
<c:set var="formObj" value="${requestScope[formName]}" />
<c:set var="genButtonBar"><%=generateButtonBar%></c:set>
<c:set var="oneselect"><%=singleSelect%></c:set>
<c:set var="deleteMessage" value="${formObj.deleteMessage}" />
<c:set var="portalStateBean">
    <%=PortalStateBean.PORTAL_STATE_BEAN_ID%>
</c:set>
<c:set var="isLoggedInUsingPortalAccount" value="${sessionScope[portalStateBean].isLoggedInUsingPortalAccount}" />
<c:set var="isLoggedInAsCutomerUser" value="${sessionScope[portalStateBean].isLoggedInAsCutomerUser}" />
<c:set var="isLoggedInAsSelfRegUser" value="${sessionScope[portalStateBean].isLoggedInAsSelfRegUser}" />
<c:set var="isChannelPartnerUser" value="${sessionScope[portalStateBean].isChannelPartnerUser}" />
<c:set var="isPublisherUser" value="${sessionScope[portalStateBean].isPublisherUser}" />
<c:set var="lineItemCertificateActivate" value="${sessionScope[portalStateBean].lineItemCertificateActivate}" />
<c:set var="lineItemTrustedActivate" value="${sessionScope[portalStateBean].lineItemTrustedActivate}" />
<c:set var="lineItemEmbeddedActivate" value="${sessionScope[portalStateBean].lineItemEmbeddedActivate}" />
<c:set var="lineItemCustomActivate" value="${sessionScope[portalStateBean].lineItemCustomActivate}" />
<c:set var="isLoggedInWithLineItemID" value="${sessionScope[portalStateBean].isLoggedInWithLineItemID}" />
<c:set var="isLoggedInWithEntitlementID" value="${sessionScope[portalStateBean].isLoggedInWithEntitlementID}" />
<c:set var="portalCustomizerBean" value="${sessionScope[portalStateBean].customizerBean}" />
<c:set var="showActivateButton">true</c:set>
<c:set var="isLoggedInAsSelfRegUser" value="${sessionScope[portalStateBean].isLoggedInAsSelfRegUser}" />
<c:if test="${(isLoggedInWithLineItemID || isLoggedInWithEntitlementID) && !lineItemCertificateActivate && !lineItemCustomActivate}">
    <c:set var="showActivateButton">
		false
	</c:set>
</c:if>
<c:set var="showTrustedActivateButton">
	true
</c:set>
<c:if test="${(isLoggedInWithLineItemID || isLoggedInWithEntitlementID) && !lineItemTrustedActivate}">
    <c:set var="showTrustedActivateButton">
		false
	</c:set>
</c:if>
<c:set var="showTitle">
    <%=showContainerTitle%>
</c:set>
<c:set var="showDownloads" scope="request"> 
   false
</c:set>
<c:if test="${isLoggedInWithEntitlementID == false && formObj.hasDownloads}">
    <c:set var="showDownloads"  scope="request">true</c:set>
</c:if>

<fno:license ifNotGranted="<%=OperationsLicenseHandler.OPS_ESD%>" moduleName="operations">
	<c:set var="showDownloads"  scope="request" value="false" />
</fno:license>


<c:choose>
    <c:when test="${showTitle == 'false'}">
        <c:set var="containerTitle" value="" />
    </c:when>
    <c:otherwise>
        <c:set var="containerTitle">
            <fmt:message key="operationsportal.manageEntitlements.header.ActivatableItems" />
        </c:set>
    </c:otherwise>
</c:choose>
<c:set var="colSpan" value="${formObj.colSpan}" />
<c:set var="defaultColumnWidth">
	auto
</c:set>
<fno-v2:table htmlid="Activatable_Items_Results_Table" cssClass="groups" >
    <fno-v2:tr header="yes">
        <c:set var="firstobj" value="${formObj.objects[0]}" />
        <c:if test='${!empty firstobj.colValues}'>
            <c:set var="colSpan" value="${colSpan + 1}" />
            <fno-v2:th width="20" styleClass="checkbox">
                <c:choose>
                    <c:when test="${oneselect == 'true'}">
            			&nbsp;
            		</c:when>
                    <c:otherwise>
                        <input type="checkbox" name="select_all_checkbox" id="select_all_checkbox" onClick="toggleAll('<%=formName%>', 'selectedObjects')">
                    </c:otherwise>
                </c:choose>
            </fno-v2:th>
        </c:if>
        <c:forEach items="${firstobj.colValues}" var="column" varStatus="columnStatus">
          <c:if test="${column.display}">
				<bean:define id="colwidth">
                <c:choose>
                    <c:when test="${empty column.trimType}">
						${column.displaySize}
					</c:when>
                    <c:otherwise>
						${defaultColumnWidth}
					</c:otherwise>
                </c:choose>
            </bean:define>
            <bean:define id="lkey">
                <c:choose>
                    <c:when test="${column.customAttribute || column.customHostAttribute || column.customLineItemAttribute}">
						${column.fieldName}.label
					</c:when>
                    <c:otherwise>
						operations${column.fieldName}
					</c:otherwise>
                </c:choose>
            </bean:define>
            <fno-v2:th width="<%=colwidth%>">
                <c:choose>
                    <c:when test="${column.sortable}">
                        <bean:define id="sortname">
							${column.sortColumnName}
						</bean:define>
                        <bean:define id="dispwidth">
							${column.displaySize}
						</bean:define>
                        <c:choose>
                            <c:when test="${!empty column.trimType}">
                                <bean:define id="trimType">
									${column.trimType}
								</bean:define>
                                <tiles:insert page="/operationsportal/operations_split/Entitlements/tableHeaderColumnTile.jsp">
                                    <tiles:put name="formName" value="<%=formName%>" />
                                    <tiles:put name="sortColumnName" value="<%=sortname%>" />
                                    <tiles:put name="labelKey" value="<%=lkey%>" />
                                    <tiles:put name="sortUrl" value="<%=baseURL + "SORT.do"%>" />
                                    <tiles:put name="displayWidth" value="<%=dispwidth + ""%>" />
                                    <tiles:put name="trimType" value="<%=trimType%>" />
                                </tiles:insert>
                            </c:when>
                            <c:otherwise>
                                <tiles:insert page="/operationsportal/operations_split/Entitlements/tableHeaderColumnTile.jsp">
                                    <tiles:put name="formName" value="<%=formName%>" />
                                    <tiles:put name="sortColumnName" value="<%=sortname%>" />
                                    <tiles:put name="labelKey" value="<%=lkey%>" />
                                    <tiles:put name="sortUrl" value="<%=baseURL + "SORT.do"%>" />
                                    <tiles:put name="displayWidth" value="<%=dispwidth + ""%>" />
                                    <tiles:put name="trimType" value="" />
                                </tiles:insert>
                            </c:otherwise>
                        </c:choose>
                    </c:when>
                    <c:otherwise>
                        <c:set var="flabel">
                            <fmt:message key='<%=lkey%>' />
                        </c:set>
                        <c:if test="${fn:startsWith(flabel, '???')}">
                            <c:set var="flabel">
                                <fmt:bundle basename="PublisherDefinedAttributesText">
                                    <fmt:message key='<%=lkey%>' />
                                </fmt:bundle>
                            </c:set>
                        </c:if>
                        <c:if test="${fn:startsWith(flabel, '???')}">
                            <c:set var="flabel">
									${column.fieldName}
								</c:set>
                        </c:if>
                        <%
                            // TODO: FNO-13360
                        %>
                        <c:set var="flabellen" value="${fn:length(flabel)}" />
                        <c:choose>
                            <c:when test="${flabellen > column.displaySize}">
                                <c:choose>
                                    <c:when test="${column.trimType == 'back'}">
                                        <a title='${flabel}'> <c:set var="flabel" value="${fn:substring(flabel, 0, column.displaySize)}" /> ${flabel}..
                                        </a>
                                    </c:when>
                                    <c:when test="${column.trimType == 'front'}">
                                        <a title='${flabel}'> <c:set var="flabel" value="${fn:substring(flabel, flabellen - column.displaySize, flabellen)}" /> ..${flabel}
                                        </a>
                                    </c:when>
                                    <c:otherwise>${flabel}</c:otherwise>
                                </c:choose>
                            </c:when>
                            <c:otherwise>${flabel}</c:otherwise>
                        </c:choose>
                    </c:otherwise>
                </c:choose>
            </fno-v2:th>
            <c:if test="${fn:endsWith(column.fieldName, 'portal.manageEntitlements.TableColumn.NumberOfCopies')}">
                <c:set var="colSpan" value="${colSpan + 1}" />
                <fno-v2:th width="60">
                    <fmt:message key="operationsportal.supportLicenses.TableColumn.TotalCopies" />
                </fno-v2:th>
            </c:if>
          </c:if>  
        </c:forEach>
        <fno:authorize ifAllGranted="<%=IPermissionENC.PORTAL_DOWNLOAD_OPERATIONS.getName()%>">
		<c:if test="${showDownloads == true}">
			<c:set var="colSpan" value="${colSpan + 1}" />
			<fno-v2:th width="80">
				<fmt:message key="operationsportal.manageEntitlements.TableColumn.Downloads" />
			</fno-v2:th>
		</c:if>
		</fno:authorize>
	</fno-v2:tr>
    <c:choose>
        <c:when test="${formObj.hasDataRecords}">
	        <tiles:insert page="/operationsportal/Activations/showRelatedLineItems.jsp">
	            <tiles:put name="formName" value="<%=formName%>" />
	            <tiles:put name="relatedItems" value="false" />
	        </tiles:insert>
        </c:when>
        <c:otherwise>
            <fno-v2:tr applystyle="false">
                <td id="No_Records_Message_TD" colspan="${colSpan}" align="center"><span class="msg msg-is-info"> <fmt:message key="operationsportal.manageEntitlements.message.noItemsFound" />
                </span></td>
            </fno-v2:tr>
        </c:otherwise>
    </c:choose>
</fno-v2:table>
<input type="hidden" name="sortColumnKey" value="" />

<script>

function getDownloadLink(cnt)
{
	var prodName1 = $('div#prodName'+cnt).text().trim();
	var prodName ='';
	var lines = prodName1.split("\n");
	for (i=0; i < lines.length; i++)
	{
		if (lines[i].length > 1)
		{
			prodName += lines[i]+' ';
		}
	}

	var actId = $('#activationId'+cnt).val();
	return "DownloadOrderPage.action?activateId="+actId+"&productName="+prodName;
}

 function showRelated(lineId){	    		    		    			    	   
    	var contextDetails={
    			contextPath: "/flexnet/operationsportal",
    			spinnerPath: "/flexnet/resources/operationsportal",
    			hideRelatedLabelKey: '<fmt:message key="opertationportal.manageEntitlements.label.hideRelated" />',    
    			colSpan: "${colSpan}"	    			
    	};
    	showRelatedGrouping(lineId, contextDetails);
    	
    } 

</script>
