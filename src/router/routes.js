import MainLayout from 'layouts/MainLayout.vue'
import LoginPage from 'pages/LoginPage.vue'
import SignupPage from 'pages/SignupPage.vue'
import HomePage from 'pages/HomePage.vue'
import OrderPage from 'pages/OrderPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: LoginPage
      },
      {
        path: 'Signup',
        name: 'Signup',
        component: SignupPage
      },
      {
        path: 'Home',
        name: 'Home',
        component: HomePage
      },
      {
        path: 'Order',
        name: 'Order',
        component: OrderPage
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]
export default routes
