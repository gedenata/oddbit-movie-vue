<template>
  <section>
    <ul class="popular row m-0">
      <li
        class="col-6 col-sm-6 col-md-4 col-lg-3"
        v-for="item in popularItems"
        v-bind:key="item.id"
      >
        <popular :item="item" :key="item.id"></popular>
      </li>
    </ul>
    <spinner :is-loading="popularLength" :is-relative="true"></spinner>
  </section>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import Popular from "@/components/Popular";
import Spinner from "@/components/Spinner";

export default {
  name: "home",
  components: {
    Popular,
    Spinner
  },
  data: () => ({
    enableLoading: true
  }),
  computed: {
    ...mapGetters(["popular", "page", "sort_options"]),
    popularItems() {
      return this.popular.filter(
        item => item.backdrop_path !== null || item.backdrop_path !== undefined
      );
    },
    popularLength() {
      return this.popular.length > 1;
    }
  },
  methods: {
    scroll() {
      const self = this;
      window.addEventListener("scroll", () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && this.enableLoading) {
          this.nextPage(self);
        }
      });
    },
    getFilms() {
      this.$store.dispatch("GET_FILMS", {
        url: "/discover/movie",
        key: "popular",
        params: {
          ...this.sort_options
        }
      });
    },
    nextPage: _.debounce(self => {
      self.getFilms();
    }, 600)
  },
  created() {
    this.getFilms();
  },
  mounted() {
    this.scroll();
  }
};
</script>

<style lang="scss" scoped>
.popular {
  position: relative;
  padding: 0;
  padding-bottom: 100px;
  min-height: 666px;

  .item {
    height: 100%;
  }
}

.pupular > li {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}

.release-date {
  top: 10px;
  left: 10px;
  padding: 2px;
  color: #ffffff;
  position: absolute;
  transform: rotate(-45deg);
  transform-origin: center bottom;
  display: inline-block;
  background-color: #696969;
  border: 1px solid #ffffff;
}
</style>
