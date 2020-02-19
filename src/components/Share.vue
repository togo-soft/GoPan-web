<template>
    <div class="share">
        <b-modal id="file-share" hide-footer centered>
            <template v-slot:modal-title>
                Confirm <code>Share</code> ?
            </template>
            <div class="d-block text-center">
                <h3>After sharing, your privacy may be exposed. Are you sure?</h3>
            </div>
            <b-button class="mt-3" block @click="share" variant="danger">I'm sure!</b-button>
        </b-modal>

    </div>
</template>

<script>
    export default {
        name: 'share',
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
            share() {
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                this.$ajax.get(this.server + '/api/file/share?username=' + this.user.username + '&id=' + this.file.id, {
                    headers: headers
                }).then(response => {
                    console.log(response.data);
                });
                this.$bvModal.hide('file-share');
            },
        }
    }
</script>