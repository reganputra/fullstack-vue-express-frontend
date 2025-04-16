<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  userName: {
    type: String,
    default: ''
  },
  userId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirmDelete = () => {
  emit('confirm', props.userId);
};

const cancelDelete = () => {
  emit('cancel');
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="delete-confirmation-modal">
      <div class="modal-header">
        <h5 class="modal-title">Konfirmasi Penghapusan</h5>
        <button type="button" class="btn-close" @click="cancelDelete" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Apakah Anda yakin ingin menghapus akun <strong>{{ userName }}</strong>?</p>
        <p class="text-danger">Tindakan ini tidak dapat dibatalkan.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="cancelDelete">Batal</button>
        <button type="button" class="btn btn-danger" @click="confirmDelete">Hapus</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-confirmation-modal {
  background-color: white;
  border-radius: 6px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  border-top: 1px solid #dee2e6;
}
</style>