<%@ page import="com.flexnet.operations.web.beans.PortalStateBean" %>
<%@ page import="com.flexnet.products.publicapi.IPermissionENC"%>

<tiles:useAttribute id="formName" name="formName" classname="java.lang.String"/>
<tiles:useAttribute id="notDraft" name="notDraft" classname="java.lang.String"/>
<tiles:useAttribute id="showOverdraftAttribute" name="showOverdraftAttribute" classname="java.lang.String" ignore="true"/>
<tiles:useAttribute id="showTimeZone" name="showTimeZone" classname="java.lang.String" ignore="true"/>

<!-- Customization for SSO -->
<c:set var="portalStateBean">
	<%= PortalStateBean.PORTAL_STATE_BEAN_ID %>
</c:set>
<c:set var="hidePageLevelHelpLink" value="${sessionScope[portalStateBean].customizerBean.hidePageLevelHelpLink}"/>

<c:set var="formObj" value="${requestScope[formName]}"/>

					<logic:iterate id="object" name="<%= formName %>" property="customAttributes">
						<bean:define id="name" name="object" property="name"/>
						<bean:define id="type" name="object" property="type"/>
						<bean:define id="TextType" name="<%= formName %>" property="textType" type="java.lang.String"/>
						<bean:define id="NumberType" name="<%= formName %>" property="numberType" type="java.lang.String"/>
						<bean:define id="BooleanType" name="<%= formName %>" property="booleanType" type="java.lang.String"/>
						<bean:define id="DateType" name="<%= formName %>" property="dateType" type="java.lang.String"/>
						<bean:define id="MultiValuedTextType" name="<%= formName %>" property="multiValuedTextType" type="java.lang.String"/>
						<bean:define id="LongtextType" name="<%= formName %>" property="longtextType" type="java.lang.String"/>
										
						<c:set var="nameVal"><%= name %></c:set>
						<bean:define id="requiredYN" name="<%= formName %>" property='licenseModelRequiredForAttribute(${nameVal})' type="java.lang.Boolean"/>
						<c:set var="required"><%= requiredYN %></c:set>
						
						<c:choose>
							<c:when test="${showOverdraftAttribute == 'false' && nameVal == 'OVERDRAFT_MAX'}">
							</c:when>
							<c:when test="${nameVal == 'SP_SIEBEL_EXPORTED'}">
								<html:hidden name="<%= formName %>" property="<%= "singleValueLMAttribute(" + name + ")" %>" value="false"/>
							</c:when>
							<c:otherwise>
								<tr>
									<td valign="top" class="formLabel">
										<c:if test="${notDraft == 'false' && required}">
											<span class="required-mark" title="<fmt:message key='common.required'/>">*</span>
										</c:if>
										<c:set var="attrLabel"><fmt:message key='<%= name + ".label" %>'/></c:set>
										<c:if test="${fn:startsWith(attrLabel, '???')}">
											<c:set var="attrLabel"><fmt:bundle basename="PublisherDefinedAttributesText"><fmt:message key='<%= name + ".label" %>'/></fmt:bundle></c:set>
										</c:if>
										<c:choose>
											<c:when test="${fn:startsWith(attrLabel, '???')}">
												<%= name %>:
											</c:when>
											<c:otherwise>
												<c:out value="${attrLabel}"/>:
											</c:otherwise>
										</c:choose>
										<logic:equal name="type" value="<%=DateType%>"></logic:equal>
									</td>
							    	<td valign="top" class="form">
								    	<logic:equal name="type" value="<%=TextType%>">
							    			<c:choose>
			 									<c:when test='${notDraft == "false"}'>	
			 										<logic:notEmpty name="object" property="validValues">
			 											<bean:define id="attrValue" name="<%= formName %>" property='singleValueLMAttribute(${nameVal})' type="java.lang.String"/>
			 											<html:select name="<%= formName %>"  property="singleValueLMAttribute(${nameVal})" styleClass="form" value="<%= attrValue %>"> 
															<logic:iterate id="txtval" name="object" property="validValues" type="java.lang.String">
																<html:option value="<%= txtval %>">
																	<c:set var="validvalueLabel"><fmt:message key='<%= name + "." + txtval + ".label" %>'/></c:set>
																	<c:if test="${fn:startsWith(validvalueLabel, '???')}">
																		<c:set var="validvalueLabel"><fmt:bundle basename="PublisherDefinedAttributesText"><fmt:message key='<%= name + "." + txtval + ".label" %>'/></fmt:bundle></c:set>
																	</c:if>
																	<c:choose>
																		<c:when test="${fn:startsWith(validvalueLabel, '???')}">
																			<%= txtval %>
																		</c:when>
																		<c:otherwise>
																			<c:out value="${validvalueLabel}"/>
																		</c:otherwise>
																	</c:choose>
																</html:option>
												 			</logic:iterate>
			 											</html:select>
			 										</logic:notEmpty>
			 										<logic:empty name="object" property="validValues">
														<bean:define id="maxLen" name="object" property="maxLength" type="java.lang.Integer"/>
			 											<c:set var="maxlength"><%= maxLen.intValue() %></c:set>	
			 											<bean:define id="textboxSize">
			 												<c:choose>
			 													<c:when test="${maxlength > 35}">35</c:when>
			 													<c:otherwise><c:out value="${maxlength}"/></c:otherwise>
			 												</c:choose>
			 											</bean:define>
									 					<c:choose>
															<c:when test="${object.displayType == 'TEXT_AREA'}">
															    <html:textarea name="<%= formName %>"  property='<%= "singleValueLMAttributeValue(" + name + ")" %>' cols="35" rows="5" styleClass="form"/> 
															</c:when>
															<c:otherwise>
															  <html:text name="<%= formName %>"  property='<%= "singleValueLMAttributeValue(" + name + ")" %>' size="<%= textboxSize %>" maxlength="<%=  maxLen.toString() %>" styleClass="form"/> 
															</c:otherwise>
														</c:choose>	
									 					
									 				</logic:empty>
									 			</c:when>
									 			<c:otherwise>
									 			    	<c:choose>
															<c:when test="${object.displayType == 'TEXT_AREA'}">
															    <html:textarea name="<%= formName %>"  property='<%= "singleValueLMAttributeValue(" + name + ")" %>' cols="35" rows="5" readonly="true" styleClass="form"/> 
															</c:when>
															<c:otherwise>
															  <bean:write  name="<%= formName %>"  property='<%= "singleValueLMAttributeValue(" + name + ")" %>'/>
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
												 		         <html:textarea name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>' rows="5" cols="35" styleClass="form"/> 
															</c:when>
															<c:otherwise>
												 		            <html:text name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>' size="<%= textboxSize %>"  styleClass="form"/>  
					     									</c:otherwise>							    	
				     									</c:choose>
									 				</logic:empty>
									 			</c:when>
									 			<c:otherwise>
									 			    <c:choose>
												 		    <c:when test="${object.displayType == 'TEXT_AREA'}">
							                                      <html:textarea name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>' rows="5" cols="35" styleClass="form" readonly="true"/> 
															</c:when>
															<c:otherwise>
												 		          <bean:write  name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>'/>																
					     									</c:otherwise>							    	
				     									</c:choose>
									 				
									 			</c:otherwise>
								 			</c:choose>
								 		</logic:equal>			    	
								    	<logic:equal name="type" value="<%=NumberType%>">
							    			<c:choose>
			 									<c:when test='${notDraft == "false"}'>												    							    	
									 				<html:text name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>' size="4" styleClass="form"/>
							 					</c:when>
									 			<c:otherwise>
									 				<bean:write  name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>'/>
									 			</c:otherwise>
								 			</c:choose>						 			
								 		</logic:equal>
								    	<logic:equal name="type" value="<%=DateType%>">
							    			<c:choose>
			 									<c:when test='${notDraft == "false"}'>	
													<html:text name='<%=formName%>' property='<%= "singleValueLMAttribute(" + name + ")" %>' styleId='<%= "singleValueLMAttribute(" + name + ")" %>' styleClass="form text date"/>
							 					</c:when>
									 			<c:otherwise>
									 				<bean:write  name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>'/>
									 			</c:otherwise>
								 			</c:choose>						 			
								 		</logic:equal>
								 		
								    	<logic:equal name="type" value="<%=BooleanType%>">
								 		    <html:radio name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>' value="true" styleClass="form" disabled="<%=new Boolean(notDraft).booleanValue()%>"> <fmt:message key="boolean.YES"/> </html:radio>
					                        <html:radio name="<%= formName %>"  property='<%= "singleValueLMAttribute(" + name + ")" %>' value="false" styleClass="form" disabled="<%=new Boolean(notDraft).booleanValue()%>"> <fmt:message key="boolean.NO"/> </html:radio>                        
								 		</logic:equal>
								    	<logic:equal name="type" value="<%=MultiValuedTextType%>">
								    	   <table>
											<logic:iterate id="validValue" name="object" property="sortedValidValues" indexId="idx" type="java.lang.String">
											    <% int third_index = idx.intValue() % 2;
											     if(third_index == 0){%>
												 <tr>
												 <%}%>
											     
												<td valign="top" nowrap>
													<html:multibox name="<%= formName %>"  property='<%= "multiValueLMAttribute(" + name + ")" %>' styleClass="form" disabled="<%=new Boolean(notDraft).booleanValue()%>"> <%=validValue%></html:multibox>
													<c:set var="validvalueLabel"><fmt:message key='<%= validValue + ".label" %>'/></c:set>
													<c:if test="${fn:startsWith(validvalueLabel, '???')}">
														<c:set var="validvalueLabel"><fmt:bundle basename="PublisherDefinedAttributesText"><fmt:message key='<%= name + "." + validValue + ".label" %>'/></fmt:bundle></c:set>
													</c:if>
													<c:choose>
														<c:when test="${fn:startsWith(validvalueLabel, '???')}">
															<%= validValue %>
														</c:when>
														<c:otherwise>
															<c:out value="${validvalueLabel}"/>
														</c:otherwise>
													</c:choose>
												</td>										
											    <%if(third_index == 1){%>
												</tr>
												<%}%>						
											</logic:iterate>
											</table>
									  </logic:equal>
										<c:if test='${notDraft == "false"}'>
											<c:if test="${fn:startsWith(object.nameSpace, 'FLEXnet')}">	
											<!-- Don't show help if "Hide All Help Links" is configured "on" -->
												<c:if test='${!hidePageLevelHelpLink}'>
													<div class="inline-help icon-small icon-main-nav-help">
													    <div class="inline-help-wrapper">
													        <div class="inline-help-content">
													            <p><fmt:message key='<%= name + ".help" %>'/></p>
													            <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= name%>');">Learn More</a>
												            </div>
												        </div>
												    </div>			    		
												</c:if>
											</c:if>
										</c:if>				
									</td>
								</tr>
							</c:otherwise>
						</c:choose>
				  	</logic:iterate>
		<c:if test="${showTimeZone == 'true'}">		
		<tr>
		<td class="formLabel"><bean:message key="fulfillment.timeZone"/></td>
		<td>
		<c:choose>
		<c:when test='${notDraft == "false"}'>
		
         	<html:select name="formObj" property="selectedFNPTimeZone" styleClass="form">
            			<logic:iterate id="tz" name="formObj" property="timeZoneValues"> 
            				<c:set var = "string0" value = "${fn:split(tz, '(')}" />
							
							
										
							<c:choose>
								<c:when test="${fn:containsIgnoreCase(string0[0], ',')}">
								<c:set var="tzs" value="${fn:split(string0[0], ',')}" />
								<html:option value="${string0[0].trim()}">
									<c:forEach items="${tzs}" var="tzName" varStatus="stat">
										<bean:message key='${tzName.trim()}.label'/>
									</c:forEach>
									(${string0[1]}
								</html:option>
								</c:when>
								<c:otherwise>
								
								<html:option value="${string0[0].trim()}"><bean:message key='${string0[0].trim()}.label'/>(${string0[1]}</html:option>
								</c:otherwise>
							
							</c:choose>
            			</logic:iterate>
         	</html:select>	
          </c:when>
          <c:otherwise>
            <bean:define id="tz" name="formObj" property="selectedFNPTimeZone"/>
            <c:set var = "string0" value = "${fn:split(tz, '(')}" />
				<c:choose>
								<c:when test="${fn:containsIgnoreCase(string0[0], ',')}">
								<c:set var="tzs" value="${fn:split(string0[0], ',')}" />
								
									<c:forEach items="${tzs}" var="tzName" varStatus="stat">
										<bean:message key='${tzName.trim()}.label'/>
									</c:forEach>
									(${string0[1]})
								
								</c:when>
								<c:otherwise>
								
								<bean:message key='${string0[0].trim()}.label'/>(${string0[1]}
								</c:otherwise>
							</c:choose>
		</c:otherwise>
		</c:choose>
        </td>
          
		</tr>
		</c:if>