<%@ page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<%@ page import="com.flexnet.products.publicapi.IPermissionENC"%>
<tiles:useAttribute id="formName" name="formName" classname="java.lang.String" />
<tiles:useAttribute id="notDraft" name="notDraft" classname="java.lang.String" />
<tiles:useAttribute id="showOverdraftAttribute" name="showOverdraftAttribute" classname="java.lang.String" ignore="true" />
<tiles:useAttribute id="showTimeZone" name="showTimeZone" classname="java.lang.String" ignore="true" />
<!-- Customization for SSO -->
<c:set var="portalStateBean">
    <%=PortalStateBean.PORTAL_STATE_BEAN_ID%>
</c:set>
<c:set var="learnMore">
	<fmt:message key="operations.LearnMore" />
</c:set>
<c:set var="hidePageLevelHelpLink" value="${sessionScope[portalStateBean].customizerBean.hidePageLevelHelpLink}" />
<c:set var="formObj" value="${requestScope[formName]}" />
<logic:iterate id="object" name="<%=formName%>" property="customAttributes">
    <li><bean:define id="name" name="object" property="name" /> <bean:define id="type" name="object" property="type" /> <bean:define id="TextType" name="<%=formName%>" property="textType" type="java.lang.String" /> <bean:define id="NumberType" name="<%=formName%>" property="numberType" type="java.lang.String" /> <bean:define
            id="BooleanType" name="<%=formName%>" property="booleanType" type="java.lang.String" /> <bean:define id="DateType" name="<%=formName%>" property="dateType" type="java.lang.String" /> <bean:define id="MultiValuedTextType" name="<%=formName%>" property="multiValuedTextType" type="java.lang.String" /> <bean:define
            id="LongtextType" name="<%=formName%>" property="longtextType" type="java.lang.String" /> <c:set var="nameVal"><%=name%></c:set> <bean:define id="requiredYN" name="<%= formName %>" property='licenseModelRequiredForAttribute(${nameVal})' type="java.lang.Boolean" /> <c:set var="required"><%=requiredYN%></c:set> <c:choose>
            <c:when test="${showOverdraftAttribute == 'false' && nameVal == 'OVERDRAFT_MAX'}">
            </c:when>
			<c:when test="${nameVal == 'SP_SIEBEL_EXPORTED'}">
				<html:hidden name="<%= formName %>" property="<%= "singleValueLMAttribute(" + name + ")" %>" value="false"/>
			</c:when>
            <c:otherwise>
                <c:choose>
                    <c:when test="${notDraft == 'false' && required}">
                        <c:set var="isLabelRequired" value="required" />
                    </c:when>
                    <c:otherwise>
                        <c:set var="isLabelRequired" value="optional" />
                    </c:otherwise>
                </c:choose>
                <label class="${isLabelRequired}"> <c:set var="attrLabel">
                        <fmt:message key='<%=name + ".label"%>' />
                    </c:set> <c:if test="${fn:startsWith(lookupLabel, '???')}">
                        <c:set var="attrLabel">
                            <fmt:bundle basename="PublisherDefinedAttributesText">
                                <fmt:message key='<%=name + ".label"%>' />
                            </fmt:bundle>
                        </c:set>
                    </c:if> <c:choose>
                        <c:when test="${fn:startsWith(attrLabel, '???')}">
                            <%=name%>
                        </c:when>
                        <c:otherwise>
							${attrLabel}
						</c:otherwise>
                    </c:choose>                    
                </label>
                <!-- Choose an appropriate input field to go with label -->
                <logic:equal name="type" value="<%=TextType%>">
                    <c:choose>
                        <c:when test='${notDraft == "false"}'>
                            <logic:notEmpty name="object" property="validValues">
                                <bean:define id="attrValue" name="<%= formName %>" property='singleValueLMAttribute(${nameVal})' type="java.lang.String" />
                                <html:select name="<%= formName %>" property="singleValueLMAttribute(${nameVal})" styleClass="form" value="<%= attrValue %>">
                                    <logic:iterate id="txtval" name="object" property="validValues" type="java.lang.String">
                                        <html:option value="<%=txtval%>">
                                            <c:set var="validvalueLabel">
                                                <fmt:message key='<%=name + "." + txtval + ".label"%>' />
                                            </c:set>
                                            <c:if test="${fn:startsWith(validvalueLabel, '???')}">
                                                <c:set var="validvalueLabel">
                                                    <fmt:bundle basename="PublisherDefinedAttributesText">
                                                        <fmt:message key='<%=name + "." + txtval
                                                                        + ".label"%>' />
                                                    </fmt:bundle>
                                                </c:set>
                                            </c:if>
                                            <c:choose>
                                                <c:when test="${fn:startsWith(validvalueLabel, '???')}">
                                                    <%=txtval%>
                                                </c:when>
                                                <c:otherwise>
                                                    <c:out value="${validvalueLabel}" />
                                                </c:otherwise>
                                            </c:choose>
                                        </html:option>
                                    </logic:iterate>
                                </html:select>
                            </logic:notEmpty>
                            <%-- Number type attribute --%>
                            <logic:empty name="object" property="validValues">
                                <bean:define id="maxLen" name="object" property="maxLength" type="java.lang.Integer" />
                                <c:set var="maxlength">
                                    <%=maxLen.intValue()%>
                                </c:set>
                                <bean:define id="textboxSize">
                                    <c:choose>
                                        <c:when test="${maxlength > 35}">35</c:when>
                                        <c:otherwise>
                                            <c:out value="${maxlength}" />
                                        </c:otherwise>
                                    </c:choose>
                                </bean:define>
                                <c:choose>
                                    <c:when test="${object.displayType == 'TEXT_AREA'}">
                                        <html:textarea name="<%=formName%>" property='<%="singleValueLMAttributeValue(" + name
                                                        + ")"%>' cols="35" rows="5" styleClass="form" />
                                    </c:when>
                                    <c:otherwise>
                                        <html:text name="<%=formName%>" property='<%="singleValueLMAttributeValue(" + name
                                                        + ")"%>' maxlength="<%=maxLen.toString()%>" styleClass="form" />
                                    </c:otherwise>
                                </c:choose>
                            </logic:empty>
                        </c:when>
                        <c:otherwise>
                            <c:choose>
                                <c:when test="${object.displayType == 'TEXT_AREA'}">
                                    <html:textarea name="<%=formName%>" property='<%="singleValueLMAttributeValue(" + name + ")"%>' cols="35" rows="5" readonly="true" styleClass="form" />
                                </c:when>
                                <c:otherwise>
                                    <label class="ReadOnlyDetail"> <bean:write name="<%=formName%>" property='<%="singleValueLMAttributeValue(" + name + ")"%>' />
                                    </label>
                                </c:otherwise>
                            </c:choose>
                        </c:otherwise>
                    </c:choose>
                </logic:equal>
                <logic:equal name="type" value="<%=LongtextType%>">
                    <c:choose>
                        <c:when test='${notDraft == "false"}'>
                            <logic:empty name="object" property="validValues">
                                <bean:define id="textboxSize">
		 							35
		 						</bean:define>
                                <c:choose>
                                    <c:when test="${object.displayType == 'TEXT_AREA'}">
                                        <html:textarea name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' rows="5" cols="35" styleClass="form" />
                                    </c:when>
                                    <c:otherwise>
                                        <html:text name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' styleClass="form" />
                                    </c:otherwise>
                                </c:choose>
                            </logic:empty>
                        </c:when>
                        <c:otherwise>
                            <c:choose>
                                <c:when test="${object.displayType == 'TEXT_AREA'}">
                                    <html:textarea name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' rows="5" cols="35" styleClass="form" readonly="true" />
                                </c:when>
                                <c:otherwise>
                                    <label class="ReadOnlyDetail"> <bean:write name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' />
                                    </label>
                                </c:otherwise>
                            </c:choose>
                        </c:otherwise>
                    </c:choose>
                </logic:equal>
                <logic:equal name="type" value="<%=NumberType%>">
                    <c:choose>
                        <c:when test='${notDraft == "false"}'>
                            <html:text name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' size="4" styleClass="form" />
                        </c:when>
                        <c:otherwise>
                            <label class="ReadOnlyDetail"> <bean:write name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' />
                            </label>
                        </c:otherwise>
                    </c:choose>
                </logic:equal>
                <%-- Date attributes --%>
                <logic:equal name="type" value="<%=DateType%>">
                    <c:choose>
                        <c:when test='${notDraft == "false"}'>
                            <html:text name='<%=formName%>' property='<%="singleValueLMAttribute(" + name + ")"%>' styleId='<%="singleValueLMAttribute(" + name + ")"%>' styleClass="SimpleDateDetail" readonly="true" />
                        </c:when>
                        <c:otherwise>
                            <label class="ReadOnlyDetail"> <bean:write name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' />
                            </label>
                        </c:otherwise>
                    </c:choose>
                </logic:equal>
                <%-- Boolean attributes --%>
                <logic:equal name="type" value="<%=BooleanType%>">
                    <div class="RadioDetail">
                        <html:radio name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' value="true" styleClass="RadioDetail" disabled="<%=new Boolean(notDraft).booleanValue()%>">
                            <label class="RadioDetail"> <fmt:message key="boolean.YES" />
                            </label>
                        </html:radio>
                        <html:radio name="<%=formName%>" property='<%="singleValueLMAttribute(" + name + ")"%>' value="false" styleClass="RadioDetail" disabled="<%=new Boolean(notDraft).booleanValue()%>">
                            <label class="RadioDetail"> <fmt:message key="boolean.NO" />
                            </label>
                        </html:radio>
                    </div>
                </logic:equal>
                <%-- Multi-Text attributes --%>
                <logic:equal name="type" value="<%=MultiValuedTextType%>">
                    <div class="ListDetail">
                        <logic:iterate id="validValue" name="object" property="sortedValidValues" indexId="idx" type="java.lang.String">
                            <html:multibox name="<%=formName%>" property='<%="multiValueLMAttribute(" + name + ")"%>' styleClass="ListDetail" disabled="<%=new Boolean(notDraft).booleanValue()%>">
                                <%=validValue%>
                            </html:multibox>
                            <label> <c:set var="validvalueLabel">
                                    <fmt:message key='<%=validValue + ".label"%>' />
                                </c:set> <c:if test="${fn:startsWith(validvalueLabel, '???')}">
                                    <c:set var="validvalueLabel">
                                        <fmt:bundle basename="PublisherDefinedAttributesText">
                                            <fmt:message key='<%=name + "." + validValue + ".label"%>' />
                                        </fmt:bundle>
                                    </c:set>
                                </c:if> <c:choose>
                                    <c:when test="${fn:startsWith(validvalueLabel, '???')}">
                                        <%=validValue%>
                                    </c:when>
                                    <c:otherwise>
                                        <c:out value="${validvalueLabel}" />
                                    </c:otherwise>
                                </c:choose>
                            </label>
                        </logic:iterate>
                    </div>
                </logic:equal>
                <c:if test='${notDraft == "false"}'>
                    <c:if test="${fn:startsWith(object.nameSpace, 'FLEXnet')}">
                        <%-- Don't show help if "Hide All Help Links" is configured "on" --%>
                        <c:if test='${!hidePageLevelHelpLink}'>
                            <div class="inline-help icon-small icon-main-nav-help">
                                <div class="inline-help-wrapper">
                                    <div class="inline-help-content">
                                        <p>
                                            <fmt:message key='<%=name + ".help"%>' />
                                        </p>
                                        <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= name%>');">${learnMore}</a>
                                    </div>
                                </div>
                            </div>
                        </c:if>
                    </c:if>
                </c:if>
            </c:otherwise>
        </c:choose></li>
</logic:iterate>
<c:if test="${showTimeZone == 'true'}">
    <li><label> <fmt:message key="portal.batchActivation.ConfigureCounts.label.fulfillment.timeZone" />
    </label> <label class="ReadOnlyDetail"> <c:choose>
                <c:when test='${notDraft == "false"}'>
                    <html:select name="formObj" property="selectedFNPTimeZone" styleClass="form">
                        <logic:iterate id="tz" name="formObj" property="timeZoneValues">
                            <html:option value="<%=(String)tz%>">
                                <bean:message key='<%=(String)tz + ".label"%>' />
                            </html:option>
                        </logic:iterate>
                    </html:select>
                </c:when>
                <c:otherwise>
                    <bean:define id="tz" name="formObj" property="selectedFNPTimeZone" />
                    <bean:message key='<%=(String)tz + ".label"%>' />
                </c:otherwise>
            </c:choose>
    </label></li>
</c:if>