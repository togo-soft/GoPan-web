<template>
    <div class="rename">
        <b-modal id="file-rename" centered title="Rename" hide-footer hide-header-close>
            <b-form-input v-model="dirname" placeholder="Enter Directory Name"></b-form-input>
            <div class="mt-2"></div>
            <b-button @click="rename" class="mr-2" variant="primary">Submit</b-button>
            <b-button @click="dirname = ''" variant="danger">Reset</b-button>
        </b-modal>

    </div>
</template>

<script>
    export default {
        name: 'rename',
        props: {
            id: {
                type: String,
            },
            user: {
                type: Object
            }
        },
        data() {
            return {
                dirname: ''
            }
        },
        methods: {
            rename() {
                var headers = {
                    Authorization: "Bearer " + this.user.token,
                    uid: this.user.uid
                };
                //获取根文件列表
                this.$ajax
                    .get(this.server +"/api/file/rename?username="+this.user.username+"&id="+this.id+"&dirname="+this.dirname,{
                        headers:headers
                    })
                    .then(response => {
                        // 修改成功
                        console.log(response.data);
                        this.$bvModal.hide('rename');
                    })
                    .catch(error => {
                        //失败
                        this.file.show_upload_result = true;
                        this.file.dismissCountDown = this.file.dismissSecs;
                        this.file.show_message = '修改失败!';
                    });
            },
        }
    }
</script>