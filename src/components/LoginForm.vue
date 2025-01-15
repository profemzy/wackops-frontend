<template>
    <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Login</h2>
      <div class="mb-4">
        <label class="block mb-2">Identity:</label>
        <input
          v-model="credentials.identity"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Password:</label>
        <input
          v-model="credentials.password"
          type="password"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
      const credentials = ref({
        identity: '',
        password: ''
      });
      const error = ref('');
  
      const handleSubmit = async () => {
        try {
          await store.dispatch('login', credentials.value);
          router.push('/research');
        } catch (err) {
          error.value = err.response?.data?.error?.message || 'Login failed';
        }
      };
  
      return {
        credentials,
        error,
        handleSubmit
      };
    }
  };
  </script>