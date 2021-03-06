"use strict";
exports.__esModule = true;
var FiltterType = /** @class */ (function () {
    function FiltterType(type) {
        this.typesIcon = {
            js: 'mdi-language-javascript',
            javascript: 'mdi-language-javascript',
            java: 'mdi-language-java',
            python: 'mdi-language-python',
            typesctipt: 'mdi-language-typesctipt',
            vue: 'mdi-vuejs',
            react: 'mdi-react',
            angular: 'mdi-angular',
            nuxt: 'mdi-nuxt',
            散文: 'mdi-book-open',
            小说: 'mdi-page-layout-sidebar-right',
            诗词: 'mdi-file'
        };
        this.typesColor = {
            js: '#F661BA',
            javascript: '#F661BA',
            java: '#F6BA61',
            python: '#BB61F6',
            typesctipt: '#61E2F6',
            vue: '#39FFA2',
            react: '#6198F6',
            angular: '#F66189',
            nuxt: '#0c5e4d',
            散文: '#e59b75',
            小说: '#f2467c',
            诗词: '#f38476'
        };
        this.atype = ['javascript', 'java', 'python', ' typesctipt', 'vue', 'react', 'angular', 'nuxt', '散文', '小说', '诗词'];
        this.types = this.generObj(type);
    }
    FiltterType.prototype.generObj = function (type) {
        var _this = this;
        return type.map(function (e) {
            if (typeof (e) == 'string') {
                if (e !== '') {
                    return { name: e, icon: _this.typesIcon[e], color: _this.typesColor[e] };
                }
                else {
                    return { name: '未分类', icon: 'mdi-heart', color: 'red' };
                }
            }
            else {
                return { name: e.author, avatar: e.avatar, color: _this.typesColor[_this.atype[Math.floor(Math.random() * 11)]] };
            }
        });
    };
    return FiltterType;
}());
exports["default"] = FiltterType;
