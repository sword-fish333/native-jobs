import React ,{Component} from 'react';
import MapView from 'react-native-maps';
import {Card,Button,Icon} from 'react-native-elements';
import {View, Text,Platform} from 'react-native';
import {connect} from 'react-redux';
import Swipe from '../components/Swipe';
import * as actions from '../actions';
class DeckScreen extends Component{
    static navigationOptions={
        title:'Jobs',
        tabBarIcon:({tintColor})=><Icon name={'description'} size={30} color={tintColor}/>
    }

        renderCard(job){
            const initialRegion={
                latitude:job.latitude,
                longitude:job.longitude,
                latitudeDelta:0.045,
                longitudeDelta:0.02 ,
            }
           return( <Card title={job.jobtitle}>
               <View style={{height:300}}>
               <MapView
                   cacheEnabled={Platform.OS==='android'}
                   style={{flex:1}}
                   scrollEnabled={false}>
                    initialRegion={initialRegion}
               </MapView>
               </View>
                   <View style={styles.detailWrapper}>
                    <Text>{job.jobcompany}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
               <Text>{job.snippet.replace(/<b>/g,'').replace(/<\/b>/g,'')}</Text>
            </Card>)
        }

        renderNoMoreCards=()=>{
            return (
                <Card title='No More Jobs'>
                    <Button
                    title='Back to map'
            icon={{name:'my-location'}}
                    onPress={()=>this.props.navigation.navigate('map')}
                    backgroundColor="#2980b9"
                    />
                </Card>
            )
        }
    render(){
        return(
            <View style={{marginTop:20}}>
               <Swipe
                   renderNoMoreCards={this.renderNoMoreCards}
                   data={this.props.jobs ? this.props.jobs : []}
                      renderCard={this.renderCard}
                   onSwipeRight={job=>this.props.likeJob(job)}
                   keyProp="jobkey"
               />
            </View>
        )
    }
}

function mapStateToProps({jobs}) {
    return {jobs:jobs.results}
}

const styles={
    detailWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10
    }
}
export  default connect(mapStateToProps,actions)(DeckScreen);