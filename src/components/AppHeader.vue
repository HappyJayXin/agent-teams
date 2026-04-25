<template>
  <header class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
    <div class="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-base font-bold text-[#1E3A5F] leading-tight">AI 角色討論平台</h1>
        <p class="text-xs text-gray-400">讓兩個 AI 角色辯論並找出共識</p>
      </div>

      <div class="flex border border-gray-200 rounded-lg overflow-hidden text-xs font-semibold w-full sm:w-auto" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.step"
          @click="goToStep(tab.step)"
          :disabled="!canGoToStep(tab.step)"
          :class="[
            'flex-1 sm:flex-none px-3 py-2 transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2',
            currentStep === tab.step
              ? 'bg-[#2563EB] text-white'
              : canGoToStep(tab.step)
                ? 'text-gray-500 hover:bg-gray-50'
                : 'text-gray-300 cursor-not-allowed'
          ]"
          :aria-selected="currentStep === tab.step"
          role="tab"
        >
          <span class="hidden sm:inline">{{ tab.label }}</span>
          <span class="sm:hidden">{{ tab.shortLabel }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  currentStep: { type: Number, required: true },
  canGoToStep: { type: Function, required: true },
  goToStep: { type: Function, required: true }
});

const tabs = [
  { step: 1, label: '① 角色設定', shortLabel: '設定' },
  { step: 2, label: '② 討論', shortLabel: '討論' },
  { step: 3, label: '③ 結果', shortLabel: '結果' }
];
</script>
