/**
 * Main Application Controller
 */
const App = {
  init() {
    A11y.init();
    this.highlightActiveNav();
    this.setupRadarToggle();
    this.setupSettingsControls();
    this.loadSettings();
  },

  highlightActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('nav-link--active');
      link.setAttribute('aria-current', 'false');
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
        link.classList.add('nav-link--active');
        link.setAttribute('aria-current', 'page');
      }
    });
  },

  setupRadarToggle() {
    const toggleBtn = document.getElementById('radar-toggle');
    const radarSection = document.getElementById('radar-section');
    if (toggleBtn && radarSection) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = radarSection.hidden;
        radarSection.hidden = !isHidden;
        toggleBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        toggleBtn.textContent = isHidden ? 'Hide Radar' : 'Show Radar';
        A11y.announce(isHidden ? 'Radar map expanded' : 'Radar map collapsed');
      });
    }
  },

  setupSettingsControls() {
    // Temperature unit toggle
    document.querySelectorAll('[data-setting="temp-unit"] .toggle-group-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        WeatherData.settings.tempUnit = value;
        this.saveSettings();
        A11y.announce(`Temperature unit changed to ${value}`);
      });
    });

    // Time format toggle
    document.querySelectorAll('[data-setting="time-format"] .toggle-group-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        WeatherData.settings.timeFormat = value;
        this.saveSettings();
        A11y.announce(`Time format changed to ${value}`);
      });
    });

    // Severe weather toggle
    const alertToggle = document.getElementById('severe-weather-toggle');
    if (alertToggle) {
      alertToggle.addEventListener('change', () => {
        WeatherData.settings.severeWeatherAlerts = alertToggle.checked;
        this.saveSettings();
        A11y.announce(`Severe weather alerts ${alertToggle.checked ? 'enabled' : 'disabled'}`);
      });
    }

    // Dark mode toggle
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) {
      darkToggle.addEventListener('change', () => {
        WeatherData.settings.darkMode = darkToggle.checked;
        this.saveSettings();
        A11y.announce(`Dark mode ${darkToggle.checked ? 'enabled' : 'disabled'}`);
      });
    }
  },

  saveSettings() {
    try {
      localStorage.setItem('weather-settings', JSON.stringify(WeatherData.settings));
    } catch (e) { /* localStorage may be unavailable */ }
  },

  loadSettings() {
    try {
      const saved = localStorage.getItem('weather-settings');
      if (saved) {
        Object.assign(WeatherData.settings, JSON.parse(saved));
      }
    } catch (e) { /* ignore */ }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
