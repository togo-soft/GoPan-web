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
            <h4 class="card-title">Forgot Password</h4>
            <form role="form">
                <b-form-group
                        label="E-Mail Address"
                        description="We will send a password reset link to your email account."
                >
                    <b-form-input id="email" v-model="email" required autofocus></b-form-input>
                </b-form-group>

                <div class="form-group m-0">
                    <button type="button" class="btn btn-primary btn-block" @click="Forget">
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'forgot',
        data() {
            return {
                email: '',
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
            Forget() {
                //检测输入项是否为空
                if (this.email === "") {
                    this.dismissCountDown = this.dismissSecs;
                    this.warningMessage = 'Input options cannot be empty!';
                    return;
                }
                //开始发送邮件请求
                let _this = this;
                this.$ajax
                    .get(_this.server+"/api/general/forget?email="+_this.email)
                    .then(function(response) {
                        _this.dismissCountDown = _this.dismissSecs;
                        _this.warningMessage = response.data.message;
                    })
                    .catch(error => {
                        console.log(error);
                        _this.dismissCountDown = _this.dismissSecs;
                        _this.warningMessage = error.response.data.message;
                    });
            },
        }
    }
</script>