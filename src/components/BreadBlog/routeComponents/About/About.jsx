import React from "react";
import {Card,PageHeader, Row, Tag} from 'antd';
import {AntDesignOutlined, GithubOutlined, HomeOutlined, MediumOutlined, YuqueOutlined} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";


function About() {
	const Content = ({ children, extraContent }) => (
		<Row>
			<div style={{ flex: 1 }}>{children}</div>
			<div className="image">{extraContent}</div>
		</Row>
	);

	return (
		<div className='about-info-container'>
			<Card title='关于我们'>
				<Card title='开发成员' type='inner'>
					<PageHeader
						title='Chinesebread'
						className="site-page-header"
						subTitle='1057143786@qq.com'
						tags={[<Tag color='#85a5ff' key='1'>Browser</Tag>,<Tag color='#85a5ff' key='2'>React</Tag>]}
						avatar={{src:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae361584a42c48df9e9930f36319cadd~tplv-k3u1fbpfcp-no-mark:100:100:100:100.awebp?'}}
					>
						<Content>
							<Paragraph>
								前端界面搭建和逻辑实现
							</Paragraph>
						</Content>
					</PageHeader>
					<PageHeader
						title='Watish'
						className="site-page-header"
						subTitle='watish@qq.com'
						tags={[<Tag color='#85a5ff' key='1'>Server</Tag>,<Tag color='#85a5ff' key='2'>PHP</Tag>]}
						avatar={{ src: 'https://p9-passport.byteacctimg.com/img/mosaic-legacy/3791/5035712059~300x300.image' }}
						// breadcrumb={{ routes }}
					>
						<Content>
							<Paragraph>
								后端接口实现和数据库优化
							</Paragraph>
						</Content>
					</PageHeader>
				</Card>
				<Card title='资源贡献' type='inner' >
					<PageHeader
						title="AntDesign"
						className="site-page-header"
						subTitle="https://ant.design/index-cn"
						avatar={{ src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' }}
						// breadcrumb={{ routes }}
					>
						<Content
						>
							<Paragraph>
								界面布局和组件
							</Paragraph>
							<Paragraph>
								<div className='link-container'>
									<span className="example-link">
									<AntDesignOutlined />
								</span>
									<span>
									<a href="https://ant-design.gitee.io/index-cn">AntDesign官网</a>
								</span>
								</div>

							</Paragraph>

						</Content>
					</PageHeader>
					<PageHeader
						title="Particle.js"
						className="site-page-header"
						subTitle="https://github.com/marcbruederlin"
						avatar={{ src: 'https://avatars.githubusercontent.com/u/5813750?v=4' }}
						// breadcrumb={{ routes }}
					>
						<Content
						>
							<Paragraph>
								Canvas粒子渲染
							</Paragraph>
							<Paragraph>
								<div className='link-container'>
									<span className="example-link">
										<GithubOutlined />
									</span>
									<span>
										<a href='https://github.com/marcbruederlin/particles.js'>项目地址</a>
									</span>
									<span className="example-link">
										<MediumOutlined />
									</span>
									<span>
										<a href='https://marcbruederlin.github.io/particles.js/'>文档地址</a>
									</span>
								</div>

							</Paragraph>

						</Content>
					</PageHeader>
					<PageHeader
						title="md-editor-rt"
						className="site-page-header"
						subTitle="zbfcqtl@gmail.com"
						avatar={{ src: 'https://avatars.githubusercontent.com/u/37092006?v=4' }}
						// breadcrumb={{ routes }}
					>
						<Content
						>
							<Paragraph>
								React版本MarkDown编辑器
							</Paragraph>
							<Paragraph>
								<div className='link-container'>
									<span className="example-link">
										<GithubOutlined />
									</span>
									<span>
										<a href='https://github.com/imzbf/md-editor-rt'>项目地址</a>
									</span>
									<span className="example-link">
										<MediumOutlined />
									</span>
									<span>
										<a href='https://imzbf.github.io/md-editor-rt'>文档地址</a>
									</span>
								</div>

							</Paragraph>
						</Content>
					</PageHeader>
					<PageHeader
						title="Braft-Editor"
						className="site-page-header"
						subTitle="https://margox.cn"
						avatar={{ src: 'https://avatars.githubusercontent.com/u/7866354?v=4' }}
						// breadcrumb={{ routes }}
					>
						<Content
						>
							<Paragraph>
								基于React的富文本编辑器
							</Paragraph>
							<Paragraph>
								<div className='link-container'>
									<span className="example-link">
										<YuqueOutlined />
									</span>
									<span>
										<a href="https://www.yuque.com/braft-editor/be/lzwpnr">项目文档</a>
									</span>
									<span className="example-link">
										<HomeOutlined />
									</span>
									<span>
										<a href="https://braft.margox.cn">项目官网</a>
									</span>
								</div>
							</Paragraph>

						</Content>
					</PageHeader>

				</Card>
			</Card>
		</div>

	);
}
export default React.memo(About,() => true)