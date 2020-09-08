<template>
  <div class="search" :class="{ 'search--active': expand }">
    <input
      v-model="inputText"
      @input="search"
      @keyup.enter.prevent.stop="submit"
      @keyup.up.prevent.stop="selectUp"
      @keyup.down.prevent.stop="selectDown"
      ref="customSearch"
      placeholder="Enter film name"
      :focus="true"
    />
    <transition name="fade">
      <ul class="list" ref="search-list">
        <li
          v-for="option in options"
          v-bind:key="option.id"
          @click="submit"
          :class="['item', { selected: selected == index ? 'selected' : '' }]"
        >
          {{ option.title }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import HTTP from "@/http";

export default {
  data: () => ({
    selected: 0,
    inputText: "",
    options: [],
    result: [],
    expand: null
  }),
  methods: {
    defaults() {
      this.selected = 0;
      this.options = [];
      this.result = [];
      this.inputText = "";
    },
    submit() {
      this.$router.push({
        name: "movie",
        path: "/movie/",
        params: {
          id: this.options[this.selected].id
        }
      });
      this.defaults();
    },

    async search() {
      try {
        const { data } = await HTTP.get("/search/movie", {
          params: {
            query: escape(this.inputText)
          }
        });
        this.options = data.results;
      } catch (e) {
        return e;
      }
    },

    selectUp() {
      if (this.selected === 0) return;
      else this.selected -= 1;
      this.showSelected();
    },

    selectDown() {
      if (this.selected === this.optionsLength - 1) return;
      this.selected += 1;
      this.showSelected();
    },

    showSelected() {
      this.inputText = this.options[this.selected].title;
    },

    toggleSearch() {
      this.expand = !this.expand;
      this.expand
        ? this.$refs.customSearch.focus()
        : this.$refs.customSearch.blur();
      this.options = [];
    }
  },
  computed: {
    optionsLength() {
      return this.options.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-btn {
  top: 0;
  width: 40px;
  height: 40px;
  outline: none;
  margin-left: 0px;
  display: inline-block;
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/cancel.svg");
  cursor: pointer;

  &--active {
    background-image: url("../assets/search.svg");
    background-size: 50%;
  }
}

.search {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: flex-end;

  .list {
    max-height: 500px;
    overflow-y: auto;
  }

  input {
    display: block;
    box-sizing: border-box;
    backface-visibility: hidden;
    transition: 0.3s ease-in-out all;
    transform-origin: right;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:focus {
      border-color: rgba(0, 0, 0, 0.5);
    }
  }
}

.list {
  padding: 0;
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.117647);
}

.item {
  list-style: none;
  padding: 0 16px;
  overflow: hidden;
  text-align: left;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.selected {
  background-color: lightgray;
}

input {
  display: block;
  line-height: 40px;
  width: 100%;
  padding: 0 1em;
  height: 40px;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
