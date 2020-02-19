<template>
    <b-container fluid class="mt-1">
        <b-row>
            <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                <b-container fluid class="mt-4 mb-4">
                    <b-row>
                        <b-col xl="10" lg="10" md="10" sm="12" offset-xl="1" offset-lg="1" offset-md="1">
                            <b-jumbotron header="Secret cave" lead="Your private files can only be opened with a dedicated client.">
                                <div class="qrcode mt-4 mb-4" ref="qrcode"></div>
                                <p>Scan the QR code on the mobile device to obtain the authentication code or directly copy the authentication code in the input box</p>
                                <b-form-input readonly class="mb-3"></b-form-input>
                                <b-button variant="primary" href="#">Copy it</b-button>
                                <p class="mt-5"> Download client <router-link :to="{name: 'home'}">here</router-link> </p>
                            </b-jumbotron>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import QRCode from 'qrcodejs2';
    export default {
        name: 'shared',
        data() {
            return {
                key: 'Hello world!',
            }
        },
        methods: {
            showQRCode() {
                // let qrcode = document.getElementsByClassName('qrcode');
                new QRCode(this.$refs.qrcode, {
                    width: 124,
                    height: 124,        // 高度
                    text: this.key,   // 二维码内容
                    render: 'canvas',   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f',   // 背景色
                    // foreground: '#ff0'    // 前景色
                });
            },
        },
        mounted() {
            this.showQRCode();
        }
    }
</script>

<style lang="scss" scoped>
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