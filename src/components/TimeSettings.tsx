import { useState } from 'react';
const focusPresets = [15, 25, 30, 45];
const breakPresets = [5, 10, 15, 20];

interface TimeSettingsProps {
  focusMin: number;
  breakMin: number;
  onSave: (focusMin: number, breakMin: number) => void;
}

export function TimeSettings({
  focusMin,
  breakMin,
  onSave,
}: TimeSettingsProps) {
  const [fMin, setFMin] = useState(focusMin);
  const [bMin, setBMin] = useState(breakMin);

  return (
    <div className="settings-panel">
      <div className="setting-row">
        <div className="setting-row-top">
          <label>專注</label>
          <div className="setting-control">
            <button onClick={() => setFMin((m) => Math.max(1, m - 1))}>−</button>
            <span>{fMin} 分</span>
            <button onClick={() => setFMin((m) => Math.min(120, m + 1))}>
              +
            </button>
          </div>
        </div>
        <div className="preset-row">
          {focusPresets.map((p) => (
            <button key={p} className="preset-btn" onClick={() => setFMin(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="setting-row">
        <div className="setting-row-top">
          <label>休息</label>
          <div className="setting-control">
            <button onClick={() => setBMin((m) => Math.max(1, m - 1))}>−</button>
            <span>{bMin} 分</span>
            <button onClick={() => setBMin((m) => Math.min(60, m + 1))}>+</button>
          </div>
        </div>
        <div className="preset-row">
          {breakPresets.map((p) => (
            <button key={p} className="preset-btn" onClick={() => setBMin(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <button className="save-btn" onClick={() => onSave(fMin, bMin)}>
        套用
      </button>
    </div>
  );
}