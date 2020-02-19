<!-- 普通用户用NAV -->
<template>
    <div class="dash-nav dash-nav-dark">
        <header>
            <a href="#!" class="menu-toggle">
                <i class="fas fa-bars"></i>
            </a>
            <router-link :to="{name:'home'}" class="spur-logo"><i class="fas fa-bolt"></i> <span>GoPan</span></router-link>
        </header>
        <nav class="dash-nav-list">
            <router-link :to="{name:'dashboard'}" class="dash-nav-item">
                <i class="fas fa-home"></i> Dashboard </router-link>
            <router-link :to="{name:'shared'}" class="dash-nav-item">
                <i class="fas fa-share-alt"></i> Shared </router-link>
            <router-link :to="{name:'favorite'}" class="dash-nav-item">
                <i class="fas fa-heart"></i> Favorite </router-link>
            <router-link :to="{name:'secret'}" class="dash-nav-item">
                <i class="fas fa-mask"></i> Secret </router-link>
            <router-link :to="{name:'account'}" class="dash-nav-item">
                <i class="fas fa-user-alt"></i> Account </router-link>
            <div class="dash-nav-dropdown">
                <a href="#!" class="dash-nav-item dash-nav-dropdown-toggle">
                    <i class="fas fa-paperclip"></i> Link </a>
                <div class="dash-nav-dropdown-menu">
                    <a href="#" target="_blank" class="dash-nav-dropdown-item">GitHub</a>
                    <a href="https://xuthus.cc/Golang/Record-graduation-project.html" target="_blank" class="dash-nav-dropdown-item">Blog</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'dash-nav',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>