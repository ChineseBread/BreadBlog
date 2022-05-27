import {lazy} from "react";

const EditCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/edit/EditCommon"));
const EditMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/edit/EditMarkDown"));

const DraftsMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/draft/DraftsMarkDown"));
const DraftsCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/draft/DraftsCommon"));

const UpdateMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/update/UpdateMarkDown")) ;
const UpdateCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/update/UpdateCommon")) ;

const ArticleComponentsRouterForm = [
	{
		path:'/article/edit/common',
		element:<EditCommon/>
	},
	{
		path:'/article/edit/md',
		element: <EditMarkDown/>
	},
	{
		path:'/article/update/md',
		element:<UpdateMarkDown/>
	},
	{
		path:'/article/update/common',
		element: <UpdateCommon/>
	},
	{
		path: '/article/draft/md/:draftid/:versionid',
		element: <DraftsMarkDown/>
	},
	{
		path: '/article/draft/common/:draftid/:version',
		element: <DraftsCommon/>
	}
]
export default ArticleComponentsRouterForm
