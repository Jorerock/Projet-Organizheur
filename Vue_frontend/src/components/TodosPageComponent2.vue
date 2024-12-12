<script lang="ts">
import {ref, onMounted } from 'vue';
import ReusableTable from './ReusableTable.vue';
import { Todo } from '../models/todo';
import * as cookie from './Cookie';

const Employe_id = cookie.getCookie("Employe_ID")


export default {
    name: 'ParentComponent',
    components: {
    ReusableTable
  },
  setup() {
    const headers = ref<string[]>([
      'Todo_Name',
      'Todo_Echeance_date',
      'Todo_end',
      'Todo_Created_date'	
      ]);
    const apiUrl = ref<string>('http://localhost:3000/users');
    const todosTab = ref<Todo[]>([])

    // Fetch initial data
    onMounted(async () => {
        try {
            const TodosRequest = await fetch('http://localhost:3000/todos/'+Employe_id+'', {
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
            todosTab.value = [...Todos];
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    
    const handleItemCreated = (newItem: Todo): void => {
        todosTab.value.push(newItem);
    };

    const handleItemUpdated = (updatedItem: Todo): void => {
      const index = todosTab.value.findIndex(
        item => item.Todo_ID === updatedItem.Todo_ID
      );
      if (index !== -1) {
        todosTab.value.splice(index, 1, updatedItem);
      }
    };
    return {
      headers,
      todosTab,
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
        :items="todosTab"
        rowKey="Todo_ID"
        :apiUrl="apiUrl"
        @itemCreated="handleItemCreated"
        @itemUpdated="handleItemUpdated"
      />
    </template>