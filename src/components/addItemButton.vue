<template>
  <div>
    <button @click="openPopup">Öffne Pop-up</button>
    <div v-if="popupVisible" class="popup">
      <p>Dies ist das Pop-up-Inhalt.</p>
      <button @click="closePopup">Schließe Pop-up</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: false,
    };
  },
  methods: {
    openPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
