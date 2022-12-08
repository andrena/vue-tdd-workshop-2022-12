<template>
  <h2>Customer List</h2>
  <div class="content">
    <CustomerTable :customers="customers" />
    <AddCustomerForm @new-customer="addCustomer" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CustomerTable from "./components/CustomerTable.vue";
import AddCustomerForm from "./components/AddCustomerForm.vue";
import type { Customer, CustomerUnsaved } from "commons";

const customers = ref<Customer[]>([
  {
    id: "customer1",
    firstName: "John",
    lastName: "Doe",
    addresses: [
      {
        city: "Berlin",
        zipCode: "10000",
        streetAndNumber: "Teststrasse 1",
        country: "Deutschland",
      },
    ],
    emailAddress: "john.doe@mail.de",
    phoneNumber: "+4900000000",
    status: "inactive",
  },
  {
    id: "customer2",
    firstName: "Max",
    lastName: "Mustermann",
    addresses: [
      {
        city: "Berlin",
        zipCode: "10000",
        streetAndNumber: "Teststrasse 2",
        country: "Deutschland",
      },
    ],
    emailAddress: "max.mustermann@mail.de",
    phoneNumber: "+4900000011",
    status: "inactive",
  },
]);

function addCustomer(customer: CustomerUnsaved) {
  customers.value.push({
    id: crypto.randomUUID(),
    status: "inactive",
    ...customer,
  });
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
