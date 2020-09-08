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

import Popular from "@/components/Popular";
import SimilarSort from "@/components/SimilarSort";

export default {
  name: "similar",
  props: ["id"],
  components: {
    Carousel,
    Slide,
    Popular,
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
    margin-top: 1em;
  }
}

.movie-similar-header {
  display: flex;
  align-items: center;
  padding: 30px 10px 20px;
  flex-direction: column;

  @media (min-width: 992px) {
    padding: 20px 10px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
}

.h2 {
  font-size: 1.8em;
  font-weight: 600;
}

.VueCarousel {
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
}

.VueCarousel-wrapper {
  margin: 0 -4px;
  width: auto;
}

.VueCarousel-navigation-prev,
.VueCarousel-navigation-next {
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  background-color: #000 !important;
}

.VueCarousel-navigation-prev {
  left: 50px !important;
  background-image: url(../assets/circle-left.svg);
}

.VueCarousel-navigation-next {
  right: 50px !important;
  background-image: url(../assets/circle-right.svg);
}

.h2 {
  padding: 0 0 0 10px;
  margin: 0;
}
</style>
