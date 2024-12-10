package com.spirent.fno.utils;

import com.flexnet.operations.publicapi.ChannelPartner;
import com.flexnet.operations.publicapi.FlexnetFulfillmentRecord;
import com.flexnet.operations.publicapi.OperationsException;
import com.flexnet.operations.publicapi.OperationsServiceFactory;

import java.util.Collection;
import java.util.Optional;

/**
 * Revenera GCS 2024.12.10 - imported from Perforce and merged with Spirent 2021R1 custom folder
 */

public final class SpirentUtils {

  private static final String ESCAPE_ENT_ID = "%%orders:web_key%%";

  public static String replaceHeaderTrailerSubstitutions(final FlexnetFulfillmentRecord fr, final String license) {

    String entitlementID = fr.getLineItem().getParentEntitlement().getEntitlementID();

    return license.replace(ESCAPE_ENT_ID, entitlementID);
  }

  public static String removeSpirentSuffix(final String name) {
    final int offset = name.indexOf("@");

    return offset > 0 ? name.substring(0, offset) : name;
  }

  public static String TIER1 = "bo.constants.partnertiernames.tier1";

  public static Optional<ChannelPartner> getFirstTier1ChannelPartner(final Collection<ChannelPartner> partners) {
    return partners.stream().filter(cp -> cp.getPartnerTierName().getName().endsWith(TIER1)).findFirst();
  }
}
