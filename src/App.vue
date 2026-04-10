<template>
  <div class="app-container min-h-screen bg-gray-50 p-4">
    <AppHeader />

    <div class="max-w-4xl mx-auto">
      <RoleEditor class="mb-6" />

      <div v-if="!apiKeyValid" class="api-key-warning mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
        <p class="font-medium">API Key Required</p>
        <p class="text-sm">Please configure your Mistral API key in the .env.local file</p>
        <code class="text-xs bg-yellow-200 p-1 rounded">VITE_MISTRAL_API_KEY=your_api_key_here</code>
      </div>

      <DiscussionPanel />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMistralApi } from '@/services/mistralApi';
import AppHeader from '@/components/AppHeader.vue';
import RoleEditor from '@/components/RoleEditor.vue';
import DiscussionPanel from '@/components/DiscussionPanel.vue';

const { validateApiKey } = useMistralApi();
const apiKeyValid = ref(false);

onMounted(() => {
  apiKeyValid.value = validateApiKey();
});
</script>

<style>
.app-container {
  font-family: 'Inter', sans-serif;
}

@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }
}
</style>
