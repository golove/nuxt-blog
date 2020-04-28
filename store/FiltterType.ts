class FiltterType {
    typesIcon: object = {
        js: 'mdi-language-javascript',
        javascript: 'mdi-language-javascript',
        java: 'mdi-language-java',
        python: 'mdi-language-python',
        typesctipt: 'mdi-language-typesctipt',
        vue: 'mdi-vue',
        react: 'mdi-react',
        anglar: 'mdi-anglar'
    };
    typesColor: object = {
        js: '#F661BA',
        javascript: '#F661BA',
        java: '#F6BA61',
        python: '#BB61F6',
        typesctipt: '##61E2F6',
        vue: '#39FFA2',
        react: '#6198F6',
        anglar: '#F66189'
    };
    atype: Array<string> = ['javascript', 'java', 'python', ' typesctipt', 'vue', 'react', 'anglar']
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
                return { name: e.author, avatar: e.avatar, color: this.typesColor[this.atype[Math.floor(Math.random() * 7)]] }
            }


        })

    }
}

export default FiltterType;