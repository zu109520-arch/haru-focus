import { useState, useEffect } from 'react'
import './App.css'
import { useTimer } from './hooks/useTimer'
import { TodoList } from './components/TodoList'
import { TimeSettings } from './components/TimeSettings'
import { Notification } from './components/Notification'
import { useWeather } from './hooks/useWeather'

function formatTime(s) {
  const mins = Math.floor(s / 60)
  const secs = s % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function App() {
  const [focusMin, setFocusMin] = useState(
    () => Number(localStorage.getItem('haru-focus-min')) || 30
  )
  const [breakMin, setBreakMin] = useState(
    () => Number(localStorage.getItem('haru-break-min')) || 5
  )
  const [isBreak, setIsBreak] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBgInput, setShowBgInput] = useState(false)
  const [bgInput, setBgInput] = useState('')
  const [notification, setNotification] = useState(null)
  const [count, setCount] = useState(
    () => Number(localStorage.getItem('haru-count')) || 0
  )
  const [todos, setTodos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('haru-todos')) || [] }
    catch { return [] }
  })
  const [customBg, setCustomBg] = useState(
    () => localStorage.getItem('haru-bg') || 'https://images.unsplash.com/photo-1519681393784-d120267933ba'
  )

  const initialSeconds = isBreak ? breakMin * 60 : focusMin * 60
  const { seconds, isActive, setIsActive, reset, justFinished, setJustFinished } = useTimer(initialSeconds)

  useEffect(() => {
    localStorage.setItem('haru-count', count)
    localStorage.setItem('haru-todos', JSON.stringify(todos))
    localStorage.setItem('haru-bg', customBg)
    localStorage.setItem('haru-focus-min', focusMin)
    localStorage.setItem('haru-break-min', breakMin)
  }, [count, todos, customBg, focusMin, breakMin])

  useEffect(() => {
    document.title = isActive ? `(${formatTime(seconds)}) Pomodoro Timer` : 'Pomodoro Timer'
  }, [seconds, isActive])

useEffect(() => {
  if (!justFinished) return
  if (!isBreak) {
    setCount(prev => prev + 1)
    setNotification('辛苦了！休息一下吧 ☕')
  } else {
    setNotification('休息結束！繼續加油 💪')
  }
  const playBeep = async () => {
    for (let i = 0; i < 5; i++) {
      const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg')
      audio.play().catch(() => {})
      await new Promise(res => setTimeout(res, 800))
    }
  }
  playBeep()
  setJustFinished(false)
}, [justFinished, isBreak, setJustFinished])

  const handleSaveSettings = (fMin, bMin) => {
    setFocusMin(fMin)
    setBreakMin(bMin)
    setShowSettings(false)
    reset(isBreak ? bMin * 60 : fMin * 60)
  }

  const handleBgChange = () => {
    if (bgInput.trim()) {
      setCustomBg(bgInput.trim())
      setBgInput('')
      setShowBgInput(false)
    }
  }

  const { weather, error: weatherError } = useWeather()

  const circumference = 2 * Math.PI * 90
  const progress = 1 - seconds / initialSeconds

  return (
    <div
      className={`app-container ${isBreak ? 'break-mode' : 'focus-mode'}`}
      style={{ backgroundImage: `url(${customBg})` }}
    >
      <div className="overlay" />

      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}

      <div className="timer-card">
        <h1 className="app-title">🍅 Pomodoro Timer</h1>

        <div className="toolbar">
          <button
            className="tool-btn"
            onClick={() => { setShowSettings(s => !s); setShowBgInput(false) }}
          >
            ⚙ 設定
          </button>
          <div className="mode-tabs">
            <button className={`tab ${!isBreak ? 'active' : ''}`} onClick={() => setIsBreak(false)}>專注</button>
            <button className={`tab ${isBreak ? 'active' : ''}`} onClick={() => setIsBreak(true)}>休息</button>
          </div>
          <button
            className="tool-btn"
            onClick={() => { setShowBgInput(s => !s); setShowSettings(false) }}
          >
            🖼 背景
          </button>
        </div>

        {showSettings && (
          <TimeSettings focusMin={focusMin} breakMin={breakMin} onSave={handleSaveSettings} />
        )}

        {showBgInput && (
          <div className="bg-input-panel">
            <input
              type="text"
              placeholder="貼上圖片網址..."
              value={bgInput}
              onChange={e => setBgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleBgChange()}
            />
            <button onClick={handleBgChange}>套用</button>
          </div>
        )}

        <div className="timer-ring-wrapper">
          <svg className="timer-ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" className="ring-bg" />
            <circle
              cx="100" cy="100" r="90"
              className="ring-progress"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
            />
          </svg>
          <div className="timer-center">
            <div className="timer-display">{formatTime(seconds)}</div>
            <div className="timer-mode-label">{isBreak ? '休息中' : '專注中'}</div>
          </div>
        </div>

        <div className="controls">
          <button className="main-btn" onClick={() => setIsActive(a => !a)}>
            {isActive ? '暫停' : (seconds < initialSeconds && seconds > 0 ? '繼續' : '開始')}
          </button>
          <button className="reset-btn" onClick={() => reset()}>重設</button>
        </div>

        <div className="stats-row">
          <div className="stat">
            <span className="stat-num">{count}</span>
            <span className="stat-label">次專注</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{(count * focusMin / 60).toFixed(1)}</span>
            <span className="stat-label">小時</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{focusMin}</span>
            <span className="stat-label">分 / 輪</span>
          </div>
        </div>

        <div className="weather-bar">
          {weather ? (
            <>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                alt={weather.desc}
                className="weather-icon"
              />
              <span className="weather-text">
                {weather.city}　{weather.temp}°C　{weather.desc}
              </span>
            </>
          ) : weatherError ? (
            <span className="weather-text weather-error">{weatherError}</span>
          ) : (
            <span className="weather-text">載入天氣中...</span>
          )}
        </div>

        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default App
