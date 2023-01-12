<template>
  <div class="modal-body">
    <ul class="topnav">
      <div class="btn-group">
        <button @click="goToResults">Return to Results</button>
      </div>
    </ul>

    <div class="results__body">
      <div class="results__container">
        <div style="text-align: center; margin-bottom: 20px">
          <h2>Compare the Following Plans:</h2>
        </div>
        <div class="grid-container">
          <div v-for="data in store.cbArray" :key="data.id"  class="grid-item">
            <h3>Name: {{ data.name }}</h3>
            <p>Price: {{ formatter.format(data.price) }}</p>
            <p>Description: {{ data.description }}</p>
            <p>Type: {{ data.type }}</p>
            <p>Section: {{ data.section }}</p>
            <p>Bestsellers: {{ data.bestSellers }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from '../store';

const router = useRouter();
const store = useStore()

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const goToResults = () => {
  router.push({ name: "Results" })
}
</script>