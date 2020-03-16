<template>
    <div class="home w-100 h-100">
        <header>
            <b-container fluid>
                <b-row>
                    <b-col lg="8" offset-lg="2">
                        <b-img src="img/logo.png" fluid alt="logo"></b-img>
                        <div class="intro-text">
                            <span class="subtitle">Cloud Disk</span>
                            <span class="describe">GoPan 是一个基于 Go + Vue 构建的校园网盘系统.</span>
                        </div>
                    </b-col>
                    <b-col v-if="!isLogin" lg="12" class="own-btn">
                        <router-link :to="{name:'login'}" class="btn btn-lg btn-outline">
                            登录
                        </router-link>
                        <router-link :to="{name:'register'}" class="btn btn-lg btn-outline">
                            注册
                        </router-link>
                    </b-col>
                    <b-col v-else lg="12" class="own-btn">
                        <router-link :to="{name:'dashboard'}" class="btn btn-lg btn-outline">
                            控制台
                        </router-link>
                    </b-col>
                </b-row>
            </b-container>
        </header>
        <div class="container protocol-notice hidden-xs">
            <div class="row">
                <div class="col-xs-12"></div>
            </div>
        </div>
        <main class="mb-4 main-container">
            <b-container>
                <h2 class="text-center">
                    查询共享文件
                </h2>
                <b-row>
                    <b-col xl="6" lg="6" md="12" sm="12" offset-xl="3" offset-lg="3">
                        <b-form-input v-model="fsk" placeholder="输入文件共享码"></b-form-input>
                    </b-col>
                </b-row>
                <div class="text-center mt-3">
                    <b-button variant="primary" @click="find">查询</b-button>
                </div>
            </b-container>
            <b-container fluid class="mt-5">
                <h2 class="text-center">
                    构建系统
                </h2>
                <b-row>
                    <b-col xl="6" lg="6" md="12" sm="12" offset-xl="3" offset-lg="3">
                        <div class="intro-text intro-dev">GoPan 基于流行的开发模式 Golang + Vue 进行开发, 构建响应式, 高并发的站点.
                        </div>
                        <div>
                            <h3 class="text-center">
                                技术栈
                            </h3>
                            <b-row>
                                <b-col xl="6" lg="6" md="6" sm="12" offset-xl="3" offset-lg="3" offset-md="3">
                                    <div>
                                        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a> <code
                                            translate="translate" class="text-nowrap">v2.6</code> 被依赖, 使用 <a href="https://getbootstrap.com/" target="_blank" rel="noopener">Bootstrap4</a> 作为默认 UI
                                    </div>

                                    <div>
                                        <a href="https://golang.org/" target="_blank"
                                           rel="noopener">Golang</a> <code translate="translate"
                                                                              class="text-nowrap">v1.11</code> 被依赖, 用来构建服务端.
                                    </div>

                                    <div>
                                        <a href="https://github.com/sjqzhang/go-fastdfs/" target="_blank" rel="noopener">go-fastdfs</a> 被
                                        <strong>依赖</strong>, 作为存储端.
                                    </div>

                                    <div>
                                        <a href="https://www.mysql.com/" target="_blank" rel="noopener">MySQL</a> 被
                                        <strong>依赖</strong>
                                    </div>

                                    <div>
                                        <a href="https://www.mongodb.com/" target="_blank" rel="noopener">MongoDB</a> 被
                                        <strong>依赖</strong>
                                    </div>

                                    <div>
                                        <a href="https://redis.io/" target="_blank" rel="noopener">Redis</a> 被
                                        <strong>依赖</strong>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                        <div>
                            <h3 class="text-center mt-2">
                                部署
                            </h3>
                            <b-row>
                                <b-col xl="6" lg="6" md="6" sm="12" offset-xl="3" offset-lg="3" offset-md="3">
                                    <pre><code class="bash hljs">$ git <span class="hljs-built_in">clone</span> https://github.com/togo-soft/GoPan-web.git
$ git <span class="hljs-built_in">clone</span> https://github.com/togo-soft/GoPan.git
$ <span class="hljs-built_in">cd</span> GoPan-web    //启动客户端
$ npm run serve
$ <span class="hljs-built_in">cd</span> GoPan    //启动服务端
$ go run .
</code></pre>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </main>
        <footer class="bg-light-grey">
            <b-container fluid>
                <b-row class="text-center">
                    <b-col lg="12">
                        <ul class="no-list-style mb-3">
                            <li class="display-inline px-3">
                                <a href="https://github.com/xuthus5/GoDV"
                                >Github</a
                                >
                            </li>
                            <li class="display-inline px-3">
                                <a href="https://gitee.com/xuthus5/GoDV"
                                >Gitee</a
                                >
                            </li>
                            <li class="display-inline px-3">
                                <a href="./docs">Docs</a>
                            </li>
                        </ul>
                    </b-col>
                    <b-col lg="12">
                        <div class="copyright">
                            &copy; {{ year }}
                            <a
                                    href="https://github.com/togo-soft"
                                    target="_blank"
                                    rel="noopener"
                            >Togo soft</a
                            >
                            &
                            <a href="https://www.xuthus.cc" target="_blank" rel="noopener"
                            >xuthus5</a> .
                            UI support by
                            <a
                                    href="https://github.com/HackerThemes/spur-template"
                                    target="_blank"
                                    rel="noopener"
                            >Spur</a
                            >
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                isLogin: false,
                year: new Date().getFullYear(),
                mainProps: {
                    black: true,
                    width: 50,
                    height: 50,
                },
                fsk: '',
                user: {}

            };
        },
        methods: {
            getToken() {
                //获取token 若不存在 则跳转到登录页面 若存在 则拉取页面数据 中间过程中进行鉴权
                if (localStorage.getItem("_type") === "localStorage") {
                    //token在localStorage 上
                    this.user.token = localStorage.getItem("_token");
                    this.user.uid = localStorage.getItem("_uid");
                    this.user.username = localStorage.getItem("_username");
                } else {
                    //token在sessionStorage中
                    this.user.token = sessionStorage.getItem("_token");
                    this.user.uid = sessionStorage.getItem("_uid");
                    this.user.username = sessionStorage.getItem("_username");
                }
                return !(this.user.token === null || this.user.uid === null);
            },
            find() {
                this.$router.push({
                    path: this.redirect || "/share/" + this.fsk
                });
            }
        },
        created() {
            if (this.getToken()) {
                this.isLogin = true;
            }
        }
    };
</script>

<style scoped>
    body {
        font-size: 10px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    header {
        padding-top: 50px;
        padding-bottom: 50px;
        background-color: #186384;
        color: #fff;
        text-align: center;
    }

    .own-btn a:hover {
        color: #FFFFFF;
    }

    .intro-text {
        padding: 15px 0;
    }

    .intro-text .subtitle {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5) !important;
        display: block;
        font-family: "VisbyRoundCF-Bold", "Helvetica Neue", Helvetica, Arial,
        sans-serif;
        font-weight: 700;
        margin-bottom: 1.5rem;
    }

    .intro-text .describe {
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 1.7;
        color: #fff !important;
    }

    .intro-dev {
        font-size: 1.2rem;
        text-align: center;
    }

    .btn-outline {
        margin-top: 10px;
        margin-right: 3px;
        margin-left: 3px;
        border: solid 2px #fff;
        font-size: 20px;
        color: #fff;
    }

    main {
        font-size: 15px;
    }

    main a {
        color: #555;
        text-decoration: none !important;
    }

    main a:hover {
        background-color: rgba(230, 230, 230, 0.25);
    }

    main h2 {
        color: #186384;
        margin-bottom: 10px;
    }

    main span {
        display: inline-block;
    }

    .protocol-notice {
        margin-top: 30px;
    }

    footer {
        color: #808ea0 !important;
        padding-top: 3rem;
        padding-bottom: 3rem;
        font-size: 1rem;
        text-align: center;
    }

    footer a {
        color: #5e72e4;
        text-decoration: none;
        background-color: transparent;
    }

    .display-inline {
        display: inline;
    }

    /* color */
    .bg-light-grey {
        background-color: rgba(229, 229, 229, 0.25);
    }

    .hljs {
        display: block;
        overflow-x: auto;
        padding: .5em;
        background: #F0F0F0;
    }
    pre code {
        margin-top: 10px;
        text-align: left;
        font-size: 18px;
        font-family: code-saver, sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    pre code {
        font-size: inherit;
        color: inherit;
        word-break: normal;
    }
</style>
