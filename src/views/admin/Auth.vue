<template>
    <div class="my-login-page">
        <section class="h-100">
            <div class="container h-100">
                <div class="row justify-content-md-center align-items-center h-100">
                    <div class="card-wrapper">
                        <div class="brand">
                            <img src="/img/GP.png" alt="logo">
                        </div>
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
                                <h4 class="card-title">Login</h4>
                                <form role="form">
                                    <b-form-group label="token">
                                        <b-form-input id="token" type="password" v-model="token" trim required autofocus></b-form-input>
                                    </b-form-group>
                                    <div class="form-group m-0">
                                        <button type="button" class="btn btn-primary btn-block" @click="signIn">
                                            Login
                                        </button>
                                    </div>
                                    <div class="mt-4 text-center">
                                        You're not an administrator? <router-link :to="{name:'login'}">Log in here</router-link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="footer">
                            Copyright &copy; {{year}} &mdash; {{company}}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
    export default {
        name: 'auth',
        data() {
            return {
                year: new Date().getFullYear(),
                company: 'GoPan',
                dismissSecs: 5,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                warningMessage: '',
                token: ''
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            signIn() {
                //检测输入项是否为空
                if (this.token === "") {
                    this.dismissCountDown = this.dismissSecs;
                    this.warningMessage = 'Input options cannot be empty!';
                    return;
                }
                //开始登陆请求
                let param = new URLSearchParams({
                    token: this.token,
                });
                this.$ajax
                    .post(this.server +"/api/general/admin", param)
                    .then((response) => {
                        //写入sessionStorage中
                        sessionStorage.setItem("_admin_token",response.data.message);
                        //跳转到后台
                        this.$router.push({
                            path: this.redirect || "/admin/dashboard"
                        });
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.dismissCountDown = this.dismissSecs;
                        this.warningMessage = "error.response.data.message";
                        return;
                    });
            }
        },
        created() {
            //跳转到这个界面 则刷新token
            sessionStorage.clear();
        }
    }
</script>

<style>
    html, body, .my-login-page {
        height: 100%;
    }

    .my-login-page {
        background-color: #f7f9fb;
        font-size: 14px;
    }

    .my-login-page .brand {
        width: 90px;
        height: 90px;
        overflow: hidden;
        border-radius: 50%;
        margin: 40px auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, .05);
        position: relative;
        z-index: 1;
    }

    .my-login-page .brand img {
        width: 100%;
    }

    .my-login-page .card-wrapper {
        width: 400px;
    }

    .my-login-page .card {
        border-color: transparent;
        box-shadow: 0 4px 8px rgba(0, 0, 0, .05);
    }

    .my-login-page .card.fat {
        padding: 10px;
    }

    .my-login-page .card .card-title {
        margin-bottom: 30px;
    }

    .my-login-page .form-control {
        border-width: 2.3px;
    }

    .my-login-page .form-group label {
        width: 100%;
    }

    .my-login-page .btn.btn-block {
        padding: 12px 10px;
    }

    .my-login-page .footer {
        margin: 40px 0;
        color: #888;
        text-align: center;
    }

    @media screen and (max-width: 425px) {
        .my-login-page .card-wrapper {
            width: 90%;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: 320px) {
        .my-login-page .card.fat {
            padding: 0;
        }

        .my-login-page .card.fat .card-body {
            padding: 15px;
        }
    }
</style>