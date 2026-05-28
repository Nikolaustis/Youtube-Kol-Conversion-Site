// Runtime data adapter.
// generated-data.js writes window.KOL_DATA; app.js expects these global variables.
// Keep this file small so it can safely be regenerated or overwritten after data updates.
var ACTIVE_DATA = window.KOL_DATA || window.SNAPSHOT_DATA || {};

var BRAND_COLORS = ACTIVE_DATA.brandColors || {
  UgPhone: "#ff4849",
  VSPhone: "#000000",
  RedFinger: "#2c78ff",
  LDCloud: "#ffb12e"
};

var brands = ACTIVE_DATA.brands || [];
var convMetrics = ACTIVE_DATA.convMetrics || [];
var months = ACTIVE_DATA.months || [];
var monthlyVideos = ACTIVE_DATA.monthlyVideos || {};
var monthlyChannels = ACTIVE_DATA.monthlyChannels || {};
var monthlyMedianViews = ACTIVE_DATA.monthlyMedianViews || {};
var distribution = ACTIVE_DATA.distribution || {};
var overlap = ACTIVE_DATA.overlap || {};
var dataMeta = ACTIVE_DATA.meta || {};
