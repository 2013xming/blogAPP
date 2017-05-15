/**
* 
*/


import React,{Component} from 'react';
import{
	Platform,
	TouchableHighlight,
	StyleSheet,
	Image,
	Text,
	View,
} from 'react-native';


class TypeRow extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
		
	}

	render(){
		
		return(
				<TouchableHighlight
			 		onPress={()=>this.props.onRowSelect()}
			 		underlayColor={'#00CED1'}
			 		activeOpacity={0.8}>
					<View style={styles.rectangle_view}>
						<View style={{flexDirection:'row',alignItems: 'center'}}>
							<Image source={require('../images/tag-alt-icon.png')} style={{alignSelf:'center',width:20,height:20}}/>
							<Text style={styles.rectangle_text}>{this.props.typeArray[0]}</Text>
						</View>
						<Text style={{alignSelf:'center',fontSize:16,marginRight:8}}>{this.props.typeArray[1]}</Text>
						
					</View>
				</TouchableHighlight>

			)
	}
}
const styles = StyleSheet.create({
	rectangle_view:{
	paddingTop:8,
	paddingBottom:8,
	paddingLeft:15,
	paddingRight:15,
	flexDirection:'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColor:'white',  
	borderBottomColor:'#dedfe0',
	borderBottomWidth:1,
  },
  rectangle_text:{
	color:'black',
	fontSize:16,
	textAlign:'center',
	paddingLeft:14,
  },
});
module.exports = TypeRow;