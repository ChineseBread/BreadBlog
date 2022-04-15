import React from "react";
import {
    Divider, Drawer, Input, Radio, Switch,
    Form, Button, Select, message, notification
} from "antd";
import {BarsOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import ArticleOperationRequest from "../../../../../utils/RequestUtils/ArticleOperationRequest";
const {TextArea} = Input
//文章分类选择
const DrawerCategoryChoice = [
    {value:'1',choice:'生活'},
    {value:'2',choice:'学习'},
    {value:'3',choice:'杂谈'},
    {value:'4',choice:'安利'},
    {value:'5',choice:'牢骚'},
    {value:'6',choice:'游戏'},
    {value:'7',choice:'电波'},
    {value:'8',choice:'其他'},
    // {value:'8',choice:'个人'},
]
function _ArticleDrawer({visible,onClose,title,markdown,editorState,isMarkdown}){
    const navigator = useNavigate()

    let onFinish =  async ({publicsort,ispublic,sortname,tag,description}) => {
        if (!title) {
            message.warn("请输入标题!")
            return
        }
        message.loading({content:'发布中',key:'publishing'}).then(() => {
            onClose(false)
        })
        //  发布文章
        // let isMarkdown = pathname === '/article/edit/md';
        let content = isMarkdown ? markdown : editorState.toHTML()
        let result = await ArticleOperationRequest.createArticle(title,content,ispublic ? 1 : -1,isMarkdown,publicsort,sortname,tag,description)
        if (result?.Ok){
            message.success({content:"创建成功!",key:'publishing'})
            navigator('/user/home')
        }else {
            message.warn({content:"创建失败请稍后重试!",key:'publishing'}).then(() => {
                notification.warn({
                    message: '为什么会创建失败',
                    description:
                        '撰写文章期间会进行定时与服务器建立链接,若连接失败则登录会话失效,将会提示创建失败',
                    duration:4.5
                });
            })
        }

    }

    return(
        <Drawer
            title="发布文章"
            placement="right"
            closable={false}
            visible={visible}
            onClose={onClose}
            getContainer={false}
            style={{ position: 'absolute' }}
            width={500}
            // forceRender={false}

        >
            <Form
                onFinish={onFinish}
            >
                <span>
                   <div>
                        <BarsOutlined/>
                        选择分类
                   </div>
                    <Button type="primary" htmlType="submit">
                        确认发布
                    </Button>
                </span>
                <Form.Item
                    name='publicsort'
                    rules={[{required:true,message:'请选择一个公共分类!'}]}
                >
                    <Radio.Group value='large'>
                        {DrawerCategoryChoice.map(ele => {
                            return <Radio.Button key={ele.value} value={ele.value}>{ele.choice}</Radio.Button>
                        })}
                    </Radio.Group>
                </Form.Item>
                <div className='custom_category_header'>
                    <div>
                        <UserOutlined />
                        自定义
                    </div>
                    <Form.Item name="ispublic" valuePropName="checked" initialValue={true}>
                        <Switch checkedChildren='公开' unCheckedChildren='私人'/>
                    </Form.Item>
                </div>
                <Form.Item name='sortname' initialValue='' rules={[{required:false},({getFieldValue}) => ({
                    validator(_, value) {
                        let sortname = getFieldValue('sortname')
                        if (sortname && !sortname.trim()) return Promise.reject(new Error('不能以空白为分类名'));
                        return Promise.resolve();
                    },
                })]}>
                    <Input placeholder='请输入文章分类'/>
                </Form.Item>
                <Divider/>
                <Form.Item name='tag' initialValue={[]} rules={[{required:false},({getFieldValue }) => ({
                    validator(_, value) {
                        let tags = getFieldValue('tag')
                        if (tags.length >= 6) return Promise.reject(new Error('不能创建超过5个标签!'));
                        if (tags.find(tag => tag.length >= 5)) return Promise.reject(new Error('单个标签长度不能超过4个字符'));
                        return Promise.resolve();
                    },
                })]}>
                    <Select
                        mode="tags"
                        size='default'
                        placeholder="自定义标签"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Divider/>
                <Form.Item name='description' initialValue=''>
                    <TextArea placeholder='文章概述' showCount maxLength={200}/>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
export default React.memo(_ArticleDrawer,(prevProps, nextProps) => (prevProps.title === nextProps.title) && (prevProps.visible === nextProps.visible))
