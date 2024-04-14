<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>


<script setup>

import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
// import { Axios } from "axios";
import axios from "axios";

const toast = useToast();

const transactions = ref([]);
const countries = ref([]);


onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (savedTransactions) {
    transactions.value = savedTransactions;
  };
  // console.log("kuch bhi")
  // axios.get("https://restcountries.com/v3.1/all").then((response) => {
  //   console.log("jhasash")
  //   console.log(response.data);
  //   transactions.value = response.data
  // }).catch((err) => {
  //   console.log(err);
  // })

})

// Get total balance
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get total income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0).toFixed(2);
});
// Get total expense
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0).toFixed(2);
});

// Add transaciton
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId,
    text: transactionData.text,
    amount: transactionData.amount
  });
  saveTransactionsToLocalStorage();

  toast.success('Transaction Added');
  console.log(generateUniqueId());
}

// Generate unique id
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000);
}

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaciton) => transaciton.id !== id);
  saveTransactionsToLocalStorage();
  toast.success("Transaction deleted")

};

// save to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
}
</script>