<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ReusableTable from './ReusableTable.vue';
import { Employe } from '../models/employe';



export default {
    name: 'ParentComponent',
    components: {
    ReusableTable
  },
  setup() {
    const headers = ref<string[]>([
      'Categorie_ID',
      'Categorie_Name',
      'Employe_ID'
      ]);
    const apiUrl = ref<string>('http://localhost:3000/Categorie');
    const Utilisateur = ref<Employe[]>([])

    // Fetch initial data
    onMounted(async () => {
        try {
            const usersRequest = await fetch('http://localhost:3000/Categorie/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                'Content-Type': 'application/json',
                }
            });
            
            if (!usersRequest.ok) {
                throw new Error(`HTTP error! status: ${usersRequest.status}`);
            }
            
            const users = await usersRequest.json();
            Utilisateur.value = [...users];
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    
    const handleItemCreated = (newItem: Employe): void => {
        Utilisateur.value.push(newItem);
    };

    const handleItemUpdated = (updatedItem: Employe): void => {
      const index = Utilisateur.value.findIndex(
        item => item.Employe_ID === updatedItem.Employe_ID
      );
      if (index !== -1) {
        Utilisateur.value.splice(index, 1, updatedItem);
      }
    };
    return {
      headers,
      Utilisateur,
      apiUrl,
      handleItemCreated,
      handleItemUpdated
    };

    }
}

</script>

<template>

<ReusableTable
    :headers="headers"
    :items="Utilisateur"
    rowKey="Categorie_ID"
    :apiUrl="apiUrl"
    @itemCreated="handleItemCreated"
    @itemUpdated="handleItemUpdated"
  />
</template>