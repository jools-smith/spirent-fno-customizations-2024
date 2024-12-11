package com.flexnet.operations.web.beans;

import com.flexnet.operations.publicapi.*;
import com.flexnet.products.publicapi.FNPTimeZone;
import com.spirent.fno.utils.Customization;

import java.util.*;

@SuppressWarnings("unchecked")
public class BatchActivationStateBean implements java.io.Serializable {

  public static final String BATCH_ACTIVATION_STATE_BEAN_ID = "OPERATIONS_BATCH_ACTIVATION_STATE_BEAN";
  protected FNPTimeZone timeZone = null;
  String[] selectedActivationIds;
  String consolidateLicenses = "";
  String policyDeniedActivationID = "";
  String shipToEmail = "";
  String shipToAddress = "";
  Date startDate = null;
  Date versionDate = null;
  Date versionStartDate = null;
  List serverHostIds = null;
  List nodeLockedHostIds = null;
  Map countedNodeLockedHostIds = new HashMap();
  Map fulfillCounts = new HashMap();
  Map requestedOverdraftCounts = new HashMap();
  List configuredHosts = new ArrayList();
  LicenseHostId currentServerHost = null;
  Map policyDeniedActivationIds = null;
  boolean needServerId;
  boolean needNodeLockId;
  boolean needCount;
  Map fulfillmentAttributesVals = new HashMap();
  String soldToID = null;
  String soldToName = null;

  @Customization("2024-12.09")
  String tier1ID = null;

  @Customization("2024-12.09")
  String tier1Name = null;

  PolicyTypeENC policyDenied = null;
  Map policyDeniedMap = null;
  String[] selectedExistingHosts;
  boolean flexnet = true;
  String ownerID = null;
  String ownerName = null;
  String unifiedHostId = null;
  List customHostIds = null;
  boolean needCustomHost;
  private boolean allowPartialFulfillments;

  public String getUnifiedHostId() {
    return unifiedHostId;
  }

  public void setUnifiedHostId(String unifiedHostId) {
    this.unifiedHostId = unifiedHostId;
  }

  public boolean isAllowPartialFulfillments() {
    return allowPartialFulfillments;
  }

  public void setAllowPartialFulfillments(boolean bool) {
    allowPartialFulfillments = bool;
  }

  public void resetCache() {
    selectedActivationIds = new String[0];
    selectedExistingHosts = new String[0];
    consolidateLicenses = "";
    policyDeniedActivationID = "";
    shipToEmail = "";
    shipToAddress = "";
    startDate = null;
    versionDate = null;
    versionStartDate = null;
    serverHostIds = null;
    nodeLockedHostIds = null;
    countedNodeLockedHostIds = new HashMap();
    fulfillCounts = new HashMap();
    requestedOverdraftCounts = new HashMap();
    configuredHosts = new ArrayList();
    currentServerHost = null;
    policyDeniedActivationIds = null;
    needServerId = false;
    needCustomHost = false;
    needNodeLockId = false;
    fulfillmentAttributesVals = new HashMap();
    soldToID = null;
    soldToName = null;
    ///@Customization("2024-12.10")
    this.tier1ID = this.tier1Name = null;;

    policyDenied = null;
    policyDeniedMap = null;
    ownerID = null;
    ownerName = null;
    customHostIds = null;
    needCount = false;
    unifiedHostId = null;
  }

  public boolean needServerId() {
    return needServerId;
  }

  public void setNeedServerId(boolean bool) {
    needServerId = bool;
  }

  public boolean needCustomHost() {
    return needCustomHost;
  }

  public void setNeedCustomHost(boolean bool) {
    needCustomHost = bool;
  }

  public boolean needNodeLockId() {
    return needNodeLockId;
  }

  public void setNeedNodeLockId(boolean bool) {
    needNodeLockId = bool;
  }

  public String[] getSelectedActivationIds() {
    return selectedActivationIds;
  }

  public void setSelectedActivationIds(String[] selectedActivationIds) {
    this.selectedActivationIds = selectedActivationIds;
  }

  public String getConsolidateLicenses() {
    return consolidateLicenses;
  }

  public void setConsolidateLicenses(String consolidateLicenses) {
    this.consolidateLicenses = consolidateLicenses;
  }

  public String getShipToAddress() {
    return shipToAddress;
  }

  public void setShipToAddress(String shipToAddress) {
    this.shipToAddress = shipToAddress;
  }

  public String getShipToEmail() {
    return shipToEmail;
  }

  public void setShipToEmail(String shipToEmail) {
    this.shipToEmail = shipToEmail;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public ArrayList getCountedNodeLockedHostIds(ServerHostId serverId) {
    if (countedNodeLockedHostIds != null && countedNodeLockedHostIds.get(serverId) != null) {
      return (ArrayList) countedNodeLockedHostIds.get(serverId);
    }
    return null;
  }

  public void setCountedNodeLockedHostIds(ServerHostId serverid, ArrayList nodeLockedHostIds) {
      if (countedNodeLockedHostIds == null) {
          countedNodeLockedHostIds = new HashMap();
      }
    countedNodeLockedHostIds.put(serverid, nodeLockedHostIds);
  }

  public void addCountedNodeLockedHostIds(ServerHostId serverid, LicenseHostId host) {
      if (countedNodeLockedHostIds == null) {
          countedNodeLockedHostIds = new HashMap();
      }
    List nlHosts = (List) countedNodeLockedHostIds.get(serverid);
    if (nlHosts == null) {
      nlHosts = new ArrayList();
      countedNodeLockedHostIds.put(serverid, nlHosts);
    }
      if (!nlHosts.contains(host)) {
          nlHosts.add(host);
      }
  }

  public void removeCountedNodeLockedHostIds(ServerHostId serverid, LicenseHostId host) {
      if (countedNodeLockedHostIds == null) {
          countedNodeLockedHostIds = new HashMap();
      }
    List nlHosts = (List) countedNodeLockedHostIds.get(serverid);
      if (nlHosts != null) {
          nlHosts.remove(host);
      }
  }

  public void removeCountedNodeLockedHostIds(ServerHostId serverid) {
      if (countedNodeLockedHostIds != null) {
          countedNodeLockedHostIds.remove(serverid);
      }
  }

  public void removeCountedNodeLockedHostId(ServerHostId serverid, NodeLockedHostId nodeLockedHostId) {
    if (countedNodeLockedHostIds != null && countedNodeLockedHostIds.get(serverid) != null) {
      ArrayList nodelockedhosts = (ArrayList) countedNodeLockedHostIds.get(serverid);
      nodelockedhosts.remove(nodeLockedHostId);
    }
  }

  public void removeServerHostId(ServerHostId serverid) {
    if (this.serverHostIds != null) {
      this.serverHostIds.remove(serverid);
        if (currentServerHost != null && currentServerHost instanceof ServerHostId && currentServerHost.equals(serverid)) {
            currentServerHost = null;
        }
    }
  }

  public void addServerHostId(ServerHostId serverid) {
    if (this.serverHostIds != null) {
        if (!serverHostIds.contains(serverid)) {
            this.serverHostIds.add(serverid);
        }
    }
  }

  public List getNodeLockedHostIds() {
      if (nodeLockedHostIds == null) {
          nodeLockedHostIds = new ArrayList();
      }
    return nodeLockedHostIds;
  }

  public void setNodeLockedHostIds(List nodeLockedHostIds) {
    this.nodeLockedHostIds = nodeLockedHostIds;
  }

  public void removeNodeLockedHostId(NodeLockedHostId nodelockedid) {
    if (this.nodeLockedHostIds != null) {
      this.nodeLockedHostIds.remove(nodelockedid);
        if (currentServerHost != null && currentServerHost instanceof NodeLockedHostId && currentServerHost.equals(nodelockedid)) {
            currentServerHost = null;
        }
    }
  }

  public void addNodeLockedHostId(NodeLockedHostId nodelockedid) {
    if (this.nodeLockedHostIds != null) {
        if (!nodeLockedHostIds.contains(nodelockedid)) {
            this.nodeLockedHostIds.add(nodelockedid);
        }
    }
  }

  public Map getFulfillCounts() {
    return fulfillCounts;
  }

  public void setFulfillCounts(Map fulfillCounts) {
    this.fulfillCounts = fulfillCounts;
  }

  public void removeFulfillCounts(String activationId) {
      if (this.fulfillCounts != null) {
          this.fulfillCounts.remove(activationId);
      }
  }

  public void setFulfillCount(String activationIdserverHost, String fulfillCount) {
    int pipeindex = activationIdserverHost.indexOf("||");
    String activationId = activationIdserverHost.substring(0, pipeindex);
    String serverHost = activationIdserverHost.substring(pipeindex + 2);
    HashMap m = null;
      if (fulfillCounts.get(activationId) != null) {
          m = (HashMap) fulfillCounts.get(activationId);
      }
      else {
          m = new HashMap();
      }
    m.put(serverHost, fulfillCount);
    fulfillCounts.put(activationId, m);
  }

  public String getFulfillCount(String activationIdserverHost) {
    int pipeindex = activationIdserverHost.indexOf("||");
    String activationId = activationIdserverHost.substring(0, pipeindex);
    String serverHost = activationIdserverHost.substring(pipeindex + 2);
    String retStr = "";
    HashMap m = null;
      if (fulfillCounts.get(activationId) != null) {
          m = (HashMap) fulfillCounts.get(activationId);
      }
    if (m != null) {
        if (m.get(serverHost) != null) {
            retStr = (String) m.get(serverHost);
        }
    }
    return retStr;
  }

  public void removeFulfillCount(String activationIdserverHost) {
    int pipeindex = activationIdserverHost.indexOf("||");
    String activationId = activationIdserverHost.substring(0, pipeindex);
    String serverHost = activationIdserverHost.substring(pipeindex + 2);
    HashMap m = null;
      if (fulfillCounts.get(activationId) != null) {
          m = (HashMap) fulfillCounts.get(activationId);
      }
    if (m != null) {
      m.remove(serverHost);
        if (m.isEmpty()) {
            fulfillCounts.remove(activationId);
        }
        else {
            fulfillCounts.put(activationId, m);
        }
    }
  }

  public Map getRequestedOverdraftCounts() {
    return requestedOverdraftCounts;
  }

  public void setRequestedOverdraftCounts(Map requestedOverdraftCounts) {
    this.requestedOverdraftCounts = requestedOverdraftCounts;
  }

  public void removeRequestedOverdraftCounts(String activationId) {
      if (requestedOverdraftCounts != null) {
          this.requestedOverdraftCounts.remove(activationId);
      }
  }

  public void setRequestedOverdraftCount(String activationIdserverHost, String overdraftCount) {
    int pipeindex = activationIdserverHost.indexOf("||");
    String activationId = activationIdserverHost.substring(0, pipeindex);
    String serverHost = activationIdserverHost.substring(pipeindex + 2);
    HashMap m = null;
      if (requestedOverdraftCounts.get(activationId) != null) {
          m = (HashMap) requestedOverdraftCounts.get(activationId);
      }
      else {
          m = new HashMap();
      }
    m.put(serverHost, overdraftCount);
    requestedOverdraftCounts.put(activationId, m);
  }

  public String getRequestedOverdraftCount(String activationIdserverHost) {
    int pipeindex = activationIdserverHost.indexOf("||");
    String activationId = activationIdserverHost.substring(0, pipeindex);
    String serverHost = activationIdserverHost.substring(pipeindex + 2);
    String retStr = "";
    HashMap m = null;
      if (requestedOverdraftCounts.get(activationId) != null) {
          m = (HashMap) requestedOverdraftCounts.get(activationId);
      }
    if (m != null) {
        if (m.get(serverHost) != null) {
            retStr = (String) m.get(serverHost);
        }
    }
    return retStr;
  }

  public void removeRequestedOverdraftCount(String activationIdserverHost) {
    int pipeindex = activationIdserverHost.indexOf("||");
    String activationId = activationIdserverHost.substring(0, pipeindex);
    String serverHost = activationIdserverHost.substring(pipeindex + 2);
    HashMap m = null;
      if (requestedOverdraftCounts.get(activationId) != null) {
          m = (HashMap) requestedOverdraftCounts.get(activationId);
      }
    if (m != null) {
      m.remove(serverHost);
        if (m.isEmpty()) {
            requestedOverdraftCounts.remove(activationId);
        }
        else {
            requestedOverdraftCounts.put(activationId, m);
        }
    }
  }

  public List getConfiguredHosts() {
    return configuredHosts;
  }

  public void setConfiguredHosts(List configuredHosts) {
    this.configuredHosts = configuredHosts;
  }

  public void addConfiguredHost(LicenseHostId host) {
      if (!configuredHosts.contains(host)) {
          this.configuredHosts.add(host);
      }
  }

  public void removeConfiguredHost(LicenseHostId host) {
    this.configuredHosts.remove(host);
  }

  public boolean isHostConfigured(LicenseHostId host) {
    return this.configuredHosts.contains(host);
  }

  public LicenseHostId getLastHostInTheList() {
    if (isFlexnet()) {
      List serverhosts = this.getServerHostIds();
      if (serverhosts != null) {
        int lsize = serverhosts.size();
        if (lsize > 0) {
          return (ServerHostId) serverhosts.get(lsize - 1);
        }
      }
    }
    else {
      List customhosts = this.getCustomHostIds();
      if (customhosts != null) {
        int lsize = customhosts.size();
        if (lsize > 0) {
          return (CustomHostId) customhosts.get(lsize - 1);
        }
      }
    }
    return null;

  }

  public boolean isFlexnet() {
    return flexnet;
  }

  public void setFlexnet(boolean isFlexnet) {
    this.flexnet = isFlexnet;
  }

  public List getServerHostIds() {
      if (serverHostIds == null) {
          serverHostIds = new ArrayList();
      }
    return serverHostIds;
  }

  public void setServerHostIds(List serverHostIds) {
    this.serverHostIds = serverHostIds;
  }

  public List getCustomHostIds() {
      if (customHostIds == null) {
          customHostIds = new ArrayList();
      }
    return customHostIds;
  }

  public void setCustomHostIds(List customHostIds) {
    this.customHostIds = customHostIds;
  }

  public LicenseHostId getNextHostInTheList(LicenseHostId currentHost) {
    if (isFlexnet()) {
      List serverhosts = this.getServerHostIds();
      if (serverhosts != null) {
        int lsize = serverhosts.size();
        if (lsize > 0) {
          int ind = serverhosts.indexOf(currentHost);
          if (ind != (lsize - 1)) {
            return (ServerHostId) serverhosts.get(ind + 1);
          }
        }
      }
    }
    else {
      List customhosts = this.getCustomHostIds();
      if (customhosts != null) {
        int lsize = customhosts.size();
        if (lsize > 0) {
          int ind = customhosts.indexOf(currentHost);
          if (ind != (lsize - 1)) {
            return (LicenseHostId) customhosts.get(ind + 1);
          }
        }
      }
    }
    return null;
  }

  public LicenseHostId getPreviousHostInTheList(LicenseHostId currentHost) {
    if (isFlexnet()) {
      List serverhosts = this.getServerHostIds();
      if (serverhosts != null) {
        int lsize = serverhosts.size();
        if (lsize > 0) {
          int ind = serverhosts.indexOf(currentHost);
          if (ind != 0) {
            return (ServerHostId) serverhosts.get(ind - 1);
          }
        }
      }
    }
    else {
      List customhosts = this.getCustomHostIds();
      if (customhosts != null) {
        int lsize = customhosts.size();
        if (lsize > 0) {
          int ind = customhosts.indexOf(currentHost);
          if (ind != 0) {
            return (CustomHostId) customhosts.get(ind - 1);
          }
        }
      }
    }
    return null;
  }

  public boolean isFirstHostInTheList(LicenseHostId currentHost) {
    List serverhosts = null;
    if (isFlexnet()) {
      serverhosts = this.getServerHostIds();
    }
    else {
      serverhosts = this.getCustomHostIds();
    }
    if (serverhosts != null) {
      int lsize = serverhosts.size();
      if (lsize > 0) {
        int ind = serverhosts.indexOf(currentHost);
        if (ind == 0) {
          return true;
        }
      }
    }
    return false;

  }

  public boolean isLastHostInTheList(LicenseHostId currentHost) {
    List serverhosts = null;
    if (isFlexnet()) {
      serverhosts = this.getServerHostIds();
    }
    else {
      serverhosts = this.getCustomHostIds();
    }
    if (serverhosts != null) {
      int lsize = serverhosts.size();
      if (lsize > 0) {
        int ind = serverhosts.indexOf(currentHost);
        if (ind == (lsize - 1)) {
          return true;
        }
      }
    }
    return false;
  }

  public LicenseHostId getCurrentServerHost() {
      if (currentServerHost == null) {
          currentServerHost = getFirstHostInTheList();
      }
    return currentServerHost;
  }

  public LicenseHostId getFirstHostInTheList() {
    if (isFlexnet()) {
      List serverhosts = this.getServerHostIds();
      if (serverhosts != null) {
        int lsize = serverhosts.size();
        if (lsize > 0) {
          return (ServerHostId) serverhosts.get(0);
        }
      }
    }
    else {
      List customhosts = this.getCustomHostIds();
      if (customhosts != null) {
        int lsize = customhosts.size();
        if (lsize > 0) {
          return (CustomHostId) customhosts.get(0);
        }
      }
    }
    return null;
  }

  public void setCurrentServerHost(LicenseHostId currentServerHost) {
    this.currentServerHost = currentServerHost;
  }

  public int getPendingCopies(String activationId) {
    int pendingCopies = 0;
    HashMap m = null;
      if (fulfillCounts.get(activationId) != null) {
          m = (HashMap) fulfillCounts.get(activationId);
      }
    if (m != null) {
      Collection c = m.values();
      if (!c.isEmpty()) {
        Iterator iter = c.iterator();
        while (iter.hasNext()) {
          String str = (String) iter.next();
          pendingCopies = pendingCopies + Integer.parseInt(str);
        }
      }
    }
    return pendingCopies;
  }

  public Map getPolicyDeniedActivationIds() {
      if (policyDeniedActivationIds == null) {
          policyDeniedActivationIds = new HashMap();
      }
    return policyDeniedActivationIds;
  }

  public void setPolicyDeniedActivationIds(Map policyDeniedActivationIds) {
    this.policyDeniedActivationIds = policyDeniedActivationIds;
  }

  public void addPolicyDeniedActivationId(String activationId, String override) {
      if (policyDeniedActivationIds == null) {
          policyDeniedActivationIds = new HashMap();
      }
    policyDeniedActivationIds.put(activationId, override);
  }

  public void removePolicyDeniedActivationId(String activationId) {
      if (policyDeniedActivationIds != null) {
          policyDeniedActivationIds.remove(activationId);
      }
  }

  public String getOverridePolicy(String activationId) {
    String returnStr = null;
    if (policyDeniedActivationIds != null && policyDeniedActivationIds.get(activationId) != null) {
      returnStr = (String) policyDeniedActivationIds.get(activationId);
    }
    return returnStr;
  }

  public Map getPolicyDeniedMap() {
      if (policyDeniedMap == null) {
          policyDeniedMap = new HashMap();
      }
    return policyDeniedMap;
  }

  public void setPolicyDeniedMap(Map policyDeniedMap) {
    this.policyDeniedMap = policyDeniedMap;
  }

  public void addPolicyDenied(String activationId, PolicyTypeENC policy) {
      if (policyDeniedMap == null) {
          policyDeniedMap = new HashMap();
      }
    policyDeniedMap.put(activationId, policy);
  }

  public void removePolicyDenied(String activationId) {
      if (policyDeniedMap != null) {
          policyDeniedMap.remove(activationId);
      }
  }

  public PolicyTypeENC getPolicyDenied(String activationId) {
    if (policyDeniedMap != null && policyDeniedMap.get(activationId) != null) {
      return (PolicyTypeENC) policyDeniedMap.get(activationId);
    }
    return null;
  }

  public PolicyTypeENC getPolicyDenied() {
    return policyDenied;
  }

  public void setPolicyDenied(PolicyTypeENC pol) {
    policyDenied = pol;
  }

  public String getPolicyDeniedActivationID() {
    return policyDeniedActivationID;
  }

  public void setPolicyDeniedActivationID(String policyDeniedActivationID) {
    this.policyDeniedActivationID = policyDeniedActivationID;
  }

  public Map getFulfillmentAttributesVals() {
    return fulfillmentAttributesVals;
  }

  public void setFulfillmentAttributesVals(Map fulfillmentAttributesVals) {
    this.fulfillmentAttributesVals = fulfillmentAttributesVals;
  }

  public Date getVersionDate() {
    return versionDate;
  }

  public void setVersionDate(Date versionDate) {
    this.versionDate = versionDate;
  }

  public Date getVersionStartDate() {
    return versionStartDate;
  }

  public void setVersionStartDate(Date versionStartDate) {
    this.versionStartDate = versionStartDate;
  }

  public String getSoldToID() {
    return soldToID;
  }

  public void setSoldToID(String soldToID) {
    this.soldToID = soldToID;
  }

  public String getSoldToName() {
    return soldToName;
  }

  public void setSoldToName(String soldToName) {
    this.soldToName = soldToName;
  }

  @Customization("2024-12.09")
  public String getTier1ID() {
    return this.soldToID;
  }

  @Customization("2024-12.09")
  public void setTier1ID(String tier1ID) {
    this.tier1ID = tier1ID;
  }

  @Customization("2024-12.09")
  public String getTier1Name() {
    return this.tier1Name;
  }

  @Customization("2024-12.09")
  public void setTier1Name(String tier1Name) {
    this.tier1Name = tier1Name;
  }

  public Map getCountedNodeLockedHostIds() {
    return countedNodeLockedHostIds;
  }

  public void setCountedNodeLockedHostIds(Map countedNodeLockedHostIds) {
    this.countedNodeLockedHostIds = countedNodeLockedHostIds;
  }

  public String[] getSelectedExistingHosts() {
    return selectedExistingHosts;
  }

  public void setSelectedExistingHosts(String[] selectedExistingHosts) {
    this.selectedExistingHosts = selectedExistingHosts;
  }

  public String getOwnerID() {
    return ownerID;
  }

  public void setOwnerID(String ownerID) {
    this.ownerID = ownerID;
  }

  public String getOwnerName() {
    return ownerName;
  }

  public void setOwnerName(String ownerName) {
    this.ownerName = ownerName;
  }

  public void removeCustomHostId(CustomHostId customid) {
    if (this.customHostIds != null) {
      this.customHostIds.remove(customid);
        if (currentServerHost != null && currentServerHost instanceof CustomHostId && currentServerHost.equals(customid)) {
            currentServerHost = null;
        }
    }
  }

  public void addCustomHostId(CustomHostId customid) {
    if (this.customHostIds != null) {
        if (!customHostIds.contains(customid)) {
            this.customHostIds.add(customid);
        }
    }
  }

  public boolean needCount() {
    return needCount;
  }

  public void setNeedCount(boolean needCount) {
    this.needCount = needCount;
  }

  public FNPTimeZone getTimeZone() {
    return timeZone;
  }

  public void setTimeZone(FNPTimeZone timeZone) {
    this.timeZone = timeZone;
  }

}
