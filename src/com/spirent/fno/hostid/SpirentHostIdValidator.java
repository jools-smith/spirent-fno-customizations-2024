package com.spirent.fno.hostid;

import com.flexnet.operations.publicapi.HostIDValidator;
import com.flexnet.operations.publicapi.LicenseHostId;
import com.flexnet.operations.publicapi.OperationsException;

import java.util.regex.Pattern;

/**
 * Revenera GCS 2024.12.10 - decompiled from Spirent 2021R1 custom folder and merged with Perforce
 */

public class SpirentHostIdValidator implements HostIDValidator {

  private static final String VENDOR_DEFINED = "VENDOR_DEFINED=";
  private static final String VDH = "VDH=";

  //	private Pattern intPattern = Pattern.compile("\\d+");
  private Pattern hexPattern = Pattern.compile("[\\daAbBcCdDeEfF]+");

  public void validate(final LicenseHostId hostID) throws OperationsException {

    final String hostIdentifier = hostID.getUniqueHostName();

    if (hostIdentifier.startsWith(VENDOR_DEFINED)) {

      validateHostId(hostIdentifier.substring(VENDOR_DEFINED.length()));
    }
  }

  public void validateHostId(final String id) throws OperationsException {
    if (id.toUpperCase().startsWith(VDH)) {
      // do some basic sanity checking for VDH IDs: check that the part after VDH=?- is a hex string
      if (id.length() > VDH.length() && hexPattern.matcher(id.substring(VDH.length())).matches()) {
        return;
      }

      if (id.charAt(5) == '-' && id.length() > 6 && hexPattern.matcher(id.substring(6)).matches()) {
        return;
      }

    }

    throw new OperationsException("InvalidHostID", new Object[]{id});
  }

}
