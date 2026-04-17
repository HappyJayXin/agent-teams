import { useLlmApi } from './llmApi';

export function useApiService() {
  const { callLlmApi, validateApiKey, error, isLoading } = useLlmApi();

  const getAiResponse = async (rolePrompt, userMessage) => {
    const messages = [
      { role: 'system', content: rolePrompt },
      { role: 'user', content: userMessage },
    ];

    return await callLlmApi(messages);
  };

  return {
    validateApiKey,
    getAiResponse,
    error,
    isLoading,
  };
}