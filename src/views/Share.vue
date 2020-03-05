<template>
    <div class="share">
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 class="my-0 mr-md-auto font-weight-normal">GoPan</h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <a class="p-2 text-dark" href="/">Home</a>
                <a class="p-2 text-dark" href="#">Sign In</a>
            </nav>
            <a class="btn btn-outline-primary" href="#">Sign up</a>
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
                                    {{filename}}
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
                                                        <a href="javascript:void(0)" @click="changeDir(row.item.id)">{{row.value}}</a>
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
                                                    {{row.value}} KB
                                                </span>
                                            <span v-else>
                                                    {{rounding(row.value / 1024)}} MB
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
                items: [],
                fields: [
                    {key: 'filename', label: 'FileName'},
                    {key: 'size', label: 'Size'},
                    {key: 'uptime', label: 'Update Time', class: 'text-center'},
                    {key: 'actions', label: 'Actions'},
                ],
                filename: ''
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
            downloadFile(item) {
                return this.storage + item.filepath;
            },
        },
        created() {
            //获取文件列表
            let key = this.$route.params.key;
            this.$ajax
                .get(this.server +"/api/general/share?key="+key)
                .then(response => {
                    this.items.push.apply(this.items,response.data.data);
                    this.filename = response.data.message;
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