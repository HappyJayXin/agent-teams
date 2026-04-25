<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <AppHeader
      :currentStep="currentStep"
      :canGoToStep="canGoToStep"
      :goToStep="goToStep"
    />

    <main>
      <div v-if="!apiKeyValid" class="max-w-4xl mx-auto px-4 pt-4">
        <div class="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl text-sm">
          <p class="font-semibold">需要 API 金鑰</p>
          <p>請在 <code class="bg-yellow-100 px-1 rounded">.env.local</code> 設定 <code class="bg-yellow-100 px-1 rounded">VITE_LLM_API_KEY</code></p>
        </div>
      </div>

      <StepRoles v-if="currentStep === 1" @next="goToStep(2)" />

      <StepDiscussion
        v-else-if="currentStep === 2"
        :topic="topic"
        :conversation="conversation"
        :isLoading="isLoading"
        :apiError="apiError"
        :maxResponseLength="maxResponseLength"
        :currentRound="currentRound"
        :maxRounds="maxRounds"
        @update:topic="topic = $event"
        @start="handleStart"
      />

      <StepResult
        v-else-if="currentStep === 3"
        :summary="summary"
        @save="saveConversation"
        @restart="handleRestart"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useLlmApi } from '@/services/llmApi';
import { useSteps } from '@/composables/useSteps';
import { useDiscussion } from '@/composables/useDiscussion';
import AppHeader from '@/components/AppHeader.vue';
import StepRoles from '@/components/StepRoles.vue';
import StepDiscussion from '@/components/StepDiscussion.vue';
import StepResult from '@/components/StepResult.vue';

const { validateApiKey } = useLlmApi();
const apiKeyValid = ref(false);

const {
  currentStep,
  canGoToStep,
  goToStep,
  markDiscussionStarted,
  markDiscussionComplete,
  reset
} = useSteps();

const {
  topic,
  conversation,
  currentRound,
  maxRounds,
  discussionComplete,
  summary,
  maxResponseLength,
  startDiscussion,
  saveConversation,
  apiError,
  isLoading
} = useDiscussion();

onMounted(() => {
  apiKeyValid.value = validateApiKey();
});

watch(discussionComplete, (val) => {
  if (val) markDiscussionComplete();
});

const handleStart = () => {
  markDiscussionStarted();
  startDiscussion();
};

const handleRestart = () => {
  reset();
  topic.value = '';
  conversation.value = [];
  summary.value = '';
  discussionComplete.value = false;
};
</script>
