<%@ page import="com.flexnet.operations.web.beans.PortalStateBean" %>
<c:set var="portalStateBean">
	<%= PortalStateBean.PORTAL_STATE_BEAN_ID %>
</c:set>
<c:set var="isLoggedInWithEntitlementID" value="${sessionScope[portalStateBean].isLoggedInWithEntitlementID}"/>
<c:set var="isLoggedInWithLineItemID" value="${sessionScope[portalStateBean].isLoggedInWithLineItemID}"/>
<c:set var="isChannelPartnerUser" value="${sessionScope[portalStateBean].isChannelPartnerUser}"/>
<c:set var="isPublisherUser" value="${sessionScope[portalStateBean].isPublisherUser}"/>
<fno:form action='activatables_VIEW.do' method="POST">
<html:hidden name="ActivatableItemsLandingPageForm" property="searchType"/>
<c:choose>
	<c:when test="${(isChannelPartnerUser || isPublisherUser) && !isLoggedInWithEntitlementID && !isLoggedInWithLineItemID}">
		<tiles:insert page="/operationsportal/Activations/ActivatableItemsLandingPageTile.jsp">
	        <tiles:put name="baseURL" value="activatables_"/>
			<tiles:put name="formName" value="ActivatableItemsLandingPageForm"/>
			<tiles:put name="searchFieldName" value="searchPhrase"/>
			<tiles:put name="title" value="List Entitlements"/>
			<tiles:put name="topic" value="List Entitlements"/>
		</tiles:insert>
	</c:when>
	<c:otherwise>
		<tiles:insert page="/operationsportal/Activations/ActivatableItemsLandingPageTile.jsp">
	        <tiles:put name="baseURL" value="activatables_"/>
			<tiles:put name="formName" value="ActivatableItemsLandingPageForm"/>
			<tiles:put name="searchFieldName" value="searchPhrase"/>
			<tiles:put name="title" value="List Entitlements"/>
			<tiles:put name="topic" value="List Entitlements"/>
		</tiles:insert>
	</c:otherwise>
</c:choose>
</fno:form> 

<fno:modalFrame isIframe="true" 
	modalTitle=""
	primaryLabel="primaryLabel"
	primaryOnclick="$('#modal-frame').prop('contentWindow').handleDownloadBtn();" exitLabel="operationsportal.common.button.cancel"
	 width="wide">
    <iframe id="modal-frame" name="modal-frame">
        <p>
            (You are viewing this on a browser which does not support
            <code>iframe</code>
            or has been configured not to display frames. Normally the author should include normal content here, such as a copy of the table. But since this is just a demo, we only give a <em>link</em> to the <a href="editContent_preview.action">normal version of the table</a>.
        </p>
    </iframe>		
   	<img id="spinner" src="${appContextPath}/resources/operationsportal/MCSlider_loader.gif">								
</fno:modalFrame>
	

	


<script>
var msg = {
			downloadsLabel: "<fmt:message  key='DownloadPackageVersions.PageTitle'/>"
		};
var iframe = $("#modal-frame");
var ms = $('#modal-shade');
var mw = $('#modal-window');
var mc= $('#modalcontent');
var ma= $('.modal-actions button.btn.md.default');

$(window).on('resize', function(e) {
		var resizeTimer;
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			resizeModal();
		}, 250);
	});
	var resizeModal = function() {
		mw.css('margin-left',mw.outerWidth() / 2 * -1);
		mw.css('margin-top',mw.outerHeight() / 2 * -1.2);		
		mw.css('min-height', 600);					
	};

	var iframeAdjust = function() {
		$('#modal-frame').on('load', function() {
			$(this).css("height", $(this).contents().height()*10);
		});
	};

 $('#close-modal, #close-modal-top').on('click', function() {
	   iframe.attr('src', '');
	   $('.modal-header h3').text('');
	   return false;
});

function viewPackages(baseUrl,listOfActIds,soldTo){
	ms.show();
	$('.modal-header h3').text(msg.downloadsLabel);
	var url = baseUrl+"?soldTo="+soldTo +"&listOfActIds="+listOfActIds;
  	$('#spinner').show();
	ma.hide();
    iframe.attr('src', url);
	iframeAdjust();
	resizeModal();   
    return false;	
}
</script>
<style>
#modal-window.wide {
    width: 910px;
}
.modal-content iframe {
    width: 100%;
    max-height: 90%;
}
#spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -32px 0 0 -32px;
}
</style>

<!-- Force focus to "search phrase" in form, prevent category "0" -->
<script>
document.forms['ActivatableItemsLandingPageForm'].elements['searchPhrase'].focus();
if (document.forms['ActivatableItemsLandingPageForm'].elements['searchCategory'].selectedIndex==0)
{
  document.forms['ActivatableItemsLandingPageForm'].elements['searchCategory'].selectedIndex=3;
}
</script>