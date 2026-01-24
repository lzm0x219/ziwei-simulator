# 紫微斗數 (Ziwei Simulator)

一個基於 React、Rsbuild 和 Tauri 的紫微斗數命盤模擬器。支持實時計算和可視化顯示紫微斗數的各項數據，包括十幹十二支、星曜、大限、流年等信息。

## 功能特性

- **命盤計算**：根據出生年月日時計算紫微斗數命盤
- **星曜計算**：實時計算各類星曜（紫微、天府、天梁等）及其位置
- **大限與流年**：支持大限和流年的計算與展示
- **交互式界面**：直觀的命盤視覺化展示，支持拖拽和交互
- **跨平台應用**：使用 Tauri 打包為桌面應用（Windows、macOS、Linux）

## 技術棧

- **前端框架**：[React 19](https://react.dev)
- **構建工具**：[Rsbuild 2](https://rsbuild.rs)
- **桌面應用**：[Tauri 2](https://tauri.app)
- **UI 組件庫**：[Ant Design 6](https://ant.design)
- **樣式解決方案**：[Tailwind CSS](https://tailwindcss.com) + [antd-style](https://antd-style.js.org)
- **測試框架**：[Rstest](https://rstest.rs)
- **代碼質量**：[Oxlint](https://oxc-project.github.io/docs/guide/linter.html)、[Oxfmt](https://oxc-project.github.io/docs/guide/formatter.html)

## 快速開始

### 前置條件

- Node.js 18+
- Bun 包管理器
- Rust（用於 Tauri 開發）

### 安裝依賴

```bash
bun install
```

### 開發模式

#### Web 應用開發

啟動開發服務器，應用將在 [http://localhost:3000](http://localhost:3000) 上可用：

```bash
bun run dev
```

#### 桌面應用開發

啟動 Tauri 開發模式：

```bash
bun run dev:tauri
```

### 構建生產版本

#### 構建 Web 應用

```bash
bun run build
```

#### 構建桌面應用

```bash
bun run build:tauri
```

### 預覽生產構建

```bash
bun run preview
```

## 項目結構

```
src/
├── components/           # React 組件
│   ├── Simulator.tsx    # 主要命盤模擬器
│   ├── SimulatorSetting.tsx  # 命盤設置面板
│   ├── Palace.tsx       # 命宮組件
│   ├── PalaceStar.tsx   # 星曜展示組件
│   ├── LaiYin.tsx       # 萊茵宮位組件
│   └── ...
├── hooks/               # React Hooks
│   ├── useSimulator.ts  # 模擬器狀態容器
│   ├── useRuntime.ts    # 運行時數據容器
│   ├── useRender.ts     # 渲染配置容器
│   ├── usePalaceCoordinates.ts  # 宮位坐標計算
│   └── ...
├── rules/               # 核心計算邏輯
│   └── index.ts         # 紫微斗數計算算法
├── constants/           # 常量定義
│   └── index.ts         # 十幹十二支、星曜等常量
├── typings/             # TypeScript 類型定義
├── utils/               # 工具函數
│   ├── array.ts         # 數組相關工具
│   ├── base.ts          # 基礎工具函數
│   ├── color.ts         # 顏色相關工具
│   └── ...
├── App.tsx              # 根組件
└── index.tsx            # 應用入口

src-tauri/              # Tauri 後端
├── src/                # Rust 源代碼
├── Cargo.toml          # Rust 依賴配置
└── tauri.conf.json     # Tauri 應用配置

tests/                  # 測試文件
├── dom.test.ts         # DOM 測試
└── rstest.setup.ts     # 測試配置

styled-system/          # Panda CSS 生成的樣式系統
```

## 可用命令

```bash
# 開發
bun run dev              # 啟動 Web 開發服務器
bun run dev:tauri        # 啟動 Tauri 開發模式
bun run dev:rsdoctor     # 啟動開發服務器並使用 RsDoctor

# 構建
bun run build            # 構建 Web 應用
bun run build:tauri      # 構建 Tauri 應用
bun run build:rsdoctor   # 構建應用並使用 RsDoctor
bun run preview          # 預覽生產構建

# 測試
bun run test             # 運行測試
bun run test:watch       # 監視模式運行測試

# 代碼質量
bun run lint             # 運行 Oxlint 檢查
bun run lint:fix         # 自動修復 Oxlint 問題
bun run fmt              # 格式化代碼（Oxfmt）
bun run fmt:check        # 檢查代碼格式
```

## 核心模塊說明

### Rules（計算規則）

[src/rules/index.ts](src/rules/index.ts) 包含所有紫微斗數的計算邏輯：

- `calculateStems()`：計算天幹
- `calculateStars()`：計算星曜位置
- `calculatePalaces()`：計算命宮及各宮位
- `calculateDecadePalaces()`：計算大限宮位
- `calculateYearlyPalaces()`：計算流年宮位
- `calculateYearlys()`：計算流年信息

### Hooks（狀態管理）

使用 React Context 容器模式管理全局狀態：

- `SimulatorContainer`：模擬器配置（寬度、顏色、字體大小等）
- `RuntimeContainer`：運行時數據（年月日時、干支等）
- `RenderContainer`：渲染配置（是否顯示位置星等）

### 常量定義

[src/constants/index.ts](src/constants/index.ts) 定義所有常量數據：

- 天幹（甲、乙、丙、丁、戊、己、庚、辛、壬、癸）
- 地支（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥）
- 星曜信息
- 五行屬性

## 依賴版本

主要依賴：

- `react`: 19.2.3
- `react-dom`: 19.2.3
- `antd`: 6.2.1
- `antd-style`: 4.1.0
- `@tauri-apps/api`: 2.9.1

開發依賴：

- `typescript`: 5.9.3
- `@rsbuild/core`: 2.0.0-alpha.0
- `@rsbuild/plugin-react`: 1.4.3
- `@tauri-apps/cli`: 2.9.6

## 資源

- [Rsbuild 文檔](https://rsbuild.rs)
- [Rspack 文檔](https://rspack.rs)
- [Tauri 文檔](https://tauri.app)
- [React 文檔](https://react.dev)
- [Ant Design 文檔](https://ant.design)
