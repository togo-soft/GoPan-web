<!-- 管理员用NAV -->
<template>
    <div class="dash-nav dash-nav-dark">
        <header>
            <a href="#!" class="menu-toggle">
                <i class="fas fa-bars"></i>
            </a>
            <router-link :to="{name:'home'}" class="spur-logo"><i class="fas fa-bolt"></i> <span>GoPan</span></router-link>
        </header>
        <nav class="dash-nav-list">
            <router-link :to="{name:'admin-dashboard'}" class="dash-nav-item">
                <i class="fas fa-home"></i> 控制台 </router-link>
            <router-link :to="{name:'admin-user'}" class="dash-nav-item">
                <i class="fas fa-user-friends"></i> 用户管理 </router-link>
            <router-link :to="{name:'admin-role'}" class="dash-nav-item">
                <i class="fas fa-users-cog"></i> 规则管理 </router-link>
            <router-link :to="{name:'admin-log'}" class="dash-nav-item">
                <i class="fas fa-users-cog"></i> 行为检查 </router-link>
            <router-link :to="{name:'admin-cluster'}" class="dash-nav-item">
                <i class="fas fa-cloud"></i> 集群管理 </router-link>
            <div class="dash-nav-dropdown">
                <a href="#!" class="dash-nav-item dash-nav-dropdown-toggle">
                    <i class="fas fa-paperclip"></i> 链接 </a>
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
        name: 'dash-admin-nav',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>