<script setup lang="ts">
 import { ref } from 'vue';

 import { User } from '../models/user';
import LoginComponent from '../components/LoginComponent.vue';

//  const users = defineProps<{ user: User }>();

// const onConnectInput = async ({email: email  ,password : password  }) => {

  const utilisateur = ref<User[]>([]);
  
 const onConnectInput = async (event :{email: string  ,password : string  }) => {
    // eslint-disable-next-line no-debugger
  debugger;
  console.log('start')
  console.log('la tentative de connexion est envoyée au serveur');

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
        const data = await response.json();

        if (response.ok) {
            console.log('donne recup =', data);
        } else {

          console.error(response.status);
          console.log('Erreur creation pour cause de '+ response.status);
        }
};



const test = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
  const todosRequest = await fetch('http://localhost:3000/auth');
  console.log(await todosRequest.json())
};


</script>

<template>
  <p>Hello World !</p>
  <!-- <LoginComponent @Connect="onConnectInput($event)"/> -->
  <!-- <LoginComponent @authentification="onConnectInput($event)"/> -->
  <LoginComponent @authentification="onConnectInput($event)"/>
  <input
          type="text"
          id="text"
          required
          placeholder="test"
        />
        <button class="button button1" @click="test()">test</button>

</template>
  
<style scoped></style>