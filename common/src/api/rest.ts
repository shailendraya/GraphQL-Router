import { RESTDataSource } from "@apollo/datasource-rest";
import { CircuitBreaker } from "../circuitBreaker";

const BASE_PATH =
  process.env.BASE_PATH ?? "https://jsonplaceholder.typicode.com/";

class APISource extends RESTDataSource {
  private circuitBreaker = new CircuitBreaker();
  constructor(private baseUrl?: string) {
    super();
    this.baseURL = baseUrl || BASE_PATH;
  }

  private urlHelper(subpath: string): string {
    if (subpath.startsWith("http://") || subpath.startsWith("https://")) {
      return subpath;
    } else {
      return this.baseURL + subpath;
    }
  }

  public async getAPI(url: string, params?: any): Promise<any> {
    const helperForAPICallBack = () =>
      this.get(this.urlHelper(url), { params });
    try {
      return this.circuitBreaker.fire(helperForAPICallBack);
    } catch (error: any) {
      throw new Error(`Error calling GET API: ${error.message}`);
    }
  }

  public async postAPI(url: string, data?: any, params?: any): Promise<any> {
    try {
      return this.post(this.urlHelper(url), { params, body: data });
    } catch (error: any) {
      throw new Error(`Error calling POST API: ${error.message}`);
    }
  }

  public async putAPI(url: string, data?: any, params?: any): Promise<any> {
    try {
      return this.put(this.urlHelper(url), { params, body: data });
    } catch (error: any) {
      throw new Error(`Error calling PUT API: ${error.message}`);
    }
  }

  public async deleteAPI(url: string, params?: any): Promise<any> {
    try {
      return this.delete(this.urlHelper(url), { params });
    } catch (error: any) {
      throw new Error(`Error calling DELETE API: ${error.message}`);
    }
  }
}

export const ds = new APISource();
