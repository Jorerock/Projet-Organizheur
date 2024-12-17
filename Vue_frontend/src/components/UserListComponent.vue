<template>
  <div class="flex h-screen">
    <!-- Colonne de gauche - Liste des ItemCards -->
    <div class="w-1/5 p-4 bg-gray-50 overflow-y-auto border-r">
      <div class="space-y-4">
        <ItemCard 
          v-for="list in listsTab" 
          :key="list.List_ID"
          :title="list.List_Name"
          :clickable="true"
          @card-click="handlelistClick(list)"
        >
          <!-- Additional info slot for list details -->
          <template #additionalInfo>
            <div class="flex justify-between items-center mt-2">
              <span 
                class="px-2 py-1 rounded text-xs font-bold" 
                :class="{
                  'bg-green-500 text-white': list.List_End === true,
                  'bg-blue-500 text-white': list.List_End === false
                }"
              >
                {{ list.List_End ? 'Terminé' : 'En cours' }}
              </span>
              <span v-if="list.List_End_Date" class="text-xs text-gray-600">
                Date: {{ formatDate(list.List_End_Date) }}
              </span>
            </div>
          </template>
        </ItemCard>


        <!-- Message si aucune liste -->
        <div v-if="listsTab.length === 0" class="text-center text-gray-500 p-4">
          Oups, on dirait qu'il n'y a pas de liste
        </div>
      </div>
    </div>

    <!-- Colonne de droite - Composant Todos -->
    <div class="w-2/3 p-4 bg-white overflow-y-auto">
      <div class="todos-container">
    <ItemCard 
      v-for="todo in todosTab" 
      :key="todo.Todo_ID"
      :title="todo.Todo_Name"
      :description="todo.description"
      :clickable="true"

    >
      <!-- Additional info slot for todo details -->
      <template #additionalInfo>
        <div class="todo-additional-info">
          <span 
            class="todo-status" 
            :class="{
              'status-completed': todo.Todo_end === true,
              'status-in-progress': todo.Todo_end === false
            }"
          >
            {{ todo.Todo_end }}
          </span>
          <span v-if="todo.Todo_Echeance_date" class="todo-due-date">
            Due: {{ formatDate(todo.Todo_Echeance_date) }}
          </span>
        </div>
      </template>
      
      <!-- Actions slot for todo interactions -->
      <template #actions>
        <div class="todo-actions">
          <button 
            @click.stop="markTodoComplete(todo)" 
            v-if="todo.Todo_end !== 0"
          >
            Fait
          </button>
          <button 
            @click.stop="editTodo(todo)"
          >
            Modifier
          
          </button>
        </div>
      </template>
    </ItemCard>

    <!-- No todos message -->
    <div v-if="todosTab.length === 0" class="no-todos">
      Pas de Todos trouvé
    </div>
  </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import Todos from '../components/TodosPageComponent2.vue'
import * as cookie from './Cookie'
import { Todo } from '../models/todo';
import { list } from 'postcss';


interface List {
  List_ID: number;
  List_Name: string;
  List_Created_Date?: Date;
  Personelles: boolean;
  List_End_Date?: string;
  list_Created_date?:Date;
  List_End:boolean
  Employe_ID:number;
  Categorie_ID:number;
  Employe_ID_1:number
}

const listsTab = ref<List[]>([])
const Employe_id = cookie.getCookie("Employe_ID")

onMounted(async () => {
  try {
    const listsRequest = await fetch(`http://localhost:3000/list/${Employe_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Access-Control-Allow-Methods": "GET, OPTIONS", 
        'Content-Type': 'application/json',
      }
    })
   
    if (!listsRequest.ok) {
      throw new Error(`HTTP error! status: ${listsRequest.status}`);
    }
   
    const lists = await listsRequest.json();
    listsTab.value = [...lists];
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
});

const todosTab = ref<Todo[]>([])


const GetTodo = async (list: List) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/Bylist/${list.List_ID}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Access-Control-Allow-Methods": "GET, OPTIONS", 
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()

    if (response.ok) {
      todosTab.value = [...data];
        console.log(todosTab)

    } else {
      throw new Error(data.message || 'Cannot find any todo')
    }
  } catch (error) {
    console.error('Todos error:', error)
    todosTab.value = []

}
}

// Méthodes 
const handlelistClick = (list: List) => {
  console.log('Id of this list:', list.List_ID);
  GetTodo(list)
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
        todosTab.value[index].Todo_end = true;
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

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', {
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