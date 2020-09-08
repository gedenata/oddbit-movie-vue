<template>
  <div class="movie-similar" v-if="similar && similar.length > 0">
    <div class="movie-similar-header">
      <div class="h2">Similar movies</div>
      <similar-sort></similar-sort>
    </div>
    <carousel
      :per-page="4"
      :mouse-drag="false"
      :navigationEnabled="true"
      :paginationEnabled="false"
      :perPageCustom="[
        [321, 2],
        [768, 3],
        [1024, 4]
      ]"
      navigationNextLabel=""
      navigationPrevLabel=""
    >
      <slide v-for="item in similar" :key="item.id">
        <router-link
          class="popular-item__title"
          :to="{ name: 'movie', path: '/movie/', params: { id: item.id } }"
        >
          <popular :item="item" :key="item.id"></popular>
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";

import Popular from "./Popular";
import SimilarSort from "./SimilarSort";

export default {
  name: "similar",
  props: ["id"],
  components: {
    Slide,
    Popular,
    Carousel,
    SimilarSort
  },
  computed: {
    ...mapGetters(["similar"])
  },
  created() {
    this.$store.dispatch("GET_SIMILAR", this.id);
  }
};
</script>

<style lang="scss" scoped>
.movie-similar {
  .v-select {
    min-width: 280px;
    margin-top: 16px;
  }
}

.movie-similar-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 10px 20px;

  @media (min-width: 992px) {
    align-items: center;
    flex-direction: row;
    padding: 20px 10px;
    justify-content: space-between;
  }
}

.h2 {
  margin: 0;
  padding: 0 0 0 10px;
  font-size: 1.8em;
  font-weight: 600;
}

.VueCarousel {
  display: flex;
  overflow: hidden;
  flex-direction: column-reverse;
}

.VueCarousel-wrapper {
  width: auto;
  margin: 0 -4px;
}

.VueCarousel-navigation-prev,
.VueCarousel-navigation-next {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #000 !important;
}

.VueCarousel-navigation-prev {
  left: 50px !important;
  background-image: url(./../assets/circle-left.svg);
}

.VueCarousel-navigation-next {
  right: 50px !important;
  background-image: url(./../assets/circle-right.svg);
}
</style>
