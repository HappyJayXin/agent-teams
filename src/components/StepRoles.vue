<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">A</div>
          <span class="text-sm font-semibold text-gray-800">角色 A 提示詞</span>
        </div>
        <textarea
          v-model="heroPrompt"
          rows="4"
          class="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all resize-none"
        ></textarea>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-bold text-pink-500">B</div>
          <span class="text-sm font-semibold text-gray-800">角色 B 提示詞</span>
        </div>
        <textarea
          v-model="villainPrompt"
          rows="4"
          class="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all resize-none"
        ></textarea>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 flex items-center gap-4">
      <span class="text-sm font-semibold text-gray-800">討論回合數</span>
      <div class="flex items-center gap-3">
        <button
          @click="decRounds"
          class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          aria-label="減少回合數"
        >-</button>
        <span class="w-8 text-center text-sm font-bold text-gray-900">{{ rounds }}</span>
        <button
          @click="incRounds"
          class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          aria-label="增加回合數"
        >+</button>
      </div>
    </div>

    <div class="flex justify-between items-center gap-3">
      <button
        @click="resetToDefaults"
        class="px-5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
      >
        重設為預設值
      </button>
      <button
        @click="$emit('next')"
        class="px-5 py-2.5 text-sm bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
      >
        下一步：設定主題
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoles } from '@/composables/useRoles';

defineEmits(['next']);

const { heroPrompt, villainPrompt, defaultRounds, resetToDefaults } = useRoles();
const rounds = defaultRounds;

const decRounds = () => {
  if (rounds.value > 1) rounds.value--;
};

const incRounds = () => {
  if (rounds.value < 20) rounds.value++;
};
</script>
