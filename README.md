# AI 角色討論平台

一個基於 Vue 3 的 Web 應用，讓兩個具有不同立場的 AI 角色就指定主題進行多輪辯論，並自動生成討論摘要。

## 專案簡介

使用者可自訂兩個 AI 角色的人設提示詞，輸入討論主題後，系統會讓兩個角色輪流發言，模擬具有立場對立的 AI 對話。

適合用於：
- 多角度腦力激盪
- AI 辯論場景模擬
- 探索不同立場的論述

## 功能特色

- 自訂 AI 角色提示詞（人設、語氣、立場）
- 設定討論回合數（預設 10 輪）
- 自動生成討論摘要與關鍵觀點
- 本地端對話紀錄儲存
- 支援多種 LLM 服務（透過相容 OpenAI 格式的 API）
- 響應式設計，支援桌面與行動裝置

## 快速開始

### 安裝依賴

```sh
npm install
```

### 設定環境變數

複製 `.env.example` 為 `.env.local`，填入 LLM API 設定：

```env
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_BASE_URL=https://opencode.ai/zen/go/v1/chat/completions
VITE_LLM_DEFAULT_MODEL=qwen3.5-plus
```

### 啟動開發伺服器

```sh
npm run dev
```

### 打包正式版本

```sh
npm run build
```

## 使用說明

詳細操作步驟請參閱 [USAGE.md](docs/USAGE.md)。
