<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow mb-8 p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">Research App</router-link>
        <div v-if="isAuthenticated">
          <button
            @click="logout"
            class="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
        <div v-else class="space-x-4">
          <router-link
            to="/login"
            class="text-blue-500 hover:text-blue-700"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="text-blue-500 hover:text-blue-700"
          >
            Register
          </router-link>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const isAuthenticated = computed(() => !!store.state.token);
    
    const logout = async () => {
      await store.dispatch('logout');
      router.push('/login');
    };

    return {
      isAuthenticated,
      logout
    };
  }
};
</script>