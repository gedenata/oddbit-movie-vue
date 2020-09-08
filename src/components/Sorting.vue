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
    sorting_options: SORT_VARIANTS,
    selected_sort_variant: null
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
  min-width: 25%;
  border-bottom: 1px solid rgba(60, 60, 60, 0.26);
  height: 40px;

  @media (min-width: 992px) {
    max-width: 25%;
    width: 100%;
  }

  .vs__selected-options {
    padding: 0 2px;
  }

  .dropdown-menu {
    padding-top: 0;
    padding-bottom: 0;
    border-radius: 0;
    li:hover a {
      background-color: #dddddd;
    }
  }
}

.v-select li > a {
  text-align: left;
  padding: 0 20px;
  line-height: 40px;
  font-size: 14px;
  margin: 0;
}

.v-select .dropdown-menu .highlight a {
  background: #dddddd;
  color: #000;
}

.v-select li {
  line-height: 40px;
}

.v-select li > a {
  display: block;
  padding: 0px 20px;
  clear: both;
  color: #333;
  white-space: nowrap;
  font-size: 15px;
  line-height: 40px;
}

.v-select .selected-tag {
  border: 1px solid #ccc;
  border-radius: 0;
  color: #000;
  margin: 0;
  transition: opacity 0.25s;
  font-size: 14px;
  padding-left: 13px;
  background: none;
}

.v-select li:hover {
  cursor: pointer;
}

.v-select .dropdown-menu > .highlight > a {
  background: none;
}

.dropdown-menu > li > a:hover {
  background: #dddddd;
  color: #000 !important;
}

.v-select .dropdown-menu .active a {
  color: #000;
  background: #dddddd;
  display: block;
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
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
  width: 100%;
  position: fixed;
  min-height: 0px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
  padding: 0 20px 20px;
  background-color: lightgray;
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
  top: 0px;
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
  background-color: #fff;
  transition: all 0.3s;
  border: 2px solid transparent;
  border-color: #dfe6e9;
  background: #fff;
  color: #636e72;

  &.active,
  &.active:hover {
    background-color: #dfe6e9;
    font-weight: 600;
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
