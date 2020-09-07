<template>
  <div class="item">
    <router-link
      class="popular-item__title"
      :to="{ name: 'movie', path: '/movie', params: { id: item.id } }"
    >
      <poster :src="item.poster_path" size="sm" data-image-type="thumbnail">
        <div class="title" slot="title">{{ item.title }}</div>
      </poster>
    </router-link>
    <div class="vote">
      <span>{{ item.vote_average }}</span>
    </div>
    <div class="release-date">{{ item.release_date | formatDate }}</div>
  </div>
</template>

<script>
import filters from "./../filters";
import Poster from "@/components/Poster";

export default {
  name: "popular",
  props: ["item"],
  components: {
    Poster
  },
  filters
};
</script>

<style lang="scss" scoped>
.item {
  z-index: 0;
  margin: 0 8px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.117647);
}

.vote {
  height: 64px;
  width: 64px;
  top: 0.2em;
  right: 0.2em;
  color: #ffffff;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(./../assets/star.svg);
}

.vote > span {
  color: #ffffff;
  font-weight: 500;
  padding-top: 0.6em;
}

.popular-item__title {
  display: block;
  overflow: hidden;
  .poster {
    transition: transform 0.3s;
    transform: scale(1);
  }
}

.popular-item__title:hover {
  .poster {
    transform: scale(1.04);
  }
}
</style>
