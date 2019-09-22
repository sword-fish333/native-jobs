import React ,{Component} from 'react';
import  {connect} from 'react-redux';
import {View, Text,Platform,ScrollView,Linking} from 'react-native';
import {Button} from 'react-native-elements';
import {MapView} from 'react-native-maps';
class ReviewScreen extends Component{
        static navigationOptions=({navigation})=>{
            return {
                title: 'Review Jobs',
                headerRight:( <Button onPress={() => {
                    navigation.navigate('settings')
                    backgroundColor="#ffff"
                    color="rgba(0,122,255,1)"
                }} title="Settings"/>),
                style:{
                    marginTop:Platform.OS==='android' ? 24:0
                }
            }

        }

    renderLikedJobs(){
        this.props.likedJobs(job=>{
            const {company,formattedRelativeTime,url,latitude,longitude,jobtitle,jobkey}=job;
            const initialRegion={
                latitude,
                longitude,
                latitudeDelta:0.045,
                longitudeDelta:0.02
            }
            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{height:200}}>
                        <MapView style={{flex:1}} cacheEnabled={Platform.OS==='android'} scrollEnabled={false} initialRegion={initialRegion} />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italic}>{company}</Text>
                            <Text style={styles.italic}>{formattedRelativeTime}</Text>
                        </View>
                        <Button title="Apply Now!"
                                buttonStyle={{backgroundColor: '#009688'}}
                       onPress={()=>Linking.openURL(url)}
                        />
                    </View>
                </Card>
            )
        })
    }
    render(){
        return(
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}
const styles={
    detailWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:10
    },
    italic:{
        fontFamily:'italic'
    }
}
function mapStateToProps(state) {
    return {likedJobs:state.likedJobs}
}
export  default connect(mapStateToProps,)(ReviewScreen);