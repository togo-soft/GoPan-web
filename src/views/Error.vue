<template>
    <div class="error">
        <b-container fluid>
            <b-row>
                <b-col xl="8" lg="8" offset-xl="2" offset-lg="2" class="mx-auto pb-5 my-8">
                    <section class="section">
                        <div class="container mt-5">
                            <div class="page-error">
                                <div class="page-inner">
                                    <h1>Error</h1>
                                    <div class="page-description">
                                        Your operation seems to be malfunctioning.
                                    </div>
                                    <b-card title="Code" :sub-title="String(code)">
                                        <b-card-text class="mt-4">
                                            {{message}}
                                        </b-card-text>
                                    </b-card>

                                    <div class="mt-5">
                                        <button class="btn btn-primary btn-lg" @click="back">
                                            回首页
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="simple-footer mt-5">
                                Copyright © GoPan {{ year }}
                            </div>
                        </div>
                    </section>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'error',
        data() {
            return {
                year: new Date().getFullYear(),
                code: 200,
                message: ''
            };
        },
        methods: {
            back() {
                this.$router.push({
                    path: this.redirect || "/"
                });
            }
        },
        mounted() {
            //获得参数信息 code=xxx&message=xxx
            this.code = this.$route.params.code;
            this.message = this.$route.params.message;
            if (this.code === undefined || this.message === undefined) {
                this.code = 200;
                this.message = '好像没有什么错误!'
            }
            if (this.code === 4901) {
                sessionStorage.clear();
                localStorage.clear();
            }
        }
    }
</script>

<style scoped>
    @import '~@/assets/css/spur.min.css';
    .page-error {
        height: 100%;
        width: 100%;
        padding-top: 60px;
        text-align: center;
        display: table;
    }

    .page-error .page-inner {
        display: table-cell;
        width: 100%;
        vertical-align: middle;
    }

    .page-error h1 {
        font-size: 10em;
        font-family: Nunito, sans-serif;
        font-weight: 700
    }

    .page-error .page-description {
        font-size: 18px;
        font-weight: 400;
        color: #34395e;
    }

    .btn-primary, .btn-primary.disabled {
        box-shadow: 0 2px 6px #acb5f6;
        background-color: #6777ef;
        border-color: #6777ef;
    }

    a {
        color: #6777ef;
        font-weight: 500;
        transition: all .5s;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
    }

    .simple-footer {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }
    .card {
        border: none;
        background-color: #e9edf4;
    }
</style>