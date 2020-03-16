<template>
    <div class="admin">
        <main class="dash-content">
            <div class="container-fluid">
                <div class="row dash-row">
                    <b-col sm="12" md="8" lg="4" xl="4" offset-md="2" offset-lg="4" offset-xl="4">
                        <div class="stats stats-primary">
                            <h3 class="stats-title"> 使用量 </h3>
                            <div class="stats-content">
                                <div class="stats-icon">
                                    <i class="fas fa-box"></i>
                                </div>
                                <div class="stats-data">
                                    <div class="stats-number">
                                        <span v-b-tooltip.hover title="Used disk size">
                                            {{calc(upload_total.totalSize)}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </div>
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="6" lg="6" md="12" sm="12">
                            <div class="card spur-card">
                                <div class="card-header">
                                    <div class="spur-card-icon">
                                        <i class="fas fa-chart-bar"></i>
                                    </div>
                                    <div class="spur-card-title"> 最近上传统计</div>
                                </div>
                                <div class="card-body ">
                                    <table class="table table-striped table-in-card">
                                        <thead>
                                        <tr>
                                            <th scope="col">时间</th>
                                            <th scope="col">数量</th>
                                            <th scope="col">大小</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in upload_record">
                                            <td>{{item.date}}</td>
                                            <td>{{item.fileCount}}</td>
                                            <td>{{calc(item.totalSize)}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </b-col>

                        <b-col xl="6" lg="6" md="12" sm="12">
                            <div class="card spur-card">
                                <div class="card-header">
                                    <div class="spur-card-icon">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </div>
                                    <div class="spur-card-title"> 集群操作</div>
                                </div>
                                <div class="card-body ">
                                    <b-alert
                                            :show="dismissCountDown"
                                            dismissible
                                            fade
                                            variant="success"
                                            @dismiss-count-down="countDownChanged"
                                    >
                                        {{warningMessage}}
                                    </b-alert>
                                    <b-jumbotron lead="单击此处开始手动群集同步.">
                                        <b-button variant="primary" class="mr-2 mb-2" @click="repair_sync">修复</b-button>
                                    </b-jumbotron>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col xl="6" lg="6" md="12" sm="12">
                            <div class="card spur-card">
                                <div class="card-header">
                                    <div class="spur-card-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="spur-card-title"> 邮件配置</div>
                                </div>
                                <div class="card-body ">
                                    <b-alert
                                            :show="dismissCountDown"
                                            dismissible
                                            fade
                                            variant="success"
                                            @dismiss-count-down="countDownChanged"
                                    >
                                        {{warningMessage}}
                                    </b-alert>
                                    <b-alert
                                            :show="dismissCountDown"
                                            dismissible
                                            fade
                                            variant="success"
                                            @dismiss-count-down="countDownChanged"
                                    >
                                        {{warningMessage}}
                                    </b-alert>
                                    <b-form-group
                                            label-cols-sm="4"
                                            label-cols-lg="3"
                                            label="email.user"
                                    >
                                        <b-form-input placeholder="e.g: abc@163.com" v-model="email.user"></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                            label-cols-sm="4"
                                            label-cols-lg="3"
                                            label="email.pass"
                                    >
                                        <b-form-input placeholder="e.g: abcIsMyPassword" v-model="email.password"></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                            label-cols-sm="4"
                                            label-cols-lg="3"
                                            label="email.host"
                                    >
                                        <b-form-input placeholder="e.g: smtp.163.com:25" v-model="email.host"></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                            label-cols-sm="4"
                                            label-cols-lg="3"
                                            label="email.recv"
                                    >
                                        <b-form-input placeholder="e.g: zhangsan@163.com" v-model="email.recv"></b-form-input>
                                    </b-form-group>

                                    <b-button variant="primary" @click="setEmail">提交</b-button>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                upload_record: [],
                upload_total: {},
                email: {},
                dismissSecs: 3,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                warningMessage: '',
                isRegister: false,
            }
        },
        methods: {
            calc(size) {
                //此时的size为字节
                //将字节转为 KB
                let kb = Math.ceil(size / 1024);
                if (kb < 1024) {
                    return kb + ' KB'
                }
                let mb = Math.ceil(kb / 1024);
                if (mb < 1024) {
                    return mb + 'MB'
                }
                let gb = Math.ceil(mb / 1024);
                if (gb < 1024) {
                    return gb + 'GB'
                }
                let tb = Math.ceil(gb / 1024);
                if (tb < 1024) {
                    return tb + 'TB'
                }
                return Math.ceil(tb / 1024) + 'PB'
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            repair_sync(){
                this.$ajax.get(this.storage+"/group1/repair?force=1").then(response => {
                    this.dismissCountDown = this.dismissSecs;
                    this.warningMessage = response.data.message;
                })
                .catch(error => {
                    console.log(error);
                });
            },
            async setEmail() {
                let cfg = {};
                await this.$ajax.get(this.storage + "/group1/reload?action=get")
                    .then(response => {
                        cfg = response.data.data;
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
                cfg.mail = this.email;
                cfg.alarm_receivers = [this.email.recv];
                let param = JSON.stringify(cfg);
                this.$ajax.get(this.storage + "/group1/reload?action=set&cfg="+param)
                    .then(response => {
                        this.dismissCountDown = this.dismissSecs;
                        this.warningMessage = "ok";
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
            }
        },
        async created() {
            //获取集群信息
            this.$ajax.get(this.storage + "/group1/stat")
                .then(response => {
                    this.upload_record.push.apply(this.upload_record, response.data.data);
                    this.upload_record.splice(this.upload_record.length - 1, 1);
                    this.upload_record = this.upload_record.slice(-5);
                    this.upload_total = response.data.data[response.data.data.length - 1];
                })
                .catch(error => {
                    console.log(error.response);
                    console.log("集群已下线");
                });

            //获取集群配置信息
            await this.$ajax.get(this.storage + "/group1/reload?action=get")
                .then(response => {
                    this.email = response.data.data.mail;
                    this.email.recv = response.data.data.alarm_receivers[0];
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }
</script>

<style lang="scss">
    .multiple-table-item {
        margin-bottom: 20px;

        .left {
            float: left;
        }

        .right {
            float: right;
        }

        .like {
            margin-right: 10px;
        }
    }

    .stats-percentage {
        padding-right: 5px;
        color: #ffde08;
    }

    .card {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, .05);
        border-radius: .375rem;
        transition: all .15s ease;
    }

    .card-header {
        background-color: #fff;
    }

    .btn-primary {
        border-radius: 5px;
    }

    .breadcrumb {
        background-color: rgba(0, 0, 0, 0);
        margin-bottom: 0;
    }

    .avatar {
        color: #fff;
        background-color: rgba(0, 0, 0, 0);
        display: inline-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 1rem;
        border-radius: 50%;
        height: 48px;
        width: 48px;
    }

    .rounded-circle {
        border-radius: 50% !important;
    }

    .path-style {
        font-size: .85rem;
        font-family: Open Sans, sans-serif;
        color: #09aaff;
    }

    .first-field-style {
        padding-left: 10px;
        text-align: left;
    }

    .field-style {
        justify-content: center;
        align-items: center;
        line-height: 46px;
        height: 46px;
    }

    .table-style {
        font-family: Open Sans, sans-serif;
        font-size: 1rem;

        thead {
            background-color: #f6f9fc;
            color: #8898aa;

            tr {
                th {
                    padding-left: 1.5rem;
                    padding-right: 1.5rem;
                }
            }
        }

        tbody tr td {
            padding-left: 1.4rem;
        }

        .far {
            padding-right: 5px;
            color: Dodgerblue;
        }

        .fas {
            padding-right: 5px;
        }
    }

    .notification-date {
        text-align: left;
    }

    .notification-count {
        text-align: center;
    }

    .notification-size {
        text-align: right;
    }
</style>