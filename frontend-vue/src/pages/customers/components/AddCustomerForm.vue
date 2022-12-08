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
    <template v-for="(address, index) in customer.addresses" :key="index">
      <section>
        <label for="streetAndNumber">Street and number</label>
        <input
          id="streetAndNumber"
          v-model="address.streetAndNumber"
          required
          type="text"
        />
      </section>
      <section>
        <label for="zipCode">Zip code</label>
        <input id="zipCode" v-model="address.zipCode" required type="text" />
      </section>
      <section>
        <label for="city">City</label>
        <input id="city" v-model="address.city" required type="text" />
      </section>
      <section>
        <label for="country">Country</label>
        <input id="country" v-model="address.country" required type="text" />
      </section>
    </template>
    <ButtonWithLoading :handler="submit">Add customer</ButtonWithLoading>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { CustomerUnsaved } from "commons";
import ButtonWithLoading from "../../../components/ButtonWithLoading.vue";
import { throwError } from "../../../../throwError";

const emit =
  defineEmits<(e: "newCustomer", customer: CustomerUnsaved) => void>();
const form = ref<HTMLFormElement | null>(null);

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

function getForm(): HTMLFormElement {
  return form.value ?? throwError("Form not found");
}

function submit() {
  if (getForm().reportValidity()) {
    emit("newCustomer", customer.value);
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
</style>
