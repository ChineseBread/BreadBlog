// cdn
// import Particles from 'particles'
const Particles = window.Particles || {init:(param) => {}}
function CanvasInit(){

	const color = '#434343'
	const currentWidth = document.documentElement.clientWidth;
	//真实分辨率大小
	const deviceWidth = currentWidth * devicePixelRatio
	// 缩放范围
	const scale = currentWidth / 1400
	currentWidth <= deviceWidth && Particles.init({
		selector:'#background',
		maxParticles:Math.round(scale * 70),
		connectParticles:true,
		minDistance:Math.round(scale * 180),
		color,
		speed:0.4,
		responsive:[
			{
				breakpoint:1000,
				options:{
					maxParticles:70,
					connectParticles:false,
					color
				}
			}
		]
	})
}
export default CanvasInit