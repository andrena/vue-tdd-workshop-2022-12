<template>
  <form ref="form" title="Add a Customer" @submit.prevent>
    <h3>Add a Customer</h3>
    <section>
      <label for="firstName">First name</label>
      <input id="firstName" v-model="customer.firstName" required type="text" />
    </section>
    <section>
      <label for="lastName">Last name</label>
      <input id="lastName" v-model="customer.lastName" required type="text" />
    </section>
    <section>
      <label for="emailAddress">Email address</label>
      <input
        id="emailAddress"
        v-model="customer.emailAddress"
        required
        type="email"
      />
    </section>
    <section>
      <label for="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        v-model="customer.phoneNumber"
        required
        type="text"
      />
    </section>
    <AddressInput
      v-for="(address, index) in customer.addresses"
      :key="index"
      :address="address"
      @update:address="updateAddress(index, $event)"
    />
    <div class="address-buttons">
      <button type="button" @click="addNewAddress">Add new address</button>
      <button type="button" @click="removeLastAddress">Remove address</button>
    </div>
    <ButtonWithLoading :handler="submit">Add customer</ButtonWithLoading>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Address, CustomerUnsaved } from "commons";
import AddressInput from "./AddressInput.vue";
import { injectOrThrow } from "../../../services/injectOrThrow";
import { CustomerRepositoryKey } from "../../../services/CustomerRepository";
import ButtonWithLoading from "../../../components/ButtonWithLoading.vue";
import { throwError } from "../../../../throwError";

const MIN_ADDRESS_COUNT = 1;
const MAX_ADDRESS_COUNT = 3;

const form = ref<HTMLFormElement | null>(null);

const customerRepository = injectOrThrow(CustomerRepositoryKey);

function getNewAddress() {
  return { streetAndNumber: "", zipCode: "", city: "", country: "" };
}

function getNewCustomer(): CustomerUnsaved {
  return {
    firstName: "",
    lastName: "",
    addresses: [getNewAddress()],
    emailAddress: "",
    phoneNumber: "",
  };
}

const customer = ref<CustomerUnsaved>(getNewCustomer());

function updateAddress(index: number, address: Address) {
  customer.value.addresses[index] = address;
}

function addNewAddress() {
  if (customer.value.addresses.length < MAX_ADDRESS_COUNT) {
    customer.value.addresses.push(getNewAddress());
  }
}

function removeLastAddress() {
  if (customer.value.addresses.length > MIN_ADDRESS_COUNT) {
    customer.value.addresses.pop();
  }
}

function getForm(): HTMLFormElement {
  return form.value ?? throwError("Form not found");
}

async function submit() {
  if (getForm().reportValidity()) {
    await customerRepository.add(customer.value);
    customer.value = getNewCustomer();
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.address-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.address-buttons > button {
  background-color: aliceblue;
  color: black;
}
</style>
