<template>
    <b-container fluid class="mt-1">
        <b-row>
            <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <b-button type="button" variant="primary" class="mr-2" @click="uploadModal">
                                                <i class="fas fa-cloud-upload-alt"></i> Upload
                                            </b-button>
                                        </div>
                                        <div class="col text-right">
                                            <b-button type="button" variant="primary" @click="refresh">
                                                <i class="fas fa-sync-alt"></i> Refresh
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
                                            :per-page="pagination.perPage"
                                            :current-page="pagination.currentPage"
                                    >
                                        <template v-slot:cell(filename)="row">
                                            <div class="media align-items-center first-field-style">
                                                <span v-if="row.item.isDir" class="avatar rounded-circle"
                                                      style="font-size: 24px; color: Dodgerblue;">
                                                    <i class="fas fa-folder"></i>
                                                </span>
                                                <span v-else class="avatar rounded-circle"
                                                      style="font-size: 24px; color: Mediumslateblue;">
                                                    <i :class="iconType(row.value)"></i>
                                                </span>
                                                <span class="name mb-0 text-sm">
                                                        {{ row.value }}
                                                    </span>
                                            </div>
                                        </template>

                                        <template v-slot:cell(size)="row">
                                            <div class="field-style">
                                                <span v-if="row.value < 1024">
                                                    {{row.value}} MB
                                                </span>
                                                <span v-else>
                                                    {{(row.value / 1024).toFixed(2)}} GB
                                                </span>
                                            </div>
                                        </template>

                                        <template v-slot:cell(uptime)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(actions)="row">
                                            <div class="field-style">
                                                <a class="edit" href="javascript:void(0)" title="edit" @click="renameFile(row.item)">
                                                    <i class="fas fa-pen-square"></i>
                                                </a>
                                                <a class="download" href="javascript:void(0)" title="download"
                                                   @click="downloadFile(row.item)">
                                                    <i class="fas fa-arrow-circle-down"></i>
                                                </a>
                                                <a class="remove" href="javascript:void(0)" title="Remove" @click="deleteFile(row.item)">
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
        <b-modal id="secret-upload" centered title="Upload" hide-footer hide-header-close>
            <div>
                <b-form-file v-model="current_file" ref="file-input" class="mb-2"></b-form-file>
                <b-button @click="uploadFile" class="mr-2" variant="primary">Upload</b-button>
                <b-button @click="resetUpload" variant="danger">Reset</b-button>
            </div>
            <div v-if="show_progress" class="pt-3">
                <b-progress :value="progress_rate" :max="progress_max" show-progress animated></b-progress>
            </div>
            <div v-if="show_upload_result">
                <b-alert
                        :show="dismissCountDown"
                        dismissible
                        :variant="alertVariant"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                >
                    {{show_message}}
                </b-alert>
            </div>
        </b-modal>
        <b-modal id="secret-file-remove" hide-footer centered>
            <template v-slot:modal-title>
                Confirm <code>delete</code> ?
            </template>
            <div class="d-block text-center">
                <h3>After confirming the deletion, the file will be unrecoverable. Are you sure?</h3>
            </div>
            <b-button class="mt-3" block @click="realDeleteFile" variant="danger">I'm sure!</b-button>
        </b-modal>
        <b-modal id="secret-file-rename" centered title="Rename" hide-footer hide-header-close>
            <b-form-input v-model="rename_file" placeholder="Enter Directory Name"></b-form-input>
            <div class="mt-2"></div>
            <b-button @click="realRenameFile" class="mr-2" variant="primary">Submit</b-button>
            <b-button @click="rename_file = ''" variant="danger">Reset</b-button>
        </b-modal>
    </b-container>
</template>

<script>
    import CryptoJS from "crypto-js";
    import FileTools from "@/functions/FileTools";

    export default {
        name: 'shared',
        data() {
            return {
                current_file: null,//需要操作的文件
                progress_max: 100,//进度条最大值
                progress_rate: 0,//进度条初始值
                show_progress: false,//显示进度条? 在点击上传按钮触发
                show_upload_result: false,//上传结果 上传结束后或者上传失败触发
                show_message: '',//模态输出信息
                dismissSecs: 5,//默认提示消息5秒后自动关闭
                dismissCountDown: 0,//当达到0时 自动关闭消息提醒
                showDismissibleAlert: false,//默认打开消息提醒？
                alertVariant: 'success',//默认消息提示颜色
                //加密相关的密钥
                secret: {
                    fk: '',
                    iv: '',
                    ak: ''
                },
                //分页相关
                pagination: {
                    perPage: 15,
                    currentPage: 1,
                },
                //当前用户登录信息
                user: {},
                //文件信息
                file_info: {
                    filename: '',
                    mime: ''
                },
                rename_file: '',
                operate_file: {},
                //上传存储层的结果
                storage_result: {},
                pid: '',//加密目录的ID 加密文件全记录在此
                items: [],
                fields: [
                    {key: 'filename', label: 'FileName'},
                    {key: 'size', label: 'Size', sortable: true},
                    {key: 'uptime', label: 'Update Time', class: 'text-center', sortable: true},
                    {key: 'actions', label: 'Actions'},
                ],
            }
        },
        methods: {
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
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
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
            uploadModal() {
                this.$bvModal.show('secret-upload');
            },
            resetUpload() {
                this.current_file = null;
            },
            toBlob(base64) {
                let bstr = atob(base64),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                if (this.file_info.mime === "") {
                    this.file_info.mime = "text/plain";
                }
                return new Blob([u8arr], {
                    type: this.file_info.mime
                });
            },
            blobToFile(blob) {
                if (this.file_info.mime === "") {
                    this.file_info.mime = "text/plain";
                }
                return new File([blob], this.file_info.filename, {type: this.file_info.mime});
            },
            async realUploadFile(file) {
                //真正意义上的上传函数 下面的函数用来进行逻辑操作
                //上传文件
                this.show_progress = true;
                let param = new FormData();
                param.append('file', file);
                param.append('scene', 'default');
                param.append('output', 'json');
                // param.append('path',this.user.username);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress: e => {
                        if (e.lengthComputable) {
                            let rate = this.progress_rate = (e.loaded / e.total) * 100; //已经上传的比例
                            if (rate < 100) {
                                this.progress_rate = rate;
                            }
                        }
                    }
                };
                //开始上传到存储端
                await this.$ajax
                    .post(this.storage + "/group1/upload", param, config)
                    .then(response => {
                        console.log("存储层上传结果:",response.data);
                        this.show_upload_result = true;
                        this.dismissCountDown = this.dismissSecs;
                        this.show_message = '上传成功!';
                        this.storage_result = response.data;
                    })
                    .catch(error => {
                        this.show_upload_result = true;
                        this.dismissCountDown = this.dismissSecs;
                        this.show_message = '上传失败!';
                        this.alertVariant = 'danger';
                    });
                //开始同步信息到服务端
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                let params = new URLSearchParams({
                    filename: this.file_info.filename,
                    mime: this.file_info.mime,
                    uptime: this.storage_result.mtime,
                    pid: this.pid,
                    size: this.storage_result.size,
                    hashcode: this.storage_result.md5,
                    filepath: this.storage_result.path,
                });
                this.$ajax
                    .post(this.server + "/api/file/upload?username=" + this.user.username, params, {
                        headers: headers
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
            },
            async uploadFile() {
                let temp_file = null;
                if (this.current_file === null) {
                    this.show_upload_result = true;
                    this.dismissCountDown = this.dismissSecs;
                    this.show_message = '上传文件不能为空!';
                    this.alertVariant = 'danger';
                    return;
                }
                if ((this.current_file.size / 1024 / 1024) > 50) {
                    this.show_upload_result = true;
                    this.dismissCountDown = this.dismissSecs;
                    this.show_message = '上传文件不能超过50MB!';
                    this.alertVariant = 'danger';
                    return;
                }
                this.file_info.filename = this.current_file.name;
                this.file_info.mime = this.current_file.type;
                let reader = new FileReader();
                reader.onload = () => {
                    let data = reader.result.split(',');
                    let encrypted = CryptoJS.AES.encrypt(data[1], this.secret.fk, {
                        mode: CryptoJS.mode.CTR,
                        iv: this.secret.iv
                    }).toString();
                    // temp_file = this.blobToFile(this.toBlob(encrypted));
                    this.realUploadFile(this.blobToFile(this.toBlob(encrypted)))
                };
                reader.readAsDataURL(this.current_file);
            },
            async downloadFile(item) {
                //下载文件
                this.file_info.mime = item.mime;
                this.file_info.filename = item.filename;
                await this.$ajax
                    .get(this.storage + item.filepath, {
                        responseType: 'blob'
                    }).then(value => {
                    this.current_file = value.data;
                });
                let reader = new FileReader();
                reader.onload = () => {
                    let data = reader.result.split(',');
                    let decrypted = CryptoJS.AES.decrypt(data[1], this.secret.fk, {
                        mode: CryptoJS.mode.CTR,
                        iv: this.secret.iv
                    }).toString(CryptoJS.enc.Utf8);
                    // this.current_file = this.toBlob(decrypted);
                    const a = document.createElement("a");
                    const url = window.URL.createObjectURL(this.toBlob(decrypted));
                    const filename = this.file_info.filename;
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                reader.readAsDataURL(this.current_file);
            },
            refresh() {
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取根文件列表
                this.$ajax
                    .get(this.server + "/api/file/secret/list?username=" + this.user.username, {
                        headers: headers
                    })
                    .then(response => {
                        //获取当前目录ID
                        this.pid = response.data.message;
                        this.items.splice(0);
                        this.items.push.apply(this.items, response.data.data);
                    })
                    .catch(error => {
                        //获取根目录失败
                    });
            },
            deleteFile(item){
                this.operate_file = item;
                this.$bvModal.show('secret-file-remove');
            },
            realDeleteFile(){
                this.$ajax
                    .get(this.storage + '/group1/delete?md5=' + this.operate_file.hashcode).then(response => {
                    console.log(response);
                });
                // 删除存储在服务端数据库的数据
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                this.$ajax.get(this.server + '/api/file/delete?username=' + this.user.username + '&id=' + this.operate_file.id, {
                    headers: headers
                }).then(response => {
                    console.log(response.data);
                    this.$bvModal.hide('secret-file-remove');
                });
            },
            renameFile(item){
                this.operate_file = item;
                this.$bvModal.show('secret-file-rename');
            },
            realRenameFile(){
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取根文件列表
                this.$ajax
                    .get(this.server +"/api/file/rename?username="+this.user.username+"&id="+this.operate_file.id+"&dirname="+this.rename_file,{
                        headers:headers
                    })
                    .then(response => {
                        // 修改成功
                        console.log(response.data);
                        this.$bvModal.hide('secret-file-rename');
                    })
                    .catch(error => {
                        //失败
                        this.file.show_upload_result = true;
                        this.file.dismissCountDown = this.file.dismissSecs;
                        this.file.show_message = '修改失败!';
                    });
            },
        },
        created() {
            if (!this.getToken()) {
                //没有token相关信息 页面重定向
                return;
            } else {
                // 登录成功 获取文件根目录
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取根文件列表
                this.$ajax
                    .get(this.server + "/api/file/secret/list?username=" + this.user.username, {
                        headers: headers
                    })
                    .then(response => {
                        //获取当前目录ID
                        this.pid = response.data.message;
                        this.items.push.apply(this.items, response.data.data);
                    })
                    .catch(error => {
                        //获取根目录失败
                    });
            }
            if (localStorage.getItem('_type') !== null) {
                this.secret.fk = localStorage.getItem('_fk');
                this.secret.iv = localStorage.getItem('_iv');
                this.secret.ak = localStorage.getItem('_ak');
            } else {
                this.secret.fk = sessionStorage.getItem('_fk');
                this.secret.iv = sessionStorage.getItem('_iv');
                this.secret.ak = sessionStorage.getItem('_ak');
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

    .btn-primary {
        border-radius: 5px;
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