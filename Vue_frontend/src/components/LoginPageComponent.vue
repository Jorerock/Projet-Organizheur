<script setup lang="ts">
 import { ref } from 'vue';

 import { User } from '../models/user';
import LoginComponent from '../components/LoginComponent.vue';

//  const users = defineProps<{ user: User }>();

// const onConnectInput = async ({email: email  ,password : password  }) => {
  console.log('start')

  const utilisateur = ref<User[]>([]);
  
 const onConnectInput = async (event :{email: string  ,password : string  }) => {
    // eslint-disable-next-line no-debugger
  debugger;
  const response = await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: event.email,
            password: event.password,
          }),
        });
        if (!response.ok) {
          console.error(response.status);
          console.log('Erreur creation pour cause de '+ response.status);

        } else {
          utilisateur.value = await response.json();
          console.log('Todo Ajoute');

        }
  console.log('la tentative de connexion est envoyée au serveur');
};



const test = async (event :{email: string  ,password : string  }) => {
    // eslint-disable-next-line no-debugger
    debugger;
  const todosRequest = await fetch('http://localhost:3000/auth');
  console.log(await todosRequest.json())
  console.log(event.email)
};


</script>

<template>
  <p>Hello World !</p>
  <!-- <LoginComponent @Connect="onConnectInput($event)"/> -->
  <!-- <LoginComponent @authentification="onConnectInput($event)"/> -->
  <LoginComponent @authentification="test($event)"/>
  <input
          type="text"
          id="text"
          required
          placeholder="test"
        />  <button class="button button1" @click="test({email: 'email'  ,password : 'mdp'})">test</button>

</template>
  
<style scoped></style>