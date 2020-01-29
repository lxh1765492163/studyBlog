import React,{useState, useEffect} from 'react';
import marked from 'marked';
import './css/AddArticle.css';
import { Row, Col ,Input, Select ,Button ,DatePicker,  message} from 'antd';
import moment from 'moment';
import servicePath from "./config";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input

export default function Article(props){
    const [selectOp, setSelectOp ] = useState([]);
    const [articleId,setArticleId] = useState(0);  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('');   //文章标题
    const [articleContent , setArticleContent] = useState('');  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState(''); //html内容
    const [introducemd,setIntroducemd] = useState() ;           //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState(''); //简介的html内容
    const [showDate,setShowDate] = useState();   //发布日期
    const [updateDate,setUpdateDate] = useState(); //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]); // 文章类别信息
    const [selectedType,setSelectType] = useState("请选择文章类型"); //选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      }); 
    
    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html=marked(e.target.value)
        setIntroducehtml(html)
    }

    const pushAticle = ()=>{
        if( selectedType === "请选择文章类型"){
            message.error("请选择类型");
            return
        }
        if(!articleTitle){
            message.error("请输入文章标题");
            return
        }
        if(!articleContent){
            message.error("请输入文章内容");
            return
        }
        if(!introducemd){
            message.error("请输入文章简介");
            return
        }
        if(!showDate){
            message.error("请选择发布日期");
            return
        }



        let datetext= showDate.replace('-','/') //把字符串转换成时间戳

        if( articleId == 0){
                axios({
                    method:"post",
                    url: servicePath.addAtrticle(), 
                    withCredentials: true,
                    data:{
                        title: articleTitle,
                        content: articleContent,
                        addTime: (new Date(datetext).getTime())/1000,
                        introduce: introducemd,
                        type_id: selectedType,
                    }
                })
                .then(({data})=>{
                    if(data.isScuccess){
                        message.success("添加成功");
                        setArticleId(data.insertId);
                    }else{
                        message.success("添加失败")
                    }
                })
        }else{
            axios({
                method:"post",
                url: servicePath.upAtrticle(), 
                withCredentials: true,
                data:{
                    title: articleTitle,
                    content: articleContent,
                    addTime: (new Date(datetext).getTime())/1000,
                    introduce: introducemd,
                    type_id: selectedType,
                    id: articleId
                }
            })
            .then(({data})=>{
                if(data.isScuccess){
                    message.success("更新成功");
                }else{
                    message.success("更新失败")
                }
            })
        }

    }


    const optionHandle = (value)=>{
        console.log(value);
        setSelectType(value)
    }

    const titleChange = (e)=>{
        console.log(e.target.value);
        setArticleTitle(e.target.value)
    }

    const dateChange = (date, dateString)=>{
        console.log(dateString);
        setShowDate(moment(dateString))
    }


    const getArticleById = (id)=>{
         // 获取文章类型
         axios({
            method:"get",
            url: servicePath.getArticleById(id), 
            withCredentials: true,
        })
        .then(({data})=>{
            console.log(data);
            const {title, content, introduce, addTime, typeId } =( data.list || [])[0];
            setArticleTitle(title);
            setArticleContent(content);
            setMarkdownContent(marked(content));
            setIntroducemd(introduce);
            setIntroducehtml(marked(introduce));
            setShowDate(moment(addTime));
            setSelectType(typeId);
        })
    }

    const getTypeinfo = ()=>{
        // 获取文章类型
        axios({
            method:"get",
            url: servicePath.getTypeInfo(), 
            withCredentials: true,
        })
        .then(({data})=>{
            setSelectOp(data.list)
        })
    }

    useEffect(()=>{

        // 获取文章类型
        getTypeinfo();

        const id = props.match.params.id;
        if( id ){
            getArticleById(id);
            setArticleId(id)
        }

    }, [])

    return (<div>
        <Row gutter={5}>
            <Col span={18}>
                    <Row gutter={10} >
                        <Col span={18}>
                            <Input 
                                value={articleTitle}
                                onChange = {titleChange}
                                  placeholder="博客标题" 
                                  size="large" />
                        </Col>
                        <Col span={5}>
                            &nbsp;
                            <Select onChange={ optionHandle } value={selectedType} defaultValue={selectedType} size="large">
                                {
                                    selectOp.map((item, index)=>{
                                    return  <Option key={item.Id} value={item.Id}>{item.typeName}</Option>
                                    })
                                }
                               
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea 
                                value={articleContent}
                                className="markdown-content" 
                                rows={35}  
                                placeholder="文章内容"
                                onPressEnter={changeContent}
                                onChange={changeContent}
                                />
                        </Col>
                        <Col span={12}>
                            <div 
                                className="show-html" dangerouslySetInnerHTML = {{__html:markdownContent}}>
        
                            </div>
        
                        </Col>
                    </Row>  
        
            </Col>
        
            <Col span={6}>
            <Row>
                <Col span={24}>
                        <Button  size="large">暂存文章</Button>&nbsp;
                        <Button type="primary" size="large" onClick={pushAticle}>发布文章</Button>
                        <br/>
                </Col>
                <Col span={24}>
                    <br/>
                    <TextArea 
                    value={introducemd}
                        rows={4} 
                        placeholder="文章简介"
                        onChange={changeIntroduce}
                    />
                    <br/><br/>
                    <div  className="introduce-html" dangerouslySetInnerHTML = {{__html:introducehtml}}></div>
                </Col>
                
                <Col span={12}>
                    <div className="date-select">
                        <DatePicker
                            value={showDate}
                            placeholder="发布日期"
                            size="large"  
                            onChange={dateChange}
                        />
                    </div>
                </Col>
            </Row>
        
            </Col>
        </Row>
        </div>)
}