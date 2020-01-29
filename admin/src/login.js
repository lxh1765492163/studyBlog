import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon,Button ,Spin, message } from 'antd';
import './css/login.css';
import servicePath from "./config";
import axios from "axios";

function Login(props){
const [userName , setUserName] = useState('')
const [password , setPassword] = useState('')
const [isLoading, setIsLoading] = useState(false)


const checkLogin = ()=>{

    if(!userName){
        message.error('用户名不能为空')
        return false;
    }

    if(!password){
        message.error('密码不能为空')
        return false;
    }


    setIsLoading(true);
    setTimeout(()=>{
        
        axios({
            method:"post",
            url: servicePath.checkLogin(), 
            withCredentials: true,
            data:{
                userName,
                passWord: password
            }
            
        })
        .then(({data})=>{
            setIsLoading(false);
 
            if(!data.status){
                message.error('用户名或者密码错误')
            }else{
                props.history.push({pathname:"/index"});
                window.sessionStorage.setItem("openId", data.openId);
            }
            console.log(data);
        });

    },1000)
}
return (
    <div className="login-div">

        <Spin tip="Loading..." spinning={isLoading}>
            <Card title="JSPang Blog  System" bordered={true} style={{ width: 400 }} >
                <Input
                    id="userName"
                    size="large"
                    placeholder="Enter your userName"
                    prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                    onChange={(e)=>{setUserName(e.target.value)}}
                /> 
                <br/><br/>
                <Input.Password
                    id="password"
                    size="large"
                    placeholder="Enter your password"
                    prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />     
                <br/><br/>
                <Button type="primary" size="large" block  onClick={checkLogin} > Login in </Button>
            </Card>
        </Spin>
    </div>
)
}
export default Login