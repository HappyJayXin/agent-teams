import { ref } from 'vue';
import { useApiService } from '@/services/apiService';
import { useRoles } from '@/composables/useRoles';
import { saveToHistory } from '@/utils/storage';

export function useDiscussion() {
  const { getAiResponse, validateApiKey, error: apiError, isLoading } = useApiService();
  const { heroPrompt, villainPrompt, defaultRounds } = useRoles();

  const topic = ref('');
  const conversation = ref([]);
  const currentRound = ref(0);
  const maxRounds = ref(defaultRounds.value);
  const discussionComplete = ref(false);
  const summary = ref('');
  const points = ref([]);
  const maxResponseLength = 100;

  const startDiscussion = async () => {
    if (!validateApiKey()) {
      apiError.value = '請先設定有效的 Mistral API 金鑰';
      return;
    }

    if (!topic.value.trim()) {
      apiError.value = '請輸入討論主題';
      return;
    }

    conversation.value = [];
    currentRound.value = 0;
    maxRounds.value = defaultRounds.value;
    discussionComplete.value = false;
    summary.value = '';
    points.value = [];

    // Start with hero
    await getNextResponse('hero', topic.value);
  };

  const getNextResponse = async (role, message) => {
    if (currentRound.value >= maxRounds.value) {
      await generateSummary();
      return;
    }

    const rolePrompt = role === 'hero' ? heroPrompt.value : villainPrompt.value;
    const lengthRulePrompt = `請用繁體中文回覆，且每次回覆嚴格控制在 ${maxResponseLength} 字以內。不要超過上限，不要附加多餘說明。`;
    const response = await getAiResponse(`${rolePrompt}\n${lengthRulePrompt}`, message);

    if (response) {
      conversation.value.push({
        role,
        content: response.trim(),
        timestamp: new Date().toISOString()
      });

      currentRound.value++;

      // Alternate roles
      const nextRole = role === 'hero' ? 'villain' : 'hero';
      const lastMessage = conversation.value[conversation.value.length - 1].content;

      if (currentRound.value < maxRounds.value) {
        await getNextResponse(nextRole, lastMessage);
      } else {
        await generateSummary();
      }
    }
  };

  const generateSummary = async () => {
    const conversationText = conversation.value.map(item => `${item.role}: ${item.content}`).join('\n');

    const summaryPrompt = `
      你是一位中立的第三方觀察者，請根據以下討論內容，以客觀、中立的角度提供精簡摘要與重點。

      討論內容：
      ${conversationText}

      輸出：
      1. 100 字客觀摘要，不偏袒任何一方。
      2. 下決策，應該如何做。
    `;

    const result = await getAiResponse('你是一位中立的第三方觀察者，擅長客觀分析討論內容。', summaryPrompt);

    if (result) {
      summary.value = result;
      discussionComplete.value = true;
    }
  };

  const saveConversation = () => {
    if (!conversation.value.length) return;

    const conversationData = {
      id: Date.now().toString(),
      topic: topic.value,
      timestamp: new Date().toISOString(),
      roles: {
        hero: heroPrompt.value,
        villain: villainPrompt.value
      },
      rounds: maxRounds.value,
      conversation: conversation.value,
      summary: summary.value,
      points: points.value
    };

    return saveToHistory(conversationData);
  };

  return {
    topic,
    conversation,
    currentRound,
    maxRounds,
    discussionComplete,
    summary,
    points,
    maxResponseLength,
    startDiscussion,
    saveConversation,
    apiError,
    isLoading
  };
}
