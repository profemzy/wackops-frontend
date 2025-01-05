<template>
  <div class="text-display">
    <!-- Display Controls -->
    <div class="display-controls">
      <div class="control-group">
        <button 
          class="control-btn"
          :class="{ active: displayMode === 'raw' }"
          @click="displayMode = 'raw'"
        >
          Raw Text
        </button>
        <button 
          class="control-btn"
          :class="{ active: displayMode === 'formatted' }"
          @click="displayMode = 'formatted'"
        >
          Formatted
        </button>
      </div>
      
      <div class="control-group">
        <button 
          v-if="content"
          class="control-btn"
          @click="copyText"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
        <span class="character-count">
          {{ content?.length || 0 }} characters
        </span>
      </div>
    </div>

    <!-- Content Area -->
    <div class="content-area">
      <textarea
        v-if="displayMode === 'raw'"
        ref="textArea"
        class="text-content"
        :class="{ 'monospace': isCode }"
        :style="contentStyle"
        readonly
        :value="content"
      ></textarea>

      <div
        v-else
        class="formatted-content"
        :style="contentStyle"
        v-html="formattedText"
      ></div>
    </div>

    <!-- Settings Bar -->
    <div class="settings-bar">
      <div class="settings-group">
        <label class="setting-item">
          <input
            type="checkbox"
            v-model="wordWrap"
          >
          Word Wrap
        </label>
        <label class="setting-item">
          <input
            type="checkbox"
            v-model="isCode"
          >
          Monospace
        </label>
      </div>

      <div class="settings-group">
        <label class="setting-item">
          Font Size: {{ fontSize }}px
          <input
            type="range"
            v-model="fontSize"
            min="12"
            max="24"
            class="font-slider"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default {
  name: 'TextDisplay',
  
  props: {
    content: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    // Basic state
    const displayMode = ref('raw');
    const fontSize = ref(14);
    const wordWrap = ref(true);
    const isCode = ref(false);
    const copied = ref(false);

    // Computed styles
    const contentStyle = computed(() => ({
      fontSize: `${fontSize.value}px`,
      whiteSpace: wordWrap.value ? 'pre-wrap' : 'pre'
    }));

    // Format content with markdown
    const formattedText = computed(() => {
      if (!props.content) return '';
      const html = marked(props.content);
      return DOMPurify.sanitize(html);
    });

    // Copy text helper
    const copyText = async () => {
      try {
        await navigator.clipboard.writeText(props.content);
        copied.value = true;
        setTimeout(() => copied.value = false, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return {
      displayMode,
      fontSize,
      wordWrap,
      isCode,
      copied,
      contentStyle,
      formattedText,
      copyText
    };
  }
};
</script>

<style scoped>
.text-display {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.display-controls {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.control-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.control-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.control-btn.active {
  background: #e9ecef;
}

.content-area {
  min-height: 50vh;
  padding: 1rem;
}

.text-content,
.formatted-content {
  width: 100%;
  min-height: 50vh;
  border: none;
  resize: none;
  outline: none;
}

.monospace {
  font-family: monospace;
}

.settings-bar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  background: #f8f9fa;
}

.settings-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.setting-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
}

.font-slider {
  width: 100px;
  cursor: pointer;
}

.character-count {
  color: #6c757d;
  font-size: 0.875rem;
}
</style>