<template>
    <v-app-bar flat v-if="!mobile">
        <v-app-bar-title>
            <v-icon icon="mdi-circle-slice-6" />
            Project Gulo
        </v-app-bar-title>
    </v-app-bar>
    <v-app-bar v-else color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>My files</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <v-btn icon="mdi-filter" variant="text"></v-btn>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    </v-app-bar>
    <v-navigation-drawer v-if="!mobile" color="#09151E" permanent expand-on-hover app>
        <v-divider></v-divider>
        <v-list nav dense v-if="isLoggedIn">
            <v-list-item link href="#">
                <RouterLink to="/my-character">
                    Character
                </RouterLink>
            </v-list-item>
            <v-list-item link href="#">
                <RouterLink to="/about">
                    Shop
                </RouterLink>
            </v-list-item>
            <v-list-item link href="#">
                <a class="title" @click="handleSignOut()" v-if="isLoggedIn">Logout</a>
            </v-list-item>
        </v-list>
        <v-list nav dense v-else>
            <v-list-item link href="#">
                <RouterLink to="/login">
                    Login
                </RouterLink>
            </v-list-item>
            <v-list-item link href="#">
                <RouterLink to="/register">
                    Register
                </RouterLink>
            </v-list-item>
        </v-list>
    </v-navigation-drawer v-else>
    <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <v-list :items="items"></v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
const drawer = ref(false);
const router = useRouter();
const isLoggedIn = ref(false);

let auth: any;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;

        }
    })
});

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/shop')
    });
}

const items = ref([
    {
        title: 'Foo',
        value: 'foo',
    },
    {
        title: 'Bar',
        value: 'bar',
    },
    {
        title: 'Fizz',
        value: 'fizz',
    },
    {
        title: 'Buzz',
        value: 'buzz',
    },
])

</script>