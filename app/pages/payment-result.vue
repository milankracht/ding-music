<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const orderId = route.query.orderId as string

  const res = await $fetch(`/api/payment-status?orderId=${orderId}`)

  if (res.status === 'processed') router.push('/success')
  else if (res.status === 'error') router.push('/error')
  else router.push('/pending') // optioneel: nog in afwachting
})
</script>
