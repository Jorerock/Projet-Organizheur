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
      <Todos />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import Todos from '../components/TodosPageComponent2.vue'
import * as cookie from './Cookie'

// Même interface et logique que votre code original
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

// Fetch lists - même logique que votre code original
onMounted(async () => {
  try {
    const listsRequest = await fetch(`http://localhost:3000/list/${Employe_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        'Content-Type': 'application/json',
      }
    });
   
    if (!listsRequest.ok) {
      throw new Error(`HTTP error! status: ${listsRequest.status}`);
    }
   
    const lists = await listsRequest.json();
    listsTab.value = [...lists];
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
});

// Méthodes - même logique que votre code original
const handlelistClick = (list: List) => {
  console.log('list clicked:', list);
  console.log('Id of this list:', list.List_ID);
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