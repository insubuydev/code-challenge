<template>
  <div class="form__body">
    <div class="container">
    <div class="title">INSUBUY Travel Insurance</div>
    <form @submit.prevent="submitForm">
      <div class="user__details">
        <div class="input__box">
          <span class="details">Policy Maximum</span>
          <select id="country" name="country">
              <option value="50">50,000</option>
              <option value="100">100,000</option>
              <option value="250">250,000</option>
              <option value="500">500,000</option>
          </select>
        </div>
        <div class="input__box">
          <span class="details">Age</span>
          <input v-model="age" type="number" min="1" max="100" placeholder="Choose your age" required>
        </div>
        <div class="input__box">
          <span class="details">Travel Date (Start)</span>
          <div>
            <input v-model="startDate" type="date" id="fname" name="firstname" placeholder="Your name.." required>
          </div>
        </div>
        <div class="input__box">
          <span class="details">Travel Date (End)</span>
          <div>
            <input v-model="endDate" type="date" id="lname" name="lastname" placeholder="Your last name.." required>
          </div>
        </div>
        <div class="input__box">
          <span class="details">Citizenship</span>
          <input v-model="citizenShip" type="text" pattern="[a-zA-Z]+" placeholder="Country of Citizenship (text only)" required>
        </div>
        <div class="input__box">
          <span class="details">Mailing State</span>
          <input v-model="state" type="text" pattern="[a-zA-Z]+" placeholder="Choose State (text only)" required>
        </div>

      </div>
      <div style="text-align: center;">
        <div class="button">
          <input type="submit" value="Get Quotes">
        </div>
        <div>
          <span @click="resetForm" class="resetButton">Reset Form</span>
        </div>
      </div>
    </form>
  </div>
  </div>
  
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const startDate = ref()
const endDate = ref()
const citizenShip = ref()
const age = ref()
const state = ref()

const submitForm = () => {
  router.push({ name: "Results" })
  startDate.value = ""
  endDate.value = ""
  citizenShip.value = ""
  age.value = ""
  state.value = ""
}

const resetForm = () => {
  startDate.value = ""
  endDate.value = ""
  citizenShip.value = ""
  age.value = ""
  state.value = ""
}
</script>