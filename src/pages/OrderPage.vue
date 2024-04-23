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
            <q-input v-model="menuName" label="Menu Name" />
            <p style="color: red;">{{menuNameError}}</p>
            <q-input v-model="quantity" type="number" label="Quantity Your Order" />
            <p style="color: red;">{{quantityError}}</p>

            <q-btn color="primary" label="Order" @click="orderMenu" />
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const router = useRouter()
const menuList = ref([])
const menuName = ref('')
const quantity = ref('')
const essentialLinks = ref([
  { title: 'Home', to: 'Home' },
  { title: 'Order', to: 'Order' }
])
const menuNameError = ref('')
const quantityError = ref('')

const token = localStorage.getItem('token')
// Ambil daftar menu saat komponen dipasang
function check () {
  console.log('token', token)

  if (!token) {
    router.push('/')
  } else {
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
      router.push('/')
    }
  }).catch((error) => {
    console.error('Error token', error)
    router.push('/')
  })
}
function orderMenu () {
  const token = localStorage.getItem('token')
  const data = {
    token,
    menu_name: menuName.value,
    order_total: quantity.value
  }
  api.post('AddOrder', data)
    .then((response) => {
      console.log('Order successful! UUID: ', response.data.uu_id_o)
      menuName.value = ''
      quantity.value = ''

      menuNameError.value = ''
      quantityError.value = ''
    })
    .catch((error) => {
      console.log('Error Adding Order', error)
      menuNameError.value = error.response.data.messages.message.menu_name
      quantityError.value = error.response.data.messages.message.order_total
    })
}

</script>
