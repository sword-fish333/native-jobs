import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {clearLikedJobs} from '../actions';
import {View, Text,Platform} from 'react-native';
import {Button}  from 'react-native-elements';

class SettingsScreen extends Component{
        static navigationOptions={
            header:{
                style:{
                    marginTop:Platform.OS==='android' ? 24:0
                }
            }
        }
    render(){
        return(
            <View>
              <Button onPress={this.props.clearLikedJobs} title='Clear liked Jobs'  buttonStyle={{backgroundColor: '#009688'}} icon={{name:'delete-forever'}}/>
            </View>
        )
    }
}

export  default connect(null,{clearLikedJobs})(SettingsScreen);