<template>
    <div class="logout">
        <b-button variant="outline-primary" @click="login">login</b-button>
        <b-button variant="outline-primary" @click="index">index</b-button>
    </div>
</template>

<script>
    export default {
        name: 'logout',
        data() {
            return {

            }
        },
        created() {
            //注销登录

        },
        methods: {
            login() {
                this.$router.push({
                    path: this.redirect || "/auth/login"
                });
            },
            index() {
                this.$router.push({
                    path: this.redirect || "/"
                });
            }
        }
    }
</script>

<style lang="scss">
    .logout {
        text-align: center;
        button {
            margin-right: 5px;
        }
    }
</style>