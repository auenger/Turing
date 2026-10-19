
import maChiPortrait from '../assets/team/ma-chi.jpg';
import liXuetaoPortrait from '../assets/team/li-xuetao.jpg';
import yangZhengwuPortrait from '../assets/team/yang-zhengwu-web.jpg';

/* ---------- 主要产品 ---------- */
type Product = {
  slug: string;
  label: string;
  title: string;
  desc: string;
  outcome: string;
  items: string[];
  href?: string;
};

const products: Product[] = [
  {
    slug: 'team-transformation',
    label: '研发组织',
    title: '研发团队转型与陪跑培训',
    desc: '以 Agent 特区为转型单元，陪团队在真实项目中重建角色、工作流、验证机制与度量体系。',
    outcome: '从会用 AI，走到团队能够持续交付',
    items: ['研发流程诊断与试点选择', '跨职能小队与责任边界设计', 'Harness 工作流与验证资产沉淀'],
  },
  {
    slug: 'agent-delivery',
    label: '企业场景',
    title: 'Agent 落地交付',
    desc: 'FDE 进入业务现场，把工程软件、企业数据、规则和人工审核接成可以运行的 Agent 工作流。',
    outcome: '从场景判断，到上线运行与团队交接',
    items: ['业务流程与系统连接梳理', 'Agent 角色、工具、权限和护栏', '真实任务验证、上线与持续迭代'],
  },
  {
    slug: 'expert-ecosystem',
    label: '专家生态',
    title: '业务专家的 AI Agent 生态定制',
    desc: '围绕业务专家配置工作台、知识与执行流程，将业务表达推进到明确需求、可体验的系统和持续迭代。专家掌握关键判断与最终验收。',
    outcome: '放大专家的决策带宽，把个人经验变成组织能力',
    items: ['通讯入口与问题信息补齐', '知识、案例与业务规则工程化', '执行、质检、升级和学习闭环', '模型、算力、安全接入与工作流环境'],
  },
  {
    slug: 'silieco',
    label: '组织操作系统',
    title: 'SiliEco Agent Work OS',
    desc: '用统一任务、上下文和治理连接人类员工、AI 员工、知识、应用与工作流，让分散的 Agent 产品成为组织成员。',
    outcome: '从分散的 Agent 工具，走到可治理的协作生态',
    items: ['统一 Task 与业务 SOP', 'Agent 身份、职责、权限和审计', '桌面、Web、终端、浏览器与 IM 协同', '组织知识持续沉淀与复用'],
    href: 'https://silieco.com/',
  },
];

/* ---------- Agent 特区 · 七要素 ---------- */
const elements = [
  {
    n: '01',
    title: '明确的业务目标',
    desc: '围绕一个可衡量的业务结果组织，而不是一次 AI 尝试。',
  },
  {
    n: '02',
    title: '专职负责人与团队',
    desc: '业务负责人、流程负责人、操作人员和 FDE 一起工作。',
  },
  {
    n: '03',
    title: '定义清楚的工作流边界',
    desc: '输入、系统、工具、交接点和审批点先被定义，再让 Agent 接入。',
  },
  {
    n: '04',
    title: '决策与权限规则',
    desc: '决策、访问、审核、升级的规则先定清，Agent 在边界内执行。',
  },
  {
    n: '05',
    title: '绑定真实工作的 Agent 角色',
    desc: 'Agent 角色对应真实任务，不是孤立工具。',
  },
  {
    n: '06',
    title: '人对交付负责',
    desc: '人承担交付责任，Agent 产出可被审查、可被驳回。',
  },
];

/* ---------- 运行机制 · 七步 ---------- */
const steps = [
  {
    n: '1',
    title: '组建团队',
    detail: '业务负责人、流程负责人、操作人员、FDE',
    note: '先把人对齐，再谈工具。',
  },
  {
    n: '2',
    title: '定义目标',
    detail: '目标流程、范围、约束、ROI 指标',
    note: '选一个有边界、高价值的切入点。',
  },
  {
    n: '3',
    title: '搭建工作流',
    detail: '输入、系统、工具、交接点、审批关口',
    note: '真实流程先跑通。',
  },
  {
    n: '4',
    title: '接入 Agent',
    detail: 'Agent 角色、权限、规则、工具、审核关口',
    note: 'Agent 在边界内上岗。',
  },
  {
    n: '5',
    title: '运行工作流',
    detail: '真实工作、执行记录、人对结果负责',
    note: '跑的是真实业务，不是 demo。',
  },
  {
    n: '6',
    title: '度量产出',
    detail: '基线 vs. 结果、成本、周期、质量、规模',
    note: '用前后对比证明回报。',
  },
  {
    n: '7',
    title: '迭代',
    detail: '改进流程、Agent、规则、测试和交接资产',
    note: '回到工作流，持续优化。',
  },
];

/* ---------- 能力 ---------- */
const capabilities = [
  {
    tag: 'AI Coding Agent',
    title: '把研发链路沉淀成 Agent 可执行资产',
    desc: '进入研发需求、设计、编码、测试、评审和交付文档链路，让每一个研发步骤都成为 Agent 可以接手、可以复用、可以验证的工作。',
    points: ['需求澄清与模块拆分', '代码生成与代码评审', 'Playwright 自动化验证', '测试资产与交接文档沉淀'],
  },
  {
    tag: '工业 Agent',
    title: '在受控流程里执行企业 SOP',
    desc: '接入真实软件和业务数据，执行企业 SOP，接受人工审核，在受控流程里完成真实任务，产出可审查、可追溯、可驳回。',
    points: ['驱动真实工程软件', '参数边界与护栏', '独立验证关口', '升级路径与审计记录'],
  },
];

/* ---------- 案例 ---------- */
interface Case {
  id: string;
  no: string;
  name: string;
  tag: string;
  headline: string;
  context: string;
  metric?: { big: string; sub: string };
  points: string[];
  insight: string;
  dark?: boolean;
}
const cases: Case[] = [
  {
    id: 'case-kreditz',
    no: '案例 01',
    name: 'Kreditz',
    tag: '金融科技 · 研发交付',
    headline: '边界清楚、验证扎实，Agent 才能真正工作。',
    context:
      '瑞典金融科技公司，业务为银行交易分类。当交付系统给出清晰边界和强验证时，Agent 才真正有效。',
    metric: { big: '63 → 4.5', sub: '交付团队规模（人）' },
    points: [
      '0 行人手写代码即上线商业系统',
      '更清晰的规格说明与模块化任务边界',
      '多层测试 + 业务级基准数据集',
      '人掌握验收标准，Agent 支撑实现与迭代',
    ],
    insight: 'Agent 在边界清楚、验证扎实的交付系统里，才真正工作。',
  },
  {
    id: 'case-tianjin',
    no: '案例 02',
    name: '天津合众',
    tag: 'ToB 软件交付 · 组织重构',
    headline: 'AI 原生交付，首先是组织设计问题。',
    context:
      'ToB 企业，标准化产品 + 定制化交付。团队并非因为开始用编码工具而被改变，而是围绕小型 FDE 小队、Harness 工作流和持续度量重建了交付组织。',
    metric: { big: '近 30%', sub: '团队利润率（原为个位数）' },
    points: [
      '5 角色跨职能 FDE 小队：PM、PO、2 TO、QO',
      'Harness 工作流统一 12 类项目产物',
      '绿地 + 棕地双试点先行',
      '人工测试回归作为安全网',
    ],
    insight:
      '胜利单元不是带着 AI 工具的个人，而是有清晰角色、共享工作流、强验证和迭代习惯的小型负责团队。',
  },
  {
    id: 'case-thermal',
    no: '案例 03',
    name: '热仿真 Agent 特区',
    tag: '专业工程 · 受控自动化',
    headline: '专业工程流程，先划清边界。',
    context:
      '热设计仿真自动化可行性项目。FloTHERM 仍负责物理仿真，Agent 接手的是围绕它的重复性工作。',
    metric: { big: '≤ 20', sub: '单次任务最大迭代次数 · 超限即升级工程师' },
    points: [
      '三段式：工程师控制 → Agent 执行 → 工程师确认',
      '控制回路：运行 → 读取 → 调整 → 验证',
      '独立验证 Agent 确认结果来自真实仿真输出',
      '护栏：防篡改目标值，无法收敛即升级',
    ],
    insight:
      '先固定专家规则、真实软件、验证关口和升级路径，再决定哪些环节适合交给 Agent 执行。',
    dark: true,
  },
  {
    id: 'case-training',
    no: '案例 04',
    name: '制造业研发团队 AI 转型',
    tag: '团队陪跑 · 真实研发任务',
    headline: '把 AI 方法放进团队正在做的项目。',
    context:
      '面向制造业软件研发团队，围绕真实业务线配置 Agent 工作环境，训练需求梳理、编码、测试和知识沉淀的协作方式。',
    points: [
      '产品经理用 AI 梳理需求、功能边界和验收材料',
      '研发团队把规范与业务经验整理为 Agent 上下文',
      '将常见任务沉淀为可复用的 Skill 和工作流',
      '结合现场指导、远程陪跑与阶段性能力评估',
    ],
    insight:
      '团队建立了 AI 研发工作流基础；自动化测试和能力资产治理仍需持续完善。',
  },
  {
    id: 'case-equipment',
    no: '案例 05',
    name: '制造业设备对接流程改造',
    tag: 'FDE 交付 · 设备测试',
    headline: '先解除联调等待，再让 Agent 接手重复判断。',
    context:
      '新设备接入企业系统时，工程师需要反复阅读协议文档、调试接口并等待真实服务环境。项目先梳理协议与测机流程，再引入自动化。',
    points: [
      '整理多版本设备协议，形成统一的接口约定',
      '搭建模拟服务，减少测试对真实环境的依赖',
      '让设备侧测试与后台服务解耦，支持并行推进',
      '沉淀排错经验，由 Agent 辅助编排、定位与报告生成',
    ],
    insight:
      'FDE 的价值先来自流程重组与经验沉淀，再来自 Agent 对测试工作的辅助。',
  },
  {
    id: 'case-public',
    no: '案例 06',
    name: '公共安全辅助研判',
    tag: '业务 Agent · 人工确认',
    headline: '让研判建议进入原有工作入口，并保留人工决定权。',
    context:
      '一线人员在现有工作入口提交问题，Agent 调用获授权的数据与地图工具整理线索，形成建议和报告，再交由人员确认。',
    points: [
      '对话与地图界面衔接日常工作流程',
      '按用户身份和业务权限隔离数据访问',
      '记录工具调用与处理过程，便于审计追踪',
      '人工确认结果回写，形成处理闭环',
    ],
    insight:
      '这类交付同时需要业务场景、权限、审计和部署规范，Agent 只提供辅助判断。',
  },
  {
    id: 'case-product-team',
    no: '案例 07',
    name: '研发与产品团队协作转型',
    tag: '组织转型 · 产品工程化',
    headline: '让产品、研发和质量角色围绕同一条交付链协作。',
    context:
      '在另一家企业的软件团队中，培训覆盖研发与产品角色，并围绕既有项目梳理前端迁移、第三方接口对接和产品需求文档维护等场景。',
    points: [
      '把项目知识与规范整理为 Agent 可用的上下文',
      '按业务功能拆分需求，明确产品、技术和质量责任',
      '把前端迁移经验沉淀为可复用流程与工具',
      '建立接口清单、前置校验和模拟测试方法',
    ],
    insight:
      '培训与真实任务结合，团队才能逐步接管工具、流程和交付责任。',
  },
  {
    id: 'case-agent-platform',
    no: '案例 08',
    name: '企业员工服务智能体平台',
    tag: '平台建设 · 人机协作',
    headline: '从单点问答，走向可配置、可治理的 Agent 平台。',
    context:
      '面向企业内部知识查询与员工服务场景，建设可管理 Agent、知识、工具和任务的通用平台，支持员工端与管理端协同。',
    points: [
      '统一配置 Agent、知识库和业务工具',
      '支持会话上下文、任务触发与执行记录',
      '以角色权限和租户隔离控制访问范围',
      '写操作设置风险核验、人工确认和审计记录',
    ],
    insight:
      '把业务经验整理为可更新的 SOP 与 Skill，再放进同一个人机协作环境中使用。',
  },
];

/* ---------- 交付启动 · 试点结构 ---------- */
const pilot = [
  '一个真实工作流或团队',
  '4-6 周试点周期',
  '客户侧 3-5 名参与者',
  '一名客户侧业务负责人',
  '一名技术负责人',
  '明确的验收证据与 ROI 指标',
  '从第一天起的交接计划',
];

const agenda = [
  '识别 AI 投入尚未产出清晰回报的业务领域',
  '梳理候选工作流',
  '选一个有边界、高价值的切入点',
  '定义预期 ROI 与验收证据',
  '确定第一个 Agent 特区试点',
];

const team = [
  {
    name: '马驰',
    role: '联合创始人 / CEO',
    image: maChiPortrait,
    imagePosition: 'center 24%',
    summary:
      '负责公司战略与 Agent 工程实践。曾任 Kreditz 工程副总裁，并在华为瑞典、华为云和腾讯技术工程事业群任职。',
    focus: 'AI 原生工程、FDE 交付体系、企业 Agent 落地',
  },
  {
    name: '李雪涛',
    role: '联合创始人 / AI 组织架构师',
    image: liXuetaoPortrait,
    imagePosition: 'center 18%',
    summary:
      '拥有土木工程与软件开发双重背景，13 年间从全栈工程师成长为研发副总，专注 AI 驱动的组织结构、质量体系与交付转型。',
    focus: 'AI 组织设计、研发转型、质量与 Harness 体系',
    profile: 'https://www.agentszone.ai/authors/li-xuetao',
  },
  {
    name: '杨正武',
    role: '联合创始人 / Chief Delivery Officer',
    image: yangZhengwuPortrait,
    imagePosition: 'center',
    summary:
      '负责客户交付与 FDE 体系，把业务问题拆解为可运行的工作流、系统连接、Agent 规则和可持续交接的工程资产。',
    focus: 'FDE 交付、工作流架构、Agent 工程资产化',
    profile: 'https://www.agentszone.ai/authors/yang-zhengwu',
  },
];
export { products, elements, steps, capabilities, cases, pilot, agenda, team };
