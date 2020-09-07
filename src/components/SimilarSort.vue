<template>
  <div class="similar-sorting">
    <v-select
      v-model="selected"
      :options="options"
      placeholder="Sort in Similar"
    ></v-select>
  </div>
</template>

<script>
import _ from "lodash";
import vSelect from "vue-select";
import { mapGetters } from "vuex";

export default {
  components: {
    vSelect
  },
  data: () => ({
    selected: null,
    options: [
      {
        label: "Title",
        value: "title"
      },
      {
        label: "Popularity",
        value: "popularity"
      },
      {
        label: "Vote count",
        value: "vote_count"
      },
      {
        label: "Vote average",
        value: "vote_average"
      }
    ]
  }),
  watch: {
    selected() {
      this.$store.dispatch("REPLACE", { key: "similar", data: this.sorted() });
    }
  },
  computed: {
    ...mapGetters(["similar"])
  },
  methods: {
    sorted() {
      return _.orderBy(this.similar, this.selected.value, "asc");
    }
  }
};
</script>

<style lang="scss" scoped>
.similar-sorting {
  flex: 2;
  display: flex;
  justify-content: flex-end;
}
</style>
