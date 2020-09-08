import Vue from "vue";
import Vuex from "vuex";
import Http from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data_settings: null,
    base_url: null,
    poster_size: null,
    thumb_size: null,
    logo_size: null,
    similar: null,
    films: null,
    main_spinner: true,
    enableLoading: true,
    loading_spinner: false,
    showError: false,
    toggleSort: false,
    page: 1,
    pageNumber: 1,
    popular: [],
    details: {},
    sort_options: { sort_by: "popularity.desc" },
    appPadding: "64px"
  },
  mutations: {
    SET_IMG_SETTINGS(state, payload) {
      const {
        base_url,
        poster_size,
        backdrop_size,
        logo_size
      } = payload.images;
      state.base_url = base_url;
      state.poster_size = backdrop_size[3];
      state.thumb_size = poster_size[3];
      state.logo_size = logo_size[1];
    },
    SET_GENRES_OPTIONS(state, payload) {
      state.genres_options = payload;
    },
    SET_QUERY_PARAMS(state, payload) {
      state.sort_options = payload;
    },
    SET_FILMS(state, payload) {
      const { key, data } = payload;
      state[key] = [...state[key], ...data.results];
      state.page += 1;
    },
    SET_APP_PADDING(state, payload) {
      state.appPadding = payload;
    },
    GET_CONFIGURATION(state, payload) {
      state.payload = payload;
    },
    GET_DETAILS(state, payload) {
      state.details = payload;
    },
    GET_SIMILAR(state, payload) {
      state.similar = payload;
    },
    CLEAR_FILMS(state, payload) {
      state[payload] = [];
      state.page = 1;
    },
    DROP(state, payload) {
      state[payload] = null;
    },
    REPLACE(state, payload) {
      state[payload.key] = payload.data;
    },
    TOGGLE(state, payload) {
      Object.keys(payload).map(key => (state[key] = payload[key]));
    },
    TOGGLE_SORT(state) {
      state.toggleSort = !state.toggleSort;
    },
    LOADING_LOCKED(state, payload) {
      state.enableLoading = payload;
    },
    SHOW_ERROR_SCREEN(state) {
      state.showError = true;
    }
  },
  getters: {
    base_url: state => state.base_url,
    popular: state => state.popular,
    enableLoading: state => state.enableLoading,
    pageNumber: state => state.pageNumber,
    films: state => state.films,
    showError: state => state.showError,
    main_spinner: state => state.main_spinner,
    page: state => state.page,
    sort_options: state => state.sort_options,
    popular_not_empty: state => state.popular.length > 0,
    similar: state => state.similar,
    toggleSort: state => state.toggleSort,
    appPadding: state => state.appPadding
  },
  actions: {
    GET_GENRES_OPTIONS({ commit }, payload) {
      commit("SET_GENRES_OPTIONS", payload);
    },
    GET_CONFIGURATION({ commit, dispatch }) {
      const urls = [""];
      const reqs = urls.map(url =>
        Http.get(url).then(
          res => res.data,
          err => err
        )
      );
      Promise.all([...reqs])
        .then(data => data.map(data => data))
        .then(data => {
          const [images, genres] = [...data];
          commit("SET_IMG_SETTINGS", images);
          dispatch("GET_GENRES_OPTIONS", genres);
        });
    },
    GET_DETAILS({ commit }, id) {
      Http.get(`movie/${id}`).then(
        res => {
          commit("GET_DETAILS", res.data);
        },
        err => err
      );
    },
    async GET_SIMILAR({ commit, dispatch }, id) {
      const url = `movie/${id}/similar`;
      const { data } = await Http.get(url);
      commit("GET_SIMILAR", data.results);
      dispatch("TOGGLE", { main_spinner: false });
    },
    async GET_FILMS({ dispatch, commit, getters }, payload) {
      const { url, key, params, clear } = payload;
      const query_params = { page: clear ? 1 : getters.page, ...params };
      if (clear) dispatch("CLEAR_FILMS", key);
      try {
        const { data } = await Http.get(url, { params: query_params });
        commit("SET_FILMS", { key, data });
      } catch (e) {
        dispatch("SHOW_ERROR");
      }
      if (!getters.main_spinner) return;
      dispatch("TOGGLE", { main_spinner: false });
    },
    IMG_SETTINGS({ commit }, payload) {
      commit("SET_IMG_SETTINGS", payload);
    },
    TOGGLE_SORT({ commit }) {
      commit("TOGGLE_SORT");
    },
    TOGGLE({ commit }, payload) {
      commit("TOGGLE", payload);
    },
    REPLACE({ commit }, payload) {
      commit("REPLACE", payload);
    },
    BACK({ commit }) {
      commit("DROP", "details");
    },
    QUERY_PARAMS({ commit }, payload) {
      commit("SET_QUERY_PARAMS", { ...payload });
    },
    CLEAR_FILMS({ commit }, payload) {
      commit("CLEAR_FILMS", payload);
    },
    SHOW_ERROR({ commit }) {
      commit("SHOW_ERROR_SCREEN");
    },
    APP_PADDING({ commit }, payload) {
      commit("SET_APP_PADDING", payload);
    }
  }
});
