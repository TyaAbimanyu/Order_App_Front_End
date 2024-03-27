const routes = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'Signup',
        name: 'Signup',
        component: () => import('pages/SignupPage.vue')
      },
      {
        path: 'Home',
        name: 'Home',
        component: () => import('pages/HomePage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]
export default routes
