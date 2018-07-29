import axios from 'axios';
import config from "../../config";

export default getAllPostsFromACategory = category_id => { 
    let url = config.urls.api.base_url 
    + config.urls.api.category 
    + category_id 
    + '&per_page=60';    
    let promiseGetAllPostsFromACategory = new Promise((resolve, reject) => {              
        axios.get(url)
            .then(res => {                       
                resolve(res.data);
            })
            .catch(err => {                
                reject(err);
            })
    });
    return promiseGetAllPostsFromACategory;
};