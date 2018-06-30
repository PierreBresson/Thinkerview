import axios from 'axios';
import config from "../../config";

export default getAllPostsFromACategory = category_id => { 
    let url = config.urls.api.base_url + config.urls.api.all_posts_from_a_category + category_id;    
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