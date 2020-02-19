<template>
    <div class="home">
        <header>
            <b-container fluid>
                <b-row>
                    <b-col lg="8" offset-lg="2">
                        <b-img src="img/logo.png" fluid alt="logo"></b-img>
                        <div class="intro-text">
                            <span class="subtitle">Cloud Disk</span>
                            <span class="describe"
                            >Sharing square, where you can find some interesting things
                shared by others.</span
                            >
                        </div>
                    </b-col>
                    <b-col lg="12" class="own-btn">
                        <router-link :to="{name:'login'}" class="btn btn-lg btn-outline">
                            Sign in
                        </router-link>
                        <router-link :to="{name:'register'}" class="btn btn-lg btn-outline">
                            Sign up
                        </router-link>
                    </b-col>
                </b-row>
            </b-container>
        </header>
        <div class="container protocal-notice hidden-xs">
            <div class="row">
                <div class="col-xs-12"></div>
            </div>
        </div>
        <main class="mb-4">
            <b-container>
                <h2 class="text-center">
                    Latest Shared
                </h2>
                <div class="list-group">
                    <a href="/vue/xxx" class="list-group-item" target="_blank">
                        <b-row>
                            <b-col md="3">
                                <h4 class="file-author">vue</h4>
                            </b-col>
                            <b-col md="9">
                                <p class="file-description">
                                    游戏大全、音乐大全、视频大全
                                </p>
                            </b-col>
                            <b-col md="9" offset-md="3">
                <span class="package-extra-info"
                ><i class="fas fa-star"></i> 153551</span
                >
                            </b-col>
                        </b-row>
                    </a>
                    <a href="/vue/xxx" class="list-group-item" target="_blank">
                        <b-row>
                            <b-col md="3">
                                <h4 class="file-author">vue</h4>
                            </b-col>
                            <b-col md="9">
                                <p class="file-description">
                                    YII视频教程-全集
                                </p>
                            </b-col>
                            <b-col md="9" offset-md="3">
                <span class="package-extra-info"
                ><i class="fas fa-star"></i> 153551</span
                >
                            </b-col>
                        </b-row>
                    </a>
                    <a href="/vue/xxx" class="list-group-item" target="_blank">
                        <b-row>
                            <b-col md="3">
                                <h4 class="file-author">vue</h4>
                            </b-col>
                            <b-col md="9">
                                <p class="file-description">
                                    Golang教程-视频教程-某某某培训机构
                                </p>
                            </b-col>
                            <b-col md="9" offset-md="3">
                <span class="package-extra-info"
                ><i class="fas fa-star"></i> 153551</span
                >
                            </b-col>
                        </b-row>
                    </a>
                    <a href="/vue/xxx" class="list-group-item" target="_blank">
                        <b-row>
                            <b-col md="3">
                                <h4 class="file-author">vue</h4>
                            </b-col>
                            <b-col md="9">
                                <p class="file-description">
                                    Vue
                                    是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
                                    被设计为可以自底向上逐层应用。Vue
                                    的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
                                </p>
                            </b-col>
                            <b-col md="9" offset-md="3">
                <span class="package-extra-info"
                ><i class="fas fa-star"></i> 153551</span
                >
                            </b-col>
                        </b-row>
                    </a>
                    <a href="/vue/xxx" class="list-group-item" target="_blank">
                        <b-row>
                            <b-col md="3">
                                <h4 class="file-author">vue</h4>
                            </b-col>
                            <b-col md="9">
                                <p class="file-description">
                                    Vue
                                    是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
                                    被设计为可以自底向上逐层应用。Vue
                                    的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
                                </p>
                            </b-col>
                            <b-col md="9" offset-md="3">
                <span class="package-extra-info"
                ><i class="fas fa-star"></i> 153551</span
                >
                            </b-col>
                        </b-row>
                    </a>
                    <a href="/vue/xxx" class="list-group-item" target="_blank">
                        <b-row>
                            <b-col md="3">
                                <h4 class="file-author">vue</h4>
                            </b-col>
                            <b-col md="9">
                                <p class="file-description">
                                    Vue
                                    是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
                                    被设计为可以自底向上逐层应用。Vue
                                    的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
                                </p>
                            </b-col>
                            <b-col md="9" offset-md="3">
                <span class="package-extra-info"
                ><i class="fas fa-star"></i> 153551</span
                >
                            </b-col>
                        </b-row>
                    </a>
                    <a class="list-group-item text-center file-more">
                        查看更多分享
                    </a>
                </div>
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
                year: new Date().getFullYear(),
                mainProps: {
                    black: true,
                    width: 50,
                    height: 50,
                }
            };
        },
        components: {}
    };
</script>

<style scoped>
    body {
        font-size: 10px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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

    .btn-outline {
        margin-top: 10px;
        margin-right: 3px;
        margin-left: 3px;
        border: solid 2px #fff;
        font-size: 20px;
        color: #fff;
    }

    main {
        font-size: 15.4px;
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

    main span .unicon {
        display: inline-block;
        vertical-align: middle;
    }

    main .file-description {
        color: #777;
    }

    main .package-extra-info {
        font-size: 13px;
        color: #aaa;
        vertical-align: middle;
        line-height: 13px;
    }

    main .file-author {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        color: #000000;
    }

    main .file-more {
        color: #186384;
        font-weight: bold;
    }

    .protocal-notice {
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

    .text-darker {
        color: #405263;
    }
</style>
