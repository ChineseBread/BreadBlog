import {lazy} from "react";

import {Navigate} from "react-router-dom";

import UserComponentsRouterForm from "./UserComponentsRouterForm";
import PublicComponentsRouterForm from "./PublicComponentsRouterForm";
import ArticleComponentsRouterForm from "./ArticleComponentsRouterForm";

const BreadBlog = lazy(() => import("../components/BreadBlog/BreadBlog"));
const Account = lazy(() => import("../components/BreadBlog/routeComponents/Account/Account"));
const UserComponentsRouterCuard = lazy(() => import("./UserComponentsRouterGuard"))

const routesForm = [
    {
        path:'/*',
        element: <Navigate to='/'/>
    },
    {
        path: '/',
        element: <BreadBlog/>,
        children: [
            ...PublicComponentsRouterForm,
            {
                path: '/user',
                element: <UserComponentsRouterCuard/>,
                children:[
                    ...UserComponentsRouterForm
                ]
            },
        ]
    },
    {
      path: '/article',
      element: <UserComponentsRouterCuard/>,
      children: [
          ...ArticleComponentsRouterForm
      ]
    },
    {
        path: '/account',
        element: <Account/>,
    },

]
export default routesForm