function color(name){ return BRAND_COLORS[name] || "#667085"; }
function fmt(n){ return Number(n || 0).toLocaleString("en-US"); }
function esc(v){ return String(v ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\'":"&#39;"}[ch] || ch)); }
function pctText(n){ return `${Number(n || 0).toFixed(1).replace(".0","")}%`; }
function copy(path, fallback=""){
  const parts = path.split(".");
  let cur = window.WEB_COPY || {};
  for(const p of parts){
    if(cur && Object.prototype.hasOwnProperty.call(cur,p)) cur = cur[p];
    else return fallback;
  }
  return cur ?? fallback;
}

function brandSlug(name){ return String(name || "").replace(/[^a-zA-Z0-9_-]/g,""); }
function brandAttrs(name, extra=""){
  const s = brandSlug(name);
  return `data-brand="${esc(name)}" data-brand-click="${esc(name)}" class="brand-interactive brand-${s} ${extra}"`;
}
function tooltipAttr(html){
  return `data-tooltip="${esc(html)}"`;
}
let activeBrand = null;
function setActiveBrand(brand){
  activeBrand = activeBrand === brand ? null : brand;
  if(activeBrand) document.body.setAttribute("data-active-brand", activeBrand);
  else document.body.removeAttribute("data-active-brand");
  document.querySelectorAll("[data-brand-click]").forEach(el=>{
    el.classList.toggle("brand-active", activeBrand && el.dataset.brandClick === activeBrand);
  });
}
function tooltipHtml(title, rows){
  return `<div class="tt-title">${esc(title)}</div>${rows.map(r=>`<div class="tt-row"><span><i style="background:${r.color || '#98a2b3'}"></i>${esc(r.label)}</span><b>${esc(r.value)}</b></div>`).join("")}`;
}

function conversionChainTooltipHtml(){
  return `<div class="tt-title">转化链路是什么？</div>
    <div class="tt-body">指 KOL 视频从曝光到下一步行动的完整路径，包含链接、邀请码、购买引导、社群入口、下载页、专属链接或明确购买指导等承接节点。</div>
    <div class="tt-row"><span><i style="background:#98a2b3"></i>0 分</span><b>没有链接、邀请码、购买引导或社群入口</b></div>
    <div class="tt-row"><span><i style="background:#f04438"></i>1 分</span><b>只有品牌名、官网首页或应用商店链接，转化路径较弱</b></div>
    <div class="tt-row"><span><i style="background:#ffb12e"></i>2 分</span><b>有官网、下载页、购买页或社群链接，用户可继续行动</b></div>
    <div class="tt-row"><span><i style="background:#12b76a"></i>3 分</span><b>有邀请码、折扣码、专属链接、购买页、分销入口或明确购买指导</b></div>`;
}
function wrapConversionChainTextNode(textNode, html){
  const text = textNode.nodeValue;
  if(!text || !text.includes("转化链路")) return;
  const parent = textNode.parentNode;
  if(!parent || parent.closest(".conversion-chain-term") || parent.closest("[data-tooltip]") || parent.closest("svg")) return;

  const frag = document.createDocumentFragment();
  const parts = text.split("转化链路");
  parts.forEach((part, idx)=>{
    if(part) frag.appendChild(document.createTextNode(part));
    if(idx < parts.length - 1){
      const span = document.createElement("span");
      span.className = "conversion-chain-term";
      span.dataset.tooltip = html;
      span.textContent = "转化链路";
      frag.appendChild(span);
    }
  });
  parent.replaceChild(frag, textNode);
}
function enhanceConversionChainTooltips(){
  const html = conversionChainTooltipHtml();
  document.querySelectorAll("#home, #conversion").forEach(root=>{
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node){
          if(!node.nodeValue || !node.nodeValue.includes("转化链路")) return NodeFilter.FILTER_REJECT;
          const p = node.parentElement;
          if(!p || p.closest("svg") || p.closest(".conversion-chain-term") || p.closest("[data-tooltip]")) return NodeFilter.FILTER_REJECT;
          const tag = p.tagName;
          if(["SCRIPT","STYLE","TEXTAREA","INPUT"].includes(tag)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>wrapConversionChainTextNode(node, html));
  });
}

function showChartTooltip(e, html){
  let el = document.querySelector(".chart-tooltip");
  if(!el){
    el = document.createElement("div");
    el.className = "chart-tooltip";
    document.body.appendChild(el);
  }
  el.innerHTML = html;
  el.style.left = `${e.clientX + 14}px`;
  el.style.top = `${e.clientY + 14}px`;
  el.classList.add("show");
}
function hideChartTooltip(){
  const el = document.querySelector(".chart-tooltip");
  if(el) el.classList.remove("show");
}

function getBrand(name){ return brands.find(b => b.key === name) || brands[0]; }
function sortedBrandsBy(key, desc=true){
  return [...brands].sort((a,b)=> desc ? (Number(b[key]||0)-Number(a[key]||0)) : (Number(a[key]||0)-Number(b[key]||0)));
}
function maxArr(obj){
  const vals = Object.values(obj || {}).flat().map(Number).filter(Number.isFinite);
  return Math.max(1, ...vals);
}
function niceMax(v){
  if(v <= 10) return 10;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / pow) * pow;
}
function niceMetricMax(v){
  v = Math.max(0.1, Number(v || 0));
  if(v <= 1) return 1;
  if(v <= 2) return 2;
  if(v <= 5) return 5;
  if(v <= 6) return 6;
  if(v <= 10) return 10;
  if(v <= 15) return 15;
  if(v <= 20) return 20;
  if(v <= 30) return 30;
  if(v <= 40) return 40;
  if(v <= 50) return 50;
  if(v <= 60) return 60;
  if(v <= 80) return 80;
  return 100;
}
function withDataNote(extra=""){
  const m = dataMeta || {};
  const monthsDetected = m.monthsDetected ? `${m.monthsDetected} 个月` : `${months.length} 个月`;
  return `已纳入 KOL 视频 ${fmt(m.eligibleKolVideoRows || 0)} 条，转化记录 ${fmt(m.conversionRowsMatchedToKol || 0)} 条；覆盖 ${monthsDetected}${extra ? "；" + extra : ""}`;
}
function insightItems(scope){
  const arr = (window.WEB_COPY && WEB_COPY.insights && WEB_COPY.insights[scope]) || (ACTIVE_DATA.insights && ACTIVE_DATA.insights[scope]) || [];
  return arr.map(x => ({ c: color(x.brand), icon: x.icon || "•", title: x.title, text: x.text }));
}

function getRate(brand, key){
  return Number((ACTIVE_DATA.conversionRates && ACTIVE_DATA.conversionRates[brand] && ACTIVE_DATA.conversionRates[brand][key]) || 0);
}
function pathCards(type="conversion"){
  const title = type === "terminal" ? copy("pages.terminal.pathTitle","终端承接路径") : copy("pages.conversion.pathTitle","品牌转化路径");
  const rows = (window.WEB_COPY && WEB_COPY.paths && WEB_COPY.paths[type]) || [];
  return `<div class="card path-panel detailed-path-panel"><h2>${title}</h2>
    <div class="detailed-path-list">${rows.map(row=>{
      const b = getBrand(row.brand);
      const steps = row.steps || [];
      return `<div class="detailed-path-card" style="--c:${color(row.brand)}">
        <div ${brandAttrs(row.brand,"detailed-path-brand")}><span class="logo" style="width:34px;height:34px;background:${color(row.brand)}">${b.logo}</span><strong>${row.brand}</strong></div>
        <div class="detailed-path-flow">${steps.map((x,i)=>`<div class="path-box">${x}${i===0?'<small>入口</small>':i===steps.length-1?'<small>结果</small>':''}</div>${i<steps.length-1?'<div class="arrow" style="font-size:24px">→</div>':''}`).join("")}</div>
        <div class="detailed-path-text">${row.text || ""}</div>
      </div>`;
    }).join("")}</div>
  </div>`;
}
function summaryCallout(title, text, brand="UgPhone"){
  return `<div class="card summary-callout" style="--c:${color(brand)}"><h2>${title}</h2><p>${text}</p></div>`;
}
function multibrandRows(){
  const rows = ACTIVE_DATA.consistencyDetail || [];
  const out = {};
  brands.forEach(b => out[b.key] = {brand:b.key, channels:new Set(), videos:0, scoreSum:0, scoreWeight:0});
  rows.forEach(r=>{
    const b = r.brand;
    if(!out[b]) return;
    if(r.channel_id) out[b].channels.add(r.channel_id);
    const vc = Number(r.video_count_for_brand || 0);
    const sc = Number(r.avg_conversion_path_score || 0);
    out[b].videos += vc;
    out[b].scoreSum += sc * (vc || 1);
    out[b].scoreWeight += (vc || 1);
  });
  return brands.map(b=>{
    const d = out[b.key];
    return {
      brand:b.key,
      channels:d.channels.size,
      videos:d.videos,
      score:d.scoreWeight ? d.scoreSum/d.scoreWeight : 0
    };
  });
}
function highLowCounts(){
  const rows = ACTIVE_DATA.consistencyDetail || [];
  const channelMap = {};
  rows.forEach(r=>{ if(r.channel_id && !channelMap[r.channel_id]) channelMap[r.channel_id]=r; });
  const out = {};
  brands.forEach(b=>out[b.key]={brand:b.key, high:0, low:0});
  Object.values(channelMap).forEach(r=>{
    const hi = r.channel_highest_brand, lo = r.channel_lowest_brand;
    if(out[hi]) out[hi].high += 1;
    if(out[lo]) out[lo].low += 1;
  });
  return brands.map(b=>out[b.key]);
}
function topGapChannels(limit=8){
  const rows = ACTIVE_DATA.consistencyDetail || [];
  const channelMap = {};
  rows.forEach(r=>{ if(r.channel_id && !channelMap[r.channel_id]) channelMap[r.channel_id]=r; });
  return Object.values(channelMap)
    .sort((a,b)=>Number(b.channel_score_gap||0)-Number(a.channel_score_gap||0))
    .slice(0,limit)
    .map(r=>({
      channel:r.channel_name || r.channel_handle || r.channel_id,
      brands:r.brands_covered || "",
      highBrand:r.channel_highest_brand,
      lowBrand:r.channel_lowest_brand,
      high:Number(r.channel_max_score || 0),
      low:Number(r.channel_min_score || 0),
      gap:Number(r.channel_score_gap || 0)
    }));
}
function multiBrandKpis(){
  const count = dataMeta.overlapChannelCount || 0;
  const detail = dataMeta.consistencyDetailRows || (ACTIVE_DATA.consistencyDetail || []).length;
  const inconsistent = dataMeta.inconsistentOverlapChannelCount || 0;
  const items = [
    ["多品牌博主数", count],
    ["博主-品牌明细数", detail],
    ["链路分差明显的博主数", inconsistent]
  ];
  return `<div class="card chart-panel multibrand-kpis"><h2>${copy("pages.performance.multibrandTitle","多品牌博主样本总览")}</h2>
    <div class="mb-kpi-grid">${items.map((x,i)=>`<div class="mb-kpi"><div class="mb-kpi-label">${x[0]}</div><div class="mb-kpi-value">${fmt(x[1])}</div></div>`).join("")}</div>
    <div class="footer-note">多品牌博主样本显示，同一批博主并不会天然带来相同的转化效果。品牌方提供的链接结构、邀请码、社群入口和 CTA 明确程度，会显著影响最终链路表现。</div>
  </div>`;
}
function multiBrandInternalChart(){
  const rows = multibrandRows();
  const maxChannels = Math.max(1,...rows.map(r=>r.channels));
  const maxVideos = Math.max(1,...rows.map(r=>r.videos));
  return `<div class="card chart-panel"><h2>${copy("pages.performance.internalChartTitle","多品牌博主内部品牌表现")}</h2>
    <div class="mb-brand-chart">${rows.map(r=>`<div class="mb-brand-row" style="--c:${color(r.brand)}">
      <div ${brandAttrs(r.brand,"mb-brand-name")}><span class="dot" style="--c:${color(r.brand)}"></span>${r.brand}</div>
      <div class="mb-bars">
        <div class="mb-bar-line"><span>博主</span><div class="mb-track"><div style="width:${r.channels/maxChannels*100}%;background:${color(r.brand)}"></div></div><b>${fmt(r.channels)}</b></div>
        <div class="mb-bar-line"><span>视频</span><div class="mb-track"><div style="width:${r.videos/maxVideos*100}%;background:color-mix(in srgb, ${color(r.brand)} 55%, #fff)"></div></div><b>${fmt(r.videos)}</b></div>
        <div class="mb-score-line"><span>链路分</span><b>${r.score.toFixed(2)}</b><div class="score-mini"><div style="width:${Math.min(100,r.score/3*100)}%;background:${color(r.brand)}"></div></div></div>
      </div>
    </div>`).join("")}</div>
    <div class="footer-note">只统计同时覆盖多个品牌的博主：用于观察同一批博主内部，不同品牌的链路执行差异。</div>
  </div>`;
}
function highLowChart(){
  const rows = highLowCounts();
  const max = Math.max(1,...rows.flatMap(r=>[r.high,r.low]));
  return `<div class="card chart-panel"><h2>${copy("pages.performance.highLowTitle","同博主最高分 / 最低分品牌次数")}</h2>
    <div class="highlow-chart">${rows.map(r=>`<div class="highlow-row" style="--c:${color(r.brand)}">
      <div ${brandAttrs(r.brand,"mb-brand-name")}><span class="dot" style="--c:${color(r.brand)}"></span>${r.brand}</div>
      <div class="highlow-bars">
        <div class="hl-item"><span>最高分</span><div class="mb-track"><div style="width:${r.high/max*100}%;background:${color(r.brand)}"></div></div><b>${fmt(r.high)}</b></div>
        <div class="hl-item"><span>最低分</span><div class="mb-track"><div style="width:${r.low/max*100}%;background:#98a2b3"></div></div><b>${fmt(r.low)}</b></div>
      </div>
    </div>`).join("")}</div>
    <div class="footer-note">同一博主内的最高分和最低分对比可以更直接地说明：博主不是唯一变量，品牌提供的转化材料和承接路径同样重要。</div>
  </div>`;
}
function topGapSlopeChart(){
  const rows = topGapChannels(8);
  return `<div class="card chart-panel"><h2>${copy("pages.performance.topGapTitle","Top 差距博主 Slope Chart")}</h2>
    <div class="slope-list">${rows.map(r=>{
      const y1 = 24 + (3-r.high)/3*60;
      const y2 = 24 + (3-r.low)/3*60;
      return `<div class="slope-row-card">
        <div class="slope-channel"><strong>${esc(r.channel)}</strong><span>${esc(r.brands)}</span></div>
        <svg viewBox="0 0 340 110" width="100%" height="110">
          <text x="26" y="18" font-size="12" fill="#667085">最高分</text><text x="260" y="18" font-size="12" fill="#667085">最低分</text>
          <line x1="70" y1="${y1}" x2="270" y2="${y2}" stroke="${color(r.highBrand)}" stroke-width="3"/>
          <circle cx="70" cy="${y1}" r="6" fill="${color(r.highBrand)}"/><circle cx="270" cy="${y2}" r="6" fill="${color(r.lowBrand)}"/>
          <text x="70" y="${y1-10}" font-size="12" text-anchor="middle" font-weight="800" fill="${color(r.highBrand)}">${r.highBrand} ${r.high.toFixed(2)}</text>
          <text x="270" y="${y2-10}" font-size="12" text-anchor="middle" font-weight="800" fill="${color(r.lowBrand)}">${r.lowBrand} ${r.low.toFixed(2)}</text>
          <text x="170" y="102" font-size="12" text-anchor="middle" fill="#ff4849" font-weight="800">差距 ${r.gap.toFixed(2)}</text>
        </svg>
      </div>`;
    }).join("")}</div>
    <div class="footer-note">这些博主说明，同一个博主在不同品牌之间可能产生明显链路差异；差异往往来自品牌侧链接、code、社群入口和 CTA 是否清晰。</div>
  </div>`;
}

function brandCard(b, compact=false){
  const c=color(b.key);
  return `<div class="card brand-card" style="--c:${c}">
    <div class="brand-head">
      <div ${brandAttrs(b.key,"brand-name")}><span class="logo ${b.key==='VSPhone'?'ghost':''}">${b.logo}</span>${b.key}</div>
      ${compact ? "" : `<span class="tag">${b.tag || ""}</span>`}
    </div>
    <div class="metrics" style="${compact?'grid-template-columns:repeat(2,1fr)':''}">
      <div class="metric"><div class="metric-label">${copy("labels.kolVideos","KOL 视频数")}</div><div class="metric-value">${fmt(b.videos)}</div><div class="metric-sub">${copy("labels.videosUnit","视频")}</div></div>
      <div class="metric"><div class="metric-label">${copy("labels.coveredChannels","覆盖博主数")}</div><div class="metric-value">${fmt(b.channels)}</div><div class="metric-sub">${copy("labels.channelsUnit","博主")}</div></div>
      ${compact ? "" : `<div class="metric"><div class="metric-label">${copy("labels.conversionScore","转化链路得分")}</div><div class="metric-value">${Number(b.score||0).toFixed(2)} / 3</div><div class="metric-sub">${copy("labels.scoreUnit","得分")}</div></div>
      <div class="metric"><div class="metric-label">${copy("labels.commentsPerThousand","每千播放评论数")}</div><div class="metric-value">${Number(b.comments||0).toFixed(2)}</div><div class="metric-sub">评论/千播放</div></div>`}
    </div>
  </div>`;
}
function header(title, subtitle){
  return `<div class="header"><h1>${title}</h1><div class="eyebrow">${subtitle}</div></div>`;
}
function overviewBars(title=copy("pages.home.brandOverviewTitle","品牌总览")){
  const max = niceMax(Math.max(...brands.map(b => Number(b.videos || 0)), ...brands.map(b => Number(b.channels || 0))));
  const ticks = [0, .25, .5, .75, 1].map(t => Math.round(max*t));
  return `<div class="card chart-panel">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:14px">
      <h2>${title}</h2>
      <div class="legend"><span><i class="legend-dot" style="--c:#ff4849"></i>${copy("labels.videoSeries","KOL 视频数（视频）")}</span><span><i class="legend-dot" style="background:#d8dce3"></i>${copy("labels.channelSeries","覆盖博主数（博主）")}</span></div>
    </div>
    <div class="bar-chart">
      ${brands.map(b=>`<div class="bar-row">
        <div ${brandAttrs(b.key,"bar-label")}><span class="dot" style="--c:${color(b.key)}"></span>${b.key}</div>
        <div>
          <div class="bar-track"><div class="bar-video" style="--c:${color(b.key)};--w:${Math.min(100,(b.videos/max*100))}%"></div></div>
          <div class="bar-channel" style="--cw:${Math.min(100,(b.channels/max*100))}%"></div>
        </div>
        <div class="bar-num">${fmt(b.videos)}<br><span style="color:#667085">${fmt(b.channels)}</span></div>
      </div>`).join("")}
    </div>
    <div class="footer-note">${ticks.map(fmt).join("　　　　　")}　　${copy("labels.quantityAxis","数量")}</div>
  </div>`;
}
function insightPanel(title, items){
  return `<div class="card insight-panel"><h2>${title}</h2><div class="insight-list">
    ${items.map(it=>`<div class="insight-item" style="--c:${it.c}">
      <div class="insight-icon">${it.icon}</div><div><div class="insight-title">${it.title}</div><div class="insight-text">${it.text}</div></div>
    </div>`).join("")}
  </div></div>`;
}
function lineChart(data, title, maxY=null){
  const width=980, height=380, padL=64, padR=32, padT=42, padB=62;
  const keys = brands.map(b=>b.key).filter(k => data[k]);
  const yMax = niceMax(maxY || maxArr(data));
  const innerW=width-padL-padR, innerH=height-padT-padB;
  const stepX = (months.length > 1) ? innerW/(months.length-1) : 0;
  const xAt = i => padL+i*stepX;
  const yAt = v => padT+innerH-(Number(v||0)/yMax)*innerH;
  const pointsFor = arr => arr.map((v,i)=>`${xAt(i)},${yAt(v)}`).join(" ");
  const grid = [0,.25,.5,.75,1].map(t=>`<line x1="${padL}" x2="${width-padR}" y1="${padT+innerH*(1-t)}" y2="${padT+innerH*(1-t)}" stroke="#edf0f5"/>`).join("");
  const bands = months.map((m,i)=>{
    const x = xAt(i) - stepX/2;
    const bw = i===0 || i===months.length-1 ? stepX/2 : stepX;
    const tip = `${m}\n` + brands.map(b => `${b.key}: ${fmt((data[b.key] || [])[i] || 0)}`).join("\n");
    const html = tooltipHtml(m, brands.map(b => ({label:b.key, value:fmt((data[b.key] || [])[i] || 0), color:color(b.key)}))); return `<rect x="${Math.max(padL, x)}" y="${padT}" width="${Math.max(10,bw)}" height="${innerH}" fill="transparent" class="hover-band" ${tooltipAttr(html)}></rect>`;
  }).join("");
  return `<div class="mini-chart exposure-line-chart"><svg viewBox="0 0 ${width} ${height}" width="100%" height="380">
    <text x="8" y="20" class="svg-title">${title}</text>
    ${grid}
    ${[0,.25,.5,.75,1].map(t=>`<text x="${padL-10}" y="${yAt(yMax*t)+4}" font-size="11" text-anchor="end" fill="#667085">${fmt(Math.round(yMax*t))}</text>`).join("")}
    ${keys.map(k=>{
      const linePts = pointsFor(data[k]);
      const areaPts = `${padL},${padT+innerH} ${linePts} ${padL+(data[k].length-1)*stepX},${padT+innerH}`;
      return `<polygon ${brandAttrs(k,"chart-area line-area-fill")} points="${areaPts}" fill="${color(k)}" opacity="0"/>
        <polyline ${brandAttrs(k,"chart-line")} points="${linePts}" fill="none" stroke="${color(k)}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/>
        ${data[k].map((v,i)=>`<circle ${brandAttrs(k,"chart-point")} cx="${xAt(i)}" cy="${yAt(v)}" r="4" fill="${color(k)}" ${tooltipAttr(tooltipHtml(months[i], [{label:k, value:fmt(v), color:color(k)}]))}></circle>`).join("")}`;
    }).join("")}
    ${bands}
    ${months.map((m,i)=>{ const x = xAt(i); return `<text x="${x}" y="${height-18}" font-size="10.5" text-anchor="middle" fill="#667085" transform="rotate(-35 ${x},${height-18})">${m}</text>` }).join("")}
  </svg>
  <div class="legend">${brands.map(b=>`<span ${brandAttrs(b.key,"legend-brand")}><i class="legend-dot" style="--c:${color(b.key)}"></i>${b.key}</span>`).join("")}</div></div>`;
}
function distributionChart(){
  const labels = copy("labels.subscriberBuckets", ["0–1k", "1k–10k", "10k+"]);
  const keys = copy("labels.subscriberBucketKeys", ["0-1k", "1k-10k", "10k+"]);
  const countsObj = ACTIVE_DATA.distributionCounts || {};
  return `<div class="card chart-panel distribution-panel"><h2>${copy("pages.exposure.distributionTitle","博主订阅数分布")}</h2>
    <div class="legend" style="justify-content:flex-end">${brands.map(b=>`<span ${brandAttrs(b.key,"legend-brand")}><i class="legend-dot" style="--c:${color(b.key)}"></i>${b.key}</span>`).join("")}</div>
    <div style="display:grid;grid-template-columns:110px 1fr;gap:12px;margin:16px 0 4px;color:#475467;font-weight:800"><span></span><div style="display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center">${labels.map(x=>`<span>${x}</span>`).join("")}</div></div>
    ${brands.map(b=>{
      const vals = distribution[b.key] || [0,0,0];
      const counts = countsObj[b.key] || [0,0,0];
      const total = counts.reduce((a,c)=>a+Number(c||0),0) || Number(b.channels||0);
      return `<div class="dist-row">
        <div ${brandAttrs(b.key,"bar-label")}><span class="dot" style="--c:${color(b.key)}"></span>${b.key}</div>
        <div class="segment">
          ${vals.map((v,i)=>{
            const count = Number(counts[i] || 0);
            const title = `${b.key}｜${labels[i]}：${fmt(count)} / ${fmt(total)} 个博主（${pctText(v)}）`;
            return `<span ${brandAttrs(b.key,"segment-block")} ${tooltipAttr(tooltipHtml(`${b.key}｜${labels[i]}`, [{label:"博主数量", value:`${fmt(count)} / ${fmt(total)}`, color:color(b.key)}, {label:"占比", value:pctText(v), color:color(b.key)}]))} style="width:${Math.max(2,Number(v||0))}%;background:color-mix(in srgb, ${color(b.key)} ${i===2?85:i===1?35:20}%, #fff);${i===2?'color:#fff':''}">${pctText(v)}</span>`;
          }).join("")}
        </div>
      </div>`;
    }).join("")}
    <div class="footer-note">${copy("notes.distributionData","鼠标悬停到色块，可查看该订阅数区间的博主数量和占比。")}</div>
  </div>`;
}

function homeRadarChart(){
  const metrics = [
    {key:"videos", label:"KOL视频数", max:1500, fmt:v=>fmt(Math.round(v))},
    {key:"channels", label:"覆盖博主数", max:350, fmt:v=>fmt(Math.round(v))},
    {key:"score", label:"转化链路得分", max:3, fmt:v=>Number(v||0).toFixed(2)},
    {key:"comments", label:"每千播放评论数", max:5, fmt:v=>Number(v||0).toFixed(2)}
  ];
  const cx=245, cy=215, r=122;
  const angle = i => (-90+i*360/metrics.length)*Math.PI/180;
  const pt = (value, i) => {
    const ratio = Math.max(0, Math.min(1, Number(value||0)/metrics[i].max));
    const a = angle(i);
    return [cx+Math.cos(a)*r*ratio, cy+Math.sin(a)*r*ratio];
  };
  const ring = pct => metrics.map((_,i)=>{
    const a=angle(i);
    return [cx+Math.cos(a)*r*pct, cy+Math.sin(a)*r*pct].join(",");
  }).join(" ");
  const axis = metrics.map((m,i)=>{
    const a=angle(i);
    const end=[cx+Math.cos(a)*r, cy+Math.sin(a)*r];
    const lab=[cx+Math.cos(a)*(r+62), cy+Math.sin(a)*(r+62)];
    const anchor = lab[0]<cx-8?'end':lab[0]>cx+8?'start':'middle';
    const html = tooltipHtml(m.label, brands.map(b=>({label:b.key, value:m.fmt(b[m.key]), color:color(b.key)})).concat([{label:"轴上限", value:m.fmt(m.max), color:"#98a2b3"}]));
    return `<line x1="${cx}" y1="${cy}" x2="${end[0]}" y2="${end[1]}" stroke="#e8ebf0"/>
      <text x="${lab[0]}" y="${lab[1]-4}" text-anchor="${anchor}" font-size="13" font-weight="900" fill="#344054">${m.label}</text>
      <text x="${lab[0]}" y="${lab[1]+13}" text-anchor="${anchor}" font-size="10.5" fill="#667085">上限 ${m.fmt(m.max)}</text>
      <line x1="${cx}" y1="${cy}" x2="${lab[0]}" y2="${lab[1]}" stroke="transparent" stroke-width="34" class="radar-axis-capture" ${tooltipAttr(html)}></line>`;
  }).join("");
  return `<div class="card chart-panel home-radar-panel"><div style="display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">
    <h2>综合能力雷达图</h2>
    <div class="legend">${brands.map(b=>`<span ${brandAttrs(b.key,"legend-brand")}><i class="legend-dot" style="--c:${color(b.key)}"></i>${b.key}</span>`).join("")}</div>
  </div>
  <div class="home-radar-layout">
    <svg viewBox="0 0 540 440" width="100%" height="440">
      ${[.25,.5,.75,1].map(t=>`<polygon points="${ring(t)}" fill="none" stroke="#e8ebf0"/>`).join("")}
      ${axis}
      ${brands.map(b=>{
        const points = metrics.map((m,i)=>pt(b[m.key],i).join(",")).join(" ");
        const html = tooltipHtml(b.key, metrics.map(m=>({label:m.label,value:m.fmt(b[m.key]),color:color(b.key)})));
        return `<polygon ${brandAttrs(b.key,"radar-area home-radar-area")} points="${points}" fill="${color(b.key)}24" stroke="${color(b.key)}" stroke-width="3" ${tooltipAttr(html)}/>
          ${metrics.map((m,i)=>{const p=pt(b[m.key],i); return `<circle ${brandAttrs(b.key,"radar-point")} cx="${p[0]}" cy="${p[1]}" r="4.5" fill="${color(b.key)}" ${tooltipAttr(html)}/>`}).join("")}`;
      }).join("")}
    </svg>
  </div></div>`;
}


function ugphoneBriefChain(){
  const cfg = copy("ugphoneBriefChain", {});
  const steps = cfg.steps || [];
  if(!steps.length) return "";
  return `<div class="card brief-chain-card">
    <div class="brief-chain-head">
      <div>
        <div class="eyebrow">${cfg.eyebrow || "UGPHONE KOL BRIEF"}</div>
        <h2>${cfg.title || "UgPhone KOL 视频要求对应的获客链路"}</h2>
        <p>${cfg.subtitle || ""}</p>
      </div>
      <div class="brief-chain-badge">从内容要求到产品获客</div>
    </div>
    <div class="brief-chain-flow">
      ${steps.map((s,i)=>`<div class="brief-step ${s.title==="链路承接"?"brief-step-highlight":""}" style="--i:${i+1}">
        <div class="brief-step-num">${i+1}</div>
        <div class="brief-step-title">${s.title}</div>
        <div class="brief-step-body">${s.body}</div>
      </div>${i<steps.length-1?'<div class="brief-arrow">→</div>':''}`).join("")}
    </div>
    <div class="brief-chain-footer">${cfg.footer || ""}</div>
  </div>`;
}

function renderHome(){
  const steps = copy("frameworkSteps", []);
  document.querySelector("#home").innerHTML = header(copy("pages.home.title","YouTube KOL 转化链路分析"), copy("pages.home.subtitle","曝光 → 转化链路 → 互动验证 → 终端承接"))+
  `${ugphoneBriefChain()}
  <div class="grid brand-cards">${brands.map(b=>brandCard(b)).join("")}</div>
  <div class="two-col">${homeRadarChart()}
    ${insightPanel(copy("pages.home.insightTitle","核心洞察"), insightItems("home"))}
  </div>
  ${summaryCallout(copy("pages.home.summaryTitle","主页总结"), copy("pages.home.summaryText",""), "UgPhone")}
  <div class="card framework"><h2>${copy("pages.home.frameworkTitle","分析框架")}</h2><div class="flow-steps">
    ${steps.map((s,i)=>{ const c = s.color || color(s.colorBrand); return `<div class="step" style="--c:${c}"><div class="step-num">${i+1}</div><div class="step-icon">${s.icon}</div><div><div class="step-title">${s.title}</div><div class="insight-text">${s.body}</div></div></div>${i<steps.length-1?'<div class="arrow">→</div>':''}`}).join("")}
  </div><div class="footer-note">${withDataNote()}</div></div>`;
}
function renderExposure(){
  document.querySelector("#exposure").innerHTML = header(copy("pages.exposure.title","曝光层"), copy("pages.exposure.subtitle","轻月度，重整体：看谁铺了多少 KOL"))+
  `<div class="grid kpi-row">${brands.map(b=>brandCard(b,true)).join("")}</div>
  <div class="two-col">${overviewBars(copy("pages.exposure.overviewTitle","总体覆盖对比"))}
  ${insightPanel(copy("pages.exposure.insightTitle","关键结论"), insightItems("exposure"))}</div>
  <div class="card chart-panel exposure-month-panel"><h2>${copy("pages.exposure.monthlyTitle","月度趋势")}</h2>
    <div class="trend-wrap exposure-trends">
      ${lineChart(monthlyVideos,copy("pages.exposure.monthlyVideoTitle","KOL 视频数（视频）"))}
      ${lineChart(monthlyChannels,copy("pages.exposure.monthlyChannelTitle","覆盖博主数（博主）"))}
    </div>
    <div class="footer-note">${withDataNote(copy("notes.monthlyData","鼠标悬停在某个月的图表区域，可查看四家品牌在该月的详细数据。"))}</div>
  </div>
  <div class="exposure-distribution-row">${distributionChart()}</div>`;
}
function radarSvg(){
  const labels = convMetrics.map(r => r[0]);
  const keys = brands.map(b => b.key);
  const vals = {};
  keys.forEach((k, idx) => { vals[k] = convMetrics.map(r => Number(r[idx+1] || 0)); });
  const metricMaxes = labels.map((_,i)=> niceMetricMax(Math.max(...keys.map(k => Number(vals[k][i] || 0))) * 1.08));
  const cx=300, cy=255, r=145;
  const pt=(v,i,rr=r)=>{
    const a=(-90+i*360/labels.length)*Math.PI/180;
    const denom = metricMaxes[i] || 100;
    const ratio = Math.max(0, Math.min(1, Number(v||0)/denom));
    return [cx+Math.cos(a)*rr*ratio,cy+Math.sin(a)*rr*ratio];
  };
  const ring=(pct)=> labels.map((_,i)=>{
    const a=(-90+i*360/labels.length)*Math.PI/180;
    return [cx+Math.cos(a)*r*pct, cy+Math.sin(a)*r*pct].join(",");
  }).join(" ");
  const axisMeta = labels.map((l,i)=>{
    const a=(-90+i*360/labels.length)*Math.PI/180;
    const end=[cx+Math.cos(a)*r, cy+Math.sin(a)*r];
    const captureEnd=[cx+Math.cos(a)*(r+72), cy+Math.sin(a)*(r+72)];
    const lab=[cx+Math.cos(a)*(r+62), cy+Math.sin(a)*(r+62)];
    const half=[cx+Math.cos(a)*(r*.5), cy+Math.sin(a)*(r*.5)];
    const anchor = lab[0]<cx-8?'end':lab[0]>cx+8?'start':'middle';
    const axisTip = tooltipHtml(l, keys.map(k => ({label:k, value:pctText(vals[k][i]), color:color(k)})).concat([{label:"该轴上限", value:pctText(metricMaxes[i]), color:"#98a2b3"}]));
    return {l,i,a,end,captureEnd,lab,half,anchor,axisTip};
  });
  return `<div class="radar-wrap"><svg viewBox="0 0 700 500" width="100%" height="450">
    ${[.25,.5,.75,1].map(t=>`<polygon points="${ring(t)}" fill="none" stroke="#e8ebf0"/>`).join("")}
    ${axisMeta.map(m=>`<line x1="${cx}" y1="${cy}" x2="${m.end[0]}" y2="${m.end[1]}" stroke="#e8ebf0"/>
      <text x="${m.half[0]}" y="${m.half[1]}" text-anchor="middle" font-size="10" fill="#98a2b3">${pctText(metricMaxes[m.i]/2)}</text>
      <text x="${m.lab[0]}" y="${m.lab[1]-7}" text-anchor="${m.anchor}" font-size="12.5" font-weight="800" fill="#344054" class="radar-axis-label">${m.l}</text>
      <text x="${m.lab[0]}" y="${m.lab[1]+8}" text-anchor="${m.anchor}" font-size="10.5" fill="#667085" class="radar-axis-label">上限 ${pctText(metricMaxes[m.i])}</text>`).join("")}
    ${keys.map(k=>{
      const points=vals[k].map((v,i)=>pt(v,i).join(",")).join(" ");
      return `<polygon ${brandAttrs(k,"radar-area")} points="${points}" fill="${color(k)}22" stroke="${color(k)}" stroke-width="3"/>
        ${vals[k].map((v,i)=>{const p=pt(v,i); return `<circle ${brandAttrs(k,"radar-point")} cx="${p[0]}" cy="${p[1]}" r="4" fill="${color(k)}" ${tooltipAttr(tooltipHtml(k, [{label:labels[i], value:pctText(v), color:color(k)}, {label:"该轴上限", value:pctText(metricMaxes[i]), color:"#98a2b3"}]))}></circle>`}).join("")}`;
    }).join("")}
    ${axisMeta.map(m=>{
      const labelX = m.anchor === "end" ? m.lab[0]-78 : (m.anchor === "start" ? m.lab[0] : m.lab[0]-42);
      const labelY = m.lab[1]-24;
      return `<line x1="${cx}" y1="${cy}" x2="${m.captureEnd[0]}" y2="${m.captureEnd[1]}" stroke="transparent" stroke-width="34" class="radar-axis-capture" ${tooltipAttr(m.axisTip)}></line>
        <rect x="${labelX}" y="${labelY}" width="118" height="42" fill="transparent" class="radar-axis-capture" ${tooltipAttr(m.axisTip)}></rect>`;
    }).join("")}
  </svg><div class="axis-scale-note">${copy("notes.radarScale","雷达图每个指标采用独立轴上限，避免低比例指标被 0–100 的统一刻度压扁。")}</div></div>`;
}

function conversionTable(){
  const keys=brands.map(b=>b.key);
  return `<table class="data-table"><thead><tr><th>指标</th>${keys.map(k=>`<th><button type="button" ${brandAttrs(k,"brand-button table-brand-button")} style="--c:${color(k)};color:${color(k)}">${k}</button></th>`).join("")}</tr></thead>
  <tbody>${convMetrics.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map((v,i)=>`<td style="color:${color(keys[i])}">${pctText(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function paths(){
  const rows = ACTIVE_DATA.pathRows || brands.map(b => ({brand:b.key, steps:["YouTube 视频","官网 / code","社群 / 说明","下载 / 使用"]}));
  return `<div class="card path-panel"><h2>${copy("pages.conversion.pathTitle","品牌转化路径")}</h2>${rows.map(row=>{
    const b = getBrand(row.brand);
    const steps = row.steps || [];
    return `<div class="path-row" style="--c:${color(row.brand)}">
      <div class="path-brand"><span class="logo" style="width:34px;height:34px;background:${color(row.brand)}">${b.logo}</span>${row.brand}</div>
      ${steps.map((x,i)=>`<div class="path-box">${x}${i===0?'<small>入口</small>':i===steps.length-1?'<small>结果</small>':''}</div>${i<steps.length-1?'<div class="arrow" style="font-size:28px">→</div>':''}`).join("")}
    </div>`;
  }).join("")}</div>`;
}

function conversionScoreCompact(){
  return `<div class="card chart-panel conversion-score-compact"><h2>${copy("pages.conversion.scoreTitle","转化链路清晰度")}</h2>
    <div class="eyebrow" style="font-size:13px;margin-bottom:14px">${copy("pages.conversion.scoreSubtitle","综合评估各品牌从曝光到转化的链路清晰程度（满分 3 分）")}</div>
    <div class="score-compact-grid">
      ${brands.map(b=>`<div class="score-compact-card" style="--c:${color(b.key)}">
        <button type="button" ${brandAttrs(b.key,"score-compact-brand")}><span class="logo" style="width:32px;height:32px;background:${color(b.key)}">${b.logo}</span>${b.key}</button>
        <div class="score-compact-value"><strong>${Number(b.score||0).toFixed(2)}</strong><span>/ 3</span></div>
      </div>`).join("")}
    </div>
  </div>`;
}

function renderConversion(){
  document.querySelector("#conversion").innerHTML = header(copy("pages.conversion.title","转化层"), copy("pages.conversion.subtitle","核心：这些 KOL 视频是否形成可追踪、可转化的路径？"))+
  `<div class="card chart-panel conversion-radar-full"><h2>${copy("pages.conversion.radarTitle","转化链路指标雷达图")}</h2><div class="radar-layout"><div>${radarSvg()}</div><div>${conversionTable()}</div></div></div>
  <div class="two-col conversion-lower-grid" style="grid-template-columns:1.65fr .85fr">
    ${pathCards("conversion")}
    <div class="conversion-right-stack">
      ${conversionScoreCompact()}
      ${insightPanel(copy("pages.conversion.insightTitle","关键洞察"), insightItems("conversion"))}
    </div>
  </div>`;
}
function commentsBar(){
  const order=sortedBrandsBy("comments", true);
  const max = Math.max(1, ...order.map(b=>Number(b.comments||0)));
  return `<div class="card chart-panel"><h2>${copy("pages.performance.commentsTitle","每千播放评论数对比")}</h2><div class="bar-chart">${order.map(b=>`<div class="bar-row">
    <div ${brandAttrs(b.key,"bar-label")}><span class="dot" style="--c:${color(b.key)}"></span>${b.key}</div>
    <div class="bar-track"><div class="bar-video" style="--c:${color(b.key)};--w:${Math.min(100,(b.comments/max*100))}%"></div></div>
    <div class="bar-num">${Number(b.comments||0).toFixed(2)}</div>
  </div>`).join("")}</div><div class="footer-note">${copy("notes.commentsFormula","按 Data 中 views 与 comments 计算：comments / views × 1000")}</div></div>`;
}
function overlapChart(){
  const keys=brands.map(b=>b.key);
  const max = niceMax(Math.max(40, ...Object.values(overlap || {}).flat().map(Number)));
  return `<div class="card chart-panel"><h2>${copy("pages.performance.overlapTitle","多品牌 KOL 重叠率")}</h2><div class="legend" style="justify-content:flex-end"><span><i class="legend-dot" style="background:#c8ccd3"></i>${copy("labels.multiBrandChannelShare","多品牌博主占比")}</span><span><i class="legend-dot" style="background:#111"></i>${copy("labels.multiBrandVideoShare","多品牌博主贡献视频占比")}</span></div>
  <svg viewBox="0 0 620 280" width="100%" height="280">
    ${[0,.25,.5,.75,1].map(t=>`<line x1="55" x2="590" y1="${240-t*200}" y2="${240-t*200}" stroke="#edf0f5"/><text x="26" y="${244-t*200}" font-size="12" fill="#667085">${Math.round(max*t)}%</text>`).join("")}
    ${keys.map((k,i)=>{const x=80+i*130; const a=Number((overlap[k]||[0,0])[0]||0), b=Number((overlap[k]||[0,0])[1]||0); return `<rect ${brandAttrs(k,"overlap-bar")} x="${x}" y="${240-a/max*200}" width="34" height="${a/max*200}" fill="#d4d7dd" ${tooltipAttr(tooltipHtml(k, [{label:copy("labels.multiBrandChannelShare","多品牌博主占比"), value:pctText(a), color:"#c8ccd3"}]))}></rect><rect ${brandAttrs(k,"overlap-bar")} x="${x+44}" y="${240-b/max*200}" width="34" height="${b/max*200}" fill="#111" ${tooltipAttr(tooltipHtml(k, [{label:copy("labels.multiBrandVideoShare","多品牌博主贡献视频占比"), value:pctText(b), color:"#111"}]))}></rect>
    <text x="${x+17}" y="${232-a/max*200}" font-size="13" text-anchor="middle" font-weight="800">${pctText(a)}</text><text x="${x+61}" y="${232-b/max*200}" font-size="13" text-anchor="middle" font-weight="800">${pctText(b)}</text>
    <text x="${x+39}" y="264" font-size="13" text-anchor="middle" font-weight="800">${k}</text>`}).join("")}
  </svg></div>`;
}
function creatorCards(){
  const cases = ACTIVE_DATA.creatorCases || [];
  const overlapCount = dataMeta.overlapChannelCount || 0;
  const inconsistent = dataMeta.inconsistentOverlapChannelCount || cases.length;
  if(!cases.length){
    return `<div class="card chart-panel"><h2>${copy("pages.performance.consistencyTitle","一致性观察：同一博主，不同品牌")}</h2><div class="insight-text">Data 中暂未识别到“同一博主覆盖多个品牌且链路得分差异 ≥ 1”的样本。运行 build_web_data.py 后会自动更新这里。</div></div>`;
  }
  return `<div class="card chart-panel"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><h2>${copy("pages.performance.consistencyTitle","一致性观察：同一博主，不同品牌")}</h2><span class="badge">${fmt(overlapCount)} 个重叠博主中，<b style="color:#ff4849">${fmt(inconsistent)}</b> 个博主不同品牌链路差距 ≥ 1 分</span></div>
  <div class="creator-grid">${cases.slice(0,3).map(c=>`<div class="creator-card"><div style="display:flex;justify-content:space-between;gap:8px"><h3>${esc(c.displayName)}</h3><span class="badge">${fmt(c.brandCount)} 个品牌合作</span></div>
  <div class="slope"><svg viewBox="0 0 300 92" width="100%" height="92">
    <text x="8" y="28" font-size="13" font-weight="800" fill="${color(c.highBrand)}">${c.highBrand} ${Number(c.highScore).toFixed(2)}</text>
    <text x="205" y="70" font-size="13" font-weight="800" fill="${color(c.lowBrand)}">${c.lowBrand} ${Number(c.lowScore).toFixed(2)}</text>
    <line x1="80" y1="30" x2="215" y2="66" stroke="${color(c.highBrand)}" stroke-width="3"/><circle cx="80" cy="30" r="5" fill="${color(c.highBrand)}"/><circle cx="215" cy="66" r="5" fill="${color(c.lowBrand)}"/>
  </svg></div><span class="note-pill">差距 ${Number(c.diff).toFixed(2)} 分</span></div>`).join("")}</div>
  <div class="footer-note">${copy("notes.consistencySource","以上博主和得分均从 Data 中计算。")}</div></div>`;
}
function consistencyDetailTable(){
  const rows = ACTIVE_DATA.consistencyDetail || [];
  if(!rows.length) return "";
  const cols = Object.keys(rows[0]);
  return `<div class="card chart-panel consistency-detail-panel"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><h2>${copy("pages.performance.consistencyDetailTitle","一致性观察完整明细表")}</h2><span class="badge">${fmt(rows.length)} 行 × ${fmt(cols.length)} 列</span></div>
    <div class="detail-scroll"><table class="detail-table"><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>
      ${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join("")}</tr>`).join("")}
    </tbody></table></div>
    <div class="footer-note">该表展示多品牌博主在不同品牌之间的链路差异，包含品牌、月份、链接率、样本 URL、CTA、最高/最低品牌与链路分差等字段。</div>
  </div>`;
}
function renderPerformance(){
  document.querySelector("#performance").innerHTML = header(copy("pages.performance.title","表现层"), copy("pages.performance.subtitle","只看多品牌博主内部：同一批博主推广不同品牌时，链路表现是否一致？"))+
  `<div class="grid kpi-row">${brands.map(b=>`<div class="card kpi-card" style="--c:${color(b.key)}"><div class="kpi-brand"><span class="logo" style="background:${color(b.key)}">${b.logo}</span>${b.key}</div><div class="kpi-body"><div><div class="metric-label">${copy("labels.commentsPerThousand","每千播放评论数")}</div><div class="kpi-val">${Number(b.comments||0).toFixed(2)}</div></div><div><div class="metric-label">${copy("labels.commentRate","评论率（Data）")}</div><div class="kpi-val" style="color:#111">${Number(b.commentRate||0).toFixed(3)}%</div></div></div></div>`).join("")}</div>
  <div class="perf-grid">${commentsBar()}${overlapChart()}</div>
  ${multiBrandKpis()}
  <div class="perf-grid">${multiBrandInternalChart()}${highLowChart()}</div>
  ${topGapSlopeChart()}
  <div class="two-col" style="grid-template-columns:1fr">${insightPanel(copy("pages.performance.conclusionTitle","结论"), insightItems("performance"))}</div>
  ${consistencyDetailTable()}`;
}


function terminalMechanismSummary(brand){
  const map = (window.WEB_COPY && WEB_COPY.terminalMechanismSummary) || {
    UgPhone: "Code + 社群多点承接",
    VSPhone: "官网追踪 + code 辅助",
    RedFinger: "社群 / code 分散承接",
    LDCloud: "官网 + creator link 标准化"
  };
  return map[brand] || "";
}
function terminalMetricMeta(label){
  if(label.includes("官网链接率")) return {key:"officialLinkRate", suffix:"%"};
  if(label.includes("Code/Referral")) return {key:"codeReferralRate", suffix:"%"};
  if(label.includes("App导流率") || label.includes("App 导流率")) return {key:"appStoreRate", suffix:"%"};
  if(label.includes("Web端导流率") || label.includes("Web 端导流率")) return {key:"webPortalRate", suffix:"%"};
  if(label.includes("社群导流率")) return {key:"socialRate", suffix:"%"};
  if(label.includes("平均链路清晰度")) return {key:"score", suffix:" / 3"};
  return null;
}
function terminalRankFor(brand, key){
  const rows = brands.map(b => ({
    brand:b.key,
    value:Number((ACTIVE_DATA.conversionRates && ACTIVE_DATA.conversionRates[b.key] && ACTIVE_DATA.conversionRates[b.key][key]) ?? b[key] ?? 0)
  })).sort((a,b)=>b.value-a.value);
  const idx = rows.findIndex(x=>x.brand===brand);
  return idx >= 0 ? idx + 1 : "";
}
function terminalBulletRow(brand, raw){
  const parts = String(raw || "").split("：");
  const label = parts[0] || "";
  const value = parts.slice(1).join("：") || "";
  const meta = terminalMetricMeta(label);
  const rank = meta ? terminalRankFor(brand, meta.key) : "";
  return `<li class="terminal-metric-row"><span class="terminal-metric-label">${label}</span><span class="terminal-metric-value">${value}</span>${rank ? `<span class="terminal-metric-rank">第 ${rank}</span>` : ""}</li>`;
}

function mechanismCard(item){
  const b = getBrand(item.brand);
  const summary = terminalMechanismSummary(item.brand) || item.tag || "";
  return `<div class="card mechanism-card terminal-mechanism-card" style="--c:${color(item.brand)}">
    <div class="brand-head terminal-brand-head">
      <div ${brandAttrs(item.brand,"brand-name")}><span class="logo" style="background:${color(item.brand)}">${b.logo}</span>${item.brand}</div>
      <span class="tag terminal-summary-tag">${summary}</span>
    </div>
    <ul class="terminal-metric-list">${(item.bullets||[]).map(x=>terminalBulletRow(item.brand, x)).join("")}</ul>
  </div>`;
}
function terminalTable(){
  const rows = ACTIVE_DATA.terminalTable || [];
  const cls=v=>v==="强"||v==="低"?"good":v==="高"?"bad":"mid";
  return `<div class="card chart-panel"><h2>${copy("pages.terminal.tableTitle","终端承接对比")}</h2><table class="compare-table"><thead><tr><th></th>${brands.map(b=>`<th style="color:${color(b.key)}">${b.key}</th>`).join("")}</tr></thead><tbody>
  ${rows.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map(v=>`<td class="${cls(v)}">${v}</td>`).join("")}</tr>`).join("")}</tbody></table>
  <div class="footer-note">${copy("notes.terminalTable","定性等级直接读取 xlsx 的 10_Terminal_Design sheet。")}</div></div>`;
}

function terminalProductValue(){
  const cfg = copy("terminalProductValue", {});
  const items = cfg.items || [];
  if(!items.length) return "";
  return `<div class="card terminal-product-value">
    <div class="terminal-product-head">
      <div>
        <div class="eyebrow">${cfg.eyebrow || "产品意义"}</div>
        <h2>${cfg.title || "调研意义"}</h2>
        <p>${cfg.subtitle || ""}</p>
      </div>
    </div>
    <div class="terminal-product-grid">
      ${items.map((it,i)=>`<div class="terminal-product-item">
        <div class="terminal-product-num">${i+1}</div>
        <div class="terminal-product-title">${it.title}</div>
        <div class="terminal-product-body">${it.text}</div>
      </div>`).join("")}
    </div>
    ${cfg.summary ? `<div class="terminal-product-summary">${cfg.summary}</div>` : ""}
  </div>`;
}

function renderTerminal(){
  document.querySelector("#terminal").innerHTML = header(copy("pages.terminal.title","终端承接"), copy("pages.terminal.subtitle","从 KOL 点击后，用户是否能顺利完成下一步？"))+
  `<div class="card chart-panel"><h2>${copy("pages.terminal.mechanismTitle","渠道机制与 CTA 承接")}</h2><div class="grid terminal-cards">
    ${(ACTIVE_DATA.terminalMechanisms || []).map(mechanismCard).join("")}
  </div></div>
  ${pathCards("terminal")}
  <div class="compare-grid">${terminalTable()}${insightPanel(copy("pages.terminal.insightTitle","关键结论"), insightItems("terminal"))}</div>
  ${terminalProductValue()}`;
}
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===id));
  window.location.hash = id;
}
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>showPage(btn.dataset.page)));

document.addEventListener("click", (e)=>{
  const el = e.target.closest("[data-brand-click]");
  if(!el) return;
  e.preventDefault();
  setActiveBrand(el.dataset.brandClick);
});
document.addEventListener("mousemove", (e)=>{
  const el = e.target.closest("[data-tooltip]");
  if(!el){ hideChartTooltip(); return; }
  showChartTooltip(e, el.dataset.tooltip);
});
document.addEventListener("mouseleave", hideChartTooltip);


renderHome(); renderExposure(); renderConversion(); renderPerformance(); renderTerminal();
enhanceConversionChainTooltips();
showPage(location.hash?.replace("#","") || "home");
