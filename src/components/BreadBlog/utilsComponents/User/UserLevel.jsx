/**
 * @description 用户等级显示
 */
const mapping = {
	1:'icon-icon-test2',
	2:'icon-icon-test',
	3:'icon-icon-test1',
	4:'icon-icon-test3',
	5:'icon-icon-test4',
	6:'icon-icon-test5',
}
export default function UserLevel({user,level}) {

	return (
		<>
			<span className='author-name'>{user}</span>
			<i className={`iconfont ${mapping[level]}`}/>
		</>
	);
}
