<template>
  <div class="sort-and-search">
    <div class="controls">
      <button
        class="toggle-btn toggle-btn--sort"
        v-show="!showSort && !showSearch"
        :class="{ active: showSort && !showSearch }"
        @click="toggleSort"
      ></button>
      <button
        class="toggle-btn toggle-btn--search"
        v-show="!showSearch && !showSort"
        :class="{ active: showSearch && !showSort }"
        @click="toggleSearch"
      ></button>
      <button
        class="toggle-btn toggle-btn--close"
        v-show="showSort || showSearch"
        @click.prevent="setDefaults"
      ></button>
    </div>
    <transition-group class="expand" name="fadeHeight" key="div" tag="div">
      <div
        class="d-flex align-items-start search-panel"
        key="search"
        v-if="showSearch"
      >
        <search></search>
      </div>
      <div
        class="d-flex align-items-start sort-panel"
        key="sorting"
        v-if="showSort"
      >
        <sorting></sorting>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Sorting from "@/components/Sorting";
import Search from "@/components/Search";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Sorting,
    Search
  },
  data: () => ({
    sort: false,
    search: false,
    showSort: false,
    showSearch: false,
    selectsVisible: false
  }),
  methods: {
    toggleSort() {
      this.showSort = true;
      this.showSearch = false;
      if (this.mode == "mobile") this.$store.dispatch("APP_PADDING", "114px");
    },
    toggleSearch() {
      this.showSearch = true;
      this.showSort = false;
    },
    setDefaults() {
      this.showSort = false;
      this.showSearch = false;
      if (this.mode == "mobile") this.$store.dispatch("APP_PADDING", "64px");
    },
    onResize() {
      const TABLETS = 992;
      if (window.innerWidth <= TABLETS && !this.selectsVisible) {
        this.setDefaults();
        this.mode = "mobile";
      } else {
        this.mode = "desktop";
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style lang="scss" scoped>
.sort-and-search {
  display: flex;
  flex-direction: row-reverse;
}

.sort-btn,
.close-sort-btn {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
}

.close-sort-btn {
  align-self: flex-end;
  justify-content: center;
  align-items: center;
}

.sort-btn {
  margin-right: 10px;
  background-image: url(../assets/sort.svg);
}

.sort-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  position: fixed;
  pointer-events: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    content: "";
    position: absolute;
    transition: inherit;
    transition-delay: 150ms;
    background-color: #212121;
  }

  &--active {
    pointer-events: auto;
    touch-action: none;

    &:before {
      opacity: 0.46;
    }
  }
}

.sort-panel {
  top: 2px;
  left: 10px;
  right: 64px;
  position: absolute;
  background-color: #fff;

  @media (min-width: 992px) {
    background-color: transparent;
  }
}

.search-panel {
  top: 2px;
  left: 10px;
  right: 64px;
  position: absolute;
  background: #fff;

  @media (min-width: 992px) {
    left: auto;
    width: 100%;
    max-width: 44%;
  }
}

.toggle-btn {
  border: 0;
  min-width: 40px;
  min-height: 40px;
  margin-left: 10px;
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c4c4c4;
    cursor: pointer;
  }

  &.active:not(.toggle-btn--close) {
    background-color: lightgray;
  }

  &:focus {
    outline: none;
  }

  &--sort {
    background-image: url(../assets/sort.svg);
  }

  &--search {
    background-image: url(../assets/search.svg);
    background-size: 16px;
  }

  &--close {
    background-image: url(../assets/cancel.svg);
    background-size: 20px;
    background-color: lightgray;
  }
}

.expand {
  .sort-selects {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 992px) {
    .sort-selects {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .dropdown {
        margin-left: 10px;
      }
    }
  }
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: opacity 0.5s;
}

.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
}
</style>
