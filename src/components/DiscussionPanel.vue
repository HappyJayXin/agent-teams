<template>
  <div class="discussion-panel">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">討論主題</label>
      <input
        v-model="topic"
        type="text"
        placeholder="輸入討論主題"
        class="w-full p-2 border border-gray-300 rounded-md"
      />
      <p class="mt-1 text-xs text-gray-500">規則：每輪 AI 回覆會要求控制在 {{ maxResponseLength }} 字以內</p>
      <button
        @click="startDiscussion"
        :disabled="isLoading"
        class="mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm flex items-center justify-center"
      >
        <span v-if="isLoading" class="mr-2">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        {{ isLoading ? '討論中...' : '開始討論' }}
      </button>
    </div>

    <div v-if="apiError" class="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-center">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>
      <span>{{ apiError }}</span>
    </div>

    <div class="conversation-area mb-4 max-h-[32rem] overflow-y-auto border border-gray-200 rounded-2xl p-4 bg-white">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h3 class="text-base font-bold text-gray-900">討論紀錄</h3>
          <p class="text-xs text-gray-500">每輪 AI 回覆限制：{{ maxResponseLength }} 字以內</p>
        </div>
        <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {{ conversation.length }} 則訊息
        </span>
      </div>

      <div v-if="conversation.length === 0 && !isLoading" class="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
        對話內容會顯示在這裡...
      </div>

      <div
        v-for="(item, index) in conversation"
        :key="index"
        class="mb-3 flex"
        :class="item.role === 'proponent' ? 'justify-start' : 'justify-end'"
      >
        <article
          class="max-w-[85%] rounded-2xl border px-4 py-3 shadow-sm"
          :class="item.role === 'proponent'
            ? 'border-blue-100 bg-blue-50 text-blue-950'
            : 'border-rose-100 bg-rose-50 text-rose-950'"
        >
          <div class="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
            <span
              class="inline-flex h-6 items-center rounded-full px-2"
              :class="item.role === 'proponent' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'"
            >
              {{ item.role === 'proponent' ? '正方' : '反方' }}
            </span>
            <span class="text-gray-500">第 {{ index + 1 }} 則</span>
            <span class="text-gray-400">{{ formatTime(item.timestamp) }}</span>
          </div>
          <p class="whitespace-pre-wrap break-words text-sm leading-6">
            {{ item.content }}
          </p>
        </article>
      </div>

      <div v-if="isLoading && conversation.length > 0" class="text-center text-sm text-gray-500">
        思考中...
      </div>
    </div>

    <div v-if="discussionComplete" class="results-area mt-6 p-4">
      <h3 class="text-lg font-bold mb-2">討論結果</h3>
      <p class="text-sm whitespace-pre-wrap">{{ summary }}</p>
      <button
        @click="saveConversation"
        class="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm"
      >
        儲存討論
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDiscussion } from '@/composables/useDiscussion';

const {
  topic,
  conversation,
  discussionComplete,
  summary,
  points,
  maxResponseLength,
  startDiscussion,
  saveConversation,
  apiError,
  isLoading
} = useDiscussion();

const formatTime = (timestamp) =>
  new Intl.DateTimeFormat('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(timestamp));
</script>
