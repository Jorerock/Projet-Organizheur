<!-- <script setup lang="ts">
import { User } from '../models/user';
import LoginComponent from './LoginComponent.vue';


const users = defineProps<{ user: User }>();



// const monTableau = [1, 2, 3];

const onConnectInput = async (user: User) => {
  
  await fetch(`http://localhost:3000/User/${user}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(user),
  });
  console.log('monTableau est mis à jour et la modification est envoyée au serveur');
};


</script>

<template>
  <p>Hello World !</p>
  <LoginComponent :user="none" @Connect="onConnectInput($event)">
</template>
  
<style scoped></style> -->