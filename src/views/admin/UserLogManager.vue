<template>
    <div class="admin">
        <main class="dash-content">
            <div class="container-fluid">
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h4>用户行为</h4>
                                        </div>
                                        <div class="col">
                                            <b-input-group size="sm">
                                                <b-form-input
                                                        v-model="filter"
                                                        type="search"
                                                        id="filterInput"
                                                        placeholder="搜索 ..."
                                                        class="filterInput"
                                                ></b-form-input>
                                                <b-input-group-append>
                                                    <b-button :disabled="!filter" @click="filter = ''">清空</b-button>
                                                </b-input-group-append>
                                                <b-button type="button" variant="primary" class="ml-2">
                                                    <i class="fas fa-sync-alt"></i> 刷新
                                                </b-button>
                                            </b-input-group>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <b-table
                                            id="user-log-list"
                                            show-empty
                                            small
                                            stacked="md"
                                            :items="log_list"
                                            :fields="fields"
                                            :filter="filter"
                                            table-class="table-style"
                                    >
                                        <template v-slot:cell(uid)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>
                                        <template v-slot:cell(username)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(current_address)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(current_ip)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(current_time)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(current_operate)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(actions)="row">
                                            <div class="field-style">
                                                <a class="ban" href="javascript:void(0)" title="详细信息" @click="show(row.item)">
                                                    <i class="fas fa-asterisk"></i>
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
                                            aria-controls="user-log-list"
                                    ></b-pagination>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </main>
        <b-modal id="log-detail" centered title="详细信息" hide-footer hide-header-close>
            <b-table stacked :items="log_detail_items" :fields="log_detail_fields"></b-table>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                current_user: {},
                log_list: [],
                fields: [
                    {key: 'uid', label: 'ID'},
                    {key: 'username', label: '用户名'},
                    {key: 'current_address',label: '地址'},
                    {key: 'current_ip',label: 'IP'},
                    {key: 'current_operate',label: '操作'},
                    {key: 'current_time',label: '时间'},
                    {key: 'actions', label: '操作'}
                ],
                log_detail_items: [],
                log_detail_fields: [
                    {key: 'uid',label:'用户ID'},
                    {key: 'username',label:'用户名'},
                    {key: 'last_address',label:'上次操作地址'},
                    {key: 'current_address',label:'本次操作地址'},
                    {key: 'last_ip',label:'上次操作IP'},
                    {key: 'current_ip',label:'本次操作IP'},
                    {key: 'last_time',label:'上次操作时间'},
                    {key: 'current_time',label:'本次操作时间'},
                    {key: 'last_user_agent',label:'上次操作代理'},
                    {key: 'current_user_agent',label:'本次操作代理'},
                    {key: 'last_operate',label:'上次操作'},
                    {key: 'current_operate',label:'本次操作'},
                ],
                pagination: {
                    perPage: 15,
                    currentPage: 1,
                },
                filter: null,
            }
        },
        methods: {
            refresh() {
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server + "/api/admin/log/list", {
                        headers: headers
                    })
                    .then(response => {
                        this.log_list.splice(0);
                        this.log_list.push.apply(this.log_list,response.data.data);
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },
            getUserLogList() {
                //获取用户列表
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server +"/api/admin/log/list",{
                        headers:headers
                    })
                    .then(response => {
                        this.log_list.push.apply(this.log_list,response.data.data);
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },
            show(obj){
                this.log_detail_items.splice(0);
                this.log_detail_items.push(obj);
                this.$bvModal.show('log-detail');
            },
        },
        created() {
            this.getUserLogList();
        },
        computed: {
            rows() {
                return this.log_list.length
            }
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

    #filterInput {
        height: 40px;
    }
</style>