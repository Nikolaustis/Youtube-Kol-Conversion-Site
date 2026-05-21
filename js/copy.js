// Editable website copy. You can change webpage titles, subtitles, labels and fixed notes here.
// Data values still come from js/generated-data.js, which is built from Data/youtube_kol_web_data_statistics.xlsx.

window.WEB_COPY = {
  pages: {
    home: {
      title: "YouTube KOL 转化链路分析",
      subtitle: "曝光 → 转化链路 → 互动验证 → 终端承接",
      brandOverviewTitle: "品牌总览",
      insightTitle: "核心洞察",
      frameworkTitle: "分析框架",
      summaryTitle: "主页总结",
      summaryText: "YouTube KOL 竞争的核心差异不在播放量，而在内容能否形成可执行的转化链路。UgPhone 在规模和链路完整度上领先，LDCloud 小规模但承接质量高，VSPhone 具备官网追踪雏形，RedFinger 追求曝光但缺少链路。"
    },
    exposure: {
      title: "曝光层",
      subtitle: "轻月度，重整体：看谁铺了多少 KOL",
      overviewTitle: "总体覆盖对比",
      insightTitle: "关键结论",
      monthlyTitle: "月度趋势",
      monthlyVideoTitle: "KOL 视频数（视频）",
      monthlyChannelTitle: "覆盖博主数（博主）",
      monthlyMedianViewsTitle: "KOL 视频播放量中位数",
      distributionTitle: "博主订阅数分布"
    },
    conversion: {
      title: "转化层",
      subtitle: "核心：这些 KOL 视频是否形成可追踪、可转化的路径？",
      radarTitle: "转化链路指标雷达图",
      scoreTitle: "转化链路清晰度",
      scoreSubtitle: "综合评估各品牌从曝光到转化的链路清晰程度（满分 3 分）",
      pathTitle: "品牌转化路径",
      insightTitle: "关键洞察"
    },
    performance: {
      title: "表现层",
      subtitle: "只看多品牌博主内部：同一批博主推广不同品牌时，链路表现是否一致？",
      multibrandTitle: "多品牌博主样本总览",
      internalChartTitle: "多品牌博主内部品牌表现",
      highLowTitle: "同博主最高分 / 最低分品牌次数",
      topGapTitle: "Top 差距博主 Slope Chart",
      consistencyDetailTitle: "一致性观察完整明细表",
      conclusionTitle: "结论"
    },
    terminal: {
      title: "终端承接",
      subtitle: "比较 KOL 点击后的官网、code、社群、购买指导与追踪承接结构。",
      mechanismTitle: "渠道机制与 CTA 承接",
      pathTitle: "终端承接路径",
      tableTitle: "终端承接对比",
      insightTitle: "关键结论"
    }
  },
  labels: {
    kolVideos: "KOL 视频数",
    coveredChannels: "覆盖博主数",
    conversionScore: "转化链路得分",
    commentsPerThousand: "每千播放评论数",
    commentRate: "评论率（Data）",
    videosUnit: "视频",
    channelsUnit: "博主",
    scoreUnit: "得分",
    videoSeries: "KOL 视频数（视频）",
    channelSeries: "覆盖博主数（博主）",
    quantityAxis: "数量",
    officialLinkRate: "官网链接率",
    buyPageRate: "购买页直达率",
    appStoreRate: "App 导流率",
    codeReferralRate: "Code/Referral 率",
    socialRate: "社群导流率",
    shortlinkRate: "短链率",
    multiBrandChannelShare: "多品牌博主占比",
    multiBrandVideoShare: "多品牌博主贡献视频占比",
    subscriberBuckets: ["0–1k", "1k–10k", "10k+"],
    subscriberBucketKeys: ["0-1k", "1k-10k", "10k+"]
  },
  frameworkSteps: [
    { title: "曝光", body: "KOL 视频内容传播<br>触达潜在受众", icon: "◉", colorBrand: "UgPhone" },
    { title: "转化链路", body: "从视频到点击到落地页<br>追踪转化路径", icon: "🔗", colorBrand: "RedFinger" },
    { title: "互动验证", body: "同批博主内部对比<br>验证链路执行差异", icon: "◌", color: "#16a34a" },
    { title: "终端承接", body: "官网 / Code / 社群 / CTA<br>完成下一步转化", icon: "▯", colorBrand: "LDCloud" }
  ],
  insights: {
    home: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone 是当前最接近完整 KOL 转化链路的品牌", text: "UgPhone 的视频和博主覆盖规模明显领先，同时转化链路、Code/Referral 和社群导流表现也更完整。它不是单纯铺曝光，而是已经较系统地把 KOL 内容接入邀请码、社群和使用承接链路。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud 规模小，但链路质量非常集中", text: "LDCloud 的视频和博主覆盖量最小，但官网承接、Code/Referral 和社群导流表现相对集中。它更像是“小规模但高标准执行”的 KOL 链路样本，适合作为高质量承接的对照。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone 正在从曝光增长转向官网追踪承接", text: "VSPhone 的视频和博主覆盖持续增长，官网承接也已经形成一定基础。相比 RedFinger，它更重视把 KOL 流量导向官网或 ref 链路；但整体链路闭环仍弱于 UgPhone 和 LDCloud。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger 的问题不是没有曝光，而是曝光后缺少统一承接", text: "RedFinger 的曝光覆盖并不低，但官网承接、Code/Referral 和链路清晰度明显落后。它的问题不是没有存在感，而是流量大多没有被导向清晰、统一、可追踪的下一步。" }
    ],
    exposure: [
      { brand: "UgPhone", icon: "↗", title: "UgPhone：持续型 KOL 覆盖网络", text: "UgPhone 是唯一同时具备大规模视频和大规模博主覆盖的品牌。它的曝光不是依赖单月爆发，而是长期稳定铺量，更接近一个持续运转的 KOL 内容网络。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone：后期增长明确，正在加速进入 KOL 竞争", text: "VSPhone 的曝光规模在后期明显抬升，说明它正在主动加大 KOL 内容布局。它不是单纯依赖零散视频获得存在感，而是逐步形成更稳定的投放节奏和博主覆盖。" },
      { brand: "RedFinger", icon: "◔", title: "RedFinger：覆盖面不低，但更偏长尾铺量", text: "RedFinger 的博主覆盖并不弱，但整体更偏向长尾博主和分散曝光。它适合形成品牌存在感，但单看曝光并不能证明其转化链路足够成熟。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud：规模最小，但博主质量更集中", text: "LDCloud 的曝光规模最小，但博主结构并不弱，更像是有限样本下的精准覆盖。它不是大规模铺量打法，而是更偏向小范围、高标准的 KOL 合作模式。" },
      { brand: "UgPhone", icon: "🔗", title: "曝光层总结：曝光只是入口，链路承接才决定流量是否继续向下走", text: "曝光层只能回答“谁铺了多少 KOL”，不能直接回答“谁转化更强”。真正的差异要放到转化层继续判断。" }
    ],
    conversion: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone：规模与链路完整度同时成立", text: "UgPhone 不只是曝光规模最大，它的 code、社群和使用承接也更完整，因此更接近完整的 KOL 转化链路。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud：小规模但链路标准化程度高", text: "LDCloud 的优势不是铺量，而是链路质量。它在官网承接、creator link 和 code 组合上更集中，适合定位为“小而精”的高质量样本。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone：官网追踪已经成型，但闭环仍偏中段", text: "VSPhone 已经具备官网追踪基础，但还需要进一步强化后续转化动作，例如下载、试用、购买或更明确的 CTA。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger：最大短板是官方承接缺位", text: "RedFinger 的曝光不弱，但官方承接链路明显不足。它需要优先补齐官网入口、专属 code、统一 CTA 和可追踪落地页。" },
      { brand: "VSPhone", icon: "▣", title: "转化层总结：四家都不是典型的视频直达购买模式", text: "真正影响转化质量的是：KOL 视频之后，用户是否能被顺畅导向官网、code、社群、教程或下载路径。" }
    ],
    performance: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone", text: "UgPhone 在多品牌博主内部依然表现稳定。它不仅全量曝光规模大，在重叠 KOL 场景里也更容易形成清晰链路，说明其 KOL 承接材料和执行方式相对成熟。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone", text: "VSPhone 进入了较多多品牌博主，但链路稳定性仍有提升空间。它的官网追踪基础已经出现，但不同博主之间的执行质量不够统一。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger", text: "RedFinger 在多品牌博主内部的链路表现仍然偏弱。它不是没有进入竞品 KOL 圈层，而是进入之后没有形成足够清晰的转化承接。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud", text: "LDCloud 的多品牌样本规模较小，但链路下限相对稳定。它更适合作为“小规模标准化承接”的样本，而不是大规模铺量型品牌。" },
      { brand: "UgPhone", icon: "▣", title: "表现层总结", text: "表现层不应只看评论率或播放量，而应看同一批博主内部的品牌差异。多品牌博主分析证明：KOL 本身不是唯一决定因素，品牌链路设计会显著影响最终表现。" }
    ],
    terminal: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone：多点承接", text: "Code、referral、社群和教程共同降低转化摩擦，使用户看完 KOL 视频后仍有清晰的下一步，是四家中承接结构最完整的样本之一。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone：官网追踪", text: "VSPhone 已经具备较清晰的官网承接基础，流量更容易进入官方路径；但 code、下载/购买 CTA 与落地页闭环的完整度仍弱于 UgPhone 和 LDCloud。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger：后链路断裂", text: "RedFinger 前端曝光存在，但官网、code、社群和购买路径之间没有形成统一承接，用户看完内容后更容易停留在自行搜索或咨询阶段。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud：小规模标准化链路", text: "LDCloud 当前呈现小规模、标准化承接特征：creator link、code 和社群节点较完整，转化摩擦较低，但整体覆盖规模明显小于 UgPhone。" },
      { brand: "UgPhone", icon: "▣", title: "终端承接结论", text: "四家对比中，UgPhone 和 LDCloud 的承接结构更完整，VSPhone 更偏官网追踪，RedFinger 的主要短板是曝光之后缺少统一、可追踪的官方链路。" }
    ]
  },
  paths: {
    conversion: [
      { brand: "UgPhone", steps: ["YouTube KOL 视频", "邀请码 / Referral / Promotion Link", "社群入口 / 使用说明 / 教程内容", "下载、注册、使用、复购"], text: "UgPhone 的链路核心是 code + 社群承接。它通过邀请码、社群和教程说明，把 KOL 内容从单次曝光延伸到可继续追踪和承接的使用路径。" },
      { brand: "VSPhone", steps: ["YouTube KOL 视频", "官网链接 / Ref / UTM", "官网承接 / Discord 支持", "注册、试用或进一步咨询"], text: "VSPhone 的核心优势是官网承接。它已经开始把 KOL 流量导向更可追踪的官网路径，但最终下载、购买或试用闭环仍需要进一步强化。" },
      { brand: "RedFinger", steps: ["YouTube KOL 视频", "零散 code / 社群 / 第三方入口", "用户自行搜索或咨询", "路径断裂风险高"], text: "RedFinger 的视频覆盖不少，但转化链路明显弱。大量视频没有把用户导向明确官网、购买页、邀请码或统一社群入口，更像曝光内容，而不是可追踪的转化链路。" },
      { brand: "LDCloud", steps: ["YouTube KOL 视频", "官网 / Creator Tracking Link", "Discount Code / Discord / Telegram", "试用、下载或官网继续转化"], text: "LDCloud 的规模不大，但链路标准化程度较高。它更像是以 creator link、官网链接和 code 组合承接流量的小规模高质量样本。" }
    ],
    terminal: [
      { brand: "UgPhone", steps: ["YouTube KOL 视频", "Invitation Code / Referral Link", "社群入口 / 使用说明 / 教程内容", "下载、注册、使用、复购"], text: "UgPhone 的终端承接不是单纯依赖购买页，而是通过 code、社群和说明内容降低用户继续行动的门槛。它的优势在于用户看完视频后有多个可继续行动的入口。" },
      { brand: "VSPhone", steps: ["YouTube KOL 视频", "官网 Ref / UTM 链接", "官网落地页 / Discord 支持", "注册、试用或进一步咨询"], text: "VSPhone 的终端承接更偏官网追踪。它已经具备一定可归因基础，但仍需要强化官网之后的下载、购买、试用和明确 CTA。" },
      { brand: "RedFinger", steps: ["YouTube KOL 视频", "零散社群 / Code / 第三方信息", "用户自行搜索或咨询", "高流失风险"], text: "RedFinger 的终端承接短板明显。虽然前端有曝光，但后链路分散，用户点击后缺少统一、明确、可追踪的下一步。" },
      { brand: "LDCloud", steps: ["YouTube KOL 视频", "Creator Link / 官网链接", "Discount Code / Discord / Telegram", "试用、下载或官网继续转化"], text: "LDCloud 的终端承接更接近标准化 creator tracking 模式。它的问题不是链路质量，而是规模还没有完全铺开。" }
    ]
  },
  notes: {
    monthlyData: "注：鼠标悬停在某个月的图表区域，可查看四家品牌在该月的详细数据。",
    distributionData: "注：鼠标悬停到色块，可查看该订阅数区间的博主数量和占比。",
    radarScale: "注：雷达图每个指标采用独立轴上限，避免低比例指标被 0–100 的统一刻度压扁。",
    consistencySource: "只统计同时覆盖多个品牌的 KOL 博主，用于观察同一批博主内部的品牌链路差异。",
    terminalTable: "定性等级直接读取 xlsx 的 10_Terminal_Design sheet；如需修改，请先改 xlsx 后重新运行 build_web_data.py。"
  }
,
  terminalMechanismSummary: {
    UgPhone: "Code + 社群多点承接",
    VSPhone: "官网追踪 + code 辅助",
    RedFinger: "社群 / code 分散承接",
    LDCloud: "官网 + creator link 标准化"
  }
};