<template>
    <div class="remove">
        <b-modal id="file-remove" hide-footer centered>
            <template v-slot:modal-title>
                Confirm <code>delete</code> ?
            </template>
            <div class="d-block text-center">
                <h3>After confirming the deletion, the file will be unrecoverable. Are you sure?</h3>
            </div>
            <b-button class="mt-3" block @click="remove" variant="danger">I'm sure!</b-button>
        </b-modal>

    </div>
</template>

<script>
    export default {
        name: 'remove',
        props: {
            file: {
                type: Object,
            },
            user: {
                type: Object,
            }
        },
        data() {
            return {}
        },
        methods: {
            remove() {
                let headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                if (!this.file.isDir) {
                    // 删除存储层的文件
                    this.$ajax
                        .get(this.storage + '/group1/delete?md5=' + this.file.hashcode).then(response => {
                        console.log(response);
                    });
                    // 删除存储在服务端数据库的数据
                    this.$ajax.get(this.server + '/api/file/delete?username=' + this.user.username + '&id=' + this.file.id, {
                        headers: headers
                    }).then(response => {
                        console.log(response.data);
                        this.$emit('remove2Refresh');
                    });
                } else {
                    //删除文件夹
                    this.$ajax.get(this.server + '/api/file/delete/dir?username=' + this.user.username + '&id=' + this.file.id, {
                        headers: headers
                    }).then(response => {
                        console.log(response.data);
                        this.$emit('remove2Refresh');
                    }).catch(error => {
                        console.log(error.response);
                    });
                }
                this.$bvModal.hide('file-remove');
            },
        }
    }
</script>