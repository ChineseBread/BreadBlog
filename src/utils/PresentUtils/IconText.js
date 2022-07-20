import {Space} from "antd";
import React from "react";

const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);
export default IconText