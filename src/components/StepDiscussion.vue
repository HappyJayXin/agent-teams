<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4">
      <label class="block text-sm font-semibold text-gray-800 mb-2">討論主題</label>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          v-model="localTopic"
          type="text"
          placeholder="請輸入討論主題"
          class="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
        />
        <button
          @click="$emit('start')"
          :disabled="isLoading"
          class="px-5 py-2.5 text-sm bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
        >
          <svg v-if="isLoading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? '討論中...' : '開始討論' }}
        </button>
      </div>
      <p class="mt-1.5 text-xs text-gray-400">每輪 AI 回覆限制 {{ maxResponseLength }} 字以內</p>
    </div>

    <div v-if="apiError" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2">
      <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>
      {{ apiError }}
    </div>

    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold text-gray-900">討論紀錄</h3>
          <p class="text-xs text-gray-400">每輪限制 {{ maxResponseLength }} 字</p>
        </div>
        <span class="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full">
          第 {{ displayRound }} / {{ maxRounds }} 輪
        </span>
      </div>

      <div class="p-4 max-h-[28rem] overflow-y-auto" aria-live="polite">
        <div v-if="conversation.length === 0 && !isLoading" class="border border-dashed border-gray-200 rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-400">
          對話內容會顯示在這裡...
        </div>

        <div
          v-for="(item, index) in conversation"
          :key="index"
          class="mb-3 flex"
          :class="item.role === 'hero' ? 'justify-start' : 'justify-end'"
        >
          <div v-if="item.role === 'hero'" class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 mr-2 mt-1 shrink-0">A</div>
          <article
            class="max-w-[80%] rounded-2xl border px-4 py-3 shadow-sm text-sm"
            :class="item.role === 'hero'
              ? 'bg-blue-50 border-blue-100 text-blue-950 rounded-tl-sm'
              : 'bg-rose-50 border-rose-100 text-rose-950 rounded-tr-sm'"
          >
            <div class="flex flex-wrap items-center gap-2 mb-1.5 text-xs font-semibold">
              <span :class="item.role === 'hero' ? 'text-blue-600' : 'text-rose-500'">
                {{ item.role === 'hero' ? '角色 A' : '角色 B' }}
              </span>
              <span class="text-gray-400 font-normal">第 {{ index + 1 }} 則 · {{ formatTime(item.timestamp) }}</span>
            </div>
            <p class="whitespace-pre-wrap break-words leading-relaxed">{{ item.content }}</p>
          </article>
          <div v-if="item.role !== 'hero'" class="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-xs font-bold text-pink-500 ml-2 mt-1 shrink-0">B</div>
        </div>

        <div v-if="isLoading && conversation.length > 0" class="text-center text-xs text-gray-400 py-2">
          第 {{ displayRound }} / {{ maxRounds }} 輪 · 思考中...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  topic: { type: String, required: true },
  conversation: { type: Array, required: true },
  isLoading: { type: Boolean, default: false },
  apiError: { type: String, default: '' },
  maxResponseLength: { type: Number, default: 100 },
  currentRound: { type: Number, default: 0 },
  maxRounds: { type: Number, default: 10 }
});

const emit = defineEmits(['update:topic', 'start']);

const localTopic = computed({
  get: () => props.topic,
  set: (val) => emit('update:topic', val)
});

const displayRound = computed(() => Math.min(props.currentRound + 1, props.maxRounds));

const formatTime = (ts) =>
  new Intl.DateTimeFormat('zh-TW', { hour: '2-digit', minute: '2-digit' }).format(new Date(ts));
</script>
