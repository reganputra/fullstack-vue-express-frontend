<script setup>
import SidebarMenu from "../../../components/SidebarMenu.vue";
import DeleteModal from "../../../components/DeleteModal.vue";
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import api from '/src/service/api.js'

const token = Cookies.get('token');
const users = ref([]);


const fetchDataUsers = async () => {
  api.defaults.headers.common['Authorization'] = token;
  await api.get('/admin/users')
      .then(response => {
        users.value = response.data.data
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
}

onMounted(() => {
  fetchDataUsers();
});

const showDeleteModal = ref(false);
const userToDelete = ref({
  id: null,
  name: ''
});

const confirmDeleteUser = (user) => {
  userToDelete.value = {
    id: user.id,
    name: user.name
  };
  showDeleteModal.value = true;
};


const handleConfirmDelete = async (userId) => {
  try {
    api.defaults.headers.common['Authorization'] = token;
    await api.delete(`/admin/users/${userId}`);
    await fetchDataUsers();
    showDeleteModal.value = false;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
const handleCancelDelete = () => {
  showDeleteModal.value = false;
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3">
        <SidebarMenu />
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Daftar Akun</span>
            <router-link :to="{ name: 'admin.users.create' }"
                         class="btn btn-sm btn-success rounded shadow-sm border-0">Tambah User</router-link>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white">
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Email Address</th>
                <th scope="col" style="width:17%">Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="users.length == 0">
                <td colspan="4" class="text-center">
                  <div class="alert alert-danger mb-0">
                    Data Belum Tersedia!
                  </div>
                </td>
              </tr>
              <tr v-else v-for="(user, index) in users" :key="index">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td class="text-center">
                  <router-link :to="{ name: 'admin.users.edit', params: { id: user.id } }"
                               class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                  <button @click="confirmDeleteUser(user)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Komponen modal konfirmasi delete -->
    <DeleteModal
        :show="showDeleteModal"
        :user-id="userToDelete.id"
        :user-name="userToDelete.name"
        @confirm="handleConfirmDelete"
        @cancel="handleCancelDelete"
    />
  </div>
</template>

