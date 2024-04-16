<template>
  <Header />
  <div class="container">
    <Country :countries="countries" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Country from "./components/Country.vue";
// import CountryDetail from "./components/CountryDetail.vue";

import { ref, onMounted } from 'vue';
import axios from "axios";


const countries = ref([]);

onMounted(() => {
  axios.get("https://restcountries.com/v3.1/all").then((response) => {
    countries.value = response.data
  }).catch((err) => {
    console.log(err);
  })

})
</script>