import { ref } from 'vue';

export function useLlmApi() {
  const apiKey = import.meta.env.VITE_LLM_API_KEY;
  const baseUrl = import.meta.env.VITE_LLM_BASE_URL;
  const defaultModel = import.meta.env.VITE_LLM_DEFAULT_MODEL || 'qwen3.5-plus';
  const error = ref(null);
  const isLoading = ref(false);

  const validateApiKey = () => {
    return apiKey && apiKey.length > 10;
  };

  const callLlmApi = async (messages, model = defaultModel) => {
    if (!validateApiKey()) {
      error.value = 'API 金鑰無效';
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
        throw new Error(`API 請求失敗：${response.status}`);
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
    callLlmApi,
    error,
    isLoading,
  };
}
