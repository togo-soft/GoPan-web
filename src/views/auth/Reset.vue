<template>
    <div class="card fat">
        <div v-if="invalid">
            <b-alert variant="warning" dismissible show>
                {{warningMessage}}, <router-link :to="{name:'forgot'}">重新发送邮件</router-link>
            </b-alert>
        </div>
        <div v-if="isReset">
            <b-alert variant="warning" dismissible show>
                {{warningMessage}}, <router-link :to="{name:'login'}">点击登录</router-link>
            </b-alert>
        </div>
        <div class="card-body">
            <h4 class="card-title">Reset Password</h4>
            <form role="form">
                <b-form-group
                        label="New Password"
                        description=" Make sure your password is strong and easy to remember."
                >
                    <b-form-input id="password" v-model="user.password" required autofocus type="password"></b-form-input>
                </b-form-group>

                <b-form-group label="Re Password">
                    <b-form-input id="repassword" v-model="user.repassword" required type="password"></b-form-input>
                </b-form-group>

                <div class="form-group m-0">
                    <button type="button" class="btn btn-primary btn-block" @click="reset">
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'reset',
        data() {
            return {
                user: {
                    password: '',
                    repassword: '',
                },
                warningMessage: '',
                invalid: true,//是否无效 true无效 false有效
                isReset: false,//检测是否重置 true重置成功 false失败
            }
        },
        methods: {
            reset() {
                //如果UUID失效 不能修改密码
                if(this.invalid) {
                    this.warningMessage = 'code invalid!';
                    return;
                }
                //检测输入项是否为空
                if (this.user.password === "" || this.user.repassword === "") {
                    this.warningMessage = 'Input options cannot be empty!';
                    return;
                }
                //开始发送重置密码请求
                let param = new URLSearchParams({
                    password: this.user.password
                });
                let uuid = this.$route.params.uuid;
                let _this = this;
                this.$ajax
                    .post(_this.server +"/api/general/reset?uuid="+uuid,param)
                    .then(function(response) {
                       _this.warningMessage = response.data.message;
                        _this.isResetValue();
                    })
                    .catch(error => {
                        console.log(error.response);
                        _this.warningMessage = error.response.data.message;
                    });
            },
            invalidValue(){
                this.invalid = false;
            },
            isResetValue(){
                this.isReset = true;
            }
        },
        created() {
            //检测uuid是否过期
            let uuid = this.$route.params.uuid;
            let _this = this;
            this.$ajax
                .get(_this.server +"/api/general/reset/check?uuid="+uuid)
                .then(function(response) {
                    _this.warningMessage = response.data.message;
                    _this.invalidValue();
                })
                .catch(error => {
                    _this.warningMessage = error.response.data.message;
                });
        }
    }
</script>