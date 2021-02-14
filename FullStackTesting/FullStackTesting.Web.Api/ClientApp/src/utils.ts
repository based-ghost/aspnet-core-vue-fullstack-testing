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
  title: string = "Success",
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
export const alertAxiosError = (error: AxiosError<any>): void => {
  const message = {
    body: "Internal Server Error",
    request: "",
    status: 500
  };

  if (typeof error !== "undefined") {
    if (error.hasOwnProperty("message")) {
      message.body = error.message;
    }
  }

  if (typeof error.response !== "undefined") {
    if (error.response.status === 401) {
      message.body = "UnAuthorized";
    } else if (error.response.status === 404) {
      message.body = "API Route is Missing or Undefined";
    } else if (error.response.status === 405) {
      message.body = "API Route Method Not Allowed";
    } else if (error.response.status >= 500) {
      message.body = "Internal Server Error";
    }

    if (error.response.status > 0) {
      message.status = error.response.status;
    }

    if (
      error.hasOwnProperty("response") &&
      error.response.hasOwnProperty("data")
    ) {
      if (
        error.response.data.hasOwnProperty("message") &&
        error.response.data.message.length > 0
      ) {
        message.body = error.response.data.message;
      }
    }
  }

  console.error(`Status Code: ${message.status}:\nResponse: ${message.body}`);
  EventBus.$snotify.error("See console for details", `Error ${message.status}`);
};
