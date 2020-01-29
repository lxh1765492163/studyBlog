const url = "http://127.0.0.1:7001";

const urlobj =  {
    details: (id)=> (`${url}/default/getArticleById/${id}`),
    index: ()=> (`${url}/default/artical`),
    headType: ()=> (`${url}/default/getTypeInfo`),
    list: (id)=> (`${url}/default/getListById/${id}`)
}

export default urlobj;