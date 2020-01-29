const url = "http://127.0.0.1:7001";

const urlobj =  {
    checkLogin: (id)=> (`${url}/admin/checkLogin`),
    getTypeInfo: ()=> (`${url}/admin/getTypeInfo`),
    addAtrticle: ()=> (`${url}/admin/addAtrticle`),
    upAtrticle: ()=> (`${url}/admin/upAtrticle`),
    articleList: ()=> (`${url}/admin/articleList`),
    delArticle: (id)=> (`${url}/admin/delArticle/${id}`),
    getArticleById:  (id)=> (`${url}/admin/getArticleById/${id}`)
}

export default urlobj;