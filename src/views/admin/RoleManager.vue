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
                                            114KB
                                        </span>
                                        /
                                        <span v-b-tooltip.hover title="Total disk space">
                                            5G
                                        </span>
                                    </div>
                                    <div class="stats-change">
                                        <span class="stats-percentage">-25%</span>
                                        <span class="stats-timeframe">Used ratio</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </div>
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <b-button type="button" variant="primary" class="mr-2">
                                                <i class="fas fa-cloud-upload-alt"></i> Upload
                                            </b-button>
                                            <b-button type="button" variant="primary">
                                                <i class="fas fa-folder-plus"></i> Mkdir
                                            </b-button>
                                        </div>
                                        <div class="col text-right">
                                            <b-button type="button" variant="primary">
                                                <i class="fas fa-sync-alt"></i> Refresh
                                            </b-button>
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <h5 class="mb-0 ml-3 mt-2 path-style">
                                            <template>
                                                <b-breadcrumb :items="path_items"></b-breadcrumb>
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
                                            @row-hovered="isHovered"
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
                                                        {{ row.value }}
                                                    </span>
                                            </div>
                                        </template>

                                        <template v-slot:cell(size)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(utime)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(actions)="row">
                                            <div class="field-style">
                                                <a class="share" href="javascript:void(0)" title="share">
                                                    <i class="fas fa-share-alt-square"></i>
                                                </a>
                                                <a class="edit" href="javascript:void(0)" title="edit">
                                                    <i class="fas fa-pen-square"></i>
                                                </a>
                                                <a class="download" href="javascript:void(0)" title="download">
                                                    <i class="fas fa-arrow-circle-down"></i>
                                                </a>
                                                <a class="remove" href="javascript:void(0)" title="Remove">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </div>
                                        </template>

                                    </b-table>
                                </div>
                                <div class="card-footer d-flex justify-content-end">
                                    <ul class="pagination">
                                        <li class="page-item prev-page disabled"><a aria-label="Previous"
                                                                                    class="page-link"><span
                                                aria-hidden="true"><i aria-hidden="true"
                                                                      class="fa fa-angle-left"></i></span></a></li>
                                        <li class="page-item active"><a class="page-link">1</a></li>
                                        <li class="page-item"><a class="page-link">2</a></li>
                                        <li class="page-item"><a class="page-link">3</a></li>
                                        <li class="page-item next-page"><a aria-label="Next" class="page-link"><span
                                                aria-hidden="true"><i aria-hidden="true" class="fa fa-angle-right"></i></span></a>
                                        </li>
                                    </ul>
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
    import FileTools from "@/functions/FileTools";

    export default {
        name: 'admin',
        data() {
            return {
                path_items: [
                    {
                        text: 'All File',
                        href: '#'
                    },
                    {
                        text: 'Manage',
                        href: '#'
                    },
                    {
                        text: 'Library',
                        active: true
                    }
                ],
                items: [
                    {filename: 'Typora', size: '20M', utime: '2020-02-05 17:49:53', isDir: true},
                    {filename: 'Music', size: '20M', utime: '2020-02-05 17:49:53', isDir: true},
                    {filename: 'Video', size: '20M', utime: '2020-02-05 17:49:53', isDir: true},
                    {filename: 'Game', size: '20M', utime: '2020-02-05 17:49:53', isDir: true},
                    {filename: 'Typora.zip', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.jpeg', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.mp3', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.mp4', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.html', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.css', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.js', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.exe', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.doc', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                    {filename: 'Typora.blc', size: '20M', utime: '2020-02-05 17:49:53', isDir: false},
                ],
                fields: [
                    {key: 'filename', label: 'FileName'},
                    {key: 'size', label: 'Size'},
                    {key: 'utime', label: 'Update Time', class: 'text-center'},
                    {key: 'actions', label: 'Actions'},
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                pageOptions: [5, 10, 15],
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                }
            }
        },
        methods: {
            isHovered(item, index, event) {
                //todo

            },
            iconType(filename) {
                var result = FileTools.matchType(filename);
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
                } else if (result === 'document') {
                    return {
                        fas: true,
                        'fas fa-file-word': true
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
            }
        },
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
        background-color: rgba(0,0,0,0);
        margin-bottom: 0;
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