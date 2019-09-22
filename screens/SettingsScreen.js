import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {clearLikedJobs} from '../actions';
import {View, Text} from 'react-native';
import {Button}  from 'react-native-elements';

class SettingsScreen extends Component{

    render(){
        return(
            <View>
              <Button onPress={this.props.clearLikedJobs} title='Clear liked Jobs'  buttonStyle={{backgroundColor: '#009688'}} icon={{name:'delete-forever'}}/>
            </View>
        )
    }
}

export  default connect(null,{clearLikedJobs})(SettingsScreen);