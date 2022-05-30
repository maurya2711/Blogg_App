import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SinglePost from "../views/SinglePost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/post/:id",
    name: "SinglePost",
    component: SinglePost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
