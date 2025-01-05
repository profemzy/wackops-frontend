<template>
    <div class="question-input">
      <form @submit.prevent="submitQuestion" class="input-form">
        <div class="input-group">
          <textarea
            v-model="question"
            class="question-textarea"
            placeholder="Type your question here..."
            :disabled="isLoading"
            rows="4"
          ></textarea>
        </div>
        
        <div class="button-group">
          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isLoading || !question.trim()"
          >
            {{ isLoading ? 'Getting Answer...' : 'Get Answer' }}
          </button>
          <button 
            type="button" 
            class="clear-btn"
            @click="clearQuestion"
            :disabled="isLoading || !question"
          >
            Clear
          </button>
        </div>
  
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useTextService } from '@/services/TextService';
  
  export default {
    name: 'QuestionInput',
    emits: ['answer-received'],
    
    setup(props, { emit }) {
      const textService = useTextService();
      const question = ref('');
      const isLoading = ref(false);
      const error = ref('');
  
      const submitQuestion = async () => {
        if (!question.value.trim()) return;
        
        error.value = '';
        isLoading.value = true;
        
        try {
          const response = await textService.processText(question.value);
          emit('answer-received', response.answer);
        } catch (err) {
          error.value = 'Failed to get answer. Please try again.';
          console.error('Error:', err);
        } finally {
          isLoading.value = false;
        }
      };
  
      const clearQuestion = () => {
        question.value = '';
        error.value = '';
      };
  
      return {
        question,
        isLoading,
        error,
        submitQuestion,
        clearQuestion
      };
    }
  };
  </script>
  
  <style scoped>
  .question-input {
    margin-bottom: 2rem;
  }
  
  .input-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .question-textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 1rem;
    resize: vertical;
    min-height: 100px;
  }
  
  .question-textarea:focus {
    outline: none;
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
  }
  
  .submit-btn,
  .clear-btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .submit-btn {
    background-color: #0d6efd;
    color: white;
  }
  
  .submit-btn:hover:not(:disabled) {
    background-color: #0b5ed7;
  }
  
  .clear-btn {
    background-color: #6c757d;
    color: white;
  }
  
  .clear-btn:hover:not(:disabled) {
    background-color: #5c636a;
  }
  
  .submit-btn:disabled,
  .clear-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  </style>
  