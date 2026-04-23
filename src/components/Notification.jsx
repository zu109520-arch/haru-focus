import { useEffect } from 'react'

export function Notification({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="notification" onClick={onClose}>
      <span>{message}</span>
    </div>
  )
}
