<template>
    <div class="preview">
        <div v-if="type.result === 'image'">
            <b-modal id="file-preview" centered scrollable title="预览" hide-footer>
                <b-img fluid-grow :src="source" alt="Image Preview"></b-img>
            </b-modal>
        </div>
        <div v-else-if="type.result === 'pdf'">
            <b-modal id="file-preview" centered scrollable size="xl" title="预览" hide-footer>
                <template v-slot:modal-header="{ close }">

                    <b-button variant="outline-primary" @click="changePdfPage(0)" class="turn"
                              :class="{grey: currentPage==1}">前一页
                    </b-button>
                    {{currentPage}} / {{pageCount}}
                    <b-button variant="outline-primary" @click="changePdfPage(1)" class="turn"
                              :class="{grey: currentPage==pageCount}">下一页
                    </b-button>
                </template>
                <template v-slot:default>
                    <div class="text-center">
                        <pdf :src="source" :page="currentPage" @num-pages="pageCount=$event"
                             @page-loaded="currentPage=$event" @loaded="loadPdfHandler"
                             style="display: inline-block; width: 100%;"></pdf>
                    </div>
                </template>
            </b-modal>
        </div>
        <div v-else-if="type.result === 'excel'">
            <b-modal id="file-preview" centered scrollable size="xl" title="预览" hide-footer>
                <template v-slot:default>
                    <div v-html="excel2html()" class="table-style"></div>
                </template>
            </b-modal>
        </div>
        <div v-else-if="type.result === 'video'">
            <b-modal id="file-preview" centered scrollable title="预览" hide-footer>
                <b-embed
                        type="iframe"
                        aspect="16by9"
                        :src="source"
                        allowfullscreen
                ></b-embed>
            </b-modal>
        </div>
        <div v-else-if="type.result === 'radio'">
            <b-modal id="file-preview" centered scrollable title="预览" hide-footer>
                <audio :src="source" controls="controls"></audio>
            </b-modal>
        </div>
        <div v-else-if="type.result === 'code'">
            <b-modal id="file-preview" centered scrollable size="lg" title="预览" hide-footer>
                <template v-slot:default>
                    <pre v-highlightjs="getContent()">
                    <code :class="type.suffix"></code>
                </pre>
                </template>
            </b-modal>
        </div>
        <div v-else>
            <b-modal id="file-preview" centered scrollable title="预览" hide-footer>
                <template v-slot:default>
                    <p class="text-danger"> 当前格式不支持预览!</p>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import pdf from 'vue-pdf'
    import xlsx from 'xlsx'

    export default {
        name: 'preview',
        components: {
            pdf,
        },
        props: {
            type: {
                type: Object,
            },
            source: {
                type: String,
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
                fileContent: '',
                isClose: ''
            }
        },
        methods: {
            // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
            changePdfPage(val) {
                // console.log(val)
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--
                    // console.log(this.currentPage)
                }
                if (val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++
                    // console.log(this.currentPage)
                }
            },
            // pdf加载时
            loadPdfHandler(e) {
                this.currentPage = 1 // 加载的时候先加载第一页
            },
            getContent() {
                this.$ajax
                    .get(this.source).then(value => {
                    this.fileContent = value.data;
                });
                return this.fileContent;
            },
            setContent(value) {
                this.fileContent = value;
            },
            excel2html() {
                var vm = this;
                this.$ajax
                    .get(this.source,{
                        responseType: 'blob'
                    })
                    .then((response) => {
                        var reader = new FileReader();
                        reader.onload = e => {
                            //预处理
                            var binary = '';
                            var buf = new Uint8Array(e.target.result);
                            var length = buf.byteLength;
                            for (var i = 0; i < length; i++) {
                                binary += String.fromCharCode(buf[i]);
                            }
                            //读取excel
                            const wb = xlsx.read(binary, {type: "binary"});
                            //抓取第一个sheet
                            let wsname = wb.SheetNames[0];
                            let ws = wb.Sheets[wsname];
                            vm.setContent(xlsx.utils.sheet_to_html(ws))
                        };
                        reader.readAsArrayBuffer(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                return this.fileContent;
            },
        },
    }
</script>

<style scoped>
    .hljs {
        display: block;
        background: white;
        padding: 0.5em;
        color: #333333;
        overflow-x: auto;
    }

    .hljs-comment,
    .hljs-meta {
        color: #969896;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-strong,
    .hljs-emphasis,
    .hljs-quote {
        color: #df5000;
    }

    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-type {
        color: #d73a49;
    }

    .hljs-literal,
    .hljs-symbol,
    .hljs-bullet,
    .hljs-attribute {
        color: #0086b3;
    }

    .hljs-section,
    .hljs-name {
        color: #63a35c;
    }

    .hljs-tag {
        color: #333333;
    }

    .hljs-title,
    .hljs-attr,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-selector-attr,
    .hljs-selector-pseudo {
        color: #6f42c1;
    }

    .hljs-addition {
        color: #55a532;
        background-color: #eaffea;
    }

    .hljs-deletion {
        color: #bd2c00;
        background-color: #ffecec;
    }

    .hljs-link {
        text-decoration: underline;
    }

    .hljs-number {
        color: #005cc5;
    }

    .hljs-string {
        color: #032f62;
    }

    table {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }

    table td,
    table th {
        border: 1px solid #cad9ea;
        color: #666;
        height: 30px;
    }

    table thead th {
        background-color: #CCE8EB;
        width: 100px;
    }

    table tr:nth-child(odd) {
        background: #fff;
    }

    table tr:nth-child(even) {
        background: #F5FAFA;
    }
</style>