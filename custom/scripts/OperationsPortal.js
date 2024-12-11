/*Create a short namespace - ep - for enterprise portal*/
var ep = {
	lineItemDetailsPopup: function(lineItemId) {
	    var detailswin = window.open(
                "/flexnet/operationsportal/lineItemDetails_VIEW.do?lineItemId=" + lineItemId,
                "dwin",
                "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
       detailswin.focus();		
    },
    toggleCheckBoxes: function(elId,className){
    	var selectAllCheckBox = document.getElementById(elId);
		var checkboxes = document.getElementsByClassName(className);
		for(var i=0;i<checkboxes.length;i++){
			if(selectAllCheckBox.checked===true)
				checkboxes[i].checked = true;
			else
				checkboxes[i].checked = false;
		}
    }
};

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));





function toggleAll(formId, elemName, selAllElemName) {
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
    var org = $("#orgSet option:selected").val();
	var selected = [];
	$('input:checked[name="selectedObjects"]').each(function() {
		selected.push($(this).attr('value'));
	});
	var url = '/flexnet/operationsportal/getCustomAttributesForselectedPartNumbers.do?org='+org+'&partNumbers='+selected;
	$('#customAttributes').load(url);
}

function openSupportLicensesAdvancedSearch(formId, searchAction, baseAction) {
    var advsearchwin = openPopupWindow(
            "supportLicensesAdvancedSearch_VIEW.do?parentForm=" + formId
                    + "&searchAction=" + searchAction, "advsearchwin");
}

function openBulkEntitlementsAdvancedSearch(formId, searchAction) {
    var advsearchwin = openPopupWindow(
            "bulkentitlementsAdvancedSearch_VIEW.do?parentForm=" + formId
                    + "&searchAction=" + searchAction, "advsearchwin");
}

function openViewWebRegKeys(formId, selectOneItemMessage) {
    form = eval("document." + formId);
    var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num != 1) {
        alert(selectOneItemMessage);
        return;
    }
    var id = getSelectedObject(formId, "selectedObjects");

    var webregkeyswin = openPopupWindow(
            "viewWebRegKeys_VIEW.do?parentId=" + id, "webregkeys");
}

function openPrint(formId, url, selectAtleastOneItemMessage) {
    form = eval("document." + formId);
    var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num < 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }
    var printdia = window
            .open(
                    "",
                    "printDialog",
                    "width=800,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=yes");
    form.target = "printDialog";
    form.action = url;
    form.submit();
    printdia.focus();
}

function openCertificate(formId, url, selectAtleastOneItemMessage) {
    form = eval("document." + formId);
    var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num != 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }
    var printdia = window
            .open(
                    "",
                    "certificateDialog",
                    "width=800,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=yes");
    form.target = "certificateDialog";
    form.action = url;
    form.submit();
    printdia.focus();
}

function openEmail(formId, url, selectAtleastOneItemMessage) {
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

function openFulfillmentPrint(formId, url, selectAtleastOneItemMessage) {
    form = eval("document." + formId);
    var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num < 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }
    var printdia = window
            .open(
                    "",
                    "printDialog",
                    "width=850,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes,menubar=yes");
    form.target = "printDialog";
    form.action = url;
    form.submit();
    printdia.focus();
}
function openPackages(formId, url, selectAtleastOneItemMessage,selectAllSameOrg,selectAllHasDownloads,downloadsLabel) {
    form = eval("document." + formId);
	var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num < 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }
	var hasAtleastOnePackage=false;
	var listOfActIds = new Array();
	var soldToArr = new Array();
	var acctId='';
    for ( var i = 0; i < form.elements.length; i++) {
		var hasPackage=true;
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
            id = form.elements[i].value;
			
			var thDownloads= $('th:contains('+downloadsLabel+')');
			if(thDownloads.index()!=-1){
				var rowObj = document.getElementById("datarow_" + id);
				var tds = rowObj.getElementsByTagName("td");
				var downloadscol = tds.item(thDownloads.index());
				if (downloadscol != null && downloadscol.getElementsByTagName("span")) {
					var spanelem = downloadscol.getElementsByTagName("span")[0];
					if (spanelem) {
						var hasDownloads = spanelem.childNodes.item(0).data;
						if (hasDownloads !== 'true') {
							hasPackage = false;
						}else{
							hasAtleastOnePackage= true;
						}
				}
			}else{
				hasPackage = false;
			}
			var soldToIds = document.getElementsByName('soldToId'+id);
			if(soldToIds.length >0 ){
				acctId = document.getElementsByName('soldToId'+id)[0].value;
			}else{
				acctId = "EMPTY";
			}	
			listOfActIds.push(document.getElementsByName('activationId'+id)[0].value + ":" +acctId+ ":" +hasPackage);
        }
    }
	}
	if(!hasAtleastOnePackage){
				alert($("#"+selectAllHasDownloads).text());
				return;
			}
	  viewPackages(url,listOfActIds,acctId);
  
}
function getNumberOfItemsSelected(formId, targetElemName) {
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

function getNumberOfOptionsSelected(formId, targetElemName) {
    var form = eval("document." + formId);
    var elems = form.elements;
    var numItemsSelected = 0;
    for ( var j = 0; j < elems.length; j++) {
        if (elems[j].name == targetElemName) {
            var select = elems[j];
            if (select.selectedIndex > -1) {
                numItemsSelected = numItemsSelected + 1;
            }
        }
    }
    return numItemsSelected;
}

function performSimpleSearch(formId, baseAction, selectCategoryMessage) {
    form = eval("document." + formId);
    if (selectCategoryMessage) {
        if (form.searchCategory) {
            if (form.searchCategory.type.indexOf("select") != -1) {
                if (form.searchCategory.selectedIndex == 0) {
                    alert(selectCategoryMessage);
                    return;
                }
            }
        }
    }
    submitForm(formId, baseAction);
}

/**
 * Capture "enter" key and perform simple search if pressed
 */
function searchOnEnterKey(myForm, myEvent, myURL, myMsg) {
    myEvent = (myEvent) ? myEvent : ((window.event) ? window.event : "");
    if (myEvent) {
        if (myEvent.keyCode == 13 || myEvent.which == 13) {
            return performSimpleSearch(myForm, myURL, myMsg);
        }
    } else {
        return true;
    }
}

/**
 * Capture "enter" key and open form if pressed
 */
function submitFormOnEnterKey(myForm, myEvent, myURL, myMsg) {
    myEvent = (myEvent) ? myEvent : ((window.event) ? window.event : "");
    if (myEvent) {
        if (myEvent.keyCode == 13 || myEvent.which == 13) {
            return submitForm(myForm, myURL);
        }
    } else {
        return true;
    }
}

/**
 * Capture on change event
 */
function submitFormOnChange(myForm,  myURL) {
   return submitForm(myForm, myURL);
}


function submitForm(formId, baseAction, message) {
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

function getSelectedObject(formId, targetElemName) {
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

function sendSelectedItem(formId, baseAction, selectOneItemMessage) {
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

function setCurrentPageNumber(formId) {
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
        } else {
            pageNumElem.value = 1;
        }
    }
    if (nextPageElem)
        nextPageElem.value = -1;
    if (prevPageElem)
        prevPageElem.value = -1;
}

function cancelForm(formId, baseAction, message) {
    var cancelYN = confirm(message);
    if (cancelYN == true) {
        window.location = baseAction;
    }
}

function clearSearch(formId, fieldName) {
    form = eval("document." + formId);
    if (fieldName) {
        form.elements[fieldName].value = "";
    } else {
        form.searchPhrase.value = "";
    }
}

function resetSearch(formId, baseAction, fieldName) {
    form = eval("document." + formId);
    if (fieldName) {
        form.elements[fieldName].value = "";
    } else {
        form.searchPhrase.value = "";
    }
    setCurrentPageNumber(formId);
    submitForm(formId, baseAction);
}

function clearField(fieldName) {
    var field = document.getElementById(fieldName);
    field.value = "";
}

function clearSelectedOrgOrOwner(formId, fieldName, hiddenField) {
    form = eval("document." + formId);
    form.elements[fieldName].value = "";
    form.elements[hiddenField].value = "";
}

function submitFormInTargetFrame(formId, targetFrameName, targetFormName,
        targetElemName, targetAction, selectAtleastOneItemMessage) {
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

function changeExpirationRadioSelection(selection) {
    var duration_radio = document.getElementById("duration_radio");
    var expiration_date_radio = document
            .getElementById("expiration_date_radio");
    if (selection == "DURATION") {
        duration_radio.checked = true;
        expiration_date_radio.checked = false;
    } else {
        duration_radio.checked = false;
        expiration_date_radio.checked = true;
    }
}

function activateLineItems(formId, selectAtleastOneItemMessage, trustedMessage) {
    var form = eval("document." + formId);
    var id = "";
    var trusteditems = 0;
    var count = 0;
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
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

function activateShortCode(formId, selectAtleastOneItemMessage, trustedMessage,
        oneItemSelect) {
    var form = eval("document." + formId);
    var id = "";
    var trusteditems = 0;
    var count = 0;
    var activationId = "";
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
            id = form.elements[i].value;
            count = count + 1;
            var rowObj = document.getElementById("datarow_" + id);
            var tds = rowObj.getElementsByTagName("td");
            var typecol = tds.item(1);
            if (typecol.getElementsByTagName("span")) {
                var spanelem = typecol.getElementsByTagName("span")[0];
                if (spanelem) {
                    var type = spanelem.childNodes.item(0).data;
                    type = type.replace(/\s/g, "");
                    if (type == "T") {
                        trusteditems = trusteditems + 1;
                        var elt = eval("document." + formId + ".activationId"
                                + id);
                        if (typeof elt != 'undefined') {
                            activationId = elt.value;
                        }
                    } else {
                    }
                }
            }
        }
    }
    if (count < 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }

    if (count > 1) {
        alert(oneItemSelect);
        return;
    }

    /*
     * if (trusteditems <= 0) { alert(trustedMessage); return; }
     */
    form.target = "_self";
    form.action = "shortCodeActivationPage_VIEW.do?webRegisterKey="
            + activationId;
    form.submit();
}

function shortCodeSupportLicensesActions(formId, baseAction,
        selectAtleastOneItemMessage, trustedMessage, oneItemSelect) {
    var form = eval("document." + formId);
    var id = "";
    var trusteditems = 0;
    var count = 0;
    var activationId = "";
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
            id = form.elements[i].value;
            count = count + 1;
            var rowObj = document.getElementById("datarow_" + id);
            var tds = rowObj.getElementsByTagName("td");
            var typecol = tds.item(1);
            if (typecol.getElementsByTagName("span")) {
                var spanelem = typecol.getElementsByTagName("span")[0];
                if (spanelem) {
                    var type = spanelem.childNodes.item(0).data.replace(/\t/g,
                            '');
                    type = type.replace(/\n/g, '');

                    if (type == "T") {
                        trusteditems = trusteditems + 1;
                        var elt = eval("document." + formId + ".activationId"
                                + id);
                        if (typeof elt != 'undefined') {
                            activationId = elt.value;
                        }
                    }
                }
            }
        }
    }
    if (count < 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }

    if (count > 1) {
        alert(oneItemSelect);
        return;
    }

    /*
     * if (trusteditems <= 0) { alert(trustedMessage); return; }
     */
    form.target = "_self";
    form.action = baseAction + "?webRegisterKey=" + activationId
            + "&selectedFid=" + id;
    form.submit();
}

function activateManual(formId, selectAtleastOneItemMessage, trustedMessage) {
    var form = eval("document." + formId);
    form.target = "_self";
    form.action = "manualActivation_VIEW.do";
    form.submit();
}

function submitFormToURL(formId, url) {
    var form = eval("document." + formId);
    form.target = "_self";
    form.action = url;
    form.submit();
}

function addHostId(formId) {
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
    el.setAttribute('id', 'hostid_' + iteration);
    el.setAttribute('size', '30');
    el.setAttribute('class', 'form');
    cellRight.appendChild(el);
}

function removeHostIds(formId) {
    var tbl = document.getElementById('hostIdTable');
    var lastRow = (tbl.rows.length) - 1;
    if (lastRow > 1)
        tbl.deleteRow(lastRow - 1);
}

function generateLicense(formId, baseAction, enterOneOrThreeHostIdsMessage,
        requireddFulfillCountMessage, invalidserveridmeg, invalidnodeidmsg) {
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
        var validserverid = "true";
        if (serverid1 != "") {
            numservidsentered = numservidsentered + 1;
            serverid1 = Trim(serverid1);
            var idindex = serverid1.toLowerCase().indexOf("id=");
            if (MatchIgnoreCase(serverid1, 'demo')
                    || MatchIgnoreCase(serverid1, 'any') || idindex == 0) {
                validserverid = "false";
            }
        }
        if (serverid2 != "") {
            numservidsentered = numservidsentered + 1;
            serverid2 = Trim(serverid2);
            var idindex = serverid1.toLowerCase().indexOf("id=");
            if (MatchIgnoreCase(serverid2, 'demo')
                    || MatchIgnoreCase(serverid2, 'any') || idindex == 0) {
                validserverid = "false";
            }
        }
        if (serverid3 != "") {
            numservidsentered = numservidsentered + 1;
            serverid3 = Trim(serverid3);
            var idindex = serverid1.toLowerCase().indexOf("id=");
            if (MatchIgnoreCase(serverid3, 'demo')
                    || MatchIgnoreCase(serverid3, 'any') || idindex == 0) {
                validserverid = "false";
            }
        }
        if (numservidsentered == 2) {
            alert(enterOneOrThreeHostIdsMessage);
            return;
        }

        if (validserverid == "false") {
            alert(invalidserveridmeg);
            return;
        }
    }
    if (tbl) {
        var numrows = (tbl.rows.length) - 1;
        var vaildnodelockedids = "true";
        for ( var i = 1; i <= numrows; i++) {
            var elemname = "hostid_" + i;
            var nodeidelem = document.getElementById(elemname);
            if (nodeidelem) {
                var elemval = nodeidelem.value;
                elemval = Trim(elemval);
                var idindex = elemval.toLowerCase().indexOf("id=");
                if (MatchIgnoreCase(elemval, 'demo')
                        || MatchIgnoreCase(elemval, 'any') || idindex == 0) {
                    vaildnodelockedids = "false";
                    break;
                }
            }
        }

        if (vaildnodelockedids == "false") {
            alert(invalidnodeidmsg);
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

function MatchIgnoreCase(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    if (str1 == str2) {
        return true;
    } else {
        return false;
    }
}

function saveLicenseToFile(formId, baseAction) {
    var form = eval("document." + formId);

    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function showSelectedFulfillment(formId, baseAction) {
    var form = eval("document." + formId);
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function submitSupportLicensesForm(formId, actionType, baseAction, message,
        selectAtleastOneItemMessage, selectOneItemMessage, trustedMessage,
        obsoleteMessage, selectTwoItemMessage, selectBatchRehostMessage) {
    var form = eval("document." + formId);
    if (doValidationForSubmitSupportLicensesForm(formId, actionType,
            baseAction, message, selectAtleastOneItemMessage,
            selectOneItemMessage, trustedMessage, obsoleteMessage,
            selectTwoItemMessage, selectBatchRehostMessage)) {
        form.action = baseAction;
        form.target = "_self";
        form.submit();
    }
}

function doValidationForSubmitSupportLicensesForm(formId, actionType,
        baseAction, message, selectAtleastOneItemMessage, selectOneItemMessage,
        trustedMessage, obsoleteMessage, selectTwoItemMessage,
        selectBatchRehostMessage) {
    var form = eval("document." + formId);
    var id = "";
    var selectedIds = new Array();
    var count = 0;
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
            id = form.elements[i].value;
            selectedIds[count] = id;
            count = count + 1;
        }
    }
    if (actionType == "repairLicense" || actionType == "returnLicense"
            || actionType == "upgradeLicense" || actionType == "upsellLicense"
            || actionType == "renewLicense" || actionType == "rehostLicense"
            || actionType == "emailFulfillments"
            || actionType == "viewShipmentRecords"
            || actionType == "saveToFile") {
        if (actionType != "emailFulfillments" && actionType != "rehostLicense"
                && actionType != "returnLicense" && count != 1) {
            alert(selectOneItemMessage);
            return false;
        }
        if (actionType == "rehostLicense") {
            if (count > 1) {
                alert(selectBatchRehostMessage);
                return false;
            } else if (count < 1) {
                alert(selectOneItemMessage);
                return false;
            }
        }
        if (actionType == "emailFulfillments" && count < 1) {
            alert(selectAtleastOneItemMessage);
            return false;
        } else {
            for ( var i = 0; i < selectedIds.length; i++) {
                var rowObj = document.getElementById("datarow_"
                        + selectedIds[i]);
                var tds = rowObj.getElementsByTagName("td");
                if (obsoleteMessage != null || trustedMessage != null) {
                    var typecol = tds.item(1);
                    var spanelem = typecol.getElementsByTagName("span")[0];
                    if (spanelem) {
                        var type = spanelem.childNodes.item(0).textContent;

                        if (type == "I" && obsoleteMessage != null) {
                            if (actionType == "saveToFile"
                                    || actionType == "emailFulfillments") {
                            } else {
                                alert(obsoleteMessage);
                                return false;
                            }
                        }
                        if (type == "H" && obsoleteMessage != null) {
                            alert(obsoleteMessage);
                            return false;
                        }
                        if (type == "T" && trustedMessage != null) {
                            alert(trustedMessage);
                            return false;
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

function openShipmentRecordsDialog(formId, actionType, baseAction, message,
        selectAtleastOneItemMessage, selectOneItemMessage, trustedMessage,
        obsoleteMessage, selectTwoItemMessage) {
    if (doValidationForSubmitSupportLicensesForm(formId, actionType,
            baseAction, message, selectAtleastOneItemMessage,
            selectOneItemMessage, trustedMessage, obsoleteMessage,
            selectTwoItemMessage, null)) {
        var form = eval("document." + formId);
        var id = "";
        for ( var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].name == "selectedObjects"
                    && form.elements[i].checked) {
                id = form.elements[i].value;
                break;
            }
        }
        showShipmentRecords(formId,
                'showShipmentRecords_VIEW.do?fulfillType=fulfillment&fulfillId='
                        + id);
    }
}

function submitConsolidatedLicensesLandingForm(formId, actionType, baseAction,
        message, selectAtleastOneItemMessage, selectOneItemMessage,
        obsoleteMessage, selectTwoItemMessage) {
    var form = eval("document." + formId);
    var id = "";
    var selectedIds = new Array();
    var count = 0;
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
            id = form.elements[i].value;
            selectedIds[count] = id;
            count = count + 1;
        }
    }

    if (actionType == "saveToFile" || actionType == "previewEmail"
            || actionType == "rehost") {
        if (actionType == "saveToFile" && count != 1) {
            alert(selectOneItemMessage);
            return;
        } else if (actionType == "rehost" && count != 1) {
            alert(selectOneItemMessage);
            return;
        } else if (actionType == "previewEmail" && count < 1) {
            alert(selectAtleastOneItemMessage);
            return;
        } else {
            for (i = 0; i < selectedIds.length; i++) {
                var selectedId = selectedIds[i];
                var rowObj = document.getElementById("datarow_" + selectedId);
                var tds = rowObj.getElementsByTagName("td");
                if (obsoleteMessage != null) {
                    var typecol = tds.item(1);
                    var spanelem = typecol.getElementsByTagName("span")[0];
                    var type = spanelem.childNodes.item(0).data;

                    if (type == "I") {
                        if (actionType == "saveToFile"
                                || actionType == "previewEmail") {
                        } else {
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

function showHelpLink(linkName) {
    url = "/flexnet/contextHelp.do?module=operations&helpId=" + linkName;
    showHelp(url);
}
/*
 * Sridevi: Copied this code to open the getting started guide pdf file from
 * http://www.codingforums.com/showpost.php?p=81575&postcount=2
 */
function openDoc(filename, target) {

    // to ensure no global variable conflict with other script
    var strWinHandle = target + "objDocWin";

    // just focus to the corresponding window if it is already open
    if (window[strWinHandle] && !window[strWinHandle].closed) {
        window[strWinHandle].focus();
        return false;
    }

    // open blank page
    window[strWinHandle] = window.open('', target,
            'menubar=1,location=0,toolbar=0,resizable=1,status=0');

    // change window name (target); later, target will be used as frame name
    window[strWinHandle].name = strWinHandle;

    // create frameset with only 1 frame
    var strHTML = '<html>\r\n<head>\r\n';
    strHTML += '<title>' + filename.substring(filename.lastIndexOf("/") + 1)
            + '</title>\r\n';
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
    setTimeout('loadDoc("' + strWinHandle + '","' + target + '","' + filename
            + '")', 0);

    return false; // this cancels href of the calling link
}

function loadDoc(strWinHandle, target, filename) {
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
    doc.onerror = function() {
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

function showEmailPreview(formId, baseAction) {
    var form = eval("document." + formId);
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function sendEmail(formId, baseAction, invalidEmailMsg) {
    var form = eval("document." + formId);
    var contacts = form.shipToEmail.value;
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

function selectEmailContacts(formId, baseAction, property, orgId,
        isMultipleSelection) {
    var form = eval("document." + formId);
    var targetAction = baseAction + "?orgId=" + orgId + "&parentFormName="
            + formId + "&property=" + property;

    if (isMultipleSelection == "true") {
        targetAction = targetAction + "&multipleSelection=true";
    }
    var selectwin = openPopupWindow(targetAction, 'contactswin');
}

function showEmailContacts(formId, baseAction, property, isMultipleSelection,
        soldtoIdFieldName) {
    var form = eval("document." + formId);
    var orgId = '';
    if (soldtoIdFieldName) {
        orgId = form.elements[soldtoIdFieldName].value;
    } else {
        orgId = form.soldToId.value;
    }
    selectEmailContacts(formId, baseAction, property, orgId,
            isMultipleSelection);
}

function checkeEmailAddress(emailId) {
    var isValid;
    var filter ='';
    // var
    // filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    //var filter = /^[0-9a-z_\.-]+@(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z][0-9a-z-]*[0-9a-z]\.)+[a-z]{1,10})$/i;
    if(isValidateEmailAddressRegexEnabled){
     filter = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    else{
	 filter = /^[0-9a-z_\.-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
	}
    if (filter.test(emailId)) {
        isValid = true;
    } else {
        isValid = false;
    }
    return isValid;
}

function parseEmailContactsString(InString, Sep) {
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

function makeArray(NumElements, Fill) {
    var Count;
    this.length = NumElements;
    for (Count = 1; Count <= NumElements; Count++) {
        this[Count] = Fill;
    }
    return (this);
}

function openPopupWindow(url, winname, siz) {
    var winoptions = [ "directories=no", "location=no", "menubar=no",
            "personalbar=no", "status=no", "toolbar=no", "resizable=yes",
            "scrollbars=yes" ];
    if (siz == null)
        siz = 70;
    var popupwnd = window.open(url, winname, winoptions.join(","));

    popupwnd.resizeTo(680, screen.height * siz / 100);
    popupwnd.moveTo(screen.width * 15 / 100, screen.height * 10 / 100);
    popupwnd.focus();

    return popupwnd;
}

function openPopupWindowForFulfillments(url, winname, siz) {
    var winoptions = [ "directories=no", "location=no", "menubar=no",
            "personalbar=no", "status=no", "toolbar=no", "resizable=yes",
            "scrollbars=yes" ];
    if (siz == null)
        siz = 70;
    var popupwnd = window.open(url, winname, winoptions.join(","));

    popupwnd.resizeTo(950, screen.height * siz / 100);
    popupwnd.moveTo(screen.width * 15 / 100, screen.height * 10 / 100);
    popupwnd.focus();

    return popupwnd;
}

function openTopWindow(url) {
    var topWindow = window.open(url, "_top");
    return true;
}

function showShipmentRecords(formId, baseAction) {
    var form = eval("document." + formId);
    var selectwin = openPopupWindow('', 'shipmentRecordswin');
    form.action = baseAction;
    form.target = "shipmentRecordswin";

    form.submit();
}

function openLineItemsAdvancedSearch(formId, searchAction, baseAction) {
    var advsearchwin = openPopupWindow(
            "activatableItemsAdvancedSearch_VIEW.do?parentForm=" + formId
                    + "&searchAction=" + searchAction, "advsearchwin");
}
function saveSearchCriteria(formId) {
    form = eval(formId);
    form.submit();
}
function openBulkEntitlementDetails(formId, entId) {
    var detailswin = window
            .open(
                    "bulkEntitlementDetails_VIEW.do?id=" + entId,
                    "dwin",
                    "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
    detailswin.focus();
}

function openFulfillmentDetails(formId, fulfillId) {
    var detailswin = window
            .open(
                    "fulfillmentDetails_VIEW.do?fulfillId=" + fulfillId,
                    "dwin",
                    "width=600,height=700,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
    detailswin.focus();
}

function openConsolidatedLicenseDetails(formId, conLicId) {
    var detailswin = openPopupWindow(
            "consolidatedLicenseDetails_VIEW.do?consolidatedRecId=" + conLicId,
            "dwin");
    detailswin.focus();
}

function doEntitlementsSorting(formId, sortUrl, sortColumnName) {
    var form = eval("document." + formId);
    form.elements['sortColumnKey'].value = sortColumnName;
    form.action = sortUrl;
    form.target = "_self";
    form.submit();
}

function LTrim(str) {
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
function RTrim(str) {
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
function Trim(str) {
    return RTrim(LTrim(str));
}

function showConsolidatedLicenseShipmentRecords(formId, baseAction, message) {
    var form = eval("document." + formId);
    var count = 0;
    var str = "";
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
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

function showShipmentRecordsFromConsolidatedLicSummary(formId, baseAction) {
    var form = eval("document." + formId);
    var selectwin = openPopupWindow('', 'shipmentRecordswin');
    form.action = baseAction;
    form.target = "shipmentRecordswin";

    form.submit();
}

function showSelectedConsolidatedLicense(formId, baseAction) {
    var form = eval("document." + formId);
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function showConsolidatedFulfillments(formId, baseAction, message) {
    var form = eval("document." + formId);
    var count = 0;
    var str = "";
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
            str = form.elements[i].value;
            count = count + 1;
        }
    }
    if (count != 1) {
        alert(message);
        return;
    }

    baseAction = baseAction + "?consolidatedLicenseId=" + str;
    var selectwin = openPopupWindowForFulfillments('', 'shipmentRecordswin');
    // var selectwin = window.open('','shipmentRecordswin',[]);
    form.action = baseAction;
    form.target = "shipmentRecordswin";

    form.submit();
}

function showOpenConsolidations(formId, baseAction) {
    var form = eval("document." + formId);
    var selectwin = openPopupWindow('', 'openLicwin');
    form.action = baseAction;
    form.target = "openLicwin";

    form.submit();
}

function showOpenFulfillments(formId, baseAction) {
    var form = eval("document." + formId);
    var selectwin = openPopupWindow('', 'openLicwin');
    form.action = baseAction;
    form.target = "openLicwin";

    form.submit();
}
function addCountedNodeLockedHostId(formId, serveridindex) {
    var tbl = document.getElementById('ServerHost_' + serveridindex
            + '_NodelockedHostIdTable');
    var lastRow = (tbl.rows.length) - 1;
    var iteration = lastRow + 1;
    var row = tbl.insertRow(lastRow);
    row.style.backgroundColor = "#FFFFFF";

    var cellLeft = row.insertCell(0);
    cellLeft.style.width = "20";
    var textNode = document.createTextNode(" ");
    cellLeft.appendChild(textNode);

    var cellRight = row.insertCell(1);

    var atag = "<a href=\"JavaScript:removeNodeLockedHost('"
            + formId
            + "','batchActivationConfigureHosts_REMOVE_NODELOCKED_HOST.do','ServerHost_"
            + serveridindex + "_hostid_" + iteration + "')\">remove</a>";
    cellRight.innerHTML = '<input type="text" name="ServerHost_'
            + serveridindex + '_hostid_' + iteration
            + '" size="30" class="form">&nbsp;' + atag;
}

function addNodeLockedHostId(formId) {
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

    var atag = "<a href=\"JavaScript:removeNodeLockedHost('"
            + formId
            + "','batchActivationConfigureHosts_REMOVE_NODELOCKED_HOST.do','hostid_"
            + iteration + "')\">remove</a>";
    cellRight.innerHTML = '<input type="text" name="hostid_' + iteration
            + '" size="30" class="form">&nbsp;' + atag;
}

function addServerHost(formId, labelForHosts) {
    var tbl = document.getElementById('ServerHostsTable');
    var lastRow = (tbl.rows.length);
    var iteration = lastRow + 1;
    var row = tbl.insertRow(lastRow);
    var cell = row.insertCell(0);
    cell.setAttribute('nowrap', 'yes');

    var htmlcontent = '<span class="formLabel">' + labelForHosts
            + ':&nbsp;</span>';
    htmlcontent = htmlcontent + '<input type="text" name="serverhost_'
            + iteration + '_1" value="" size="15" class="form"/>&nbsp;';
    htmlcontent = htmlcontent + '<input type="text" name="serverhost_'
            + iteration + '_2" value="" size="15" class="form"/>&nbsp;';
    htmlcontent = htmlcontent + '<input type="text" name="serverhost_'
            + iteration + '_3" value="" size="15" class="form"/>&nbsp;';
    htmlcontent = htmlcontent + '<a href="JavaScript:removeServerHost(\''
            + formId
            + '\', \'batchActivationConfigureHosts_REMOVE_SERVER_HOST.do\', \''
            + iteration + '\');">remove</a>';

    cell.innerHTML = htmlcontent;
}

function submitBatchActivationConfigureHostsForm(formId, baseAction) {
    var form = eval("document." + formId);
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function removeServerHost(formId, baseAction, serveridindex) {
    var form = eval("document." + formId);
    form.elements['serverIdToBeDeleted'].value = serveridindex;
    submitBatchActivationConfigureHostsForm(formId, baseAction);
}

function removeNodeLockedHost(formId, baseAction, fieldname) {
    var form = eval("document." + formId);

    form.elements['nodelockedIdToBeDeleted'].value = fieldname;
    submitBatchActivationConfigureHostsForm(formId, baseAction);
}

function selectUpgradeLineItemPageHandleNext(formId, baseAction, msg) {
    var form = eval("document." + formId);
    var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num != 1) {
        alert(msg);
        return;
    }
    var selActId = "";
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
            selActId = form.elements[i].value;
            break;
        }
    }
    form.upgradeActivationId.value = selActId;
    form.target = "_self";
    form.action = baseAction;
    form.submit();
}

function addHost(formId, baseAction) {
    var form = eval("document." + formId);
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function addNLCountedHost(formId, serverIndex, baseAction) {
    var form = eval("document." + formId);
    baseAction = baseAction + "?serverHostIndex=" + serverIndex;
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function changeServerHostType(formId, selectId, spanId) {
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
        if (selval != 'DEMO' && selval != 'ANY') {
            spanBox.style.display = "";
        } else {
            spanBox.style.display = "none";
        }
    }
}

function removeServerHost(formId, selectIndex, baseAction) {
    var form = eval("document." + formId);
    baseAction = baseAction + "?removeIndex=" + selectIndex;
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function removeCountedNodeLockedHost(formId, serverIndex, nlIndex, baseAction) {
    var form = eval("document." + formId);
    baseAction = baseAction + "?removeIndex=" + nlIndex + "&serverHostIndex="
            + serverIndex;
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function isSpecifyHostIds(val) {
    var oel = document.getElementById("ServerHostsTable");
    if (oel) {
        if (val == 'yes')
            oel.style.display = "";
        else
            oel.style.display = "none";
    }
}

function collapseServer(formId, serverIndex) {
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

    var fieldName = 'redundantServerValue(redundantServer_' + serverIndex
            + '_1)';
    var elems = form.elements;
    var numelems = elems.length;
    for ( var i = 0; i < numelems; i++) {
        if (elems[i].name == fieldName) {
            elems[i].value = 'false';
            break;
        }
    }
}

function expandServer(formId, serverIndex) {
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

    var fieldName = 'redundantServerValue(redundantServer_' + serverIndex
            + '_1)';
    var elems = form.elements;
    var numelems = elems.length;
    for ( var i = 0; i < numelems; i++) {
        if (elems[i].name == fieldName) {
            elems[i].value = 'true';
            break;
        }
    }
}

function hideNlHostsTextBoxes() {
    var form = document.forms[0];
    for ( var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var elementName = element.name;
        if (elementName != null) {
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
}

function searchForOrgUnit(formId, baseAction, targetAction, targetInputField,
        showInfoNotAvailableOrgUnit, relatedOrgsType, targetDisplayField,
        displayCustomers, displayPartners, displayPublishers,
        displaySelfRegisteredOrgs) {
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
        baseAction = baseAction + "&showInfoNotAvailableOrgUnit="
                + showInfoNotAvailableOrgUnit;
    }
    if (relatedOrgsType) {
        baseAction = baseAction + "&relatedOrgsType=" + relatedOrgsType;
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
        baseAction = baseAction + "&displaySelfRegisteredOrgs="
                + displaySelfRegisteredOrgs;
    }

    var selectwin = openPopupWindow(baseAction, 'orgunitwin');
}

function searchForOwner(formId, baseAction, targetAction, targetInputField,
        targetDisplayField, soldToIdFieldName) {
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
    } else {
        soldToIdField = form.elements['soldToId'];
    }
    if (soldToIdField) {
        baseAction = baseAction + "&overrideSoldTo=" + soldToIdField.value;
    }
    var selectwin = openPopupWindow(baseAction, 'ownerwin');
}

function mapActivationIds(formId, targetUrl) {
    var form = eval("document." + formId);
    form.action = targetUrl;
    form.target = "_self";
    form.submit();
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

function activationAttributesOnLoad(formId) {
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

function searchForLicenseHost(formId, baseAction, targetAction, isServerHost,
        isSingleSelect, lineItemId, fulfillmentId, soldTo, owner,
        allLicenseHosts, licTechId, hostTypeId) {
    var form = eval("document." + formId);
    baseAction = baseAction + "?parentFormName=" + formId + "&isServerType="
            + isServerHost;
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
function createLicenseHost(formId, baseAction, targetAction, isServerHost,
        lineItemId, fulfillmentId, soldTo, owner, licTechId, hostTypeId) {
    var form = eval("document." + formId);
    baseAction = baseAction + "?parentFormName=" + formId + "&isServerType="
            + isServerHost;
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
function deleteSelectedlicenseHosts(formId, baseAction, message,
        selectAtleastOneItemMessage, objName) {
    form = eval("document." + formId);
    var num = getNumberOfOptionsSelected(formId, objName);
    if (num < 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }
    // setCurrentPageNumber(formId);
    submitForm(formId, baseAction, message);
}

function addCustomAttributeSearch(formId, targetUrl) {
    var form = eval("document." + formId);
    form.action = targetUrl;
    form.target = "_self";
    form.submit();
}

function removeSearchAttribute(formId, attrIndex, targetUrl) {
    var form = eval("document." + formId);
    form.action = targetUrl + '?removeAttribute=' + attrIndex;
    form.target = "_self";
    form.submit();
}
function removeSearchHostAttribute(formId, attrIndex, targetUrl) {
    var form = eval("document." + formId);
    form.action = targetUrl + '?removeHostAttribute=' + attrIndex;
    form.target = "_self";
    form.submit();
}
function changeSearchLicenseAttribute(formId, selectId, index) {
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

function changeSearchHostAttribute(formId, selectId, index) {
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

function changeSearchMainLineItemAttribute(formId, selectId, index){
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
	    correctDisplayForSearchMainLineItemAttribute(attrType, index);

	  }
}

function correctDisplayForSearchAttributeOnLoad() {
    var form = document.forms[0];
    for ( var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var elementName = element.name;
        if (elementName != null) {
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
}

function correctDisplayForSearchHostAttributeOnLoad() {
    var form = document.forms[0];
    for ( var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var elementName = element.name;
        if (elementName != null) {
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
}

function correctDisplayForSearchHostAttributeOnLoadStruts2() {
    var form = document.forms[0];
    for ( var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var elementName = element.name;
        if (elementName != null) {
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

function correctDisplayForSearchAttribute(attrType, index) {
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
    } else if (attrType == 'DATE') {
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
    } else if (attrType == 'BOOLEAN') {
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
    } else if (attrType == 'NUMBER') {
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
function goToThePage(pageUrl) {
    if (pageUrl) {
        window.location = pageUrl;
    }
}
function correctDisplayForSearchHostAttribute(attrType, index) {
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
    } else if (attrType == 'DATE') {
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
    } else if (attrType == 'BOOLEAN') {
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
    } else if (attrType == 'NUMBER') {
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

function correctDisplayForSearchMainLineItemAttribute(attrType, index){
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

function addNewUser(formId, baseAction, msg1, msg2) {

    if (!validateOrganizationFields(formId, msg1, msg2)) {
        return;
    }
    form = eval("document." + formId);

    submitForm(formId, baseAction);
}

function addUser(formId, baseAction, selectAtleastOneItemMessage) {
    form = eval("document." + formId);
    var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num < 1) {
        alert(selectAtleastOneItemMessage);
        return;
    }
    setCurrentPageNumber(formId);
    submitForm(formId, baseAction);
}

function addExistingOrg(formId, baseAction, msg1, msg2, msg3, msg4, msg5, msg6, isSingleMode) {

    if (!validateUserFields(formId, msg1, msg2, msg3, msg4, msg5, msg6,isSingleMode)) {
        return;
    }
    form = eval("document." + formId);

    submitForm(formId, baseAction);
}
function addNewOrganization(formId, baseAction, msg1, msg2) {

    form = eval("document." + formId);

    submitForm(formId, baseAction);
}

function addNewSubOrganization(formId, baseAction, selectOneItemMessage) {
    form = eval("document." + formId);
    var num = getNumberOfItemsSelected(formId, "selectedObjects");
    if (num < 1) {
        alert(selectOneItemMessage);
        return;
    }
    submitForm(formId, baseAction);
}

function validateOrganizationFields(formId, orgNameReqmsg, displayNameReqMsg) {
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

function validateUserFields(formId, firstNameReqmsg, lastNameReqMsg,
        emailAddressMsg, userNameReqmsg, invalidEmailMsg, invaliduserNameMsg, isSingleMode) {
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

    } else {
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
    	 if(isSingleMode==true){
	        if (form.userName != null) {
	            var userName = form.userName.value;
	            if (Trim(userName) == '') {
	                alert(userNameReqmsg);
	                return false;
	            }
	        }
    	 }
    }
    return true;
}

/*
 * Launch Advanced Search Popup for Manage Organizations
 */
function openManageOrgsAdvancedSearch(formId, searchAction, baseAction,
        currentItemsType) {
    /* Assume "customerOrganization" default if coming from somewhere else */
    if (currentItemsType == null) {
        var currentItemsType = "customerOrgs";
    }
    var parentFormName = "ManageOrganizationsLandingPageForm";
    var parentForm = window.document.forms[parentFormName];
    /* Or, use current form if its the proper landing page */
    if (parentForm != null) {
        currentItemsType = parentForm.currentItemsType.value;
    }
    var advsearchwin = openPopupWindow(
            "/flexnet/operationsportal/manageOrganizationsAdvancedSearch_VIEW.do?parentForm=" + formId
                    + "&searchAction=" + searchAction + "&currentItemsType="
                    + currentItemsType, "advsearchwin");
}

/*
 * Launch Advanced Search Popup for Manage Users
 */
function openManageUsersAdvancedSearch(formId, searchAction, baseAction,
        currentItemsType) {
    /* Assume "customerUser" default if coming from somewhere else */
    if (currentItemsType == null) {
        currentItemsType = "customerUsers";
    }
    var parentFormName = "ManageUsersLandingPageForm";
    var parentForm = window.document.forms[parentFormName];
    /* Or, use current form if its the proper landing page */
    if (parentForm != null) {
        currentItemsType = parentForm.currentItemsType.value;
    }
    var advsearchwin = openPopupWindow(
            "/flexnet/operationsportal/manageUsersAdvancedSearch_VIEW.do?parentForm=" + formId
                    + "&searchAction=" + searchAction + "&currentItemsType="
                    + currentItemsType, "advsearchwin");
}
function transferLineItem(formId, baseAction, msg) {
    var form = eval("document." + formId);
    var count = 0;
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
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
function openRoleDetails(roleId) {
    var detailswin = window
            .open(
                    "viewRole_VIEW.do?roleId=" + roleId,
                    "dwin",
                    "width=800,height=800,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
    detailswin.focus();
}
function deleteSelectedItems(formId, baseAction, message,
        selectAtleastOneItemMessage, checkBoxName) {
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
function toggleUponRoles(formId, elemName, elemTobeSelected) {
    var toCheck = false;
    form = eval("document." + formId);
    var isChecked = false;
    if (document.getElementById(elemName).checked) {
        document.getElementById(elemTobeSelected).checked = document.getElementById(elemName).checked;
    } else {

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
function openHostDetails(formId, id) {
    var detailswin = window
            .open(
                    "hostDetails_VIEW.do?hostId=" + id,
                    "dwin",
                    "width=600,height=500,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
    detailswin.focus();
}

function toggleRolesOnOrgs(formId, elemTobeSelected) {
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

function removeSelectedItems(formId, baseAction, message,
        selectAtleastOneItemMessage, name) {
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
function showAllMaintenance(maintDataElemId, showLinkId, hideLinkId) {
    var maintdataelem = document.getElementById(maintDataElemId);
    var showlinkelem = document.getElementById(showLinkId);
    var hidelinkelem = document.getElementById(hideLinkId);
    showlinkelem.style.display = "none";
    hidelinkelem.style.display = "";
    maintdataelem.style.display = "";
}
function hideAllMaintenance(maintDataElemId, showLinkId, hideLinkId) {
    var maintdataelem = document.getElementById(maintDataElemId);
    var showlinkelem = document.getElementById(showLinkId);
    var hidelinkelem = document.getElementById(hideLinkId);
    showlinkelem.style.display = "";
    hidelinkelem.style.display = "none";
    maintdataelem.style.display = "none";
}

function doTransferLineItem(formId, baseAction, alertmsg,
        specifyTransferCountMsg, selectMatchingLineItemMsg) {
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
        } else if (elem.name == 'selectedLineItem' && elem.checked) {
            licount = licount + 1;
        }
    }
    if (matchSelected == 'yes' && licount != 1) {
        alert(selectMatchingLineItemMsg);
        return;
    }
    submitForm(formId, baseAction, alertmsg);
}

function obtainSingleSelection(form, elemName, selectAnItemMessage,
        selectOneItem) {
    var selectedId = '';
    var count = 0;

    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == elemName && form.elements[i].checked) {
            selectedId = form.elements[i].value;
            count++;
        }
    }

    if (count < 1) {
        alert(selectAnItemMessage);
        return;
    }
    if (count > 1) {
        alert(selectOneItem);
        return;
    }

    return selectedId;
}
function writeHelptexts() {
    $(".ih_wrapper").remove();

    $("img[helptext]").add("input:password[helptext]").each(
            function() {
                $(this).after(
                        "<div class='ih_wrapper'><div class='input-help'>"
                                + $(this).attr("helptext") + "</div></div>");
                $(this).hover(function() {
                    $(this).parent().children(".ih_wrapper").fadeIn("fast");
                }, function() {
                    $(this).parent().children(".ih_wrapper").hide();
                });
            });
    $(".ih_wrapper").hide();
}
$(document).ready(function() {
    writeHelptexts();
});

function doTransferLineItem(formId, baseAction, alertmsg,
        specifyTransferCountMsg, selectMatchingLineItemMsg) {
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
        } else if (elem.name == 'selectedLineItem' && elem.checked) {
            licount = licount + 1;
        }
    }
    if (matchSelected == 'yes' && licount != 1) {
        alert(selectMatchingLineItemMsg);
        return;
    }
    submitForm(formId, baseAction, alertmsg);
}
function openDevicesAdvancedSearch(formId, searchAction, currentItemsType,
        baseAction) {
    baseWindow = window;
    /* Assume "clientDevice" default if coming from somewhere else */
    if (currentItemsType == null) {
        currentItemsType = "clientDevice";
    }
    var parentFormName = "DevicesLandingPageForm";
    var parentForm = window.document.forms[parentFormName];
    /* Or, use current form if its the proper landing page */
    if (parentForm != null) {
        currentItemsType = parentForm.currentItemsType.value;
    }
    var advsearchwin = openPopupWindow(
            "devicesAdvancedSearch_view.action?advSearchBean.parentForm="
                    + formId + "&advSearchBean.searchAction=" + searchAction
                    + "&advSearchBean.currentItems=" + currentItemsType,
            "advsearchwin");
}
function doSorting(formId, sortUrl, sortColumnName) {
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
function openMaintenanceLineItemDetails(formId, lineItemId) {
    var mntdetailswin = window
            .open(
                    "/flexnet/operationsportal/maintenanceItemDetails_view.action?maintenanceItem.id="
                            + lineItemId,
                    "maintenanceItemDetailswin",
                    "width=600,height=600,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
    mntdetailswin.focus();
}

function generateLicenseForHost(formId, baseAction, msg) {
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
    form.action = baseAction;
    form.target = "_self";
    form.submit();
}

function setLicenseForHost(formId, baseAction, msg) {
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

    var selectwin = openPopupWindowForFulfillments(baseAction, 'setLicensewin');
}

function openHostDetails(formId, id) {
    var detailswin = window
            .open(
                    "hostDetails_VIEW.do?hostId=" + id,
                    "dwin",
                    "width=600,height=500,location=no,titlebar=no,toolbar=no,resizable=yes,scrollbars=yes");
    detailswin.focus();
}
function submitLicenseHostsLandingPageForm(formId, baseAction, numSelItems, msg) {
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

function selectChannelPartner(formId, baseAction, targetAction,
        canCreateEndCustomer, warningMessage) {
    if (warningMessage) {
        if (!confirm(warningMessage)) {
            return;
        }
    }

    baseAction = baseAction + "?cpBean.targetAction=" + targetAction
            + "&cpBean.targetFormName=" + formId;
    if (canCreateEndCustomer && canCreateEndCustomer != 'null') {
        baseAction = baseAction + "&cpBean.showEndCustomerTier="
                + canCreateEndCustomer;
    }
    var selectwin = openPopupWindow(baseAction, 'channelPartnerwin');
    return;
}

function doSplitLineItem(formId, baseAction, alertmsg, specifySplitCountMsg,
        selectMatchingLineItemMsg) {
    var form = eval("document." + formId);
    var splitCount = form.elements['splitBean.splitAmount'].value;
    if (Trim(splitCount) == '') {
        alert(specifySplitCountMsg);
        return;
    }
    var matchSelected = '';
    var licount = 0;
    var elems = form.elements;
    for ( var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (elem.name == 'splitBean.splitToMatchingItem' && elem.checked) {
            matchSelected = elem.value;
        } else if (elem.name == 'splitBean.selectedMatchLi' && elem.checked) {
            licount = licount + 1;
        }
    }
    if (matchSelected == 'true' && licount != 1) {
        alert(selectMatchingLineItemMsg);
        return;
    }
    submitForm(formId, baseAction, alertmsg);
}

function openCreateTrustedHostDialog(formId, targetAct) {
    var lichostwin = openPopupWindow(
            "createTrustedHost_view.action?targetFormName=" + formId
                    + "&targetAction=" + targetAct, "createlicenseHostwin", 50,
            50);
}

function activateTrustedLineItems(formId, selectAtleastOneItemMessage) {
    var form = eval("document." + formId);
    var trusteditems = 0;
    var count = 0;
    for ( var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name == "selectedObjects"
                && form.elements[i].checked) {
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


function handleClose() {
    window.close();
}

function transferSelectedHosts(formId, baseAction, msg) {
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

function transferHost(formId, baseAction, msg) {
    var form = eval("document." + formId);
    var val = form.targetOrgId.value;
    if (val == '') {
        alert(msg);
        return;
    }
    submitForm(formId, baseAction);
    ;

}

function addExistingHostToUnifiedHost(formId, baseAction, msg) {
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
    baseAction = baseAction + "&hostId=" + id;
    window.location = baseAction;
}

$(document).ready(function(){

    
	if(Cookies.get('popCheck') == null && $('#headerHelpLink').length) {
        $('body').append('<div id="flash" class="flash-message flash-is-warning popup-check">' + popupStr + '<button class="dismiss icon-data-inputs-fail icon-medium" title="Dismiss"></button></div>');
        $('#flash').slideDown();
    }
    
    $("#flash .dismiss").on('click', function(){
        $(this).fadeOut();
        $("#flash").slideUp('',function(){
            $(this).remove();
            if($(this).hasClass('popup-check')){
            	  Cookies.set('popCheck', true, Infinity, '/');
            }
        });
    });

	// hijack the goToday function so it inserts todays date rather than just selecting it
	$.datepicker._gotoToday = function(id) {
	    var target = $(id);
	    var inst = this._getInst(target[0]);
	    if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
	            inst.selectedDay = inst.currentDay;
	            inst.drawMonth = inst.selectedMonth = inst.currentMonth;
	            inst.drawYear = inst.selectedYear = inst.currentYear;
	    }
	    else {
	            var date = new Date();
	            inst.selectedDay = date.getDate();
	            inst.drawMonth = inst.selectedMonth = date.getMonth();
	            inst.drawYear = inst.selectedYear = date.getFullYear();
	            // the below two lines are new
	            this._setDateDatepicker(target, date);
	            this._selectDate(id, this._getDateDatepicker(target));
	    }
	    this._notifyChange(inst);
	    this._adjustDate(target);
	}

    // jQuery datepicker config
    $(".SimpleDateDetail").datepicker({
		beforeShow: function(input, inst) { $('#ui-datepicker-div').addClass('notranslate'); },
        showButtonPanel: true,
        showOn: "button",
        buttonImage: "/flexnet/resources/operationsportal/date-trigger.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd",
        showOtherMonths: true,
        selectOtherMonths: true
    });
    
    
    // Vertical nav expand/collapse with state
    if ($('#nav-side').length) {
        $('#nav-side .nav-column-heading').click(
            function() {

            	var navId = $(this).closest('.nav-column').attr('id');
                
                if ($(this).hasClass("expand")) {
                    $(this).removeClass('expand').addClass('collapse');
                    $(this).closest('.nav-column').find('ul').show();
                   Cookies.set(navId, 'collapse',{ expires: Infinity, path: '/'} );
                    return false;
                } else {
                    $(this).removeClass('collapse').addClass('expand');
                    $(this).closest('.nav-column').find('ul').hide();
                   Cookies.set(navId, 'expand',{ expires: Infinity, path: '/'} );
                    return false;
                }
            });
    }

    // nav-tree expand/collapse
    $(".tier-heading").click(function(){
        var thisTier = $(this).closest(".tier-item");
        if(thisTier.hasClass("open")){
            thisTier.removeClass("open");
            $(this).find(".icon-small").removeClass("icon-grid-collapse-small").addClass("icon-grid-add");
        } else {
            thisTier.addClass("open");
            $(this).find(".icon-small").removeClass("icon-grid-add").addClass("icon-grid-collapse-small");
        }
        return false;
    });

    (function(delay){
        var showTip;
        $(".inline-help, .inline-preview").hover(
            function(){
                toolTip = $(this);
                showTip = window.setTimeout(function() {
                    toolTip.addClass("open");
                }, delay);
            },
            function(){
                $(this).removeClass("open");
                window.clearTimeout(showTip);
            }
        );
    })(300);
});


/**
 * menu-aim is a jQuery plugin for dropdown menus that can differentiate
 * between a user trying hover over a dropdown item vs trying to navigate into
 * a submenu's contents.
 *
 * menu-aim assumes that you have are using a menu with submenus that expand
 * to the menu's right. It will fire events when the user's mouse enters a new
 * dropdown item *and* when that item is being intentionally hovered over.
 *
 * __________________________
 * | Monkeys  >|   Gorilla  |
 * | Gorillas >|   Content  |
 * | Chimps   >|   Here     |
 * |___________|____________|
 *
 * In the above example, "Gorillas" is selected and its submenu content is
 * being shown on the right. Imagine that the user's cursor is hovering over
 * "Gorillas." When they move their mouse into the "Gorilla Content" area, they
 * may briefly hover over "Chimps." This shouldn't close the "Gorilla Content"
 * area.
 *
 * This problem is normally solved using timeouts and delays. menu-aim tries to
 * solve this by detecting the direction of the user's mouse movement. This can
 * make for quicker transitions when navigating up and down the menu. The
 * experience is hopefully similar to amazon.com/'s "Shop by Department"
 * dropdown.
 *
 * Use like so:
 *
 *      $("#nav-top").menuAim({
 *          activate: $.noop,  // fired on row activation
 *          deactivate: $.noop  // fired on row deactivation
 *      });
 *
 *  ...to receive events when a menu's row has been purposefully (de)activated.
 *
 * The following options can be passed to menuAim. All functions execute with
 * the relevant row's HTML element as the execution context ('this'):
 *
 *      .menuAim({
 *          // Function to call when a row is purposefully activated. Use this
 *          // to show a submenu's content for the activated row.
 *          activate: function() {},
 *
 *          // Function to call when a row is deactivated.
 *          deactivate: function() {},
 *
 *          // Function to call when mouse enters a menu row. Entering a row
 *          // does not mean the row has been activated, as the user may be
 *          // mousing over to a submenu.
 *          enter: function() {},
 *
 *          // Function to call when mouse exits a menu row.
 *          exit: function() {},
 *
 *          // Selector for identifying which elements in the menu are rows
 *          // that can trigger the above events. Defaults to "> li".
 *          rowSelector: "> li",
 *
 *          // You may have some menu rows that aren't submenus and therefore
 *          // shouldn't ever need to "activate." If so, filter submenu rows w/
 *          // this selector. Defaults to "*" (all elements).
 *          submenuSelector: "*",
 *
 *          // Direction the submenu opens relative to the main menu. Can be
 *          // left, right, above, or below. Defaults to "right".
 *          submenuDirection: "right"
 *      });
 *
 * https://github.com/kamens/jQuery-menu-aim
*/
(function($) {

    $.fn.menuAim = function(opts) {
        // Initialize menu-aim for all elements in jQuery collection
        this.each(function() {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var $menu = $(this),
            activeRow = null,
            mouseLocs = [],
            lastDelayLoc = null,
            timeoutId = null,
            activationTimeoutId = undefined,
            options = $.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 70,  // bigger = more forgivey when entering submenu
                enter: $.noop,
                exit: $.noop,
                activate: $.noop,
                deactivate: $.noop,
                exitMenu: $.noop,
                activationDelay: 150
            }, opts);

        var MOUSE_LOCS_TRACKED = 3,  // number of past mouse locations to track
            DELAY = 300;  // ms delay when user appears to be entering submenu

        /**
         * Keep track of the last few locations of the mouse.
         */
        var mousemoveDocument = function(e) {
                mouseLocs.push({x: e.pageX, y: e.pageY});

                if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                    mouseLocs.shift();
                }
            };

        /**
         * Cancel possible row activations when leaving the menu entirely
         */
        var mouseleaveMenu = function() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                // If exitMenu is supplied and returns true, deactivate the
                // currently active row on menu exit.
                if (options.exitMenu(this)) {
                    if (activeRow) {
                        options.deactivate(activeRow);
                    }

                    activeRow = null;
                }
            };

        /**
         * Trigger a possible row activation whenever entering a new row.
         */
        var mouseenterRow = function() {
                if (timeoutId) {
                    // Cancel any previous activation delays
                    clearTimeout(timeoutId);
                }

                options.enter(this);
                possiblyActivate(this);
            },
            mouseleaveRow = function() {

                if(activationTimeoutId){
                   clearTimeout(activationTimeoutId);
                   activationTimeoutId = undefined;
                }

                options.exit(this);
            };

        /*
         * Immediately activate a row if the user clicks on it.
         */
        var clickRow = function() {
                activate(this);
            };

        /**
         * Activate a menu row.
         */
        var activate = function(row) {
                if (row == activeRow) {
                    return;
                }

                // if (activeRow) {
                //     options.deactivate(activeRow);
                // }

                // options.activate(row);
                // activeRow = row;

                if(options.activationDelay > 0) {
                    if(activationTimeoutId) {
                        clearTimeout(activationTimeoutId);
                    }
                    activationTimeoutId = setTimeout(reallyActivate, options.activationDelay);
                } else {
                   reallyActivate();
                }

                function reallyActivate() {
                   if (activeRow) {
                       options.deactivate(activeRow);
                   }

                   options.activate(row);
                   activeRow = row;
                }

            };

        /**
         * Possibly activate a menu row. If mouse movement indicates that we
         * shouldn't activate yet because user may be trying to enter
         * a submenu's content, then delay and check again later.
         */
        var possiblyActivate = function(row) {
                var delay = activationDelay();

                if (delay) {
                    timeoutId = setTimeout(function() {
                        possiblyActivate(row);
                    }, delay);
                } else {
                    activate(row);
                }
            };

        /**
         * Return the amount of time that should be used as a delay before the
         * currently hovered row is activated.
         *
         * Returns 0 if the activation should happen immediately. Otherwise,
         * returns the number of milliseconds that should be delayed before
         * checking again to see if the row should be activated.
         */
        var activationDelay = function() {
                if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                    // If there is no other submenu row already active, then
                    // go ahead and activate immediately.
                    return 0;
                }

                var offset = $menu.offset(),
                    upperLeft = {
                        x: offset.left,
                        y: offset.top - options.tolerance
                    },
                    upperRight = {
                        x: offset.left + $menu.outerWidth(),
                        y: upperLeft.y
                    },
                    lowerLeft = {
                        x: offset.left,
                        y: offset.top + $menu.outerHeight() + options.tolerance
                    },
                    lowerRight = {
                        x: offset.left + $menu.outerWidth(),
                        y: lowerLeft.y
                    },
                    loc = mouseLocs[mouseLocs.length - 1],
                    prevLoc = mouseLocs[0];

                if (!loc) {
                    return 0;
                }

                if (!prevLoc) {
                    prevLoc = loc;
                }

                if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
                    prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                    // If the previous mouse location was outside of the entire
                    // menu's bounds, immediately activate.
                    return 0;
                }

                if (lastDelayLoc &&
                        loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                    // If the mouse hasn't moved since the last time we checked
                    // for activation status, immediately activate.
                    return 0;
                }

                // Detect if the user is moving towards the currently activated
                // submenu.
                //
                // If the mouse is heading relatively clearly towards
                // the submenu's content, we should wait and give the user more
                // time before activating a new row. If the mouse is heading
                // elsewhere, we can immediately activate a new row.
                //
                // We detect this by calculating the slope formed between the
                // current mouse location and the upper/lower right points of
                // the menu. We do the same for the previous mouse location.
                // If the current mouse location's slopes are
                // increasing/decreasing appropriately compared to the
                // previous's, we know the user is moving toward the submenu.
                //
                // Note that since the y-axis increases as the cursor moves
                // down the screen, we are looking for the slope between the
                // cursor and the upper right corner to decrease over time, not
                // increase (somewhat counterintuitively).
                function slope(a, b) {
                    return (b.y - a.y) / (b.x - a.x);
                };

                var decreasingCorner = upperRight,
                    increasingCorner = lowerRight;

                // Our expectations for decreasing or increasing slope values
                // depends on which direction the submenu opens relative to the
                // main menu. By default, if the menu opens on the right, we
                // expect the slope between the cursor and the upper right
                // corner to decrease over time, as explained above. If the
                // submenu opens in a different direction, we change our slope
                // expectations.
                if (options.submenuDirection == "left") {
                    decreasingCorner = lowerLeft;
                    increasingCorner = upperLeft;
                } else if (options.submenuDirection == "below") {
                    decreasingCorner = lowerRight;
                    increasingCorner = lowerLeft;
                } else if (options.submenuDirection == "above") {
                    decreasingCorner = upperLeft;
                    increasingCorner = upperRight;
                }

                var decreasingSlope = slope(loc, decreasingCorner),
                    increasingSlope = slope(loc, increasingCorner),
                    prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                    prevIncreasingSlope = slope(prevLoc, increasingCorner);

                if (decreasingSlope < prevDecreasingSlope &&
                        increasingSlope > prevIncreasingSlope) {
                    // Mouse is moving from previous location towards the
                    // currently activated submenu. Delay before activating a
                    // new menu row, because user may be moving into submenu.
                    lastDelayLoc = loc;
                    return DELAY;
                }

                lastDelayLoc = null;
                return 0;
            };

        /**
         * Hook up initial menu events
         */
        $menu
            .mouseleave(mouseleaveMenu)
            .find(options.rowSelector)
                .mouseenter(mouseenterRow)
                .mouseleave(mouseleaveRow)
                .click(clickRow);

        $(document).mousemove(mousemoveDocument);

    };
})(jQuery);

(function (window, document, $, Modernizr, undefined) {
      'use strict';

/*
      var sticky = (function () {
            var $menu;
            var $window = $(window);
            var navOffset = 0;
            var smallHeight = 46 + 2; // the height of the menu when stuck + 2px stripe

            return {
                  init: function () {
                        var that = this;
                        $menu = $('#nav-top);

                        if ($menu.length === 0) {
                              // menu not active on this page
                              return;
                        }

                        navOffset = $menu.offset().top + $menu.height() - smallHeight;

                        // set up a scroll listener to see if the menu needs to stick
                        $window.scroll(function () {
                              that.check();
                        });

                        // check initial position of the page
                        that.check();
                  },

                  check: function () {
                        var currentOffset = $window.scrollTop(),
                              adhere = currentOffset > navOffset;

                        $menu.toggleClass('sticky', adhere);
                  }
            };
      })();
*/
      var menuActions = (function () {

            //
            // Menu control.
            //
            // These control the main menu and the system menus. All reveal their
            // child items on hover. The main menu uses the menuAim plugin to allow
            // imprecise mouse tracking when showing/hiding children. The system menus
            // don't need this and just use CSS hover.
            //
            // All menus support toggling when touched. On devices supporting the Touch Events
            // spec, this uses the simulated click. On devices supporting the newer Pointer Events
            // spec, we only allow toggling from a touch, not from other types of interaction (mouse, pen).
            //

            var navVisibleClass = 'nav-show'; // the name of the class that toggles fat nav visibility
            var touchPointerEvent = false; // set when for touch presses when pointer events are supported

            function init() {
                  $('#nav-top > ul').menuAim({
                        activate: activateMenuItem,
                        deactivate: deactivateMenuItem,
                        exitMenu: exitMenu,
                        submenuDirection: 'below',
                        tolerance: 160
                  }).find('> li')
                        .off('click');

                  var mainMenuItemSelector = '#nav-top > ul > li';
                  var menuItemSelector = '#system-settings-menu-id, #header-user-module, ' + mainMenuItemSelector;

                  if (Modernizr.pointerevents) {

                        $(mainMenuItemSelector)
                              .on('pointerover pointerout MSPointerOver MSPointerOut', signalPointerTouchEvent);

                        $(menuItemSelector)
                              .on('pointerup MSPointerUp', handlePointerTouch); // using pointer up for better responsiveness; the click event is triggered on a delay

                  } else if (Modernizr.touch) {
                        $(menuItemSelector).on('touchstart', handleTouch);
                  }
            }

            function activateMenuItem(item) {
                  /// <summary>Called by menuAim when a menu item is determined to be activated.</summary>
                  /// <param name="item" type="Element">The item activated.</param>
                  var $item = $(item);
                  if (!touchPointerEvent) {
                        $item.addClass(navVisibleClass);
                  }
            }

            function deactivateMenuItem(item) {
                  /// <summary>Called by menuAim when a menu item is determined to be deactivated.</summary>
                  /// <param name="item" type="Element">The item to deactivate.</param>
                  $(item).removeClass(navVisibleClass);
            }

            function exitMenu(menuElement) {
                  /// <summary>Called by menuAim when it determines that the user's pointer has left the menu area.</summary>
                  /// <param name="menuElement" type="Element">The main menu element.</param>
                  if (touchPointerEvent) {
                        // turn the touch event flag off, and prevent the plugin from calling deactivate
                        touchPointerEvent = false;
                        return false;
                  }
                  return true;
            }

            function signalPointerTouchEvent(e) {
                  /// <param name="e" type="jQuery.Event">The click event args</param>
                  if (isTouchPointerAction(e)) {
                        // try to prevent compatibility mouse events from firing
                        e.preventDefault();

                        // set a flag for menuAim callbacks to check
                        touchPointerEvent = true;
                  }
            }

            function toggleMenuItem(item) {
                  $(item)
                        .siblings()
                              .removeClass(navVisibleClass)
                              .end()
                        .toggleClass(navVisibleClass);
            }

            function handlePointerTouch(e) {
                  if (isTouchPointerAction(e)) {
                        // toggle menu on touch
                        toggleMenuItem(e.delegateTarget);
                  }
            }

            function handleTouch(e) {

                  // don't perform extra toggle handling for the links in the menu
                  if (e.target &&
                              e.target.nodeName.toLowerCase() === 'a') {
                        return;
                  }

                  // stop mouse events firing to avoid clash with menuAim
                  e.preventDefault();

                  // toggle menu on touch
                  toggleMenuItem(e.delegateTarget);
            }

            function isTouchPointerAction(event) {
                  /// <param name="e" type="jQuery.Event">The pointer event args</param>
                  var originalEvent = event.originalEvent || event,
                        pointerType = (originalEvent.pointerType || originalEvent.msPointerType);

                  var pointerTypeTouch = // this is a shim for various spec versions
                        originalEvent.POINTER_TYPE_TOUCH ||
                        originalEvent.MSPOINTER_TYPE_TOUCH ||
                        "touch"; // the final version just uses a literal string

                  return (pointerType === pointerTypeTouch);
            }

            return {
                  init: init
            };
      })();

      $(document).ready(function () {
            // REVISIT: perhaps these should happen on an earlier page event, or straight away?

            // enable sticky menus
            // sticky.init();

            // setup menu interactivity
            if($("#nav-top").length) {
                menuActions.init();
            }
      });


})(window, document, jQuery, Modernizr);

(function (Modernizr, domPrefixes, hasEvent) {
      // **Test name hijacked!**
      // Now refers to W3C DOM PointerEvents spec: http://www.w3.org/Submission/pointer-events/
      // For CSS pointer-events test, see feature-detects/css/pointerevents.js
      Modernizr.addTest('pointerevents', function () {
            // Cannot use `.prefixed()` for events, so test each prefix
            var bool = false,
                  i = domPrefixes.length;

            // Don't forget un-prefixed...
            bool = Modernizr.hasEvent('pointerdown');

            while (i-- && !bool) {
                  if (hasEvent(domPrefixes[i] + 'pointerdown')) {
                        bool = true;
                  }
            }
            return bool;
      });
})(Modernizr, Modernizr._domPrefixes, Modernizr.hasEvent);

//Control the Required Symbol for Secret Answer field in Change Password Page based on the the selected Secret question
function manageSecretAnswerRequiredSymbol(storedQuestion){
	if(storedQuestion != ''){
		var secretAns = document.getElementById("secretAnswer").value;
		var secretQuestionSelectElement=document.getElementById("secretQuestionStyleId");
		var selectedQuestion=secretQuestionSelectElement.options[secretQuestionSelectElement.selectedIndex].value;
		
		//if selected question is null or it gets change and is not the same as the stored question then display the required text or else the optional text(FNO-59851)
		if(selectedQuestion == '' || selectedQuestion != storedQuestion){
			document.getElementById('secretQuestionHeaderNoteRequired').style.display = "block";
			document.getElementById('secretQuestionHeaderNote').style.display = "none";
		}
		else{
			document.getElementById('secretQuestionHeaderNoteRequired').style.display = "none";
			document.getElementById('secretQuestionHeaderNote').style.display = "block";
		}
		
		if(selectedQuestion != storedQuestion && secretAns == ''){
			$("#changePasswordAnswerId").addClass("required");
		}else{
			$("#changePasswordAnswerId").removeClass("required");
		}
	}else{
		if($("#secretQuestionHeaderNote") && $("#changePasswordAnswerId")){			
			$("#secretQuestionHeaderNote").hide();
			$("#changePasswordAnswerId").addClass("required");
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
function decodeLoginPassword(){
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	var encodedPasswd = document.getElementsByName('password')[0].value;
	if(encodedPasswd !== null && encodedPasswd !== ''){
		var decodedString = Base64.decode(encodedPasswd);
		document.getElementsByName('password')[0].value = decodedString;
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
function submitRegistrationForm() {
	var org = $("#orgSet option:selected").val();
	var selected = [];
	$('input:checked[name="selectedObjects"]').each(function() {
		selected.push($(this).attr('value'));
	});
	if(selected==""){
	alert("Please select atleast one item");
	}
	else{
	var url = 'submitTrialRegistrationForExistingUser.do?org='+org+'&partNumbers='+selected;
	$("form").attr("action", url);
	$("form").submit();
	}
}; 

function toggleLicenseCustomAttributes(){	 
	var items=document.getElementsByName('selectedPartNumbers');
	 	for(var i=0; i<items.length; i++){	 		
		     if(items[i].type=='checkbox' && items[i].checked==true) {
		       var element=document.getElementById(items[i].value);
		       if(element !=null)
		    	     element.style.display = '';		    
			} else { 
				 var element=document.getElementById(items[i].value);
			       if(element != null)				
			    	  element.style.display = 'none';
		  }
	}	 
} 

function  onclickCustomAttribte() 
{	
	var org = $("#orgSet option:selected").val();
	var selected = [];
	$('input:checked[name="selectedObjects"]').each(function() {
		selected.push($(this).attr('value'));
	});
	var url = '/flexnet/operationsportal/getCustomAttributesForselectedPartNumbers.do?org='+org+'&partNumbers='+selected;
	$('#customAttributes').load(url);
}

//autocomplete functionality
$( function() {
    $("input[name = 'targetOrgDisplayName']").autocomplete({
	
     	 source: function( request, response ) {
        $.ajax( {
          url: "/flexnet/operationsportal/accounts/autocomplete/accounts/"+ request.term ,
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
