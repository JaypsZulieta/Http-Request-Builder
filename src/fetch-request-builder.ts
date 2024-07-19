import { HttpRequestBuilder } from "./http-request-builder";
export interface CanFetch {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export class FetchRequestBuilder implements HttpRequestBuilder {
  private headers: Headers;
  private urlSet?: string;
  private bodySet?: BodyInit;
  private methodSet?: string;

  constructor(private fetcher: CanFetch) {
    this.headers = new Headers();
  }

  url(url: string): HttpRequestBuilder {
    this.urlSet = url;
    return this;
  }

  method(method: string): HttpRequestBuilder {
    this.methodSet = method;
    return this;
  }
  setHeader(header: string, value: string): HttpRequestBuilder {
    this.headers.append(header, value);
    return this;
  }
  body(body: any): HttpRequestBuilder {
    this.bodySet = JSON.stringify(body);
    return this;
  }
  send(): Promise<Response> {
    if (!this.urlSet) throw new Error("URL must be provided");
    const url = this.urlSet;
    const body = this.bodySet;
    const headers = this.headers;
    const method = this.methodSet;
    return this.fetcher.fetch(url, { body, headers, method });
  }
}
