# AI 角色討論平台 - 使用說明

## 環境設定

1. 安裝依賴：
```bash
npm install
```

2. 設定 LLM API 金鑰：
- 複製 `.env.example` 為 `.env.local`
- 填入以下設定：
  ```
  VITE_LLM_API_KEY=your_api_key_here
  VITE_LLM_BASE_URL=https://opencode.ai/zen/go/v1/chat/completions
  VITE_LLM_DEFAULT_MODEL=qwen3.5-plus
  ```

## 啟動應用程式

```bash
npm run dev
```

## 功能說明

### 角色設定

- 編輯角色 A 與角色 B 的提示詞，自訂各自的立場、語氣與人設
- 設定討論回合數（預設 10 輪）

### 開始討論

1. 輸入討論主題
2. 點擊「開始討論」
3. 觀看兩個 AI 角色輪流發言
4. 討論結束後查看摘要與重點整理
5. 可將討論內容儲存至本地端

## 自訂設定

- 在角色設定區修改提示詞
- 調整討論回合數
- 討論結果會自動儲存至瀏覽器本地端儲存空間

## 常見問題

- API 金鑰問題：請確認金鑰格式正確且有效
- 網路錯誤：請確認網路連線與 API 服務狀態
- 速率限制：LLM API 有請求頻率限制，請稍候再試
