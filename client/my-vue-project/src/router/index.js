import { createWebHistory, createRouter } from "vue-router";
import Form from "../views/Form.vue";
import Results from "../views/Results.vue";
import Modal from "../views/Modal.vue";

const routes = [
  {
    path: "/",
    name: "Form",
    component: Form,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
    props:true
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
    props:true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;