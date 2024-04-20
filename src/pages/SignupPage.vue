<template>
  <div class="q-pa-md">
    <h2>Sign Up</h2>
    <q-form @submit="signup">
      <q-input
        filled
        v-model="username"
        label="Username"

        />
        <p style="color: red">{{ usernameError }}</p>
      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"

      />
      <p style="color : red">{{emailError}}</p>
      <q-input
        filled
        v-model="password"
        label="Password"
        type="password"

        />
        <p style="color: red;">{{passwordError}}</p>
        <q-input
        filled
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"

        />
        <p style="color: red;">{{confirmPasswordError}}</p>
      <q-btn
        type="submit"
        label="REGISTER"
        color="primary"
      />
    </q-form>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const usernameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

const signup = () => {
  api.post('Signup', {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  })
    .then((response) => {
      if (response.status === 200) {
        router.push({ path: '/' })
      } else {
        console.error('Signup Failed:', response.data)
        alert('Signup failed.')
      }
    })
    .catch((error) => {
      console.error('Error signing up:', error.response.data)
      usernameError.value = error.response.data.messages.username
      emailError.value = error.response.data.messages.email
      passwordError.value = error.response.data.messages.password
      confirmPasswordError.value = error.response.data.messages.confirmPassword
    })
}

</script>
