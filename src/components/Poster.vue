<template>
  <div class="poster">
    <slot name="title"></slot>
    <template v-if="src == undefined || src == null">
      <div class="background-image" :data-image-type="dataImageType">
        <div class="no-image">No image</div>
      </div>
    </template>
    <template v-else>
      <div
        class="background-image"
        :data-image-type="dataImageType"
        :style="`background-image: url(${base_url}${img_size}${src})`"
      ></div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    dataImageType: {
      type: String,
      default: "thumbnail"
    },
    src: {
      type: String,
      default: "undefined"
    },
    size: {
      type: String
    },
    fadeOnHover: {
      type: Boolean,
      required: false
    }
  },
  data: () => ({
    showImg: false
  }),
  computed: {
    ...mapGetters(["base_url"]),
    ...mapState(["poster_size", "thumb_size", "logo_size"]),
    img_size() {
      let size = "";
      switch (this.size) {
        case "sm":
          size = this.thumb_size;
          break;
        case "xs":
          size = this.logo_size;
          break;
        default:
          size = this.poster_size;
      }
      return size;
    }
  },
  methods: {
    imgLoaded: function() {
      const img = new Image();
      img.src = this.base_url + this.img_size + this.src;
      this.showImg = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.poster {
  overflow: hidden;
  position: relative;

  .title {
    left: 0;
    bottom: 0;
    right: 0;
    padding: 16px;
    position: absolute;
    color: #ffffff;
    background-color: rgba(45, 52, 54, 0.9);
    border-top: 2px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 5px 5px -5px #000;
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
    font-family: "Helvetica Neue", Helvetica, Sans-serif;
  }

  &:hover {
    cursor: pointer;

    .title {
      z-index: 1;
      transform: translateY(0%);
      transition-delay: 0.1s;
    }

    .poster__img {
      transform: scale(1.05);
    }
  }
}

.no-image {
  top: 50%;
  left: 50%;
  padding: 10px;
  color: #000000;
  position: absolute;
  white-space: nowrap;
  transform: translate(-50%);
}

.background-image {
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  &:before {
    content: "";
    display: block;
  }
}

[data-image-type="thumbnail"] {
  padding-top: (507 / 342) * 100%;
}

[data-image-type="poster"] {
  padding-top: (720 / 1280) * 100%;
}
</style>
