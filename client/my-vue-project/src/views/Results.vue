<template>
    <div>
        <ul class="topnav">
            <div class="btn-group">
                <button @click="goToForm">Return to Form</button>
                <button v-if="isList === false" @click="changeListToGrid(true)">List View</button>
                <button v-if="isList === true" @click="changeListToGrid(false)">Grid View</button>
                <button @click="goToModal">Compare</button>
                <button @click="sort('name')">Sort by Name</button>
                <button @click="sort('price')">Sort by Price</button>
                <li class="right">
                    <input type="text" v-model="input" placeholder="filter (price, bestseller, type, or section)">
                </li>
            </div>
        </ul>

        <div class="results__body">
            <div class="results__container">
                <div v-if="isList === false" class="grid-container">
                    <div v-for="data in filteredItems" :key="data.id" class="grid-item">
                        <input type="checkbox" :value="data" v-model="checkBoxArray">
                        <h3>Name: {{ data.name }}</h3>
                        <p>Price: {{ formatter.format(data.price) }}</p>
                        <p>Description: {{ data.description }}</p>
                        <p>Type: {{ data.type }}</p>
                        <p>Section: {{ data.section }}</p>
                        <p>Bestsellers: {{ data.bestSellers }}</p>
                    </div>
                </div>

                <table v-if="isList === true">
                    <thead>
                        <tr>
                        <th scope="col">Compare</th>
                        <th scope="col" id="name">Name</th>
                        <th scope="col" id="price">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Section</th>
                        <th scope="col">Bestsellers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in filteredItems" :key="data.id">
                        <td data-label="Compare"><input type="checkbox" :value="data" v-model="checkBoxArray"></td>
                        <td data-label="Name">{{ data.name }}</td>
                        <td data-label="Price">{{ formatter.format(data.price) }}</td>
                        <td data-label="Description">{{ data.description }}</td>
                        <td data-label="Type">{{ data.type }}</td>
                        <td data-label="Section">{{ data.section }}</td>
                        <td data-label="Bestsellers">{{ data.bestSellers }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from '../store';

const router = useRouter();
const store = useStore()
const input = ref("")
const quoteData = ref([])
const checkBoxArray = ref([])
const currentSort = ref('name')
const currentSortDir = ref('asc')
const isList = ref(true)
const isHidden = ref(true)

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

fetch('http://localhost:8080/quotes')
.then((res) => res.json())
.then((data) => {
    quoteData.value = data.quotes
})

const changeListToGrid = (val) => {
    isList.value = val
}

watch(checkBoxArray, () => {
    if (checkBoxArray.value.length > 1) {
        isHidden.value = false
    } else {
        isHidden.value = true
    }

    if (checkBoxArray.value.length > 4) {
        checkBoxArray.value.pop()
        alert('Max Selection: 4 Plans')
    }

    store.cbArray = checkBoxArray.value
})

const goToModal = () => {
    if (checkBoxArray.value.length > 1) {
        router.push({ name: "Modal" })
    } else {
        alert('Please check minimum 2 plans to compare')
    }
}

const goToForm = () => {
    router.push({ name: "Form" })
}

const filteredItems = computed(() => {
    return quoteData.value.filter((row) => {
        const price = row.price.toString().toLowerCase();
        const bestseller = row.bestSellers.toString().toLowerCase();
        const type = row.type.toString().toLowerCase();
        const section = row.section.toString().toLowerCase();
        let searchTerm = input.value.toLowerCase();

        return (
            price.includes(searchTerm) ||
            bestseller.includes(searchTerm) ||
            type.includes(searchTerm) ||
            section.includes(searchTerm)
        )
    })
})

const sort = (s) => {
    if (s === currentSort.value) {
        currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc';
    }
    currentSort.value = s

    quoteData.value = quoteData.value.sort((a,b) => {
        let modifier = 1
        if(currentSortDir.value === 'desc') modifier = -1;
        if(a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
        if(a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
        return 0;
    })
}
</script>
