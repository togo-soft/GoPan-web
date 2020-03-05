<template>
    <div class="dash">
        <dash-nav></dash-nav>
        <div class="dash-app">
            <dash-header></dash-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.min.js'
    import DashNav from "@/components/DashNav";
    import DashHeader from "@/components/DashHeader";

    export default {
        name: "dashboard",
        data() {
            return {
            };
        },
        components: {
            DashNav,
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
                //获取token 若不存在 则跳转到登录页面 若存在 则拉取页面数据 中间过程中进行鉴权
                let token = '';
                let uid = '';
                let username = '';
                if(localStorage.getItem("_type") === "localStorage") {
                    //token在localStorage 上
                    token = localStorage.getItem("_token");
                    uid = localStorage.getItem("_uid");
                    username = localStorage.getItem("_username");
                }else{
                    //token在sessionStorage中
                    token = sessionStorage.getItem("_token");
                    uid = sessionStorage.getItem("_uid");
                    username = sessionStorage.getItem("_username");
                }
                if(token === null || uid === null) {
                    this.$router.push({
                        name: 'error',
                        params: {
                            code: 400,
                            message: 'token认证失败!请重新登录',
                        }
                    });
                    return;
                }
                //认证
                var headers = {
                    Authorization: "Bearer " + token,
                    uid: uid
                };
                //获取根文件列表
                this.$ajax
                    .get(this.server+'/api/user/auth',{
                        headers:headers
                    })
                    .then(response => {
                        this.$router.push({
                            path: this.redirect || "/user"
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