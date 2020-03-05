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
                                            <b-button type="button" variant="primary" class="mr-2" @click="show">
                                                <i class="fas fa-cloud-upload-alt"></i> New Role
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
                                            show-empty
                                            small
                                            stacked="md"
                                            :items="items"
                                            :fields="fields"
                                            table-class="table-style"
                                    >
                                        <template v-slot:cell(name)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(explain)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(effect)="row">
                                            <div class="field-style">
                                                {{ row.value }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(actions)="row">
                                            <div class="field-style">
                                                <a class="edit" href="javascript:void(0)" title="edit"
                                                   @click="update(row.item)">
                                                    <i class="fas fa-pen-square"></i>
                                                </a>
                                                <a class="remove" href="javascript:void(0)" title="Remove"
                                                   @click="remove(row.item.id)">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </div>
                                        </template>

                                    </b-table>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </main>
        <b-modal id="new-role" centered title="New Role" hide-footer hide-header-close>
            <b-form-input v-model="role.name" placeholder="Enter Role Name" class="mb-2"></b-form-input>
            <b-form-select v-model="role.rule" :options="options" class="mb-2"></b-form-select>
            <b-form-textarea
                    id="textarea"
                    v-model="role.explain"
                    placeholder="Enter rule description..."
                    rows="3"
                    max-rows="6"
            ></b-form-textarea>
            <div class="mt-2"></div>
            <b-button @click="create" class="mr-2" variant="primary">Submit</b-button>
            <b-button @click="clear" variant="danger">Reset</b-button>
            <div v-if="show_message !== ''" class="mt-2">
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
        <b-modal id="remove-role" hide-footer centered>
            <template v-slot:modal-title>
                Confirm <code>delete</code> ?
            </template>
            <div class="d-block text-center">
                <h3>After confirming the deletion, the group information will be unrecoverable. Are you sure?</h3>
            </div>
            <b-button class="mt-3" block @click="sureRemove" variant="danger">I'm sure!</b-button>
        </b-modal>
        <b-modal id="update-role" centered title="Update Role" hide-footer hide-header-close>
            <b-form-input v-model="role.name" placeholder="Enter Role Name" class="mb-2"></b-form-input>
            <b-form-select v-model="role.rule" :options="options" class="mb-2"></b-form-select>
            <b-form-textarea
                    id="textarea"
                    v-model="role.explain"
                    placeholder="Enter rule description..."
                    rows="3"
                    max-rows="6"
            ></b-form-textarea>
            <div class="mt-2"></div>
            <b-button @click="sureUpdate" class="mr-2" variant="primary">Submit</b-button>
            <b-button @click="clear" variant="danger">Reset</b-button>
            <div v-if="show_message !== ''" class="mt-2">
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
    </div>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                now_id: 0,//当前操作的ID
                show_message: '',//模态输出信息
                dismissSecs: 5,//默认提示消息5秒后自动关闭
                dismissCountDown: 0,//当达到0时 自动关闭消息提醒
                showDismissibleAlert: false,//默认打开消息提醒？
                alertVariant: 'success',//默认消息提示颜色
                role: {
                    name: '',
                    rule: null,
                    explain: '',
                    effect: ''
                },
                items: [],
                fields: [
                    {key: 'name', label: 'Name'},
                    {key: 'effect', label: 'Rule'},
                    {key: 'explain', label: 'Explain'},
                    {key: 'actions', label: 'Actions'},
                ],
                options: [
                    {value: null, text: 'Please select an storage rules'},
                    {value: '512', text: '512MB'},
                    {value: '1024', text: '1GB'},
                    {value: '2048', text: '2GB'},
                    {value: '3072', text: '3GB'},
                    {value: '4096', text: '4GB'},
                    {value: '5120', text: '5GB'},
                    {value: '6144', text: '6GB'},
                    {value: '7168', text: '7GB'},
                    {value: '8192', text: '8GB'},
                    {value: '9216', text: '9GB'},
                    {value: '10240', text: '10GB'},
                ]
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            create() {
                if (this.role.rule === null || this.role.name === "" || this.role.explain === "") {
                    console.log("please choose option");
                    return;
                }
                if (this.role.rule === '512') {
                    this.role.effect = '512MB'
                } else if (this.role.rule === '1024') {
                    this.role.effect = '1GB'
                } else if (this.role.rule === '2048') {
                    this.role.effect = '2GB'
                } else if (this.role.rule === '3072') {
                    this.role.effect = '3GB'
                } else if (this.role.rule === '4096') {
                    this.role.effect = '4GB'
                } else if (this.role.rule === '5120') {
                    this.role.effect = '5GB'
                } else if (this.role.rule === '6144') {
                    this.role.effect = '6GB'
                } else if (this.role.rule === '7168') {
                    this.role.effect = '7GB'
                } else if (this.role.rule === '8192') {
                    this.role.effect = '8GB'
                } else if (this.role.rule === '9216') {
                    this.role.effect = '9GB'
                } else if (this.role.rule === '10240') {
                    this.role.effect = '10GB'
                }
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                let param = new URLSearchParams({
                    name: this.role.name,
                    rule: this.role.rule,
                    explain: this.role.explain,
                    effect: this.role.effect
                });
                this.$ajax
                    .post(this.server + "/api/admin/group/add", param, {
                        headers: headers
                    })
                    .then(response => {
                        this.show_message = response.data.message;
                        this.dismissCountDown = this.dismissSecs;
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                        this.show_message = "error!";
                        this.dismissCountDown = this.dismissSecs;
                    });
            },
            remove(id) {
                this.now_id = id;
                this.$bvModal.show('remove-role');
            },
            sureRemove() {
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server + "/api/admin/group/delete?id=" + this.now_id, {
                        headers: headers
                    })
                    .then(response => {
                        this.$bvModal.hide('remove-role');
                        this.refresh();
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },
            update(item) {
                this.role = item;
                this.$bvModal.show('update-role');
            },
            sureUpdate() {
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                let param = new URLSearchParams({
                    id: this.role.id,
                    name: this.role.name,
                    rule: this.role.rule,
                    explain: this.role.explain,
                    effect: this.role.effect
                });
                this.$ajax
                    .post(this.server + "/api/admin/group/update", param, {
                        headers: headers
                    })
                    .then(response => {
                        this.$bvModal.hide('update-role');
                        this.refresh();
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            },
            clear() {
                this.role.name = '';
                this.role.rule = null;
                this.role.effect = '';
                this.role.explain = '';
            },
            show() {
                this.$bvModal.show('new-role');
            },
            refresh() {
                let headers = {
                    token: sessionStorage.getItem("_admin_token"),
                };
                this.$ajax
                    .get(this.server + "/api/admin/group/list", {
                        headers: headers
                    })
                    .then(response => {
                        this.items.splice(0);
                        this.items.push.apply(this.items, response.data.data);
                    })
                    .catch(error => {
                        //获取失败
                        console.log(error.response);
                    });
            }
        },
        created() {
            //获取用户列表
            let headers = {
                token: sessionStorage.getItem("_admin_token"),
            };
            this.$ajax
                .get(this.server + "/api/admin/group/list", {
                    headers: headers
                })
                .then(response => {
                    this.items.push.apply(this.items, response.data.data);
                })
                .catch(error => {
                    //获取失败
                    console.log(error.response);
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