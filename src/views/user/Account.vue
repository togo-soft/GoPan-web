<template>
    <div class="container-fluid mt-5 ">
        <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                <div class="card card-profile shadow">
                    <div class="card-body pt-0 pt-md-4">
                        <div class="text-center style-control">
                            <h3>
                                {{uinfo.nickname}}
                            </h3>
                            <div class="h5">
                                {{uinfo.username}}
                            </div>
                            <div class="h5 mt-4">
                                {{uinfo.email}}
                            </div>
                            <div>
                                <i class="ni education_hat mr-2"></i>{{uinfo.phone}}
                            </div>
                            <hr class="my-4" />
                            <p>{{uinfo.statement}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-8 order-xl-1">
<!--                <b-card shadow type="secondary">-->
<!--                    <div slot="header" class="bg-white border-0">-->
<!--                        <div class="row align-items-center">-->
<!--                            <div class="col-8">-->
<!--                                <h3 class="mb-0">My account</h3>-->
<!--                            </div>-->
<!--                            <div class="col-4 text-right">-->
<!--                                <a href="#!" class="btn btn-sm btn-primary">Settings</a>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <template>-->
<!--                        <form @submit.prevent>-->
<!--                            <h6 class="heading-small text-muted mb-4">User information</h6>-->
<!--                            <div class="pl-lg-4">-->
<!--                                <div class="row">-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Username"-->
<!--                                                    placeholder="Username"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.username"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Email address"-->
<!--                                                    placeholder="jesse@example.com"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.email"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="row">-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="First name"-->
<!--                                                    placeholder="First name"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.firstName"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-6">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Last name"-->
<!--                                                    placeholder="Last name"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.lastName"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <hr class="my-4" />-->
<!--                            &lt;!&ndash; Address &ndash;&gt;-->
<!--                            <h6 class="heading-small text-muted mb-4">Contact information</h6>-->
<!--                            <div class="pl-lg-4">-->
<!--                                <div class="row">-->
<!--                                    <div class="col-md-12">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Address"-->
<!--                                                    placeholder="Home Address"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.address"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="row">-->
<!--                                    <div class="col-lg-4">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="City"-->
<!--                                                    placeholder="City"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.city"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-4">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Country"-->
<!--                                                    placeholder="Country"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.country"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                    <div class="col-lg-4">-->
<!--                                        <b-input alternative=""-->
<!--                                                    label="Postal code"-->
<!--                                                    placeholder="Postal code"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.zipCode"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <hr class="my-4" />-->
<!--                            &lt;!&ndash; Description &ndash;&gt;-->
<!--                            <h6 class="heading-small text-muted mb-4">About me</h6>-->
<!--                            <div class="pl-lg-4">-->
<!--                                <div class="form-group">-->
<!--                                    <b-input alternative=""-->
<!--                                                label="About Me">-->
<!--                                        <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>-->
<!--                                    </b-input>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </form>-->
<!--                    </template>-->
<!--                </b-card>-->
                <div class="card spur-card">
                    <div class="card-header">
                        <div class="spur-card-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="spur-card-title"> Account Form </div>
                    </div>
                    <div class="card-body ">
                        <form>
                            <div class="form-group">
                                <label for="Username">Username</label>
                                <input type="text" class="form-control" id="Username" v-model="uinfo.username" readonly>
                            </div>
                            <div class="form-group">
                                <label for="Nickname">Nickname</label>
                                <input type="text" class="form-control" id="Nickname" v-model="uinfo.nickname" placeholder="Nickname">
                            </div>
                            <div class="form-group">
                                <label for="Email">Email address</label>
                                <input type="email" class="form-control" id="Email" v-model="uinfo.email" placeholder="name@example.com">
                            </div>
                            <div class="form-group">
                                <label for="Phone">Phone</label>
                                <input type="text" class="form-control" id="Phone" v-model="uinfo.phone" placeholder="13888888888">
                            </div>
                            <div class="form-group">
                                <label for="Password">Password</label>
                                <input type="password" class="form-control" id="Password" v-model="uinfo.password" placeholder="new password">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Personal statement</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="uinfo.statement"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" @click="profile">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'account',
        data() {
            return {
                user: {},
                uinfo: {}
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
                    nickname: this.uinfo.nickname,
                    email: this.uinfo.email,
                    phone: this.uinfo.phone,
                    statement: this.uinfo.statement,
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
                        return;
                    });
            }
        },
        created() {
            if(!this.getToken()) {
                //没有token相关信息 页面重定向
                return;
            }else{
                // 登录成功 获取文件根目录
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取根文件列表
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