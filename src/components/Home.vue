// Home.vue
<template>
  <section class="home-view">
    <div :style="image" class="image"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      image: { backgroundImage: "url('src/assets/landingPagePic.jpg')" }
    };
  }
};
</script>

<style scoped>
.home-view {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;

}
</style>
