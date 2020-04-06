<template>
    <b-container fluid class="mt-5">
        <b-row>
            <b-col xl="6" lg="6" md="12" sm="12" offset-xl="3" offset-lg="3">
                <div class="card spur-card">
                    <div class="card-header">
                        <div class="spur-card-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="spur-card-title"> 账户信息 </div>
                    </div>
                    <div class="card-body ">
                        <form>
                            <div class="form-group">
                                <label for="Username">用户名</label>
                                <input type="text" class="form-control" id="Username" v-model="uinfo.username" readonly>
                            </div>
                            <div class="form-group">
                                <label for="Email">Email 地址</label>
                                <input type="email" class="form-control" id="Email" v-model="uinfo.email" placeholder="name@example.com">
                            </div>
                            <div class="form-group">
                                <label for="Phone">手机号</label>
                                <input type="text" class="form-control" id="Phone" v-model="uinfo.phone" placeholder="13888888888">
                            </div>
                            <div class="form-group">
                                <label for="Password">密码</label>
                                <input type="password" class="form-control" id="Password" v-model="uinfo.password" placeholder="new password">
                            </div>
                            <button type="button" class="btn btn-primary" @click="profile">Submit</button>
                        </form>
                    </div>
                </div>
                <div class="card spur-card">
                    <div class="card-header">
                        <div class="spur-card-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="spur-card-title"> 行为信息 </div>
                    </div>
                    <div class="card-body ">
                        <b-list-group>
                            <b-list-group-item href="#" active class="flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">时间</h5>
                                </div>
                                <p class="mb-1">
                                    本次操作时间: <strong>{{log.current_time}}</strong>.
                                </p>
                                <small>上次操作时间: <strong>{{log.last_time}}</strong>.</small>
                            </b-list-group-item>

                            <b-list-group-item href="#" class="flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">IP</h5>
                                </div>
                                <p class="mb-1">
                                    本次操作IP: <strong>{{log.current_ip}}</strong>.
                                </p>
                                <small class="text-muted">上次操作IP: <strong>{{log.last_ip}}</strong>.</small>
                            </b-list-group-item>

                            <b-list-group-item href="#" class="flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">地址</h5>
                                </div>
                                <p class="mb-1">
                                    本次操作地址: <strong>{{log.current_address}}</strong>.
                                </p>
                                <small class="text-muted">上次操作地址: <strong>{{log.last_address}}</strong>.</small>
                            </b-list-group-item>

                            <b-list-group-item href="#" class="flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">代理</h5>
                                </div>
                                <p class="mb-1">
                                    本次操作代理: <strong>{{log.current_user_agent}}</strong>.
                                </p>
                                <small class="text-muted">上次操作代理: <strong>{{log.last_user_agent}}</strong>.</small>
                            </b-list-group-item>

                            <b-list-group-item href="#" class="flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">操作</h5>
                                </div>
                                <p class="mb-1">
                                    本次操作地址: <strong>{{log.current_operate}}</strong>.
                                </p>
                                <small class="text-muted">上次操作地址: <strong>{{log.last_operate}}</strong>.</small>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'account',
        data() {
            return {
                user: {},
                uinfo: {},
                log: {}
            }
        },
        methods: {
            getToken(){
                //获取token 若不存在 则跳转到登录页面 若存在 则拉取页面数据 中间过程中进行鉴权
                if(localStorage.getItem("_type") === "localStorage") {
                    //token在localStorage 上
                    this.user.token = localStorage.getItem("_token");
                    this.user.uid = localStorage.getItem("_uid");
                    this.user.username = localStorage.getItem("_username");
                }else{
                    //token在sessionStorage中
                    this.user.token = sessionStorage.getItem("_token");
                    this.user.uid = sessionStorage.getItem("_uid");
                    this.user.username = sessionStorage.getItem("_username");
                }
                return !(this.user.token === null || this.user.uid === null);
            },
            profile(){
                this.getToken();
                let param = new URLSearchParams({
                    email: this.uinfo.email,
                    phone: this.uinfo.phone,
                    password: this.uinfo.password,
                    id: this.user.uid,
                });
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                this.$ajax
                    .post(this.server +"/api/user/update", param,{
                        headers:headers
                    })
                    .then( response => {
                        //跳转到后台
                        this.$router.push({
                            path: this.redirect || "/user/dashboard"
                        });
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },
            getUserInfo(){
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取用户信息
                this.$ajax
                    .get(this.server +"/api/user/profile",{
                        headers:headers
                    })
                    .then(response => {
                        this.uinfo = response.data.data
                    })
                    .catch(error => {
                        //获取根目录失败
                        console.log(error.response)
                    });
            },
            getUserLog(){
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取用户信息
                this.$ajax
                    .get(this.server +"/api/user/log",{
                        headers:headers
                    })
                    .then(response => {
                        this.log = response.data.data;
                    })
                    .catch(error => {
                        //获取根目录失败
                        console.log(error.response)
                    });
            }
        },
        created() {
            if(!this.getToken()) {
                //没有token相关信息 页面重定向
                return;
            }else{
                // 登录成功 获取文件根目录
                this.getUserInfo();
                this.getUserLog();
            }
        }
    };
</script>

<style scoped>
    .style-control {
        font-size: 1rem;
    }
    .style-control h3 {
        font-size: 1.5rem;
    }
    .style-control .h5 {
        font-weight: 300!important;
        font-size: .8125rem;
    }
</style>