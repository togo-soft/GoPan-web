<template>
    <div class="dash-header">
        <header class="dash-toolbar">
            <a href="#!" class="menu-toggle">
                <i class="fas fa-bars"></i>
            </a>
<!--            <a href="#!" class="searchbox-toggle">-->
<!--                <i class="fas fa-search"></i>-->
<!--            </a>-->
<!--            <form class="searchbox" action="#!">-->
<!--                <a href="#!" class="searchbox-toggle"> <i class="fas fa-arrow-left"></i> </a>-->
<!--                <button type="submit" class="searchbox-submit"> <i class="fas fa-search"></i> </button>-->
<!--                <input type="text" class="searchbox-input" placeholder="type to search">-->
<!--            </form>-->
            <div class="tools">
<!--                <a href="https://github.com/HackerThemes/spur-template" target="_blank" class="tools-item">-->
<!--                    <i class="fab fa-github"></i>-->
<!--                </a>-->
<!--                <a href="#!" class="tools-item">-->
<!--                    <i class="fas fa-bell"></i>-->
<!--                    <i class="tools-item-count">4</i>-->
<!--                </a>-->
                <router-link :to="{name:'logout'}" class="tools-item">
                    <i class="fas fa-sign-out-alt"></i>
                </router-link>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        name: 'dash-header',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>