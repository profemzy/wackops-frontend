<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">Research Dashboard</h2>
      
      <!-- New Research Form -->
      <div class="mb-8">
        <h3 class="text-xl mb-4">Ask a Question</h3>
        <form @submit.prevent="submitQuestion" class="max-w-2xl">
          <textarea
            v-model="newQuestion"
            class="w-full p-2 border rounded mb-4"
            rows="3"
            placeholder="Enter your research question..."
            required
          ></textarea>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Question
          </button>
        </form>
      </div>
  
      <!-- Research History -->
      <div>
        <h3 class="text-xl mb-4">Research History</h3>
        <div class="space-y-4">
          <div
            v-for="research in researches"
            :key="research.id"
            class="border rounded p-4"
          >
            <p class="font-bold mb-2">Q: {{ research.question }}</p>
            <p class="mb-2">A: {{ research.answer }}</p>
            <p class="text-sm text-gray-500">
              Created: {{ new Date(research.created_on).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  
  export default {
    setup() {
      const store = useStore();
      const newQuestion = ref('');
      const researches = computed(() => store.state.researches);
  
      onMounted(async () => {
        // Assuming we're getting the current user's research
        const username = store.state.user?.username;
        if (username) {
          await store.dispatch('fetchResearches', username);
        }
      });
  
      const submitQuestion = async () => {
        try {
          await store.dispatch('createResearch', newQuestion.value);
          newQuestion.value = '';
          // Refresh research history
          await store.dispatch('fetchResearches', store.state.user.username);
        } catch (error) {
          console.error('Failed to submit question:', error);
        }
      };
  
      return {
        newQuestion,
        researches,
        submitQuestion
      };
    }
  };
  </script>
  