/**
* list types
*/
/**
<TouchableHighlight
				 		onPress={() => this.onSelect()}
				 		underlayColor={'#00CED1'}
				 		activeOpacity={0.8}>
						<View style={styles.rectangle_view}>
							<View style={{flexDirection:'row',alignItems: 'center'}}>
								<Image source={require('../images/tag-alt-icon.png')} style={{alignSelf:'center',width:20,height:20}}/>
								<Text style={styles.rectangle_text}>react-native</Text>
							</View>
							<Text style={{alignSelf:'center',fontSize:16,marginRight:8}}>3</Text>
							
						</View>
					</TouchableHighlight>
					<TouchableHighlight
				 		onPress={() => this.onSelect()}
				 		underlayColor={'#00CED1'}
				 		activeOpacity={0.8}>
						<View style={styles.rectangle_view}>
							<View style={{flexDirection:'row',alignItems: 'center'}}>
								<Image source={require('../images/tag-alt-icon.png')} style={{alignSelf:'center',width:20,height:20}}/>
								<Text style={styles.rectangle_text}>JavaScript</Text>
							</View>
							<Image source={require('../images/array_right.png')} style={{alignSelf:'center',width:25,height:25}}/>
						</View>
					</TouchableHighlight>
**/

import React,{Component} from 'react';
import{
	ScrollView,
	Platform,
	TouchableHighlight,
	StyleSheet,
	Image,
	Text,
	View,
} from 'react-native';
import TypeRow from './typerow';
import Lastest from './lastest';

var BaseUrlDataByType = 'http://yuxiblog.cn/getnotes?queryType=type&value=';

class Alltypes extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			svData : [],
			typeVal : ''
		}
		this.inited = null;
	}

	onRowSelect(typeVal){
		var UrlDataByType = BaseUrlDataByType + typeVal;
		var title = "分类笔记";
		if(Platform.OS === 'ios'){
	      this.props.navigator.push({
	        title: title,
	        component: Lastest,
	        leftIconBack:true,
	        //ios 传递参数
	        passProps: {
	          fetchUrl: UrlDataByType,
	        }
	      });
	    }else if(Platform.OS === 'android'){
	      this.props.navigator.push({
	        title: title,
	        component: Lastest,
	        leftIconBack:true,
	        //android 传递参数
	        params: {
	          fetchUrl: UrlDataByType,
	        }
	      });
	  	}
	}
	fetchTypeData(){
		var url = 'http://yuxiblog.cn/getNoteTypes';
		fetch(url)
		.then((response)=>response.json())
		.then((responseData)=>{
			var types = responseData.types;
			console.log('fetchEnd:'+types);
			var arrayData = [];
			for(var key in types){
				arrayData.push([key,types[key]])
			}
			this.setState({
				svData : arrayData
			});
			console.log('fetchEnd:'+arrayData);
		})
		.catch((error) => {
	      alert('error:'+error);
	    });
	}

	createMap(val,i){
		return (<TypeRow key={i} onRowSelect={()=>this.onRowSelect(val[0])} 
			typeArray={val}/>
			)
	}
	render(){
		if(!this.inited){
			this.inited = true;
			this.fetchTypeData();
		}
		return(
			<View style={styles.view}>
				<ScrollView ref={(scrollView) => { _scrollView = scrollView; }}
					automaticallyAdjustContentInsets={false}>
					{this.state.svData.map(this.createMap.bind(this))}
				</ScrollView>
			</View>
			)
	}

}
const styles = StyleSheet.create({
  view:{
    flex:1,
    marginTop:(Platform.OS === 'android') ? 35 : 0,
    marginBottom:(Platform.OS === 'ios') ? 80 : 0,
  },
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

module.exports = Alltypes;