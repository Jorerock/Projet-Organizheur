<template>
    <div class="todo-list">
      <h1>Liste des Todos</h1>
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else class="todos">
        <div 
          v-for="todo in todos" 
          :key="todo.id" 
          class="todo-card"
        >
          <label class="todo-item">
            <input 
              type="checkbox" 
              :checked="todo.completed"
              @change="toggleTodoStatus(todo)"
            />
            <span :class="{ 'completed': todo.completed }">
              {{ todo.title }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Todo } from '@/types/Todo';
  import { todoService } from '@/services/todoService';
  
  const todos = ref<Todo[]>([]);
  const loading = ref(true);
  
  const fetchTodos = async () => {
    todos.value = await todoService.fetchTodos();
    loading.value = false;
  };
  
  const toggleTodoStatus = async (todo: Todo) => {
    todo.completed = !todo.completed;
    await todoService.updateTodo(todo);
  };
  
  onMounted(fetchTodos);
  </script>
  
  <style scoped>
  .todo-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .todo-card {
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .completed {
    text-decoration: line-through;
    color: #888;
  }
  
  .loading {
    text-align: center;
    color: #666;
  }
  </style>
  
  // src/App.vue
  <template>
    <div id="app">
      <TodoList />
    </div>
  </template>
  
  <script setup lang="ts">
  import TodoList from '@/components/TodoList.vue';
  </script>
  
  // vite.config.ts
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';
  import path from 'path';
  
  export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  });