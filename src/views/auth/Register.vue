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
        <div v-if="isRegister">
            <b-alert variant="warning" dismissible show>
                {{warningMessage}}, <router-link :to="{name:'login'}">立即登录</router-link>
            </b-alert>
        </div>
        <div class="card-body">
            <h4 class="card-title">Register</h4>
            <form role="form">
                <b-form-group label="Username">
                    <b-form-input id="username" v-model="user.username" required autofocus></b-form-input>
                </b-form-group>

                <b-form-group label="Email">
                    <b-form-input id="email" v-model="user.email" required type="email"></b-form-input>
                </b-form-group>

                <b-form-group label="Password">
                    <b-form-input id="password" v-model="user.password" type="password" required></b-form-input>
                </b-form-group>

                <b-form-group label="RePassword">
                    <b-form-input id="repassword" v-model="user.repassword" type="password" required></b-form-input>
                </b-form-group>

                <div class="form-group">
                    <b-form-checkbox
                            v-model="user.agree"
                            id="agree"
                            name="agree"
                            value="true"
                            unchecked-value="false"
                            required
                    >
                        I agree to the <a href="#">Terms and Conditions</a>
                    </b-form-checkbox>
                </div>

                <div class="form-group m-0">
                    <button type="button" class="btn btn-primary btn-block" @click="signUp">
                        Register
                    </button>
                </div>
                <div class="mt-4 text-center">
                    Already have an account?
                    <router-link :to="{name:'login'}">Login</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                user: {
                    username: '',
                    email: '',
                    password: '',
                    repassword: '',
                    agree: false
                },
                dismissSecs: 3,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                warningMessage: '',
                isRegister: false,
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            isRegisterValue() {
                this.isRegister = true;
            },
            signUp() {
                //  检测输入
                if (
                    this.user.username === "" ||
                    this.user.email === "" ||
                    this.user.password === "" ||
                    this.user.repassword === ""
                ) {
                    this.dismissCountDown = this.dismissSecs;
                    this.warningMessage = 'Input options cannot be empty!';
                    return;
                } else if (this.user.password !== this.user.repassword) {
                    this.dismissCountDown = this.dismissSecs;
                    this.warningMessage = 'Passwords do not match!';
                    return;
                }
                //  检测完成
                let param = new URLSearchParams({
                    username: this.user.username,
                    password: this.user.password,
                    email: this.user.email
                });
                let _this = this;
                this.$ajax
                    .post(_this.server +"/api/general/signup", param)
                    .then(function(response) {
                        console.log(response.data);
                        if (response.data.code === 200) {
                            _this.warningMessage = 'registration success! please sign in!';
                            _this.isRegisterValue();
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                        _this.dismissCountDown = _this.dismissSecs;
                        _this.warningMessage = 'registration failed! Please try again!';
                    });
            }
        }
    }
</script>