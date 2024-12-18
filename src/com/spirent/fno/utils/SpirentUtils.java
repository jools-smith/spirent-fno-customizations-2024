package com.spirent.fno.utils;

import com.flexnet.operations.publicapi.ChannelPartner;
import com.flexnet.operations.publicapi.FlexnetFulfillmentRecord;
import com.flexnet.platform.services.logging.LogMessage;
import com.flexnet.platform.services.logging.Logger;
import com.revenera.services.ReveneraServices;

import java.util.Collection;
import java.util.Optional;

/**
 * Revenera GCS 2024.12.10 - imported from Perforce and merged with Spirent 2021R1 custom folder
 */
@ReveneraServices(date = "2024-12-18", purpose = "provide functionality for Spirent customizations", author = "Jools Smith")
public final class SpirentUtils {

  private final static Logger logger = new Logger(SpirentUtils.class.getSimpleName());

  private static final String ESCAPE_ENT_ID = "%%orders:web_key%%";
  public static String TIER1 = "bo.constants.partnertiernames.tier1";

  @Deprecated
  public static String replaceHeaderTrailerSubstitutions(final FlexnetFulfillmentRecord fr, final String license) {

    String entitlementID = fr.getLineItem().getParentEntitlement().getEntitlementID();

    return license.replace(ESCAPE_ENT_ID, entitlementID);
  }


  @ReveneraServices(date = "2024-12-18", purpose = "return text after @ in Spirent VDH")
  public static String removeSpirentSuffix(final String name) {
    final int offset = name.indexOf("@");

    return offset > 0 ? name.substring(0, offset) : name;
  }

  @ReveneraServices(date = "2024-12-18", purpose = "return first TIER1 channel partner")
  public static Optional<ChannelPartner> getFirstTier1ChannelPartner(final Collection<ChannelPartner> partners) {
    return partners.stream().filter(cp -> cp.getPartnerTierName().getName().endsWith(TIER1)).findFirst();
  }

  public static <T> T ManageException(final String source, final Throwable t) {
    logger.error(new LogMessage("source"), t);

    throw new RuntimeException(t);
  }
}


