import axios from 'axios';
import config from "../../config";

export default getAllCategories = () => { 
    let url = config.urls.api.base_url + config.urls.api.all_categories;    
    let promiseGetAllCategories = new Promise((resolve, reject) => {              
        axios.get(url)
            .then(res => {                       
                resolve(res.data);
            })
            .catch(err => {                
                reject(err);
            })
    });
    return promiseGetAllCategories;
};