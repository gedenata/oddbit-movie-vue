<template>
  <router-link class="logo" :to="to" @click.native="logoClick">
    <img class="logo__img" src="../assets/logo.svg" />
    <span class="logo__text">Only movies</span>
  </router-link>
</template>

<script>
export default {
  name: "logo",
  props: ["to"],
  methods: {
    logoClick() {
      this.$store.dispatch("GET_FILMS", {
        url: "/discover/movie",
        key: "popular",
        clear: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  z-index: 0;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  position: relative;

  @media (min-width: 992px) {
    z-index: 1;
  }

  &__img {
    top: 4px;
    left: 0;
    display: block;
    height: 2.4em;
    position: absolute;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
  }

  &__text {
    font-size: 2em;
    color: #000;
    font-weight: 500;
    white-space: nowrap;

    &:after {
      left: 0;
      bottom: -4px;
      width: 0.8em;
      content: "O";
      display: block;
      position: absolute;
      font-size: 1.6em;
      line-height: 1.2;
      text-align: center;
      transform: scale(0);
      transition: all 0.3s ease-in-out;
      color: #636e72;
    }

    &:first-letter {
      opacity: 0;
      display: block;
      margin-right: 0.4em;
      letter-spacing: 0.15em;
    }
  }

  &:hover {
    color: #000;
    text-decoration: none;

    .logo__img {
      transform: scale(0);
    }

    .logo__text {
      &:after {
        transform: scale(1);
      }
    }
  }
}
</style>
