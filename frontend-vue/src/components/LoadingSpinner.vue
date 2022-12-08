<template>
  <div
    class="LoadingSpinner"
    role="progressbar"
    aria-busy="true"
    aria-label="Loading..."
  />
</template>

<style lang="css" scoped>
.LoadingSpinner {
  --size: 2rem;
  appearance: none;
  display: inline-block;
  width: var(--size);
  height: var(--size);
}

.LoadingSpinner::after {
  content: " ";
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: calc(var(--size) / 8) solid;
  border-color: cadetblue transparent cadetblue transparent;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
