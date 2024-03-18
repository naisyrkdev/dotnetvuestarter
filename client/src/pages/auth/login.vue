<template>
  <v-row>
    <v-col>
      <h1>
        Sign in
      </h1>
      <v-text-field hide-details="auto" label="Email" v-model="email"></v-text-field>
      <v-text-field hide-details="auto" label="password" v-model="password"></v-text-field>
      <v-btn @click="login()">Submit</v-btn>
      <v-btn @click="signInWithGoogle()">Sign in with google</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref("");
const password = ref("");
const errMsg = ref("");

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
    router.push('/my-character')
  })
};

const signInWithGoogle = () => {

}

</script>
