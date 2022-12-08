<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email Adresse</th>
        <th>Telefonnummer</th>
        <th>Status</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <CustomerTableRow
        v-for="customer in customers"
        :key="customer.id"
        :customer="customer"
      />
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { Customer } from "commons";
import CustomerTableRow from "./CustomerTableRow.vue";

defineProps<{ customers: Customer[] }>();
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  font-weight: bold;
  border-bottom: #2c3e50 solid 1px;
}

th,
td {
  padding: 0.1rem 1rem;
  text-align: left;
}

th:last-child,
td:last-child {
  text-align: right;
}

tr:nth-child(2n) {
  background-color: #f8f8f8;
}

form {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
