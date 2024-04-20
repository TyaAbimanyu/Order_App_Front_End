<template>
  <q-dialog :model-value="props.deleteOrderDialog" persistent @hide="emits('onClose')">
    <q-card style="min-width: 450px;">
      <q-card-section>
        <div class="text-h5">Are You sure wanna Delete Order ?</div>
      </q-card-section>

      <q-card-action>
        <q-btn v-close-popup>Cancel</q-btn>
        <q-btn @click="deleteOrder">Delete</q-btn>
      </q-card-action>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { defineProps } from 'vue'
import { api } from 'src/boot/axios'
const emits = defineEmits([
  'onClose',
  'getOrder'
])

const props = defineProps({
  deleteOrderDialog: Boolean,
  data: Object
})

function deleteOrder () {
  emits('onClose')
  api.delete(`Delete/${props.data.uu_id_o}`)
    .then((response) => {
      emits('getOrder')
      console.log = response.data
    }).catch((error) => {
      console.error('Error deleting order:', error)
    })
}
</script>
