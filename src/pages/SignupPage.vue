<template>
  <div class="q-pa-md">
    <h2>Sign Up</h2>
    <q-form @submit="signup">
      <q-input
        filled
        v-model="username"
        label="Username"
        required
        :error="usernameError ? 'Username must be between 8 and 16 Characters':null"
      />
      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"
        required
        :error="emailError ? 'Invalid email Input':null"
      />
      <q-input
        filled
        v-model="password"
        label="Password"
        type="password"
        required
        :error="passwordError ? 'Password must be between 8 and 16  Characters and contain least one letter and one number':null"
      />
      <q-btn
        type="submit"
        label="REGISTER"
        color="primary"
      />
    </q-form>
  </div>
</template>

<script>
import { api } from 'src/boot/axios'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const usernameError = ref('')
    const emailError = ref('')
    const passwordError = ref('')

    const disableSubmit = computed(() => usernameError.value || emailError.value || passwordError.value)

    const signup = async () => {
      if (username.value.length < 8 || username.value.length > 16) {
        usernameError.value = true
        return
      } else {
        usernameError.value = ''
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = true
        return
      } else {
        emailError.value = ''
      }

      if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/.test(password.value)) {
        passwordError.value = true
        return
      } else {
        passwordError.value = ''
      }

      try {
        const response = await api.post('Signup', {
          username: username.value,
          email: email.value,
          password: password.value
        })

        if (response.status === 200) {
          // Login Buat ntar Signup
          router.push({ path: '/' })
        } else {
          console.error('Login Failed:', response.data) // Log detailed error
          alert('Login failed.')
        }
      } catch (error) {
        console.error('Error logging in:', error)
        alert('An error occurred while logging in.')
      }
    }

    return {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError,
      disableSubmit,
      signup
    }
  }
}
</script>
