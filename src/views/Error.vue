<template>
  <div class="not-found">
    <h4 class="animated fadeInDown">404 | Page not found</h4>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("TOGGLE", { main_spinner: false });
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 3;
  background-color: #fff;
}

h4 {
  font-size: 50px;
  letter-spacing: 4px;
  font-weight: 300;
  &:first-letter {
    display: inline-block;
    font-size: 60px;
    color: #636e72;
    font-weight: 500;
  }
}
</style>
