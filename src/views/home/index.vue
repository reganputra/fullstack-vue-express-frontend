<script setup>

</script>

<template>
  <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Web Manajemn Akun</h1>
      <p class="col-md-12 fs-4">UTS Pemrograman API</p>
      <hr/>
      <router-link :to="{ name: 'register' }" class="btn btn-primary btn-lg me-3">REGISTER</router-link>
      <router-link :to="{ name: 'login' }" class="btn btn-secondary btn-lg">LOGIN</router-link>
    </div>
  </div>
</template>