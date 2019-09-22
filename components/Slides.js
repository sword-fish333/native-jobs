import React ,{Component} from 'react';
import {ScrollView,Text,View,Dimensions} from 'react-native';
import {Button} from "react-native-elements";
const SCREEN_WIDTH=Dimensions.get('window').width;
class Slides extends  Component{

    renderLastSlide=i=>{
        if(i===this.props.data.length-1){
            return (
                <Button title="Onwards!"
                raised
                        buttonStyle={styles.btnStyle}
                        onPress={this.props.onComplete}
                />
            )
        }
    }

    renderSlides=()=>{
        return this.props.data.map((slide,i)=>{
            return (<View key={i} style={[styles.slide,{backgroundColor:slide.color}]}>
                <Text style={styles.textSize}>{slide.text}</Text>
                {this.renderLastSlide(i)}
            </View>)
        })
    }
    render(){
        return (
            <ScrollView horizontal
                        pagingEnabled
                        style={{height:'100%'}}
            >
                {this.renderSlides()}

            </ScrollView>
        )
    }
}


const styles={
    slide:{
      flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:SCREEN_WIDTH,

    },
    textSize:{
        fontSize:30,
        color:'white'
    },
    btnStyle:{
        backgroundColor:'#0288D1',
        // paddingTop:15
    }
}

export default Slides;