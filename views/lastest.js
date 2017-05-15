/**
* lastest note view

<PageButton style={{flex:1}}
			      prePageClickCB={this.fetchData.bind(this,this.state.currentPage-1,this.state.pageSize)} nextPageClickCB={this.fetchData.bind(this,this.state.currentPage+1,this.state.pageSize)}  currentPage={this.state.currentPage} totalPage={this.state.totalPage}/>
<ListView 
				 	
			      dataSource={this.state.dataSource}
			      renderRow={this.renderRowData.bind(this)}
			      initialListSize = {10}
			      onEndReached={this.fetchData.bind(this,this.state.currentPage+1,this.state.pageSize)}
			      onEndReachedThreshold={10}
			      renderFooter={this.renderFooter.bind(this)}/>

          <PageButton style={{}}
            prePageClickCB={this.fetchData.bind(this,'prepage')} 
            nextPageClickCB={this.fetchData.bind(this,"nextpage")}  
            currentPage={this.state.currentPage} totalPage={this.state.totalPage}/>

*/ 
import React,{Component} from 'react';
import{
	StyleSheet,
	Text,
	View,
	ListView,
	ActivityIndicator,
  Platform
} from 'react-native';
//import ItemBlock from './view/ItemBlock';
// import GiftedListView  from 'react-native-gifted-listview';
// import GiftedSpinner from 'react-native-gifted-spinner';
import LastestCell from './lastestCell';
import Detail from './detail';
import PageButton from './pageButton';
import AboutView from './about';

var hotUrl = "http://m2.qiushibaike.com/article/list/suggest?count=4&page=";
var hotUrl = "http://yuxiblog.cn/getnotes?queryType=time&value=&pageSize=10&pageNum=0";
var onlineUrl = "http://yuxiblog.cn/getnotes";
class Lastest extends Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.state = {
		    dataSource: ds,
		    data : null,
		    currentPage:0,
		    isLoading:false,
		    isLoadingMore : false,
		    pageSize:10,
		    totalPage:10
		 };
		 this.inited = null;
	}
	showDetail(data){
    if(Platform.OS === 'ios'){
      this.props.navigator.push({
        title: "全文",
        leftIconBack:true,
        component: Detail,
        //ios 传递参数
        passProps: {
          data: data,
        }
      });
    }else if(Platform.OS === 'android'){
      this.props.navigator.push({
        title: "全文",
        component: Detail,
        leftIconBack:true,
        //android 传递参数
        params: {
          data: data,
        }
      });
    }
	}
	renderRowData(rowData){
// 		this.setState({
// 	          dataSource: this.state.dataSource.cloneWithRows(rowData),
// //	          loaded: true,
// //	          currentPage: this.state.currentPage+1,
// 	          data: rowData
// 	        });
		if(isNaN(rowData)){
      return (
        <LastestCell
        onSelect={()=>this.showDetail(rowData)}
        data={rowData}/>
      )
		}
		else{

      return(
        <PageButton style={{}}
            prePageClickCB={this.fetchData.bind(this,'prepage')} 
            nextPageClickCB={this.fetchData.bind(this,"nextpage")}  
            currentPage={this.state.currentPage} totalPage={this.state.totalPage}/>
        )
    }
			
	}
	// _renderRowView(rowData){
	// 	return (
	// 			<LastestCell
	// 			onSelect={()=>this.showDetail(rowData)}
	// 			data={rowData}/>
	// 		)
	// }
	fetchData(page) {

    var pageNum = 0;
    if(page == "prepage"){
      pageNum = this.state.currentPage - 1;
    }else if(page == "nextpage"){
      pageNum = this.state.currentPage + 1;
    }

		if(!(pageNum<this.state.totalPage) || pageNum<0){
      console.log('this.state.totalPage:'+this.state.totalPage);
			return;
		}

		this.state.isLoading = true;
	    var url = this.props.fetchUrl ? this.props.fetchUrl +'&pageSize='+this.state.pageSize+'&pageNum='+pageNum : onlineUrl + '?queryType=time&value=&pageSize='+this.state.pageSize+'&pageNum='+pageNum;
	    fetch(url)
	    .then((response) => response.json())
	    .then((responseData) => {
	      var newData = responseData.notes;
        newData.push(pageNum);    //  为了加进page组件，并且保证每次不一致，触发renderRow 函数
	      var totalPage = Math.ceil(responseData.totalSize / this.state.pageSize);
	      this.setState({
	          dataSource: this.state.dataSource.cloneWithRows(newData),
//	          loaded: true,
	          currentPage: Number(responseData.pageNum),
	          data: newData,
	          totalPage:totalPage,
	        });
	    })
	    .catch((error) => {
	      alert('error:'+error);
	    });

	 }


	render(){
		if(!this.inited){
			this.inited = true;
			this.fetchData();
		}
		return(
			<View style={{flex:1}}>
	    	<ListView style={styles.view}   
            automaticallyAdjustContentInsets = {false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRowData.bind(this)}
            initialListSize = {11}
        />

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
	container:{
		backgroundColor:"#fff",
		marginBottom:200,
		flex:1
	}
});

module.exports = Lastest;