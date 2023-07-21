import { BASE_URL } from '../API';
import axios from 'axios';

export function PostAPI(url,obj){
    return new Promise(async(resolve,reject)=>{


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BASE_URL+url,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : obj
          };

          axios.request(config)
                .then((response) => {
         console.log(JSON.stringify(response.data));
        resolve(response)
                })
            .catch((error) => {
      console.log(error);
      reject(error)
        });
})}

// const axios = require('axios');
// let data = JSON.stringify({
//   "email": "sujit@gmail.com",
//   "password": "sujit@123"
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'http://localhost:4000/login',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });
