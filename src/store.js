import Vue from "vue";
import Vuex from "vuex";

import HTTP from "./http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data_settings: null,
    base_url: null,
    poster_size: null,
    thumb_size: null,
    logo_size: null,
    main_spinner: true,
    loading_spinner: false,
    popular: [],
    enableLoading: true,
    pageNumber: 1,
    details: {},
    similar: null,
    films: null,
    showError: false,
    sort_options: { sort_by: "popularity.desc" },
    page: 1,
    toggleSort: false,
    appPadding: "64px"
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
    popularNotEmpty: state => state.popular.length > 0,
    similar: state => state.similar,
    toggleSort: state => state.toggleSort,
    appPadding: state => state.appPadding
  },
  mutations: {
    SET_IMG_SETTINGS(state, payload) {
      const {
        base_url,
        poster_sizes,
        backdrop_sizes,
        logo_sizes
      } = payload.images;
      state.base_url = base_url;
      state.poster_size = backdrop_sizes[3];
      state.thumb_size = poster_sizes[3];
      state.logo_size = logo_sizes[1];
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
    GOT_CONFIGURATION(state, payload) {
      state.payload = payload;
    },
    GOT_FILMS(state, payload) {
      const { key, data } = payload;
      state[key] = data.results;
    },
    GOT_DETAILS(state, payload) {
      state.details = payload;
    },
    GOT_SIMILAR(state, payload) {
      state.similar = payload;
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
    CLEAR_FILMS(state, payload) {
      state[payload] = [];
      state.page = 1;
    },
    SHOW_ERROR_SCREEN(state) {
      state.showError = true;
    },
    REPLACE(state, payload) {
      state[payload.key] = payload.data;
    },
    DROP(state, payload) {
      state[payload] = null;
    }
  },
  actions: {
    IMG_SETTINGS({ commit }, payload) {
      commit("SET_IMG_SETTINGS", payload);
    },
    TOGGLE_SORT({ commit }) {
      commit("TOGGLE_SORT");
    },
    TOGGLE({ commit }, payload) {
      commit("TOGGLE", payload);
    },
    GET_GENRES_OPTIONS({ commit }, payload) {
      commit("SET_GENRES_OPTIONS", payload);
    },
    GET_CONFIGURATION({ commit, dispatch }) {
      const urls = ["/configuration", "/genre/movie/list"];
      const requests = urls.map(url =>
        HTTP.get(url).then(
          response => response.data,
          error => error
        )
      );
      Promise.all([...requests])
        .then(data => data.map(data => data))
        .then(data => {
          const [images, genres] = [...data];
          commit("SET_IMG_SETTINGS", images);
          dispatch("GET_GENRES_OPTIONS", genres);
        });
    },
    QUERY_PARAMS({ commit }, payload) {
      commit("SET_QUERY_PARAMS", { ...payload });
    },
    CLEAR_FILMS({ commit }, payload) {
      commit("CLEAR_FILMS", payload);
    },
    async GET_FILMS({ dispatch, commit, getters }, payload) {
      const { url, key, params, clear } = payload;
      const query_params = { page: clear ? 1 : getters.page, ...params };
      if (clear) dispatch("CLEAR_FILMS", key);

      try {
        const { data } = await HTTP.get(url, { params: query_params });
        commit("SET_FILMS", { key, data });
      } catch (e) {
        dispatch("SHOW_ERROR");
      }

      if (!getters.main_spinner) return;
      dispatch("TOGGLE", { main_spinner: false });
    },
    GET_DETAILS({ commit }, id) {
      HTTP.get(`movie/${id}`).then(
        response => {
          commit("GOT_DETAILS", response.data);
        },
        error => error
      );
    },

    async GET_SIMILAR({ dispatch, commit }, id) {
      const url = `movie/${id}/similar`;
      const { data } = await HTTP.get(url);
      commit("GOT_SIMILAR", data.results);
      dispatch("TOGGLE", { main_spinner: false });
    },
    SHOW_ERROR({ commit }) {
      commit("SHOW_ERROR_SCREEN");
    },
    REPLACE({ commit }, payload) {
      commit("REPLACE", payload);
    },
    APP_PADDING({ commit }, payload) {
      commit("SET_APP_PADDING", payload);
    },
    BACK({ commit }) {
      commit("DROP", "details");
    }
  }
});
