window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


window.axios.interceptors.response.use( (response) => {
    // Return a successful response back to the calling service
    return response;
}, (error) => {

    if (error.response.status == 429){
        Vue.prototype['$toast'].warning('Too Many Requests, Please Try Again Later.')
    }

    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
            reject(error.response);
        });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url == 'auth/refresh' || error.response.data.message == 'Unauthorized') {
        window.localStorage.clear()
        Vue.router.push('/login')
        Vue.prototype['$toast'].warning('Session Expired. Please Login Again.')

        return new Promise((resolve, reject) => {
            reject(error.response);
        });
    }

    return new Promise((resolve, reject) => {
        reject(error.response);
    });

});


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
