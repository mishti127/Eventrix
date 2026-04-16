<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<html>
<head>
<title>College Events</title>

<style>

body{
font-family: Arial;
background-color:#f5f5f5;
}

table{
border-collapse: collapse;
width:90%;
margin:auto;
}

th{
background-color:#e5c45c;
padding:12px;
border:1px solid #c9a83a;
}

td{
padding:10px;
border:1px solid #c9a83a;
text-align:center;
}

tr:nth-child(even){
background-color:#f2e4b6;
}

</style>

</head>

<body>

<div class="container">
<h2>College Events</h2>

<div class="events-grid">

<xsl:for-each select="college/event">

<div class="event-card">
<img class="event-image" src="{image}" alt="{name}"/>
<div class="event-content">
<h3 class="event-name"><xsl:value-of select="name"/></h3>
<div class="event-details">
<strong>Date:</strong> <xsl:value-of select="date"/><br/>
<strong>Time:</strong> <xsl:value-of select="time"/><br/>
<strong>Venue:</strong> <xsl:value-of select="venue"/><br/>
<strong>Organizer:</strong> <xsl:value-of select="organizer"/><br/>
<strong>Description:</strong> <xsl:value-of select="description"/><br/>
<span class="category category-{translate(category, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}">
<xsl:value-of select="category"/>
</span>
</div>
</div>
</div>

</xsl:for-each>

</div>
</div>

</body>
</html>

</xsl:template>

</xsl:stylesheet>