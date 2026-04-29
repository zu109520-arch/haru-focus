# Pomodoro Timer

一個以 React.js 建構的專注力計時應用，結合番茄工作法與待辦清單，幫助使用者提升工作效率。

**Live Demo：** [haru-focus.vercel.app](https://haru-focus.vercel.app)
[![番茄鐘專注計時器](https://github.com/user-attachments/assets/965776da-17a8-4f2c-8f77-00ea49c7e965)](https://haru-focus.vercel.app)

---

## 專案特色

- 以 Custom Hook（`useTimer`）封裝計時邏輯，實現業務邏輯與 UI 分離
- 專注 / 休息雙模式切換，SVG 圓形進度環動態顯示剩餘時間
- 整合 Todo List CRUD 功能，透過 `useEffect` 達成跨元件狀態同步
- CSS 變數（`--accent`）實現主題色動態切換
- 支援自訂背景圖片 URL，個人化使用體驗
- 整合瀏覽器 Audio API 播放提示音效
- Tab 標題同步顯示倒計時（`document.title`）
- localStorage 持久化：計時設定、待辦清單、背景圖片跨頁面保留
- 串接 OpenWeatherMap RESTful API，依使用者當前位置即時顯示天氣資訊

---

## 技術架構

| 類別 | 技術 |
|------|------|
| 框架 | React.js 18 |
| 狀態管理 | React Hooks（useState、useEffect、Custom Hook） |
| 樣式 | CSS3 變數、SVG 動畫 |
| 建置工具 | Vite |
| 部署 | Vercel |
| 資料儲存 | localStorage |
| 外部 API | OpenWeatherMap API |

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
│   ├── useTimer.js         # 計時器 Custom Hook
│   └── useWeather.js       # 天氣 Custom Hook
├── components/
│   ├── TodoList.jsx         # 待辦清單元件
│   ├── TimeSettings.jsx     # 時間設定元件
│   └── Notification.jsx     # 通知元件
├── App.jsx                  # 主元件
└── App.css                  # 全域樣式與 CSS 變數
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
> ```
> VITE_WEATHER_API_KEY=your_api_key_here
> ```


