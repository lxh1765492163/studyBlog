import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Route} from "react-router-dom"
import './css/adminIndex.css';

import AddArticle from "./AddArticle";
import ArticleList from "./articleList";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props){

  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const changeMenu = (arg)=>{
    if(arg.key==="4"){
        props.history.push({pathname:"/index/list/"})
    }else if(arg.key==="3"){
        props.history.push({pathname:"/index/add/"})
    }
  }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="adminIndex" />
          <Menu onClick={changeMenu} theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>工作台</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>添加文章</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key="3">添加文章</Menu.Item>
              <Menu.Item key="4">文章列表</Menu.Item>

            </SubMenu>

            <Menu.Item key="9">
              <Icon type="file" />
              <span>留言管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>

              {/* 面包屑 */}
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>

            {/* 内容 */}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route path="/index/" exact  component={AddArticle} />
              <Route path="/index/add/" exact  component={AddArticle} />
              <Route path="/index/list/" exact  component={ArticleList} />
              <Route path="/index/add/:id" exact  component={AddArticle} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>lxh</Footer>
        </Layout>
      </Layout>
    )

}

export default AdminIndex