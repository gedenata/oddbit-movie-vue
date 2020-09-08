<template>
  <header>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <logo to="/"></logo>
        <sort-and-search v-show="home"></sort-and-search>
        <button class="back-btn" v-show="!home" @click="back"></button>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "./Logo";
import SortAndSearch from "./SortAndSearch";

export default {
  components: {
    Logo,
    SortAndSearch
  },
  computed: {
    home() {
      return this.$route.name == "home";
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px 0;
  background: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
}

.back-btn {
  width: 40px;
  height: 40px;
  border: none;
  display: inline-block;
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgb(221, 221, 221);
  background-image: url(../assets/undo.svg);

  &:hover {
    cursor: pointer;
    background-color: darken(rgb(221, 221, 221), 10%);
  }

  &:focus {
    outline: none;
    background-color: rgba(221, 221, 221, 0.4);
  }
}
</style>
