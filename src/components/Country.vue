<template>
    <div class="search-bar">
        <input type="text" id="text" placeholder="Search Countries" />
        <button class="search-btn">
            <img src="../assets/icons/search-icon.png" alt="Search">
        </button>
    </div>
    <!-- <a href="/country-detail">Home</a> -->
    <div class="container">
        <ul id="list" class="list">
            <li v-for="country in countries" :key="country.ccn3">
                <div class="card">
                    <img :src="country.flags.svg" alt="Flag">
                    <div class="card-info">
                        <span class="country-name">{{ country.name.common }}</span>
                        <span v-if="country.currencies && Object.keys(country.currencies).length > 0">
                            Currency: {{ Object.values(country.currencies)[0].name }}
                        </span>
                        <span v-if="country.timezones && country.timezones.length > 0">
                            Current date and time: {{ getCurrentTime(country.timezones[0]) }}
                        </span>
                        <button>Show Map</button>
                        <button  @click="goToPage2"> Detail </button>

                    </div>
                </div>
            </li>
        </ul>
    </div>

</template>

<script setup>
import { computed } from 'vue';
// import router  from '@/router/router';


// const goToPage2 = () => {
//   router.push('/country-detail');
// };

const props = defineProps({
    countries: {
        type: Array,
        required: true
    },
});

function getCurrentTime(timezone) {
    let offset = 0;

    // Parse the timezone offset from the string (e.g., 'UTC-04:00' -> -4)
    if (timezone.startsWith('UTC')) {
        const offsetHours = parseInt(timezone.split('UTC')[1]);
        const offsetMinutes = parseInt(timezone.split(':')[1]);
        offset = offsetHours + (offsetMinutes / 60);
    } else {
        console.error('Invalid timezone provided, defaulting to UTC.');
    }

    // Get the current time in UTC
    const currentTimeUTC = new Date();
    const utcMilliseconds = currentTimeUTC.getTime();

    // Calculate the local time by applying the offset or default to UTC
    const localMilliseconds = utcMilliseconds + (offset * 60 * 60 * 1000);
    const localTime = isNaN(localMilliseconds) ? currentTimeUTC : new Date(localMilliseconds);

    // Define options for formatting the local time
    const options = {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Format and return the local time
    return localTime.toLocaleString('en-US', options);
}

</script>


<style scoped>
.search-bar {
    margin-right: 300px;
    width: 500px;
    position: relative;
    display: inline-block;
}

.search-bar input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 500px;
    height: 50px;
    box-sizing: border-box;
}

.search-bar .search-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    background-color: transparent;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
}

.search-bar .search-btn img {
    width: 30px;
    height: 30px;
}

.container {
    display: flex;
    justify-content: center;
}

.list {
    list-style-type: none;
    padding: 0;
}

.card {
    display: flex;
    align-items: center;
    border: 2px solid rgb(218, 208, 208);
    width: 500px;
    height: 150px;
    margin-left: 100px;
    margin-bottom: 10px;
    margin-top: 1px;
}

.card img {
    width: 180px;
    height: 150px;
    margin-right: 5px;
}

.card-info {
    display: flex;
    flex-direction: row;
    display: block;
}

.card-info span {
    margin-bottom: 5px;
    display: block;

}

.card-info .country-name {
    font-weight: bold;
}

.card-info button {
    border: 2px solid blue;
    height: 40px;
    width: 120px;
    margin: 5px;
    font-weight: bold;
    color: blue;
    cursor: pointer;
}
</style>
