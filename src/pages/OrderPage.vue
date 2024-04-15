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
            path: link.title === 'Order' ? 'Order' : 'Home'
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
        <h4>Make Order</h4>
        <q-card>
          <q-card-section>
            <!-- Form untuk menambahkan pesanan -->
            <q-input v-model="menuName" label="Menu Name" /> <!-- Gunakan 'menuName' sebagai v-model -->
            <q-input v-model="quantity" type="number" label="Quantity Your Order" /> <!-- Gunakan 'quantity' sebagai v-model -->
            <q-btn color="primary" label="Order" @click="orderMenu" />
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'src/boot/axios'

const leftDrawerOpen = ref(false)
const menuList = ref([])
const menuName = ref('')
const quantity = ref('')
const isLoggedin = ref(false)
const essentialLinks = ref([
  { title: 'Home', to: 'Home' },
  { title: 'Order', to: 'Order' }
])

// Ambil daftar menu saat komponen dipasang
onMounted(async () => {
  const token = localStorage.getItem('token')
  console.log('token', token)

  if (token) {
    isLoggedin.value = true
    await checkToken(token)
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

const orderMenu = async () => {
  const Token = localStorage.getItem('token')
  console.log('token', Token)
  try {
    if (Token) {
      const response = await api.post('AddOrder', {
        menu_name: menuName.value,
        order_total: quantity.value,
        token: Token
      })
      console.log(menuName.value)
      console.log(quantity.value)
      console.log(response.data)

      // Reset nilai input setelah ditambahkan
      menuName.value = ''
      quantity.value = ''
    } else {
      console.error('Token missing')
    }
  } catch (error) {
    console.log('Error Adding Order', error)
  }
}
// // Fungsi untuk menampilkan atau menyembunyikan drawer
// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>
