<template>
    <div class="admin mt-2">
        <b-container fluid>
            <b-row class="dash-row">
                <b-col xl="6" lg="6" md="12" sm="12">
                    <div class="stats stats-primary">
                        <h3 class="stats-title"> 会员注册数 </h3>
                        <div class="stats-content">
                            <div class="stats-icon">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="stats-data">
                                <div class="stats-number">{{user_num}}</div>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col xl="6" lg="6" md="12" sm="12">
                    <div class="stats stats-success">
                        <h3 class="stats-title"> 磁盘使用量 </h3>
                        <div class="stats-content">
                            <div class="stats-icon">
                                <i class="fas fa-box"></i>
                            </div>
                            <div class="stats-data">
                                <div class="stats-number">
                                        <span v-b-tooltip.hover title="Used disk size">
                                            {{file_size}}
                                        </span>
                                </div>
                                <div class="stats-change">
                                    <span class="stats-percentage">{{file_count}}</span>
                                    <span class="stats-timeframe">个文件</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                user_num: 0,
                file_count: 0,
                file_size: '',
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
        },
        created() {
            //获取统计人数
            var headers = {
                token: sessionStorage.getItem("_admin_token"),
            };
            this.$ajax
                .get(this.server +"/api/admin/user/count",{
                    headers:headers
                })
                .then(response => {
                    this.user_num = response.data.data;
                })
                .catch(error => {
                    //获取失败
                    console.log(error.response)
                });
            //获取统计数量
            this.$ajax.get(this.storage + "/group1/stat")
                .then(response => {
                    let all = response.data.data[response.data.data.length - 1];
                    this.file_count = all.fileCount;
                    this.file_size = this.calc(all.totalSize);
                })
                .catch(error => {
                    console.log(error.response);
                    console.log("集群已下线");
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
</style>