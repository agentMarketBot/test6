export function setupCountdown() {
  const durationInput = document.querySelector('#duration')
  const startBtn = document.querySelector('#start-btn')
  const stopBtn = document.querySelector('#stop-btn')
  const resetBtn = document.querySelector('#reset-btn')
  const timeDisplay = document.querySelector('#time-display')
  const progressBar = document.querySelector('#progress')
  const statusMessage = document.querySelector('#status')

  let countdownInterval = null
  let totalSeconds = 0
  let remainingSeconds = 0
  let isRunning = false

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  function updateDisplay() {
    timeDisplay.textContent = formatTime(remainingSeconds)
    const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0
    progressBar.style.width = `${progressPercent}%`
  }

  function updateButtonStates() {
    startBtn.disabled = isRunning
    stopBtn.disabled = !isRunning
    resetBtn.disabled = !isRunning && remainingSeconds === totalSeconds
    durationInput.disabled = isRunning
  }

  function startCountdown() {
    if (!isRunning) {
      const minutes = parseInt(durationInput.value) || 5
      totalSeconds = minutes * 60
      remainingSeconds = totalSeconds
      isRunning = true
      statusMessage.textContent = 'Countdown started!'
      statusMessage.className = 'status-message info'
      
      updateDisplay()
      updateButtonStates()

      countdownInterval = setInterval(() => {
        remainingSeconds--
        updateDisplay()

        if (remainingSeconds <= 0) {
          stopCountdown()
          statusMessage.textContent = 'Time\'s up! 🎉'
          statusMessage.className = 'status-message success'
          
          // Play notification sound (if browser supports it)
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Countdown Complete!', {
              body: 'Your countdown timer has finished.',
              icon: '/vite.svg'
            })
          }
        } else if (remainingSeconds <= 10) {
          timeDisplay.style.color = '#ff4444'
          timeDisplay.style.animation = 'pulse 1s infinite'
        }
      }, 1000)
    }
  }

  function stopCountdown() {
    if (isRunning) {
      clearInterval(countdownInterval)
      isRunning = false
      statusMessage.textContent = 'Countdown stopped.'
      statusMessage.className = 'status-message warning'
      timeDisplay.style.color = ''
      timeDisplay.style.animation = ''
      updateButtonStates()
    }
  }

  function resetCountdown() {
    stopCountdown()
    const minutes = parseInt(durationInput.value) || 5
    totalSeconds = minutes * 60
    remainingSeconds = totalSeconds
    statusMessage.textContent = 'Countdown reset.'
    statusMessage.className = 'status-message info'
    updateDisplay()
    updateButtonStates()
  }

  // Request notification permission on load
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }

  // Event listeners
  startBtn.addEventListener('click', startCountdown)
  stopBtn.addEventListener('click', stopCountdown)
  resetBtn.addEventListener('click', resetCountdown)

  durationInput.addEventListener('input', () => {
    if (!isRunning) {
      const minutes = parseInt(durationInput.value) || 5
      totalSeconds = minutes * 60
      remainingSeconds = totalSeconds
      updateDisplay()
    }
  })

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('input')) {
      e.preventDefault()
      if (isRunning) {
        stopCountdown()
      } else {
        startCountdown()
      }
    } else if (e.code === 'Escape') {
      resetCountdown()
    }
  })

  // Initialize display
  const minutes = parseInt(durationInput.value) || 5
  totalSeconds = minutes * 60
  remainingSeconds = totalSeconds
  updateDisplay()
  updateButtonStates()
}