import { AxiosError } from 'axios';
import { EventBus } from '../eventBus';

/**
 * Determine if obect is an array and contains items
 */
export const isArrayWithItems = (arr: any[] | any): boolean => {
    return  Array.isArray(arr) && arr.length > 0;
};

/**
 * Gets the value of an object property at the designated path 
 * Returns array of values in case first level of object has multiple keys
 */
export const getObjectValues = (obj: any, path: string): any[] => {
    let vals = [];
    const paths = (path || '').trim().split('.');

    if (!isArrayWithItems(paths) || !obj || !Object.keys(obj).length) {
        return vals;
    }

    Object.keys(obj).forEach(key => {
        let subObj = obj[key];

        for (let i=0; i < paths.length; i++){
            if (subObj !== null && typeof subObj[paths[i]] !== 'undefined' && subObj[paths[i]] !== null) {
                subObj = subObj[paths[i]];
            }
        }

        if (subObj) {
            vals.push(subObj);
        }
    });

    return vals;
};

/**
 * Trigger a vue-snotify snackbar notifcation that the axios request was successful
 */
export const alertAxiosSuccess = (body: string, title: string = 'Success', timeout: number = 0): void => {
    setTimeout(() => {
        EventBus.$snotify.success(body, title);
    }, timeout);
}

/**
 * Trigger a vue-snotify snackbar notifcation that the axios request failed 
 * Also logs full response in console
 */
export const alertAxiosError = (error: AxiosError): void => {
    const message = {
        body: 'Internal Server Error',
        request: '',
        status: 500
    };

    if (typeof error !== 'undefined') {
        if (error.hasOwnProperty('message')) {
            message.body = error.message;
        }
    }

    if (typeof error.response !== 'undefined') {
        if (error.response.status === 401) {
            message.body = 'UnAuthorized';
        } else if (error.response.status === 404) {
            message.body = 'API Route is Missing or Undefined';
        } else if (error.response.status === 405) {
            message.body = 'API Route Method Not Allowed';
        } else if (error.response.status >= 500) {
            message.body = 'Internal Server Error';
        }

        if (error.response.status > 0) {
            message.status = error.response.status;
        }

        if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data')) {
            if (error.response.data.hasOwnProperty('message') && error.response.data.message.length > 0) {
                message.body = error.response.data.message;
            }
        }
    }

    console.error(`Status Code: ${message.status}:\nResponse: ${message.body}`);
    EventBus.$snotify.error('See console for details', `Error ${message.status}`);
}