<%@ page import="java.util.HashMap" %>
<%@ page import="com.flexnet.operations.web.beans.PortalStateBean" %>

<tiles:useAttribute id="baseURL" name="baseURL"
	classname="java.lang.String" />
<tiles:useAttribute id="formName" name="formName"
	classname="java.lang.String" />
<tiles:useAttribute id="searchFieldName" name="searchFieldName"
	classname="java.lang.String" />

<c:set var="constMap" value="${applicationScope.entitlementsConstMap}"/>
<c:set var="entIdConst"
	value="${constMap.SEARCH_ATTRIBUTE_ENTITLEMENT_ID}" />
<c:set var="parentBulkEntIdConst"
	value="${constMap.SEARCH_ATTRIBUTE_PARENT_BULK_ENTITLEMENT_ID}" />
<c:set var="orderableConst"
	value="${constMap.SEARCH_ATTRIBUTE_ORDERABLE}" />
<c:set var="soldtoConst" value="${constMap.SEARCH_ATTRIBUTE_SOLDTO}"/>
<c:set var="soldtoNameConst"
	value="${constMap.SEARCH_ATTRIBUTE_SOLDTO_NAME }" />
<c:set var="partNumberConst"
	value="${constMap.SEARCH_ATTRIBUTE_PART_NUMBER }" />

<c:set var="portalStateBean">
	<%= PortalStateBean.PORTAL_STATE_BEAN_ID %>
</c:set>
<c:set var="LoggedInWithEntitlementId"
	value="${sessionScope[portalStateBean].entitlementID}" />
<c:set var="LoggedInWithLineItemId"
	value="${sessionScope[portalStateBean].lineItemID}" />

<div class="LandingPageSearchBlock">
	<html:select name="<%= formName %>" property="searchCategory"
		styleClass="SearchScopeDetail">
		<html:option value="" disabled="true">
			<fmt:message key="operationsportal.manageEntitlements.Search.SearchScope" />
		</html:option>
		<c:if
			test="${empty LoggedInWithEntitlementId && empty LoggedInWithLineItemId}">
			<html:option
				value="<%=(String)pageContext.getAttribute("entIdConst")%>">
				<fmt:message key="operationsportal.manageEntitlements.SearchBy.EntitlementID" />
			</html:option>
	          </c:if>
		<c:if
			test="${empty LoggedInWithEntitlementId && empty LoggedInWithLineItemId}">
			<html:option
				value="<%=(String)pageContext.getAttribute("parentBulkEntIdConst")%>">
				<fmt:message
					key="operationsportal.manageEntitlements.SearchBy.ParentBulkEntitlementID" />
			</html:option>
	          </c:if>	          
		<html:option value="LINE_ITEM_ID">
			<fmt:message key="operationsportal.manageEntitlements.SearchBy.LineItemID" />
		</html:option>
		<html:option
			value="<%=(String)pageContext.getAttribute("orderableConst")%>">
			<fmt:message key="operationsportal.manageEntitlements.SearchBy.Product" />
		</html:option>
		<html:option
			value="<%=(String)pageContext.getAttribute("partNumberConst")%>">
			<fmt:message key="operationsportal.manageEntitlements.SearchBy.PartNumber" />
		</html:option>
		<html:option
			value="<%=(String)pageContext.getAttribute("soldtoConst")%>">
			<fmt:message key="operationsportal.manageEntitlements.SearchBy.SoldTo" />
		</html:option>
		<html:option
			value="<%=(String)pageContext.getAttribute("soldtoNameConst")%>">
			<fmt:message key="operationsportal.manageEntitlements.SearchBy.SoldToName" />
		</html:option>
	   	</html:select>
  	    <tiles:insert page="/operationsportal/operations_split/Entitlements/SearchOperatorTile.jsp">
			<tiles:put name="formName" value="<%= formName %>"/>
			<tiles:put name="propertyName" value="searchQualifier"/>
	  	</tiles:insert>
	<div class="SearchQueryDetail">
		<c:set var="onkeypressURL">
			searchOnEnterKey('<%=formName%>',event,'<%=baseURL%>SIMPLESEARCH.do','<fmt:message
		key="operationsportal.alert.selectACategory" />')
		</c:set>
		<html:text name="<%= formName %>" property="searchPhrase"
			styleClass="SearchPhraseDetail" onkeypress="${onkeypressURL}" />
		<a class="SearchActionDetail icon-search"
			href="JavaScript:performSimpleSearch('<%=formName%>','<%=baseURL%>SIMPLESEARCH.do','<fmt:message key="operationsportal.alert.selectACategory"/>')">
		</a>
        <a class="clear-search icon-data-inputs-fail" href="JavaScript:resetSearch('<%= formName %>','<%= baseURL %>SIMPLESEARCH.do')" title="<fmt:message key="Image.ToolTip.ClearSearch"/>"></a>
		<a class="AdvancedSearchDetail"
			href="JavaScript:openLineItemsAdvancedSearch('<%=formName%>', '<%=baseURL%>ADVANCEDSEARCH.do', '<%=baseURL%>VIEW.do')">
			<fmt:message key="operationsPortalLayout.AdvancedSearch.Link" />
		</a>
	</div>
</div>