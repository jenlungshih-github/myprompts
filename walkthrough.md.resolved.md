# Nanobana Pro 提示詞大全網站 - Walkthrough

我已經為您建立了一個收集 Nanobana Pro (Google Gemini 3 Image Pro) 提示詞的網站，並參考了「茶米老師教室」的相關分類與說明。

## 網站功能
- **分類瀏覽**：包含風格轉換、圖像編輯、攝影效果、角色設計等分類。
- **搜尋功能**：可即時搜尋提示詞標題、描述或標籤。
- **一鍵複製**：方便使用者複製提示詞到 Nanobana Pro 使用。
- **響應式設計**：支援手機與桌面瀏覽，採用 Nana Banana 風格（黃/黑/白）配色。
- **本地圖片上傳**：使用者可以上傳自己的參考圖片。

## 包含的提示詞範例
根據搜尋結果，我已整理並收錄了以下類型的提示詞：
- **3D 公仔 & 針織娃娃**：風格轉換範例。
- **iPhone 自拍**：逼真攝影效果。
- **背景替換 & 角度變換**：圖像編輯功能。
- **OOTD 穿搭**：角色一致性與換裝。
   cd nanobana-prompts
   ```
2. 安裝依賴（如果尚未安裝）：
   ```bash
   npm install
   ```
3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
4. 打開瀏覽器訪問 `http://localhost:5173`。

## 專案結構
- [src/data/prompts.js](file:///c:/Gemini-AntiGravity/chinese-prompts/src/data/prompts.js): 存放所有提示詞資料，方便日後新增或修改。
- [src/App.jsx](file:///c:/Gemini-AntiGravity/chinese-prompts/src/App.jsx): 主要網站邏輯與介面。
- `src/index.css`: 全站樣式設計。
- `public/images`: 存放範例圖片。

> [!NOTE]
> 由於無法直接取得「茶米老師教室」的原始文件，本網站的提示詞資料是根據網路上關於 Nanobana Pro 的教學與範例整理而成。您可以隨時在 [src/data/prompts.js](file:///c:/Gemini-AntiGravity/chinese-prompts/src/data/prompts.js) 中擴充更多內容。
