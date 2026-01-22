import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MyPlaylistView from "../views/MyPlaylistView.vue";
import MyPlaylistDetail from "../views/MyPlaylistDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/my-playlist",
    name: "MyPlaylist",
    component: MyPlaylistView,
  },
  {
    path: "/my-playlist/:id",
    name: "MyPlaylistDetail",
    component: MyPlaylistDetail,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
