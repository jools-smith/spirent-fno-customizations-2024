<!DOCTYPE html> 
<%@page pageEncoding="UTF-8"%>

<%@ page import="com.flexnet.operations.web.beans.PortalStateBean"%>
<c:set var="portalStateBean"> <%=PortalStateBean.PORTAL_STATE_BEAN_ID%> </c:set>
<%--  fmt:setBundle basename="${moduleResources['operationsportal']}" scope="request" --%>
<c:set var="portalCustomizerBean" value="${sessionScope[portalStateBean].customizerBean}" />

<html>
<head>
    <title><fmt:message key="operationsportal.logon.title"/></title>
    <%@ include file="layout/firstInHead.jsp" %>
    <%@ include file="layout/commonCSSFiles.jsp" %>
    <%@ include file="layout/commonJavascriptFiles.jsp" %>
    <%@ include file="layout/lastInHead.jsp" %>
</head>
<body id="simple">
    <div id="wrapper">
        <div id="floater" class="clearfix"></div>
        <div class="loginWrapper compact clearfix">
            <div class="login" style="width: 200%;">
                <h1 style="margin-left: -52px;"></h1>
                 <%-- DR: Spirent Jul 11, 2018 Start Custom Entitlement Login Page--%>
                <div style="width: 50%; float: left;">
					<fmt:message key="logonPage.entitlementId.instruction"/>
				</div>
				<div style="width: 50%; float: right;">
				<%-- DR: Spirent Jul 11, 2018 End--%>
                <fno:form action='logon.do' method="post"  autocomplete="off" >
                    <input type="hidden" name="action" value="entitlementlogon">

                    <%-- This parameter is added for the profile action. If the user edits the rofile and click save button it should go back to portal start page. --%>
                    <input type="hidden" name="startingtab" value="operationsportal.products.tab">
                    <%--  <c:set var="languageNames" value="${requestScope['ops.supportedLocales.list']}" />  --%>

                    <fieldset>
                        <h2>
                            <fmt:message key="logonPage.title" />
                            <logic:equal name="appMode" value="publisher">
                                <fmt:message key="logon.publisher.caption"/>
                            </logic:equal>  
                            <logic:equal name="appMode" value="manager">
                                <fmt:message key="logon.manager.caption"/>
                            </logic:equal>
                        </h2>
                        <c:set var="loginOptions" value="${0}" />
                        <c:if test="${!portalCustomizerBean.hideLoginByUserIdLink}">
                            <c:set var="loginOptions" value="${loginOptions + 1}" />
                        </c:if>
                        <c:if test="${!portalCustomizerBean.hideLoginByEntitlementIDLink}">
                            <c:set var="loginOptions" value="${loginOptions + 1}" />
                        </c:if>
                        <c:if test="${!portalCustomizerBean.hideLoginByActivationIDLink}">
                            <c:set var="loginOptions" value="${loginOptions + 1}" />
                        </c:if>
                        <c:if test="${loginOptions > 1}">
                            <ul class="login-method clearfix">
                                <c:if test="${!portalCustomizerBean.hideLoginByUserIdLink}">
                                    <li><input class="radio" type=radio id="withUser" onClick="javascript:openTopWindow('/flexnet/operationsportal/showUserLogon.do')"> <label for="withUser"><fmt:message key="logonPage.withUser" /></label></li>
                                </c:if>
                                <c:if test="${!portalCustomizerBean.hideLoginByEntitlementIDLink}">
                                    <li><input class="radio" type="radio" id="withEntitlementId" checked onClick="javascript:openTopWindow('/flexnet/operationsportal/showEntitlementLogon.do')"> <label for="forEntitlementId"><fmt:message key="logonPage.withEntitlementId" /></label></li>
                                </c:if>
                                <c:if test="${!portalCustomizerBean.hideLoginByActivationIDLink}">
                                    <li><input class="radio" type="radio" id="withActivationId" onClick="javascript:openTopWindow('/flexnet/operationsportal/showActivationIdLogon.do')"> <label for="withActivationId"><fmt:message key="logonPage.withActivationId" /></label></li>
                                </c:if>
                            </ul>
                        </c:if>
                        <%-- Special "errors" tag for displaying any errors present --%>
                        <html:errors/>
                        <ol>
                            <li>
                                <label for="entitlementIdInput" class="visuallyhidden"><fmt:message key="logonPage.entitlementId" /></label>
                                <input tabindex="1" id="entitlementIdInput" class="text" type="text" maxlength="100" name="username" value="" placeholder="<fmt:message key="logonPage.entitlementId" />">
                            </li>
							<%@ include file="languageOptions.jsp" %>        
                            <li class="last">
                                <c:if test="${!portalCustomizerBean.hideSelfRegistrationLink}">
                                    <a tabindex="-1" class="support-link" href="/flexnet/operationsportal/showSelfRegisterUserPage.do"><fmt:message key="logonPage.selfRegister" /></a>
                                </c:if>
                                <html:submit styleClass="btn md default" tabindex="5"><fmt:message key="logonPage.button.login" /></html:submit>
                            </li>
                        </ol>
                    </fieldset>
                </fno:form>
                </div>
                 <%-- DR: Spirent Jul 11, 2018: closing DIV --%>
            </div>
        </div>
        <script>
            $(document).ready(function() {
                $('#username').focus();
            });
        </script>
        <!--[if lte IE 9]>
            <script>
                $('.login label').removeClass('visuallyhidden');
            </script>
        <![endif]-->
        <div id="page-footer-nudge"></div>
    </div>
    <div>
        <footer id="page-footer" class="short">
            <c:choose>
	            <c:when test='${not empty sessionScope[portalStateBean].footer}'>
	                <c:out value="${sessionScope[portalStateBean].footer}" escapeXml="false" />
	            </c:when>
                <c:otherwise>        
                   <div id="page-footer-content">
                       <div class="page-footer-copyright">
                           <c:set var="flexeraCopyright">
                              <fmt:message key='operationsPortalLayout.Footer.Copyright' />
                           </c:set>
                           <c:if test="${not empty flexeraCopyright}">
                              <div>
                                 &copy; <script>var d=new Date();yr=d.getFullYear();document.write(yr);</script> <c:out value="${flexeraCopyright}" />
                              	 <a href="http://www.flexerasoftware.com/company/about/privacy-legal.htm">Data Privacy</a>
                              </div>
                           </c:if>
                       </div>
                   </div>
                </c:otherwise>
            </c:choose>
        </footer>
    </div>
    <%@ include file="layout/lastInBody.jsp" %>
</body>
</html>