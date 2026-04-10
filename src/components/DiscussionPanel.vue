<template>
  <div class="discussion-panel">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Discussion Topic</label>
      <input
        v-model="topic"
        type="text"
        placeholder="Enter topic to discuss"
        class="w-full p-2 border border-gray-300 rounded-md"
        @keyup.enter="startDiscussion"
      />
      <button
        @click="startDiscussion"
        :disabled="isLoading"
        class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {{ isLoading ? 'Discussing...' : 'Start Discussion' }}
      </button>
    </div>

    <div v-if="apiError" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
      {{ apiError }}
    </div>

    <div class="conversation-area mb-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
      <div v-if="conversation.length === 0 && !isLoading" class="text-gray-500">
        Discussion will appear here...
      </div>

      <div v-for="(item, index) in conversation" :key="index" class="message mb-3 p-3 rounded-lg" :class="{
        'bg-blue-100': item.role === 'hero',
        'bg-red-100': item.role === 'villain'
      }">
        <div class="font-bold text-sm" :class="{
          'text-blue-800': item.role === 'hero',
          'text-red-800': item.role === 'villain'
        }">
          {{ item.role === 'hero' ? 'Hero' : 'Villain' }}
        </div>
        <div class="mt-1 text-sm">{{ item.content }}</div>
      </div>

      <div v-if="isLoading && conversation.length > 0" class="text-gray-500 text-sm">
        Thinking...
      </div>
    </div>

    <div v-if="discussionComplete" class="results-area mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-bold mb-2">Discussion Results</h3>

      <div class="mb-4">
        <h4 class="font-semibold mb-1">Summary:</h4>
        <p class="text-sm">{{ summary }}</p>
      </div>

      <div class="mb-4">
        <h4 class="font-semibold mb-1">Key Points:</h4>
        <ul class="list-disc list-inside text-sm">
          <li v-for="(point, index) in points" :key="index">{{ point }}</li>
        </ul>
      </div>

      <button
        @click="saveConversation"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Save Discussion
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
  startDiscussion,
  saveConversation,
  apiError,
  isLoading
} = useDiscussion();
</script>