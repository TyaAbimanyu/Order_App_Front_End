<template>
  <div class="q-pa-md">
    <h2>Login</h2>
    <q-form @submit="login">
      <q-input filled v-model="username" label="Username" required/>
      <q-input filled v-model="password" label="Password" type="password" required/>
      <q-btn type="submit" label="LOGIN" color="primary" />
    </q-form>
    <router-link to="/Signup">Don't Have an Account? Sign up Here.</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await api.post('Login', {
      username: username.value,
      password: password.value
    })

    if (response.status === 200) {
      const token = response.data.token
      localStorage.setItem('token', token)
      router.push({ path: '/Home' })
    } else {
      console.error('Login Failed:', response.data) // Log detailed error
      alert('Login failed.') // Generic message for user
    }
  } catch (error) {
    console.error('Error logging in:', error)
    alert('An error occurred while logging in.')
  }
}

</script>
