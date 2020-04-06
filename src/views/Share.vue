<template>
    <div class="share">
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 class="my-0 mr-md-auto font-weight-normal">GoPan</h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <a class="p-2 text-dark" href="/">首页</a>
                <span v-if="isLogin">
                    <router-link :to="{name:'dashboard'}" class="btn btn-outline-primary">Dashboard</router-link>
                </span>
                <span v-else>
                    <router-link class="p-2 text-dark" :to="{name:'signin'}">登录</router-link>
                    <router-link class="btn btn-outline-primary" :to="{name:'signup'}">注册</router-link>
                </span>
            </nav>
        </div>

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Sharing</h1>
            <p class="lead">You can view the list of shared files here.</p>
        </div>

        <div class="container-fluid">
            <b-container fluid class="mt-4 mb-4">
                <b-row>
                    <b-col xl="10" lg="10" md="12" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                        <div class="card shadow">
                            <div class="card-header border-0">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h3>{{filename}}</h3>
                                    </div>
                                    <div v-if="isLogin" class="col text-right">
                                        <b-button type="button" variant="primary" @click="collection">
                                            <i class="far fa-heart"></i> Collection
                                        </b-button>
                                    </div>
                                </div>
                                <div v-if="path_items.length >= 1" class="row align-items-center">
                                    <h5 class="mb-0 path-style">
                                        <template>
                                            <b-breadcrumb>
                                                <b-breadcrumb-item v-for="item in path_items"
                                                                   @click="changeSuperiorDir(item.key)">
                                                    {{item.text}}
                                                </b-breadcrumb-item>
                                            </b-breadcrumb>
                                        </template>
                                    </h5>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <b-table
                                        show-empty
                                        small
                                        stacked="md"
                                        :items="items"
                                        :fields="fields"
                                        table-class="table-style"
                                >
                                    <template v-slot:cell(filename)="row">
                                        <div class="media align-items-center first-field-style">
                                            <div v-if="row.item.isDir">
                                                    <span class="avatar rounded-circle"
                                                          style="font-size: 24px; color: Dodgerblue;">
                                                    <i class="fas fa-folder"></i>
                                                    </span>
                                                <span class="name mb-0 text-sm">
                                                        <a href="javascript:void(0)" @click="changeDir(row.value,row.item.fsk)">{{row.value}}</a>
                                                    </span>
                                            </div>

                                            <div v-else>
                                                    <span class="avatar rounded-circle" style="font-size: 24px; color: Mediumslateblue;">
                                                        <i :class="iconType(row.value)"></i>
                                                    </span>
                                                <span class="name mb-0 text-sm">
                                                        {{row.value}}
                                                    </span>
                                            </div>

                                        </div>
                                    </template>

                                    <template v-slot:cell(size)="row">
                                        <div class="field-style">
                                                <span v-if="row.value < 1000">
                                                    {{row.value}} MB
                                                </span>
                                            <span v-else>
                                                    {{(row.value / 1024).toFixed(2)}} GB
                                                </span>
                                        </div>
                                    </template>

                                    <template v-slot:cell(uptime)="row">
                                        <div class="field-style">
                                            {{row.value}}
                                        </div>
                                    </template>

                                    <template v-slot:cell(actions)="row">
                                        <div class="field-style text-primary">
                                            <span v-if="!row.item.isDir">
                                                    <a class="download" :href="downloadFile(row.item)" title="download">
                                                        <i class="fas fa-arrow-circle-down"></i>
                                                    </a>
                                                </span>
                                        </div>
                                    </template>

                                </b-table>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    import FileTools from "@/functions/FileTools";

    export default {
        name: 'share',
        data(){
            return {
                isLogin: false,
                path_items: [],
                items: [],
                fields: [
                    {key: 'filename', label: 'FileName'},
                    {key: 'size', label: 'Size'},
                    {key: 'uptime', label: 'Update Time', class: 'text-center'},
                    {key: 'actions', label: 'Actions'},
                ],
                user: {},// token uid username
                filename: '',//根文件夹的名称 标识当前分享的名称
                now_path_key: '', //当前文件目录下的fsk
                root_key: ''
            }
        },
        methods: {
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
            getToken() {
                //获取token 若不存在 则跳转到登录页面 若存在 则拉取页面数据 中间过程中进行鉴权
                if (localStorage.getItem("_type") === "localStorage") {
                    //token在localStorage 上
                    this.user.token = localStorage.getItem("_token");
                    this.user.uid = localStorage.getItem("_uid");
                    this.user.username = localStorage.getItem("_username");
                } else {
                    //token在sessionStorage中
                    this.user.token = sessionStorage.getItem("_token");
                    this.user.uid = sessionStorage.getItem("_uid");
                    this.user.username = sessionStorage.getItem("_username");
                }
                return !(this.user.token === null || this.user.uid === null);
            },
            downloadFile(item) {
                return this.storage + item.filepath;
            },
            changeSuperiorDir(key){
                //面包屑里的返回上级目录
                const index = this.path_items.findIndex(item=> item.key === key);
                this.path_items.splice(index+1,this.path_items.length-1);
                this.now_path_key = key;
                this.refresh();
            },
            changeDir(dirname,key) {
                console.log(key);
                //改变当前主目录ID 再调用刷新即可
                this.now_path_key = key;
                this.path_items.push({text: dirname, key: key});
                this.refresh();
            },
            refresh() {
                //获取当前文件夹文件列表
                this.$ajax
                    .get(this.server +"/api/general/share?key="+this.now_path_key)
                    .then(response => {
                        this.items.splice(0);
                        this.items.push.apply(this.items,response.data.data);
                    })
                    .catch(error => {
                        //获取根目录失败
                    });
            },
            setNowPathKey(key) {
                this.now_path_key = key;
                this.path_items.push({text: 'All File', key: key})
            },
            collection() {
                //没有登陆,无法继续操作
                if (!this.isLogin) {
                    alert('操作非法');
                    return
                }
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                let param = new URLSearchParams({
                    username: this.user.username,
                    fsk: this.root_key,
                    filename: this.filename
                });
                this.$ajax
                    .post(this.server +"/api/file/collection", param,{
                        headers: headers
                    })
                .then(response => {
                    //收藏成功
                    console.log(response.data);
                    alert('收藏成功!')
                })
                .catch(error => {
                    console.log(error.response);
                })
            }
        },
        created() {
            //检测是否登录
            if (this.getToken()) {
                this.isLogin = true;
            }
            //获取文件Key
            let key = this.$route.params.key;
            //存储 root-key
            this.root_key = key;
            //获取文件列表
            this.$ajax
                .get(this.server +"/api/general/share?key="+key)
                .then(response => {
                    this.items.push.apply(this.items,response.data.data);
                    this.filename = response.data.message;
                    if (response.data.count > 1) {
                        this.setNowPathKey(key);
                    }
                })
                .catch(error => {
                    //获取根目录失败
                });
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