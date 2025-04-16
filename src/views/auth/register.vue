<script setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
import api from '/src/service/api.js'

const user = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const validation = ref({})
const clientErrors = ref([])


const validateForm = () => {
  clientErrors.value = []

  if (!user.name) {
    clientErrors.value.push({ path: 'name', msg: 'Name is required' })
  }

  if (!user.email) {
    clientErrors.value.push({ path: 'email', msg: 'Email is required' })
  } else if (!isValidEmail(user.email)) {
    clientErrors.value.push({ path: 'email', msg: 'Email is not valid' })
  }

  if (!user.password) {
    clientErrors.value.push({ path: 'password', msg: 'Password is required' })
  } else if (user.password.length < 6) {
    clientErrors.value.push({ path: 'password', msg: 'Password must be at least 6 characters' })
  }

  return clientErrors.value.length === 0
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const register = async () => {
  // Validasi sisi client dulu
  if (!validateForm()) {
    return
  }

  await api.post('/register', {
    name: user.name,
    email: user.email,
    password: user.password,
  })
      .then(() => {
        router.push({name: 'login'})
      })
      .catch(error => {
        // Menyimpan error dari server
        if (error.response && error.response.data) {
          validation.value = error.response.data
        } else {
          clientErrors.value.push({ path: 'general', msg: 'Registration failed. Please try again.' })
        }
      })
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card border-0 rounded shadow-sm">
          <div class="card-body">
            <h4>REGISTER</h4>
            <hr>

            <div v-if="validation.errors && validation.errors.length > 0" class="mt-2 alert alert-danger">
              <ul class="mt-0 mb-0">
                <li v-for="(error, index) in validation.errors" :key="index">
                  {{ `${error.path} : ${error.msg}` }}
                </li>
              </ul>
            </div>


            <div v-if="clientErrors.length > 0" class="mt-2 alert alert-danger">
              <ul class="mt-0 mb-0">
                <li v-for="(error, index) in clientErrors" :key="index">
                  {{ `${error.path} : ${error.msg}` }}
                </li>
              </ul>
            </div>

            <form @submit.prevent="register">
              <div class="row">
                <div class="col-md-12 mb-3">
                  <div class="form-group">
                    <label class="mb-1 fw-bold">Full Name</label>
                    <input type="text" v-model="user.name" class="form-control"
                           placeholder="Full Name" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="form-group">
                    <label class="mb-1 fw-bold">Email address</label>
                    <input type="email" v-model="user.email" class="form-control"
                           placeholder="Email Address" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="form-group">
                    <label class="mb-1 fw-bold">Password</label>
                    <input type="password" v-model="user.password" class="form-control"
                           placeholder="Password" />
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100">REGISTER</button>
            </form>
            <div class="mt-3 text-center">
              <p>Sudah memiliki akun?</p>
              <router-link :to="{ name: 'login' }" class="btn btn-link">Login Sekarang</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>