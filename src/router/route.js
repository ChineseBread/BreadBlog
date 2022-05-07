import {lazy} from "react";

import {Navigate} from "react-router-dom";

//用户收藏夹
import CollectionsArticle from "../components/BreadBlog/UserComponents/User/UserCollection/CollectionsArticle";
import CollectionsManage from "../components/BreadBlog/UserComponents/User/UserCollection/CollectionsManage";
//用户通知
import InfoNotice from "../components/BreadBlog/UserComponents/User/UserNotice/Notice/InfoNotice";
import ForceNotice from "../components/BreadBlog/UserComponents/User/UserNotice/Notice/ForceNotice";
import WarnNotice from "../components/BreadBlog/UserComponents/User/UserNotice/Notice/WarnNotice";

const BreadBlog = lazy(() => import("../components/BreadBlog/BreadBlog"));
const HomePage = lazy(() => import("../components/BreadBlog/routeComponents/HomePage/HomePage"));
const Explore = lazy(() => import("../components/BreadBlog/routeComponents/Explore/Explore"));

const UserComponentsRouterCuard = lazy(() => import("./UserComponentsRouterCuard"));

const EditCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/edit/EditCommon"));
const EditMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/edit/EditMarkDown"));

const DraftsMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/draft/DraftsMarkDown"));
const DraftsCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/draft/DraftsCommon"));

const UpdateMarkDown = lazy(() => import("../components/BreadBlog/UserComponents/Article/update/UpdateMarkDown")) ;
const UpdateCommon = lazy(() => import("../components/BreadBlog/UserComponents/Article/update/UpdateCommon")) ;

const Account = lazy(() => import("../components/BreadBlog/routeComponents/Account/Account"));

const UserPreview = lazy(() => import("../components/BreadBlog/routeComponents/UserPreview/UserPreview"));
const About = lazy(() => import("../components/BreadBlog/routeComponents/About/About"))
const Topic = lazy(() => import("../components/BreadBlog/routeComponents/Topic")) ;
const Search = lazy(() => import("../components/BreadBlog/routeComponents/Search/Search")) ;
const ArticlePresent = lazy(() => import( "../components/BreadBlog/routeComponents/ArticlePresent/Article/ArticlePresent"));

const UserNotice = lazy(() => import("../components/BreadBlog/UserComponents/User/UserNotice/UserNotice")) ;
const UserDrafts = lazy(() => import("../components/BreadBlog/UserComponents/User/UserDrafts/UserDrafts")) ;
const UserHomePage = lazy(() => import("../components/BreadBlog/UserComponents/User/UserHomePage/UserHomePage")) ;

const UserArticleManage = lazy(() => import("../components/BreadBlog/UserComponents/User/UserArticleManage/UserArticleManage"));

const UserCollection = lazy(() => import("../components/BreadBlog/UserComponents/User/UserCollection/UserCollection")) ;


const UserProfile = lazy(() => import("../components/BreadBlog/UserComponents/User/UserProfile/UserProfile"))

const routesForm = [
    {
        path:'/*',
        element: <Navigate to='/'/>
    },
    {
        path: "/",
        element:<BreadBlog/>,
        children:[
            {
                path: '/preview',
                element: <UserPreview/>
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
            {
                path: '/user',
                element: <UserComponentsRouterCuard/>,
                children:[
                    {
                        path: '/user/notice',
                        element: <UserNotice/>,
                        children: [
                            {
                                path:'/user/notice/info',
                                element: <InfoNotice/>
                            },
                            {
                                path: '/user/notice/force',
                                element: <ForceNotice/>
                            },
                            {
                                path: '/user/notice/warn',
                                element: <WarnNotice/>
                            }
                        ]
                    },
                    {
                        path: '/user/drafts',
                        element: <UserDrafts/>
                    },
                    {
                        path: "/user/home",
                        element: <UserHomePage/>
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
            },

        ]
    },
    {
      path: '/article',
      element: <UserComponentsRouterCuard/>,
      children: [
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
    },
    {
        path: '/account',
        element: <Account/>,
    },

]
export default routesForm