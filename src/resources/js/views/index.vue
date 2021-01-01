<template>
<v-app class="">
    <v-main v-if="$auth.ready()" class="bg-grey">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </v-main>
    <v-main v-if="!$auth.ready()">
        <v-row justify="center" class="text-center fill-height">
            <v-col cols="12" align-self="end">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="secondary"
                    indeterminate
                ></v-progress-circular>
            </v-col>
            <v-col class="font-weight-bold">Loading ...</v-col>
        </v-row>
    </v-main>
</v-app>
</template>

<script>
export default {
    created() {
        this.$auth.ready(function () {
            console.log(this); // Will be proper context.
        });
    }
}
</script>