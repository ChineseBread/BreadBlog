import React, {Fragment} from "react";
import {Button, Empty, Menu} from "antd";
import {useNavigate} from "react-router-dom";

export default function CollectionsMenu({changeFav,favs}:any) {
	const navigator = useNavigate()
	return (
		<Fragment>
			{favs.length >= 1 ?
				<Menu mode='vertical'>
					{favs.map((favItem:UserFavorite) => <Menu.Item key={favItem.favid} onClick={changeFav(favItem.info.name)}>{favItem.info.name}</Menu.Item>)}
				</Menu> :
				<Empty description='没有收藏夹'>
					<Button type="primary" onClick={() => navigator('/user/collections/manage')}>去创建</Button>
				</Empty>
			}

		</Fragment>
	);
}

