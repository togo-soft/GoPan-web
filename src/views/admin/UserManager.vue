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
                                            <h4>User Manager</h4>
                                        </div>
                                        <div class="col text-right">
                                            <b-button type="button" variant="primary">
                                                <i class="fas fa-sync-alt"></i> Refresh
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <b-table
                                            show-empty
                                            small
                                            stacked="md"
                                            :items="user_list"
                                            :fields="fields"
                                            table-class="table-style"
                                    >
                                        <template v-slot:cell(username)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(nickname)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(email)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(create_time)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(actions)="row">
                                            <div class="field-style">
                                                <a class="ban" href="javascript:void(0)" title="ban" @click="ban(row.item)">
                                                    <i class="fas fa-ban"></i>
                                                </a>
                                                <a class="group" href="javascript:void(0)" title="group" @click="group(row.item.id)">
                                                    <i class="fas fa-user-friends"></i>
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
        <b-modal id="ban-user" centered title="Disabled User" hide-footer hide-header-close>
            <div v-if="current_user.status">
                The user will be disabled, are you sure?
                <b-button variant="danger" @click="sure">Sure</b-button>
            </div>
            <div v-else>
                The user has been disabled. Are you sure you want to restore?
                <b-button variant="danger" @click="sure">Restore</b-button>
            </div>
        </b-modal>
        <b-modal id="choose-group" centered title="Change Group" hide-footer hide-header-close>
            <b-form-select v-model="group_rule" text-field="name" value-field="rule" :options="group_list" class="mb-2"></b-form-select>
            <b-button @click="sureGroup" class="mt-2" variant="primary">Submit</b-button>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                current_user: {},
                group_rule: null,
                user_list: [],
                fields: [
                    {key: 'username', label: 'Username'},
                    {key: 'nickname', label: 'Nickname'},
                    {key: 'email', label: 'Email'},
                    {key: 'create_time', label: 'Create Time', class: 'text-center'},
                    {key: 'actions', label: 'Actions'},
                ],
                group_list: []
            }
        },
        methods: {
            ban(user) {
                this.current_user = user;
                this.$bvModal.show('ban-user');
            },
            sure() {
                var headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server +"/api/admin/user/disabled?id="+this.current_user.id,{
                        headers:headers
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },
            group(id){
                this.current_user.id = id;
                this.$bvModal.show('choose-group');
            },
            sureGroup(){
                //修改用户组信息 [容量修改]
                console.log(this.group_rule,this.current_user.id);
            },
            getGroup() {
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server + "/api/admin/group/list", {
                        headers: headers
                    })
                    .then(response => {
                        this.group_list.splice(0);
                        this.group_list.push.apply(this.group_list, response.data.data);
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },
            getUserList() {
                //获取用户列表
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server +"/api/admin/user/list",{
                        headers:headers
                    })
                    .then(response => {
                        this.user_list.push.apply(this.user_list,response.data.data);
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            }
        },
        created() {
            this.getUserList();
            this.getGroup();
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
</style>