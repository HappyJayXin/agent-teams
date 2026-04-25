# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language
- 一律使用繁體中文回答。

## Project Setup
- Vue 3 + Vite 專案。
- Node.js 版本限制：`^20.19.0 || >=22.12.0`
- 套件管理器：yarn（`yarn.lock` 存在）。

## Commands
- 安裝依賴：`yarn install`
- 開發伺服器：`npm run dev`
- 生產建置：`npm run build`
- 預覽生產版本：`npm run preview`
- 執行測試：`npm test`
- 監聽模式測試：`npm run test:watch`
- Lint（注意：目前缺少 eslint config 檔，執行會失敗）：`npm run lint`

## Environment Variables
執行前需在 `.env.local` 設定以下變數：
- `VITE_LLM_API_KEY`：OpenAI 相容 API 金鑰（需超過 10 字元）
- `VITE_LLM_BASE_URL`：LLM API 基礎 URL，預設 `https://api.openai.com/v1`
- `VITE_LLM_DEFAULT_MODEL`：模型名稱，預設 `qwen3.5-plus`

開發環境下 API 請求會透過 Vite proxy（`/api/llm`）轉發；生產環境直接使用 `VITE_LLM_BASE_URL`。

## Project Structure
- `src/composables/`：Vue composables（`useSteps`、`useRoles`、`useDiscussion`）
- `src/services/`：LLM API 呼叫層（`llmApi.js`、`apiService.js`）
- `src/utils/storage.js`：localStorage 工具函式
- `src/__tests__/`：所有單元測試，使用 Vitest + jsdom

## Testing
- 測試框架：Vitest，設定內嵌於 `vite.config.js`（非獨立設定檔），啟用 globals 與 jsdom 環境。
- 測試檔放在 `src/__tests__/`，命名格式 `*.test.js`。

## Code Style
- 使用 ES modules（ESM）。
- 遵循 Vue 3 Composition API 慣例。
- 錯誤訊息與 UI 文字使用繁體中文。
