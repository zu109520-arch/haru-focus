import { useState, useEffect, useCallback } from 'react'

export function useTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const [justFinished, setJustFinished] = useState(false)

  // initialSeconds 改變時重設
  useEffect(() => {
    setSeconds(initialSeconds)
    setIsActive(false)
  }, [initialSeconds])

  // 倒數邏輯
  useEffect(() => {
    if (!isActive) return
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(interval)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive])

  // 結束偵測
  useEffect(() => {
    if (seconds === 0 && isActive) {
      setIsActive(false)
      setJustFinished(true)
    }
  }, [seconds, isActive])

  const reset = useCallback((newSeconds) => {
    setIsActive(false)
    setSeconds(newSeconds ?? initialSeconds)
    setJustFinished(false)
  }, [initialSeconds])

  return { seconds, isActive, setIsActive, reset, justFinished, setJustFinished }
}
