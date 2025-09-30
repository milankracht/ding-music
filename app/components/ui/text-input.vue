<template>
  <div class="text-input">
    <label :for="props.name">
      {{ props.label }}
      <span v-if="props.required"> *</span>
    </label>
    <input
      v-model="model"
      :type="props.type"
      :id="props.name"
      :name="props.name"
      :placeholder="props.placeholder"
      :required="props.required"
      :aria-label="props.label"
      :aria-required="props.required"
      :aria-invalid="!!props.errorMessage"
      :aria-describedby="props.errorMessage ? `${props.name}-error` : undefined"
      @blur="$emit('blur')"
    />
    <div
      v-if="errorMessage"
      class="text-input__error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
  },
  name: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
  },
  errorMessage: {
    type: String,
  },
})

const model = defineModel()
</script>

<style scoped>
.text-input {
  @apply mb-4;
}
.text-input label {
  @apply block text-sm font-medium mb-1 uppercase;
}
.text-input input {
  @apply w-full px-3 py-2 border border-white rounded-md bg-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200;
}
.text-input__error {
  @apply text-red-200 text-sm mt-1;
}
</style>
