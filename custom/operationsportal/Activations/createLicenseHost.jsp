<%@page pageEncoding="UTF-8"%>

<script>
$(document).ready(function(){
	$('#spinner', window.parent.document).hide();
});
  function main(){
    window.focus();
    hideNlHostsTextBoxes();
    <logic:equal name="CreateLicenseHostForm" property="savedNewlyCreatedHost" value="true">
    var redirectUrl = '<bean:write name="CreateLicenseHostForm" property="targetAction"/>';
    var openerFormName = '<bean:write name="CreateLicenseHostForm" property="parentFormName"/>';
    $('#modal-shade', window.parent.document).hide();
    var form = window.parent.document.forms[openerFormName];
    form.action = redirectUrl;
    form.target = "_self";
    form.submit();
    window.close();
    </logic:equal>
    
    		/* Spirent, 20110124 - This section added to support adding of 'VDH' keyword to
		 * hostid string when using VENDOR DEFINED host id type.  This only works for
		 * first host id 
		 */
		/* Spirent, 20110429 - Applied fix, so the VDH enhancement now works in both IE and Firefox
		*
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
		/* Spirent, 20110429 - Applied fix, so the VDH enhancement now works in both IE and Firefox
		*
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

  function handleClose(){
    var form = document.CreateLicenseHostForm;
    var unifiedHostId = form.unifiedHostId.value;
    if (unifiedHostId != '') {
      var message = '<fmt:message key="operationsportal.warning.cancel"/>';
      var cancelYN = confirm(message);
      if (cancelYN == true) {
        form.action = "unifiedHost_view.action?unifiedHost.id=" + unifiedHostId;
        form.submit();
      }
      return;
    }
 //   window.close();
    $('#modal-shade', window.parent.document).hide();
  }

  function handleOK(selectOneItemMsg){
  
  	/* Spirent, 20110124 - This section added to support adding of 'VDH' keyword to
	 * hostid string when using VENDOR DEFINED host id type.  This only works for
	 * first host id 
	 */
	/* Spirent, 20110429 - Applied fix, so the VDH enhancement now works in both IE and Firefox
	*
	var nodeval = document.getElementById("nodeLockedTextValue(nodeLockedText_1)");
	var nodetype = document.getElementById("nodeLockedSelectValue(nodeLockedSelect_1)");
	*/
	var nodeval = document.getElementsByName("nodeLockedTextValue(nodeLockedText_1)").item(0);
	var nodetype = document.getElementsByName("nodeLockedSelectValue(nodeLockedSelect_1)").item(0);
	if (nodeval && nodetype) {
		if (nodetype.value == 'VENDOR_DEFINED') {
			var strval = "VDH=" + nodeval.value;
			nodeval.value = strval.toUpperCase();
		}
	}
	/* Spirent, 20110429 - Applied fix, so the VDH enhancement now works in both IE and Firefox
	*
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
    form.target = "_self";
    form.submit();
  }

  function simpleSearch(formId, baseAction){
    form = eval("document." + formId);
    submitForm(formId, baseAction);
  }

  function clearSimpleSearch(formId){
    form = eval("document." + formId);
    form.searchPhrase.value = "";
  }
</script>
<fno:pageHeader pageTitle="${pageTitle}" contentKey="CreateHostContent" />
<fno:form action="createLicenseHost_VIEW.do" method="POST">
	<html:hidden name="CreateLicenseHostForm" property="parentFormName" />
	<html:hidden name="CreateLicenseHostForm" property="targetAction" />
	<html:hidden name="CreateLicenseHostForm" property="isServerType" />
	<html:hidden name="CreateLicenseHostForm" property="lineItemId" />
	<html:hidden name="CreateLicenseHostForm" property="fulfillmentId" />
	<html:hidden name="CreateLicenseHostForm" property="overrideSoldTo" />
	<html:hidden name="CreateLicenseHostForm" property="overrideOwner" />
	<html:hidden name="CreateLicenseHostForm"
		property="ignoreHostTypes" />
	<html:hidden name="CreateLicenseHostForm" property="unifiedHostId" />

	<%-- Use a simple table to display license server --%>
	<div class="EditingBlock">
		<div class="WideColumnBlock left">
			<logic:equal name="CreateLicenseHostForm" property="isServerType" value="true">
				<tiles:insert
					page="/operationsportal/Activations/ServerHostTile.jsp">
					<tiles:put name="formName" value="CreateLicenseHostForm" />
					<tiles:put name="showServerHosts" value="true" />
					<tiles:put name="showNodeLockedHosts" value="false" />
					<tiles:put name="allowRedundantServers"
						beanName="CreateLicenseHostForm" beanProperty="showRedundant" />
					<tiles:put name="showHostsTableYN" value="yes" />
					<tiles:put name="baseURL" value="createLicenseHost_" />
					<tiles:put name="ignoreHostTypes"
						beanName="CreateLicenseHostForm"
						beanProperty="ignoreHostTypes" />
				</tiles:insert>
			</logic:equal>
			<logic:equal name="CreateLicenseHostForm" property="isServerType" value="false">
				<tiles:insert page="/operationsportal/Activations/ServerHostTile.jsp">
					<tiles:put name="formName" value="CreateLicenseHostForm" />
					<tiles:put name="showServerHosts" value="false" />
					<tiles:put name="showNodeLockedHosts" value="true" />
					<tiles:put name="showHostsTableYN" value="yes" />
					<tiles:put name="baseURL" value="createLicenseHost_" />
					<tiles:put name="ignoreHostTypes" beanName="CreateLicenseHostForm" beanProperty="ignoreHostTypes" />
				</tiles:insert>
			</logic:equal>
		</div>
	</div>
</fno:form>

<%-- Display navigation buttons --%>

    <div class="modal-actions">

	<c:set var="OKBtnUrl">JavaScript:handleOK('<fmt:message
			key="operations.alert.selectOneItem" />')</c:set>
	<a class="btn md default" id="SelectOrg_OK"
		href="${OKBtnUrl}"> <bean:message key="operationsportal.common.button.ok" />
	</a>
	<a class="btn md light cancel" id="SelectOrg_Cancel"
		href="JavaScript:handleClose()"> <bean:message
			key="operationsportal.common.button.cancel" />
	</a>

</div>