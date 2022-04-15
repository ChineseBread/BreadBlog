import {Menu} from "antd";
import React from "react";

function _HomePageNav({changeCategory}){
	return(
		<Menu
			mode="horizontal"
			defaultSelectedKeys={['1']}
			onClick={changeCategory}
		>
			<Menu.Item key="random">随机</Menu.Item>
			<Menu.Item key="newest">最新</Menu.Item>
			<Menu.Item key="hottest">最热</Menu.Item>
		</Menu>
	)
}
export default React.memo(_HomePageNav,() => true)