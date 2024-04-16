import { Vue } from "vue";
import VueRouter from "vue-router";
import Country from "./components/Country.vue";
import CountryDetail from "./components/CountryDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "country",
    component: Country,
  },
  {
    path: "/country-detail",
    name: "countryDetail",
    component: CountryDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes,
});

export default router;
