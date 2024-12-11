<tiles:useAttribute id="formName" name="formName" classname="java.lang.String"/>
<tiles:useAttribute id="showServerHosts" name="showServerHosts" classname="java.lang.String"/>
<tiles:useAttribute id="showNodeLockedHosts" name="showNodeLockedHosts" classname="java.lang.String"/>
<tiles:useAttribute id="allowRedundantServers" name="allowRedundantServers" classname="java.lang.String" ignore="true"/>
<tiles:useAttribute id="showHostsTableYN" name="showHostsTableYN" classname="java.lang.String"/>
<tiles:useAttribute id="baseURL" name="baseURL" classname="java.lang.String"/>
<tiles:useAttribute id="onlyOneServerAllowed" name="onlyOneServerAllowed" classname="java.lang.String" ignore="true"/>
<tiles:useAttribute id="ignoreHostTypes" name="ignoreHostTypes" classname="java.lang.String" ignore="true"/>
<tiles:useAttribute id="propertyName" name="propertyName" classname="java.lang.String"/>
<tiles:useAttribute id="helpMessageKey" name="helpMessageKey" classname="java.lang.String"/>


<c:set var="formObj" value="${requestScope[formName]}"/>
<bean:define id="addFunction">
	JavaScript:addHost('<%=formName%>', '<%=baseURL + "ADD_HOST.do"%>')
</bean:define>
					
<c:choose>
	<c:when test="${showServerHosts == 'true'}">
		<tr>
			<td>
				<c:choose>
				<c:when test="${showHostsTableYN == 'yes'}">
					<table id="ServerHostsTable"  cellspacing="0" cellpadding="7" style="display:">
				</c:when>
				<c:otherwise>
					<table id="ServerHostsTable"  cellspacing="0" cellpadding="7" style="display:none">
				</c:otherwise>
				</c:choose>
				 	<c:if test="${onlyOneServerAllowed == 'false'}">
					<tr>
						<td valign="top" align="left">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td><span class="formLabel"><fmt:message key="configureLineItems.label.serverHosts"/>&nbsp;&nbsp;</span></td>
									<td class="butLabelLeftNEW"></td>
									<td class="butLabelWedgeNEW"></td>
									<td class="button_bkgrd1NEW" nowrap><a class="butLabelNEW" href="<%=addFunction%>" id="BAConfigHosts_AddServerHost">
							            							<fmt:message key="configureLineItems.label.addServerhost"/>
							            						</a>
									</td>
									<td class="butLabelWedgeNEW"></td>
									<td class="butLabelRightNEW"></td>
								</tr>
							</table>
						</td>
						<td></td>
					</tr>
					</c:if>
					
					<c:forEach items="${formObj.serverHostIds}" var="serverHost" varStatus="serverHostStatus">
						<c:set var="serverHostInd" value="${serverHostStatus.index + 1}"/>
						<bean:define id="tableclass">
							<c:choose>
								<c:when test="${serverHostInd % 2 == 0}">TableWithShadedBackground</c:when>
								<c:otherwise>TableWithWhiteBackground</c:otherwise>
							</c:choose>
						</bean:define>
					<tr>
						<td>
							<table cellpadding="6" cellspacing="0" id="TableWithServerHosts" class="GroupBox">
								<tr>
									<td valign="top">
										<table cellpadding="0" cellspacing="0" width="100%" class="<%= tableclass %>">
											<tr>
												<td>
													<table cellpadding="0" cellspacing="0" width="50%">
														<tr>
															<bean:define id="serverSelectId">
																serverSelectValue(serverSelect_<c:out value="${serverHostInd}"/>_1)
															</bean:define>
															<bean:define id="serverSpanId">
																serverSpan_<c:out value="${serverHostInd}"/>_1
															</bean:define>
															<bean:define id="serverTextVal">
																serverTextValue(serverText_<c:out value="${serverHostInd}"/>_1)
															</bean:define>
															<bean:define id="onChangeFunction">
																JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${serverSelectId}"/>', '<c:out value="${serverSpanId}"/>')
															</bean:define>
															<bean:define id="redundantServer">
																redundantServerValue(redundantServer_<c:out value="${serverHostInd}"/>_1)
															</bean:define>
															<bean:define id="removeServerFunction">
																JavaScript:removeServerHost('<%=formName%>', '<c:out value="${serverHostInd}"/>', '<%=baseURL + "REMOVE_SERVER_HOST.do" %>')
															</bean:define>
															<bean:define id="addSpanId">
																addSpan_<c:out value="${serverHostInd}"/>
															</bean:define>
															<bean:define id="collapseSpanId">
																collapseSpan_<c:out value="${serverHostInd}"/>
															</bean:define>
															
															<td width="30%"><span class="formLabel"><fmt:message key="configureLineItems.label.serverHosts"/>:&nbsp;</span>
															</td>
															<td nowrap>
																<c:choose>
																<c:when test="${ignoreHostTypes == 'false'}">
																<html:select property="<%=serverSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																	
																	<c:forEach items="${formObj.uiServerHostTypes}" var="type">
																		<bean:define id="valBean">
																			<c:out value="${type.id}"/>
																		</bean:define>
																		<html:option value="<%=valBean%>"><c:out value="${type.name}"/></html:option>     
																	</c:forEach>
																</html:select>
																<logic:equal name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
           															<span id="<c:out value="${serverSpanId}"/>" style="display:none">
																</logic:equal>
																<logic:notEqual name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
																		<span id="<c:out value="${serverSpanId}"/>" style="display:">
																</logic:notEqual>
																	&nbsp; = &nbsp;
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="15" styleClass="form"/>
																</span>
																</c:when>
																<c:otherwise>
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="30" styleClass="form"/>
																</c:otherwise>
																</c:choose>
																
																<html:hidden name="<%=formName%>" property="<%=redundantServer%>"/>
																<c:if test="${allowRedundantServers == 'true'}">
																	<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="false">
																		<span id="<%=addSpanId%>" style="display:"><a href="JavaScript:expandServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/triad-on-white.gif" border="0" align="absmiddle"></a></span>
																		<span id="<%=collapseSpanId%>" style="display:none"><a href="JavaScript:collapseServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a></span>
																	</logic:equal>
																	<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="true">
																		<span id="<%=addSpanId%>" style="display:none"><a href="JavaScript:expandServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/triad-on-white.gif" border="0" align="absmiddle"></a></span>
																		<span id="<%=collapseSpanId%>" style="display:"><a href="JavaScript:collapseServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a></span>
																	</logic:equal>
																</c:if>
															</td>
															<td>
																<logic:notEmpty name="helpMessageKey">
																	<div class="inline-help icon-small icon-main-nav-help">
																	    <div class="inline-help-wrapper">
																	        <div class="inline-help-content">
																	            <p><fmt:message key="<%= helpMessageKey %>"/></p>
																	            <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= propertyName%>');">Learn More</a>
																            </div>
																        </div>
																    </div>			    		
																</logic:notEmpty>
															</td>
															
														</tr>
														
														<bean:define id="serverRowId">
																serverRow_<c:out value="${serverHostInd}"/>_2
														</bean:define>
															<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="true">
																<tr  id="<%=serverRowId%>" style="display:">
															</logic:equal>
															<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="false">
																<tr id="<%=serverRowId%>" style="display:none">
															</logic:equal>
															<bean:define id="serverSelectId">
																serverSelectValue(serverSelect_<c:out value="${serverHostInd}"/>_2)
															</bean:define>
															<bean:define id="serverSpanId">
																serverSpan_<c:out value="${serverHostInd}"/>_2
															</bean:define>
															<bean:define id="serverTextVal">
																serverTextValue(serverText_<c:out value="${serverHostInd}"/>_2)
															</bean:define>
															<bean:define id="onChangeFunction">
																JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${serverSelectId}"/>', '<c:out value="${serverSpanId}"/>')
															</bean:define>
															<td>&nbsp;</td>
															<td nowrap>
																<c:choose>
 																	<c:when test="${ignoreHostTypes == 'false'}">
																<html:select property="<%=serverSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																	
																	<c:forEach items="${formObj.uiServerHostTypes}" var="type">
																		<bean:define id="valBean">
																			<c:out value="${type.id}"/>
																		</bean:define>
																		<html:option value="<%=valBean%>"><c:out value="${type.name}"/></html:option>        
																	</c:forEach>
																</html:select>
																<logic:equal name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
           															<span id="<c:out value="${serverSpanId}"/>" style="display:none">
																</logic:equal>
																<logic:notEqual name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
																		<span id="<c:out value="${serverSpanId}"/>" style="display:">
																</logic:notEqual>
																	&nbsp; = &nbsp;
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="15" styleClass="form"/>
																</span>
																</c:when>
																	<c:otherwise>
																		<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="30" styleClass="form"/>
																	</c:otherwise>
																</c:choose>
															</td>
														</tr>
														
														<bean:define id="serverRowId">
																serverRow_<c:out value="${serverHostInd}"/>_3
														</bean:define>
														<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="true">
																<tr  id="<%=serverRowId%>" style="display:">
														</logic:equal>
														<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="false">
																<tr id="<%=serverRowId%>" style="display:none">
														</logic:equal>
															<bean:define id="serverSelectId">
																serverSelectValue(serverSelect_<c:out value="${serverHostInd}"/>_3)
															</bean:define>
															<bean:define id="serverSpanId">
																serverSpan_<c:out value="${serverHostInd}"/>_3
															</bean:define>
															<bean:define id="serverTextVal">
																serverTextValue(serverText_<c:out value="${serverHostInd}"/>_3)
															</bean:define>
															<bean:define id="onChangeFunction">
																JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${serverSelectId}"/>', '<c:out value="${serverSpanId}"/>')
															</bean:define>
															<td>&nbsp;</td>
															<td nowrap>
																<c:choose>
 																	<c:when test="${ignoreHostTypes == 'false'}">
																<html:select property="<%=serverSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																	
																	<c:forEach items="${formObj.uiServerHostTypes}" var="type">
																		<bean:define id="valBean">
																			<c:out value="${type.id}"/>
																		</bean:define>
																		<html:option value="<%=valBean%>"><c:out value="${type.name}"/></html:option>     
																	</c:forEach>
																</html:select>
																<logic:equal name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
           															<span id="<c:out value="${serverSpanId}"/>" style="display:none">
																</logic:equal>
																<logic:notEqual name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
																		<span id="<c:out value="${serverSpanId}"/>" style="display:">
																</logic:notEqual>
																	&nbsp; = &nbsp;
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="15" styleClass="form"/>
																</span>
																</c:when>
																<c:otherwise>
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="30" styleClass="form"/>
																</c:otherwise>
															</c:choose>	
															</td>
														</tr>
													</table>
												</td>
											</tr>
											
										</table>
									</td>
								</tr>
							</table>		
						</td>
						<c:choose>
						<c:when test="${onlyOneServerAllowed == 'false'}">
							<td width="2" align="left" valign="top"><a href="<%=removeServerFunction%>"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a></td>
						</c:when>
						<c:otherwise>
							<td width="2" align="left" valign="top"></td>
						</c:otherwise>
						</c:choose>
					</tr>
					</c:forEach>
				</table>
			</td>
			<td></td>
		</tr>
	</c:when>
	<c:when test="${showNodeLockedHosts == 'true'}">
		<tr>
			<td>
				<c:choose>
				<c:when test="${showHostsTableYN == 'yes'}">
					<table id="ServerHostsTable" class="GroupBox" cellspacing="0" cellpadding="7" style="display:">
				</c:when>
				<c:otherwise>
					<table id="ServerHostsTable" class="GroupBox" cellspacing="0" cellpadding="7" style="display:none">
				</c:otherwise>
				</c:choose>
					<c:if test="${'1'=='2'}">
					<tr>
						<td><span class="formLabel"><fmt:message key="configureLineItems.label.nodelockedHosts"/></span></td>
						<td valign="top" align="left">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="butLabelLeftNEW"></td>
									<td class="butLabelWedgeNEW"></td>
									<td class="button_bkgrd1NEW" nowrap><a class="butLabelNEW" href="<%=addFunction%>" id="BAConfigHosts_AddServerHost">
							            							<fmt:message key="configureLineItems.label.addNodelockedhost"/>
							            						</a>
									</td>
									<td class="butLabelWedgeNEW"></td><td class="butLabelRightNEW"></td>
								</tr>
							</table>
						</td>
					</tr>
					</c:if>
					<tr>
						<td colspan="2" valign="top" width="100%">
							<table cellpadding="6" cellspacing="0" id="ServerIdTable" >
								<tr>
									<td valign="top">
										<table cellpadding="0" cellspacing="0" width="100%">
											<tr>
												<td>
													<table cellpadding="0" cellspacing="0" width="100%">
														<c:forEach items="${formObj.nodeLockedHostIds}" var="serverHost" varStatus="nodeLockedHostStatus">
															<c:set var="nodeLockedHostInd" value="${nodeLockedHostStatus.index + 1}"/>
															<tr>
																<bean:define id="nodeLockedSelectId">
																	nodeLockedSelectValue(nodeLockedSelect_<c:out value="${nodeLockedHostInd}"/>)
																</bean:define>
																<c:set var="selectVal"><%= nodeLockedSelectId %></c:set>
																
																<bean:define id="nodeLockedSpanId">
																	nodeLockedSpan(nodeLockedSpan_<c:out value="${nodeLockedHostInd}"/>)
																</bean:define>
																<bean:define id="nodeLockedTextVal">
																	nodeLockedTextValue(nodeLockedText_<c:out value="${nodeLockedHostInd}"/>)
																</bean:define>
																<bean:define id="onChangeFunction">
																	JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${nodeLockedSelectId}"/>', '<c:out value="${nodeLockedSpanId}"/>')
																</bean:define>
																<bean:define id="removeServerFunction">
																	JavaScript:removeServerHost('<%=formName%>', '<c:out value="${nodeLockedHostInd}"/>', '<%=baseURL + "REMOVE_NODELOCKED_HOST.do"%>')
																</bean:define>
																<td width="30%"><span class="formLabel"><fmt:message key="configureLineItems.label.nodelockedHosts"/>:&nbsp;</span>
																</td>
																<td nowrap>
																	<c:choose>
 																		<c:when test="${ignoreHostTypes == 'false'}">
																	<html:select property="<%=nodeLockedSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																		
																		<c:forEach items="${formObj.uiNodeLockedHostTypes}" var="type">
																		<bean:define id="valBean">
																			<c:out value="${type.id}"/>
																		</bean:define>
																		<html:option value="<%=valBean%>"><c:out value="${type.name}"/></html:option>       
																	</c:forEach>
																	</html:select>
																	<c:choose>
																		<c:when test="${selectVal == 'DEMO' || selectVal == 'ANY'}">
																			<span id="<%=nodeLockedSpanId%>" style="display:none">
																			<span id="vdhSpanId" style="display:none">
																		</c:when>
																		<c:otherwise>
																			<span id="<%=nodeLockedSpanId%>" style="display:">
																			<c:choose>
																					<c:when test="${selectVal == 'VENDOR_DEFINED' || selectVal == 'VENDOR DEFINED'}">
																						<span id="vdhSpanId" style="display:">
																					</c:when>
																					<c:otherwise>
																						<span id="vdhSpanId" style="display:none">
																					</c:otherwise>
																				</c:choose>
																				&nbsp;VDH
																			</span>
																		</c:otherwise>
																	</c:choose>
																		 &nbsp; = &nbsp;
																		 <html:text name="<%=formName%>" property="<%=nodeLockedTextVal%>" size="15" styleClass="form"/>
																	</span>
																	</c:when>
																	<c:otherwise>
																		<html:text name="<%=formName%>" property="<%=nodeLockedTextVal%>" size="30" styleClass="form"/>
																	</c:otherwise>
																	</c:choose>
																	<c:if test="${'1'=='2'}">
																	<a href="<%=removeServerFunction%>"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a>
																	</c:if>
																</td>
																<td>
																	<logic:notEmpty name="helpMessageKey">
																		<div class="inline-help icon-small icon-main-nav-help">
																		    <div class="inline-help-wrapper">
																		        <div class="inline-help-content">
																		            <p><fmt:message key="<%= helpMessageKey %>"/></p>
																		            <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= propertyName%>');">Learn More</a>
																	            </div>
																	        </div>
																	    </div>			    		
																	</logic:notEmpty>
																</td>
																
															</tr>
														</c:forEach>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
			<td></td>
		</tr>
	</c:when>
	<c:otherwise>
		<tr>
			<td>
				<c:choose>
				<c:when test="${showHostsTableYN == 'yes'}">
					<table id="ServerHostsTable"  cellspacing="0" cellpadding="7" style="display:">
				</c:when>
				<c:otherwise>
					<table id="ServerHostsTable"  cellspacing="0" cellpadding="7" style="display:none">
				</c:otherwise>
				</c:choose>
					<tr>
						<td valign="top" align="left">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td><span class="formLabel"><fmt:message key="configureLineItems.label.serverHosts"/>&nbsp;&nbsp;</span></td>
									<td class="butLabelLeftNEW"></td>
									<td class="butLabelWedgeNEW"></td>
									<td class="button_bkgrd1NEW" nowrap><a class="butLabelNEW" href="<%=addFunction%>" id="BAConfigHosts_AddServerHost">
							            							<fmt:message key="configureLineItems.label.addServerhost"/>
							            						</a>
									</td>
									<td class="butLabelWedgeNEW"></td>
									<td class="butLabelRightNEW"></td>
								</tr>
							</table>
						</td>
						<td></td>
					</tr>
					<c:forEach items="${formObj.serverHostIds}" var="serverHost" varStatus="serverHostStatus">
						<c:set var="serverHostInd" value="${serverHostStatus.index + 1}"/>
						<bean:define id="tableclass">
							<c:choose>
								<c:when test="${serverHostInd % 2 == 0}">TableWithShadedBackground</c:when>
								<c:otherwise>TableWithWhiteBackground</c:otherwise>
							</c:choose>
						</bean:define>
					<tr>
						<td>
							<table cellpadding="6" cellspacing="0" id="TableWithServer" class="TRTableBorder">
								<tr class="TRTableBorderBottom">
									<td valign="top">
										<table cellpadding="0" cellspacing="0" width="100%" class="<%= tableclass %>">
											<tr>
												<td>
													<table cellpadding="0" cellspacing="0" width="100%">
														<tr>
															<bean:define id="serverSelectId">
																serverSelectValue(serverSelect_<c:out value="${serverHostInd}"/>_1)
															</bean:define>
															<bean:define id="serverSpanId">
																serverSpan_<c:out value="${serverHostInd}"/>_1
															</bean:define>
															<bean:define id="serverTextVal">
																serverTextValue(serverText_<c:out value="${serverHostInd}"/>_1)
															</bean:define>
															<bean:define id="onChangeFunction">
																JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${serverSelectId}"/>', '<c:out value="${serverSpanId}"/>')
															</bean:define>
															<bean:define id="redundantServer">
																redundantServerValue(redundantServer_<c:out value="${serverHostInd}"/>_1)
															</bean:define>
															<bean:define id="removeServerFunction">
																JavaScript:removeServerHost('<%=formName%>', '<c:out value="${serverHostInd}"/>', '<%=baseURL + "REMOVE_SERVER_HOST.do" %>')
															</bean:define>
															<bean:define id="addSpanId">
																addSpan_<c:out value="${serverHostInd}"/>
															</bean:define>
															<bean:define id="collapseSpanId">
																collapseSpan_<c:out value="${serverHostInd}"/>
															</bean:define>
															<td width="30%"><span class="formLabel"><fmt:message key="configureLineItems.label.serverHosts"/>&nbsp;</span></td>
															<td nowrap>
																<html:select property="<%=serverSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																	
																	<c:forEach items="${formObj.uiServerHostTypes}" var="type">
																		<bean:define id="valBean">
																			<c:out value="${type}"/>
																		</bean:define>
																		<html:option value="<%=valBean%>"><fmt:message key="${type}"/></html:option>     
																	</c:forEach>
																</html:select>
																<logic:equal name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
           															<span id="<c:out value="${serverSpanId}"/>" style="display:none">
																</logic:equal>
																<logic:notEqual name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
																		<span id="<c:out value="${serverSpanId}"/>" style="display:">
																</logic:notEqual>
																	&nbsp; = &nbsp;
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="15" styleClass="form"/>
																</span>
																<html:hidden name="<%=formName%>" property="<%=redundantServer%>"/>
																<c:if test="${allowRedundantServers == 'true'}">
																	<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="false">
																		<span id="<%=addSpanId%>" style="display:"><a href="JavaScript:expandServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/triad-on-white.gif" border="0" align="absmiddle"></a></span>
																		<span id="<%=collapseSpanId%>" style="display:none"><a href="JavaScript:collapseServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a></span>
																	</logic:equal>
																	<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="true">
																		<span id="<%=addSpanId%>" style="display:none"><a href="JavaScript:expandServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/triad-on-white.gif" border="0" align="absmiddle"></a></span>
																		<span id="<%=collapseSpanId%>" style="display:"><a href="JavaScript:collapseServer('<%= formName %>', '<c:out value="${serverHostInd}"/>')"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a></span>
																	</logic:equal>
																</c:if>
															</td>
															<td>
																<logic:notEmpty name="helpMessageKey">
																	<div class="inline-help icon-small icon-main-nav-help">
																	    <div class="inline-help-wrapper">
																	        <div class="inline-help-content">
																	            <p><fmt:message key="<%= helpMessageKey %>"/></p>
																	            <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= propertyName%>');">Learn More</a>
																            </div>
																        </div>
																    </div>			    		
																</logic:notEmpty>
															</td>
															
														</tr>
														
														<bean:define id="serverRowId">
															serverRow_<c:out value="${serverHostInd}"/>_2
														</bean:define>
														<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="true">
														<tr  id="<%=serverRowId%>" style="display:">
														</logic:equal>
														<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="false">
														<tr id="<%=serverRowId%>" style="display:none">
														</logic:equal>
														<bean:define id="serverSelectId">
															serverSelectValue(serverSelect_<c:out value="${serverHostInd}"/>_2)
														</bean:define>
														<bean:define id="serverSpanId">
															serverSpan_<c:out value="${serverHostInd}"/>_2
														</bean:define>
														<bean:define id="serverTextVal">
															serverTextValue(serverText_<c:out value="${serverHostInd}"/>_2)
														</bean:define>
														<bean:define id="onChangeFunction">
															JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${serverSelectId}"/>', '<c:out value="${serverSpanId}"/>')
														</bean:define>
															<td>&nbsp;</td>
															<td nowrap>
																<html:select property="<%=serverSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																	
																	<c:forEach items="${formObj.uiServerHostTypes}" var="type">
																		<bean:define id="valBean">
																			<c:out value="${type}"/>
																		</bean:define>
																		<html:option value="<%=valBean%>"><fmt:message key="${type}"/></html:option>        
																	</c:forEach>
																</html:select>
																<logic:equal name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
           															<span id="<c:out value="${serverSpanId}"/>" style="display:none">
																</logic:equal>
																<logic:notEqual name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
																		<span id="<c:out value="${serverSpanId}"/>" style="display:">
																</logic:notEqual>
																	&nbsp; = &nbsp;
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="15" styleClass="form"/>
																</span>
															</td>
															<td>
																<logic:notEmpty name="helpMessageKey">
																	<div class="inline-help icon-small icon-main-nav-help">
																	    <div class="inline-help-wrapper">
																	        <div class="inline-help-content">
																	            <p><fmt:message key="<%= helpMessageKey %>"/></p>
																	            <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= propertyName%>');">Learn More</a>
																            </div>
																        </div>
																    </div>			    		
																</logic:notEmpty>
															</td>
															
														</tr>
														
														<bean:define id="serverRowId">
															serverRow_<c:out value="${serverHostInd}"/>_3
														</bean:define>
														<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="true">
														<tr  id="<%=serverRowId%>" style="display:">
														</logic:equal>
														<logic:equal name="<%=formName%>" property="<%=redundantServer%>" value="false">
														<tr id="<%=serverRowId%>" style="display:none">
														</logic:equal>
														<bean:define id="serverSelectId">
															serverSelectValue(serverSelect_<c:out value="${serverHostInd}"/>_3)
														</bean:define>
														<bean:define id="serverSpanId">
															serverSpan_<c:out value="${serverHostInd}"/>_3
														</bean:define>
														<bean:define id="serverTextVal">
															serverTextValue(serverText_<c:out value="${serverHostInd}"/>_3)
														</bean:define>
														<bean:define id="onChangeFunction">
															JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${serverSelectId}"/>', '<c:out value="${serverSpanId}"/>')
														</bean:define>
															<td>&nbsp;</td>
															<td nowrap>
																<html:select property="<%=serverSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																	
																	<c:forEach items="${formObj.uiServerHostTypes}" var="type">
																		<bean:define id="valBean">
																			<c:out value="${type}"/>
																		</bean:define>
																		<html:option value="<%=valBean%>"><fmt:message key="${type}"/></html:option>     
																	</c:forEach>
																</html:select>
																<logic:equal name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
           															<span id="<c:out value="${serverSpanId}"/>" style="display:none">
																</logic:equal>
																<logic:notEqual name="<%=formName%>" property="<%=serverSelectId%>" value="ANY">
																		<span id="<c:out value="${serverSpanId}"/>" style="display:">
																</logic:notEqual>
																	&nbsp; = &nbsp;
																	<html:text name="<%=formName%>" property="<%=serverTextVal%>" size="15" styleClass="form"/>
																</span>
															</td>
															<td>
																<logic:notEmpty name="helpMessageKey">
																	<div class="inline-help icon-small icon-main-nav-help">
																	    <div class="inline-help-wrapper">
																	        <div class="inline-help-content">
																	            <p><fmt:message key="<%= helpMessageKey %>"/></p>
																	            <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= propertyName%>');">Learn More</a>
																            </div>
																        </div>
																    </div>			    		
																</logic:notEmpty>
															</td>
															
														</tr>
													</table>
												</td>
											</tr>
												
											<tr>
												<td valign="top">
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td>
																<table border="0" cellspacing="5" cellpadding="0">
																	<tr>
																		<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="formLabel">Nodelocked Hosts</span></td>
																		<td align="right">
																			<table border="0" cellspacing="0" cellpadding="0">
																				<tr>
																					<bean:define id="addNLCountedHost">
																						JavaScript:addNLCountedHost('<%=formName%>', '<c:out value="${serverHostInd}"/>', '<%=baseURL + "ADD_NL_HOST_NLCOUNTED_MODEL.do"%>')
																					</bean:define>
																					<td class="butLabelLeftNEW"></td>
																					<td class="butLabelWedgeNEW"></td>
																					<td class="button_bkgrd1NEW"><a class="butLabel" href="<%=addNLCountedHost%>">Add Host</a></td>
																					<td class="butLabelWedgeNEW"></td>
																					<td class="butLabelRightNEW"></td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
														<tr>
															<td>	
																<table border="0" id="ServerHost_1_hostIdTable" >
																	<tr>
																		<td width="20">&nbsp;</td>
																		<td>
																			<table cellpadding="0" cellspacing="0" width="100%">
																				<c:forEach items="${serverHost.nodeLockedHostIds}" var="serverHost" varStatus="nodeLockedHostStatus">
																					<c:set var="nodeLockedHostInd" value="${nodeLockedHostStatus.index + 1}"/>
																					<tr>
																						<bean:define id="nodeLockedSelectId">
																							nodeLockedCountedSelectValue(nodeLockedCountedSelect_<c:out value="${serverHostInd}"/>_<c:out value="${nodeLockedHostInd}"/>)
																						</bean:define>
																						<c:set var="selectVal"><%= nodeLockedSelectId %></c:set>
																						<bean:define id="nodeLockedSpanId">
																							nodeLockedCountedSpan(nodeLockedCountedSpan_<c:out value="${serverHostInd}"/>_<c:out value="${nodeLockedHostInd}"/>)
																						</bean:define>
																						<bean:define id="nodeLockedTextVal">
																							nodeLockedCountedTextValue(nodeLockedText_<c:out value="${serverHostInd}"/>_<c:out value="${nodeLockedHostInd}"/>)
																						</bean:define>
																						<bean:define id="onChangeFunction">
																							JavaScript:changeServerHostType('<%=formName%>', '<c:out value="${nodeLockedSelectId}"/>', '<c:out value="${nodeLockedSpanId}"/>')
																						</bean:define>
																						<bean:define id="removeServerFunction">
																							JavaScript:removeCountedNodeLockedHost('<%=formName%>', <c:out value="${serverHostInd}"/>, '<c:out value="${nodeLockedHostInd}"/>', '<%=baseURL + "REMOVE_NL_HOST_FOR_NLCOUNTED_MODEL.do"%>')
																						</bean:define>
																						<td>
																							<html:select property="<%=nodeLockedSelectId%>" onchange="<%=onChangeFunction%>" styleClass="form">
																								
																									<c:forEach items="${formObj.uiNodeLockedHostTypes}" var="type">
																										<bean:define id="valBean">
																											<c:out value="${type}"/>
																										</bean:define>
																										<html:option value="<%=valBean%>"><fmt:message key="${type}"/></html:option>       
																									</c:forEach>
																							</html:select>
																							<c:choose>
																								<c:when test="${selectVal == 'DEMO' || selectVal == 'ANY'}">
																									<span id="<%=nodeLockedSpanId%>" style="display:none">
																								</c:when>
																								<c:otherwise>
																									<span id="<%=nodeLockedSpanId%>" style="display:">
																								</c:otherwise>
																							</c:choose>
																		 						&nbsp; = &nbsp;
																								 <html:text name="<%=formName%>" property="<%=nodeLockedTextVal%>" size="15" styleClass="form"/>
																									</span>
																							<a href="<%=removeServerFunction%>"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a>
																						</td>
																						<td>
																							<logic:notEmpty name="helpMessageKey">
																								<div class="inline-help icon-small icon-main-nav-help">
																								    <div class="inline-help-wrapper">
																								        <div class="inline-help-content">
																								            <p><fmt:message key="<%= helpMessageKey %>"/></p>
																								            <a tabindex="-1" class="contextual-help" href="javascript:showHelpForField('<c:url value="${helpPathForField}"/>', '<%= propertyName%>');">Learn More</a>
																							            </div>
																							        </div>
																							    </div>			    		
																							</logic:notEmpty>
																						</td>
																						
																					</tr>
																				</c:forEach>
																			</table>
																		</td>
																	</tr>
																	
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
									<td width="2" align="left" valign="top"></td>
								</tr>
							</table>		
						</td>
						<td width="2" align="left" valign="top"><a href="<%=removeServerFunction%>"><img src="${appContextPath}/resources/operations/delete16.gif" border="0" align="absmiddle"></a></td>
					</tr>
					</c:forEach>
				</table>
			</td>
			<td></td>
		</tr>
	</c:otherwise>
</c:choose>