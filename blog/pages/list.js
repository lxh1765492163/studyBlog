import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import axios from "axios"
import Header from "../components/Header/"
import Author from "../components/Author/"
import Advert from "../components/Advert/"
import Footer from "../components/Footer/"
import configUrl from "../config/url"
import Link from "next/link"
import {Row, Col, List, Icon} from "antd"

const Home = (list) => {
    const [mylist, setMylist] = useState(list.data);
    console.log(mylist);

    useEffect(()=>{
        setMylist(list.data)
    })

    return (
        <div>
          <Head>
            <title>details</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <section>
              <Header/>
              <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                  <List
                    header={<div>最新日志</div>}
                    itemLayout="vertical"
                    dataSource={mylist}
                    renderItem={item => (
                      <List.Item>
                        <div className="list-title">
                            <Link href={{pathname:'/details',query:{id:item.id}}}>
                            <a>{item.title}</a>
                        </Link>
                        </div>
                        <div className="list-icon">
                            <span><Icon type="calendar" />{item.addTime}</span>
                            <span><Icon type="folder" /> {item.typeName}</span>
                            <span><Icon type="fire" /> {item.view_count}人</span>
                        </div>
                        <div className="list-context">{item.introduce}</div>  
                      </List.Item>
                    )}
                  />
                </Col>
      
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                  <Author/>
                  <Advert/>
                </Col>
              </Row>
          </section>
          <Footer/>
        </div>
      )
}


Home.getInitialProps  = async (context)=>{
    let id =context.query.id
    const promise = new Promise((resolve)=>{
        console.log(configUrl);
      axios(configUrl.list(id))
      .then(
        (res)=>{
          console.log('--------------------------------------------------------------------------------:',res.data)
          resolve(res.data)
        }
      )
    })
  
    return await promise
  }

export default Home
