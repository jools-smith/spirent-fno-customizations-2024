function toggleAll(formId, elemName, selAllElemName){
  form = eval("document." + formId);
  var checkVal;
  if (selAllElemName)
    checkVal = form.elements[selAllElemName].checked;
  else
    checkVal = form.select_all_checkbox.checked;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == elemName)
      form.elements[i].checked = checkVal;
  }
}

function checkLocalTrialExpiration(){
  var elem1 = document.getElementById("expiryType:permanent");
  var elem2 = document.getElementById("expiryType:expiring");
  var trelem = document.getElementById("duration_TR");
  if (elem1 && elem1.checked)
    trelem.style.display = "none";
  else if (elem2 && elem2.checked)
    trelem.style.display = "";
}
function mapOrderableToSKUVerifyProduct()
{
	var form = document.MapOrderableToSKUsForm;
	var parentObjectType=form.parentObjectType.value;
	var orderableName=form.orderableName.value;
    var targeturl = "mapOrderableToSKUs_VIEW.do";
	form.action=targeturl+"?parentObjectType="+parentObjectType+"&newOrderableName="+orderableName;
		form.target = "_self";
		form.submit();
		
	
	
}

function linkLicenseModelsVerifyProduct()
{
	var form = document.LinkLicenseModelsForm;
	var parentObjectType=form.parentObjectType.value;
	var orderableName=form.orderableName.value;
    var targeturl = "linkLicenseModels_VIEW.do";
    form.action=targeturl+"?parentObjectType="+parentObjectType+"&newOrderableName="+orderableName;
		form.target = "_self";
		form.submit();
		
	
	
}

function relateOrderablesVerifyProduct()
{
	var form = document.RelateOrderablesForm;
	var parentObjectType=form.parentObjectType.value;
	var orderableName=form.orderableName.value;
    var targeturl = "relateOrderables_VIEW.do";
	form.action=targeturl+"?parentObjectType="+parentObjectType+"&newOrderableName="+orderableName;
		form.target = "_self";
		form.submit();
		
	
	
}

function mapProductToCategoryVerifyProduct(parentObjectType)
{
	var form = document.MapProductToCategoryForm;
	var orderableName=form.productName.value;
    var targeturl = "mapProductToCategory_view.action";
		form.action=targeturl+"?parentObjectType="+parentObjectType+"&orderableName="+orderableName;
		form.target = "_self";
		form.submit();
		
	
	
}


function verifyProductLine()
{
	var form = document.MapProductToCategoryForm;
	var parentObjectType=form.parentObjectType.value;
	var productCategoryName=form.categoryName.value;
	var orderableName=form.productName.value;
    var targeturl = "mapProductToCategory_next.action";
		form.action=targeturl+"?parentObjectType="+parentObjectType+"&orderableName="+orderableName+"&productCategoryName="+productCategoryName;
		form.target = "_self";
		form.submit();
		
	
	
}
function openAdvancedSearch(formId, searchAction, selectCategoryMessage){
  form = eval("document." + formId);
  var searchcategory = "";
  if (form.searchCategory.type.indexOf("select") != -1) {
    var selindex = form.searchCategory.selectedIndex;
    if (form.searchCategory.selectedIndex == 0) {
      alert(selectCategoryMessage);
      return;
    }
    searchcategory = form.searchCategory.options[form.searchCategory.selectedIndex].value;
  }
  else {
    searchcategory = form.searchCategory.value;
  }
  var advsearchwin = openPopupWindow("advancedSearch_VIEW.do?searchCategory=" + searchcategory + "&parentForm=" + formId + "&searchAction="
      + searchAction, "advsearchwin");
}

function openEntitlementsAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("entitlementsAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction, "advsearchwin");
}
function openExportImportRequestsAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("exportImportRequestsAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction, "advsearchwin");
}

function openActivateLicensesAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("activateLicensesAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction, "advsearchwin");
}
function openSupportLicensesAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("supportLicensesAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction, "advsearchwin");
}

function openManageOrgsAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("/flexnet/operations/manageOrganizationsAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction="
      + searchAction, "advsearchwin");
}

function openManageUsersAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("/flexnet/operations/manageUsersAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction, "advsearchwin");
}

function openPrint(formId, url, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  var printdia = window.open("", "printDialog", "width=800,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=yes");
  form.target = "printDialog";
  form.action = url;
  form.submit();
  printdia.focus();
}

function openCertificate(formId, url, selectAtleastOneItemMessage, nobulkEntMsg){
  form = eval("document." + formId);
  var printdia = window.open("", "certDialog", "width=800,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=yes");
  form.target = "certDialog";
  form.action = url;
  form.submit();
  printdia.focus();
}

function regenerateIds(formId, url, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  form.target = "_self";
  form.action = url;
  form.submit();
}

function openEmail(formId, url, selectAtleastOneItemMessage, nobulkEntMsg){
  form = eval("document." + formId);
  form.target = "_self";
  form.action = url;
  form.submit();
}

function openActivatableItemCertificate(formId, url, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  var printdia = window
      .open("", "certificateDialog", "width=800,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=yes");
  form.target = "certificateDialog";
  form.action = url;
  form.submit();
  printdia.focus();
}

function openActivatableItemEmail(formId, url, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }

  form = eval("document." + formId);
  form.target = "_self";
  form.action = url;
  form.submit();
}

function openFulfillmentPrint(formId, url, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  var printdia = window.open("", "printDialog", "width=850,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=yes");
  form.target = "printDialog";
  form.action = url;
  form.submit();
  printdia.focus();
}

function getNumberOfItemsSelected(formId, targetElemName){
  var form = eval("document." + formId);
  var elems = form.elements;
  var numItemsSelected = 0;
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == targetElemName) && elems[j].checked) {
      numItemsSelected = numItemsSelected + 1;
    }
  }
  return numItemsSelected;
}

function getSelectedObject(formId, targetElemName){
  var form = eval("document." + formId);
  var elems = form.elements;
  var numItemsSelected = 0;
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == targetElemName) && elems[j].checked) {
      return elems[j].value;
    }
  }

  return null;
}

function performSimpleSearch(formId, baseAction, selectCategoryMessage){
  form = eval("document." + formId);
  if (form.searchCategory) {
    if (form.searchCategory.type.indexOf("select") != -1) {
      if (form.searchCategory.selectedIndex == 0) {
        alert(selectCategoryMessage);
        return;
      }
    }
  }
  resetPaginationParameters(formId);
  submitForm(formId, baseAction);
}

/**
 * Capture "enter" key and perform simple search if pressed
 */
function searchOnEnterKey(myForm, myEvent, myURL, myMsg)
{
  myEvent = (myEvent) ? myEvent : ((window.event) ? window.event : "");
  if (myEvent)
  {
    if (myEvent.keyCode==13 || myEvent.which==13) {
      performSimpleSearch(myForm, myURL, myMsg);
      return true;
    }
  }
  else
  {
    return true;
  }
}

/**
 * Capture "enter" key and open form if pressed
 */
function submitFormOnEnterKey(myForm, myEvent, myURL, myMsg)
{
  myEvent = (myEvent) ? myEvent : ((window.event) ? window.event : "");
  if (myEvent)
  {
    if (myEvent.keyCode==13 || myEvent.which==13) {
      return submitForm(myForm, myURL);
    }
  }
  else
  {
    return true;
  }
}

/**
 * Capture onchange event
 */
function submitFormOnChange(myForm,  myURL) {
   return submitForm(myForm, myURL);
}

function submitFormOnChangeEntitlement(myForm,  myURL) {
  var targetOrgDisplayName = document.getElementsByName("targetOrgDisplayName");
  if(targetOrgDisplayName != "undefined" && targetOrgDisplayName != ""){
    $("input[name = 'targetOrgDisplayName']").val('');
   }
   return submitForm(myForm, myURL);
}

function resetPaginationParameters(formId){
  form = eval("document." + formId);
  var pageNumElem = form.elements['paging.pageNumber'];
  if (pageNumElem) {
    var val = pageNumElem.value;
    if (val == "")
      form.elements['paging.pageNumber'].value = 1;
  }
  var nextPageElem = form.elements['paging.nextPage'];
  if (nextPageElem)
    nextPageElem.value = -1;
  var prevPageElem = form.elements['paging.previousPage'];
  if (prevPageElem)
    prevPageElem.value = -1;
}

function resetNextAndPreviousPaginationParameters(formId){
  form = eval("document." + formId);
  var nextPageElem = form.elements['paging.nextPage'];
  if (nextPageElem)
    nextPageElem.value = -1;
  var prevPageElem = form.elements['paging.previousPage'];
  if (prevPageElem)
    prevPageElem.value = -1;
}

function copySelectedItem(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction);
}

function sendSelectedItem(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  var selectedObj = getSelectedObject(formId, "selectedObjects");
  form.id.value = getSelectedObject(formId, "selectedObjects");
  submitForm(formId, baseAction);
}

function deleteSelectedItems(formId, baseAction, message, selectAtleastOneItemMessage, checkBoxName){
  form = eval("document." + formId);
  var num;
  if (checkBoxName)
    num = getNumberOfItemsSelected(formId, checkBoxName);
  else
    num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction, message);
}

function saveSelectedItemToFile(formId, baseAction, selectOneItemMessage, checkBoxName){
	  //form = eval("document." + formId);
	  var selectNodeName = checkBoxName || "selectedObjects";
	  var num = getNumberOfItemsSelected(formId, selectNodeName);
	  if (num != 1) {
	    alert(selectOneItemMessage);
	    return;
	  }
	  submitForm(formId, baseAction);
}

function addUser(formId, baseAction, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction);
}

function changeStateForSelectedItems(formId, baseAction, message, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction, message);
}

function exportSelectedItems(formId, baseAction, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction);
}

function exportAllItems(formId, baseAction, msg){
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction, msg);
}

function changeStateForSelectedLineItems(formId, baseAction, message, newState, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  baseAction = baseAction + "?newLineItemState=" + newState;
  submitForm(formId, baseAction, message);
}

function setCurrentPageNumber(formId){
  var form = eval("document." + formId);
  var currentpage = 0;
  var nextPageElem = form.elements['paging.nextPage'];
  var prevPageElem = form.elements['paging.previousPage'];
  if (nextPageElem) {
    var nextval = nextPageElem.value;
    if (nextval != "-1")
      currentpage = parseInt(nextval) - 1;
  }
  if (currentpage == 0) {
    if (prevPageElem) {
      var prevval = prevPageElem.value;
      if (prevval != "-1")
        currentpage = parseInt(prevval) + 1;
    }
  }
  var pageNumElem = form.elements['paging.pageNumber'];
  if (pageNumElem) {
    if (currentpage != 0) {
      pageNumElem.value = currentpage;
    }
    else {
      pageNumElem.value = 1;
    }
  }
  if (nextPageElem)
    nextPageElem.value = -1;
  if (prevPageElem)
    prevPageElem.value = -1;
}

function submitForm(formId, baseAction, message){
  if (message != null) {
    var cancelYN = confirm(message);
    if (cancelYN == false) {
      return;
    }
  }
  form = eval("document." + formId);
  if (baseAction)
    form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function submitToParent(formId, baseAction, message){
  if (message != null) {
    var cancelYN = confirm(message);
    if (cancelYN == false) {
      return;
    }
  }
  form = eval("document." + formId);
  if (baseAction)
    form.action = baseAction;
  form.target = "_parent";
  form.submit();
}

function cancelForm(formId, baseAction, message){
  var cancelYN = confirm(message);
  if (cancelYN == true) {
    window.location = baseAction;
  }
}

function clearSearch(formId, fieldName){
  form = eval("document." + formId);
  if (fieldName) {
    form.elements[fieldName].value = "";
  }
  else {
    form.searchPhrase.value = "";
  }
  return false;
}

function resetSearch(formId, baseAction, fieldName)
{
  form = eval("document." + formId);
  if (fieldName) {
    var fields = document.getElementsByName(fieldName);
    for ( var i = 0; i < fields.length; i++) {
      fields[i].value = '';
    }
  }
  else {
    form.searchPhrase.value = "";
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction);
  return false;
}

function validateCategorySelection(formId, event, selectCategoryMessage, defaultIndex)
{
  form = eval("document." + formId);
  var categoryIndex = 1;
  if (defaultIndex)
    {
      categoryIndex= defaultIndex;
    }
  if (form.searchCategory) {
    if (form.searchCategory.type.indexOf("select") != -1) {
      if (form.searchCategory.selectedIndex == 0) {
        alert(selectCategoryMessage);
        form.searchCategory.selectedIndex=categoryIndex;
        return;
      }
    }
  }
  return;
}

function clearField(fieldName){
  var field = document.getElementById(fieldName);
  field.value = "";
}

function clearSelectedOrgOrOwner(formId, fieldName, hiddenField){
  form = eval("document." + formId);
  form.elements[fieldName].value = "";
  form.elements[hiddenField].value = "";
}

function openSelectProductFeaturesDialog(formId, objtype){
  var form = eval("document." + formId);
  var fbid = form.id.value;
  var selectwin = window.open('', 'spfwin', 'width=650,height=380,toolbar=0,resizable=1,scrollbars=1');
  var frameform = window.frames['addedFeaturesFrame'].document.forms['AddedFeaturesToFeatureBundleForm'];
  frameform.action = "addedFeaturesToFeatureBundle_SAVE_QUANTITY.do?openSelectProductFeatureDialog=true&parentObjectId=" + fbid
      + "&parentObjectType=" + objtype;
  frameform.target = "spfwin";
  frameform.submit();
  selectwin.focus();
}
function openProductFeaturesDialog(formId, objtype){
  var form = eval("document." + formId);
  var pid = form.id.value;
  var selectwin = window.open('', 'spfwin', 'width=650,height=420,toolbar=0,resizable=1,scrollbars=1');
  var frameform = window.frames['addedFeaturesFrame'].document.forms['AddedFeaturesAndBundlesToProductForm'];
  frameform.action = "addedFeaturesAndBundlesToProduct_SAVE_QUANTITY.do?openSelectProductFeatureDialog=true&parentObjectId=" + pid
      + "&parentObjectType=" + objtype;
  frameform.target = "spfwin";
  frameform.submit();
  selectwin.focus();
}

function openSelectFeatureBundlesDialog(formId, objtype){
  var form = eval("document." + formId);
  var pid = form.id.value;
  var selectwin = window.open('', 'spfwin', 'width=650,height=420,toolbar=0,resizable=1,scrollbars=1');
  var frameform = window.frames['addedFeaturesFrame'].document.forms['AddedFeaturesAndBundlesToProductForm'];
  frameform.action = "addedFeaturesAndBundlesToProduct_SAVE_QUANTITY.do?openSelectFeatureBundlesDialog=true&parentObjectId=" + pid;
  frameform.target = "spfwin";
  frameform.submit();
  selectwin.focus();
}

function openSelectLicenseModelsDialog(formId, parentObjectId, parentObjectType, openerFormName, openerTargetFrameName, targetAction, msg){
  if (parentObjectId == '') {
    alert(msg);
    return;
  }
  var baseAction = "selectLicenseModels_VIEW.do?parentObjectId=" + parentObjectId + "&parentObjectType=" + parentObjectType + "&openerFormName="
      + openerFormName + "&openerTargetFrameName=" + openerTargetFrameName + "&targetAction=" + targetAction;
  var selectwin = window.open(baseAction, 'spfwin', 'width=650,height=420,toolbar=0,resizable=1,scrollbars=1');
  selectwin.focus();
}
function openSelectSKUsDialog(formId, parentObjectId, parentObjectType, openerFormName, openerTargetFrameName, targetAction, msg){
  if (parentObjectId == '') {
    alert(msg);
    return;
  }
  var baseAction = "selectSKUs_VIEW.do?parentObjectId=" + parentObjectId + "&parentObjectType=" + parentObjectType + "&openerFormName="
      + openerFormName + "&openerTargetFrameName=" + openerTargetFrameName + "&targetAction=" + targetAction;
  var selectwin = window.open(baseAction, 'spfwin', 'width=585,height=390,toolbar=0,resizable=1,scrollbars=1');
  selectwin.focus();
}

function searchForProduct(formId, baseAction, targetAction){
  searchForProductMulti(formId, baseAction, targetAction, true, true);
}

function searchForProductMulti(formId, baseAction, targetAction, isSingleSelect, isSearchPhrase){
  var form = eval("document." + formId);
  var searchPhrase = '';
  if (isSearchPhrase)
    searchPhrase = form.productName.value;
  var searchCategory = form.searchCategory.value;
  baseAction = baseAction + "?searchPhrase=" + searchPhrase + "&searchCategory=" + searchCategory + "&openerFormName=" + formId + "&isSingleSelect="
      + isSingleSelect + "&targetAction=" + targetAction;
  var selectwin = openPopupWindow(baseAction, 'spfwin');
}

function searchOrderableForEntitlement(formId, baseAction, targetAction){
  var form = eval("document." + formId);
  baseAction = baseAction + "?openerFormName=" + formId + "&openerTargetAction=" + targetAction;
  var selectwin = window.open(baseAction, 'spfwin');
  selectwin.focus();
}

function searchForSKUs(formId, baseAction, targetAction){
  var form = eval("document." + formId);
  var searchCategory = form.searchCategory.value;
  baseAction = baseAction + "?searchCategory=" + searchCategory + "&openerFormName=" + formId + "&openerTargetAction=" + targetAction;
  var selectwin = window.open(baseAction, 'spfwin', 'width=650,height=352,toolbar=0,resizable=1,scrollbars=1');
  selectwin.focus();
}

function searchForOrgUnit(formId, baseAction, targetAction, targetInputField, showInfoNotAvailableOrgUnit, targetDisplayField, displayCustomers,
    displayPartners, displayPublishers, displaySelfRegisteredOrgs){
  var targetOrgDisplayName = document.getElementsByName("targetOrgDisplayName");
  if(targetOrgDisplayName != "undefined" && targetOrgDisplayName != ""){
    $("input[name = 'targetOrgDisplayName']").val('');
   }
  var form = eval("document." + formId);
  baseAction = baseAction + "?parentFormName=" + formId;
  if (targetAction) {
    baseAction = baseAction + "&targetAction=" + targetAction;
  }
  if (targetInputField) {
    baseAction = baseAction + "&targetInputField=" + targetInputField;
  }
  if (showInfoNotAvailableOrgUnit) {
    baseAction = baseAction + "&showInfoNotAvailableOrgUnit=" + showInfoNotAvailableOrgUnit;
  }
  if (targetDisplayField) {
    baseAction = baseAction + "&targetDisplayField=" + targetDisplayField;
  }
  if (displayCustomers) {
    baseAction = baseAction + "&displayCustomers=" + displayCustomers;
  }
  if (displayPartners) {
    baseAction = baseAction + "&displayPartners=" + displayPartners;
  }
  if (displayPublishers) {
    baseAction = baseAction + "&displayPublishers=" + displayPublishers;
  }
  if (displaySelfRegisteredOrgs) {
    baseAction = baseAction + "&displaySelfRegisteredOrgs=" + displaySelfRegisteredOrgs;
  }

  var selectwin = openPopupWindow(baseAction, 'orgunitwin');
}

function searchForOrgUnitMerge(formId, baseAction, targetAction, targetInputField, showInfoNotAvailableOrgUnit, targetDisplayField, displayCustomers,
    displayPartners, displayPublishers, displaySelfRegisteredOrgs){
   var sourceOrgDisplayName = document.getElementsByName("sourceOrgDisplayName");
   if(sourceOrgDisplayName != "undefined" && sourceOrgDisplayName != ""){
    $("input[name = 'sourceOrgDisplayName']").val('');
   }
  var form = eval("document." + formId);
  baseAction = baseAction + "?parentFormName=" + formId;
  if (targetAction) {
    baseAction = baseAction + "&targetAction=" + targetAction;
  }
  if (targetInputField) {
    baseAction = baseAction + "&targetInputField=" + targetInputField;
  }
  if (showInfoNotAvailableOrgUnit) {
    baseAction = baseAction + "&showInfoNotAvailableOrgUnit=" + showInfoNotAvailableOrgUnit;
  }
  if (targetDisplayField) {
    baseAction = baseAction + "&targetDisplayField=" + targetDisplayField;
  }
  if (displayCustomers) {
    baseAction = baseAction + "&displayCustomers=" + displayCustomers;
  }
  if (displayPartners) {
    baseAction = baseAction + "&displayPartners=" + displayPartners;
  }
  if (displayPublishers) {
    baseAction = baseAction + "&displayPublishers=" + displayPublishers;
  }
  if (displaySelfRegisteredOrgs) {
    baseAction = baseAction + "&displaySelfRegisteredOrgs=" + displaySelfRegisteredOrgs;
  }

  var selectwin = openPopupWindow(baseAction, 'orgunitwin');
}

function searchForCategory(formId, baseAction, msg){
  var form = eval("document." + formId);
  var orderableId = form.orderableId.value;
  if (orderableId == '') {
    alert(msg);
    return;
  }
  var parentObjectType = form.parentObjectType.value;
  baseAction = baseAction + "?orderableId=" + orderableId + "&parentObjectType=" + parentObjectType;

  var selectwin = openPopupWindow(baseAction, 'orgunitwin');
}
function searchForOwner(formId, baseAction, targetAction, targetInputField, targetDisplayField, soldToIdFieldName){
  var form = eval("document." + formId);
  baseAction = baseAction + "?parentFormName=" + formId;
  if (targetAction) {
    baseAction = baseAction + "&targetAction=" + targetAction;
  }
  if (targetInputField) {
    baseAction = baseAction + "&targetInputField=" + targetInputField;
  }

  if (targetDisplayField) {
    baseAction = baseAction + "&targetDisplayField=" + targetDisplayField;
  }
  var soldToIdField = null;
  if (soldToIdFieldName) {
    soldToIdField = form.elements[soldToIdFieldName];
  }
  else {
    soldToIdField = form.elements['soldToId'];
  }
  if (soldToIdField) {
    baseAction = baseAction + "&overrideSoldTo=" + soldToIdField.value;
  }
  var selectwin = openPopupWindow(baseAction, 'ownerwin');
}

function searchForLicenseHost(formId, baseAction, targetAction, isServerHost, isSingleSelect, lineItemId, fulfillmentId, soldTo, owner,
    allLicenseHosts, licTechId, hostTypeId){
  var form = eval("document." + formId);
  baseAction = baseAction + "?parentFormName=" + formId + "&isServerType=" + isServerHost;
  if (targetAction) {
    baseAction = baseAction + "&targetAction=" + targetAction;
  }
  baseAction = baseAction + "&isSingleSelect=" + isSingleSelect;
  if (lineItemId) {
    baseAction = baseAction + "&lineItemId=" + lineItemId;
  }
  if (fulfillmentId) {
    baseAction = baseAction + "&fulfillmentId=" + fulfillmentId;
  }
  if (soldTo)
    baseAction = baseAction + "&overrideSoldTo=" + soldTo;

  if (owner) {
    baseAction = baseAction + "&overrideOwner=" + owner;
  }
  if (allLicenseHosts) {
    baseAction = baseAction + "&isGetAllLicenseHosts=" + allLicenseHosts;
  }
  if (licTechId) {
    baseAction = baseAction + "&licTechId=" + licTechId;
  }
  if (hostTypeId) {
    baseAction = baseAction + "&hostTypeId=" + hostTypeId;
  }
  selectExistingHostModalDialog(baseAction);
}
function createLicenseHost(formId, baseAction, targetAction, isServerHost, lineItemId, fulfillmentId, soldTo, owner, licTechId, hostTypeId){
  var form = eval("document." + formId);
  baseAction = baseAction + "?parentFormName=" + formId + "&isServerType=" + isServerHost;
  if (targetAction) {
    baseAction = baseAction + "&targetAction=" + targetAction;
  }
  if (lineItemId) {
    baseAction = baseAction + "&lineItemId=" + lineItemId;
  }
  if (fulfillmentId) {
    baseAction = baseAction + "&fulfillmentId=" + fulfillmentId;
  }
  if (soldTo)
    baseAction = baseAction + "&overrideSoldTo=" + soldTo;

  if (owner) {
    baseAction = baseAction + "&overrideOwner=" + owner;
  }
  if (licTechId) {
    baseAction = baseAction + "&licTechId=" + licTechId;
  }
  if (hostTypeId) {
    baseAction = baseAction + "&hostTypeId=" + hostTypeId;
  }
  createNewHostModalDialog(baseAction);
}
function openCreateTrustedHostDialog(formId, targetAct){
  var lichostwin = openPopupWindow("createTrustedHost_view.action?targetFormName=" + formId + "&targetAction=" + targetAct, "createlicenseHostwin", 50, 50);
}

function openCreateFileDefinition(formId, baseAction, licTechName, msg, customFilenameGenerator){
  var form = eval("document." + formId);
  var elems = form.elements;  
  var cc = 0;  
  for ( var i = 0; i < elems.length; i++) {
    if (elems[i].name == 'selectedFileTypesObjects') {
      cc = cc + 1;
    }
  }
  var fileNameGenVal = elems['customFilenameGenerator'].value;
  if (cc > 0 && fileNameGenVal == '' && customFilenameGenerator == '')  {
	  alert(msg);
	  return;
  }

  selectwin = openPopupWindow('', 'createFileDefinitionwin', 50, 50);
  form.target = 'createFileDefinitionwin';
  form.action = baseAction;
  form.submit();

}
function openMapProductCategories(formId, baseAction, self){
	  var form = eval("document." + formId);  
	  if(self !== undefined && self !== null && self){
		  form.target = '_self';	  
	  }else {
		  selectwin = openPopupWindow('', 'mapCategories', 50, 50);
		  form.target = 'mapCategories';
	  }
	  form.action = baseAction;
	  form.submit();
	}

function handleSelectCategoryOk(formId, baseAction){
  var form = eval("document." + formId);
  var orderableId = form.orderableId.value;
  var parentObjectType = form.parentObjectType.value;

  var elems = form.elements;
  var selectedCategory = "";
  var isChecked = false;
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "selectedCategory") && elems[j].checked) {
      selectedCategory = elems[j].value;
      isChecked = true;
      break;
    }
  }

  if (isChecked) {
    baseAction = baseAction + "?orderableId=" + orderableId + "&selectedCategory=" + selectedCategory + "&parentObjectType=" + parentObjectType;
    form.action = baseAction;
    window.opener.location.href = baseAction;
  }

  window.close();

}
function openCreateHostType(formId, baseAction, licTechName){
  var form = eval("document." + formId);

  selectwin = openPopupWindow('', 'createHostTypewin', 50, 50);
  form.target = 'createHostTypewin';
  form.action = baseAction;
  form.submit();

}
function openSelectHostType(formId, baseAction, licTechName){
  var form = eval("document." + formId);

  selectwin = openPopupWindow('', 'selectHostTypewin', 50, 50);
  form.target = 'selectHostTypewin';
  form.action = baseAction;
  form.submit();

}
function toggleAllAddedFeaturesInBundle(formId, targetFrameName, targetFormName, targetElemName){
  toggleAllObjectsInTargetFrame(formId, 'check_all_checkbox', targetFrameName, targetFormName, targetElemName);
}

function toggleAllObjectsInTargetFrame(formId, checkBoxName, targetFrameName, targetFormName, targetElemName){
  var form = eval("document." + formId);
  var checkval = form.elements[checkBoxName].checked;
  var elems = window.frames[targetFrameName].document.forms[targetFormName].elements;
  for ( var j = 0; j < elems.length; j++) {
    if (elems[j].name == targetElemName)
      elems[j].checked = checkval;
  }
}
function toggleAllLinkedLicenseModels(formId, targetFrameName, targetFormName, targetElemName){
  toggleAllObjectsInTargetFrame(formId, 'check_all_checkbox', targetFrameName, targetFormName, targetElemName);
}

function toggleAllMappedSKUs(formId, targetFrameName, targetFormName, targetElemName){
  toggleAllObjectsInTargetFrame(formId, 'check_all_checkbox', targetFrameName, targetFormName, targetElemName);
}

function removeFeaturesFromBundle(formId, targetFrameName, targetFormName, targetElemName, selectAtleastOneItemMessage){
  submitFormInTargetFrame(formId, targetFrameName, targetFormName, targetElemName, 'addedFeaturesToFeatureBundle_REMOVE_FROM_BUNDLE.do', selectAtleastOneItemMessage);
}

function submitFormInTargetFrame(formId, targetFrameName, targetFormName, targetElemName, targetAction, selectAtleastOneItemMessage){
  var form = eval("document." + formId);
  var targetForm = window.frames[targetFrameName].document.forms[targetFormName];
  var elems = targetForm.elements;
  var atleastOneSelected = "false";
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == targetElemName) && elems[j].checked) {
      atleastOneSelected = "true";
      break;
    }
  }
  if (atleastOneSelected == "false") {
    alert(selectAtleastOneItemMessage);
    return;
  }
  targetForm.action = targetAction;
  targetForm.target = "_self";
  targetForm.submit();
}
function removeLicensedModelsFromProduct(formId, targetFrameName, targetFormName, targetElemName, selectAtleastOneItemMessage){
  var targetForm = window.frames[targetFrameName].document.forms[targetFormName];
  var elems = targetForm.elements;
  var numselectedTrustedModels = 0;

  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == targetElemName) && elems[j].checked) {
      var rowObj = window.frames[targetFrameName].document.getElementById("LicenseModel_" + elems[j].value);
      var tds = rowObj.getElementsByTagName("td");
      var typeval = tds.item(3).childNodes.item(0).data;
      if (typeval == 'trusted')
        numselectedTrustedModels = numselectedTrustedModels + 1;
    }
  }

  var totalTModels = targetForm.elements['numTrustedModels'].value;

  if (totalTModels != '') {
    var ival = parseInt(totalTModels);
    if (totalTModels == numselectedTrustedModels && numselectedTrustedModels > 0) {
      var cancelYN = confirm("If all the trusted model are removed trusted key association is also removed. Please confirm.");
      if (cancelYN == false) {
        return;
      }
    }
  }
  submitFormInTargetFrame(formId, targetFrameName, targetFormName, targetElemName, 'linkedLicenseModelsToOrderable_REMOVE_FROM_PRODUCT.do', selectAtleastOneItemMessage);
}
function removeSKUsFromProduct(formId, targetFrameName, targetFormName, targetElemName, selectAtleastOneItemMessage){
  submitFormInTargetFrame(formId, targetFrameName, targetFormName, targetElemName, 'skusMappedToOrderable_REMOVE_FROM_PRODUCT.do', selectAtleastOneItemMessage);
}
function removeFeaturesFromProduct(formId, targetFrameName, targetFormName, targetElemName, selectAtleastOneItemMessage){
  submitFormInTargetFrame(formId, targetFrameName, targetFormName, targetElemName, 'addedFeaturesAndBundlesToProduct_REMOVE_FROM_PRODUCT.do', selectAtleastOneItemMessage);
}

function isPackageSelected(formId){

  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateProductForm;
  var elems = form.elements;
  var value;
  var packagename = document.getElementById("package_name");
  var packagenamehelp = document.getElementById("package_name_help");
  var packagever = document.getElementById("package_version");
  var packageverhelp = document.getElementById("package_version_help");
  var packageverformat = document.getElementById("package_version_format");
  var packageverformathelp = document.getElementById("package_version_format_help");
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "isPackage") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }
  if (value == "true") {
    packagename.style.display = "";
    if (packagenamehelp != null) {
      packagenamehelp.style.display = "";
    }
    packagever.style.display = "";
    if (packageverhelp != null) {
      packageverhelp.style.display = "";
    }
    packageverformat.style.display = "";
    if (packageverformathelp != null) {
      packageverformathelp.style.display = "";
    }
    checkPackageVersionFormat(formId);
  }
  if (value == "false") {
    packagename.style.display = "none";
    if (packagenamehelp != null) {
      packagenamehelp.style.display = "none";
    }
    packagever.style.display = "none";
    if (packageverhelp != null) {
      packageverhelp.style.display = "none";
    }
    packageverformat.style.display = "none";
    if (packageverformathelp != null) {
      packageverformathelp.style.display = "none";
    }
  }

}
function isDeviceType(){
  if($("#is_device_YES").attr("checked")){
    showFormElement('device_hosttype');
//    showFormElement('device_hosttype_help');
  }else{
    hideFormElement('device_hosttype');
  //  hideFormElement('device_hosttype_help');
  }
}

function toggleAllRelatedOrderablesToOrderable(formId, targetFrameName, targetFormName, targetElemName){
  toggleAllObjectsInTargetFrame(formId, 'check_all_checkbox', targetFrameName, targetFormName, targetElemName);
}

function removeRelatedOrderablesFromOrderable(formId, targetFrameName, targetFormName, targetElemName, selectAtleastOneItemMessage){
  submitFormInTargetFrame(formId, targetFrameName, targetFormName, targetElemName, 'relatedOrderablesToOrderable_CACHE_RELATIONSHIP.do', selectAtleastOneItemMessage);
}

function saveFeatureBundle(formId, baseAction){
  var frameform = window.frames['addedFeaturesFrame'].document.forms['AddedFeaturesToFeatureBundleForm'];
  frameform.action = "addedFeaturesToFeatureBundle_SAVE_QUANTITY.do?fwdAction=" + baseAction;
  frameform.target = "_self";
  frameform.submit();
}

function saveProduct(formId, baseAction){
  var frameform = window.frames['addedFeaturesFrame'].document.forms['AddedFeaturesAndBundlesToProductForm'];
  frameform.action = "addedFeaturesAndBundlesToProduct_SAVE_QUANTITY.do?fwdAction=" + baseAction;
  frameform.target = "_self";
  frameform.submit();
}

function saveOrderableSKUsMap(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elem = form.elements['orderableId'];
  if (elem) {
    var val = elem.value;
    if (val == '') {
      alert(msg);
      return;
    }
  }

  var frameform = window.frames['mappedSKUsFrame'].document.forms['SKUsMappedToOrderableForm'];
  frameform.action = "skusMappedToOrderable_SAVE_LICENSEMODEL.do?fwdAction=" + baseAction;
  frameform.target = "_self";
  frameform.submit();
}
function saveOrderableSKUsMapOnNext(formId, baseAction, msg){
  var form = eval("document." + formId);
  var frameform = window.frames['mappedSKUsFrame'].document.forms['SKUsMappedToOrderableForm'];
  frameform.action = "skusMappedToOrderable_SAVE_LICENSEMODEL.do?fwdAction=" + baseAction;
  frameform.target = "_self";
  frameform.submit();
}

function saveMaintenanceSKUsMap(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elem = form.elements['orderableId'];
  if (elem) {
    var val = elem.value;
    if (val == '') {
      alert(msg);
      return;
    }
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function saveMaintenanceSKUsMapOnNext(formId, baseAction){
  var form = eval("document." + formId);
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function saveOrderableLicenseModelsMap(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elem = form.elements['orderableId'];
  if (elem) {
    var val = elem.value;
    if (val == '') {
      alert(msg);
      return;
    }
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function saveOrderableLicenseModelsMapOnNext(formId, baseAction){
  var form = eval("document." + formId);
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function saveOrderableRelationships(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elem = form.elements['orderableId'];
  if (elem) {
    var val = elem.value;
    if (val == '') {
      alert(msg);
      return;
    }
  }

  var frameform = window.frames['relatedOrderablesFrame'].document.forms['RelatedOrderablesToOrderableForm'];
  frameform.action = "relatedOrderablesToOrderable_SAVE_RELATIONSHIP.do?fwdAction=" + baseAction;
  frameform.target = "_self";
  frameform.submit();
}
function saveOrderableRelationshipsOnNext(formId, baseAction){
  var form = eval("document." + formId);
  var frameform = window.frames['relatedOrderablesFrame'].document.forms['RelatedOrderablesToOrderableForm'];
  frameform.action = "relatedOrderablesToOrderable_SAVE_RELATIONSHIP.do?fwdAction=" + baseAction;
  frameform.target = "_self";
  frameform.submit();
}
function configureLineItemsOnload(){
  changeVersionDateOption('ConfigureLineItemsForm');
  changeStartDateOption('ConfigureLineItemsForm');
  isPermanentSelected('ConfigureLineItemsForm');
}
function lineItemLifeCycleSelectUpgradeProductOnload(){
  changeVersionDateOption('LineItemLifeCycleSelectUpgradeProductForm');
  isPermanentSelected('LineItemLifeCycleSelectUpgradeProductForm');
}

function changeVersionDateOption(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.ConfigureLineItemsForm;

  var versiondateoptelem = document.getElementById("versionDate_Option_Elem");
  if (versiondateoptelem) {
    var val = versiondateoptelem.options[versiondateoptelem.selectedIndex].value;
    var versiondatevalelem = document.getElementById("versionDate_Value_Elem");
    var versiondatedurelem = document.getElementById("versionDate_Duration_Elem");
    if (versiondatevalelem && versiondatedurelem) {
      if (val == 'bo.constants.versiondate.options.defineNow') {
        versiondatevalelem.style.display = "";
        versiondatedurelem.style.display = "none";
      }
      else if (val == 'bo.constants.versiondate.options.useStartDate' || val == 'bo.constants.versiondate.options.useActivationDate'
          || val == 'bo.constants.versiondate.options.defineStartDateLater') {
        versiondatevalelem.style.display = "none";
        versiondatedurelem.style.display = "";
      }
      else {
        versiondatevalelem.style.display = "none";
        versiondatedurelem.style.display = "none";
      }
    }
  }
}

function isPermanentSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.ConfigureLineItemsForm;

  toggleDurationExpirationFields(form);
}
function toggleDurationExpirationFields(form){
  var elems = form.elements;
  var value;
  var permanent_duration = document.getElementById("permanent_duration");
  var permanent_duration_help = document.getElementById("permanent_duration_help");
  var permanent_expirationdate = document.getElementById("permanent_expirationdate");
  var permanent_expirationdate_help = document.getElementById("permanent_expirationDate_help");
  var permanent_expiration = document.getElementById("permanent_expiration");
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "permanentYN") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }
  if (value == "false") {
    if (permanent_duration != null) {
      permanent_duration.style.display = "";
    }
    if (permanent_duration_help != null) {
      permanent_duration_help.className = "notHidden";
    }
    if (permanent_expirationdate != null) {
      permanent_expirationdate.style.display = "";
    }
    if (permanent_expiration != null) {
      permanent_expiration.style.display = "";
    }
    if (permanent_expirationdate_help != null) {
      permanent_expirationdate_help.className = "notHidden";
    }
  }
  if (value == "true") {
    if (permanent_duration != null) {
      permanent_duration.style.display = "none";
    }
    if (permanent_duration_help != null) {
      permanent_duration_help.className = "hidden";
    }
    if (permanent_expirationdate != null) {
      permanent_expirationdate.style.display = "none";
    }
    if (permanent_expiration != null) {
      permanent_expiration.style.display = "none";
    }
    if (permanent_expirationdate_help != null) {
      permanent_expirationdate_help.className = "hidden";
    }
  }
}

function addSCResponseOverride(formId){
  var tbl = document.getElementById('respOverridesTable');
  var lastRow = (tbl.rows.length) - 1;
  var iteration = lastRow;
  var row = tbl.insertRow(lastRow);
  row.style.backgroundColor = "#FFFFFF";

  // left cell
  var cellLeft = row.insertCell(0);
  cellLeft.innerHTML = '<input type="text" name="keynamevalue_' + iteration + '" size="40" class="form">';

  var cellRight = row.insertCell(1);
  cellRight.innerHTML = '<input type="text" name="maxlengthvalue_' + iteration + '" size="15" class="form">';
}

function removeSCResponseOverride(formId){
  var tbl = document.getElementById('respOverridesTable');
  var lastRow = (tbl.rows.length) - 1;
  if (lastRow > 2)
    tbl.deleteRow(lastRow - 1);
}

function isResponseOverridesSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateShortCodePageForm;
  toggleRespOverrideKeyValueFields(form);
}

function toggleRespOverrideKeyValueFields(form){
  var elems = form.elements;
  var value;
  var resp_override_tr = document.getElementById("TR_RESP_OVERRIDES");
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "responseOverrides") && elems[j].checked) {
      value = elems[j].value;
      break;
    }

  }
  if (value == "true") {
    if (resp_override_tr != null) {
      resp_override_tr.style.display = "";
    }
  }
  if (value == "false") {
    if (resp_override_tr != null) {
      resp_override_tr.style.display = "none";
    }
  }
}

function isShortCodePre11_5Selected(formId, pre15){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateShortCodePageForm;
  toggleSignStrengthAlphaNumFields(form, pre15);
}

function toggleSignStrengthAlphaNumFields(form, pre15Version){
  var elems = form.elements;
  var value = "false";
  var detailsValue;
  var supportRequestOverride = false;
  var alpha_numeric = document.getElementById("alpha_numeric");
  var alpha_numeric_help = document.getElementById("alpha_numeric_help");
  var resp_override_selection = document.getElementById("response_override_selection");
  var resp_override_selection_help = document.getElementById("response_override_selection_help");
  var req_override_header = document.getElementById("Reqest_override_header");
  var req_umn2_selection = document.getElementById("request_umn2_selection");
  var req_umne_selection = document.getElementById("request_umne_selection");
  var tr_response_override = document.getElementById("TR_RESP_OVERRIDES");
  var response_override_header = document.getElementById("response_override_header");

  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "minFNPVersion") && elems[j].checked) {
	      if (elems[j].value === pre15Version)
	    	  value = "true";
	      else if (elems[j].value === "11.14")
	    	  supportRequestOverride = true;
	      break;
    }
  }

  for ( var j1 = 0; j1 < elems.length; j1++) {
    if ((elems[j1].name == "responseOverrides") && elems[j1].checked) {
      detailsValue = elems[j1].value;
      break;
    }
  }
  if (value == "false") {
    if (alpha_numeric != null) {
      alpha_numeric.style.display = "";
    }
    if (alpha_numeric_help != null) {
      alpha_numeric.className = "notHidden";
    }
    if (response_override_header != null) {
      response_override_header.style.display = "";
    }
    if (resp_override_selection != null) {
      resp_override_selection.style.display = "";
    }
    if (resp_override_selection_help != null) {
      resp_override_selection_help.className = "notHidden";
    }
    if (req_override_header != null && req_umn2_selection != null && req_umne_selection != null && supportRequestOverride)  {
    	req_override_header.className = "notHidden";
    	req_umn2_selection.className="notHidden";
    	req_umne_selection.className="notHidden";
    }
    else if (!supportRequestOverride)  {
    	req_override_header.className = "hidden";
    	req_umn2_selection.className="hidden";
    	req_umne_selection.className="hidden";
    }

    if (resp_override_selection != null) {
      for ( var j1 = 0; j1 < elems.length; j1++) {
        if ((elems[j1].name == "responseOverrides") && elems[j1].checked) {
          if (elems[j1].value == 'false') {
            resp_override_selection.style.display = "";
            tr_response_override.style.display = "none";
            break;
          }
        }
      }
    }
  }
  if (value == "true") {
    if (alpha_numeric != null) {
      alpha_numeric.style.display = "none";
    }
    if (alpha_numeric_help != null) {
      alpha_numeric_help.className = "hidden";
    }
    if (response_override_header != null) {
      response_override_header.style.display = "none";
    }
    if (resp_override_selection != null) {
      resp_override_selection.style.display = "none";
    }
    if (resp_override_selection_help != null) {
      resp_override_selection_help.className = "hidden";
    }
    if (resp_override_selection != null) {
      resp_override_selection.style.display = "none";
      tr_response_override.style.display = "none";
    }
    if (req_override_header != null && req_umn2_selection != null && req_umne_selection != null)  {
    	req_override_header.className = "hidden";
    	req_umn2_selection.className="hidden";
    	req_umne_selection.className="hidden";
    }
  }
}

function isShortCodePermanentSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateShortCodePageForm;
  toggleDurationExpirationFields(form);
  isShortCodePre11_5Selected("CreateShortCodePageForm", "11.4");
}

function isBulkEntitlementPermanentSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateBulkEntitlementForm;
  toggleDurationExpirationFields(form);
}

function isCreateBulkentitlementSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = LinkShortCodePageForm;

  var elems = form.elements;
  var value;
  var entitlement_properties1 = document.getElementById("entitlement_properties1");
  var entitlement_properties2 = document.getElementById("entitlement_properties2");

  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "createBulEntYN") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }

  if (value == "true") {
    if (entitlement_properties1 != null) {
      document.getElementById("entitlement_properties1").style.display = "";
    }
    if (entitlement_properties2 != null) {
      entitlement_properties2.className = "notHidden";
    }
  }
  if (value == "false") {
    if (entitlement_properties1 != null) {
      document.getElementById("entitlement_properties1").style.display = "none";
    }
    if (entitlement_properties2 != null) {
      entitlement_properties2.className = "hidden";
    }
  }
}

function loadLinkEntitlementPage(formId){
  isCreateBulkentitlementSelected(formId);
  isAutoGenerateEntitlementIDSelected(formId);
}

function isCreateBulkentitlementSelectedOLD(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = LinkShortCodePageForm;

  var elems = form.elements;
  var value;
  var entitlement_properties = document.getElementById("entitlement_properties");
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "createBulEntYN") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }
  if (value == "false") {
    if (entitlement_properties != null) {
      for ( var k = 0; k < elems.length; k++)
        entitlement_properties[k].style.display = "";
    }
  }
  if (value == "true") {
    if (entitlement_properties != null) {
      for ( var k = 0; k < elems.length; k++)
        entitlement_properties[k].style.display = "none";
    }
  }
}

function isLocalTrialPermanentSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateLocalTrialPageForm;

  toggleDurationExpirationFields(form);
}

function changeExpirationRadioSelection(selection){
  var duration_radio = document.getElementById("duration_radio");
  var expiration_date_radio = document.getElementById("expiration_date_radio");
  if (selection == "DURATION") {
    duration_radio.checked = true;
    expiration_date_radio.checked = false;
  }
  else {
    duration_radio.checked = false;
    expiration_date_radio.checked = true;
  }
}
function copySelectedEntitlement(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  submitForm(formId, baseAction);
}
function addNewUser(formId, baseAction, msg1, msg2){

  if (!validateOrganizationFields(formId, msg1, msg2)) {
    return;
  }
  form = eval("document." + formId);

  submitForm(formId, baseAction);
}

function addExistingOrg(formId, baseAction, msg1, msg2, msg3, msg4, msg5, msg6, isSingleMode){

  if (!validateUserFields(formId, msg1, msg2, msg3, msg4, msg5, msg6, isSingleMode)) {
    return;
  }
  form = eval("document." + formId);

  submitForm(formId, baseAction);
}
function addNewOrganization(formId, baseAction, msg1, msg2){

  form = eval("document." + formId);

  submitForm(formId, baseAction);
}

function addNewSubOrganization(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectOneItemMessage);
    return;
  }
  submitForm(formId, baseAction);
}
function createEntitlementOnload(type){
  var form;
  if (type == 'bulk')
    form = eval("document.CreateBulkEntitlementForm");
  else
    form = eval("document.CreateEntitlementForm");

  var soldtoid = form.soldToId.value;
  if (soldtoid != '') {
    var contactSelection = document.getElementById("contact_selection");
    if (contactSelection) {
      contactSelection.style.display = "";
    }
  }
  if (type == 'bulk') {
    updateBulkEntitlementRadioButtons();
    changeVersionDateOption('CreateBulkEntitlementForm');
  }
  else {
    isAutoGenerateEntitlementIDSelected("CreateEntitlementForm");
  }
}
function entitlementLifeCycleOnload(){
  var form = eval("document.EntitlementLifecycleForm");

  var soldtoid = form.soldToId.value;
  if (soldtoid != '') {
    var contactSelection = document.getElementById("contact_selection");
    if (contactSelection) {
      contactSelection.style.display = "";
    }
  }
  changeVersionDateOption('EntitlementLifecycleForm');
  isPermanentSelected("EntitlementLifecycleForm");
}

function isAutoGenerateEntitlementIDSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateEntitlementForm;

  var elems = form.elements;
  var value;
  var user_supplied_entitlement_ID = document.getElementById("user_supplied_entitlement_ID");
  var user_supplied_entitlement_ID_help = document.getElementById("user_supplied_entitlement_ID_help");

  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "autoGenerateEntitlementIdYN" || elems[j].name == "autoGenerateEntitlementIDYN") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }

  if (value == "false") {
    if (user_supplied_entitlement_ID)
      user_supplied_entitlement_ID.style.display = "";
    if (user_supplied_entitlement_ID_help)
      user_supplied_entitlement_ID_help.style.display = "";
  }
  if (value == "true") {
    if (user_supplied_entitlement_ID)
      user_supplied_entitlement_ID.style.display = "none";
    if (user_supplied_entitlement_ID_help)
      user_supplied_entitlement_ID_help.style.display = "";
  }
}

function isAutoGenerateWebRegKeysSelected(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.LoadWebRegKeysForm;

  var elems = form.elements;
  var value;
  var user_webregkeys = document.getElementById("user_webregkeys");
  var user_webregkeys_help = document.getElementById("user_webregkeys_help");
  var numcopies = document.getElementById("numcopies");
  var numcopies_help = document.getElementById("numcopies_help");

  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "autoGenerateWebRegKeysYN") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }
  if (value == "false") {
    user_webregkeys.style.display = "";
    user_webregkeys_help.style.display = "";
    numcopies.style.display = "none";
    numcopies_help.style.display = "none";
  }
  if (value == "true") {
    user_webregkeys.style.display = "none";
    user_webregkeys_help.style.display = "none";
    numcopies.style.display = "";
    numcopies_help.style.display = "";
  }
}
function toggleWebRegKeysArea(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.CreateBulkEntitlementForm;

  var statuselem = form.elements['status'];
  if (statuselem) {
    var statuselemtype = statuselem.type;
    if (statuselemtype.indexOf("select") != -1) {
      var val = statuselem.options[statuselem.selectedIndex].value;
      var webregkeysoptiontr = document.getElementById("WebRegKeysOptionSelection_TR");
      var user_webregkeys = document.getElementById("user_webregkeys");
      var user_webregkeys_help = document.getElementById("user_webregkeys_help");
      var numcopies = document.getElementById("numcopies");
      var numcopies_help = document.getElementById("numcopies_help");

      if (val == "bo.constants.states.active") {
        if (webregkeysoptiontr)
          webregkeysoptiontr.style.display = "";
        if (user_webregkeys)
          user_webregkeys.style.display = "none";
        if (user_webregkeys_help)
          user_webregkeys_help.style.display = "none";
        if (numcopies)
          numcopies.style.display = "";
        if (numcopies_help)
          numcopies_help.style.display = "";
      }
      if (val == "bo.constants.states.inactive") {
        if (webregkeysoptiontr)
          webregkeysoptiontr.style.display = "none";
        if (user_webregkeys)
          user_webregkeys.style.display = "none";
        if (user_webregkeys_help)
          user_webregkeys_help.style.display = "none";
        if (numcopies)
          numcopies.style.display = "none";
        if (numcopies_help)
          numcopies_help.style.display = "none";
      }
    }
  }
}
function updateBulkEntitlementRadioButtons(){
  isBulkEntitlementPermanentSelected('CreateBulkEntitlementForm');
  isAutoGenerateEntitlementIDSelected('CreateBulkEntitlementForm');
}

function isBulkEntitlementSelected(formId){
  var form = eval("document." + formId);
  var elems = form.elements;
  var value;
  var webregkeys = document.getElementById("web_reg_keys");
  var autogenerate_quantity = document.getElementById("autogenerate_quantity");
  var autogenerate_quantity_help = document.getElementById("autogenerate_quantity_help");
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "bulkEntitlementYN") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }
  if (value == "false") {
    webregkeys.style.display = "";
  }
  if (value == "true") {
    webregkeys.style.display = "";
  }

}
function goToURL(baseAction){
  window.location = baseAction;
}
function activateLineItems(formId, selectAtleastOneItemMessage, trustedMessage){
  var form = eval("document." + formId);
  var id = "";
  var trusteditems = 0;
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
      var rowObj = document.getElementById("datarow_" + id);
      var tds = rowObj.getElementsByTagName("td");
      var typecol = tds.item(1);
      if (typecol.getElementsByTagName("span")) {
        var spanelem = typecol.getElementsByTagName("span")[0];
        if (spanelem) {
          var type = spanelem.childNodes.item(0).data;
          if (type == "T") {
            trusteditems = trusteditems + 1;
          }
        }
      }
    }
  }
  if (count < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  /*
   * if (trusteditems > 0) { alert(trustedMessage); return; }
   */
  form.target = "_self";
  form.action = "activatables_ACTIVATE.do";
  form.submit();
}
function activateTrustedLineItems(formId, selectAtleastOneItemMessage){
  var form = eval("document." + formId);
  var trusteditems = 0;
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  form.target = "_self";
  form.action = "activatables_TRUSTED_ACTIVATE.do";
  form.submit();
}

function transferLineItem(formId, baseAction, msg){
  var form = eval("document." + formId);
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count != 1) {
    alert(msg);
    return;
  }
  form.target = "_self";
  form.action = baseAction;
  form.submit();
}

function performTransferLineItem(formId, baseAction, selectParentEntMsg, enterParentEntIdMsg, msg){
  var form = eval("document." + formId);
  var whatisparent = '';
  var autogenentid = '';
  var selectedexistingentid = '';
  var newentid = '';

  for ( var i = 0; i < form.elements.length; i++) {
    var elem = form.elements[i];
    if (elem.name == "whatIsParentEnt" && elem.checked) {
      whatisparent = elem.value;
    }
    if (elem.name == "autoGenerateEntId" && elem.checked) {
      autogenentid = elem.value;
    }
    if (elem.name == "selectedExistingEntitlement" && elem.checked) {
      selectedexistingentid = elem.value;
    }
    if (elem.name == "newEntId") {
      newentid = elem.value;
    }
  }
  if (whatisparent != '') {
    if (whatisparent == 'existing') {
      if (selectedexistingentid == '') {
        alert(selectParentEntMsg);
        return;
      }
    }
    else if (whatisparent == 'new') {
      if (autogenentid == 'no' && Trim(newentid) == '') {
        alert(enterParentEntIdMsg);
        return;
      }
    }
    submitForm(formId, baseAction, msg);
  }
}

function checkFeatureVersionFormat(){
  form = document.CreateSharedFeaturePageForm;
  var ind = form.versionFormatType.selectedIndex;

  var versionTr = document.getElementById("version_TR");
  var versionTrDesc = document.getElementById("version_TR_Desc");
  if (ind == 0) {
    versionTr.style.display = "";
    if (versionTrDesc != null) {
      versionTrDesc.style.display = "";
    }
  }
  else if (ind == 1) {
    versionTr.style.display = "none";
    if (versionTrDesc != null) {
      versionTrDesc.style.display = "none";
    }
  }
}
function checkPackageVersionFormat(formId){
  var f;
  if (formId)
    f = eval("document." + formId);
  else
    f = document.CreateProductForm;

  // f = document.CreateProductForm;
  var ind = f.packageVersionFormat.selectedIndex;
  var versionTr = document.getElementById("package_version");
  var versionTrDesc = document.getElementById("package_version_help");
  if (ind == 0) {
    versionTr.style.display = "";
    if (versionTrDesc != null) {
      versionTrDesc.style.display = "";
    }
  }
  else if (ind == 1) {
    versionTr.style.display = "none";
    if (versionTrDesc != null) {
      versionTrDesc.style.display = "none";
    }
  }
}
function addHostId(formId){
  var tbl = document.getElementById('hostIdTable');
  var lastRow = (tbl.rows.length) - 1;
  var iteration = lastRow + 1;
  var row = tbl.insertRow(lastRow);
  row.style.backgroundColor = "#FFFFFF";

  // left cell
  var cellLeft = row.insertCell(0);
  cellLeft.style.width = "20";
  var textNode = document.createTextNode(" ");
  cellLeft.appendChild(textNode);

  var cellRight = row.insertCell(1);
  var el = document.createElement('input');
  el.setAttribute('type', 'text');
  el.setAttribute('name', 'hostid_' + iteration);
  el.setAttribute('size', '30');
  el.setAttribute('class', 'form');
  cellRight.appendChild(el);
}

function removeHostIds(formId){
  var tbl = document.getElementById('hostIdTable');
  var lastRow = (tbl.rows.length) - 1;
  if (lastRow > 1)
    tbl.deleteRow(lastRow - 1);
}

function generateLicense(formId, baseAction, enterOneOrThreeHostIdsMessage, requireddFulfillCountMessage){
  var form = eval("document." + formId);
  var tbl = document.getElementById('hostIdTable');
  if (tbl) {
    var numrows = (tbl.rows.length) - 1;
    form.numHostIds.value = "" + numrows;
  }
  var serverId1elem = form.serverId1;
  var serverId2elem = form.serverId2;
  var serverId3elem = form.serverId3;
  if (serverId1elem) {
    var serverid1 = serverId1elem.value;
    var serverid2 = serverId2elem.value;
    var serverid3 = serverId3elem.value;
    var numservidsentered = 0;
    if (serverid1 != "")
      numservidsentered = numservidsentered + 1;
    if (serverid2 != "")
      numservidsentered = numservidsentered + 1;
    if (serverid3 != "")
      numservidsentered = numservidsentered + 1;
    if (numservidsentered == 2) {
      alert(enterOneOrThreeHostIdsMessage);
      return;
    }
  }
  var fulfillcountelem = form.fulfillCount;
  if (fulfillcountelem) {
    if (fulfillcountelem.value == "") {
      alert(requireddFulfillCountMessage);
      return;
    }
  }
  form.action = baseAction;
  form.submit();
}

function saveASRLicenseToFile(formId, baseAction, msg){
  var form = eval("document." + formId);
  id = form.id.value;
  if (id == null || id == '') {
    alert(msg);
    return;
  }

  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function emailASR(formId, baseAction, msg){
  var form = eval("document." + formId);
  id = form.id.value;
  if (id == null || id == '') {
    alert(msg);
    return;
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function saveLicenseToFile(formId, baseAction){
  var form = eval("document." + formId);

  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function cleanField(fieldName){
  // alert(fieldName);
  var field = document.getElementById(fieldName);
  field.value = "";
}

function showSelectedFulfillment(formId, baseAction){
  var form = eval("document." + formId);
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function submitSupportLicensesForm(formId, actionType, baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage, trustedMessage,
    obsoleteMessage, selectTwoItemMessage, selectBatchRehostMessage){
  var form = eval("document." + formId);
  if (doValidationForSubmitSupportLicensesForm(formId, actionType, baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage, trustedMessage, obsoleteMessage, selectTwoItemMessage, selectBatchRehostMessage)) {
    form.action = baseAction;
    form.target = "_self";
    form.submit();
  }
}
function doValidationForSubmitSupportLicensesForm(formId, actionType, baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage,
    trustedMessage, obsoleteMessage, selectTwoItemMessage, selectBatchRehostMessage){
  var form = eval("document." + formId);
  var id = "";
  var selectedIds = new Array();
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      selectedIds[count] = id;
      count = count + 1;
    }
  }
  if (actionType == "repairLicense" || actionType == "returnLicense" || actionType == "stopgapLicense" || actionType == "rehostLicense"
      || actionType == "emergencyLicense" || actionType == "upgradeLicense" || actionType == "upsellLicense" || actionType == "renewLicense"
      || actionType == "emailFulfillments" || actionType == "publisherErrorLicense" || actionType == "viewShipmentRecords"
      || actionType == "saveToFile") {
    if (actionType != "emailFulfillments" && actionType != "rehostLicense" && actionType != "returnLicense" && count != 1) {
      alert(selectOneItemMessage);
      return false;
    }
    if (actionType == "rehostLicense") {
      if (count > 1) {
        alert(selectBatchRehostMessage);
        return false;
      }
      else if (count < 1) {
        alert(selectOneItemMessage);
        return false;
      }
    }
    if (actionType == "emailFulfillments" && count < 1) {
      alert(selectAtleastOneItemMessage);
      return false;
    }
    else {
      for ( var i = 0; i < selectedIds.length; i++) {
        var rowObj = document.getElementById("datarow_" + selectedIds[i]);
        var tds = rowObj.getElementsByTagName("td");
        if (obsoleteMessage != null || trustedMessage != null) {
          var typecol = tds.item(1);
          var spanelem = typecol.getElementsByTagName("span")[0];
          if (spanelem) {
            var type = spanelem.childNodes.item(0).textContent;

            if (type == "I" && obsoleteMessage != null) {
              if (actionType == "saveToFile" || actionType == "emailFulfillments") {
              }
              else {
                alert(obsoleteMessage);
                return false;
              }
            }
            if (type == "H" && obsoleteMessage != null) {
              alert(obsoleteMessage);
              return false;
            }
            if (type == "T" && trustedMessage != null) {
              if (actionType == "returnLicense") {
                if (count == 1) {
                  var cancelYN = confirm("Are you sure you want to manually return the trusted fulfillment?");
                  if (cancelYN == false) {
                    return false;
                  }
                }
              }
              else {
                alert(trustedMessage);
                return false;
              }
            }
          }

        }
      }
    }
  }

  if (actionType == "returnLicense") {
    if (count < 1) {
      alert(selectAtleastOneItemMessage);
      return false;
    }
  }

  if (actionType == "viewLicense") {
    if (count < 1) {
      alert(selectAtleastOneItemMessage);
      return false;
    }
  }

  if (actionType == "deleteFulfillments") {
    if (count < 1) {
      alert(selectAtleastOneItemMessage);
      return false;
    }
  }

  if (actionType == "consolidateLicense") {
    if (count < 2) {
      alert(selectTwoItemMessage);
      return false;
    }
  }

  if (message != null) {
    var cancelYN = confirm(message);
    if (cancelYN == false) {
      return false;
    }
  }
  return true;
}
function openShipmentRecordsDialog(formId, actionType, baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage, trustedMessage,
    obsoleteMessage, selectTwoItemMessage){
  if (doValidationForSubmitSupportLicensesForm(formId, actionType, baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage, trustedMessage, obsoleteMessage, selectTwoItemMessage, null)) {
    var form = eval("document." + formId);
    var id = "";
    for ( var i = 0; i < form.elements.length; i++) {
      if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
        id = form.elements[i].value;
        break;
      }
    }
    showShipmentRecords(formId, 'showShipmentRecords_VIEW.do?fulfillType=fulfillment&fulfillId=' + id);
  }
}

function submitConsolidatedLicensesLandingForm(formId, actionType, baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage,
    obsoleteMessage, selectTwoItemMessage){
  var form = eval("document." + formId);
  var id = "";
  var selectedIds = new Array();
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      selectedIds[count] = id;
      count = count + 1;
    }
  }
  if (actionType == "saveToFile" || actionType == "previewEmail" || actionType == "rehost") {
    if (actionType == "saveToFile" && count != 1) {
      alert(selectOneItemMessage);
      return;
    }
    else if (actionType == "rehost" && count != 1) {
      alert(selectOneItemMessage);
      return;
    }
    else if (actionType == "previewEmail" && count < 1) {
      alert(selectAtleastOneItemMessage);
      return;
    }
    else {
      for (i = 0; i < selectedIds.length; i++) {
        var selectedId = selectedIds[i];
        var rowObj = document.getElementById("datarow_" + selectedId);
        var tds = rowObj.getElementsByTagName("td");
        if (obsoleteMessage != null) {
          var typecol = tds.item(1);
          var spanelem = typecol.getElementsByTagName("span")[0];
          var type = spanelem.childNodes.item(0).data;

          if (type == "I") {
            if (actionType == "saveToFile" || actionType == "previewEmail") {
            }
            else {
              alert(obsoleteMessage);
              return;
            }
          }
        }
      }
    }
  }

  if (message != null) {
    var cancelYN = confirm(message);
    if (cancelYN == false) {
      return;
    }
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function submitEntitlementsLandingPageForm(formId, actionType, baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage,
    cannotActivateMessage, statusConstant){
  var form = eval("document." + formId);
  var id = "";
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
    }
  }
  if (actionType == "activate") {
    if (count != 1) {
      alert(selectOneItemMessage);
      return;
    }
  }
  if (actionType == "transfer") {
    if (count != 1) {
      alert(selectOneItemMessage);
      return;
    }
  }

  if (actionType == "enable" || actionType == "disable" || actionType == "delete") {
    if (count < 1) {
      alert(selectAtleastOneItemMessage);
      return;
    }
  }
  if (message != null) {
    var submitYN = confirm(message);
    if (submitYN == false) {
      return;
    }
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function showHelpLink(linkName){
  url = "/flexnet/contextHelp.do?module=operations&helpId=" + linkName;
  showHelp(url);
}
function doLandingPagePagination(formId, buttonid, baseAction, numpages, msg){
  form = eval("document." + formId);
  if (buttonid == "go") {
    var low = 1;
    var enteredval = parseInt(form.elements["paging.pageNumber"].value);

    if (low <= enteredval && enteredval <= numpages) {
      form.elements["paging.pageNumber"].value = enteredval;
    }
    else {
      alert(msg);
      return;
    }
  }
  if (buttonid == "back") {
    form.elements['paging.pageNumber'].value = form.elements['paging.previousPage'].value;
  }
  if (buttonid == "next") {
    form.elements['paging.pageNumber'].value = form.elements['paging.nextPage'].value;
  }
  var nextPageElem = form.elements['paging.nextPage'];
  if (nextPageElem)
    nextPageElem.value = -1;
  var prevPageElem = form.elements['paging.previousPage'];
  if (prevPageElem)
    prevPageElem.value = -1;
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function checkSelectedProductIsDeployble(formId, baseAction, selectAtleastOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction);
}
/*
 * Sridevi: Copied this code to open the getting started guide pdf file from
 * http://www.codingforums.com/showpost.php?p=81575&postcount=2
 */
function openDoc(filename, target){

  // to ensure no global variable conflict with other script
  var strWinHandle = target + "objDocWin";

  // just focus to the corresponding window if it is already open
  if (window[strWinHandle] && !window[strWinHandle].closed) {
    window[strWinHandle].focus();
    return false;
  }

  // open blank page
  window[strWinHandle] = window.open('', target, 'menubar=1,location=0,toolbar=0,resizable=1,status=0');

  // change window name (target); later, target will be used as frame name
  window[strWinHandle].name = strWinHandle;

  // create frameset with only 1 frame
  var strHTML = '<html>\r\n<head>\r\n';
  strHTML += '<title>' + filename.substring(filename.lastIndexOf("/") + 1) + '</title>\r\n';
  strHTML += '</head>\r\n';
  strHTML += '<frameset onload="window.focus()" rows="100%,*" border="0" frameborder="0" framespacing="0">\r\n';
  strHTML += '<frame name="' + target + '" src="about:blank">\r\n'; // set
                                                                    // target as
                                                                    // frame
                                                                    // name
  strHTML += '</frameset>\r\n';
  strHTML += '</html>';
  window[strWinHandle].document.write(strHTML);
  window[strWinHandle].document.close();

  // put a little delay; Netscape6 causes a null document object when called
  // directly
  setTimeout('loadDoc("' + strWinHandle + '","' + target + '","' + filename + '")', 0);

  return false; // this cancels href of the calling link
}

function loadDoc(strWinHandle, target, filename){
  // Flash the 'Loading...' message
  var strHTML = '<html><body>';
  strHTML += '<table width="100%" height="100%">';
  strHTML += '<tr><td align="center" valign="middle">';
  strHTML += '<font face="Arial" color="red">Loading...Please wait.</font><br><br>';
  // provide link to close window (for browsers with no appropriate plugin for
  // the needed software)
  strHTML += '<font face="Arial" size="1" color="gray">If you do not have the needed software/plugin to launch the document inside the browser, please <a href="javascript:window.close()">close</a> this window.</font>';
  strHTML += '</td></tr></table>';
  strHTML += '</body></html>';
  var winDocFrame = window[strWinHandle].frames[target];
  winDocFrame.document.write(strHTML); // winDocFrame.document is null in
                                        // Netscape6 if called directly
  winDocFrame.document.close();

  // preload the document
  var doc = new Image();
  doc.onerror = function(){
    // check window if still open, the user might have closed it
    if (window[strWinHandle] && !window[strWinHandle].closed) {
      winDocFrame.location.replace(filename); // finally, set frameset's
                                              // location to the document
                                              // filename
    }
  };
  doc.src = filename; // onerror handler fires since image src is not actually
                      // an image
}
function openSupportCenterLink(url){
  var supportcenterwin = window.open(url, "support_center_win", "menubar=1,location=0,toolbar=0,resizable=1,status=0,scrollbars=1");
  supportcenterwin.focus();
}
function openCognos(url){
  var supportcenterwin = window.open(url, "Cognos_win", "menubar=1,location=0,toolbar=0,resizable=1,status=0,scrollbars=1");
  supportcenterwin.focus();
}
function openSelectedCognos(formId, url, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  selectedID = getSelectedObject(formId, "selectedObjects");
  openCognos(url + "?selectedObjects=" + escape(selectedID));
}

function runSelectedReport(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  submitForm(formId, baseAction);
}
function openCommunitiesLink(url){
  var communitieswin = window.open(url, "communities_win", "menubar=1,location=0,toolbar=0,resizable=1,status=0,scrollbars=1");
  communitieswin.focus();
}

// Added for 7.1

function showEmailPreview(formId, baseAction){
  var form = eval("document." + formId);
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function sendEmail(formId, baseAction, invalidEmailMsg, elemName){
  var form = eval("document." + formId);
  var contacts;
  if (elemName) {
    contacts = form.elements[elemName].value;
  }
  else {
    contacts = form.shipToEmail.value;
  }
  var seperator = ",";
  var contactsArray = parseEmailContactsString(contacts, seperator);
  var isValid = true;
  for (x = 1; x <= contactsArray.length; x++) {
    if (!checkeEmailAddress(contactsArray[x])) {
      alert(invalidEmailMsg + contactsArray[x]);
      isValid = false;
      break;
    }
  }
  if (isValid) {
    form.action = baseAction;
    form.target = "_self";
    form.submit();
  }
}

function selectEmailContacts(formId, baseAction, property, orgId, isMultipleSelection){
  var form = eval("document." + formId);
  var targetAction = baseAction + "?orgId=" + orgId + "&parentFormName=" + formId + "&property=" + property;
  if (isMultipleSelection == "true") {
    targetAction = targetAction + "&multipleSelection=true";
  }
  var selectwin = openPopupWindow(targetAction, 'contactswin');
}

function showEmailContacts(formId, baseAction, property, isMultipleSelection, soldtoIdFieldName){
  var form = eval("document." + formId);
  var orgId = '';
  if (soldtoIdFieldName) {
    orgId = form.elements[soldtoIdFieldName].value;
  }
  else {
    orgId = form.soldToId.value;
  }
  selectEmailContacts(formId, baseAction, property, orgId, isMultipleSelection);
}

function checkeEmailAddress(emailId){
  var re = '';
  if(isValidateEmailAddressRegexEnabled){
   re = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   }
  else{
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  return re.test(String(emailId).toLowerCase());
}

function parseEmailContactsString(InString, Sep){
  NumSeps = 1;
  for (Count = 1; Count < InString.length; Count++) {
    if (InString.charAt(Count) == Sep)
      NumSeps++;
  }
  parse = new makeArray(NumSeps);
  Start = 0;
  Count = 1;
  ParseMark = 0;
  LoopCtrl = 1;
  while (LoopCtrl == 1) {
    ParseMark = InString.indexOf(Sep, ParseMark);
    TestMark = ParseMark + 0;
    if ((TestMark == 0) || (TestMark == -1)) {
      parse[Count] = Trim(InString.substring(Start, InString.length));
      LoopCtrl = 0;
      break;
    }
    parse[Count] = Trim(InString.substring(Start, ParseMark));
    Start = ParseMark + 1;
    ParseMark = Start;
    Count++;
  }
  parse[0] = Count;
  return (parse);
}

function makeArray(NumElements, Fill){
  var Count;
  this.length = NumElements;
  for (Count = 1; Count <= NumElements; Count++) {
    this[Count] = Fill;
  }
  return (this);
}

// functions for suite
function saveSuite(formId, baseAction){
  var frameform = window.frames['addedProductsFrame'].document.forms['AddedProductsToSuiteForm'];
  frameform.action = "addedProductsToSuite_SAVE_QUANTITY.do?fwdAction=" + baseAction;
  frameform.target = "_self";
  frameform.submit();
}

function searchForOrderable(formId, baseAction, targetAction, orderableType, isSingleSelect){
  var form = eval("document." + formId);
  var searchPhrase = form.orderableName.value;
  var searchCategory = form.searchCategory.value;
  baseAction = baseAction + "?searchPhrase=" + searchPhrase;
  baseAction = baseAction + "&searchCategory=" + searchCategory;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&isSingleSelect=" + isSingleSelect;
  baseAction = baseAction + "&targetAction=" + targetAction;
  var selectwin = openPopupWindow(baseAction, 'spfwin');
}
function openSelectTrustedOrderableDialog(parentObjectId, parentObjectType, openerFormName, openerTargetFrame, targetAction, singleSelect,
    displayedOrderablesType, isSendToOpenerTargetFrame){
  var baseAction = "selectOrderable_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + parentObjectId;
  baseAction = baseAction + "&parentObjectType=" + parentObjectType;
  baseAction = baseAction + "&openerFormName=" + openerFormName;
  baseAction = baseAction + "&openerTargetFrame=" + openerTargetFrame;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=" + singleSelect;
  baseAction = baseAction + "&displayedOrderablesType=" + displayedOrderablesType;
  baseAction = baseAction + "&isSendToOpenerTargetFrame=" + isSendToOpenerTargetFrame;
  // baseAction = baseAction + "&searchCategory=trustedOrderable";
  var selectwin = openPopupWindow(baseAction, 'sorderablewin');
}
function openSelectOrderableDialog(parentObjectId, parentObjectType, openerFormName, openerTargetFrame, targetAction, singleSelect,
    displayedOrderablesType, isSendToOpenerTargetFrame){
  var baseAction = "selectOrderable_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + parentObjectId;
  baseAction = baseAction + "&parentObjectType=" + parentObjectType;
  baseAction = baseAction + "&openerFormName=" + openerFormName;
  baseAction = baseAction + "&openerTargetFrame=" + openerTargetFrame;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=" + singleSelect;
  baseAction = baseAction + "&displayedOrderablesType=" + displayedOrderablesType;
  baseAction = baseAction + "&isSendToOpenerTargetFrame=" + isSendToOpenerTargetFrame;
  var selectwin = openPopupWindow(baseAction, 'sorderablewin');
}

function openSelectPartNumbersDialog(formId, parentObjectId, parentObjectType, openerFormName, openerTargetFrameName, targetAction, msg,
    showUnassignedPartNumbers){
  if (parentObjectId == '') {
    alert(msg);
    return;
  }
  var baseAction = "selectPartNumbers_VIEW.do?parentObjectId=" + parentObjectId + "&parentObjectType=" + parentObjectType + "&openerFormName="
      + openerFormName + "&openerTargetFrameName=" + openerTargetFrameName + "&targetAction=" + targetAction + "&showUnassignedPartNumbers="
      + showUnassignedPartNumbers;
  var selectwin = openPopupWindow(baseAction, 'sorderablewin');
  selectwin.focus();
}

function openSelectRelatedOrderableDialog(parentObjectId, parentObjectType, openerFormName, openerTargetFrame, targetAction, singleSelect,
    displayedOrderablesType, isSendToOpenerTargetFrame, msg){
  if (msg && parentObjectId == '') {
    alert(msg);
    return;
  }
  var baseAction = "relatedOrderablesToOrderable_CACHE_RELATIONSHIP.do?";
  baseAction = baseAction + "parentObjectId=" + parentObjectId;
  baseAction = baseAction + "&parentObjectType=" + parentObjectType;
  baseAction = baseAction + "&openerFormName=" + openerFormName;
  baseAction = baseAction + "&openerTargetFrame=" + openerTargetFrame;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=" + singleSelect;
  baseAction = baseAction + "&displayedOrderablesType=" + displayedOrderablesType;
  baseAction = baseAction + "&isSendToOpenerTargetFrame=" + isSendToOpenerTargetFrame;
  baseAction = baseAction + "&openOrderableDialog=true";
  var selectwin = openPopupWindow('', 'spfwin');
  var frameform = window.frames['relatedOrderablesFrame'].document.forms['RelatedOrderablesToOrderableForm'];
  frameform.action = baseAction;
  frameform.target = "spfwin";
  frameform.submit();
}

function openSelectEntitlementsDialog(openerFormName, openerTargetFrame, targetAction, singleSelect, displayedEntitlementsType,
    isSendToOpenerTargetFrame, operationType, parentObjId, states, asrId){
  var baseAction = "selectEntitlements_VIEW.do?";
  baseAction = baseAction + "&openerFormName=" + openerFormName;
  baseAction = baseAction + "&openerTargetFrame=" + openerTargetFrame;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=" + singleSelect;
  baseAction = baseAction + "&displayedEntitlementsType=" + displayedEntitlementsType;
  baseAction = baseAction + "&isSendToOpenerTargetFrame=" + isSendToOpenerTargetFrame;
  baseAction = baseAction + "&operationType=" + operationType;
  baseAction = baseAction + "&parentObjectId=" + parentObjId;
  baseAction = baseAction + "&states=" + states;
  baseAction = baseAction + "&shortCodeId=" + asrId;
  var selectwin = openPopupWindow(baseAction, 'sentswin');
}

function openSelectProductsDialog(formId, objtype){
  var form = eval("document." + formId);
  var fbid = form.id.value;

  var selectedLTid = "";

  var ltelem = form.elements['licenseTechnologyId'];
  if (ltelem) {
    selectedLTid = ltelem.options[ltelem.selectedIndex].value;
  }
  var selectwin = openPopupWindow('', 'spfwin');
  var frameform = window.frames['addedProductsFrame'].document.forms['AddedProductsToSuiteForm'];
  // TODO additional parameters like parentid is not required for product
  // selection
  frameform.action = "addedProductsToSuite_SAVE_QUANTITY.do?openSelectProductDialog=true&parentObjectId=" + fbid + "&parentObjectType=" + objtype
      + "&selectedLicenseTechnologyId=" + selectedLTid;
  frameform.target = "spfwin";
  frameform.submit();
}

function removeProductsFromSuite(formId, targetFrameName, targetFormName, targetElemName, selectAtleastOneItemMessage){
  submitFormInTargetFrame(formId, targetFrameName, targetFormName, targetElemName, 'addedProductsToSuite_REMOVE_FROM_PRODUCT.do', selectAtleastOneItemMessage);
}

function isPackageSelectedForSuite(){
  isPackageSelected('CreateUniformSuiteForm');
}

function showSKUSelectionDialog(formId){
  var form = eval("document." + formId);
  var sid = form.suiteId.value;
  var baseAction = "selectSKUs_VIEW.do?productId=" + sid;
  var selectwin = window.open(baseAction, 'spfwin', 'width=585,height=390,toolbar=0,resizable=1');
  selectwin.focus();
}

function productSkuLicenceModelChanged222222(){
  alert('sku license model changed');
}

function openSelectOrderablesForEntitlementDialog(formId, baseAction, msg1, msg2){
  if (!validateEntitlementRequiredFields(formId, msg1, msg2)) {
    return;
  }
  var form = eval("document." + formId);
  var searchCat = form.elements['searchCategory'];
  if (searchCat) {
    searchCat.value = "";
  }
  var win = openPopupWindow('', 'orderablesforentwin');

  form.action = baseAction;
  form.target = "orderablesforentwin";
  form.submit();
}

function openPopupWindow(url, winname, siz){
  var winoptions = [ "directories=no", "location=no", "menubar=no", "personalbar=no", "status=no", "toolbar=no", "resizable=yes", "scrollbars=yes" ];
  if (siz == null)
    siz = 70;
  var popupwnd = window.open(url, winname, winoptions.join(","));

  popupwnd.resizeTo(680, screen.height * siz / 100);
  popupwnd.moveTo(screen.width * 15 / 100, screen.height * 10 / 100);
  popupwnd.focus();

  return popupwnd;
}

function openSelectOrderablesForTestEntitlementDialog(formId, baseAction, msg1, msg2){
  if (!validateEntitlementRequiredFields(formId, msg1, msg2)) {
    return;
  }
  var form = eval("document." + formId);
  var searchCat = form.elements['searchCategory'];
  if (searchCat) {
    searchCat.value = "";
  }

  var selectwin = openPopupWindow('', 'sofentwin');
  baseAction = baseAction + "?showDraftProducts=true";
  baseAction = baseAction + "&state=bo.constants.states.test";

  form.action = baseAction;
  form.target = "sofentwin";
  form.submit();
}

function openSelectOrderableForASR(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesForShortCode_VIEW.do?";
  if (form.id)
    baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayedOrderablesType=ProductsSuites";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  // baseAction = baseAction +
  // "&searchCategory=com.flexnet.products.bizobjects.LicensedProduct";
  baseAction = baseAction + "&showDraftProducts=true";
  var minFNPSupportedVersion = form.elements["minFNPVersion"];
  if (minFNPSupportedVersion)
	  baseAction = baseAction+"&minFNPVersion=" + minFNPSupportedVersion.value;

  var selectwin = openPopupWindow(baseAction, 'sofbentwin');
}

function onChangeVirtualizationKeyword(formId){
  var form = eval("document." + formId);
  var baseAction = "createLocalTrial_SELECT_TXN_KEYS.do?";
  if (form.id)
    baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  form.action = baseAction;
  form.submit();
}

function openSelectOrderableForBulkEntitlementDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayedOrderablesType=ProductsSuites";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  var selectwin = openPopupWindow(baseAction, 'sofbentwin');
}

function openSelectOrderableForTestBulkEntitlementDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayedOrderablesType=ProductsSuites";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  baseAction = baseAction + "&showDraftProducts=true";

  var selectwin = openPopupWindow(baseAction, 'sofbentwin');
}

function openSelectOrderableBySKUForBulkEntitlementDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesBySKUsForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  var selectwin = openPopupWindow(baseAction, 'sofbentbyskuwin');
}

function openSelectOrderableBySKUForASRDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesBySKUsForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  baseAction = baseAction + "&showDraftProducts=true";
  // baseAction = baseAction + "&searchCategory=trustedOrderable";
  var selectwin = openPopupWindow(baseAction, 'sofbentbyskuwin');
}

function openSelectRetailOrderableBySKUForASRDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesBySKUsForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  baseAction = baseAction + "&showDraftProducts=true";
  baseAction = baseAction + "&licenseModelType=TRUSTED";
  baseAction = baseAction + "&showDraftProducts=true";
  if (form.minFNPVersion)
	  baseAction = baseAction+"&minFNPVersion=" + form.minFNPVersion.value;
  var selectwin = openPopupWindow(baseAction, 'sofbentbyskuwin');
}

function openSelectOrderableBySKUForTestBulkEntitlementDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesBySKUsForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  targetAction = targetAction + "?state=bo.constants.states.test";
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  baseAction = baseAction + "&showDraftProducts=true";
  baseAction = baseAction + "&state=bo.constants.states.test";
  var selectwin = openPopupWindow(baseAction, 'sofbentbyskuwin');
}

function openSelectOrderableForLocalTrialDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayedOrderablesType=ProductsSuites";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  var selectwin = openPopupWindow(baseAction, 'sofbentwin');
}
function openSelectOrderableBySKUForLocalTrialDialog(formId, targetAction){
  var form = eval("document." + formId);
  var baseAction = "selectOrderablesBySKUsForEntitlement_VIEW.do?";
  baseAction = baseAction + "parentObjectId=" + form.id.value;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSingleSelect=true";
  baseAction = baseAction + "&displayMaintenance=false";
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  var selectwin = openPopupWindow(baseAction, 'sofbentbyskuwin');
}

function changeMaintenanceVersionAndSKU(pid, obj){
  var rowObj = document.getElementById("datarow_" + pid);
  var tds = rowObj.getElementsByTagName("td");
  var mversiontd = tds.item(5);
  var cnodes = mversiontd.getElementsByTagName("span");
  var numelems = cnodes.length;
  var elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  var mskustd = tds.item(6);
  cnodes = mskustd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  cnodes = mskustd.getElementsByTagName("select");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }

  selmaintenance = obj.options[obj.selectedIndex].value;
  if (selmaintenance != '') {
    document.getElementById(pid + "_maintenance_version_" + selmaintenance).style.display = "";
    var mskuelem = document.getElementById(pid + "_maintenance_sku_" + selmaintenance);
    if (mskuelem) {
      mskuelem.style.display = "";
    }
  }
  else {
    document.getElementById(pid + "_maintenance_version_none").style.display = "";
    document.getElementById(pid + "_maintenance_sku_none").style.display = "";
  }
}
function changeMaintenanceVersionAndSKUInSelectBySKUsDialog(oid, pid, obj){
  var rowObj = document.getElementById("datarow_" + oid);
  var tds = rowObj.getElementsByTagName("td");
  var mversiontd = tds.item(5);
  var cnodes = mversiontd.getElementsByTagName("span");
  var numelems = cnodes.length;
  var elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  var mskustd = tds.item(6);
  cnodes = mskustd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  cnodes = mskustd.getElementsByTagName("select");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }

  selmaintenance = obj.options[obj.selectedIndex].value;
  if (selmaintenance != '') {
    document.getElementById(oid + "_" + pid + "_maintenance_version_" + selmaintenance).style.display = "";
    var mskuelem = document.getElementById(oid + "_" + pid + "_maintenance_sku_" + selmaintenance);
    if (mskuelem) {
      mskuelem.style.display = "";
    }
  }
  else {
    document.getElementById(oid + "_" + pid + "_maintenance_version_none").style.display = "";
    document.getElementById(oid + "_" + pid + "_maintenance_sku_none").style.display = "";
  }
}
function saveEntitlement(formId, baseAction, msg1, msg2){
  if (!validateEntitlementRequiredFields(formId, msg1, msg2)) {
    return;
  }
  submitForm(formId, baseAction);
}
function saveConfigServerSetUp(formId, baseAction, msg1, msg2){
  if (!validateReportSetUpRequiredFields(formId, msg1, msg2)) {
    return;
  }
  submitForm(formId, baseAction);
}
function saveDataTransformation(formId, baseAction, msg1, msg2){
  if (!validateDataTransformationRequiredFields(formId, msg1, msg2)) {
    return;
  }
  submitForm(formId, baseAction);
}

function deployEntitlement(formId, baseAction, msg1, msg2){
  if (!validateEntitlementRequiredFields(formId, msg1, msg2)) {
    return;
  }
  submitForm(formId, baseAction);
}
function activateEntitlement(formId, baseAction){
  submitForm(formId, baseAction);
}

function validateEntitlementRequiredFields(formId, entIdRequiredMsg, soldToOrgRequiredMsg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var value;

  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == "autoGenerateEntitlementIdYN") && elems[j].checked) {
      value = elems[j].value;
      break;
    }
  }
  if (value == "false") {
    var entidval = form.entitlementId.value;
    if (entidval == '') {
      alert(entIdRequiredMsg);
      return false;
    }
  }

  var soldtoid = form.soldToId.value;
  if (soldtoid == '') {
    alert(soldToOrgRequiredMsg);
    return false;
  }
  return true;
}

function validateOrganizationFields(formId, orgNameReqmsg, displayNameReqMsg){
  var form = eval("document." + formId);

  var orgName = form.organizationName.value;

  if (orgName == '') {
    alert(orgNameReqmsg);
    return false;
  }
  var displayName = form.displayName.value;
  if (displayName == '') {
    alert(displayNameReqMsg);
    return false;
  }
  return true;
}

function validateUserFields(formId, firstNameReqmsg, lastNameReqMsg, emailAddressMsg, userNameReqmsg, invalidEmailMsg, invaliduserNameMsg, isSingleMode){
  var form = eval("document." + formId);

  var firstName = form.firstName.value;

  if (Trim(firstName) == '') {
    alert(firstNameReqmsg);
    return false;
  }
  var lastName = form.lastName.value;

  if (Trim(lastName) == '') {
    alert(lastNameReqMsg);
    return false;
  }
   var email = form.emailAddress.value;
  if (Trim(email) == '') {
    alert(emailAddressMsg);
    return false;

  }
  else {
    if (!checkeEmailAddress(email)) {
      alert(invalidEmailMsg + email);
      return false;
    }

  }
  if(Trim(email).length > 100) {
	  alert("Length of email id should not exceed 100 characters");
	  return false;
  }
  if (form.canLogin[0].checked == true) {
    if (form.userName != null) {
      var userName = form.userName.value;
      if(isSingleMode==true){
	      if (Trim(userName) == '') {
	        alert(userNameReqmsg);
	        return false;
	      }
      }
    }
  }
  return true;
}
function IsNumeric(sText){
  var ValidChars = "0123456789";
  var IsNumber = true;
  var Char;

  for (i = 0; i < sText.length && IsNumber == true; i++) {
    Char = sText.charAt(i);
    if (ValidChars.indexOf(Char) == -1) {
      return false;
    }
  }

  return true;

}

function validateReportSetUpRequiredFields(formId, hostNameRequiredMsg, portNumRequiredMsg){
  var form = eval("document." + formId);

  var hostName = form.reportingServerHostName.value;
  if (hostName == '') {
    alert(hostNameRequiredMsg);
    return false;
  }

  var portNum = form.reportingServerPortNumber.value;
  if (!isValidPortNumber(portNum)) {
    return false;
  }

  portNum = form.reportingServerWebPortNumber.value;
  if (!isValidPortNumber(portNum)) {
    return false;
  }
  return true;
}

function isValidPortNumber(portNum){
  if (portNum == '') {
    alert(portNumRequiredMsg);
    return false;
  }
  var result = IsNumeric(portNum);
  if (result == false) {
    alert('Please enter numeric value for Port number');
    return false;
  }
  return true;
}
function IsValidTime(sText){
  re = /^\d{1,2}:\d{2}$/;
  if (!sText.match(re)) {
    alert("Please enter time in valid format hh:mm ");
    return false;
  }
  return true;

}

function validateDataTransformationRequiredFields(formId, durationRequiredMsg, startTimeRequiredMsg){
  var form = eval("document." + formId);
  var intervalval = form.dataTransformationInterval.value;
  if (intervalval == '') {
    alert(durationRequiredMsg);
    return false;
  }
  var startTime = form.dataTransformationTime.value;
  if (startTime == '') {
    alert(startTimeRequiredMsg);
    return false;
  }
  var result = IsNumeric(intervalval);
  if (result == false) {
    alert("Please enter numeric value for interval duration");
    return false;
  }
  var validTime = IsValidTime(startTime);
  if (validTime == false) {
    return false;
  }

  var batchSize = form.batchSize.value;
  result = IsNumeric(intervalval);
  if (result == false) {
    alert("Please enter numeric value for batch size.");
    return false;
  }
  return true;
}

function removeLineItemsFromEntitlement(formId, baseAction, message, delMessage){
  var form = eval("document." + formId);
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(message);
    return;
  }
  if (delMessage != null) {
    var submitYN = confirm(delMessage);
    if (submitYN == false) {
      return;
    }
  }
  submitForm(formId, baseAction);
}
function configureLineItemsInEntitlement(formId, baseAction, message){
  var form = eval("document." + formId);
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(message);
    return;
  }
  submitForm(formId, baseAction);
}

function showFulfillmentHistory(formId, baseAction, message){
  var form = eval("document." + formId);
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count != 1) {
    alert(message);
    return;
  }

  var selectwin = openPopupWindow('', 'fulfillmentHistorywin');
  form.action = baseAction;
  form.target = "fulfillmentHistorywin";

  form.submit();
}

function showSCFulfillmentHistory(objectId){
  var baseAction = "showFulfillmentHistory_VIEW.do?";
  baseAction = baseAction + "selectedObjects=" + objectId;
  var selectwin = openPopupWindow(baseAction, 'fulfillmentHistorywin');
}

function showShipmentRecords(formId, baseAction){
  var form = eval("document." + formId);
  var selectwin = openPopupWindow('', 'shipmentRecordswin');
  form.action = baseAction;
  form.target = "shipmentRecordswin";
  form.submit();
}

function showConsolidatedLicenseShipmentRecords(formId, baseAction, message){
  var form = eval("document." + formId);
  var count = 0;
  var str = "";
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      str = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count != 1) {
    alert(message);
    return;
  }

  baseAction = baseAction + "?fulfillId=" + str;
  baseAction = baseAction + "&fulfillType=consolidatedLicense";
  var selectwin = openPopupWindow('', 'shipmentRecordswin');
  form.action = baseAction;
  form.target = "shipmentRecordswin";

  form.submit();
}

function showShipmentRecordsFromConsolidatedLicSummary(formId, baseAction){
  var form = eval("document." + formId);
  var selectwin = openPopupWindow('', 'shipmentRecordswin');
  form.action = baseAction;
  form.target = "shipmentRecordswin";

  form.submit();
}

function showSelectedConsolidatedLicense(formId, baseAction){
  var form = eval("document." + formId);
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function showConsolidatedFulfillments(formId, baseAction, message){
  var form = eval("document." + formId);
  var count = 0;
  var str = "";
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      str = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count != 1) {
    alert(message);
    return;
  }

  baseAction = baseAction + "?consolidatedLicenseId=" + str;
  var selectwin = openPopupWindow('', 'shipmentRecordswin');
  form.action = baseAction;
  form.target = "shipmentRecordswin";
  form.submit();
}

function showOpenConsolidations(formId, baseAction){
  var form = eval("document." + formId);
  var selectwin = openPopupWindow('', 'openLicwin');
  form.action = baseAction;
  form.target = "openLicwin";

  form.submit();
}

function showOpenFulfillments(formId, baseAction){
  var form = eval("document." + formId);
  var selectwin = openPopupWindow('', 'openLicwin');
  form.action = baseAction;
  form.target = "openLicwin";

  form.submit();
}

function showStateChangeHistory(formId, baseAction){
  var selectwin = openPopupWindow(baseAction, 'stateChangeHistorywin');
  return;
}

function openLineItemsAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("/flexnet/operations/entitlementsAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction
      + "&objectType=lineitems", "advsearchwin");
}
function openMaintenanceLineItemsAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("maintenanceLineItemsAdvancedSearch_view.action?advSearchBean.parentForm=" + formId
      + "&advSearchBean.searchAction=" + searchAction, "advsearchwin");
}

function changeRelatedProductVersionAndSKU(pid, obj){
  var rowObj = document.getElementById("datarow_" + pid);
  var tds = rowObj.getElementsByTagName("td");
  var upgradeversiontd = tds.item(4);
  var cnodes = upgradeversiontd.getElementsByTagName("span");
  var numelems = cnodes.length;
  var elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  var upgradeskustd = tds.item(5);
  cnodes = upgradeskustd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  cnodes = upgradeskustd.getElementsByTagName("select");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }

  var upgrademaintenancetd = tds.item(6);
  cnodes = upgrademaintenancetd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  cnodes = upgrademaintenancetd.getElementsByTagName("select");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  var upgrademaintenanceversiontd = tds.item(7);
  cnodes = upgrademaintenanceversiontd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  var upgrademaintenanceskutd = tds.item(8);
  cnodes = upgrademaintenanceskutd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  cnodes = upgrademaintenanceskutd.getElementsByTagName("select");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  selupgrade = obj.options[obj.selectedIndex].value;
  var roelem = document.getElementById(pid + "_relatedOrderable_version_" + selupgrade);
  if (roelem)
    roelem.style.display = "";
  var roskuelem = document.getElementById(pid + "_relatedOrderable_sku_" + selupgrade);
  if (roskuelem) {
    roskuelem.style.display = "";
  }
  var romelem = document.getElementById(pid + "_relatedOrderable_maintenance_" + selupgrade);
  if (romelem)
    romelem.style.display = "";
  var romversionelem = document.getElementById(pid + "_relatedOrderable_maintenance_version_none");
  if (romversionelem)
    romversionelem.style.display = "";
  var romskuelem = document.getElementById(pid + "_relatedOrderable_maintenance_sku_none");
  if (romskuelem)
    romskuelem.style.display = "";
}
function changeRelatedProductMaintenanceVersionAndSKU(pid, upgradeid, obj){
  var rowObj = document.getElementById("datarow_" + pid);
  var tds = rowObj.getElementsByTagName("td");
  var mversiontd = tds.item(7);
  var cnodes = mversiontd.getElementsByTagName("span");
  var numelems = cnodes.length;
  var elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  var mskustd = tds.item(8);
  cnodes = mskustd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  cnodes = mskustd.getElementsByTagName("select");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }

  selmaintenance = obj.options[obj.selectedIndex].value;
  if (selmaintenance != '') {
    var elem1 = document.getElementById(pid + "_relatedOrderable_maintenance_version_" + upgradeid + "_" + selmaintenance);
    if (elem1)
      elem1.style.display = "";
    var roskuelem = document.getElementById(pid + "_relatedOrderable_maintenance_sku_" + upgradeid + "_" + selmaintenance);
    if (roskuelem) {
      roskuelem.style.display = "";
    }
  }
  else {
    var elem2 = document.getElementById(pid + "_relatedOrderable_maintenance_version_none");
    if (elem2)
      elem2.style.display = "";
    var elem3 = document.getElementById(pid + "_relatedOrderable_maintenance_sku_none");
    if (elem3)
      elem3.style.display = "";
  }
}
function openSelectUpgradeOrUpsellDialog(openerFormName, parentObjectId, targetAction, operationType, message, testYN){
  var form = eval("document." + openerFormName);
  var count = 0;
  var str = "";
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      if (count != 0)
        str = str + ",";
      str = str + form.elements[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(message);
    return;
  }
  var baseAction = "selectUpgradeOrUpsell_VIEW.do?";
  baseAction = baseAction + "openerFormName=" + openerFormName;
  baseAction = baseAction + "&parentObjectId=" + parentObjectId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&operationType=" + operationType;
  baseAction = baseAction + "&lineItemIds=" + str;
  baseAction = baseAction + "&showDraftProducts=" + testYN;
  var selectwin = openPopupWindow(baseAction, 'sentswin', 85);
}
function configureEntitlementRenew(openerFormName, message, baseAction){
  var form = eval("document." + openerFormName);
  var count = 0;
  var str = "";
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      if (count != 0)
        str = str + ",";
      str = str + form.elements[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(message);
    return;
  }
  // var elem = document.getElementById("configureRenewTable");
  // if (elem)
  // elem.style.display="";
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function openSelectMaintenanceForLineItemsDialog(formId, baseAction, message){
  var form = eval("document." + formId);
  var count = 0;
  var str = "";
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      if (count != 0)
        str = str + ",";
      str = str + form.elements[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(message);
    return;
  }
  var selectwin = openPopupWindow('', 'sofentwin');
  form.action = baseAction;
  form.target = "sofentwin";
  form.submit();
}

function changeLineItemMaintenanceVersionAndSKU(pid, obj){
  var rowObj = document.getElementById("datarow_" + pid);
  var tds = rowObj.getElementsByTagName("td");
  var mversiontd = tds.item(4);
  var cnodes = mversiontd.getElementsByTagName("span");
  var numelems = cnodes.length;
  var elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  var mskustd = tds.item(5);
  cnodes = mskustd.getElementsByTagName("span");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }
  cnodes = mskustd.getElementsByTagName("select");
  numelems = cnodes.length;
  elem = null;
  for (i = 0; i < numelems; i++) {
    elem = cnodes[i];
    elem.style.display = "none";
  }

  selmaintenance = obj.options[obj.selectedIndex].value;
  if (selmaintenance != '') {
    document.getElementById(pid + "_maintenance_version_" + selmaintenance).style.display = "";
    if (document.getElementById(pid + "_maintenance_sku_" + selmaintenance) != null) {
      document.getElementById(pid + "_maintenance_sku_" + selmaintenance).style.display = "";
    }
  }
  else {
    document.getElementById(pid + "_maintenance_version_none").style.display = "";
    if (document.getElementById(pid + "_maintenance_sku_none") != null) {
      document.getElementById(pid + "_maintenance_sku_none").style.display = "";
    }
  }
}

function openLineItemDetails(formId, lineItemId, baseUrl){
  var lineItemDetailsUrl = formatFullUrl(baseUrl, "lineItemDetails_VIEW.do?lineItemId=" + lineItemId);
  var detailswin = window.open(lineItemDetailsUrl, "dwin", "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}

function openLineItemDetailsPopup(appContext,lineItemId) {
  var detailswin = window.open(
          appContext + "/operations/lineItemDetails_VIEW.do?lineItemId=" + lineItemId,"lineItemPopupWin",
          "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}

function openFulfillmentDetails(formId, fulfillId){
  var detailswin = window
      .open("fulfillmentDetails_VIEW.do?fulfillId=" + fulfillId, "dwin", "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}
function openConsolidatedLicenseDetails(formId, conLicId){
  var detailswin = window
      .open("consolidatedLicenseDetails_VIEW.do?consolidatedRecId=" + conLicId, "dwin", "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}

function openReportProcessDetails(processId){
  var detailswin = window
      .open("transformationProcessDetails_VIEW.do?porcessId=" + processId, "dwin", "width=600,height=400,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}

function formatFullUrl(baseUrl, relativeUrl){
  return (baseUrl) ? baseUrl + relativeUrl : relativeUrl;
}

function doEntitlementsSorting(formId, sortUrl, sortColumnName){
  doSorting(formId, sortUrl, sortColumnName);
}

function doSorting(formId, sortUrl, sortColumnName){
  var form = eval("document." + formId);

  var sortColumnKeyElement = form.elements['sortColumnKey'];
  var sortDirectionElement = form.elements['sortDirection'];
  var sortColumnKeyValue = sortColumnKeyElement.value;

  if (sortDirectionElement && (sortColumnKeyValue != sortColumnName)) {
    sortDirectionElement.value = "";
  }

  sortColumnKeyElement.value = sortColumnName;
  form.action = sortUrl;
  form.target = "_self";
  form.submit();
}

function doProductPackagingSorting(formId, sortBaseUrl, searchcat, extraparams){
  var form = eval("document." + formId);
  resetPaginationParameters(formId);
  form.elements['searchCategory'].value = searchcat;
  sortBaseUrl = sortBaseUrl + "?" + extraparams;
  form.action = sortBaseUrl;
  form.target = "_self";
  form.submit();
}

function LTrim(str){
  var whitespace = new String(" \t\n\r ");
  // last space character is not a space, but alt+0160,
  // another invisible char.
  var s = new String(str);
  if (whitespace.indexOf(s.charAt(0)) != -1) {
    // We have a string with leading blank(s)...
    var j = 0, i = s.length;
    // Iterate from the far left of string until we
    // don't have any more whitespace...
    while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
      j++;
    // Get the substring from the first non-whitespace
    // character to the end of the string...
    s = s.substring(j, i);
  }
  return s;
}
// Trims all spaces to the right of a specific string
function RTrim(str){
  // We don't want to trip JUST spaces, but also tabs,
  // line feeds, etc. Add anything else you want to
  // "trim" here in whitespace
  var whitespace = new String(" \t\n\r ");
  // last space character is not a space, but alt+0160,
  // another invisible char.
  var s = new String(str);
  if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {
    // We have a string with trailing blank(s)...
    var i = s.length - 1; // Get length of string
    // Iterate from the far right of string until we
    // don't have any more whitespace...
    while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
      i--;
    // Get the substring from the front of the string to
    // where the last non-whitespace character is...
    s = s.substring(0, i + 1);
  }
  return s;
}

// Trims all spaces to the left and right of a specific string by calling RTim
// and LTrim
function Trim(str){
  return RTrim(LTrim(str));
}

function ShowHideTextType(formId){

  var trelem = document.getElementById('TR_TEXT_TYPE');
  var trelem1 = document.getElementById('TR_MAX_LENGTH');
  var elem3 = document.getElementById('TR_TEXT_ATTRIBS');
  var displayType = document.getElementById('TR_DISPLAY_TYPE');
  var trelemvv = document.getElementById('TR_VALID_VALUES');
  var reportelem = document.getElementById('TR_REPORTING');

  form = eval("document." + formId);
  var elems = form.elements;
 // var elemval = form.licenseTechnology.options[form.licenseTechnology.selectedIndex].value;
  var typeval = '';
  var elemval = '';
  if (elems) {
	    for ( var i = 0; i < elems.length; i++) {
	      if (elems[i].name == 'licenseTechnology') {
		  	elemval = form.licenseTechnology.options[form.licenseTechnology.selectedIndex].value;
			break;
	      }
	    }
  }
  if (elems) {
    for ( var i = 0; i < elems.length; i++) {
      if (elems[i].name == 'attrType' && elems[i].checked) {
        typeval = elems[i].value;
        break;
      }
    }
  }
  if (elems) {
    for ( var i = 0; i < elems.length; i++) {
      if (elems[i].name == 'productCategoryAttributeDO.type' && elems[i].checked) {
        typeval = elems[i].value;
        break;
      }
    }
  }
  if (typeval != '') {
    if (typeval == 'TEXT') {
      if (elem3)
        elem3.style.display = "";
      if (trelem)
        trelem.style.display = "";
      if (trelem1)
        trelem1.style.display = "";
      ShowHideValidValues(formId);
    }
    else if (typeval == 'LONGTEXT') {
      if (trelem)
        trelem.style.display = "none";
      if (trelem1)
        trelem1.style.display = "none";
      if (elem3)
        elem3.style.display = "";
      if (displayType)
        displayType.style.display = "";
      if (trelemvv)
        trelemvv.style.display = "none";
      if (reportelem) {
        reportelem.style.display = "none";
      }
    }
    else {
      if (trelem)
        trelem.style.display = "none";
      if (trelem1)
        trelem1.style.display = "none";
      if (elem3)
        elem3.style.display = "none";
      if (displayType)
        displayType.style.display = "none";
      if (reportelem) {
        // reportelem.style.display = "";
        // the above is commented for lic tech for host attr
        if (formId == 'CreateCustomHostAttributePageForm'){
          reportelem.style.display = "none";
		  }
        else{
		isRequiredForReporting(elemval);
		}
      }
    }
  }
  // the else condition below is added for lic tech for host attr
  else {
    if (formId == 'CreateCustomHostAttributePageForm') {
      //if (elemval == 100)
      //  reportelem.style.display = "";
      //else
        reportelem.style.display = "none";
    }
  }
  hideReporting();
}
function hideReporting(){
	var user = document.getElementById('user');
	var ent = document.getElementById('entitlementBO');
	var org = document.getElementById('orgUnit');
	var entLine = document.getElementById('entLine');
	var maintLine = document.getElementById('maintLine');
	var product = document.getElementById('product');
	var reportelem = document.getElementById('TR_REPORTING');
	var element = document.getElementById('typeSelector');
	var neededForReporting =  document.getElementById('isNeededForReportingCheckbox');
	var licenseModelAttr = document.getElementById('licenseModelAttr');
	
	if(element && typeof(neededForReporting) != 'undefined' && neededForReporting != null){
	element = element.value;
	if((element == 'org.id' || element == 'com.flexnet.platform.bizobjects.OrgUnit') &&  (org !=  null && org.value == 'false' && !neededForReporting.checked)){
							reportelem.style.display = "none";
					 	 }		
    if((element == 'entitlement.id' || element == 'com.flexnet.operations.bizobjects.entitlements.EntitlementBO') &&  (ent != null && ent.value == 'false' && !neededForReporting.checked)){
								reportelem.style.display = "none";
						  }
    if((element == 'user.id' || element == 'com.flexnet.platform.bizobjects.User') &&  (user != null && user.value == 'false' && !neededForReporting.checked)){
								reportelem.style.display = "none";
						  }
    if((element == 'product.id' || element == 'com.flexnet.products.bizobjects.Orderable') && (product != null && product.value == 'false' && !neededForReporting.checked)){
								reportelem.style.display = "none";
						  }
	if((element == 'entitlementLine.id' || element == 'com.flexnet.operations.bizobjects.entitlements.ActivatableItemBO') &&  (entLine != null && entLine.value == 'false' && !neededForReporting.checked)){
								reportelem.style.display = "none";
	}	
	
	if((element == 'maintenanceLine.id' || element == 'com.flexnet.operations.bizobjects.MaintenanceItemDO') &&  (maintLine != null && maintLine.value == 'false' && !neededForReporting.checked)){
		reportelem.style.display = "none";
}
    }	
		if(typeof(neededForReporting) != 'undefined' && neededForReporting != null){
			if(licenseModelAttr != null && licenseModelAttr.value == 'false' && !neededForReporting.checked)	{
				reportelem.style.display = "none";
			}
		}
	}
function ShowHideValidValues(formId){
  var trelem = document.getElementById('TR_VALID_VALUES');
  form = eval("document." + formId);
  var displayType = document.getElementById('TR_DISPLAY_TYPE');
  var reportelem = document.getElementById('TR_REPORTING');
  var elems = form.elements;
  var texttypeval = '';
  
  var elemval = '';
  if (elems) {
	    for ( var i = 0; i < elems.length; i++) {
	      if (elems[i].name == 'licenseTechnology') {
		  	elemval = form.licenseTechnology.options[form.licenseTechnology.selectedIndex].value;
			break;
	      }
	    }
  }
  
  if (elems) {
    for ( var i = 0; i < elems.length; i++) {
      if (elems[i].name == 'textType' && elems[i].checked) {
        texttypeval = elems[i].value;
        break;
      }
    }
  }
  if (texttypeval != '') {
    if (texttypeval == 'SingleSelect') {
      trelem.style.display = "";
      displayType.style.display = "none";
      isRequiredForReporting(elemval);
    }
    else if (texttypeval == 'MultiValued') {
      trelem.style.display = "";
      displayType.style.display = "none";
	  isRequiredForReporting(elemval);
    }
    else if (texttypeval == 'HexForm') {
      trelem.style.display = "none";
      displayType.style.display = "none";
      isRequiredForReporting(elemval);
    }
    else {
      displayType.style.display = "";
      trelem.style.display = "none";
	  isRequiredForReporting(elemval);
    }
	if (formId == 'CreateCustomHostAttributePageForm') {
	  reportelem.style.display = "none"; 
	  }
  }
  hideReporting();
}

function isRequiredForReporting(elemval){
 var reportelem = document.getElementById('TR_REPORTING');
if(elemval == 'file.id' || elemval == 'downloadPackage.id' || elemval == 'com.flexnet.operations.services.File' || elemval == 'com.flexnet.operations.services.DownloadPackage'){
				reportelem.style.display = "none";
			}
      else{
				reportelem.style.display = "";
			}
}
function addValidValue(formId){
  var tbl = document.getElementById('validValuesTable');
  var lastRow = (tbl.rows.length);
  var iteration = lastRow;
  var row = tbl.insertRow(lastRow);

  var cellRight = row.insertCell(0);
  cellRight.innerHTML = '<input type="text" name="validvalue_' + iteration + '" size="30" class="form text">';
}

function removeValidValue(formId){
  var tbl = document.getElementById('validValuesTable');
  var lastRow = (tbl.rows.length);
  if (lastRow > 1)
    tbl.deleteRow(lastRow - 1);
}

function submitCreateCustomAttributeForm(formId, baseAction){
  form = eval("document." + formId);
  var tbl = document.getElementById('validValuesTable');
  if (tbl) {
    var numrows = (tbl.rows.length);
    form.numValidValues.value = "" + numrows;
  }
  if (baseAction)
    form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function submitDeleteCustomAttributeForm(formId, baseAction, message) {
	form = eval("document." + formId);
	  if (message != null) {
		    var submitYN = confirm(message);
		    if (submitYN == false) {
		      return;
		    }
		  }
	  if (baseAction)
	    form.action = baseAction;
	  form.target = "_self";
	  form.submit();
}

function selectLicenseTechnology(formId){
  form = eval("document." + formId);
  var elemval = form.licenseTechnology.options[form.licenseTechnology.selectedIndex].value;
  var ltid = elemval.substring(0, elemval.indexOf("|"));
  var t = elemval.substring(elemval.indexOf("|") + 1, elemval.lastIndexOf("|"));
  var u = elemval.substring(elemval.lastIndexOf("|") + 1);
  if (t == 'FlexModelUI') {
    window.location = "createLicenseModel_CREATE.do";
  }
  else if (t == 'GenericModelUI') {
    window.location = "createGenericLicenseModel_CREATE.do?licenseTechnologyId=" + ltid;
  }
  else if (t == 'CustomUI') {
    window.open(u, "LicenseModelCustomUI", "");
    return;
  }
}
function saveTrustedKeyConfig(formId, baseAction, allowConfigureBinding, noAchoringMsg, noBindingsMsg, noAnchoringAndBindingMsg){
  form = eval("document." + formId);
  var useAnchoringVal = '';
  var useBindingVal = '';
  for ( var i = 0; i < form.elements.length; i++) {
    var elem = form.elements[i];
    if (elem.name == 'useAnchoring' && elem.checked)
      useAnchoringVal = elem.value;
    if (elem.name == 'useBindings' && elem.checked)
      useBindingVal = elem.value;
  }
  if (useAnchoringVal == 'no' && allowConfigureBinding && useBindingVal == 'no') {
    var cancelYN = confirm(noAnchoringAndBindingMsg);
    if (cancelYN == false) {
      return;
    }
  }
  else if (useAnchoringVal == 'no') {
    var cancelYN = confirm(noAchoringMsg);
    if (cancelYN == false) {
      return;
    }
  }
  else if (allowConfigureBinding && useBindingVal == 'no') {
    var cancelYN = confirm(noBindingsMsg);
    if (cancelYN == false) {
      return;
    }
  }
  if (baseAction)
    form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function toggleAllInConfigureBindings(formId, elemName, checkVal){
  form = eval("document." + formId);
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == elemName)
      form.elements[i].checked = checkVal;
  }
}

function addReinstallPolicyDetailRow(formId, tableId, addAction){
  var tbl = document.getElementById(tableId);
  var lastRow = (tbl.rows.length);
  var iteration = lastRow + 1;

  if (iteration > 4) {
    return;
  }

  var form = eval("document." + formId);
  if (tableId == 'umn1') {
    form.umn1ReinstallPolicySize.value = iteration;
  }
  else if (tableId == 'umn2') {
    form.umn2ReinstallPolicySize.value = iteration;
  }
  else if (tableId == 'mid') {
    form.midReinstallPolicySize.value = iteration;
  }
  form.action = addAction + "?tableType=" + tableId;
  form.target = "_self";
  form.submit();

  /*
   * var firstRow = tbl.getElementsByTagName("tr")[0]; var durationCell =
   * firstRow.getElementsByTagName("td")[4];
   * 
   * var orgCell0 = firstRow.getElementsByTagName("td")[0]; var orgCell1 =
   * firstRow.getElementsByTagName("td")[1]; var platformCell =
   * firstRow.getElementsByTagName("td")[2]; var orgCell3 =
   * firstRow.getElementsByTagName("td")[3]; var durationCell =
   * firstRow.getElementsByTagName("td")[4]; var orgCell5 =
   * firstRow.getElementsByTagName("td")[5]; var durTypeCell =
   * firstRow.getElementsByTagName("td")[6];
   * 
   * var row = tbl.insertRow(lastRow);
   * 
   * row.style.backgroundColor = "#FFFFFF";
   * 
   * var cell0 = row.insertCell(0); cell0.innerHTML = orgCell0.innerHTML;
   * 
   * var cell1 = row.insertCell(1); cell1.innerHTML = orgCell1.innerHTML;
   * 
   * var cell2 = row.insertCell(2); cell2.innerHTML = platformCell.innerHTML;
   * 
   * var cell3 = row.insertCell(3); cell3.innerHTML = orgCell3.innerHTML;
   * 
   * var cell4 = row.insertCell(4); cell4.innerHTML = durationCell.innerHTML;
   * 
   * var cell5 = row.insertCell(5); cell5.innerHTML = orgCell5.innerHTML;
   * 
   * var cell6 = row.insertCell(6);
   * 
   * var atag = "<a
   * href=\"JavaScript:removeReinstallPolicyDetailRow('"+formId+"','"+tableId+"','"+iteration+"')\">remove</a>";
   * cell6.innerHTML = atag;
   */
}

function removeReinstallPolicyDetailRow(formId, tableId, rid, removeAction){
  var form = eval("document." + formId);
  form.action = removeAction + "?tableType=" + tableId + "&rowId=" + rid;
  form.target = "_self";
  form.submit();
}

function isConfigureAdvancedReinstallPolicy(formId, advToggleAction){
  var form = eval("document." + formId);
  var isAdvancedSelected = 'false';
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "isAdvancedReinstallPolicy" && form.elements[i].checked) {
      isAdvancedSelected = 'true';
      break;
    }
  }
  form.target = "_self";
  form.action = advToggleAction + "?isAdvancedSelected=" + isAdvancedSelected;
  form.submit();
}

function addCountedNodeLockedHostId(formId, serveridindex){
  var tbl = document.getElementById('ServerHost_' + serveridindex + '_NodelockedHostIdTable');
  var lastRow = (tbl.rows.length) - 1;
  var iteration = lastRow + 1;
  var row = tbl.insertRow(lastRow);
  row.style.backgroundColor = "#FFFFFF";

  var cellLeft = row.insertCell(0);
  cellLeft.style.width = "20";
  var textNode = document.createTextNode(" ");
  cellLeft.appendChild(textNode);

  var cellRight = row.insertCell(1);

  var atag = "<a href=\"JavaScript:removeNodeLockedHost('" + formId + "','batchActivationConfigureHosts_REMOVE_NODELOCKED_HOST.do','ServerHost_"
      + serveridindex + "_hostid_" + iteration + "')\">remove</a>";
  cellRight.innerHTML = '<input type="text" name="ServerHost_' + serveridindex + '_hostid_' + iteration + '" size="30" class="form">&nbsp;' + atag;
}

function addNodeLockedHostId(formId){
  var tbl = document.getElementById('Nodelocked_hostIdTable');
  var lastRow = (tbl.rows.length) - 1;
  var iteration = lastRow + 1;
  var row = tbl.insertRow(lastRow);
  row.style.backgroundColor = "#FFFFFF";

  var cellLeft = row.insertCell(0);
  cellLeft.style.width = "20";
  var textNode = document.createTextNode(" ");
  cellLeft.appendChild(textNode);

  var cellRight = row.insertCell(1);

  var atag = "<a href=\"JavaScript:removeNodeLockedHost('" + formId + "','batchActivationConfigureHosts_REMOVE_NODELOCKED_HOST.do','hostid_"
      + iteration + "')\">remove</a>";
  cellRight.innerHTML = '<input type="text" name="hostid_' + iteration + '" size="30" class="form">&nbsp;' + atag;
}

function addServerHost(formId, labelForHosts){
  var tbl = document.getElementById('ServerHostsTable');
  var lastRow = (tbl.rows.length);
  var iteration = lastRow + 1;
  var row = tbl.insertRow(lastRow);
  var cell = row.insertCell(0);
  cell.setAttribute('nowrap', 'yes');

  var htmlcontent = '<span class="formLabel">' + labelForHosts + ':&nbsp;</span>';
  htmlcontent = htmlcontent + '<input type="text" name="serverhost_' + iteration + '_1" value="" size="15" class="form"/>&nbsp;';
  htmlcontent = htmlcontent + '<input type="text" name="serverhost_' + iteration + '_2" value="" size="15" class="form"/>&nbsp;';
  htmlcontent = htmlcontent + '<input type="text" name="serverhost_' + iteration + '_3" value="" size="15" class="form"/>&nbsp;';
  htmlcontent = htmlcontent + '<a href="JavaScript:removeServerHost(\'' + formId + '\', \'batchActivationConfigureHosts_REMOVE_SERVER_HOST.do\', \''
      + iteration + '\');">remove</a>';

  cell.innerHTML = htmlcontent;
}

function submitBatchActivationConfigureHostsForm(formId, baseAction){
  var form = eval("document." + formId);
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function removeServerHost(formId, baseAction, serveridindex){
  var form = eval("document." + formId);
  form.elements['serverIdToBeDeleted'].value = serveridindex;
  submitBatchActivationConfigureHostsForm(formId, baseAction);
}

function removeNodeLockedHost(formId, baseAction, fieldname){
  var form = eval("document." + formId);

  form.elements['nodelockedIdToBeDeleted'].value = fieldname;
  submitBatchActivationConfigureHostsForm(formId, baseAction);
}

function selectUpgradeLineItemPageHandleNext(formId, baseAction, msg){
  var form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(msg);
    return;
  }
  var selActId = "";
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      selActId = form.elements[i].value;
      break;
    }
  }
  form.upgradeActivationId.value = selActId;
  form.target = "_self";
  form.action = baseAction;
  form.submit();
}

function addHost(formId, baseAction){
  var form = eval("document." + formId);
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function addNLCountedHost(formId, serverIndex, baseAction){
  var form = eval("document." + formId);
  baseAction = baseAction + "?serverHostIndex=" + serverIndex;
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function changeServerHostType(formId, selectId, spanId){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var selectBox;
  for ( var i = 0; i < len; i++) {
    if (elems[i].name == selectId) {
      selectBox = elems[i];
      break;
    }
  }
  var spanBox = document.getElementById(spanId);
  if (selectBox && spanBox) {
    var selval = selectBox.options[selectBox.selectedIndex].value;
    /* Spirent, 20110124 - vdhSpanID and vhdSpanBox added to support 
	* adding/removing the 'VDH=' label
	*/
    var vdhSpanBox = document.getElementById("vdhSpanId");
    if (selval != 'DEMO' && selval != 'ANY') {
      spanBox.style.display = "";
      
	    if (vdhSpanBox) {
			if (selval == 'VENDOR_DEFINED') {
				vdhSpanBox.style.display = "";
			} else {
				vdhSpanBox.style.display = "none";
			}
		}
    }
    else {
      spanBox.style.display = "none";
      	if (vdhSpanBox) {
		vdhSpanBox.style.display = "none";
		}
    }
  }
}

function removeServerHost(formId, selectIndex, baseAction){
  var form = eval("document." + formId);
  baseAction = baseAction + "?removeIndex=" + selectIndex;
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function removeCountedNodeLockedHost(formId, serverIndex, nlIndex, baseAction){
  var form = eval("document." + formId);
  baseAction = baseAction + "?removeIndex=" + nlIndex + "&serverHostIndex=" + serverIndex;
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function isSpecifyHostIds(val){
  var oel = document.getElementById("ServerHostsTable");
  if (oel) {
    if (val == 'yes')
      oel.style.display = "";
    else
      oel.style.display = "none";
  }
}

function collapseServer(formId, serverIndex){
  var form = eval("document." + formId);
  var spanId = 'serverRow_' + serverIndex + '_2';
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "none";
  }

  spanId = 'serverRow_' + serverIndex + '_3';
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "none";
  }

  spanId = 'addSpan_' + serverIndex;
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "";
  }

  spanId = 'collapseSpan_' + serverIndex;
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "none";
  }

  var fieldName = 'redundantServerValue(redundantServer_' + serverIndex + '_1)';
  var elems = form.elements;
  var numelems = elems.length;
  for ( var i = 0; i < numelems; i++) {
    if (elems[i].name == fieldName) {
      elems[i].value = 'false';
      break;
    }
  }
}

function expandServer(formId, serverIndex){
  var form = eval("document." + formId);
  var spanId = 'serverRow_' + serverIndex + '_2';
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "";
  }

  spanId = 'serverRow_' + serverIndex + '_3';
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "";
  }

  spanId = 'addSpan_' + serverIndex;
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "none";
  }

  spanId = 'collapseSpan_' + serverIndex;
  var oel = document.getElementById(spanId);
  if (oel) {
    oel.style.display = "";
  }

  var fieldName = 'redundantServerValue(redundantServer_' + serverIndex + '_1)';
  var elems = form.elements;
  var numelems = elems.length;
  for ( var i = 0; i < numelems; i++) {
    if (elems[i].name == fieldName) {
      elems[i].value = 'true';
      break;
    }
  }
}

function hideNlHostsTextBoxes(){
  var form = document.forms[0];
  for ( var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    var elementName = element.name;
    var splits = elementName.split('_');
    if (splits[0] == 'nodeLockedSelectValue(nodeLockedSelect') {
      var spanId = 'nodeLockedSpan(nodeLockedSpan_' + splits[1];
      var oel = document.getElementById(spanId);
      if (oel) {
        if (element.value == 'DEMO' || element.value == 'ANY')
          oel.style.display = "none";
        else
          oel.style.display = "";
      }
    }
  }
}

function hideLicenseHostTile(){
  var form = document.forms[0];
  for ( var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    var elementName = element.name;
    if (elementName == 'hostIdYN' && element.checked) {
      var tableId = 'ServerHostsTable';
      var oel = document.getElementById(tableId);
      if (oel) {
        if (element.value == 'no')
          oel.style.display = "none";
        else
          oel.style.display = "";
      }
    }
  }
}

function deleteWebRegKeys(formId, baseAction, message, selectAtleastOneItemMessage){
  var form = eval("document." + formId);
  var id = "";
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  if (message != null) {
    var submitYN = confirm(message);
    if (submitYN == false) {
      return;
    }
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function addWebRegKey(formId, baseAction, promptMessage){
  var form = eval("document." + formId);
  var webRegKey = prompt(promptMessage, "");
  if (webRegKey == null) {
    return;
  }
  if (webRegKey == '') {
    alert(promptMessage);
    return;
  }
  form.addedWebRegisterKey.value = webRegKey;
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function refreshCreateFeatureDupGrp(){
  var form = eval("document.CreateSharedFeaturePageForm");
  var elems = form.elements;
  var len = elems.length;
  var grpMskChecked = 0;
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'grpMask' && formelem.checked)
      grpMskChecked = grpMskChecked + 1;
  }
  if (grpMskChecked > 0) {
    for ( var j = 0; j < len; j++) {
      var formelem = elems[j];
      if (formelem.name == 'dupGrp' && formelem.value == 'GrpMask')
        formelem.checked = true;
    }
  }
  else {
    for ( var j = 0; j < len; j++) {
      var formelem = elems[j];
      if (formelem.name == 'dupGrp' && formelem.value == 'GrpMask')
        formelem.checked = false;
    }
  }
}
function refreshCreateFeatureGrpMask(){
  var form = eval("document.CreateSharedFeaturePageForm");
  var elems = form.elements;
  var len = elems.length;
  var grpMskNotChecked = false;
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'dupGrp' && formelem.value != 'GrpMask' && formelem.checked)
      grpMskNotChecked = true;
  }
  if (grpMskNotChecked) {
    for ( var j = 0; j < len; j++) {
      var formelem = elems[j];
      if (formelem.name == 'grpMask')
        formelem.checked = false;
    }
  }
}

function lineItemLifeCycleSelectUpgradableLineItem(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var count = 0;
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'selectedUpgradableLineItem' && formelem.checked)
      count = count + 1;
  }
  if (count != 1) {
    alert(msg);
    return;
  }
  submitForm(formId, baseAction);
}
function lineItemLifeCycleSelectUpgradeProduct(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var count = 0;
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'selectedRelatedProduct' && formelem.checked)
      count = count + 1;
  }
  if (count != 1) {
    alert(msg);
    return;
  }
  submitForm(formId, baseAction);
}
function lineItemLifeCycleSelectExistingEntitlement(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var count = 0;
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'selectedExistingEntitlement' && formelem.checked)
      count = count + 1;
  }
  if (count != 1) {
    alert(msg);
    return;
  }
  submitForm(formId, baseAction);
}

function lineItemLifeCycleSaveNewEntitlementDetails(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var idval = "";
  var elemFound = false;
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'newEntId') {
      idval = formelem.value;
      elemFound = true;
      break;
    }
  }
  if (elemFound) {
    if (Trim(idval) == '') {
      alert(msg);
      return;
    }
  }
  submitForm(formId, baseAction);
}
function lineItemLifeCycleHandleNext(formId, baseAction, msg, msg2, msg3){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var fullUpgrade = "";
  var upgradeCopies = "";
  var autoGenerateActId = "";
  var newActId = "";

  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'fullUpgrade' && formelem.checked) {
      fullUpgrade = formelem.value;
    }
    else if (formelem.name == 'upgradeCopies') {
      upgradeCopies = formelem.value;
    }
    else if (formelem.name == 'autoGenerateActId' && formelem.checked) {
      autoGenerateActId = formelem.value;
    }
    else if (formelem.name == 'newActId') {
      newActId = formelem.value;
    }
  }
  if (fullUpgrade == "no") {
    if (Trim(upgradeCopies) == '') {
      alert(msg2);
      return;
    }
  }
  if (autoGenerateActId == "no") {
    if (Trim(newActId) == '') {
      alert(msg3);
      return;
    }
  }
  submitForm(formId, baseAction, msg);
}

function lineItemLifeCycleSelectUpgradableProduct(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var count = 0;
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'selectedUpgradableProduct' && formelem.checked)
      count = count + 1;
  }
  if (count != 1) {
    alert(msg);
    return;
  }
  submitForm(formId, baseAction);
}
function lineItemLifeCycleChooseBulkEntOrLineItem(formId, baseAction, msg1, msg2){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var val = "";
  for ( var i = 0; i < len; i++) {
    var formelem = elems[i];
    if (formelem.name == 'createBulkEntOrLineItem' && formelem.checked)
      val = formelem.value;
  }
  if (val == '') {
    alert(msg1);
    return;
  }
  if (val == 'bulkEnt') {
    var cancelYN = confirm(msg2);
    if (cancelYN == false) {
      return;
    }
  }

  submitForm(formId, baseAction);
}

	/* Spirent enhancement helper function - 
	   set the radio button with 
	   the given value as being checked
	   do nothing if there are no radio buttons
	   if the given value does not exist, all the radio buttons
	   are reset to unchecked
	*/
function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}

function activationAttributesOnLoad(formId){
  var form = eval("document." + formId);

  var soldtoid = form.soldToId.value;
  if (soldtoid != '') {
    var contactSelection = document.getElementById("contact_selection");
    if (contactSelection) {
      contactSelection.style.display = "";
    }
  }
  
  	/* Spirent enhancement - always default consolidate to yes */
	var consolidateLicenseId = document.getElementById("consolidateTheLicense");
	if (consolidateLicenseId) {
		setCheckedValue(consolidateLicenseId,"yes");
	}
}
function mergeEntitlements(formId, baseAction, msg1, msg2, msg3){
  var form = eval("document." + formId);

  var sourceOrg = form.sourceOrgId.value;
  if (sourceOrg == '') {
    alert(msg1);
    return;
  }
  var targetOrg = form.targetOrgId.value;
  if (targetOrg == '') {
    alert(msg2);
    return;
  }

  var count = 0;
  var elems = form.elements;
  var numelems = elems.length;

  for ( var i = 0; i < numelems; i++) {
    var elem = elems[i];
    if (elem.name == 'assetsToTransfer' && elem.checked) {
      count = count + 1;
    }
  }

  if (count <= 0) {
    alert(msg3);
    return;
  }

  submitForm(formId, baseAction);
}

function deleteSelectedlicenseHosts(formId, baseAction, message, selectAtleastOneItemMessage, objName){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, objName);
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  submitForm(formId, baseAction, message);
}
function importFNO(formId, baseAction, reqmsg, reqFileMsg){
  var hasFile = false;
  var selectedContinueOnError = false;
  var selectedUpdateExisting = false;
  var fileType="";

  form = eval("document." + formId);
  var elems = form.elements;
  var numElems = elems.length;
  for ( var i = 0; i < numElems; i++) {
    var elem = elems[i];
    if(elem.name == 'fileType' && elem.checked){
    	fileType = elem.value;
    }
    if ((elem.name == 'importFile' && elem.value != '') || (elem.name == 'filePath' && elem.value != '')) {
      hasFile = true;
    }
    else if (elem.name == 'continueOnError' && elem.checked) {
      selectedContinueOnError = true;
    }
    else if (elem.name == 'updateExisting' && elem.checked) {
      selectedUpdateExisting = true;
    }
  }
  if(fileType == "jar"){
	  if (!hasFile || !selectedContinueOnError || !selectedUpdateExisting) {
	    alert(reqmsg);
	    return;
	  }
  }else{
	  if (!hasFile){
		  alert(reqFileMsg);
		  return;
	  }
  }
  submitForm(formId, baseAction);
}

function exportTemplate(formId, baseAction, template){
	exportAction = baseAction + "?template=" + template;  
	form = eval("document." + formId);
	form.target = "_self";
	form.action = exportAction;
	form.submit();
}

function exportFNO(formId, baseAction, msg){
  submitForm(formId, baseAction, msg);
}

function downloadSelectedRequestFile(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  submitForm(formId, baseAction);
}

function runSelectedReport(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  submitForm(formId, baseAction);
}

function openTrustedRequestDetails(formId, requestId){
  var detailswin = window
      .open("trustedActRequestDetails_VIEW.do?requestId=" + requestId, "dwin", "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}

function openPublisherXMLDetails(formId){
  var detailswin = window
      .open("trustedActPublisherXMLDetails_VIEW.do", "dwin", "width=700,height=600,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}

function openTrustedActRequestsAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("trustedActRequestsAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction, "advsearchwin");
}

function downloadSelectedExportedFile(formId, baseAction, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  submitForm(formId, baseAction);
}
function openPartNumbersAdvancedSearch(formId, searchAction){
  var advsearchwin = openPopupWindow("partNumbersAdvancedSearch_VIEW.do?parentForm=" + formId + "&searchAction=" + searchAction, "advsearchwin");
}
function openSelectOrderableToMapPartNumbers(formId, targetAction, msg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var selElems = "";
  var numItemsSelected = 0;
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == 'selectedObjects') && elems[j].checked) {
      numItemsSelected = numItemsSelected + 1;
      if (j == 0) {
        selElems = selElems + elems[j].value;
      }
      else {
        selElems = selElems + "," + elems[j].value;
      }
    }
  }
  if (numItemsSelected == 0) {
    alert(msg);
    return;
  }
  var baseAction = "selectOrderableToMapPartNumbers_VIEW.do?";

  baseAction = baseAction + "selectedPartNumberIds=" + selElems;
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&displayedOrderablesType=AllOrderables";
  var selectwin = openPopupWindow(baseAction, 'ordtomappnswin');
}
function openSelectOrderableToMapPartNumberDialog(formId, targetAction){
  var baseAction = "selectOrderableToMapPartNumbers_VIEW.do?";
  baseAction = baseAction + "&openerFormName=" + formId;
  baseAction = baseAction + "&targetAction=" + targetAction;
  baseAction = baseAction + "&isSubmitOpenerForm=true";
  baseAction = baseAction + "&displayedOrderablesType=AllOrderables";
  var selectwin = openPopupWindow(baseAction, 'ordtomappnswin');
}

function showTrustedKeyRevision(formId, url, selectOneItemMessage){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num != 1) {
    alert(selectOneItemMessage);
    return;
  }
  var printdia = window.open("", "revisionDialog", "width=600,height=400,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=no");
  form.target = "revisionDialog";
  form.action = url;
  form.submit();
  printdia.focus();
}

function addCustomAttributeSearch(formId, targetUrl){
  var form = eval("document." + formId);
  form.action = targetUrl;
  form.target = "_self";
  form.submit();
}

function removeSearchAttribute(formId, attrIndex, targetUrl){
  var form = eval("document." + formId);
  form.action = targetUrl + '?removeAttribute=' + attrIndex;
  form.target = "_self";
  form.submit();
}
function removeSearchHostAttribute(formId, attrIndex, targetUrl){
  var form = eval("document." + formId);
  form.action = targetUrl + '?removeHostAttribute=' + attrIndex;
  form.target = "_self";
  form.submit();
}
function changeSearchLicenseAttribute(formId, selectId, index){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var selectBox;
  for ( var i = 0; i < len; i++) {
    if (elems[i].name == selectId) {
      selectBox = elems[i];
      break;
    }
  }

  if (selectBox) {
    var selval = selectBox.options[selectBox.selectedIndex].value;
    // alert(selval);
    // parse
    var splits = selval.split(':');
    var attrName = splits[0];
    var attrType = splits[1];

    // alert(attrName + attrType);
    correctDisplayForSearchAttribute(attrType, index);

  }
}

function changeSearchHostAttribute(formId, selectId, index){
  var form = eval("document." + formId);
  var elems = form.elements;
  var len = elems.length;
  var selectBox;
  for ( var i = 0; i < len; i++) {
    if (elems[i].name == selectId) {
      selectBox = elems[i];
      break;
    }
  }

  if (selectBox) {
    var selval = selectBox.options[selectBox.selectedIndex].value;
    // alert(selval);
    // parse
    var splits = selval.split(':');
    var attrName = splits[0];
    var attrType = splits[1];

    // alert(attrName + attrType);
    correctDisplayForSearchHostAttribute(attrType, index);

  }
}

function changeSearchLineItemAttribute(formId, selectId, index){
	  var form = eval("document." + formId);
	  var elems = form.elements;
	  var len = elems.length;
	  var selectBox;
	  for ( var i = 0; i < len; i++) {
	    if (elems[i].name == selectId) {
	      selectBox = elems[i];
	      break;
	    }
	  }

	  if (selectBox) {
	    var selval = selectBox.options[selectBox.selectedIndex].value;
	    // alert(selval);
	    // parse
	    var splits = selval.split(':');
	    var attrName = splits[0];
	    var attrType = splits[1];

	    // alert(attrName + attrType);
	    correctDisplayForSearchLineItemAttribute(attrType, index);

	  }
	}

function changeSearchEntAttribute(formId, selectId, index){
	  var form = eval("document." + formId);
	  var elems = form.elements;
	  var len = elems.length;
	  var selectBox;
	  for ( var i = 0; i < len; i++) {
	    if (elems[i].name == selectId) {
	      selectBox = elems[i];
	      break;
	    }
	  }

	  if (selectBox) {
	    var selval = selectBox.options[selectBox.selectedIndex].value;
	    // alert(selval);
	    // parse
	    var splits = selval.split(':');
	    var attrName = splits[0];
	    var attrType = splits[1];

	    // alert(attrName + attrType);
	    correctDisplayForEntSearchAttribute(attrType, index); 

	  }
	}

function changeSearchMaintenanceLineItemAttribute(formId, selectId, index){
	  var form = eval("document." + formId);
	  var elems = form.elements;
	  var len = elems.length;
	  var selectBox;
	  for ( var i = 0; i < len; i++) {
	    if (elems[i].name == selectId) {
	      selectBox = elems[i];
	      break;
	    }
	  }

	  if (selectBox) {
	    var selval = selectBox.options[selectBox.selectedIndex].value;
	    // alert(selval);
	    // parse
	    var splits = selval.split(':');
	    var attrName = splits[0];
	    var attrType = splits[1];

	    // alert(attrName + attrType);
	    correctDisplayForSearchMaintenanceLineItemAttribute(attrType, index);

	  }
	}

function correctDisplayForSearchAttributeOnLoad(){
  var form = document.forms[0];
  for ( var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    var elementName = element.name;
    var splits = elementName.split('(');
    if (splits[0] == 'licenseAttributeName') {
      var splits2 = splits[1].split(')');
      var index = splits2[0];
      var nameType = element.value;
      var splits3 = nameType.split(':');
      var attrType = splits3[1];
      correctDisplayForSearchAttribute(attrType, index);
    }
    else if (splits[0] == 'mainLineItemAttributeName') {
        var splits2 = splits[1].split(')');
        var index = splits2[0];
        var nameType = element.value;
        var splits3 = nameType.split(':');
        var attrType = splits3[1];
        correctDisplayForSearchMaintenanceLineItemAttribute(attrType, index);
    }
  	else if (splits[0] == 'lineItemAttributeName') {
        var splits2 = splits[1].split(')');
        var index = splits2[0];
        var nameType = element.value;
        var splits3 = nameType.split(':');
        var attrType = splits3[1];
        correctDisplayForSearchLineItemAttribute(attrType, index);
    }	
  }
}
function correctDisplayForSearchHostAttributeOnLoadStruts2(){
  var form = document.forms[0];
  for ( var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    var elementName = element.name;
    var splits = elementName.split('[');
    if (splits[0] == 'advSearchBean.hostAttributeName') {
      var splits2 = splits[1].split(']');
      var index = splits2[0];
      var nameType = element.value;
      var splits3 = nameType.split(':');
      var attrType = splits3[1];
      correctDisplayForSearchHostAttribute(attrType, index);
    }
  }
}

function correctDisplayForSearchHostAttributeOnLoad(){
  var form = document.forms[0];
  for ( var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    var elementName = element.name;
    var splits = elementName.split('(');
    if (splits[0] == 'hostAttributeName') {
      var splits2 = splits[1].split(')');
      var index = splits2[0];
      var nameType = element.value;
      var splits3 = nameType.split(':');
      var attrType = splits3[1];
      correctDisplayForSearchHostAttribute(attrType, index);
    }
  }
}

function correctDisplayForSearchLineItemAttributeOnLoad(){
  var form = document.forms[0];
  for ( var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    var elementName = element.name;
    var splits = elementName.split('(');
    if (splits[0] == 'lineItemAttributeName') {
      var splits2 = splits[1].split(')');
      var index = splits2[0];
      var nameType = element.value;
      var splits3 = nameType.split(':');
      var attrType = splits3[1];
      correctDisplayForSearchLineItemAttribute(attrType, index);
    }
  }
}

function correctDisplayForEntSearchAttribute(attrType, index){
  if (attrType == 'TEXT') {
    // alert('in text');
    // show text spans and disable other spans
    var spanId = 'entStringSpan_' + index;  
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'entStringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'entDateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entDateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entNumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entNumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entBoolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
  else if (attrType == 'DATE') {
    // alert('in date');
    // show text spans and disable other spans
    var spanId = 'entStringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entStringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entDateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'entDateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'entNumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entNumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entBoolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
  else if (attrType == 'BOOLEAN') {
    // alert('in boolean');
    // show text spans and disable other spans
    var spanId = 'entStringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entStringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entDateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entDateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entNumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entNumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entBoolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
  }
  else if (attrType == 'NUMBER') {
    // alert('in number');
    // show text spans and disable other spans
    var spanId = 'entStringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entStringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entDateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'entDateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'entNumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'entNumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'entBoolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
}

function correctDisplayForSearchAttribute(attrType, index){
  if (attrType == 'TEXT') {
    // alert('in text');
    // show text spans and disable other spans
    var spanId = 'stringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'stringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'dateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'dateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'numberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'numberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'boolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
  else if (attrType == 'DATE') {
    // alert('in date');
    // show text spans and disable other spans
    var spanId = 'stringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'stringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'dateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'dateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'numberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'numberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'boolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
  else if (attrType == 'BOOLEAN') {
    // alert('in boolean');
    // show text spans and disable other spans
    var spanId = 'stringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'stringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'dateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'dateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'numberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'numberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'boolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
  }
  else if (attrType == 'NUMBER') {
    // alert('in number');
    // show text spans and disable other spans
    var spanId = 'stringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'stringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'dateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'dateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'numberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'numberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'boolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
}
function hideTrialAnchorElement(){
  hideFormElement('trialAnchorId');
  hideFormElement('trialAnchorMessage');
  hideFormElement('trial_anchor_help');
}

function showTrialAnchorElement(){
  showFormElement('trialAnchorId');
  showFormElement('trialAnchorMessage');
  showFormElement('trial_anchor_help');
}

function deleteSelectedLocalTrialItems(formId, baseAction, message, selectAtleastOneItemMessage, trialAnchorMsg){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  var isAnchorEnable = isTrialAnchorEnabled(formId, "selectedObjects");
  if (isAnchorEnable) {
    setCurrentPageNumber(formId);
    submitForm(formId, baseAction, trialAnchorMsg);
  }
  else {
    setCurrentPageNumber(formId);
    submitForm(formId, baseAction, message);
  }
}

function isTrialAnchorEnabled(formId, targetElemName){
  var form = eval("document." + formId);
  var elems = form.elements;
  var numItemsSelected = 0;
  for ( var j = 0; j < elems.length; j++) {
    if ((elems[j].name == targetElemName) && elems[j].checked) {
      numItemsSelected = numItemsSelected + 1;
      var id = elems[j].value;
      var trialIdElt = eval("document." + formId + ".trialAnchorId" + id);
      var trialid = trialIdElt.value;
      if (trialid != null && trialid != '') {
        return true;
      }
    }
  }
  return false;
}

function hideFormElement(eltId){
  var el = document.getElementById(eltId);
  if (typeof el != 'undefined') {
    el.style.display = "none";
    el.value = "";
  }
}

function showFormElement(eltId){
  var el = document.getElementById(eltId);
  if (typeof el != 'undefined') {
    el.style.display = "";
  }
}
function licenseTechnologyType(formId){

  var gen_service = document.getElementById("gen_service_name");

  if (gen_service)  {

	  var value;
	  var form;
	  if (formId)
	    form = eval("document." + formId);
	  else
	    form = CreateLicenseTechnologyPageForm;

	  var elems = form.elements;
	  for ( var j = 0; j < elems.length; j++) {
	    if (elems[j].name == "licTechnologyType" && elems[j].checked) {
	      value = elems[j].value;
	      break;
	    }
	  }
	
	  if (value != '') {
	    if (value == 'Manual' || value == 'HandsFree') {
	      gen_service.style.display = "none";
		  $("#row_customerGeneratorServiceEndPoint").css("display", "none");
	    }
	    if (value == "UseCustomGenerator") {
	      gen_service.style.display = "";
		  $("#row_customerGeneratorServiceEndPoint").css("display", "none");
	    }
	  }
	  
	  var pt = document.getElementById("ExtSvcGenerator");
	  if (pt.checked == true)  {
		gen_service.style.display = "none";
		setCallOutsDisaplayStyle("none");
		$("#row_customerGeneratorServiceEndPoint").css("display", "");
		document.getElementsByName("customerGeneratorServiceEndPoint").item(0).value="";
		
	  }   
	  else {
		    if (value == 'Manual' || value == 'HandsFree') {
		        gen_service.style.display = "none";
				$("#row_customerGeneratorServiceEndPoint").css("display", "none");
		    }
		    if (value == "UseCustomGenerator") {
		       gen_service.style.display = "";
			   $("#row_customerGeneratorServiceEndPoint").css("display", "none");
		    }
			if (value == "ExtSvcGenerator") {
				$("#row_customerGeneratorServiceEndPoint").css("display", "");
			}
			setCallOutsDisaplayStyle("");
			document.getElementsByName("customGeneratorService").item(0).value="";
			document.getElementsByName("customGeneratorValidator").item(0).value="";
			document.getElementsByName("customLicenseConsolidator").item(0).value="";
			document.getElementsByName("customFilenameGenerator").item(0).value="";
			document.getElementsByName("customerGeneratorServiceEndPoint").item(0).value="";
	  }
  }
}

function setCallOutsDisaplayStyle  (value)  {
	$("#customGeneratorValidator").css("display", value);
	$("#customLicenseConsolidator").css("display", value);
	$("#customFilenameGenerator").css("display", value);
}

function openSetLicenseTextDialog(formId, baseAction, selectAtleastOneItemMessage, selectOneItemMessage, onHoldMessage){
  var form = eval("document." + formId);
  var id = "";
  var count = 0;
  for ( var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name == "selectedObjects" && form.elements[i].checked) {
      id = form.elements[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }

  if (count > 1) {
    alert(selectOneItemMessage);
    return;
  }

  if (count == 1) {
    var rowObj = document.getElementById("datarow_" + id);
    var tds = rowObj.getElementsByTagName("td");
    if (onHoldMessage != null) {
      var typecol = tds.item(1);
      var spanelem = typecol.getElementsByTagName("span")[0];
      if (spanelem) {
        var type = spanelem.childNodes.item(0).data;
        if (type != "H") {
          alert(onHoldMessage);
          return;
        }
      }
    }
  }

  setLicenseText(formId, 'setLicenseText_VIEW.do?fulfillType=fulfillment&fulfillId=' + id);
}

function setLicenseText(formId, baseAction){
  var form = eval("document." + formId);
  var selectwin = openPopupWindow('', 'setLicenseTextwin');
  form.action = baseAction;
  form.target = "setLicenseTextwin";
  form.submit();
}
function correctDisplayForSearchHostAttribute(attrType, index){
  if (attrType == 'TEXT') {
    // alert('in text');
    // show text spans and disable other spans
    var spanId = 'hoststringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'hoststringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'hostdateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hostdateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostnumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hostnumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostboolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
  else if (attrType == 'DATE') {
    // alert('in date');
    // show text spans and disable other spans
    var spanId = 'hoststringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hoststringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostdateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'hostdateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'hostnumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hostnumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostboolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
  else if (attrType == 'BOOLEAN') {
    // alert('in boolean');
    // show text spans and disable other spans
    var spanId = 'hoststringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hoststringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostdateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hostdateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostnumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hostnumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostboolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
  }
  else if (attrType == 'NUMBER') {
    // alert('in number');
    // show text spans and disable other spans
    var spanId = 'hoststringSpan_' + index;
    var spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hoststringVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostdateSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
    spanId = 'hostdateVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";

    spanId = 'hostnumberSpan_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";
    spanId = 'hostnumberVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "";

    spanId = 'hostboolVal_' + index;
    spanBox = document.getElementById(spanId);
    if (spanBox)
      spanBox.style.display = "none";
  }
}

function correctDisplayForSearchLineItemAttribute(attrType, index){
	  if (attrType == 'TEXT') {
	    // alert('in text');
	    // show text spans and disable other spans
	    var spanId = 'lineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	    spanId = 'lineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";

	    spanId = 'lineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	  }
	  else if (attrType == 'DATE') {
	    // alert('in date');
	    // show text spans and disable other spans
	    var spanId = 'lineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	    spanId = 'lineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";

	    spanId = 'lineItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	  }
	  else if (attrType == 'BOOLEAN') {
	    // alert('in boolean');
	    // show text spans and disable other spans
	    var spanId = 'lineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'linrItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	  }
	  else if (attrType == 'NUMBER') {
	    // alert('in number');
	    // show text spans and disable other spans
	    var spanId = 'lineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'lineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'lineItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	    spanId = 'lineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";

	    spanId = 'lineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	  }
	}

function correctDisplayForSearchMaintenanceLineItemAttribute(attrType, index){
	  if (attrType == 'TEXT') {
	    // alert('in text');
	    // show text spans and disable other spans
	    var spanId = 'mainLineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	    spanId = 'mainLineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";

	    spanId = 'mainLineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	  }
	  else if (attrType == 'DATE') {
	    // alert('in date');
	    // show text spans and disable other spans
	    var spanId = 'mainLineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	    spanId = 'mainLineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";

	    spanId = 'mainLineItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	  }
	  else if (attrType == 'BOOLEAN') {
	    // alert('in boolean');
	    // show text spans and disable other spans
	    var spanId = 'mainLineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLinrItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	  }
	  else if (attrType == 'NUMBER') {
	    // alert('in number');
	    // show text spans and disable other spans
	    var spanId = 'mainLineItemStringSpan_' + index;
	    var spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemStringVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemDateSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	    spanId = 'mainLineItemDateVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";

	    spanId = 'mainLineItemNumberSpan_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";
	    spanId = 'mainLineItemNumberVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "";

	    spanId = 'mainLineItemBoolVal_' + index;
	    spanBox = document.getElementById(spanId);
	    if (spanBox)
	      spanBox.style.display = "none";
	  }
	}

function submitLicenseHostsLandingPageForm(formId, baseAction, numSelItems, msg){
  var form = eval("document." + formId);
  if (numSelItems > 0) {
    var elems = form.elements;
    var numElems = elems.length;
    var count = 0;
    for ( var i = 0; i < numElems; i++) {
      if (elems[i].name == "selectedObjects" && elems[i].checked) {
        count = count + 1;
      }
    }
    if (count != numSelItems) {
      alert(msg);
      return;
    }
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}
function setLicenseForHost(formId, baseAction, msg){
  var form = eval("document." + formId);

  var elems = form.elements;
  var numElems = elems.length;
  var count = 0;
  var id = "";
  for ( var i = 0; i < numElems; i++) {
    if (elems[i].name == "selectedObjects" && elems[i].checked) {
      count = count + 1;
      id = elems[i].value;
    }
  }
  if (count != 1) {
    alert(msg);
    return;
  }
  baseAction = baseAction + "?hostId=" + id;
  var selectwin = openPopupWindow(baseAction, 'setLicensewin');
}
function openHostDetails(formId, id){
  var detailswin = window
      .open("hostDetails_VIEW.do?hostId=" + id, "dwin", "width=600,height=500,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  detailswin.focus();
}

function submitManualActivation(formId, url, fileMsg){
  var form = eval("document." + formId);
  var fileNameElm = form.elements['requestXMLFile'];
  if (typeof fileNameElm != 'undefined' && fileNameElm.value != '') {
    submitForm(formId, url);
  }
  else {
    alert("Please choose the Activation Request File");
  }
}

function changeStartDateOption(formId){
  var form;
  if (formId)
    form = eval("document." + formId);
  else
    form = document.ConfigureLineItemsForm;

  var startdateoptelem = document.getElementById("startDate_Option_Elem");
  if (startdateoptelem) {
    var val = startdateoptelem.options[startdateoptelem.selectedIndex].value;
    var startdatevalelem = document.getElementById("startDate_Value_Elem");
    if (startdatevalelem) {
      if (val == 'bo.constants.startdate.options.defineNow') {
        startdatevalelem.style.display = "";
      }
      else {
        startdatevalelem.style.display = "none";
      }
    }
  }
}
function transferLineItemSelectExistingFulfills(formId, baseAction, msg){
  var form = eval("document." + formId);
  var elems = form.elements;
  var numElems = elems.length;
  var count = 0;
  for ( var i = 0; i < numElems; i++) {
    if (elems[i].name == "selectedExisitngFulfillments" && elems[i].checked) {
      count = count + 1;
    }
  }
  if (count == 0) {
    alert(msg);
    return;
  }
  form.action = baseAction;
  form.target = "_self";
  form.submit();
}

function toggleUponRoles(formId, elemName, elemTobeSelected){
  var toCheck = false;
  form = eval("document." + formId);
  var isChecked = false;
  if (document.getElementById(elemName).checked) {
    document.getElementById(elemTobeSelected).checked = document.getElementById(elemName).checked;
  }
  else {

    for ( var i = 0; i < form.elements.length; i++) {
      var roleString = elemTobeSelected + "ROLE" + i;

      if (document.getElementById(roleString) != null) {
        if (document.getElementById(roleString).checked) {
          isChecked = true;
          break;
        }

      }
      roleString = "";

    }
    if (!isChecked) {
      document.getElementById(elemTobeSelected).checked = false;
    }
  }

}
function toggleRolesOnOrgs(formId, elemTobeSelected){
  var toCheck = false;
  form = eval("document." + formId);
  var isChecked = false;
  if (!document.getElementById(elemTobeSelected).checked) {

    for ( var i = 0; i < form.elements.length; i++) {
      var roleString = elemTobeSelected + "ROLE" + i;

      if (document.getElementById(roleString) != null) {
        document.getElementById(roleString).checked = false;

      }

    }

  }

}

function removeSelectedItems(formId, baseAction, message, selectAtleastOneItemMessage, name){
  form = eval("document." + formId);
  var num = getNumberOfItemsSelected(formId, "selectedObjects");
  if (num < 1) {
    alert(selectAtleastOneItemMessage);
    return;
  }
  setCurrentPageNumber(formId);
  if (name != '')
    message = message + ' ' + name;
  submitForm(formId, baseAction, message);
}

function handleClose(){
  window.close();
}
function showAllMaintenance(maintDataElemId, showLinkId, hideLinkId){
  var maintdataelem = document.getElementById(maintDataElemId);
  var showlinkelem = document.getElementById(showLinkId);
  var hidelinkelem = document.getElementById(hideLinkId);
  showlinkelem.style.display = "none";
  hidelinkelem.style.display = "";
  maintdataelem.style.display = "";
}
function hideAllMaintenance(maintDataElemId, showLinkId, hideLinkId){
  var maintdataelem = document.getElementById(maintDataElemId);
  var showlinkelem = document.getElementById(showLinkId);
  var hidelinkelem = document.getElementById(hideLinkId);
  showlinkelem.style.display = "";
  hidelinkelem.style.display = "none";
  maintdataelem.style.display = "none";
}
function submitBulkOperation(formId, fieldName, baseAction){
  var form = eval("document." + formId);
  var startTime = form.elements[fieldName].value;
  if (startTime != '') {
    var validTime = IsValidTime(startTime);
    if (validTime == false) {
      return;
    }
  }
  submitForm(formId, baseAction);
  ;
}
function openDevicesAdvancedSearch(formId, searchAction, currentItems){
  var advsearchwin = openPopupWindow("devicesAdvancedSearch_view.action?advSearchBean.parentForm=" + formId + "&advSearchBean.searchAction="
      + searchAction + "&advSearchBean.currentItems=" + currentItems, "advsearchwin");
}
function openMaintenanceLineItemDetails(formId, lineItemId){
  var mntdetailswin = window
      .open("/flexnet/operations/maintenanceItemDetails_view.action?maintenanceItem.id=" + lineItemId, "maintenanceItemDetailswin", "width=600,height=600,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
  mntdetailswin.focus();
}

function transferSelectedHosts(formId, baseAction, msg){
  var form = eval("document." + formId);

  var elems = form.elements;
  var numElems = elems.length;
  var count = 0;
  var id = "";
  for ( var i = 0; i < numElems; i++) {
    if (elems[i].name == "selectedObjects" && elems[i].checked) {
      if (count > 0) {
        id = id + ',';
      }
      id = id + elems[i].value;
      count = count + 1;
    }
  }
  if (count < 1) {
    alert(msg);
    return;
  }
  baseAction = baseAction + "?hostIds=" + id;
  window.location = baseAction;
}

function transferHost(formId, baseAction, msg){
  var form = eval("document." + formId);
  var val = form.targetOrgId.value;
  if (val == '') {
    alert(msg);
    return;
  }
  submitForm(formId, baseAction);
  ;

}

function doTransferLineItem(formId, baseAction, alertmsg, specifyTransferCountMsg, selectMatchingLineItemMsg){
  var form = eval("document." + formId);
  var transferCount = form.transferCount.value;
  if (Trim(transferCount) == '') {
    alert(specifyTransferCountMsg);
    return;
  }
  var matchSelected = '';
  var licount = 0;
  var elems = form.elements;
  for ( var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    if (elem.name == 'transferToMatchingLineItem' && elem.checked) {
      matchSelected = elem.value;
    }
    else if (elem.name == 'selectedLineItem' && elem.checked) {
      licount = licount + 1;
    }
  }
  if (matchSelected == 'yes' && licount != 1) {
    alert(selectMatchingLineItemMsg);
    return;
  }
  submitForm(formId, baseAction, alertmsg);
}

$(document).ready(function(){
    // datepicker
	$(".SimpleDateDetail").datepicker({
		dateFormat: "yy-mm-dd"
	});
	
	/* this condtion checks the disabling of copy to datawarehouse options for custom attribute */
	if($('input:radio[name="attrType"]').is(':disabled')){
			if($('input:checkbox[name=isNeededForReporting]').is(':checked')){
				$('input:checkbox[name=isNeededForReporting]').prop("disabled", true);
			}
	}

    // nav-tree expand/collapse
    $(".tier-heading").click(function(){
        var thisTier = $(this).closest(".tier-item");
        if(thisTier.hasClass("open")){
            thisTier.removeClass("open");
            $(this).find(".icn").removeClass("minus-alt").addClass("plus-alt");
        } else {
            thisTier.addClass("open");
            $(this).find(".icn").removeClass("plus-alt").addClass("minus-alt");
        }
        return false;
    });
}); 

// for create device model and server host types
function updateAllowedHostIdTypeCheckBox2(onload){
    var selectBox = document.getElementById("defHostIdType");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var id= "allHostIdTypes_"+selectedValue;
    document.getElementById(id).checked = true;
    
    for (var i=0;i<document.getElementsByName('allowedHostIdTypes.hostIdType').length;i++){
        document.getElementsByName("allowedHostIdTypes.hostIdType")[i].disabled = ""; 
        if(onload) document.getElementsByName("allowedHostIdTypes.hostIdType")[i].checked=true;
    }
    
    document.getElementById(id).disabled = "disabled";
    
}

//for create device model and server host types with click enable and disable
function updateAllowedHostIdTypeCheckBox(onload){
    var selectBox = document.getElementById("defHostIdType");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var sid= "allHostIdTypes_"+selectedValue;
    document.getElementById(sid).checked = true;
 
    for (var i=0;i<document.getElementsByName('allowedHostIdTypes.hostIdType').length;i++){
        if(onload) document.getElementsByName("allowedHostIdTypes.hostIdType")[i].checked=true;
        
		var checkedValue =document.getElementsByName("allowedHostIdTypes.hostIdType")[i].value;
       	var id ="allHostIdTypes_"+ checkedValue;
       	
   			if(id == sid){
   				$("#"+id).attr("disabled", true);
   			}else {
   				$("#"+id).attr("disabled", false);
   			}        
    }
        
}

// for edit device model and server host types
function checkAllowedHostIdTypesForEdit(){
	   for (var i=0;i<document.getElementsByName('editParameters.allowedHostIdTypes.hostIdType').length;i++){
		   if(document.getElementsByName("editParameters.allowedHostIdTypes.hostIdType")[i].checked){
			   var checkedValue =document.getElementsByName("editParameters.allowedHostIdTypes.hostIdType")[i].value;
	        	var id ="allHostIdTypes_"+ checkedValue;
	        	$("#"+id).attr("disabled", true);
		   }
	    }
}

// create device/server to refresh the hostIdType list
function updateHostIdTypes(url){  
	$.ajax({
		type : "GET",
		url : url,
		cache : false,
		dataType : "html",
		success : function(data) {	        			
		 	var idTypes = JSON.parse(data);
  		 	var defaultIdType = idTypes.defaultHostIdType;
		 	
 		 	var data = idTypes.supportedHostIdTypes.hostIdType;
			   	
		    var idTypeSelect = "<select name='hostIdType'>";	
 			for (var i = 0; i < data.length; i++) {
 			    var selected ="";
 			    if(defaultIdType == data[i]) selected ="selected";
 			   idTypeSelect +="<option value='"+ data[i] + "'" + selected + ">"+data[i] +"</option>";
 			    
 			}
			idTypeSelect +="<select>";
			$("#hostIdType").html(idTypeSelect);			
		},
		error: function(errMsg){
			alert("Failed to pull the list"+errMsg.status);
		}
	});
}

//Control the Required Symbol for Secret Answer field in Change Password Page based on the selected Secret question
function manageSecretAnswerRequiredSymbol(storedQuestion){	
	if(storedQuestion != ''){
		var secretQuestionSelectElement=document.getElementById("secretQuestionStyleId");
		var secretAns = document.getElementById("secretAnswer").value;
		var selectedQuestion=secretQuestionSelectElement.options[secretQuestionSelectElement.selectedIndex].value;
		
		//if selected question is null or it gets change and is not the same as the stored question then display the required text or else the optional text(FNO-59851)
		if(selectedQuestion == '' || selectedQuestion != storedQuestion){
			document.getElementById('secretQuestionHeaderNoteRequired').style.display = "block";
			document.getElementById('secretQuestionHeaderNoteOptional').style.display = "none";
		}
		else{
			document.getElementById('secretQuestionHeaderNoteRequired').style.display = "none";
			document.getElementById('secretQuestionHeaderNoteOptional').style.display = "block";
		}
		
		if(selectedQuestion != storedQuestion && secretAns == ''){
			document.getElementById('answerRequired').style.display = "block";
		}else{
			document.getElementById('answerRequired').style.display = "none";
		}
	}else{
		if(document.getElementById('secretQuestionHeaderNote') && document.getElementById('answerRequired')){
			document.getElementById('secretQuestionHeaderNote').style.display = "none";
			document.getElementById('answerRequired').style.display = "block";
		}		
	}
}

function encodePwd(){	
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	var newPassed = document.getElementsByName('newPasswd')[0].value;
	if(newPassed !== null && newPassed !== ''){
		var encodedString = Base64.encode(newPassed);
		document.getElementsByName('newPasswd')[0].value = encodedString;
	}
	var confirmPass = document.getElementsByName('confirmPasswd')[0].value;
	if(confirmPass !== null && confirmPass !== ''){
		var confString = Base64.encode(confirmPass);
		document.getElementsByName('confirmPasswd')[0].value = confString;
	}
	
	var oldPass = document.getElementsByName('oldPasswd')[0].value;
	if(oldPass !== null && oldPass !== ''){
		var oldString = Base64.encode(oldPass);
		document.getElementsByName('oldPasswd')[0].value = oldString;
	}
	document.changePasswordForm.submit();
}

function decodePwd(){
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	var newPassed = document.getElementsByName('newPasswd')[0].value;
	if(newPassed !== null && newPassed !== ''){
		var encodedString = Base64.decode(newPassed);
		document.getElementsByName('newPasswd')[0].value = encodedString;
	}
	
	var confirmPass = document.getElementsByName('confirmPasswd')[0].value;
	if(confirmPass !== null && confirmPass !== ''){
		var confString = Base64.decode(confirmPass);
		document.getElementsByName('confirmPasswd')[0].value = confString;
	}
	
	var oldPass = document.getElementsByName('oldPasswd')[0].value;
	if(oldPass !== null && oldPass !== ''){
		var oldString = Base64.decode(oldPass);
		document.getElementsByName('oldPasswd')[0].value = oldString;
	}
}

function encrypt(){	
	var loc = 'flexnetops';
	var iv = '6020ac1d06aaa80f860201c1154fb92b';
    var sug = '8839323602e4513fb474627d39d23d1e';
    
    var aesUtil = new AesUtil(128, 1000);    
    var newPassed = document.getElementsByName('newPasswd')[0].value;
	if(newPassed !== null && newPassed !== ''){
		var encodedString = aesUtil.encrypt(sug, iv, loc, newPassed);
		document.getElementsByName('newPasswd')[0].value = encodedString.toString();
	}
	var confirmPass = document.getElementsByName('confirmPasswd')[0].value;
	if(confirmPass !== null && confirmPass !== ''){
		var confString = aesUtil.encrypt(sug, iv, loc, confirmPass);
		document.getElementsByName('confirmPasswd')[0].value = confString.toString();
	}
	
	var oldPass = document.getElementsByName('oldPasswd')[0].value;
	if(oldPass !== null && oldPass !== ''){
		var oldString = aesUtil.encrypt(sug, iv, loc, oldPass);
		document.getElementsByName('oldPasswd')[0].value = oldString.toString();
	}
	document.changePasswordForm.submit();   
}
function decrypt(){	
	var loc = 'flexnetops';
	var iv = '6020ac1d06aaa80f860201c1154fb92b';
    var sug = '8839323602e4513fb474627d39d23d1e';
    
    var aesUtil = new AesUtil(128, 1000);
    
    var newPassed = document.getElementsByName('newPasswd')[0].value;
	if(newPassed !== null && newPassed !== ''){
		var encodedString =  aesUtil.decrypt(sug, iv, loc, newPassed);
		document.getElementsByName('newPasswd')[0].value = encodedString.toString();
	}
	
	var confirmPass = document.getElementsByName('confirmPasswd')[0].value;
	if(confirmPass !== null && confirmPass !== ''){
		var confString = aesUtil.decrypt(sug, iv, loc, confirmPass);
		document.getElementsByName('confirmPasswd')[0].value = confString.toString();
	}
	
	var oldPass = document.getElementsByName('oldPasswd')[0].value;
	if(oldPass !== null && oldPass !== ''){
		var oldString = aesUtil.decrypt(sug, iv, loc, oldPass);
		document.getElementsByName('oldPasswd')[0].value = oldString.toString();
	}
}
function decryptPassword(){
	var loc = 'flexnetops';
	var iv = '6020ac1d06aaa80f860201c1154fb92b';
    var sug = '8839323602e4513fb474627d39d23d1e';
    
    var aesUtil = new AesUtil(128, 1000);
	var encodedPasswd = document.getElementsByName('password')[0].value;
	if(encodedPasswd !== null && encodedPasswd !== ''){
		var decodedString = aesUtil.decrypt(sug, iv, loc, encodedPasswd);
		document.getElementsByName('password')[0].value = decodedString.toString();
	}
}

function submitSkipConfirmationForProductLines(formId, baseAction){
  form = eval("document." + formId);
  setCurrentPageNumber(formId);
  var message=null;
  var elems = document.getElementsByName('skipConfirmationObjects');
  for (j = 0; j < elems.length; j++) {
    if (!elems[j].checked) {
      document.getElementsByName('unskippedObjects')[j].checked = true;
    }
  }
  submitForm(formId, baseAction, message);
}
function decodeLoginPassword(){
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	var encodedPasswd = document.getElementsByName('password')[0].value;
	if(encodedPasswd !== null && encodedPasswd !== ''){
		var decodedString = Base64.decode(encodedPasswd);
		document.getElementsByName('password')[0].value = decodedString;
	}
}
//autocomplete functionality 
$( function() {
var isSource = false;
    $("input[name = 'targetOrgDisplayName']").autocomplete({
	
     	 source: function( request, response ) {
        $.ajax( {
          url: "entitlementOrders/autocomplete/accounts/"+ request.term +"/"+isSource ,
          dataType: "json",
          data: {
            term: request.term  
          },
          success: function( data ) {
            response( data );
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) { 
  			alert("Status: " + textStatus); alert("Error: " + errorThrown); 
  		  } 
  		  
        } );
      },
      minLength: 3,
      select: function( event, ui ) {
    	  setTimeout(function () {
  	        document.activeElement.blur();
  	    }, 10);  
      }
  
    } );
  } );

  $( function() {
 var isSource= true
  $("input[name = 'sourceOrgDisplayName']").autocomplete({
	 source: function( request, response ) {
   $.ajax( {
     url: "entitlementOrders/autocomplete/accounts/"+ request.term +"/"+isSource ,
     dataType: "json",
     data: {
       term: request.term
     },
     success: function( data ) {
       response( data );
     },
     error: function(XMLHttpRequest, textStatus, errorThrown) { 
			alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		  } 
		  
   } );
 },
 minLength: 3,
 select: function( event, ui ) {
	 setTimeout(function () {
	        document.activeElement.blur();
	    }, 10);   
 }

} );
  });