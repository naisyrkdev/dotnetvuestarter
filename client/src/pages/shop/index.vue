<template>
  <div>
    Shop
  </div>
</template>

<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import { onBeforeMount } from 'vue';
import { getDataTest } from '@/axios/datatest';

let auth;
onBeforeMount(async () => {
  auth = getAuth();
  const token = await auth.currentUser?.getIdToken();
  console.log(auth.currentUser?.email);
  console.log("here token", token);
  await getDataTest(token)
    .then((response) => {
      console.log("Success!")
    })
})

</script>
