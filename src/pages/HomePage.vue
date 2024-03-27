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
          Ordee Grill App
        </q-toolbar-title>

        <q-btn
          type="submit"
          label="LOG OUT"
          color="primary"
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
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- Bagian Menu -->
      <div>
        <h3>Menu Order Grill</h3>
        <q-card>
          <q-card-section>
            <!-- Tampilkan daftar menu di sini -->
            <!-- Misalnya menggunakan v-for untuk menampilkan daftar menu -->
            <q-item v-for="(menu, index) in menuList" :key="index">
              <q-item-section>{{ menu.name }}</q-item-section>
              <q-item-section side>{{ menu.price }}</q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>

      <!-- Bagian Order Pengguna -->
      <div>
        <h3>Your Order</h3>
        <q-card>
          <q-card-section>
            <!-- Tampilkan daftar pesanan pengguna di sini -->
            <!-- Misalnya menggunakan v-for untuk menampilkan daftar pesanan -->
            <q-item v-for="(order, index) in userOrders" :key="index">
              <q-item-section>{{ order.name }}</q-item-section>
              <q-item-section side>{{ order.quantity }}</q-item-section>
              <q-item-section side>{{ order.total }}</q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Home Page',
    icon: 'home'
    // Bakal Ngarah kedalam Home Page
  },
  {
    title: 'Make Order',
    caption: 'Order Menu from OrderGrill',
    icon: 'note'
    // bakal ngarah kedalam page make order
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const isLoggedin = ref(false)

    // Data untuk daftar menu dan daftar pesanan pengguna
    const menuList = [
      { name: 'Menu 1', price: '$10' },
      { name: 'Menu 2', price: '$15' },
      { name: 'Menu 3', price: '$8' }
      // Tambahkan menu lainnya jika diperlukan
    ]

    const userOrders = [
      { name: 'Menu 1', quantity: 2, total: '$20' },
      { name: 'Menu 3', quantity: 1, total: '$8' }
      // Tambahkan pesanan lainnya jika diperlukan
    ]

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      menuList,
      userOrders,
      isLoggedin,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
