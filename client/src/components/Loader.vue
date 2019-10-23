<template>
  <div class="spinner">
    <div class="spinner-text">Scanning...</div>
    <div class="spinner-sector spinner-sector-pink"></div>
    <div class="spinner-sector spinner-sector-surf"></div>
    <div class="spinner-sector spinner-sector-green"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.spinner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
}

.spinner-sector {
  border-radius: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 15px solid transparent;
  mix-blend-mode: overlay;
}

.spinner-text {
  color: white;
  animation: loading-opacity 3s ease-in-out infinite;
  font-size: 2em;
}

.spinner-sector-pink {
  animation: rotate 2s ease-out infinite;
  border-top: 15px solid rgb(209, 173, 230);
}

.spinner-sector-surf {
  animation: rotate 2.5s ease-in infinite;
  border-top: 15px solid rgb(128, 240, 206);
}

.spinner-sector-green {
  animation: rotate 1.5s ease-in-out infinite;
  border-top: 15px solid rgb(144, 238, 218);
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-opacity {
  0%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.1;
  }
}
</style>
