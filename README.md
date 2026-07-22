# Pomodoro Timer

一個以 React.js 建構的專注力計時應用，結合番茄工作法與待辦清單，幫助使用者提升工作效率。

**Live Demo：** [haru-focus.vercel.app](https://haru-focus.vercel.app)
[![番茄鐘專注計時器](https://github.com/user-attachments/assets/965776da-17a8-4f2c-8f77-00ea49c7e965)](https://haru-focus.vercel.app)

---

## 專案特色

- 使用 TypeScript 撰寫，透過 interface 定義元件 Props 與資料結構，提升程式碼可維護性與型別安全性
- 以 Custom Hook（`useTimer`）封裝倒數計時邏輯，提升邏輯與 UI 的分離性
- 專注 / 休息雙模式切換，SVG 圓形進度環動態顯示剩餘時間
- 整合 Todo List CRUD 功能，透過 `useEffect` 達成跨元件狀態同步
- CSS 變數（`--accent`）實現主題色動態切換
- 支援自訂背景圖片 URL，個人化使用體驗
- 整合瀏覽器 Audio API 播放提示音效
- Tab 標題同步顯示倒計時（`document.title`）
- localStorage 持久化：計時設定、待辦清單、背景圖片跨頁面保留
- 串接 OpenWeatherMap RESTful API，依使用者當前位置即時顯示天氣資訊

---

## 技術亮點

**Custom Hook 封裝計時邏輯**

- 將 `setInterval`、`clearInterval` 與計時狀態抽出至 `useTimer`
- 在 `useEffect` 的 cleanup function 中清除計時器，避免 memory leak
- App.tsx 專注於畫面組裝，提升元件可測試性與維護性

**CSS 變數動態主題切換**

- 父元件根據模式切換 `.focus-mode` / `.break-mode` className
- 兩個 class 定義不同的 `--accent` 變數值，子元件自動繼承
- 不需透過 props 一層一層傳遞顏色，樣式邏輯集中於 CSS

**SVG 圓形進度環**

- 使用 `strokeDasharray` 設定圓周長度、`strokeDashoffset` 控制缺口
- 依剩餘時間比例動態計算偏移量，每秒平滑更新
- 純 SVG 實作，不依賴圖片或第三方圖表函式庫

**RESTful API 串接**

- 透過 Geolocation API 取得使用者經緯度
- 以 Fetch API 呼叫 OpenWeatherMap，處理 JSON 回應與錯誤狀態

---

## 開發挑戰

- 使用 setInterval 實作倒數計時時，需避免 React re-render 導致 stale closure 問題，確保計時狀態正確更新
- 在專注 / 休息模式切換時，需同步更新計時器與待辦流程狀態，避免邏輯不一致
- 串接 Geolocation API 與天氣資料時，需處理權限拒絕與 API 請求失敗，提高應用穩定性

---

## 技術架構

| 類別     | 技術                          |
| -------- | ----------------------------- |
| 框架     | React                         |
| 語言     | TypeScript                    |
| 狀態管理 | React Hooks / Custom Hook     |
| 樣式系統 | CSS Variables / SVG Animation |
| 建置工具 | Vite                          |
| 部署     | Vercel                        |
| 資料儲存 | localStorage                  |
| 外部 API | OpenWeatherMap API            |

---

## 主要功能

**計時器**

- 專注 / 休息模式一鍵切換
- SVG 圓形進度環即時顯示剩餘時間比例
- 開始、暫停、繼續、重設
- 自訂專注時長與休息時長
- 計時結束播放音效提示

**統計**

- 累計專注次數
- 累計專注小時數
- 每輪專注分鐘數顯示

**待辦清單**

- 新增、勾選完成、刪除
- localStorage 持久化，重新整理不遺失

**個人化**

- 主題色隨模式切換（專注：紅色 / 休息：綠色）
- 自訂背景圖片（輸入圖片 URL 即時套用）

**天氣資訊**

- 串接 OpenWeatherMap API，取得使用者當前位置天氣
- 即時顯示城市、溫度、天氣狀態

---

## 元件結構

```
src/
├── hooks/
│   ├── useTimer.ts          # 計時器 Custom Hook
│   └── useWeather.ts        # 天氣 Custom Hook
├── components/
│   ├── TodoList.tsx          # 待辦清單元件
│   ├── TimeSettings.tsx      # 時間設定元件
│   └── Notification.tsx      # 通知元件
├── App.tsx                   # 主元件
└── App.css                   # 全域樣式與 CSS 變數
```

---

## 本機執行

```bash
git clone https://github.com/zu109520-arch/haru-focus.git
cd haru-focus
npm install
npm run dev
```

> 本機執行需在根目錄建立 `.env` 檔案並填入 OpenWeatherMap API Key：
>
> ```
> VITE_WEATHER_API_KEY=your_api_key_here
> ```
