import React ,{Component} from 'react';
import _ from 'lodash';
import {AppLoading} from 'expo';
import {View, Text,AsyncStorage} from 'react-native';
import Slides from '../components/Slides';


const data=[
    {text:'Focus', color:'#2980b9'},
    {text:'Power', color:'#c0392b'},
    {
        text:'Excellence', color:'#27ae60'
    }
];
class WelcomeScreen extends Component{
    state={token:null};


    onSlidesComplete=()=>{
        this.props.navigation.navigate('auth');
    };

   async componentWillMount(){
        let token=await AsyncStorage.getItem('fb_token');
        if(token){
            this.props.navigation.navigate('auth');
            this.setState({token})
        }else{
            this.setState({token:false});
        }
    }
    render(){
        if(_.isNull(this.state.token)){
            return <AppLoading />
        }
        return(
            <View>

              <Slides data={data} onComplete={this.onSlidesComplete}/>
            </View>
        )
    }
}

export  default WelcomeScreen;