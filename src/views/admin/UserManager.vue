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
                                            <h4>用户管理</h4>
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
                                            id="user-list"
                                            show-empty
                                            small
                                            stacked="md"
                                            :items="user_list"
                                            :fields="fields"
                                            :filter="filter"
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
                                                <a class="ban" href="javascript:void(0)" title="封禁用户" @click="ban(row.item)">
                                                    <i class="fas fa-ban"></i>
                                                </a>
                                                <a class="group" href="javascript:void(0)" title="修改组" @click="group(row.item)">
                                                    <i class="fas fa-user-friends"></i>
                                                </a>
                                                <a class="group" href="javascript:void(0)" title="重置密码" @click="resetPassword(row.item)">
                                                    <i class="fas fa-redo"></i>
                                                </a>
                                                <a class="group" href="javascript:void(0)" title="详细信息" @click="userDetailInfo(row.item)">
                                                    <i class="fas fa-info"></i>
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
                                            aria-controls="user-list"
                                    ></b-pagination>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </main>
        <b-modal id="ban-user" centered title="禁用用户" hide-footer hide-header-close>
            <div v-if="current_user.status">
                用户将被禁用，是否确定?
                <b-button variant="danger" @click="sure">确定</b-button>
            </div>
            <div v-else>
                用户已被禁用，是否恢复?
                <b-button variant="danger" @click="sure">恢复</b-button>
            </div>
        </b-modal>
        <b-modal id="choose-group" centered title="修改组" hide-footer hide-header-close>
            <b-form-select v-model="group_rule" text-field="name" value-field="rule" :options="group_list" class="mb-2"></b-form-select>
            <b-button @click="sureGroup" class="mt-2" variant="primary">提交</b-button>
        </b-modal>
        <b-modal id="reset-password" centered title="重置用户密码" hide-footer hide-header-close>
            <div>
                用户密码将被重置，是否确定?
                <b-button variant="danger" @click="sureResetPassword">确定</b-button>
            </div>
        </b-modal>
        <b-modal id="user-detail-info" centered title="用户详细信息" hide-footer hide-header-close>
            <b-table stacked :items="user_items" :fields="user_fields"></b-table>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                current_user: {},
                user_items: [],
                user_fields: [
                    {key: 'id',label:'用户ID'},
                    {key: 'username',label:'用户名'},
                    {key: 'email',label:'邮箱'},
                    {key: 'phone',label:'电话'},
                    {key: 'ak',label:'访问密钥'},
                    {key: 'fk',label:'文件密钥'},
                    {key: 'iv',label:'密钥向量'},
                    {key: 'create_time',label:'创建时间'},
                    {key: 'status',label:'用户状态'},
                ],
                group_rule: null,
                user_list: [],
                fields: [
                    {key: 'username', label: '用户名'},
                    {key: 'email', label: '邮箱'},
                    {key: 'create_time', label: '创建时间', class: 'text-center'},
                    {key: 'actions', label: '操作'},
                ],
                group_list: [],
                pagination: {
                    perPage: 15,
                    currentPage: 1,
                },
                filter: null,
            }
        },
        methods: {
            ban(user) {
                this.current_user = user;
                this.$bvModal.show('ban-user');
            },
            sure() {
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server +"/api/admin/user/disabled?id="+this.current_user.id,{
                        headers:headers
                    })
                    .then(response => {
                        this.$bvModal.hide('ban-user');
                        this.refresh();
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },

            group(item){
                this.current_user = item;
                this.$bvModal.show('choose-group');
            },
            sureGroup(){
                //修改用户组信息 [容量修改]
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server + "/api/admin/user/group/update?username="+this.current_user.username+"&role="+this.group_rule, {
                        headers: headers
                    })
                    .then(response => {
                        this.$bvModal.hide('choose-group');
                        this.refresh();
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });

            },

            resetPassword(user){
                this.current_user = user;
                this.$bvModal.show('reset-password');
            },
            sureResetPassword(){
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server +"/api/admin/user/reset?id="+this.current_user.id,{
                        headers:headers
                    })
                    .then(response => {
                        this.$bvModal.hide('reset-password')
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },

            userDetailInfo(user){
                this.user_items.splice(0);
                this.user_items.push(user);
                this.$bvModal.show('user-detail-info');
            },

            refresh() {
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server + "/api/admin/user/list", {
                        headers: headers
                    })
                    .then(response => {
                        this.user_list.splice(0);
                        this.user_list.push.apply(this.user_list,response.data.data);
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
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
        },
        computed: {
            rows() {
                return this.user_list.length
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