import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    posts: [],
    singlePost: [],
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setSinglePost(state, payload) {
      state.singlePost = payload;
    },
  },
  actions: {
    async getPosts({ commit }) {
      const response = await axios.get("http://localhost:5000/api/blog/");
      console.log("response of posts from API", response.data);
      commit("setPosts", response.data);
    },
    async getPostById({ commit }, id) {
      console.log("id++++++++", id);
      const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
      console.log("response of post by id from API", response.data);
      commit("setSinglePost", response.data);
    },
  },
});
