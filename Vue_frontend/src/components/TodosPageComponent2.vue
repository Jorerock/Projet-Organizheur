<template>
 ttest
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ItemCard from '../components/ItemCard.vue'

// Define Todo interface
interface Todo {
  Todo_ID: number
  Todo_Name: string
  description?: string
  Todo_end: number
  Todo_Echeance_date?: string
}
import * as cookie from './Cookie';

const todosTab = ref<Todo[]>([])
  const Employe_id = cookie.getCookie("Employe_ID")

// Fetch todos
onMounted(async () => {
  try {
    const TodosRequest = await fetch(`http://localhost:3000/todos/${Employe_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        'Content-Type': 'application/json',
      }
    });
    if (!TodosRequest.ok) {
      throw new Error(`HTTP error! status: ${TodosRequest.status}`);
    }
    const Todos = await TodosRequest.json();
    console.log(Todos.value)
    todosTab.value = [...Todos];
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
});

// Methods for todo interactions
const handleTodoClick = (todo: Todo) => {
  console.log('Todo clicked:', todo);
  console.log('Todo ID:', todo.Todo_ID);

  // Add any specific click handling logic
}

const markTodoComplete = async (todo: Todo) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${todo.Todo_ID}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 1 })
    });

    if (response.ok) {
      // Update local state
      const index = todosTab.value.findIndex(t => t.Todo_ID === todo.Todo_ID);
      if (index !== -1) {
        todosTab.value[index].Todo_end = 1;
      }
    }
  } catch (error) {
    console.error('Error marking todo complete:', error);
  }
}

const editTodo = (todo: Todo) => {
  console.log('Edit todo:', todo);
  // Implement edit todo logic (e.g., open a modal, navigate to edit page)
  
}

// Utility method to format date
const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
</script>

<style scoped>
.todos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.todo-additional-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.todo-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status-completed {
  background-color: #4caf50;
  color: white;
}

.status-pending {
  background-color: #ff9800;
  color: white;
}

.status-in-progress {
  background-color: #2196f3;
  color: white;
}

.todo-due-date {
  color: #666;
  font-size: 0.8rem;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.no-todos {
  text-align: center;
  color: #888;
  padding: 20px;
}
</style>