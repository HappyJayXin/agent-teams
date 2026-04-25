<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
      <h3 class="text-sm font-bold text-gray-900 mb-3">討論摘要</h3>
      <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{{ summary }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <p class="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">共識點</p>
        <p class="text-sm text-emerald-800">雙方均認同的核心觀點。</p>
      </div>
      <div class="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <p class="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">分歧點</p>
        <p class="text-sm text-orange-800">雙方仍存在差異的觀點。</p>
      </div>
    </div>

    <div class="flex justify-between items-center gap-3">
      <button
        @click="$emit('save')"
        class="px-5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
      >
        儲存討論記錄
      </button>
      <button
        @click="$emit('restart')"
        class="px-5 py-2.5 text-sm bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
      >
        重新開始討論
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  summary: { type: String, default: '' }
});

defineEmits(['save', 'restart']);
</script>
