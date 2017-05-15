/**
* detail view
*/

//queryStr=57308747b5b8abcf7552a72b
import React,{Component} from 'react';
import{
	StyleSheet,
	Image,
	Text,
	View,
	Platform
} from 'react-native';
import Button from 'react-native-button';

class pageButton extends Component{
	constructor(props){
		super(props);
		this.state = {
			prePageClick:props.prePageClickCB,
			nextPageClick:props.nextPageClickCB,
			currentPage:props.currentPage,
			totalPage:props.totalPage
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			prePageClick:nextProps.prePageClickCB,
			nextPageClick:nextProps.nextPageClickCB,
			currentPage:nextProps.currentPage,
			totalPage:nextProps.totalPage
		});
	}
	render(){
		var showPrePage = (this.state.currentPage != 0);
		var showNextPage = (this.state.currentPage+1<this.state.totalPage);
		console.log('this.state.currentPage:'+this.state.currentPage);
		console.log('showPrePage:'+showPrePage);
		console.log('showNextPage:'+showNextPage);
		return(
				<View style={{flex:1,alignSelf: 'center',flexDirection:'row'}}>
					{showPrePage ?
						<Button
			            style={{fontSize:18,flex:1,paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:2}}
			            onPress={this.state.prePageClick}
        				styleDisabled={{color: 'red'}}>
        				 上一页
			          </Button>: null
					}
					{showNextPage ?
						<Button
			            style={{fontSize:18,flex:1,paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:2}}
			            onPress={this.state.nextPageClick}
        				styleDisabled={{color: 'red'}}>
        				下一页
			          </Button>: null
					}
				</View>
			)
	}
}
const styles = StyleSheet.create({
	botton:{

	}
});
module.exports = pageButton;