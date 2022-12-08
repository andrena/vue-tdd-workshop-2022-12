import { createRouter, createWebHistory } from "vue-router";
import CustomerPage from "./pages/customers/CustomerPage.vue";

export const router = createRouter({
  routes: [
    // Don't use lazy-loaded routes here, because vue-router provides no easy/robust way of showing a loading indicator
    // and at the same time has weird issue, where the header is momentarily duplicated (despite the header not even being inside a route).
    { path: "/", component: CustomerPage },
  ],
  history: createWebHistory(),
});
