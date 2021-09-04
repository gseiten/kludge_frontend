
import axios from 'axios';
import router from '../router';

// response interceptor
axios.interceptors.response.use( response => {
    // do something with response object.
    return response;
  }, error => {
    // User is not logged in. Express session cookies has expired.
    // All errors except 404 will be normally handled by axios.
    if(error.response.status == 404 && error.response.data.error == 'authentication failed'){
        window.localStorage.removeItem('vuex');
        router.push({name: 'landing'});
    }
    return Promise.reject(error);
  });

export default axios;
