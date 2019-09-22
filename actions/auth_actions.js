
import {AsyncStorage} from 'react-native';
import * as Facebook from 'expo-facebook';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

//How AsyncStorage work:

//AsyncStorage.setItem('fc_token',token);
//AsyncStorage.getItem('fc_token');
//AsyncStorage.removeItem('fc_token');


export const facebookLogin= ()=> async dispatch=> {

                let token = await AsyncStorage.getItem('fb_token');

                if (token) {
                    // dispatch action saying facebook login is done
                dispatch({type:FACEBOOK_LOGIN_SUCCESS,payload:token});
                } else {
                    //do facebook login
                    doFacebookLogin(dispatch);

                }
            }


            const doFacebookLogin=async dispatch=>{
                let {type,token} =await Facebook.logInWithReadPermissionsAsync('2384224128293308',{
                    permissions:['public_profile']
                });

                if(type==='cancel'){
                    dispatch({type:FACEBOOK_LOGIN_FAIL})
                }
        await AsyncStorage.setItem('fb_token',token);
        dispatch({type:FACEBOOK_LOGIN_SUCCESS,payload:token});
}