<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TodoComponent from './TodoComponent.vue';
import { Todo } from '../models/todo';
import * as cookie from './Cookie';

// const monTableau = ref<Todo[]>([]);
const monTableau = ref<any[]>([]);
const Employe_id = cookie.getCookie("Employe_ID")

onMounted(async () => {
  const todosRequest = await fetch('http://localhost:3000/todos/'+Employe_id+'');
  const todos = await todosRequest.json();
  monTableau.value = [...todos]
});

const onTodoInput = async (newTodoValue: Todo, index: number) => {
  monTableau.value[index] = newTodoValue;
  await fetch(`http://localhost:3000/todos/${newTodoValue.Todo_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodoValue),
  });
  console.log('monTableau est mis à jour et la modification est envoyée au serveur');
};

const deleteTodo = async (Todo_ID: number, index: number) => {
  await fetch(`http://localhost:3000/todos/${Todo_ID}`, {
    method: 'DELETE',
  });
  monTableau.value.splice(index, 1);
  console.log('Todo supprimé');
};

const PostTodo = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: 'Nouvelle tâche', done: false })
  };
  const response = await fetch(`http://localhost:3000/todos`, requestOptions);
  if (!response.ok) {
    console.error(response.status);
    console.log('Erreur creation pour cause de '+ response.status);
  } else {
    monTableau.value.push( await response.json());
    console.log('Todo Ajoute');
  }
};


</script>

<template>
  <p>Hello World !</p>
  <span v-if="monTableau.length % 2 === 0">Mon tableau est
  pair</span>
  <span v-else>Mon tableau est impair</span>
  <br/>
  <div class="todos" v-for="(element, index) in monTableau" :key="element.Todo_ID">
  <TodoComponent :todo="element" @onInput="onTodoInput($event, index)" />
  <button class="button button1" @click="deleteTodo(element.id, index)">Supprimer</button>
  </div>
  <button @click="PostTodo()">Ajouter un todo</button>
</template>
  
<style scoped></style>