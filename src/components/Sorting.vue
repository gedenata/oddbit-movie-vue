<template>
  <div class="sort-selected">
    <v-select
      class="sort-select--top"
      v-model="selected_year"
      :options="years"
      @input="getFilms"
      placeholder="Primary release data"
    ></v-select>
    <v-select
      v-model="selected_sort_variant"
      :options="includesAsc"
      @input="getFilms"
      placeholder="More options"
    ></v-select>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { mapGetters } from "vuex";

const SORT_VARIANTS = [
  { label: "Popularity ASC", value: "popularity.asc" },
  { label: "Popularity DESC", value: "popularity.desc" },
  { label: "Release date ASC", value: "release_date.asc" },
  { label: "Release date DESC", value: "release_date.desc" },
  { label: "Revenue ASC", value: "revenue.asc" },
  { label: "Revenue DESC", value: "revenue.desc" },
  { label: "Primary release date ASC", value: "primary_release_date.asc" },
  { label: "Primary release date DESC", value: "primary_release_date.desc" },
  { label: "Original title ASC", value: "original_title.asc" },
  { label: "Original title DESC", value: "original_title.desc" },
  { label: "Vote average ASC", value: "vote_average.asc" },
  { label: "Vote average DESC", value: "vote_average.desc" },
  { label: "Vote count ASC", value: "vote_count.asc" },
  { label: "vote count DESC", value: "vote_count.desc" }
];

export default {
  name: "sorting",
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  },
  components: {
    vSelect
  },
  data: () => ({
    selected_year: null,
    selected_sort_variant: null,
    sorting_options: SORT_VARIANTS
  }),
  computed: {
    ...mapGetters(["sort_options", "toggleSort"]),
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      ).reverse();
    },
    includesAsc() {
      return this.sorting_options.filter(option =>
        option.value.includes(".asc")
      );
    }
  },
  methods: {
    getFilms() {
      const params = {
        primary_release_year: this.selected_year,
        sort_by:
          this.selected_sort_variant !== null
            ? this.selected_sort_variant.value
            : ""
      };
      this.$store.dispatch("QUERY_PARAMS", params);
      this.$store.dispatch("GET_FILMS", {
        url: "/discover/movie",
        key: "popular",
        clear: true,
        params
      });
    },
    closeSort() {
      this.$store.dispatch("TOGGLE_SORT");
      this.selected_year = null;
      this.selected_sort_variant = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-selects {
  width: 100%;
}

.sort-select--top {
  margin-bottom: 10px;
}

.v-select {
  height: 40px;
  min-width: 25%;
  border-bottom: 1px solid rgba(60, 60, 60, 0.26);

  @media (min-width: 992px) {
    width: 100%;
    max-width: 25%;
  }

  .vs__selected-options {
    padding: 0 2px;
  }

  .dropdown-menu {
    border-radius: 0;
    padding-top: 0;
    padding-bottom: 0;
    li:hover a {
      background-color: #dddddd;
    }
  }
}

.v-select li > a {
  color: #333;
  margin: 0;
  clear: both;
  display: block;
  padding: 0 20px;
  font-size: 14px;
  text-align: left;
  line-height: 40px;
  white-space: nowrap;
}

.v-select li {
  line-height: 40px;
}

.v-select .selected-tag {
  margin: 0;
  color: #000;
  font-size: 14px;
  padding-left: 13px;
  border-radius: 0;
  background: none;
  border: 1px solid #ccc;
  transition: opacity 0.25s;
}

.v-select li:hover {
  cursor: pointer;
}

.v-select .dropdown-menu > .highlight > a {
  background: none;
}

.v-select .dropdown-menu .highlight a {
  color: #000000;
  background: #dddddd;
}

.v-select .dropdown-menu .active a {
  color: #000;
  background: #dddddd;
  display: block;
  overflow: hidden;
  margin: 0;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.v-select .dropdown-toggle {
  width: 100%;
  padding: 0 0 5px;
  height: 40px;
  border-radius: 0;
  line-height: 40px;
}

.dropdown-melu li {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dropdown-menu > li > a:hover {
  background: #dddddd;
  color: #000 !important;
}

.sort-list {
  background-color: rgba(255, 255, 255, 1);
}

.select {
  padding: 20px;
}

.sorting {
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  min-height: 0px;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  padding: 0 20px 20px;
  background-color: #fff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);

  div {
    flex-direction: column;
  }

  .dropdown {
    width: 100%;
    margin-top: 20px;
  }
}

ul {
  top: 0;
  left: 0;
  right: 0;
  padding: 0 0 2em;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 -3px 0px #fff;
}

li {
  list-style: none;
  text-align: center;

  > a {
    padding: 1em;
    display: inline-block;
    transition: all 0.3s ease;
    background-color: #fff;
    color: #000;
    text-decoration: none;
    transform: scale(1);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.active,
    &:active {
      transform: scale(0.9);
    }

    &:hover {
      cursor: pointer;
    }
  }
}

.btn {
  color: #636e72;
  background: #fff;
  background-color: #fff;
  border-color: #dfe6e9;
  border: 2px solid transparent;
  transition: all 0.3s;

  &.active,
  &.active:hover {
    font-weight: 600;
    background-color: #dfe6e9;
  }
}

.btn:focus {
  outline: none;
  box-shadow: none;
  outline-color: transparent;

  &:before {
    background: transparent;
  }
}
</style>
