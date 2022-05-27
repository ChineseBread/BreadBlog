import {lazy} from "react";
// 公共用户预览
import UserPreviewArticleList from "../components/BreadBlog/routeComponents/UserPreview/UserPreviewArticleList";
import UserPreviewDynamic from "../components/BreadBlog/routeComponents/UserPreview/UserPreviewDynamic";
import UserPreviewSubscribe from "../components/BreadBlog/routeComponents/UserPreview/UserPreviewSubscribe";

const HomePage = lazy(() => import("../components/BreadBlog/routeComponents/HomePage/HomePage"));
const Explore = lazy(() => import("../components/BreadBlog/routeComponents/Explore/Explore"));
const UserPreview = lazy(() => import("../components/BreadBlog/routeComponents/UserPreview/UserPreview"));
const About = lazy(() => import("../components/BreadBlog/routeComponents/About/About"))
const Topic = lazy(() => import("../components/BreadBlog/routeComponents/Topic")) ;
const Search = lazy(() => import("../components/BreadBlog/routeComponents/Search/Search")) ;
const ArticlePresent = lazy(() => import( "../components/BreadBlog/routeComponents/ArticlePresent/Article/ArticlePresent"));

const PublicComponentsRouterForm = [
	{
		path: '/preview/:userid',
		element: <UserPreview/>,
		children:[
			{
				path:'/preview/:userid',
				element: <UserPreviewArticleList/>
			},
			{
				path: "/preview/:userid/dynamic",
				element: <UserPreviewDynamic/>
			},
			{
				path: '/preview/:userid/subscribe',
				element: <UserPreviewSubscribe/>
			}
		]
	},
	{
		path: '/',
		element: <HomePage/>
	},
	{
		path: '/topic',
		element: <Topic/>
	},
	{
		path: '/search',
		element: <Search/>
	},
	{
		path:'/post',
		element: <ArticlePresent/>
	},
	{
		path: '/about',
		element: <About/>
	},
	{
		path: '/explore',
		element: <Explore/>
	},

]
export default PublicComponentsRouterForm