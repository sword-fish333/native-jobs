import React ,{Component} from 'react';
import {Button,Icon} from 'react-native-elements';
import {View, Text,ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import * as actions from '../actions';
class MapScreen extends Component{

    static navigationOptions={
        title:'Map',
        tabBarIcon:({tintColor}) =>  <Icon size={ 20 } name={ 'my-location' } color={ tintColor}/>


    }
        state={
            mapLoaded:false,
            region:{
                longitude:-122,
                latitude:37,
                longitudeDelta:0.04,
                latitudeDelta:0.09
            }
        }

        componentDidMount(){
            this.setState({
                mapLoaded:true
            })
        }
    onRegionChangeComplete=(region)=>{
            this.setState({
                region
            });
    }

    onButtonPress=()=>{
            this.props.fetchJobs(this.state.region,()=>{
                this.props.navigation.navigate('deck');
            });
    }
    render(){
            if(!this.state.mapLoaded){
                return (
                    <View style={{flex:1, justifyContent:'center'}}>
                        <ActivityIndicator size="large" />
                    </View>
                )
            }

        return(
            <View style={{flex:1}}>
               <MapView
                   region={this.state.region}
                   style={{flex:1}}
               onRegionChangeComplete={this.onRegionChangeComplete}
               />
                <View style={styles.buttonContainer}>
                    <Button  large title='Search This Area'
                             buttonStyle={{backgroundColor: '#009688'}}


                             icon={{name:'search',
                             color:'white'
                             }}
                             onPress={this.onButtonPress}
                    />
                </View>
            </View>
        )
    }
}

const styles={
    buttonContainer:{
        position:'absolute',
        bottom:20,

        width:'70%',

        alignSelf: 'center',
    }
}

export  default connect(null,actions)(MapScreen);