<template>
  <div class="q-pa-md">
    <h2>Login</h2>
    <q-form @submit="login">
      <q-input filled v-model="username" label="Username" />
      <p style="color: red;">{{usernameError}}</p>
      <q-input filled v-model="password" label="Password" type="password"/>
      <p style="color: red;">{{passwordError}}</p>
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
const usernameError = ref('')
const passwordError = ref('')

function login () {
  api.post('Login', {
    username: username.value,
    password: password.value
  }).then(response => {
    if (response.status === 200) {
      const token = response.data.token
      localStorage.setItem('token', token)
      router.push({ path: '/Home' })
    } else {
      console.error('Login Failed:', response.data) // Log detailed error
      alert('Login failed.') // Generic message for user
    }
  }).catch(error => {
    console.error('Error logging in:', error.response.data)
    // alert('An error occurred while logging in.')
    usernameError.value = error.response.data.messages.message.username
    passwordError.value = error.response.data.messages.message.password
  })
}

</script>
