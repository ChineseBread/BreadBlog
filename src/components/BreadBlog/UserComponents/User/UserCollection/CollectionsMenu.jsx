import React, {Fragment} from "react";
import {Menu} from "antd";

export default function CollectionsMenu({changeFav,favs}) {
	return (
		<Fragment>
			<Menu mode='vertical'>
				{favs.map(favItem => <Menu.Item key={favItem.favid} onClick={changeFav(favItem.info.name)}>{favItem.info.name}</Menu.Item>)}
			</Menu>
		</Fragment>
	);
}
