/**
* lastest note  cell view
*/
import React,{Component} from 'react';
import{
	StyleSheet,
	Image,
	Text,
	View,
	ListView,
	TouchableHighlight
} from 'react-native';
import Detail from './detail'

class LastestCell extends Component{
	constructor(props){
		super(props);
		
	}
	_onPressItem(data){
		// this.props.navigator.push({
	 //      title: "Detail",
	 //      component: Detail,
	 //      passProps: {data: data}
	 //    });
	}
	render(){
		var rowData = this.props.data;
		return(
			<View>
			 	<TouchableHighlight
			 		onPress={() => this.props.onSelect(rowData)}
			 		underlayColor={'#00CED1'}
			 		activeOpacity={0.8}>
					<View style={styles.flexContainer}>
						<View style={styles.imageWrapper}>
							<Image style={styles.image} source={{uri:'http://yuxiblog.cn/getImage?imgId='+rowData.introImage}} resizeMode="contain"/>
						</View>
						<View style={styles.flexAuto}>
							<Text style={styles.title}>{rowData.title}</Text>
							<View style={styles.wrapper}>
								<Text style={styles.type}>{rowData.type}</Text>
								<Text style={styles.publishDate}>{new Date(rowData.publishDate).toDateString()}</Text>
							</View>
						</View>
					</View>
				</TouchableHighlight>
			</View>
			)
	}
}
const styles = StyleSheet.create({
	flexContainer:{
		flexDirection:'row',
		marginTop:12,
		marginBottom:12
	},
	imageWrapper:{
		width:100,
		height:50
	},
	image:{
		width:95,
		height:48
	},

	flexAuto:{
		flex:1,
		marginLeft:20
	},
	wrapper:{flexDirection:'row',},
	title:{
		fontSize:20,
	},
	type:{
		fontSize:14,
		flex:1
	},
	publishDate:{
		fontSize:14,
		flex:1
	},
})
module.exports = LastestCell;
