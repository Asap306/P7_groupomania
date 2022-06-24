<script>

import { getUrlAndHeaders } from "./../services/fetchOptions"
import axios from "axios"
export default {
  name: "LoginPage",
  data() {
    return {
      username : "Amadou Barry",
      email: "amadou306@hotmail.fr",
      password: "123",
      confirmPassword: "123",
      hasInvalidCredentials: false,
      error: null,
      requestError: null,
      isLoginMode: true
    }
  },
  methods: {
    loginUser(email, password, router, store) {
      const { url } = getUrlAndHeaders()
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      }
      const body= JSON.stringify({ email, password })

      axios.post(url + "auth/login", body, options)
      .then((response)=> {
        localStorage.setItem("token",response.data.token)
        const user = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          is_admin: response.data.is_admin,
        }
        localStorage.setItem("user",JSON.stringify(user))
        this.$router.go();
        //this.$router.push("/home");
     })
     .catch((error) => {
       console.log(error)
       this.requestError = error.response.data.error
      })
  },
    setFormValidity(bool) {
      console.log("setFormValidity:", bool)
      this.hasInvalidCredentials = !bool
    },
    toggleLoginMode() {
      this.isLoginMode = !this.isLoginMode
    },
    signUp: function (username, email, password, confirmPassword, router) {
      const { url } = getUrlAndHeaders()
      const body = JSON.stringify({
        username,
        email,
        password,
        confirmPassword
      })
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
      console.log(url)
      axios.post(url + "auth/signup", body, options)
     .then((response)=> {
       alert(response.data.message);
        this.isLoginMode = true;
     })
     

     .catch((error) => {
        this.requestError = error.response.data.error
     })
    }
  },
  watch: {
    username(value) {
      const isValueEmpty = value === ""
      this.setFormValidity(!isValueEmpty)
      this.error = null
    },
    password(value) {
      const isValueEmpty = value === ""
      this.setFormValidity(!isValueEmpty)
      this.error = null
    }
  }
}
</script>

<template>
  <main class="form-signin">
    <form :class="this.hasInvalidCredentials ? 'hasErrors' : ''">
      <h1 class="h3 mb-3 fw-normal">
        {{ this.isLoginMode ? "Identifiez-vous" : "Créez un compte" }}
      </h1>

      <div class="form-floating" v-if="!isLoginMode" >
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Amaadou Barry"
          v-model="username"
          required="true"
          @invalid="setFormValidity"
          
        />
        <label for="floatingInput">Nom d'Utilisateur</label>
      </div>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="email"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div v-if="!isLoginMode" class="form-floating">
        <input
          type="password"
          class="form-control"
          placeholder="Confirm password"
          v-model="confirmPassword"
          required="true"
          @invalid="setFormValidity"
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div v-if="hasInvalidCredentials" class="error-msg">Veuillez remplir le champ</div>
      <div v-if="!hasInvalidCredentials && error" class="error-msg">{{ error }}</div>
      <p class="alert alert-warning" v-if="requestError">
        {{this.requestError}}
      </p>
      <button
        v-if="isLoginMode"
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click.prevent="
          () => loginUser(this.email, this.password, this.$router, this.usersStore)
        "
        :disabled="hasInvalidCredentials"
      >
        Se connecter
      </button>
      <button
        v-else
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click.prevent="
          () => signUp(this.username, this.email, this.password, this.confirmPassword, this.$router)
        "
        :disabled="hasInvalidCredentials"
      >
        S'inscrire
      </button>
      
      <p class="mt-1 mb-1" @click.prevent="toggleLoginMode">
        <a href="">{{ this.isLoginMode ? "Inscription" : "Connexion" }}</a>
      </p>
    </form>
  </main>
</template>


<style scoped>

.btn-primary {
  color: black;
  background-color: #FFD7D7;
  border-color: #FD2D01;
}
button:hover{
  background-color: #FD2D01;
}
.hasErrors input {
  border: 1px solid red;
}
.error-msg {
  color: red;
}
html,
body {
  align-items: center;
  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

button[type="submit"] {
  margin-block: 1rem;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

a{
  color: black;
}
a:hover{
  color: #FD2D01;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
