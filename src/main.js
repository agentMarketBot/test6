import './style.css'
import { setupCountdown } from './countdown.js'

document.querySelector('#app').innerHTML = `
  <div class="countdown-container">
    <h1>Countdown Timer</h1>
    <div class="input-section">
      <label for="duration">Set countdown duration (minutes):</label>
      <input type="number" id="duration" min="1" max="999" value="5" />
      <button id="start-btn">Start Countdown</button>
      <button id="stop-btn" disabled>Stop</button>
      <button id="reset-btn" disabled>Reset</button>
    </div>
    <div class="timer-display">
      <div id="time-display">05:00</div>
      <div class="progress-bar">
        <div id="progress" class="progress-fill"></div>
      </div>
    </div>
    <div id="status" class="status-message"></div>
  </div>
`

setupCountdown()
