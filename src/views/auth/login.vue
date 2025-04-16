<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '/src/service/api.js'
import Cookies from 'js-cookie'

const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

const validation = ref([])
const loginFailed = ref([])

const login = async () => {
  try {
    const response = await api.post('/login', {
      email: user.email,
      password: user.password
    })

    // Periksa apakah response.data dan response.data.data ada sebelum mengaksesnya
    if (response && response.data && response.data.data) {
      // Simpan token dan data user
      Cookies.set('token', response.data.data.token)
      Cookies.set('user', JSON.stringify(response.data.data.user))

      // Periksa apakah token berhasil disimpan
      if (Cookies.get('token')) {
        // Redirect ke dashboard
        router.push({ name: 'dashboard' })
      }
    } else {
      loginFailed.value = { message: 'Invalid server response format' }
    }
  } catch (error) {
    console.error('Login error:', error)


    if (error.response && error.response.data) {

      validation.value = error.response.data


      loginFailed.value = error.response.data
    } else {
      loginFailed.value = { message: 'Login failed. Please check your connection and try again.' }
    }
  }
}

// Validasi dasar untuk form
const validateForm = () => {
  const errors = []

  if (!user.email) {
    errors.push({ path: 'email', msg: 'Email is required' })
  }

  if (!user.password) {
    errors.push({ path: 'password', msg: 'Password is required' })
  }

  return errors
}

// Fungsi untuk menghandle submit form
const handleSubmit = async () => {
  // Reset error messages
  validation.value = []
  loginFailed.value = []

  // Validate form
  const formErrors = validateForm()
  if (formErrors.length > 0) {
    validation.value = { errors: formErrors }
    return
  }

  // Lakukan login
  await login()
}
</script>

<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-body">
          <h4>LOGIN</h4>
          <hr>
          <div v-if="validation.errors" class="mt-2 alert alert-danger">
            <ul class="mt-0 mb-0">
              <li v-for="(error, index) in validation.errors" :key="index">
                {{ `${error.path} : ${error.msg}` }}
              </li>
            </ul>
          </div>
          <div v-if="loginFailed.message" class="mt-2 alert alert-danger">
            {{ loginFailed.message }}
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Email address</label>
              <input type="email" v-model="user.email" class="form-control" placeholder="Email Address" />
            </div>

            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Password</label>
              <input type="password" v-model="user.password" class="form-control"
                     placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-primary w-100">LOGIN</button>
          </form>
          <div class="mt-3 text-center">
            <p>Belum memiliki akun?</p>
            <router-link :to="{ name: 'register' }" class="btn btn-link">Daftar Sekarang</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>