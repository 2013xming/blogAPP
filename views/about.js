/**
* about view
*/ 
import React,{Component} from 'react';
import{
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';

class About extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}
	render(){
		console.log("about");
//		this.props.hideTabBar();
		return(
			<View style={styles.container}>
				<Text style={styles.text}>
					作者：钰溪
				</Text>
				<Text style={styles.text}>
					曾在百度，阿里实习，学习前端技术，理解前后端数据交互，现在在使用nodejs开发后端，熟悉express和koa，曾经做过数据可视化，也尝试过移动端展示页和reactjs和react native ，现在虽不在互联网浪潮中冲浪，但还有一颗码农的心。
				</Text>
				<Text style={styles.text}>
					个人github的代码总结：https://github.com/2013xming
				</Text>
				<Text style={styles.text}>
					nodejs 静态资源服务器代码：https://github.com/2013xming/static-server
				</Text>
				<Text style={styles.text}>
					3D场景人物行走代码：https://github.com/2013xming/Threejs 演示地址：http://www.yuxiblog.cn/public/example/personmove/
				</Text>
				<Text style={styles.text}>
					基于jquery的分页插件：https://github.com/2013xming/pagination
				</Text>
				<Text style={styles.text}>
					原生js实现的加载遮罩层：https://github.com/2013xming/mask
				</Text>
				<Text style={styles.text}>
					使用video标签的视频播放器：https://github.com/2013xming/Video，介绍部分参见：http://yuxiblog.cn/note?type=_id&queryStr=5894437f22f0fc8c5057f527
				</Text>
				
			</View>
			)
	}
}
const styles = StyleSheet.create({
	container:{
//		flex:1,
		justifyContent:'center',
		backgroundColor:"#fff",
		paddingLeft:15
	},
	text:{
		marginTop:10,
	}
});
module.exports = About;
//AppRegistry.registerComponent('About',()=>About);