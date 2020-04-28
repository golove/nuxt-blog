class ManageArticle {

    article: Array<Object>;

    constructor(article: Array<Object>) {
        this.article = this.generate(article);
    }

    generate(article: Array<Object>) {
        article.map(e => {
            let heads = e.blocks.map(el => {
                el.type === "header"
            })
            return {
                title: heads[0],
                comment: e.reply.length,
                like: e.like.length,
                see: e.see,
                collect: e.collect.length
            }
        })


        return []
    }
}
export default ManageArticle;