<template>
    <div class="share">
        <b-modal id="file-share" hide-footer centered>
            <template v-slot:modal-title>
                确定 <code>共享</code> ?
            </template>
            <div class="d-block text-center">
                <h3>确认后，你的文件私密性将无法保障. 你确定吗?</h3>
            </div>
            <b-button class="mt-3" block @click="share" variant="danger">确定!</b-button>
        </b-modal>

    </div>
</template>

<script>
    export default {
        name: 'share',
        props: {
            id: {
                type: String,
            },
            user: {
                type: Object,
            }
        },
        data() {
            return {}
        },
        methods: {
            share() {
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                this.$ajax.get(this.server + '/api/file/share?username=' + this.user.username + '&id=' + this.id, {
                    headers: headers
                }).then(response => {
                    console.log(response.data);
                    this.$emit('share2Refresh');
                });
                this.$bvModal.hide('file-share');
            },
        }
    }
</script>