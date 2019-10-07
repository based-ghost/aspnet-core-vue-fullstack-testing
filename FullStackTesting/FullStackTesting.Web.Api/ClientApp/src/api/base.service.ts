import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { alertAxiosError } from "@/utils/helper";

/**
 * Service API base class
 * 1: Configure axios instance
 * 2: Add response handler for this axios instance
 */
export abstract class BaseService {
  protected readonly $http: AxiosInstance;

  protected constructor(apiBaseUrl: string, apiTimeout: number = 15000) {
    this.$http = axios.create({
      timeout: apiTimeout,
      baseURL: apiBaseUrl
    });

    this.$http.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        return response;
      },
      (error: AxiosError<any>) => {
        alertAxiosError(error);
        return Promise.reject(error);
      }
    );
  }
}
