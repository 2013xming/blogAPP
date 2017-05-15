/**

*/
import React,{Component} from 'react';
import{
	StyleSheet,
	Text,
	View,
	ListView
} from 'react-native';
class ItemBlock extends Component{
	constructor(props){
		super(props);
		this.state = {};
	}
	render(){
		return(
			<TouchableHighLight>
				<View>
					<Text>this.props.title</Text>
					<Text>this.props.des</Text>
				</View>
			</TouchableHighLight>
			)
	}
}
module.exports = ItemBlock;
