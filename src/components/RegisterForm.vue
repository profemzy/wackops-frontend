<template>
    <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Register</h2>
      <div class="mb-4">
        <label class="block mb-2">Username:</label>
        <input
          v-model="userData.username"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Email:</label>
        <input
          v-model="userData.email"
          type="email"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Password:</label>
        <input
          v-model="userData.password"
          type="password"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
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
      const userData = ref({
        username: '',
        email: '',
        password: ''
      });
      const error = ref('');
  
      const handleSubmit = async () => {
        try {
          await store.dispatch('register', userData.value);
          router.push('/login');
        } catch (err) {
          error.value = err.response?.data?.error || 'Registration failed';
        }
      };
  
      return {
        userData,
        error,
        handleSubmit
      };
    }
  };
  </script>