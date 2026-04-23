import { useState } from 'react'

export function TimeSettings({ focusMin, breakMin, onSave }) {
  const [fMin, setFMin] = useState(focusMin)
  const [bMin, setBMin] = useState(breakMin)

  return (
    <div className="settings-panel">
      <div className="setting-row">
        <label>專注</label>
        <div className="setting-control">
          <button onClick={() => setFMin(m => Math.max(1, m - 1))}>−</button>
          <span>{fMin} 分</span>
          <button onClick={() => setFMin(m => Math.min(120, m + 1))}>+</button>
        </div>
      </div>
      <div className="setting-row">
        <label>休息</label>
        <div className="setting-control">
          <button onClick={() => setBMin(m => Math.max(1, m - 1))}>−</button>
          <span>{bMin} 分</span>
          <button onClick={() => setBMin(m => Math.min(60, m + 1))}>+</button>
        </div>
      </div>
      <button className="save-btn" onClick={() => onSave(fMin, bMin)}>套用</button>
    </div>
  )
}
