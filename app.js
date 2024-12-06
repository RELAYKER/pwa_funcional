let timerInterval;
let totalSeconds = 0; // Tiempo total en segundos
let isRunning = false;

// Elementos del DOM
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

// Actualiza el temporizador en la pantalla
function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Iniciar el temporizador
startButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            totalSeconds++;
            updateDisplay();
        }, 1000);
    }
});

// Pausar el temporizador
pauseButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

// Restablecer el temporizador
resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isRunning = false;
    updateDisplay();
});

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
        });
}
