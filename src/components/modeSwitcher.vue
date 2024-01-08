<!-- modeSwitcher.vue -->
<template>
  <label class="dark-mode-switch">
    <input type="checkbox" :checked="darkMode" @change="$emit('toggleDarkMode')" />
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  props: ['darkMode']
}
</script>
<style scoped>
.dark-mode-switch {
  position: fixed;
  top: 20px;
  right: 20px;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.dark-mode-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; /* Set your desired background color for the switch */
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #fff; /* Set your desired color for the switch button */
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50; /* Set your desired background color for the switch when dark mode is on */
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
