<template>
    <b-container fluid class="mt-5">
        <b-row>
            <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h3>共享列表</h3>
                                        </div>
                                        <div class="col text-right">
                                            <b-button type="button" variant="primary" @click="refresh">
                                                <i class="fas fa-sync-alt"></i> 刷新
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <b-table
                                            id="my-table"
                                            show-empty
                                            small
                                            stacked="md"
                                            :items="items"
                                            :fields="fields"
                                            table-class="table-style"
                                    >
                                        <template v-slot:cell(filename)="row">
                                            <div class="media align-items-center first-field-style">
                                                <span v-if="row.item.isDir" class="avatar rounded-circle"
                                                      style="font-size: 24px; color: Dodgerblue;">
                                                    <i class="fas fa-folder"></i>
                                                </span>
                                                <span v-else class="avatar rounded-circle" style="font-size: 24px; color: Mediumslateblue;">
                                                    <i :class="iconType(row.value)"></i>
                                                </span>
                                                <span class="name mb-0 text-sm">
                                                        <a :href="'/share/' + row.item.fsk" target="_blank">{{ row.value }}</a>
                                                    </span>
                                            </div>
                                        </template>

                                        <template v-slot:cell(uptime)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(fsk)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(actions)="row">
                                            <div class="field-style">
                                                <a class="remove" href="javascript:void(0)" title="复制文件共享码" v-clipboard:copy="row.item.fsk">
                                                    <i class="fas fa-key"></i>
                                                </a>
                                                <a class="remove" href="javascript:void(0)" title="复制文件共享链接" v-clipboard:copy="website + row.item.fsk">
                                                    <i class="fas fa-link"></i>
                                                </a>
                                                <a class="remove" href="javascript:void(0)" title="取消共享" @click="cancel(row.item.id)">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </div>
                                        </template>

                                    </b-table>
                                </div>
                                <div class="card-footer d-flex justify-content-end">
                                    <b-pagination
                                            v-model="pagination.currentPage"
                                            :total-rows="rows"
                                            :per-page="pagination.perPage"
                                            aria-controls="my-table"
                                    ></b-pagination>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import FileTools from "@/functions/FileTools";

    export default {
        name: 'shared',
        data() {
            return {
                // 某文件夹中的数据列表
                items: [],
                fields: [
                    {key: 'filename', label: '文件名'},
                    {key: 'fsk', label: '文件共享码'},
                    {key: 'uptime', label: '上传时间', class: 'text-center', sortable: true},
                    {key: 'actions', label: '操作'},
                ],
                pagination: {
                    perPage: 15,
                    currentPage: 1,
                },
                user: {},// token uid username
                //客户端服务地址
                website: ''
            }
        },
        methods: {
            refresh(){
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取当前文件夹文件列表
                this.$ajax
                    .get(this.server +"/api/file/share/list?username="+this.user.username,{
                        headers:headers
                    })
                    .then(response => {
                        //先清空数组元素
                        this.items.splice(0);
                        //将结果Push到数组
                        this.items.push.apply(this.items,response.data.data);
                    })
                    .catch(error => {
                        if (error.response.status === 400) {
                            alert("token错误");
                            this.$router.push({
                                path: this.redirect || "/auth/login"
                            });
                        }
                        console.log(error.response);
                    });
            },
            cancel(id){
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                this.$ajax.get(this.server + '/api/file/share/cancel?username=' + this.user.username + '&id=' + id, {
                    headers: headers
                }).then(response => {
                    console.log(response.data);
                    this.refresh();
                });
            },
            iconType(filename) {
                let res = FileTools.matchType(filename);
                let result = res.result;
                if (result === 'image') {
                    //图片后缀
                    return {
                        fas: true,
                        'fas fa-file-image':true
                    }
                } else if (result === 'radio') {
                    return {
                        fas: true,
                        'fas fa-file-audio': true
                    }
                } else if (result === 'archive') {
                    return {
                        fas: true,
                        'fa-file-archive': true
                    }
                } else if (result === 'video') {
                    return {
                        fas: true,
                        'fas fa-file-video': true
                    }
                } else if (result === 'word') {
                    return {
                        fas: true,
                        'fas fa-file-word': true
                    }
                }else if (result === 'pdf'){
                    return {
                        fas: true,
                        'fas fa-file-pdf': true
                    }
                }else if (result === 'ppt'){
                    return {
                        fas: true,
                        'fas fa-file-powerpoint': true
                    }
                }else if (result === 'excel'){
                    return {
                        fas: true,
                        'fas fa-file-excel': true
                    }
                }else if (result === 'code') {
                    return {
                        fas: true,
                        'fas fa-file-code': true
                    }
                } else {
                    //没有后缀或者没有匹配到相关后缀 返回一个未知类型
                    return {
                        fas: true,
                        'fas fa-question': true
                    }
                }
            },
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
        },
        created() {
            if(!this.getToken()) {
                //没有token相关信息 页面重定向
                return;
            }else{
                //获取分享链接的前缀
                this.website = this.client + '/share/';
                // 登录成功 获取文件根目录
                this.refresh();
            }
        },
        computed: {
            rows() {
                return this.items.length
            }
        }
    }
</script>

<style lang="scss">
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

    .btn-primary,.btn-danger {
        border-radius: 5px !important;
    }

    .breadcrumb {
        background-color: rgba(0,0,0,0) !important;
        margin-bottom: 0 !important;
    }

    .avatar {
        color: #fff;
        background-color: rgba(0,0,0,0);
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
        border-radius: 50%!important;
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