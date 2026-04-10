<template>
  <div class="role-editor p-4 bg-gray-100 rounded-lg mb-4">
    <h2 class="text-xl font-bold mb-4">Role Settings</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Hero Role Prompt</label>
        <textarea
          v-model="heroPrompt"
          class="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Villain Role Prompt</label>
        <textarea
          v-model="villainPrompt"
          class="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
        ></textarea>
      </div>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Discussion Rounds</label>
      <input
        type="number"
        v-model.number="rounds"
        min="1"
        max="20"
        class="p-2 border border-gray-300 rounded-md w-24"
      />
    </div>

    <div class="mt-4 flex gap-2">
      <button
        @click="resetToDefaults"
        class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Reset to Defaults
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoles } from '@/composables/useRoles';

const {
  heroPrompt,
  villainPrompt,
  defaultRounds: rounds,
  resetToDefaults
} = useRoles();
</script>