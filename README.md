# Resume Builder — 在线简历生成器

一个纯前端、无需注册的在线简历编辑与美化工具。支持 **4 套精美模板**、**实时预览**、**模块自定义**和**一键导出 PDF / HTML**，所有数据保存在浏览器本地，无需担心隐私泄露。

## 功能特性

### 模板系统
- **经典模板**：传统双栏布局，包含技能进度条，适合金融、法律、国企等正式场合
- **现代模板**：左侧深色侧边栏 + 白色内容区，联系方式与技能置于侧边，视觉层次分明
- **极简模板**：大面积留白、居中排版、标签式技能展示，适合设计师、产品经理、学术岗位
- **创意模板**：顶部彩色横幅、环形技能图、卡片式经历展示，适合互联网、创意行业

### 编辑功能
- **全字段编辑**：个人信息、工作经历、教育背景、专业技能、项目经验、证书、语言，每个字段均可自由编辑
- **动态增删**：每种条目（经历、教育、技能等）均可添加或移除，数量不限
- **模块显隐**：每个模块可单独开关，支持一键全显/全隐，适应不同岗位投递需求
- **折叠面板**：表单区域支持按模块折叠，聚焦当前编辑内容

### 美化定制
- **8 种预设主题色** + 原生取色器，自由选择品牌色
- **字号调节**：10px–20px 范围内步进调整，适配不同内容密度
- **实时预览**：左侧编辑，右侧即显效果，所见即所得
- **四模板即时切换**：所有模板共享同一份数据，切换模板无需重新填写

### 数据与导出
- **本地持久化**：所有数据自动保存至浏览器 `localStorage`，刷新页面或关闭浏览器不会丢失
- **PDF 导出**：基于 `html2canvas` + `jsPDF`，精确渲染 A4 尺寸，支持多页内容
- **HTML 导出**：打包为独立的自包含 HTML 文件，内嵌全部 CSS 样式，可直接在浏览器打开或打印
- **一键恢复默认**：提供示例数据填充，也支持一键重置为空模板

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 |
| 构建 | Vite 8 |
| 图标 | Lucide React |
| PDF 导出 | html2canvas + jsPDF |
| HTML 导出 | DOM Clone + Blob Download |
| 样式 | 纯 CSS（零运行时，无第三方 UI 库） |

## 快速开始

```bash
# 克隆项目
git clone https://github.com/Simon404Error/resume-builder.git
cd resume-builder

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

启动后浏览器访问 `http://localhost:5173/` 即可使用。

## 使用指南

### 基本流程

1. **选择模板**：顶部工具栏点击「经典 / 现代 / 极简 / 创意」切换模板风格
2. **填写信息**：左侧表单面板逐项填写个人信息、经历、技能等
3. **调整样式**：选择主题色、调节字号，预览区即时反馈
4. **导出文件**：点击右上角「HTML」或「PDF」按钮将简历导出为对应格式

### 高级操作

- **隐藏模块**：不需要展示的模块（如证书、语言），点击模块标题右侧的勾选框即可在预览中隐藏
- **添加条目**：每个模块底部有「添加经历 / 添加技能」等按钮，点击即可新增
- **删除条目**：每个条目卡片右上角有删除按钮
- **重置数据**：点击恢复默认按钮可将所有内容替换为示例数据

### 数据安全

所有填写的内容仅存储在浏览器本地，**不会上传到任何服务器**。导出 PDF 和 HTML 的过程完全在本地完成。

## 项目结构

```
resume-builder/
├── public/                          # 静态资源
├── src/
│   ├── components/
│   │   ├── templates/               # 简历模板
│   │   │   ├── Classic.jsx          #   经典模板
│   │   │   ├── Modern.jsx           #   现代模板
│   │   │   ├── Minimal.jsx          #   极简模板
│   │   │   └── Creative.jsx         #   创意模板
│   │   ├── ResumeForm.jsx           # 左侧编辑表单
│   │   ├── ResumePreview.jsx        # 右侧预览面板 + 模板切换
│   │   └── Toolbar.jsx              # 顶部工具栏
│   ├── data/
│   │   └── defaultResume.js         # 默认示例数据
│   ├── utils/
│   │   ├── pdfExport.js             # PDF 导出逻辑
│   │   └── htmlExport.js            # HTML 导出逻辑
│   ├── App.jsx                      # 主应用（状态管理、布局）
│   ├── App.css                      # 全局样式 + 四套模板样式
│   └── main.jsx                     # 入口文件
├── index.html
├── package.json
└── vite.config.js
```

## 自定义模板

如果你需要添加新模板：

1. 在 `src/components/templates/` 下创建新的 `.jsx` 文件
2. 组件接收两个 props：
   - `data`：简历数据对象（结构见 `src/data/defaultResume.js`）
   - `accentColor`：CSS 颜色字符串
3. 使用 `style={{ '--accent': accentColor }}` 将主题色注入模板
4. 在 `src/components/ResumePreview.jsx` 中注册新模板

```jsx
// 注册示例
const templates = {
  classic:  { component: Classic,  label: '经典' },
  modern:   { component: Modern,   label: '现代' },
  minimal:  { component: Minimal,  label: '极简' },
  creative: { component: Creative, label: '创意' },
  custom:   { component: Custom,   label: '自定义' },  // 新增
};
```

## 部署

生产构建后 `dist/` 目录为纯静态文件，可部署到任意静态托管服务：

```bash
npm run build

# 使用任意静态服务预览
npx serve dist
```

支持的部署平台：
- GitHub Pages
- Vercel / Netlify（拖拽 dist 目录即可）
- Nginx / Apache 等传统 Web 服务器

## License

MIT
