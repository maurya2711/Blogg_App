<template>
  <div id="card">
    <div class="card">
      <NavBar />
    </div>
    <div class="card mt-5">
      <ul>
        <li class="card mt-2" v-if="posts.length == 0">No Post Found</li>
        <li
          class="card mt-2 mr-3 d-flex"
          v-for="(items, index) in posts"
          :key="index"
          @click="showPosts(items._id)"
        >
          <div class="card-body border border-primary">
            <img :src="items.image" class="card-img-top" alt="error" />
            <h5 class="card-title">{{ items.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ items.category }}
            </h6>
            <p class="card-text">
              {{ items.content }}
            </p>
            <h6>{{ items.created }}</h6>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script>
import NavBar from "../components/Navbar.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["posts"]),
  },
  data() {
    return {
      message: "Welcome to Your Vue.js App",
    };
  },
  components: {
    NavBar,
  },
  mounted() {
    console.log("HIIIIIIII Home componenet mounted");
    this.$store.dispatch("getPosts");
  },
  methods: {
    async showPosts(id) {
      console.log("show post list clicked");
      await this.$store.dispatch("getPostById", id);
    },
  },
};
</script>

<style></style>
