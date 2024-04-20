<template>
  <q-dialog :model-value="props.updateOrderDialog" persistent @hide="emits('onClose')">
    <q-card style="min-width: 450px;">
      <q-card-section>
        <div class="text-h5">Menu</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="updatedOrder.menu_name" autofocus label="Menu_Name"/>
      </q-card-section>

      <q-card-section>
        <div class="text-h5">Quantity</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="updatedOrder.order_total" autofocus label="Order_Total"/>
      </q-card-section>

      <q-card-action align="right" class="text-primary">
        <q-btn flat label="Update" @click="updateOrder" v-close-popup color="primary"/>
        <q-btn flat label="Cancel" v-close-popup/>
      </q-card-action>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { api } from 'src/boot/axios'
const emits = defineEmits([
  'onClose',
  'getOrder'
])

const props = defineProps({
  updateOrderDialog: Boolean,
  data: Object
})

const updatedOrder = ref({
  menu_name: '',
  order_total: ''
})

watch(() => props.updateOrderDialog, (newVal) => {
  if (newVal) {
    updatedOrder.value.menu_name = props.data.menu_name
    updatedOrder.value.order_total = props.data.order_total
  } else {
    updatedOrder.value.menu_name = ''
    updatedOrder.value.order_total = ''
  }
})

function updateOrder () {
  console.log('UUID', props.data.uu_id_o)
  emits('onClose')
  api.put('Update', {
    uu_id_o: props.data.uu_id_o,
    menu_name: updatedOrder.value.menu_name,
    order_total: updatedOrder.value.order_total
  }).then((response) => {
    console.log('response axios', response)
    emits('getOrder')
    if (response === true) {
      console.log('Success Update Data : ', response)
    } else {
      console.log('Failed Update Data : ', response)
    }
  }).catch((error) => {
    console.error('Error Updating order:', error)
  })
}
</script>
