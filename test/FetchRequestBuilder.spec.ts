import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { FetchRequestBuilder, GlobalThis } from "../src/fetch-request-builder";
import { DeepMockProxy, mockClear, mockDeep } from "vitest-mock-extended";

describe("FetchRequestBuilder", () => {
  let globalThis: DeepMockProxy<GlobalThis>;

  beforeEach(() => {
    globalThis = mockDeep<GlobalThis>();
  });

  afterEach(() => {
    mockClear(globalThis);
  });

  test("should throw an error if the url is not provided", () => {
    const requestBuilder = new FetchRequestBuilder(globalThis);
    expect(() => requestBuilder.send()).toThrow("URL must be provided");
  });

  test("should call the GlobalThis.fetch method with the proper parameters", () => {
    const expectedHeaders = new Headers();
    expectedHeaders.append("Content-type", "application/json");
    expectedHeaders.append("author", "Jaypee");

    const expectedURL = "http://localhost:8080";
    const expectedMethod = "POST";
    const expectedBody = { message: "Hello, World" };

    new FetchRequestBuilder(globalThis)
      .url(expectedURL)
      .method(expectedMethod)
      .body(expectedBody)
      .setHeader("Content-type", "application/json")
      .setHeader("author", "Jaypee")
      .send();

    expect(globalThis.fetch).toHaveBeenCalledWith(expectedURL, {
      method: expectedMethod,
      headers: expectedHeaders,
      body: JSON.stringify(expectedBody),
    });
  });
});
