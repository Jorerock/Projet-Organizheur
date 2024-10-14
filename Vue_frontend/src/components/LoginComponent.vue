<script>
// import { ref } from 'vue';



// const submitForm = async () => {
//   monTableau.value[index] = newTodoValue;
//   await fetch(`http://localhost:3000/login`, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({email : this.email , password : this.password}),
//   });
//   console.log('Envoie de'+ email );

//   if (response.ok) {
//           // Si la connexion est réussie, on récupère les données de la réponse
//           const data = await response.json();
//           console.log('Réponse du serveur :', data);
//           alert('Connexion réussie !');
//           localStorage.setItem('token', data.token);
//           // Redirection vers une autre page après une connexion réussie
//           this.$router.push('/todo');
//         }
// };

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null, // Pour afficher un message d'erreur si besoin
    };
  },
  methods: {
    async submitForm() {
      try {
        // Utilisation de fetch pour envoyer une requête POST au serveur
        const response = await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          // Si la connexion est réussie, on récupère les données de la réponse
          const data = await response.json();
          console.log('Réponse du serveur :', data);
          alert('Connexion réussie !');
          localStorage.setItem('token', data.token);

          // Redirection vers une autre page après une connexion réussie
          this.$router.push('/tache');
        } else {
          // Si le serveur retourne une erreur (comme une authentification échouée)
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Erreur lors de la connexion';
        }
      } catch (error) {
        // En cas d'erreur réseau ou autre
        console.error('Erreur de connexion :', error);
        // this.errorMessage = 'Erreur lors de la communication avec le serveur';
      }
    }
  }
};
</script>



<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Entrez votre adresse e-mail"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <button type="submit" class="btn">Se connecter</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>