import { ref } from 'vue';
import { useApiService } from '@/services/apiService';
import { useRoles } from '@/composables/useRoles';

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

  const startDiscussion = async () => {
    if (!validateApiKey()) {
      apiError.value = 'Please configure a valid Mistral API key';
      return;
    }

    if (!topic.value.trim()) {
      apiError.value = 'Please enter a discussion topic';
      return;
    }

    conversation.value = [];
    currentRound.value = 0;
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
    const response = await getAiResponse(rolePrompt, message);

    if (response) {
      conversation.value.push({
        role,
        content: response,
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
      Based on the following discussion, provide a concise summary and key points:

      Discussion:
      ${conversationText}

      Please provide:
      1. A brief summary (2-3 sentences)
      2. Key points in bullet format
    `;

    const result = await getAiResponse('You are a helpful assistant that summarizes discussions.', summaryPrompt);

    if (result) {
      const [summaryPart, pointsPart] = result.split('\n\n');
      summary.value = summaryPart || 'No summary available';
      points.value = pointsPart ? pointsPart.split('\n').filter(p => p.trim()).map(p => p.replace(/^\-?\s*/, '')) : [];
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

    // Save to local storage
    const history = JSON.parse(localStorage.getItem('discussionHistory') || '[]');
    history.push(conversationData);
    localStorage.setItem('discussionHistory', JSON.stringify(history));

    return conversationData;
  };

  return {
    topic,
    conversation,
    currentRound,
    maxRounds,
    discussionComplete,
    summary,
    points,
    startDiscussion,
    saveConversation,
    apiError,
    isLoading
  };
}