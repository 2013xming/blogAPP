/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  BackHandler,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import TabBar from 'react-native-xtabbar';
import AboutView from './views/about';
import LastestView from './views/lastest';
//import Web from './views/web'
import AllTypes from './views/alltypes';


var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
var NavigationBarRouteMapper = {
   //左边Button
   LeftButton: function(route, navigator, index, navState) {
     if (!route.leftIconBack) {
       return null;
     }
     var previousRoute = navState.routeStack[index - 1];
     return (
       <TouchableOpacity style={{marginTop:3}}
         onPress={() => navigator.pop()}
         >
         <Image
        style={{}}
        source={require('./images/back_32px.png')}/>
       </TouchableOpacity>
     );
   },
      //右边Button
   RightButton: function(route, navigator, index, navState) {
    return null;
     // if (route.id === 'detail') {
     //   return null;
     // }
     // return (
     //   <TouchableOpacity
     //     onPress={() => navigator.push({id:'detail',title:'Detail'})}
     //     style={styles.navBarRightButton}>
     //     <Text style={[styles.navBarText, styles.navBarButtonText]}>
     //       Next
     //     </Text>
     //   </TouchableOpacity>
     // );
   },
   //标题
   Title: function(route, navigator, index, navState) {
     return (

         <Text style={{marginTop:30,marginLeft:90,fontSize: 18,fontWeight: 'bold',color:'#fff'}}>
           {route.title}
         </Text>

     );
   },
 };

class yuxinote extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab:'home',
      notifCount:0,
      presses:0,
      data:null,
      tabBarshow : true,
      navigator:null
    }
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
    }
  }

  onBackHandler = () => {
    const nav = this.state.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
    return true;
  };
  _addNavigator(component,title){
    var data = null;
    data = this.state.data;
    return <Navigator
      style={{flex:1}}
      barTintColor="#007AFF"
      titleTextColor="#fff"
      tintColor="#fff"
      initialRoute={{
        title:title,
        component:component,
      }}
      renderScene = {(route,navigator)=>{
        this.state.navigator = navigator;
        if(route.component) {
          return <route.component {...route.params} navigator={navigator} />
        }
      }}
      navigationBar={
      <Navigator.NavigationBar
        style={styles.navContainer}
        routeMapper={NavigationBarRouteMapper}/>}/>;
  }
  // _addNavigatorWeb(title){
  //   var data = null;
  //   data = this.state.data;
  //   return <Navigator
  //     style={{flex:1}}
  //     barTintColor="#007AFF"
  //     titleTextColor="#fff"
  //     tintColor="#fff"
  //     initialRoute={{
  //       component:<Web/>,
  //       name:title,
  //       index:1,
  //     }}
  //     renderScene = {(route,navigator)=><Web/>}/>;
  // }
  // _addNavigatorAboutView(title){
  //   var data = null;
  //   data = this.state.data;
  //   return <Navigator
  //     style={{flex:1}}
  //     barTintColor="#007AFF"
  //     titleTextColor="#fff"
  //     tintColor="#fff"
  //     initialRoute={{
  //       name:title,
  //       index:2,
  //     }}
  //     renderScene = {(route,navigator)=><AboutView/>}/>;
  // }
  render() {
    var iconIndex = require('./images/index.png');
    return (
      <View style={styles.container}>
        {this.state.tabBarshow ? 
          <TabBar 
            defaultPage={1}
            tintColor="green"
            barTintColor="red">
            <TabBar.Item
              title="分类"
              selected={this.state.selectedTab === 'types'}
              icon={require('./images/tags_32px_unclick.png')}
              selectedIcon={require('./images/tags_32px_clicked.png')}
  //            selectedIcon = {require('image!gonggao')}
              onPress = {()=>{
                this.setState({
                  selectedTab : 'types'
                });
              }}>
              {this._addNavigator(AllTypes,"分类")}
            </TabBar.Item>
            <TabBar.Item
              title="首页"
              icon={require('./images/home_32px_unclick.png')}
              selectedIcon={require('./images/home_32px_clicked.png')}
  //            selected={true}
              selected={this.state.selectedTab === 'home'}
  //            selectedIcon = {require('image!gonggao')}
              onPress = {()=>{
                this.setState({
                  selectedTab : 'home'
                });
              }}>
              {this._addNavigator(LastestView,"首页")}
            </TabBar.Item>
            <TabBar.Item
              title="关于"
  //            systemIcon="featured"
              icon={require('./images/info_32px_unclick.png')}
              selectedIcon={require('./images/info_32px_clicked.png')}
              selected = {this.state.selectedTab === 'about'}
//              badge = {3}
              onPress = {()=>{
                this.setState({
                  selectedTab : 'about',
//                  tabBarshow : false
                });
              }}>
              {this._addNavigator(AboutView,"关于")}
            </TabBar.Item>
          </TabBar> : null
        }

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
   // 导航栏
  navContainer: {
    backgroundColor: '#6982ef',
    height:35,
    flex:1,
  },
  // 导航栏文字
  headText: {

  },
  // 按钮
  button: {

  },
  // 按钮文字
  buttonText: {

  },
  // 左面导航按钮
  leftNavButtonText: {

  },
  // 右面导航按钮
  rightNavButtonText: {

  },
  // 标题
  navBarTitleText:{

  },


});




AppRegistry.registerComponent('yuxinote', () => yuxinote);
