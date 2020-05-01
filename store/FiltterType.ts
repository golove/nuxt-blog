class FiltterType {
    typesIcon: object = {
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
    typesColor: object = {
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
    atype: Array<string> = ['javascript', 'java', 'python', ' typesctipt', 'vue', 'react', 'angular', 'nuxt', '散文', '小说', '诗词']
    types: Array<object>;
    constructor(type: Array<any>) {
        this.types = this.generObj(type)
    }

    generObj(type: Array<any>) {
        return type.map((e: any) => {
            if (typeof (e) == 'string') {
                if (e !== '') {
                    return { name: e, icon: this.typesIcon[e], color: this.typesColor[e] }
                } else {
                    return { name: '未分类', icon: 'mdi-heart', color: 'red' }
                }
            } else {
                return { name: e.author, avatar: e.avatar, color: this.typesColor[this.atype[Math.floor(Math.random() * 11)]] }
            }


        })

    }
}

export default FiltterType;