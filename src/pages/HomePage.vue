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
          @click="toggleLeftDrawer"
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
      v-model="leftDrawerOpen"
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
                @click="updateOrderDialog = true"
              />
              <q-btn
                  type="submit"
                  label="Delete"
                  color="primary"
                  @click="deleteOrder(order.order_id)"
              />
            </q-item>
          </q-card-section>
        </q-card>
      </div>

      <q-dialog v-model="updateOrderDialog">
        <q-card style="min-width: 450px;">
          <q-card-section>
            <div class="text-h5">Menu</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="updatedOrder.menu_name" autofocus @keyup.enter="updateOrderDialog = false"/>
          </q-card-section>

          <q-card-section>
            <div class="text-h5">Quantity</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="updatedOrder.order_total" autofocus @keyup.enter="updateOrderDialog = false"/>
          </q-card-section>

          <q-card-action align="right" class="text-primary">
            <q-btn flat label="Update" @click="updateOrder" v-close-popup color="primary"/>
            <q-btn flat label="Cancel" v-close-popup/>
          </q-card-action>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'src/boot/axios'
import router from 'src/router'

const leftDrawerOpen = ref(false)
const isLoggedin = ref(false)
const menuList = ref([])
const userOrders = ref([])
const updateOrderDialog = ref(false)
const updatedOrder = ref({
  menu_name: '',
  order_total: ''
})
const essentialLinks = ref([
  { title: 'Home', to: 'Home' },
  { title: 'Order', to: 'Order' }
])

// Mengecek Token dan menampilkan menu
onMounted(async () => {
  const token = localStorage.getItem('token')
  console.log('token', token)

  if (token) {
    isLoggedin.value = true
    checkToken(token)
  }
})

const checkToken = async (localToken) => {
  try {
    const response = await api.post('Checker', {
      token: localToken
    })
    console.log('response axios', response)
    console.log(response.data)

    if (response.data.success) {
      const menuResponse = await api.get('Menu')
      menuList.value = menuResponse.data
    } else {
      console.error('error: token :', response.data.message)
    }
  } catch (error) {
    console.error('Error token', error)
  }
}

// Data buat ngambil Daftar Order
onMounted(async () => {
  const Token = localStorage.getItem('token')
  try {
    if (Token) {
      const response = await api.post('Order', {
        token: Token
      })
      userOrders.value = response.data
      console.log(response.data)
      console.log('Punya Token setelah hasil data menunya keluar', Token)
    } else {
      console.error('Token missing')
    }
  } catch (error) {
    console.log('Error Showing Order', error)
  }
})
const logout = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.post('Logout', { token })

    if (response.data.delete) {
      localStorage.removeItem('token')
      router().push({
        path: 'Login'
      })
    } else {
      console.error('Failed to Delete Token', response.data.message)
    }
  } catch (error) {
    console.error('Error Log Out : ', error)
  }
}
const deleteOrder = async (orderId) => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.post('Delete', {
      token,
      order_id: orderId
    })
    console.log = response.data
  } catch (error) {
    console.error('Error deleting order:', error)
  }
}
const updateOrder = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.post('Update', {
      token,
      menu_name: updatedOrder.value.menu_name,
      order_total: updatedOrder.value.order_total
    })
    if (response.data.status) {
      updateOrderDialog.value = false
    } else {
      console.error('Failed to update order:', response.data.message)
    }
  } catch (error) {
    console.error('Error updating order:', error)
  }
}

</script>
