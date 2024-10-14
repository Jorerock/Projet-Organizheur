<script setup lang="ts">
// import { ref, onMounted } from 'vue';

// import { User } from '../models/user';
import LoginComponent from '../components/LoginComponent.vue';

//  const users = defineProps<{ user: User }>();

// const onConnectInput = async ({email: email  ,password : password  }) => {
  
 const onConnectInput = async (event :{email: string  ,password : string  }) => {

  await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: event.email,
            password: event.password,
          }),
        });
  console.log('la tentative de connexion est envoyée au serveur');
};


</script>

<template>
  <p>Hello World !</p>
  <!-- <LoginComponent @Connect="onConnectInput($event)"/> -->
  <LoginComponent @onInput="onConnectInput($event)"/>

</template>
  
<style scoped></style>