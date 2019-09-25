import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {Provider} from 'react-redux';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import  SettingsScreen from './screens/SettingsScreen';
import  ReviewScreen from './screens/ReviewScreen';
        const MainNavigator=createBottomTabNavigator({
                welcome:{screen:WelcomeScreen},
            auth:{screen: AuthScreen},
            main:{
                  screen:  createBottomTabNavigator({
                        map:{screen:MapScreen},
                        deck:{
                            screen:DeckScreen
                        },
                      review:{
                            screen:createStackNavigator({
                                review:{screen:ReviewScreen},
                                settings:{screen:SettingsScreen}
                            })
                      }
                    },{
                      defaultNavigationOptions:{
                          tabBarPosition:'bottom',
                          tabBarOptions:{
                              labelStyle:{fontSize:12}
                          }
                      },
                  })
            }
        },{
            defaultNavigationOptions:{
                tabBarVisible:false
            },
            lazy:true
        });
let Navigation=createAppContainer(MainNavigator);

class App extends Component{

    render(){
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        )
    }
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
