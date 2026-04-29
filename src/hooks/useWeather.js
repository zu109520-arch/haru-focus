import { useState, useEffect } from 'react'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('不支援定位')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=zh_tw`
          )
          const data = await res.json()
          setWeather({
            temp: Math.round(data.main.temp),
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            city: data.name,
          })
        } catch {
          setError('無法取得天氣')
        }
      },
      () => setError('請開啟瀏覽器位置權限以顯示天氣')
    )
  }, [])

  return { weather, error }
}
