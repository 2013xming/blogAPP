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
	WebView
} from 'react-native';

var WEBVIEW_REF = 'webview';

class Detail extends Component{
	constructor(props){
		super(props);
		console.log(this.props);
		this.state = {
			_id : this.props.data._id,
			url : "http://yuxiblog.cn/note?type=_id&queryStr="+this.props.data._id
		}
//		this.props.hideTabBar();
	}
	render(){
//		this.props.hideTabBar();
		return(
				<WebView
					ref={WEBVIEW_REF}
					automaticallyAdjustContentInsets = {false}
					source = {{uri:this.state.url}}
					javaScriptEnabled = {true}
					domStorageEnabled = {true}
					decelerationRate = "normal"/>

			)
	}
}
const styles = StyleSheet.create({

});
module.exports = Detail;