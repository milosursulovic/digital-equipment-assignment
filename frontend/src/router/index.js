import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Equipment from "../pages/Equipment.vue";
import Assignments from "../pages/Assignments.vue";
import Persons from "../pages/Persons.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/equipment", component: Equipment },
  { path: "/assignments", component: Assignments },
  { path: "/persons", component: Persons },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.path !== "/login" && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
