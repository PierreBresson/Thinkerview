import axios from 'axios';
import config from "../../config";

export default getAllPosts = () => { 
    let url = config.urls.api.base_url + config.urls.api.all_posts;    
    let promiseGetAllPosts = new Promise((resolve, reject) => {              
        axios.get(url)
            .then(res => {                       
                resolve(res.data);
            })
            .catch(err => {                
                reject(err);
            })
    });
    return promiseGetAllPosts;
};