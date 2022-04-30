import {lazy} from "react";

import {Navigate} from "react-router-dom";

//用户收藏夹
import CollectionsArticle from "../components/BreadBlog/UserComponents/User/UserCollection/CollectionsArticle";
import CollectionsManage from "../components/BreadBlog/UserComponents/User/UserCollection/CollectionsManage";
import Explore from "../components/BreadBlog/routeComponents/Explore/Explore";

const BreadBlog = lazy(() => import("../components/BreadBlog/BreadBlog"));
const HomePage = lazy(() => import("../components/BreadBlog/routeComponents/HomePage/HomePage"));

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
const Comments = lazy(() => import("../components/BreadBlog/routeComponents/Comments")) ;
const Search = lazy(() => import("../components/BreadBlog/routeComponents/Search/Search")) ;
const ArticlePresent = lazy(() => import( "../components/BreadBlog/routeComponents/ArticlePresent/Article/ArticlePresent"));

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
                path: '/comments',
                element: <Comments/>
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
            {
                path: '/account',
                element: <Account/>,
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


]
export default routesForm