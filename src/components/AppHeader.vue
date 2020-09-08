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
import Logo from "@/components/Logo";
import SortAndSearch from "@/components/SortAndSearch";

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
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 10px 0;
  position: fixed;
  background: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
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
    background-color: darken(rgb(221, 221, 221), 10%);
    cursor: pointer;
  }

  &:focus {
    outline: none;
    background-color: rgba(221, 221, 221, 0.4);
  }
}
</style>
