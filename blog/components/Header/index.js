import React, {useEffect, useState} from "react"
import {Row,Col, Menu, Icon} from "antd"
import axios from "axios"
import Router from 'next/router'
import configUrl from "../../config/url"
import "./style.css"


const Header = (props)=>{
    const [arr, setArr] = useState([]);

    useEffect(()=>{
        axios(configUrl.headType())
        .then((data)=>{
            console.log(data)
            setArr((arr)=> data.data.data || [])
        })
    }, []);

    const handel = (...arg)=>{
        if(arg[0].key === "0"){
            Router.push("/list?id=1")
        }else{
            Router.push("/")
        }
    }
    
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="commonLine">你好!</span>
                    <span className="commonLine">专注前端开发,每年100集免费视频。</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handel}>
                        {
                            arr.map((item ,index)=>{
                                return (<Menu.Item key={index}>
                                            <Icon type={item.icon} />
                                            {item.typeName}
                                        </Menu.Item>);
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    );
    
}
export default Header;