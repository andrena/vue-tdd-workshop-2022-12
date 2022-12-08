<template>
  <div class="address-input-container">
    <h4>Address</h4>
    <section>
      <label for="streetAndNumber">Street and number</label>
      <input
        id="streetAndNumber"
        v-model="streetAndNumberModel"
        required
        type="text"
      />
    </section>
    <section>
      <label for="zipCode">Zip code</label>
      <input id="zipCode" v-model="zipCodeModel" required type="text" />
    </section>
    <section>
      <label for="city">City</label>
      <input id="city" v-model="cityModel" required type="text" />
    </section>
    <section>
      <label for="country">Country</label>
      <input id="country" v-model="countryModel" required type="text" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { Address } from "commons";

const props = defineProps<{address: Address}>();
const emit = defineEmits<(e: "update:address", address: Address) => void>();

function updateAddress(newValue: Partial<Address>) {
  emit("update:address", { ...props.address, ...newValue });
}

const streetAndNumberModel = computed({
  get() {
    return props.address.streetAndNumber;
  },
  set(streetAndNumber: string) {
    updateAddress({ streetAndNumber });
  },
});

const zipCodeModel = computed({
  get() {
    return props.address.zipCode;
  },
  set(zipCode: string) {
    updateAddress({ zipCode });
  },
});

const cityModel = computed({
  get() {
    return props.address.city;
  },
  set(city: string) {
    updateAddress({ city });
  },
});

const countryModel = computed({
  get() {
    return props.address.country;
  },
  set(country: string) {
    updateAddress({ country });
  },
});
</script>

<style scoped>
.address-input-container {
  border: #2c3e50 solid;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: space-between;
}
</style>
