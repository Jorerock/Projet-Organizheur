<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TodoComponent from './TodoComponent.vue';
import { Todo } from '../models/todo';

const monTableau = ref<Todo[]>([]);

onMounted(async () => {
  const todosRequest = await fetch('http://localhost:3000/todos');
  const todos:Todo[] = await todosRequest.json();
  monTableau.value = [...todos];
});

// const monTableau = [1, 2, 3];

const onTodoInput = async (newTodoValue: Todo, index: number) => {
  monTableau.value[index] = newTodoValue;
  await fetch(`http://localhost:3000/todos/${newTodoValue.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodoValue),
  });
  console.log('monTableau est mis à jour et la modification est envoyée au serveur');
};

const deleteTodo = async (id: number, index: number) => {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
  });
  monTableau.value.splice(index, 1);
  console.log('Todo supprimé');
};


const PostTodo = async () => {
  // POST request using fetch with async/await
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: 'Nouvelle tâche', done: false })
  };
  const response = await fetch(`http://localhost:3000/todos`, requestOptions);
  // const data = await response.json();
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
  <br />
  <div class="todos"
    v-for="(element, index) in monTableau" :key="element.id">
    <TodoComponent :todo="element" @onInput="onTodoInput($event, index)" />
    <button class="button button1" @click="deleteTodo(element.id, index)">Supprimer</button>
  </div>
  <button @click="PostTodo()">Ajouter un todo</button>
</template>
  
<style scoped></style>