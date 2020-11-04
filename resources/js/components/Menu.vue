<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <router-link class="link" to="/">
                <v-toolbar-title>
                    Dasafio
                </v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>
            <router-link class="link" to="/dash">
                <v-btn>
                    Dashboard
                </v-btn>
            </router-link>
            <router-link class="link" to="/profile">
                <v-btn>
                    Perfil
                </v-btn>
            </router-link>

        </v-app-bar>
    </div>
</template>

<script>
</script>

<style>
    .link {
        color: white
    }
    .link:hover {
        color: white;
        text-decoration: none;
    }

</style>
