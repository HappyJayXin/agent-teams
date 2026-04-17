<template>
  <div class="role-editor p-4 bg-gray-100 rounded-lg mb-4">
    <h2 class="text-xl font-bold mb-4">角色設定</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">英雄角色提示詞</label>
        <textarea
          v-model="heroPrompt"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">反派角色提示詞</label>
        <textarea
          v-model="villainPrompt"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          rows="4"
        ></textarea>
      </div>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">討論回合數</label>
      <input
        type="number"
        v-model.number="rounds"
        min="1"
        max="20"
        class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-24"
      />
    </div>

    <div class="mt-4 flex gap-2">
      <button
        @click="resetToDefaults"
        class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm"
      >
        重設為預設值
      </button>
    </div>

    <div v-if="showApiWarning" class="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm">
      <p class="font-medium">需要 API 金鑰</p>
      <p>請在 `.env.local` 檔案設定 LLM API 金鑰</p>
    </div>
  </div>
</template>

<script setup>
import { useRoles } from '@/composables/useRoles';
import { useLlmApi } from '@/services/llmApi';
import { ref } from 'vue';

const { validateApiKey } = useLlmApi();
const {
  heroPrompt,
  villainPrompt,
  defaultRounds: rounds,
  resetToDefaults
} = useRoles();

const showApiWarning = ref(!validateApiKey());
</script>
