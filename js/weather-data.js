/**
 * Weather Data Store
 * Static mock data matching Figma design values
 */
const WeatherData = {
  currentLocation: {
    city: 'Seattle',
    state: 'WA',
    date: 'Thursday, 10:42 AM',
    temp: 62,
    unit: '°F',
    condition: 'Partly Cloudy',
    feelsLike: 60,
    icon: 'partly-cloudy',
    humidity: 48,
    wind: { speed: 12, unit: 'mph', direction: 'NW' },
    uv: { value: 4, max: 10, level: 'Moderate' },
    visibility: { value: 10, unit: 'mi', desc: 'Clear View' }
  },

  hourlyForecast: [
    { time: '12 PM', temp: 60, icon: 'partly-cloudy' },
    { time: '1 PM', temp: 61, icon: 'partly-cloudy' },
    { time: '2 PM', temp: 63, icon: 'partly-cloudy' },
    { time: '3 PM', temp: 64, icon: 'cloudy' },
    { time: '4 PM', temp: 65, icon: 'cloudy' },
    { time: '5 PM', temp: 64, icon: 'partly-cloudy' },
    { time: '6 PM', temp: 62, icon: 'partly-cloudy' },
    { time: '7 PM', temp: 60, icon: 'clear-night' },
    { time: '8 PM', temp: 58, icon: 'clear-night' },
    { time: '9 PM', temp: 57, icon: 'clear-night' },
    { time: '10 PM', temp: 56, icon: 'clear-night' },
    { time: '11 PM', temp: 55, icon: 'clear-night' },
    { time: '12 AM', temp: 54, icon: 'clear-night' },
    { time: '1 AM', temp: 53, icon: 'clear-night' },
    { time: '2 AM', temp: 52, icon: 'clear-night' },
    { time: '3 AM', temp: 52, icon: 'clear-night' },
    { time: '4 AM', temp: 51, icon: 'clear-night' },
    { time: '5 AM', temp: 52, icon: 'cloudy' },
    { time: '6 AM', temp: 53, icon: 'cloudy' },
    { time: '7 AM', temp: 54, icon: 'partly-cloudy' },
    { time: '8 AM', temp: 56, icon: 'partly-cloudy' }
  ],

  weeklyForecast: [
    { day: 'Today', icon: 'partly-cloudy', high: 65, low: 52, active: true },
    { day: 'Fri', icon: 'sunny', high: 68, low: 54 },
    { day: 'Sat', icon: 'rainy', high: 59, low: 48 },
    { day: 'Sun', icon: 'cloudy', high: 60, low: 49 },
    { day: 'Mon', icon: 'snowy', high: 63, low: 51 },
    { day: 'Tue', icon: 'sunny', high: 70, low: 55 },
    { day: 'Wed', icon: 'sunny', high: 72, low: 56 }
  ],

  savedCities: [
    { city: 'Kyoto', country: 'Japan', temp: 72, high: 75, low: 60, icon: 'sunny', condition: 'Clear' },
    { city: 'Reykjavik', country: 'Iceland', temp: 41, high: 43, low: 38, icon: 'rainy', condition: 'Overcast' },
    { city: 'Sedona', country: 'Arizona, USA', temp: 88, high: 92, low: 65, icon: 'sunny', condition: 'Hot & Sunny' }
  ],

  detailedForecast: {
    location: 'Kyoto, Japan',
    today: {
      date: 'Today, Oct 24',
      temp: 72,
      low: 58,
      condition: 'Breezy with scattered clouds',
      icon: 'partly-cloudy',
      morning: { temp: 62, precip: 10, icon: 'rainy' },
      afternoon: { temp: 72, precip: 0, icon: 'sunny' },
      night: { temp: 58, precip: 5, icon: 'clear-night' }
    },
    upcoming: [
      { date: 'Fri, Oct 25', icon: 'rainy', high: 65, low: 50, barStart: 30, barWidth: 35, barColor: 'var(--chart-blue)' },
      { date: 'Sat, Oct 26', icon: 'sunny', high: 78, low: 55, barStart: 35, barWidth: 45, barColor: 'linear-gradient(90deg, var(--chart-purple), var(--chart-pink))' },
      { date: 'Sun, Oct 27', icon: 'cloudy', high: 70, low: 54, barStart: 32, barWidth: 35, barColor: 'var(--color-text-muted)' }
    ],
    weeklyTrends: {
      labels: ['T', 'F', 'S', 'S', 'M', 'T', 'W'],
      precipitation: [20, 40, 30, 10, 5, 15, 25],
      humidity: [60, 65, 55, 50, 45, 55, 60]
    }
  },

  settings: {
    tempUnit: 'celsius',
    timeFormat: '24-hour',
    language: 'English (US)',
    severeWeatherAlerts: true,
    darkMode: false
  }
};

// Make available globally
window.WeatherData = WeatherData;
