<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:st="http://www.intraware.com/schemas/2002/01/SimpleTemplate">

<xsl:output method="xml" indent="no"/>

<xsl:template match="st:SimpleTemplate">
    <xsl:element name="xsl:stylesheet">
        <xsl:attribute name="version">1.0</xsl:attribute>
        <xsl:element name="xsl:output">
            <xsl:attribute name="method">text</xsl:attribute>
        </xsl:element>
        <xsl:element name="xsl:template">
            <xsl:attribute name="match">TemplateContent</xsl:attribute>
            <xsl:apply-templates select="node()"/>
        </xsl:element>
    </xsl:element>
</xsl:template>
<xsl:template match="st:xsl|st:XSL">	<xsl:value-of select="node()" disable-output-escaping="yes"/></xsl:template>
<xsl:template match="st:for-each|st:FOR-EACH">
    <xsl:variable name="tag">
        <xsl:choose>
            <xsl:when test="@tag"><xsl:value-of select="@tag"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="@TAG"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:element name="xsl:choose">
        <xsl:element name="xsl:when">
            <xsl:attribute name="test">/TemplateContent/@preview='true'</xsl:attribute>
            <xsl:apply-templates select="node()"/>
        </xsl:element>
        <xsl:element name="xsl:otherwise">
            <xsl:element name="xsl:for-each">
                <xsl:attribute name="select"><xsl:call-template name="check-child-only"/><xsl:value-of select="$tag"/></xsl:attribute>
                <xsl:apply-templates select="node()"/>
            </xsl:element>
        </xsl:element>
    </xsl:element>
</xsl:template>

<!-- Look through IF block for element ('TAG') with specified attribute ('CODE').
     Only works when a 'TAG' element with a 'CODE' attribute exists 
     IF is turned into a xsl:choose block -->
<xsl:template match="st:if|st:IF">
    <xsl:variable name="tag" select="@*[translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'tag']"/>
    <xsl:variable name="value" select="@*[translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'value']"/>
    <xsl:variable name="valuenot" select="@*[translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'valuenot']"/>
    <xsl:variable name="exclude_attrib">tag value valuenot child-only</xsl:variable>
    <xsl:element name="xsl:choose">
	    <xsl:element name="xsl:when">
	        <xsl:choose>
	            <xsl:when test="@*[not(contains($exclude_attrib, translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')))]">
	                <xsl:attribute name="test"><xsl:call-template name="check-child-only"/><xsl:value-of select="$tag"/><xsl:call-template name="attribute_filter"><xsl:with-param name="exclude" select="$exclude_attrib"/></xsl:call-template>
	                <xsl:choose>
	                    <xsl:when test="$value">='<xsl:value-of select="$value"/>'</xsl:when>
	                    <xsl:when test="$valuenot">!='<xsl:value-of select="$valuenot"/>'</xsl:when>
	                </xsl:choose> or /TemplateContent/@preview='true'</xsl:attribute>
	            </xsl:when>
	            <xsl:otherwise>
	                <xsl:attribute name="test"><xsl:call-template name="check-child-only"/><xsl:value-of select="$tag"/>[position()=1]<xsl:choose>
	                    <xsl:when test="$value">='<xsl:value-of select="$value"/>'</xsl:when>
	                    <xsl:when test="$valuenot">!='<xsl:value-of select="$valuenot"/>'</xsl:when>
	                </xsl:choose> or /TemplateContent/@preview='true'</xsl:attribute>
	            </xsl:otherwise>
	        </xsl:choose>
	        <!-- apply templates for everything except ELSEIF and ELSE -->
	        <xsl:apply-templates select="node()[not(self::st:elseif|self::st:ELSEIF|self::st:else|self::st:ELSE)]"/>
	    </xsl:element>
	    <!-- Now handle the ELSEIF and ELSE nodes -->
	    <xsl:apply-templates select="st:elseif|st:ELSEIF|st:else|st:ELSE"/>
    </xsl:element>
</xsl:template>

<!-- look through IFNULL block to determine whether a specified 'TAG'
     element exists with a 'CODE' attribute, if not, use this node -->
<xsl:template match="st:ifnull|st:IFNULL">
    <xsl:variable name="tag" select="@*[translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'tag']"/>
    <xsl:variable name="exclude_attrib">tag child-only</xsl:variable>
    <xsl:element name="xsl:choose">
	    <xsl:element name="xsl:when">
	        <xsl:choose>
	            <xsl:when test="@*[not(contains($exclude_attrib, translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')))]">
	                <xsl:attribute name="test">not(<xsl:call-template name="check-child-only"/><xsl:value-of select="$tag"/><xsl:call-template name="attribute_filter"><xsl:with-param name="exclude" select="$exclude_attrib"/></xsl:call-template>) or /TemplateContent/@preview='true'</xsl:attribute>
	            </xsl:when>
	            <xsl:otherwise>
	                <xsl:attribute name="test">not(<xsl:call-template name="check-child-only"/><xsl:value-of select="$tag"/>[position()=1]) or /TemplateContent/@preview='true'</xsl:attribute>
	            </xsl:otherwise>
	        </xsl:choose>
	        <!-- apply templates for everything except ELSEIF and ELSE -->
	        <xsl:apply-templates select="node()[not(self::st:elseif|self::st:ELSEIF|self::st:else|self::st:ELSE)]"/>
	    </xsl:element>
	    <!-- Now handle the ELSEIF and ELSE nodes -->
	    <xsl:apply-templates select="st:elseif|st:ELSEIF|st:else|st:ELSE"/>
    </xsl:element>
</xsl:template>

<!--  Handle CHOOSE block --> 
<xsl:template match="st:choose|st:CHOOSE">
    <xsl:element name="xsl:choose">
    	<xsl:apply-templates select="st:WHEN|st:when|st:OTHERWISE|st:otherwise"/>
    </xsl:element>
</xsl:template>

<!--  Handle OTHERWISE or ELSE block --> 
<xsl:template match="st:otherwise|st:OTHERWISE|st:else|st:ELSE">
    <xsl:element name="xsl:otherwise">
    	<xsl:apply-templates select="node()"/>
    </xsl:element>
</xsl:template>

<!-- Look through WHEN or ELSEIF block for element ('TAG') with specified attribute ('CODE').
     Only works when a 'TAG' element with a 'CODE' attribute exists -->
<xsl:template match="st:when|st:WHEN|st:elseif|st:ELSEIF">
    <xsl:variable name="tag" select="@*[translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'tag']"/>
    <xsl:variable name="value" select="@*[translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'value']"/>
    <xsl:variable name="valuenot" select="@*[translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') = 'valuenot']"/>
    <xsl:variable name="exclude_attrib">tag value valuenot child-only</xsl:variable>
    <xsl:element name="xsl:when">
        <xsl:choose>
            <xsl:when test="@*[not(contains($exclude_attrib, translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')))]">
                <xsl:attribute name="test"><xsl:call-template name="check-child-only"/><xsl:value-of select="$tag"/><xsl:call-template name="attribute_filter"><xsl:with-param name="exclude" select="$exclude_attrib"/></xsl:call-template>
                <xsl:choose>
                    <xsl:when test="$value">='<xsl:value-of select="$value"/>'</xsl:when>
                    <xsl:when test="$valuenot">!='<xsl:value-of select="$valuenot"/>'</xsl:when>
                </xsl:choose> or /TemplateContent/@preview='true'</xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="test"><xsl:call-template name="check-child-only"/><xsl:value-of select="$tag"/>[position()=1]<xsl:choose>
                    <xsl:when test="$value">='<xsl:value-of select="$value"/>'</xsl:when>
                    <xsl:when test="$valuenot">!='<xsl:value-of select="$valuenot"/>'</xsl:when>
                </xsl:choose> or /TemplateContent/@preview='true'</xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="node()"/>
    </xsl:element>
</xsl:template>
<xsl:template match="st:*">
    <xsl:choose>
        <xsl:when test="@*">
            <xsl:element name="xsl:choose">
                <xsl:element name="xsl:when">
                    <xsl:attribute name="test">/TemplateContent/@preview='true'</xsl:attribute>
                    <xsl:element name="xsl:value-of">
                        <xsl:attribute name="select">normalize-space(<xsl:call-template name="check-child-only"/><xsl:value-of select="local-name()"/>[position()=1])</xsl:attribute>
                    </xsl:element>
                </xsl:element>
                <xsl:element name="xsl:otherwise">
                    <xsl:element name="xsl:value-of">
                        <xsl:attribute name="select">normalize-space(<xsl:call-template name="check-child-only"/><xsl:value-of select="local-name()"/><xsl:call-template name="attribute_filter"/>)</xsl:attribute>
                    </xsl:element>
                </xsl:element>
            </xsl:element>
        </xsl:when>
        <xsl:otherwise>
            <xsl:element name="xsl:value-of">
                <xsl:attribute name="select">normalize-space(<xsl:call-template name="check-child-only"/><xsl:value-of select="local-name()"/>[position()=1])</xsl:attribute>
            </xsl:element>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template><xsl:template name="check-child-only">	<xsl:choose>			<xsl:when test="@child-only">					<xsl:text>./</xsl:text>					</xsl:when>				<xsl:otherwise>					<xsl:text>.//</xsl:text>					</xsl:otherwise>			</xsl:choose>	</xsl:template>
<xsl:template name="attribute_filter">
    <xsl:param name="exclude"/>
    <xsl:text>[</xsl:text>
    <xsl:for-each select="@*">
        <xsl:variable name="localname" select="translate(local-name(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
        <xsl:choose>
            <xsl:when test="not(contains($exclude, $localname))">
                <xsl:text>@</xsl:text>
                <xsl:value-of select="$localname"/>
                <xsl:text>='</xsl:text>
                <xsl:value-of select="."/>
                <xsl:text>'</xsl:text>
            </xsl:when>
            <xsl:otherwise>1=1</xsl:otherwise>
        </xsl:choose>
        <xsl:if test="position() != last()"><xsl:text> and </xsl:text></xsl:if>
    </xsl:for-each>
    <xsl:text>]</xsl:text>
</xsl:template>

<xsl:template match="text()">
    <xsl:element name="xsl:text">
        <xsl:value-of select="."/>
    </xsl:element>
</xsl:template>

</xsl:stylesheet>
