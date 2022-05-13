import React from "react";
import {
	Divider,
	Drawer,
	Input,
	Radio,
	Switch,
	Form,
	Button,
	Select,
	message,
	notification,
	Skeleton
} from "antd";
import {BarsOutlined, UserOutlined} from "@ant-design/icons";
// import PubSub from "pubsub-js";
import { useNavigate } from "react-router-dom";
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
function _UpdateDrawer({visible,onClose,title,markdown,editorState,ArticleInfo,loading,articleid}){
	let {ispublic,sortname,tags,description,type} = ArticleInfo
	const navigator = useNavigate()

	let onFinish =  async ({publicsort,ispublic,sortname,tag,description}) => {
		if (!title) {
			message.warn("请输入标题!")
			return
		}
		message.loading({content:'更新中',key:'update'}).then(() => {
			onClose(false)
		})
		//  发布文章
		let isMarkdown = type === 'markdown';
		let content = isMarkdown ? markdown : editorState.toHTML()
		let result = await ArticleOperationRequest.updateArticle(title,content,ispublic ? 1 : -1,isMarkdown,publicsort,sortname,tag,description,articleid)
		if (result?.Ok){
			message.success({content:"更新成功",key:'update'})
			navigator('/user/home')
		}else {
			message.warn({content:"创建失败请稍后重试!",key:'update'}).then(() => {
				notification.warn({
				    message: '为什么会更新失败',
				    description:
				       '撰写文章期间会定时与服务器建立连接,若连接失败,则会更新失败',
				    // placement:'top',
				    duration:4.5
				});
			})
		}
		// let {markdown,article} = ArticleStorage.getRequestData()


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
			// forceRender={false}
		>
			<Skeleton active loading={loading}>
				<Form
					onFinish={onFinish}
				>
                <div>
                   <div>
                        <BarsOutlined/>
                        选择分类
                   </div>
                    <Button type="primary" htmlType="submit">
                        确认发布
                    </Button>
                </div>
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
						<Form.Item name="ispublic" valuePropName="checked" initialValue={ispublic}>
							<Switch checkedChildren='公开' unCheckedChildren='私人'/>
						</Form.Item>
					</div>
					<Form.Item name='sortname' initialValue={sortname} rules={[{required:false},({getFieldValue}) => ({
						validator(_, value) {
							let sortname = getFieldValue('sortname')
							if (sortname && !sortname.trim()) return Promise.reject(new Error('不能以空白为分类名'));
							return Promise.resolve();
						},
					})]}>
						<Input placeholder='请输入文章分类'/>
					</Form.Item>
					<Divider/>
					<Form.Item name='tag' initialValue={tags.map(tag => JSON.parse(tag))} rules={[{required:false},({getFieldValue }) => ({
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
					<Form.Item name='description' initialValue={description}>
						<TextArea placeholder='文章概述' showCount maxLength={200}/>
					</Form.Item>
				</Form>
			</Skeleton>
		</Drawer>
	)
}
export default React.memo(_UpdateDrawer,(prevProps, nextProps) => (prevProps.visible === nextProps.visible) && (prevProps.loading === nextProps.loading) && (prevProps.title === nextProps.title) && (prevProps.ArticleInfo === nextProps.ArticleInfo))