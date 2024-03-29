import axios from 'axios';
import {FETCH_JOBS, LIKE_JOB,CLEAR_LIKED_JOBS} from './types';
// import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
const JOB_ROOT_URL='http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS={
    publisher:'4201738803816157',
    format:'json',
    v:'2',
    latlong:1,
    radius:10,
    q:'javascript'
};


const buildJobsUrl=zip=>{
    const query=qs.stringify({...JOB_QUERY_PARAMS,l:zip});
    return `${JOB_ROOT_URL}${query}`;
}
export const fetchJobs =(region,callback)=> async dispatch=> {

    try {
        // let zipcode = await reverseGeocode(region);
 let res=await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=API_KEY`);
     let results=res.data.results[0].address_components;
        let zipcode='';
        results.forEach(res=>{

            if (res.types.includes("postal_code")){
                console.log('121',res);
                zipcode=res.long_name
            }
        });


        const url=buildJobsUrl(zipcode);
        let {data}=await axios.get(url);
         dispatch({type:FETCH_JOBS,payload:data});

        callback();
    }catch(err){

        console.error('err=>',err);
    }
}

export const likeJob=job=>{
    return {
        payload:job,
        type:LIKE_JOB
    }
}

export const clearLikedJobs=()=>{
    return {type:CLEAR_LIKED_JOBS}
};
