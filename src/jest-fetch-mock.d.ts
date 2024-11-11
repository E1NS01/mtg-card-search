// src/jest-fetch-mock.d.ts
declare module "jest-fetch-mock" {
  export function enableMocks(): void;
  export function disableMocks(): void;
  export function mockResponseOnce(body: string, init?: ResponseInit): void;
  export function mockResponse(body: string, init?: ResponseInit): void;
  export function mockRejectOnce(error: Error): void;
  export function mockReject(error: Error): void;
  export function resetMocks(): void;
  export function clearMocks(): void;
  export function mockClear(): void;
  export function fetchMock(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response>;
}
