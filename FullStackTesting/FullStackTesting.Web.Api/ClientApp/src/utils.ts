import { AxiosError } from "axios";
import { EventBus } from "./event-bus";

/**
 * Tests if object is an array with at least 1 item.
 */
export function isArrayWithLength(test: any): boolean {
  return Array.isArray(test) && !!test.length;
}

/**
 * Tests for a 'plain, classic' object (non-primitive type that is not an array).
 */
export function isPlainObject(test: any): boolean {
  return test !== null && typeof test === 'object' && !Array.isArray(test);
}

/**
 * Trigger a vue-snotify snackbar notifcation that the axios request was successful
 */
export const alertAxiosSuccess = (
  body: string,
  title: string = 'Success',
  timeout: number = 0
): void => {
  setTimeout(() => {
    EventBus.$snotify.success(body, title);
  }, timeout);
};

/**
 * Trigger a vue-snotify snackbar notifcation that the axios request failed
 * Also logs full response in console
 */
export const alertAxiosError = (error: AxiosError): void => {
  // Error Message Object
  const message = {
    body: 'Internal Server Error',
    request: '',
    status: 500
  };

  // Setup Error Message
  if (
    typeof error !== 'undefined' &&
    Object.prototype.hasOwnProperty.call(error, 'message')
  ) {
    message.body = error.message;
  }

  if (typeof error.response !== 'undefined') {
    // Setup Generic Response Messages
    switch (error.response.status) {
      case 401:
        message.body = 'UnAuthorized';
        break;
      case 404:
        message.body = 'API Route is Missing or Undefined';
        break;
      case 405:
        message.body = 'API Route Method Not Allowed';
        break;
      case 422:
        break;
      case 500:
      default:
        message.body = 'Internal Server Error';
        break;
    }

    // Assign error status code
    if (error.response.status > 0) {
      message.status = error.response.status;
    }

    // Try to Use the Response Message
    if (
      Object.prototype.hasOwnProperty.call(error, 'response') &&
      Object.prototype.hasOwnProperty.call(error.response, 'data') &&
      Object.prototype.hasOwnProperty.call(error.response.data, 'message') &&
      !!error.response.data.message.length
    ) {
      message.body = error.response.data.message;
    }
  }

  console.error(`Status Code: ${message.status}:\nResponse: ${message.body}`);
  EventBus.$snotify.error("See console for details", `Error ${message.status}`);
};
