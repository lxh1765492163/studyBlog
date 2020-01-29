
import React,{useState,useEffect} from 'react';
import './css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import  servicePath  from './config'
const { confirm } = Modal;



function ArticleList(props){

    const [list,setList]=useState([]);

    useEffect(()=>{
        axios({
            method:"get",
            url: servicePath.articleList(), 
            withCredentials: true,
            
        })
        .then(({data})=>{
           console.log(data);
           setList(data.list)
        })
    }, [])


    // 修改文章
    const changeArticle = (id)=>{
        props.history.push({pathname:"/index/add/"+id})
    }

    // 删除文章
    const delArticle = (id)=>{
        confirm({
            title: '确定要删除这篇文章吗?',
            content: '文章将会永远被删除，无法恢复。',
            onOk() {
                axios({
                    method:"get",
                    url: servicePath.delArticle(id), 
                    withCredentials: true,
                    
                })
                .then(({data})=>{
                   console.log(data);
                   message.success("删除成功")
                })
            },
            onCancel() {
                message.success('取消删除')
            },
         });

         
        
    }


    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                             {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                共<span>{item.part_count}</span>集
                            </Col>
                            <Col span={3}>
                              {item.view_count}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" onClick={()=>changeArticle(item.id)}>修改</Button>&nbsp;

                              <Button onClick={()=>delArticle(item.id)}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />

        </div>
    )

}

export default ArticleList