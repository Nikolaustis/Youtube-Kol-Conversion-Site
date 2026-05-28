// Editable website copy. You can change webpage titles, subtitles, labels and fixed notes here.
// Data values still come from js/generated-data.js.

window.WEB_COPY = {
  pages: {
    home: {
      title: "YouTube KOL 转化链路分析",
      subtitle: "曝光 → 转化链路 → 互动验证 → 终端承接",
      brandOverviewTitle: "品牌总览",
      insightTitle: "核心洞察",
      frameworkTitle: "分析框架",
      summaryTitle: "主页总结",
      summaryText: "YouTube KOL 竞争的核心差异不只是视频数量，而是内容能否形成可执行的转化链路。UgPhone 的优势在覆盖规模和链路完整度，LDCloud 的优势在链路质量，VSPhone 体现出官网追踪和社群承接特征，RedFinger 则仍更偏曝光存在。"
    },
    exposure: {
      title: "曝光层",
      subtitle: "观察四家品牌在 YouTube KOL 内容中的覆盖规模、月度趋势和博主结构。",
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
      scoreSubtitle: "综合评估各品牌从 KOL 曝光到后续承接的链路清晰程度，满分 3 分。",
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
      subtitle: "观察 KOL 内容能否把用户兴趣转化为产品行为，并降低用户从理解产品到开始使用的行动成本。",
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
    commentRate: "评论率",
    videosUnit: "视频",
    channelsUnit: "博主",
    scoreUnit: "得分",
    videoSeries: "KOL 视频数（视频）",
    channelSeries: "覆盖博主数（博主）",
    quantityAxis: "数量",
    officialLinkRate: "官网链接率",
    webPortalRate: "Web端导流率",
    buyPageRate: "Web端导流率",
    appStoreRate: "App 导流率",
    codeReferralRate: "Code/Referral 率",
    socialRate: "社群导流率",
    shortlinkRate: "已移除指标",
    multiBrandChannelShare: "多品牌博主占比",
    multiBrandVideoShare: "多品牌博主贡献视频占比",
    subscriberBuckets: ["0–10k", "10k–50k", "50k+"],
    subscriberBucketKeys: ["0-10k", "10k-50k", "50k+"]
  },
  frameworkSteps: [
    { title: "曝光", body: "KOL 视频内容传播<br>触达潜在受众", icon: "◉", colorBrand: "UgPhone" },
    { title: "转化链路", body: "从视频到点击到落地页<br>追踪转化路径", icon: "🔗", colorBrand: "RedFinger" },
    { title: "互动验证", body: "同批博主内部对比<br>验证链路执行差异", icon: "◌", color: "#16a34a" },
    { title: "终端承接", body: "官网 / Code / 社群 / CTA<br>完成下一步转化", icon: "▯", colorBrand: "LDCloud" }
  ],
  insights: {
    home: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone：规模领先，链路较完整", text: "UgPhone 在视频数量和博主覆盖上保持领先，同时 code、社群和官网承接也相对完整。它不是单纯依靠内容曝光，而是已经把 KOL 视频较系统地接入可继续行动的转化路径。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud：规模不大，但链路质量突出", text: "LDCloud 的内容规模不大，但转化链路质量更集中。官网、creator link、code 和社群入口之间的关系更清晰，呈现出小规模、高标准承接的特点。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone：官网追踪和社群承接清晰", text: "VSPhone 的优势集中在官网追踪和社群承接上。它更倾向于把 KOL 流量导向官网、ref 路径或后续支持入口，整体打法更偏向清晰路径而非大规模铺量。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger：有曝光，但承接偏弱", text: "RedFinger 仍具备一定 YouTube 存在感，但官网、code、社群和购买引导之间的连接不够稳定。它的问题不在于完全没有内容，而在于曝光之后缺少统一、可追踪的下一步。" }
    ],
    exposure: [
      { brand: "UgPhone", icon: "↗", title: "UgPhone：持续型 KOL 覆盖网络", text: "UgPhone 是 KOL 覆盖规模最突出的品牌。它的视频产出和博主覆盖都更稳定，说明其 YouTube 内容布局不是依赖单点爆发，而是形成了持续运转的 KOL 内容网络。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone：覆盖规模较小，但路径更集中", text: "VSPhone 的内容覆盖规模小于 UgPhone，但品牌承接路径更集中。它的曝光不是大范围铺开，而是更偏向围绕官网、ref 和社群入口形成明确的后续路径。" },
      { brand: "RedFinger", icon: "◔", title: "RedFinger：有存在感，但曝光与承接之间连接较弱", text: "RedFinger 仍有一定视频和博主覆盖，能够形成品牌存在感。但从曝光到转化的连接并不稳定，单看视频数量无法证明其转化链路已经成熟。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud：小规模精准覆盖", text: "LDCloud 的 KOL 覆盖规模较小，但内容结构更集中。它不是大规模铺量型打法，而是在有限的博主合作中保持更清晰的承接路径。" },
      { brand: "UgPhone", icon: "🔗", title: "曝光层总结", text: "曝光层回答的是“谁在 YouTube 上建立了存在感”。视频量和博主量只是入口，真正的品牌差异还要继续看这些内容能否导向官网、code、社群、下载或购买路径。" }
    ],
    conversion: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone：规模与链路完整度同时成立", text: "UgPhone 不只是 KOL 覆盖规模最大，它的 code、社群和官网承接也较完整，因此更接近成熟的 KOL 转化链路。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud：链路质量最突出", text: "LDCloud 的优势不是铺量，而是链路质量。它在官网承接、creator link、code 和社群组合上最集中，是小规模高质量承接的代表。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone：官网追踪和社群承接明确", text: "VSPhone 的官网承接和社群导流特征较清楚。它更适合被理解为“路径明确型品牌”，而不是大规模覆盖型品牌。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger：最大短板是官方承接不足", text: "RedFinger 的曝光不弱，但官方承接链路明显不足。它更偏曝光存在型品牌，而不是转化链路成熟型品牌。" },
      { brand: "VSPhone", icon: "▣", title: "转化层总结", text: "四家品牌都不是典型的“视频直达购买”模式。真正影响转化质量的是：KOL 视频之后，用户是否能被顺畅导向官网、code、社群、教程、下载或购买路径。" }
    ],
    performance: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone", text: "UgPhone 在多品牌博主内部依然表现稳定。它不仅整体覆盖规模大，在重叠 KOL 场景里也更容易形成清晰链路，说明其承接材料和执行方式相对成熟。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone", text: "VSPhone 在多品牌博主内部呈现出官网和社群承接特征。它已经进入部分重叠 KOL 圈层，但整体更偏路径清晰而非大规模铺量。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger", text: "RedFinger 在多品牌博主内部的链路表现仍偏弱。它不是完全没有进入相关 KOL 圈层，而是进入之后没有形成足够清晰、统一的转化承接。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud", text: "LDCloud 的多品牌覆盖规模较小，但链路质量相对稳定。它更适合作为“小规模标准化承接”的样本，而不是大规模铺量型品牌。" },
      { brand: "UgPhone", icon: "▣", title: "表现层总结", text: "表现层不应只看评论率或播放量，而应看同一批博主内部的品牌差异。多品牌博主分析证明：KOL 本身不是唯一决定因素，品牌链路设计会显著影响最终表现。" }
    ],
    terminal: [
      { brand: "UgPhone", icon: "🔗", title: "UgPhone：多点承接", text: "UgPhone 的优势在于链路完整度。Code、referral、社群和教程共同降低用户理解成本和行动成本，使用户看完 KOL 视频后仍有清晰的下一步。" },
      { brand: "LDCloud", icon: "★", title: "LDCloud：标准化链路", text: "LDCloud 的优势在于链路质量。Creator link、code、官网和社群承接较完整，说明标准化链路本身能够有效降低用户行动成本。" },
      { brand: "VSPhone", icon: "◎", title: "VSPhone：官网分销入口明显，但 KOL 侧承接偏浅", text: "VSPhone 将推广奖励和分享计划放在官网明面上，说明其获客路径高度依赖官网分销入口。数据中邀请码、折扣码等 KOL 侧承接内容较少，侧面说明其公开分销入口与博主内容执行之间可能没有被稳定打通。" },
      { brand: "RedFinger", icon: "⚠", title: "RedFinger：后链路断裂", text: "RedFinger 有曝光，但官网、code、社群和购买路径之间没有形成统一承接。用户可能知道品牌，却不一定能顺畅进入下载、注册或使用行为。" },
      { brand: "UgPhone", icon: "▣", title: "终端承接总结", text: "终端承接决定了 KOL 内容能否从“被看见”转化为“被使用”。四家对比中，UgPhone 的链路最接近完整闭环，LDCloud 的标准化承接质量较高，VSPhone 具备官网分销入口和社群承接基础，RedFinger 则主要受限于曝光后的路径断裂。" }
    ]
  },
  paths: {
    conversion: [
      { brand: "UgPhone", steps: ["YouTube KOL 视频", "邀请码 / Referral / Promotion Link", "社群入口 / 使用说明 / 教程内容", "下载、注册、使用、复购"], text: "UgPhone 的链路核心是 code + 社群承接。它通过邀请码、referral、社群和教程说明，把 KOL 内容从单次曝光延伸到可继续追踪和承接的使用路径。" },
      { brand: "VSPhone", steps: ["YouTube KOL 视频", "官网链接 / Ref / UTM", "官网承接 / 社群支持", "注册、试用或进一步咨询"], text: "VSPhone 的核心特征是官网追踪和社群承接。它更倾向于把 KOL 流量导向官网或支持入口，形成较明确的官方路径。" },
      { brand: "RedFinger", steps: ["YouTube KOL 视频", "零散链接 / 弱承接入口", "用户自行搜索或咨询", "路径断裂风险较高"], text: "RedFinger 的曝光并不缺失，但转化路径整体偏弱。大量内容没有形成明确的官网、code、社群或购买承接，更接近品牌存在感曝光，而不是完整转化链路。" },
      { brand: "LDCloud", steps: ["YouTube KOL 视频", "官网 / Creator Tracking Link", "Discount Code / 社群入口", "试用、下载或官网继续转化"], text: "LDCloud 的链路标准化程度较高。它更像是以官网、creator link、code 和社群入口组合承接流量的小规模高质量样本。" }
    ],
    terminal: [
      { brand: "UgPhone", steps: ["YouTube KOL 视频", "Invitation Code / Referral Link", "社群入口 / 使用说明 / 教程内容", "注册、试用、使用、复购"], text: "UgPhone 的路径设计重点是把内容兴趣转化为产品行为。用户看完视频后，不只知道 UgPhone 是什么，也能通过邀请码、社群和使用教程继续完成注册、试用和使用。" },
      { brand: "VSPhone", steps: ["YouTube KOL 视频", "官网 Ref / UTM 链接", "官网推广奖励 / 社群支持", "注册、试用或进一步咨询"], text: "VSPhone 的路径更偏官网追踪和公开分销入口。官网明面展示推广奖励，说明其鼓励用户通过分享计划获佣；但 KOL 内容中具体邀请码和折扣码较少，意味着用户往往先被导向官网，再由官网承担后续解释和转化。" },
      { brand: "RedFinger", steps: ["YouTube KOL 视频", "零散入口 / 弱承接信息", "用户自行搜索或咨询", "转化路径容易中断"], text: "RedFinger 的路径问题在于承接不够统一。用户可能看到了产品，但缺少清晰的下一步入口，容易停留在“知道品牌”阶段，而无法顺畅进入下载、注册或购买行为。" },
      { brand: "LDCloud", steps: ["YouTube KOL 视频", "官网 / Creator Tracking Link", "Discount Code / 社群入口", "试用、下载或官网继续转化"], text: "LDCloud 的路径更重视标准化承接。Creator link、code 和社群入口能够把内容兴趣导向后续行动，整体链路短、路径清楚，用户理解和行动成本较低。" }
    ]
  },
  ugphoneBriefChain: {
    eyebrow: "调研缘由",
    title: "UgPhone KOL 视频要求，本质是一条获客转化链路",
    subtitle: "UgPhone 对博主视频的要求不只是“展示产品”，而是在引导用户从内容认知进入官网、邀请码、社群和后续使用路径。",
    steps: [
      { title: "产品认知", body: "展示官网与 Android Cloud Emulator 定位，让用户先知道产品是什么、在哪里进入。" },
      { title: "场景教育", body: "围绕游戏 AFK / Farming / 多账号运行展示价值，降低用户理解成本。" },
      { title: "权益激励", body: "通过邀请码、邀请链接和试用权益，把兴趣转化为可执行的注册动机。" },
      { title: "品牌识别", body: "要求展示 logo、hashtag 和相关标签，强化内容与 UgPhone 的品牌关联。" },
      { title: "链路承接", body: "在简介和评论区放置邀请链接、官网入口和社群链接，让用户看完后能继续行动。" },
      { title: "合作复用", body: "独家视频与插入式合作共同形成内容资产，帮助后续长期获客与复投判断。" }
    ],
    footer: "因此，本页后续的分析不只比较播放量，而是评估 KOL 内容是否真正形成“曝光 → 理解 → 点击 → 注册 / 社群 / 使用”的产品获客链路。"
  },
  notes: {
    monthlyData: "注：鼠标悬停在某个月的图表区域，可查看四家品牌在该月的详细数据。",
    distributionData: "注：鼠标悬停到色块，可查看该订阅数区间的博主数量和占比。",
    radarScale: "注：雷达图每个指标采用独立轴上限，避免低比例指标被 0–100 的统一刻度压扁。",
    consistencySource: "只统计同时覆盖多个品牌的 KOL 博主，用于观察同一批博主内部的品牌链路差异。",
    terminalTable: "定性等级用于概括各品牌在官网、code、社群、购买路径等承接环节的相对强弱。"
  },
  terminalProductValue: {
    eyebrow: "产品价值",
    title: "调研意义",
    subtitle: "KOL 渠道不是单纯内容曝光，而是用户进入产品的第一条路径。终端承接分析可以帮助判断：用户是否看得懂、是否愿意点、是否知道如何开始使用。",
    items: [
      { title: "KOL Brief 本质上是产品获客链路设计", text: "UgPhone 给博主的发布要求并不只是内容规范，而是用官网展示、游戏场景、邀请码权益、社群链接和评论区链接，共同搭建用户从“看懂产品”到“开始行动”的路径。" },
      { title: "产品侧需要持续降低用户行动成本", text: "用户产生兴趣后，是否能立刻找到官网、邀请码、社群、下载或购买入口，直接影响转化效率。链接、code 和社群承接越清晰，兴趣到使用的路径就越短。" },
      { title: "渠道数据可以反向优化产品承接", text: "通过对比不同品牌的终端承接，可以反向判断哪些节点最有效：官网入口、邀请码、社群支持、使用教程还是购买指导。这些信息可用于优化落地页、邀请机制、新手引导和社群承接。" },
      { title: "竞争重点是提升链路效率", text: "未来 KOL 渠道的关键不只是找到更多博主，而是让每条内容更稳定地完成产品认知、场景教育、权益激励和行动承接。提升链路效率，本质上就是提升产品获客效率。" }
    ],
    summary: "因此，本次调研的价值不止在于评估 YouTube KOL 渠道表现，更在于帮助 UgPhone 从产品视角识别获客链路中的关键承接节点：用户是否看得懂、是否愿意点、是否知道如何开始使用，以及是否能从一次内容触达进入长期使用路径。"
  },
  terminalMechanismSummary: {
    UgPhone: "Code + 社群多点承接",
    VSPhone: "官网分销入口 + 社群承接",
    RedFinger: "有曝光，承接分散",
    LDCloud: "标准化链路承接"
  }
};
