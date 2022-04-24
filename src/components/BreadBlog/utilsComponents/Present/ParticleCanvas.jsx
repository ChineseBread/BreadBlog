import React from "react";

export function _Particle(){
	return(
		<canvas className="background"/>
	)
}
export default React.memo(_Particle,() => true)
