const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

export const useTextService = () => {
  const processText = async (text, options = {}) => {
    try {
      const response = await fetch(`${API_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(options.token && { 'Authorization': `Bearer ${options.token}` })
        },
        body: JSON.stringify({ text, ...options })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing text:', error);
      throw new Error('Failed to process text');
    }
  };

  return {
    processText
  };
};