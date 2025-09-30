<template>
  <div
    class="wrapper bg-[url(/img/generic-bg-mobile.jpg)] md:bg-[url(/img/generic-bg-tablet.jpg)] lg:bg-[url(/img/generic-bg-desktop.jpg)]"
  >
    <section class="content-container--first">
      <h1>Client info</h1>
      <form @submit.prevent="submitForm">
        <UiTextInput
          v-model="formData.email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          required
          @blur="isDirty.email = true"
          :errorMessage="
            isDirty.email && !formDataAreValid.email
              ? 'Please enter a valid email address'
              : ''
          "
        />
        <UiTextInput
          v-model="formData.name"
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          required
          @blur="isDirty.name = true"
          :errorMessage="
            isDirty.name && !formDataAreValid.name
              ? 'Please enter a valid name'
              : ''
          "
        />
        <UiTextInput
          v-model="formData.address"
          name="address"
          label="Adress"
          type="text"
          required
          @blur="isDirty.address = true"
          :errorMessage="
            isDirty.address && !formDataAreValid.address
              ? 'Please enter a valid address'
              : ''
          "
        />
        <UiTextInput
          v-model="formData.postalCode"
          name="postalCode"
          label="Postal Code"
          type="text"
          required
          @blur="isDirty.postalCode = true"
          :errorMessage="
            isDirty.postalCode && !formDataAreValid.postalCode
              ? 'Please enter a valid postal code'
              : ''
          "
        />
        <UiTextInput
          v-model="formData.city"
          name="city"
          label="City"
          type="text"
          required
          @blur="isDirty.city = true"
          :errorMessage="
            isDirty.city && !formDataAreValid.city
              ? 'Please enter a valid city'
              : ''
          "
        />
        <UiTextInput
          v-model="formData.country"
          name="country"
          label="Country"
          type="text"
        />
        <UiTextInput
          v-model="formData.phone"
          name="phone"
          label="Phone"
          type="text"
        />
        <div class="flex flex-row justify-between items-center w-full my-8">
          <UiButton
            label="Back"
            variant="secondary"
            size="lg"
            @click="router.push('/cart')"
          />

          <UiButton
            label="To confirmation"
            variant="primary"
            size="lg"
            type="submit"
          />
        </div>
      </form>
    </section>
    <UiToast
      :message="message"
      :type="messageType"
    />
  </div>
</template>

<script setup>
import { escapeHtml } from '@/utils/helper/sanitize'
const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  country: '',
})

const isDirty = reactive({
  name: false,
  email: false,
  phone: false,
  address: false,
  postalCode: false,
  city: false,
  country: false,
})

const formDataAreValid = computed(() => {
  return {
    name: formData.name.length > 1,
    email: formData.email.length > 0 && /\S+@\S+\.\S+/.test(formData.email),
    address: formData.address.length > 3,
    postalCode: formData.postalCode.length > 2,
    city: formData.city.length > 1,
  }
})

const message = ref('')
const messageType = ref('info')

const setToastMessage = (msg, type = 'error') => {
  message.value = msg
  messageType.value = type
}

const clearToast = () => {
  setTimeout(() => {
    message.value = ''
    messageType.value = 'info'
  }, 3000)
}

const submitForm = () => {
  if (
    formDataAreValid.value.name &&
    formDataAreValid.value.email &&
    formDataAreValid.value.address &&
    formDataAreValid.value.postalCode &&
    formDataAreValid.value.city
  ) {
    sanitizeFormData()

    if (clientStore.client.uuid) {
      updateClient(clientStore.client.uuid)
        .then((response) => {
          clientStore.setClient(response)
          router.push('/confirmation')
        })
        .catch(() => {
          setToastMessage('Error updating client information')
          clearToast()
        })
    } else {
      createClient()
        .then((response) => {
          clientStore.setClient(response)
          router.push('/confirmation')
        })
        .catch(() => {
          setToastMessage('Error creating client information')
          clearToast()
        })
    }
  } else {
    Object.keys(isDirty).forEach((key) => {
      isDirty[key] = true
    })
  }
}

const sanitizeFormData = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = escapeHtml(formData[key])
  })
}

const createClient = async () => {
  return $fetch('/api/clients', {
    method: 'POST',
    body: formData,
  })
}

const updateClient = (uuid) => {
  return $fetch(`/api/clients/${uuid}`, {
    method: 'PUT',
    body: formData,
  })
}

const clientStore = useClientStore()

// TODO: convert to a watcher
onMounted(() => {
  if (clientStore.currentClient) {
    Object.assign(formData, {
      name: clientStore.currentClient.name || '',
      email: clientStore.currentClient.email || '',
      phone: clientStore.currentClient.phone || '',
      address: clientStore.currentClient.address || '',
      postalCode: clientStore.currentClient.postalCode || '',
      city: clientStore.currentClient.city || '',
      country: clientStore.currentClient.country || '',
    })
  }
})
</script>
