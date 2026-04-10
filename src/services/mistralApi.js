import { ref } from 'vue';

export function useMistralApi() {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  const baseUrl = 'https://api.mistral.ai/v1/chat/completions';
  const error = ref(null);
  const isLoading = ref(false);

  const validateApiKey = () => {
    return apiKey && apiKey.length > 20;
  };

  const callMistralApi = async (messages, model = 'mistral-small-latest') => {
    if (!validateApiKey()) {
      error.value = 'Invalid API key';
      return null;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      error.value = err.message;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    validateApiKey,
    callMistralApi,
    error,
    isLoading,
  };
}