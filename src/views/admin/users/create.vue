<script setup>
import SidebarMenu from "../../../components/SidebarMenu.vue";
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
import Cookies from 'js-cookie';
import api from '/src/service/api.js'
import axios from "axios";


const token = Cookies.get('token');
const user = reactive({
  name: '',
  email: '',
  password: '',
  nationality: '',
});
const validation = ref([]);

// const storeUser = async () => {
//
//   //call api store user
//   api.defaults.headers.common['Authorization'] = token;
//   await api.post('/admin/users', {
//     name: user.name,
//     email: user.email,
//     password: user.password,
//   })
//       .then(() => {
//         //redirect ke halaman users
//         router.push({
//           name: 'admin.users'
//         })
//       })
//       .catch(error => {
//
//         validation.value = error.response.data
//       })
//
// }

  const storeUser = async () => {
    try {
      // prediksi nationality menggunakan AgeApi
      const response = await axios.get(`https://api.nationalize.io/?name=${user.name}`);
      const topCountry = response.data.country[0]?.country_id || 'Unknown';
      user.nationality = topCountry;

      // kirim ke backend
      api.defaults.headers.common['Authorization'] = token;
      await api.post('/admin/users', {
        name: user.name,
        email: user.email,
        password: user.password,
        nationality: user.nationality, // kirim ke backend
      });

      router.push({ name: 'admin.users' });
    } catch (error) {
      validation.value = error.response.data;
    }
  }

</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3">
        <SidebarMenu />
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm">
          <div class="card-header">
            ADD USER
          </div>
          <div class="card-body">
            <div v-if="validation.errors" class="mt-2 alert alert-danger">
              <ul class="mt-0 mb-0">
                <li v-for="(error, index) in validation.errors" :key="index">
                  {{ `${error.path} : ${error.msg}` }}
                </li>
              </ul>
            </div>
            <form @submit.prevent="storeUser">

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Full Name</label>
                <input type="text" v-model="user.name" class="form-control" placeholder="Full Name" />
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Email address</label>
                <input type="email" v-model="user.email" class="form-control"
                       placeholder="Email Address" />
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Password</label>
                <input type="password" v-model="user.password" class="form-control"
                       placeholder="Password" />
              </div>

              <button type="submit" class="btn btn-sm btn-primary">SAVE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

