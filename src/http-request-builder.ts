export interface HttpRequestBuilder {
  url(url: string): HttpRequestBuilder;
  method(method: string): HttpRequestBuilder;
  setHeader(header: string, value: string): HttpRequestBuilder;
  body(body: any): HttpRequestBuilder;
  send(): Promise<Response>;
}
