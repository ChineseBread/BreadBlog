import {lazy} from "react";

const EditCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/Edit/EditCommon"));
const EditMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/Edit/EditMarkDown"));

const DraftsMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/Draft/DraftsMarkDown"));
const DraftsCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/Draft/DraftsCommon"));

const UpdateMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/Update/UpdateMarkDown")) ;
const UpdateCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/Update/UpdateCommon")) ;

const ArticleComponentsRouterForm = [
	{
		path:'/article/Edit/common',
		element:<EditCommon/>
	},
	{
		path:'/article/Edit/md',
		element: <EditMarkDown/>
	},
	{
		path:'/article/Update/md',
		element:<UpdateMarkDown/>
	},
	{
		path:'/article/Update/common',
		element: <UpdateCommon/>
	},
	{
		path: '/article/Draft/md/:draftid/:versionid',
		element: <DraftsMarkDown/>
	},
	{
		path: '/article/Draft/common/:draftid/:version',
		element: <DraftsCommon/>
	}
]
export default ArticleComponentsRouterForm
