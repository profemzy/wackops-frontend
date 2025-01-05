<template>
  <div id="app">
    <header class="app-header">
      <h1>Welcome to WackOps</h1>
    </header>
    <main class="container">
      <QuestionInput @answer-received="handleAnswer" />
      <TextDisplay v-if="answer" :content="answer" />
    </main>
  </div>
</template>

<script>
import TextDisplay from '@/components/TextDisplay.vue';
import QuestionInput from '@/components/QuestionInput.vue';

export default {
  name: 'App',
  components: {
    TextDisplay,
    QuestionInput
  },
  data() {
    return {
      answer: ''
    };
  },
  methods: {
    handleAnswer(newAnswer) {
      this.answer = newAnswer;
    }
  }
};
</script>

<style>
.app-header {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>