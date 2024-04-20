<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Order Grill App
        </q-toolbar-title>

        <q-btn
          type="submit"
          label="LOG OUT"
          color="primary"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Order Grill Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="$router.push({
            path: link.title === 'Home' ? 'Home' : 'Order'
          })"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- Bagian Menu -->
      <div>
        <h3>Menu Order Grill</h3>
        <q-card>
          <q-card-section>
             <q-item v-for="(menu, index) in menuList" :key="index">
              <q-item-section>{{ menu.menu_name }}</q-item-section>
              <q-item-section side>{{ menu.menu_price }}</q-item-section>

            </q-item>
          </q-card-section>
        </q-card>
      </div>

      <!-- Bagian Order Pengguna -->
      <div>
        <h3>Your Order</h3>
        <q-card>
          <q-card-section>
            <q-item v-for="(order, index) in userOrders" :key="index">
              <q-item-section>{{ order.menu_name }}</q-item-section>
              <q-item-section side>{{ order.order_total }}</q-item-section>
              <q-item-section side>{{ order.total_price }}</q-item-section>
              <q-item-section side>{{ order.order_at }}</q-item-section>
              <q-btn
                type="submit"
                label="Edit"
                color="primary"
                @click="btnUpdate(order)"
              />
              <q-btn
                  type="submit"
                  label="Delete"
                  color="primary"
                  @click="btnDelete(order)"
              />
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>

  <dialogDelete :deleteOrderDialog="deletePrompt" :data="tempData" @onClose="deletePrompt=false" @getOrder="getOrder()"/>
  <dialogEdit :updateOrderDialog="editPrompt" :data="tempData" @onClose="editPrompt=false" @getOrder="getOrder()"/>
 </template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import dialogEdit from 'components/ComponentUpdateOrder.vue'
import dialogDelete from 'components/ComponentDeleteOrder.vue'

const menuList = ref([])
const userOrders = ref([])
const router = useRouter()
const essentialLinks = ref([
  { title: 'Home', to: 'Home' },
  { title: 'Order', to: 'Order' }
])
const tempData = ref([])
const editPrompt = ref(false)
const deletePrompt = ref(false)

const btnUpdate = (data) => {
  editPrompt.value = true
  tempData.value = data
}
const btnDelete = (data) => {
  deletePrompt.value = true
  tempData.value = data
}
const token = localStorage.getItem('token')

// Mengecek Token dan menampilkan menu
function check () {
  console.log('token', token)

  if (token) {
    checkToken(token)
  }
}
check()
function checkToken (localToken) {
  api.get('Checker', {
    token: localToken
  }).then((response) => {
    console.log('response axios', response)
    console.log(response.data)

    if (response.data.success) {
      api.get('Menu').then((menuResponse) => {
        menuList.value = menuResponse.data
      }).catch((menuError) => {
        console.error('Error fetching menu:', menuError.data.message)
      })
    } else {
      console.error('error: token :', response.data.message)
    }
  }).catch((error) => {
    console.error('Error token', error)
  })
}
function getOrder () {
  api.get('Order', {
    token: localStorage.getItem('token')
  }).then((response) => {
    userOrders.value = response.data
  }).catch((error) => {
    console.error('Error token', error)
  })
}
getOrder()
function logout () {
  api.delete('Logout', { token: localStorage.getItem('token') }).then(() => {
    router.push('/')
    localStorage.removeItem('token')
    console.log('Berhasi Logout')
  }).catch((error) => {
    console.error('Error token', error)
  })
}

</script>
