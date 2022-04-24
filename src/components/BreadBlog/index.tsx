import {useRoutes} from "react-router-dom";
import routesForm from "../../router/route";
import {Fragment} from "react";
import './less/index.less'
/**
 *
 * @description 博客路由界面
 */
export default function Index(){
    const element = useRoutes(routesForm);
    return(
        <Fragment>
            {element}
        </Fragment>
    )
}