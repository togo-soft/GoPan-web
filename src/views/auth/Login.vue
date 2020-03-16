<template>
    <div class="card fat">
        <b-alert
                :show="dismissCountDown"
                dismissible
                fade
                variant="warning"
                @dismiss-count-down="countDownChanged"
        >
            {{warningMessage}}
        </b-alert>
        <div class="card-body">
            <h4 class="card-title">登录</h4>
            <form role="form">
                <b-form-group label="用户名">
                    <b-form-input id="username" v-model="user.username" trim required autofocus></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>密码
                        <router-link :to="{name:'forgot'}" class="float-right">
                            忘记密码?
                        </router-link>
                    </label>
                    <b-form-input id="password" type="password" v-model="user.password" required></b-form-input>
                </b-form-group>
                <div class="form-group">
                    <b-form-checkbox
                            id="remember"
                            v-model="user.remember"
                            name="remember"
                            value="true"
                            unchecked-value="false"
                    >
                        <span v-b-tooltip.hover title="Checking this option will always log in status">记住我</span>
                    </b-form-checkbox>
                </div>
                <div class="form-group m-0">
                    <button type="button" class="btn btn-primary btn-block" @click="signIn">
                        登录
                    </button>
                </div>
                <div class="mt-4 text-center">
                    没有账号? <router-link :to="{name:'register'}">创建</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    remember: false
                },
                dismissSecs: 5,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                warningMessage: '',
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            signIn() {
                //检测输入项是否为空
                if (this.user.username === "" || this.user.password === "") {
                    this.dismissCountDown = this.dismissSecs;
                    this.warningMessage = '输入项不能为空!';
                    return;
                }
                //开始登陆请求
                //开始登陆逻辑 将token记录 如果未勾选remember 将token存入sessionStorage中 否则存储在localStorage中
                let param = new URLSearchParams({
                    username: this.user.username,
                    password: this.user.password
                });
                this.$ajax
                    .post(this.server +"/api/general/signin", param)
                    .then(response => {
                        let data = response.data;
                        if(this.user.remember) {
                            //写入localStorage中
                            localStorage.setItem("_type",'localStorage');//记录登录方式 是否使用localStorage存储token
                            localStorage.setItem("_token",data.message);
                            localStorage.setItem("_fk",data.data.fk);
                            localStorage.setItem("_iv",data.data.iv);
                            localStorage.setItem("_ak",data.data.ak);
                            localStorage.setItem("_uid",data.data.id);
                            localStorage.setItem("_username",data.data.username);
                        }else{
                            //写入sessionStorage中
                            sessionStorage.setItem("_token",data.message);
                            sessionStorage.setItem("_uid",data.data.id);
                            sessionStorage.setItem("_fk",data.data.fk);
                            sessionStorage.setItem("_iv",data.data.iv);
                            sessionStorage.setItem("_ak",data.data.ak);
                            sessionStorage.setItem("_username",data.data.username);
                        }
                        //跳转到后台
                        this.$router.push({
                            path: this.redirect || "/user/dashboard"
                        });
                    })
                    .catch(error => {
                        this.dismissCountDown = this.dismissSecs;
                        this.warningMessage = error.response.data.message;
                        return;
                    });
            }
        },
        created() {
            //删除本地存储localStorage
            localStorage.clear();
            sessionStorage.clear();
        }
    }
</script>