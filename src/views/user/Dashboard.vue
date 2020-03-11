<template>
    <div class="admin">
        <main class="dash-content">
            <div class="container-fluid">
                <div class="row dash-row">
                    <b-col sm="12" md="8" lg="4" xl="4" offset-md="2" offset-lg="4" offset-xl="4">
                        <div class="stats stats-primary">
                            <h3 class="stats-title"> Usage </h3>
                            <div class="stats-content">
                                <div class="stats-icon">
                                    <i class="fas fa-box"></i>
                                </div>
                                <div class="stats-data">
                                    <div class="stats-number">
                                        <span v-b-tooltip.hover title="Used disk size">
                                            {{unitConversion(storage_ratio.used_size)}}
                                        </span>
                                        /
                                        <span v-b-tooltip.hover title="Total disk space">
                                            {{unitConversion(storage_ratio.total_size)}}
                                        </span>
                                    </div>
                                    <div class="stats-change">
                                        <span class="stats-percentage">-{{((storage_ratio.used_size / storage_ratio.total_size) * 100).toFixed(2)}}%</span>
                                        <span class="stats-timeframe">Used ratio</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </div>
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="10" lg="10" md="12" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <b-button type="button" variant="primary" class="mr-2" v-b-modal.upload>
                                                <i class="fas fa-cloud-upload-alt"></i> Upload
                                            </b-button>
                                            <b-button type="button" variant="primary" v-b-modal.mkdir>
                                                <i class="fas fa-folder-plus"></i> Mkdir
                                            </b-button>
                                        </div>
                                        <div class="col text-right">
                                            <b-button type="button" variant="primary" @click="refresh">
                                                <i class="fas fa-sync-alt"></i> Refresh
                                            </b-button>
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <h5 class="mb-0 ml-3 mt-2 path-style">
                                            <template>
                                                <b-breadcrumb>
                                                    <b-breadcrumb-item v-for="item in path_items"
                                                                       @click="changeSuperiorDir(item.id)">
                                                        {{item.text}}
                                                    </b-breadcrumb-item>
                                                </b-breadcrumb>
                                            </template>
                                        </h5>
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
                                                <div v-if="row.item.isDir">
                                                    <span class="avatar rounded-circle"
                                                          style="font-size: 24px; color: Dodgerblue;">
                                                    <i class="fas fa-folder"></i>
                                                    </span>
                                                    <span class="name mb-0 text-sm">
                                                        <a href="javascript:void(0)" @click="changeDir(row.item.filename,row.item.id)">{{row.value}}</a>
                                                    </span>
                                                </div>

                                                <div v-else>
                                                    <span class="avatar rounded-circle"
                                                          style="font-size: 24px; color: Mediumslateblue;">
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
                                                <span v-if="row.item.isDir">
                                                    -
                                                </span>
                                                <span v-else-if="row.value < 1024">
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
                                                <a class="share" title="share" @click="shareFile(row.item)">
                                                    <i class="fas fa-share-alt-square"></i>
                                                </a>
                                                <a class="edit" title="edit" @click="renameFile(row.item.id)">
                                                    <i class="fas fa-pen-square"></i>
                                                </a>
                                                <a class="remove" title="Remove" @click="removeFile(row.item)">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                                <span v-if="!row.item.isDir">
                                                    <a class="download" @click="previewFile(row.item)" title="view">
                                                        <i class="fas fa-eye"></i>
                                                    </a>
                                                    <a class="download" :href="downloadFile(row.item)" title="download">
                                                        <i class="fas fa-arrow-circle-down"></i>
                                                    </a>
                                                </span>
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
            </div>
        </main>
        <b-modal id="upload" centered title="Upload" hide-footer hide-header-close>
            <div>
                <b-form-file v-model="file.current_file" ref="file-input" class="mb-2"></b-form-file>
                <b-button @click="uploadFile" class="mr-2" variant="primary">Upload</b-button>
                <b-button @click="resetUpload" variant="danger">Reset</b-button>
            </div>
            <div v-if="file.show_progress" class="pt-3">
                <b-progress :value="file.progress_rate" :max="file.progress_max" show-progress animated></b-progress>
            </div>
            <div v-if="file.show_upload_result">
                <b-alert
                        :show="file.dismissCountDown"
                        dismissible
                        :variant="file.alertVariant"
                        @dismissed="file.dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                >
                    {{file.show_message}}
                </b-alert>
            </div>
        </b-modal>
        <b-modal id="mkdir" centered title="Create Directory" hide-footer hide-header-close>
            <b-form-input v-model="file.directory_name" placeholder="Enter Directory Name"></b-form-input>
            <div class="mt-2"></div>
            <b-button @click="createDir" class="mr-2" variant="primary">Submit</b-button>
            <b-button @click="file.directory_name = ''" variant="danger">Reset</b-button>
            <div v-if="file.show_message !== ''">
                <b-alert
                        :show="file.dismissCountDown"
                        dismissible
                        :variant="file.alertVariant"
                        @dismissed="file.dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                >
                    {{file.show_message}}
                </b-alert>
            </div>
        </b-modal>
        <rename :id="file.fid" :user="user"></rename>
        <share :id="file.fid" :user="user" @share2Refresh="refresh"></share>
        <b-modal id="file-isShare" centered title="Warning" hide-footer hide-header-close>
            The file has been shared, you don't need to operate any more
        </b-modal>
        <preview :type="preview.fileType" :source="preview.source"></preview>
        <remove :file="removeFileObject" :user="user" @remove2Refresh="refresh"></remove>
    </div>
</template>

<script>
    import FileTools from "@/functions/FileTools";
    import Preview from "@/components/Preview";
    import Remove from "@/components/Remove";
    import Rename from "@/components/Rename";
    import Share from "@/components/Share";

    export default {
        name: 'admin',
        components: {
            Preview,
            Remove,
            Rename,
            Share
        },
        data() {
            return {
                // file是文件上传模态的数据对象
                file: {
                    directory_name: '',
                    fid: '',
                    current_file: null,//文件对象
                    progress_max: 100,//进度条最大值
                    progress_rate: 0,//进度条初始值
                    show_progress: false,//显示进度条? 在点击上传按钮触发
                    show_upload_result: false,//上传结果 上传结束后或者上传失败触发
                    show_message: '',//模态输出信息
                    dismissSecs: 5,//默认提示消息5秒后自动关闭
                    dismissCountDown: 0,//当达到0时 自动关闭消息提醒
                    showDismissibleAlert: false,//默认打开消息提醒？
                    alertVariant: 'success',//默认消息提示颜色
                    storage_result: {},//上传结果
                },
                //用户空间使用率
                storage_ratio: {},
                //文件系统路径 每次操作目录都需要刷新该结果集
                path_items: [],
                // 某文件夹中的数据列表
                items: [],
                fields: [
                    {key: 'filename', label: 'FileName'},
                    {key: 'size', label: 'Size', sortable: true},
                    {key: 'uptime', label: 'Update Time', class: 'text-center', sortable: true},
                    {key: 'actions', label: 'Actions'},
                ],
                pagination: {
                    perPage: 15,
                    currentPage: 1,
                },
                user: {},// token uid username
                preview: {
                    fileType: {},
                    source: ''
                },
                removeFileObject: {},
                now_path_id: '', //当前文件目录下的ID
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.file.dismissCountDown = dismissCountDown
            },
            resetUpload() {
                this.file.current_file = null;
                this.file.show_progress = false;
            },
            refresh() {
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取当前文件夹文件列表
                this.$ajax
                    .get(this.server + "/api/file/list?username=" + this.user.username + "&id=" + this.now_path_id, {
                        headers: headers
                    })
                    .then(response => {
                        //先清空数组元素
                        this.items.splice(0);
                        //将结果Push到数组
                        this.items.push.apply(this.items, response.data.data);
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
            async uploadFile() {
                this.file.show_progress = true;
                let param = new FormData();
                param.append('file', this.file.current_file);
                param.append('scene', 'default');
                param.append('output', 'json');
                // param.append('path',this.user.username);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress: e => {
                        if (e.lengthComputable) {
                            let rate = this.file.progress_rate = (e.loaded / e.total) * 100; //已经上传的比例
                            if (rate < 100) {
                                this.file.progress_rate = rate;
                            }
                        }
                    }
                };
                //开始上传到存储端
                await this.$ajax
                    .post(this.storage + "/group1/upload", param, config)
                    .then(response => {
                        this.file.show_upload_result = true;
                        this.file.dismissCountDown = this.file.dismissSecs;
                        this.file.show_message = '上传成功!';
                        this.storageResult(response.data);
                    })
                    .catch(error => {
                        this.file.show_upload_result = true;
                        this.file.dismissCountDown = this.file.dismissSecs;
                        this.file.show_message = '上传失败!';
                        this.file.alertVariant = 'danger';
                    });
                //开始同步信息到服务端
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                let params = new URLSearchParams({
                    filename: this.file.current_file.name,
                    uptime: this.file.storage_result.mtime,
                    pid: this.now_path_id,
                    size: this.file.storage_result.size,
                    hashcode: this.file.storage_result.md5,
                    filepath: this.file.storage_result.path,
                });
                this.$ajax
                    .post(this.server + "/api/file/upload?username=" + this.user.username, params, {
                        headers: headers
                    })
                    .then(response => {
                        this.file.dismissCountDown = 0;
                        this.file.show_message = '';
                        this.file.progress_rate = 0;
                        this.refresh();
                        this.$bvModal.hide('upload');
                    })
                    .catch(error => {
                        alert(error.response.message)
                    });
            },
            storageResult(data) {
                this.file.storage_result = data;
            },
            iconType(filename) {
                let res = FileTools.matchType(filename);
                let result = res.result;
                if (result === 'image') {
                    //图片后缀
                    return {
                        fas: true,
                        'fas fa-file-image': true
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
                } else if (result === 'pdf') {
                    return {
                        fas: true,
                        'fas fa-file-pdf': true
                    }
                } else if (result === 'ppt') {
                    return {
                        fas: true,
                        'fas fa-file-powerpoint': true
                    }
                } else if (result === 'excel') {
                    return {
                        fas: true,
                        'fas fa-file-excel': true
                    }
                } else if (result === 'code') {
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
            fileType(filename) {
                return FileTools.matchType(filename);
            },
            previewFile(item) {
                //获得文件类型
                this.preview.fileType = this.fileType(item.filename);
                //获得文件资源地址
                this.preview.source = this.storage + item.filepath + "?download=0";
                //预览Modal开启
                this.$bvModal.show('file-preview');
            },
            downloadFile(item) {
                return this.storage + item.filepath;
            },
            removeFile(item) {
                this.removeFileObject = item;
                this.$bvModal.show('file-remove');
            },
            shareFile(item) {
                this.file.fid = item.id;
                if(item.isShare) {
                    this.$bvModal.show('file-isShare');
                }else{
                    this.$bvModal.show('file-share');
                }
            },
            createDir() {
                // 创建虚拟文件系统的文件夹
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取根文件列表
                this.$ajax
                    .get(this.server + "/api/file/createdir?username=" + this.user.username + "&id=" + this.now_path_id + "&dirname=" + this.file.directory_name, {
                        headers: headers
                    })
                    .then(response => {
                        //获取当前目录ID
                        // 创建成功
                        this.refresh();
                        this.$bvModal.hide('mkdir');
                    })
                    .catch(error => {
                        //失败
                        this.file.show_upload_result = true;
                        this.file.dismissCountDown = this.file.dismissSecs;
                        this.file.show_message = '创建失败!';
                    });
            },
            renameFile(id) {
                this.file.fid = id;
                this.$bvModal.show('file-rename');
            },
            changeDir(dirname,id) {
                //改变当前主目录ID 再调用刷新即可
                this.now_path_id = id;
                this.path_items.push({text: dirname, id: id});
                this.refresh();
            },
            changeSuperiorDir(id){
                //面包屑里的返回上级目录
                const index = this.path_items.findIndex(item=> item.id === id);
                this.path_items.splice(index+1,this.path_items.length-1);
                this.now_path_id = id;
                this.refresh();
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
            getNowPathID(id) {
                this.now_path_id = id;
                this.path_items.push({text: 'All File', id: id})
            },
            getRoot() {
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取根文件列表
                this.$ajax
                    .get(this.server + "/api/file/root?username=" + this.user.username, {
                        headers: headers
                    })
                    .then(response => {
                        //获取当前目录ID
                        this.getNowPathID(response.data.message);
                        this.items.push.apply(this.items, response.data.data);
                    })
                    .catch(error => {
                        //获取根目录失败
                        if(error.response.data.code === 4901) {
                            this.$router.push({
                                name: 'error',
                                params: {
                                    code: 4901,
                                    message: 'token认证失败!请重新登录',
                                }
                            });
                        }
                    });
            },
            getRatio() {
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取用户空间使用率
                this.$ajax
                    .get(this.server + "/api/file/ratio?username=" + this.user.username, {
                        headers: headers
                    })
                    .then(response => {
                        this.storage_ratio = response.data.data;
                    })
                    .catch(error => {
                        //获取根目录失败
                        console.log(error.response);
                        if(error.response.data.code === 4901) {
                            this.$router.push({
                                name: 'error',
                                params: {
                                    code: 4901,
                                    message: 'token认证失败!请重新登录',
                                }
                            });
                        }
                    });
            },
            unitConversion(size) {
                //单位换算
                if (size < 1024) {
                    return size.toFixed(2) + 'M'
                }
                return (size / 1024) + 'G'
            },
        },
        created() {
            if (!this.getToken()) {
                //没有token相关信息 页面重定向
                this.$router.push({
                    name: 'error',
                    params: {
                        code: 400,
                        message: 'token认证失败!请重新登录',
                    }
                });
            } else {
                // 登录成功 获取文件根目录
                this.getRoot();
                //获取用户空间使用率
                this.getRatio();
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

    .btn-primary, .btn-danger {
        border-radius: 5px !important;
    }

    .breadcrumb {
        background-color: rgba(0, 0, 0, 0) !important;
        margin-bottom: 0 !important;
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