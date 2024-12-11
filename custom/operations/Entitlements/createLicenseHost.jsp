<%@page pageEncoding="UTF-8"%>


<!DOCTYPE html>

<script>

$(document).ready(function(){
	$('#spinner', window.parent.document).hide();
});

if($(".MessageBlock")[0])
{
$('.MessageSection').addClass('msg msg-is-error');
}
	function main() {
	     window.focus();
	     hideNlHostsTextBoxes();
	     <logic:equal name="CreateLicenseHostForm" property="savedNewlyCreatedHost" value="true">
	 		var redirectUrl = '<bean:write name="CreateLicenseHostForm" property="targetAction"/>';
	 		var openerFormName = '<bean:write name="CreateLicenseHostForm" property="parentFormName"/>';
	 		$('#modal-shade', window.parent.document).hide();
	 		var form = window.parent.document.forms[openerFormName];
	 		form.action = redirectUrl;
				form.target="_self";
				form.submit();
	 	    window.close();
	    </logic:equal>
	    
	    /* Spirent, 20110209 - This section added to support adding of 'VDH' keyword to
		 * hostid string when using VENDOR DEFINED host id type.  This only works for
		 * first host id 
		 */
		/*
		var nodetype = document.getElementById("nodeLockedSelectValue(nodeLockedSelect_1)");
		*/
		var nodetype = document.getElementsByName("nodeLockedSelectValue(nodeLockedSelect_1)").item(0);
		var vdhSpanBox = document.getElementById("vdhSpanId");
		if (nodetype && vdhSpanBox) {
			if (nodetype.value == 'VENDOR_DEFINED') {
				vdhSpanBox.style.display = "";
			} else {
				vdhSpanBox.style.display = "none";
			}
		}
		/* Spirent, 20110313 - Updated to remove the VDH= from the field if the validation
		 * fails
		 */
		/*
		var nodeval = document.getElementById("nodeLockedTextValue(nodeLockedText_1)");
		*/
		var nodeval = document.getElementsByName("nodeLockedTextValue(nodeLockedText_1)").item(0);
		if (nodeval) {
			var strval = nodeval.value;
			if (strval.substr(0,4) == 'VDH=') {
				nodeval.value = strval.substr(4,strval.length-4);
			}
		}
	    
	}  
  
	function handleClose()
	{
		 $('#modal-shade', window.parent.document).hide();
	}
	function handleOK(selectOneItemMsg)
	{
	
	/* Spirent, 20110209 - This section added to support adding of 'VDH' keyword to
	 * hostid string when using VENDOR DEFINED host id type.  This only works for
	 * first host id 
	 */
	var nodeval = document.getElementsByName("nodeLockedTextValue(nodeLockedText_1)").item(0);
	var nodetype = document.getElementsByName("nodeLockedSelectValue(nodeLockedSelect_1)").item(0);

	/* This only works in IE since the ID is not set in the JSP
	var nodeval = document.getElementById("nodeLockedTextValue(nodeLockedText_1)");
	var nodetype = document.getElementById("nodeLockedSelectValue(nodeLockedSelect_1)");
	 */

	if (nodeval && nodetype) {
		if (nodetype.value == 'VENDOR_DEFINED') {
			var strval = "VDH=" + nodeval.value;
			nodeval.value = strval.toUpperCase();
		}
	}
	/*This only works in IE since the ID is not set in the JSP
	var servertype = document.getElementById("serverSelectValue(serverSelect_1_1)");
	var serverval = document.getElementById("serverTextValue(serverText_1_1)");
	*/
	var servertype = document.getElementsByName("serverSelectValue(serverSelect_1_1)").item(0);
	var serverval = document.getElementsByName("serverTextValue(serverText_1_1)").item(0);
	if (serverval && servertype) {
		if (servertype.value == 'FLEXID') {
			var strval = serverval.value;
			serverval.value = strval.toUpperCase();
		}
	}
	/* Spirent End */
	
		var form = document.CreateLicenseHostForm;
		form.action = 'createLicenseHost_CREATE.do';
		form.target="_self";
		form.submit();
	}
	function simpleSearch(formId, baseAction)
	{
	    form = eval("document." + formId);
	    submitForm(formId, baseAction);
	}
	function clearSimpleSearch(formId)
	{
	        form = eval("document." + formId);
	        form.searchPhrase.value = "";
	}  

</script>
<div id="popupcontent">
  <BR>
  
<fno:form action="createLicenseHost_VIEW.do" method="POST">
<html:hidden name="CreateLicenseHostForm" property="parentFormName"/>
<html:hidden name="CreateLicenseHostForm" property="targetAction"/>
<html:hidden name="CreateLicenseHostForm" property="isServerType"/>
<html:hidden name="CreateLicenseHostForm" property="lineItemId"/>
<html:hidden name="CreateLicenseHostForm" property="fulfillmentId"/>
<html:hidden name="CreateLicenseHostForm" property="overrideSoldTo"/>
<html:hidden name="CreateLicenseHostForm" property="overrideOwner"/>
<html:hidden name="CreateLicenseHostForm" property="ignoreHostTypes"/>

<table width="95%" border="0" cellpadding="0" cellspacing="0" align="center">
	<logic:equal name="CreateLicenseHostForm" property="isServerType" value="true">
		<tiles:insert page="/operations/Entitlements/ServerHostTile.jsp">
  			<tiles:put name="formName" value="CreateLicenseHostForm"/>
   			<tiles:put name="showServerHosts" value="true"/>
   			<tiles:put name="showNodeLockedHosts" value="false"/>
   			<tiles:put name="allowRedundantServers" beanName="CreateLicenseHostForm" beanProperty="showRedundant"/>
   			<tiles:put name="showHostsTableYN" value="yes"/>
   			<tiles:put name="baseURL" value="createLicenseHost_"/>
   			<tiles:put name="ignoreHostTypes" beanName="CreateLicenseHostForm" beanProperty="ignoreHostTypes"/>
			<tiles:put name="propertyName" value="serverHost"/>
			<tiles:put name="helpMessageKey" value="CreateLicenseHost.help.serverHost"/>
   		</tiles:insert>
   	</logic:equal>
   	<logic:equal name="CreateLicenseHostForm" property="isServerType" value="false">
		<tiles:insert page="/operations/Entitlements/ServerHostTile.jsp">
  			<tiles:put name="formName" value="CreateLicenseHostForm"/>
   			<tiles:put name="showServerHosts" value="false"/>
   			<tiles:put name="showNodeLockedHosts" value="true"/>
   			<tiles:put name="showHostsTableYN" value="yes"/>
   			<tiles:put name="baseURL" value="createLicenseHost_"/>
   			<tiles:put name="ignoreHostTypes" beanName="CreateLicenseHostForm" beanProperty="ignoreHostTypes"/>
			<tiles:put name="propertyName" value="nodeLockedHost"/>
			<tiles:put name="helpMessageKey" value="CreateLicenseHost.help.nodeLockedHost"/>
   		</tiles:insert>
   	</logic:equal>
</table>
<BR>

</fno:form>



  <div class="modal-actions">

	<c:set var="OKBtnUrl">JavaScript:handleOK('<fmt:message
			key="operations.alert.selectOneItem" />')</c:set>
	<a class="btn md default" id="SelectOrg_OK"
		href="${OKBtnUrl}"> <bean:message key="selectDialog.button.ok" />
	</a>
	<a class="btn md light cancel" id="SelectOrg_Cancel"
		href="JavaScript:handleClose()"> <bean:message
			key="selectDialog.button.cancel" />
	</a>

</div>


</div>
