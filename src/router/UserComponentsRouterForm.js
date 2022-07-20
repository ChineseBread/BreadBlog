import {lazy} from "react";
//用户收藏夹
import CollectionsArticle from "../components/BreadBlog/UserComponents/User/UserCollection/CollectionsArticle";
import CollectionsManage from "../components/BreadBlog/UserComponents/User/UserCollection/CollectionsManage";

//用户通知
import InfoNotice from "../components/BreadBlog/UserComponents/User/UserNotice/InfoNotice/InfoNotice";
import NewLikeList from "../components/BreadBlog/UserComponents/User/UserNotice/InfoNotice/NoticeItem/NewLikeList/NewLikeList";
import NewCommentList from "../components/BreadBlog/UserComponents/User/UserNotice/InfoNotice/NoticeItem/NewCommentList/NewCommentList";
import NewFollowList from "../components/BreadBlog/UserComponents/User/UserNotice/InfoNotice/NoticeItem/NewFollowList/NewFollowList";

import ForceNotice from "../components/BreadBlog/UserComponents/User/UserNotice/ForceNotice/ForceNotice";
import WarnNotice from "../components/BreadBlog/UserComponents/User/UserNotice/WarnNotice/WarnNotice";

//用户界面
//动态
import UserDynamic from "../components/BreadBlog/UserComponents/User/UserHomePage/UserDynamic";
//关注
import UserSubscribe from "../components/BreadBlog/UserComponents/User/UserHomePage/UserSubscribe";
//文章
import UserArticleList from "../components/BreadBlog/UserComponents/User/UserHomePage/UserArticleList";
import SensArticleList from "../components/BreadBlog/UserComponents/User/UserNotice/WarnNotice/NoticeItem/SensArticleList";
import SensCommentList from "../components/BreadBlog/UserComponents/User/UserNotice/WarnNotice/NoticeItem/SensCommentList";

const UserNotice = lazy(() => import("../components/BreadBlog/UserComponents/User/UserNotice/UserNotice")) ;
const UserDrafts = lazy(() => import("../components/BreadBlog/UserComponents/User/UserDrafts/UserDrafts")) ;
const UserHomePage = lazy(() => import("../components/BreadBlog/UserComponents/User/UserHomePage/UserHomePage")) ;

const UserArticleManage = lazy(() => import("../components/BreadBlog/UserComponents/User/UserArticleManage/UserArticleManage"));

const UserCollection = lazy(() => import("../components/BreadBlog/UserComponents/User/UserCollection/UserCollection")) ;

const UserProfile = lazy(() => import("../components/BreadBlog/UserComponents/User/UserProfile/UserProfile"))
const UserComponentsRouterForm = [
	{
		path: '/user/notice',
		element: <UserNotice/>,
		children: [
			{
				path:'/user/notice/info',
				element: <InfoNotice/>,
				children:[
					{
						path:'/user/notice/info',
						element:<NewLikeList/>
					},
					{
						path:'/user/notice/info/like',
						element:<NewLikeList/>
					},
					{
						path:'/user/notice/info/comment',
						element: <NewCommentList/>
					},
					{
						path: '/user/notice/info/follow',
						element: <NewFollowList/>
					}
				]
			},
			{
				path: '/user/notice/force',
				element: <ForceNotice/>
			},
			{
				path: '/user/notice/warn',
				element: <WarnNotice/>,
				children: [
					{
						path: '/user/notice/warn',
						element: <SensArticleList/>
					},
					{
						path: '/user/notice/warn/article',
						element: <SensArticleList/>
					},
					{
						path: '/user/notice/warn/comment',
						element: <SensCommentList/>
					}
				]
			}
		]
	},
	{
		path: '/user/drafts',
		element: <UserDrafts/>
	},
	{
		path: "/user/home",
		element: <UserHomePage/>,
		children: [
			{
				path:'/user/home',
				element: <UserArticleList/>
			},
			{
				path: '/user/home/dynamic',
				element: <UserDynamic/>
			},
			{
				path: '/user/home/subscribe',
				element: <UserSubscribe/>
			}
		]
	},
	{
		path: '/user/collections',
		element: <UserCollection/>,
		children:[
			{
				path:'/user/collections/show',
				element:<CollectionsArticle/>
			},
			{
				path: '/user/collections/manage',
				element: <CollectionsManage/>
			}
		]
	},
	{
		path:'/user/article/manage',
		element: <UserArticleManage/>
	},
	{
		path: "/user/profile",
		element: <UserProfile/>
	},

]
export default UserComponentsRouterForm