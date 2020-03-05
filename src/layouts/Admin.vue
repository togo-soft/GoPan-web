<template>
    <div class="dash">
        <dash-admin-nav></dash-admin-nav>
        <div class="dash-app">
            <dash-header></dash-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.min.js'
    import DashAdminNav from "@/components/DashAdminNav";
    import DashHeader from "@/components/DashHeader";

    export default {
        name: "dashboard",
        data() {
            return {
            };
        },
        components: {
            DashAdminNav,
            DashHeader
        },
        created() {
            this.authToken();
            const mobileBreakpoint = window.matchMedia("(max-width: 991px )");
            $(document).ready(function(){
                $(".dash-nav-dropdown-toggle").click(function(){
                    $(this).closest(".dash-nav-dropdown")
                        .toggleClass("show")
                        .find(".dash-nav-dropdown")
                        .removeClass("show");

                    $(this).parent()
                        .siblings()
                        .removeClass("show");
                });

                $(".menu-toggle").click(function(){
                    if (mobileBreakpoint.matches) {
                        $(".dash-nav").toggleClass("mobile-show");
                    } else {
                        $(".dash").toggleClass("dash-compact");
                    }
                });

                $(".searchbox-toggle").click(function(){
                    $(".searchbox").toggleClass("show");
                });

                // Dev utilities
                // $("header.dash-toolbar .menu-toggle").click();
                // $(".searchbox-toggle").click();
            });
        },
        methods: {
            authToken(){
                //获取token 若不存在 则跳转到报错页面
                //token在sessionStorage中
                let token = sessionStorage.getItem("_admin_token");
                if(token === null) {
                    this.$router.push({
                        name: 'error',
                        params: {
                            code: 400,
                            message: 'token失效!请重新登录! /admin/auth',
                        }
                    });
                    return;
                }
                //发起认证
                let param = new URLSearchParams({
                    token: token,
                });
                this.$ajax
                    .post(this.server+'/api/general/admin',param)
                    .then(response => {
                        this.$router.push({
                            path: this.redirect || "/admin"
                        });
                    })
                    .catch(error => {
                        this.$router.push({
                            name: 'error',
                            params: {
                                code: error.response.data.code,
                                message: error.response.data.message,
                            }
                        });
                    });
            },
        }
    };
</script>

<style scoped>
    @import '~@/assets/css/spur.min.css';
</style>