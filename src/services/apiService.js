import { useMistralApi } from './mistralApi';

export function useApiService() {
  const { callMistralApi, validateApiKey, error, isLoading } = useMistralApi();

  const getAiResponse = async (rolePrompt, userMessage) => {
    const messages = [
      { role: 'system', content: rolePrompt },
      { role: 'user', content: userMessage },
    ];

    return await callMistralApi(messages);
  };

  return {
    validateApiKey,
    getAiResponse,
    error,
    isLoading,
  };
}