/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { server } from '@Mocks/server';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { HEADERS, METHODS, MIME_TYPES } from '../constant';
import { fetchApi, FetchApiError } from '../fetchApi';

describe('fetchApi', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  beforeAll(() => {
    server.close();
  });

  it('should return JSON data on success', async () => {
    const mockResponse = { message: 'Success' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.json }),
    });

    const result = await fetchApi<{ message: string }>('/test', { method: METHODS.get });

    expect(result).toStrictEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        method: METHODS.get,
      }),
    );
  });

  it('should throw an error when the HTTP response is not successful', async () => {
    const mockError = 'Not Found';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: () => Promise.resolve(mockError),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.text }),
    });

    await expect(fetchApi('/error', { method: METHODS.get })).rejects.toThrowError(FetchApiError);

    expect(fetch).toHaveBeenCalledWith(
      '/api/error',
      expect.objectContaining({
        method: METHODS.get,
      }),
    );
  });

  it('should handle non-JSON responses', async () => {
    const mockResponse = 'Plain text response';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockResponse),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.text }),
    });

    const result = await fetchApi<string>('/text', { method: METHODS.get });

    expect(result).toBe(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      '/api/text',
      expect.objectContaining({
        method: METHODS.get,
      }),
    );
  });

  it('should add Content-Type header for POST requests with data', async () => {
    const mockResponse = { message: 'Created' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.json }),
    });

    const postData = { name: 'Test' };
    const result = await fetchApi<{ message: string }>('/create', {
      method: METHODS.post,
      body: JSON.stringify(postData),
    });

    expect(result).toStrictEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      '/api/create',
      expect.objectContaining({
        method: METHODS.post,
        body: JSON.stringify(postData),
      }),
    );

    const calledHeaders = fetchMock.mock.settledResults[0].value?.headers as Headers;
    expect(calledHeaders.get(HEADERS.contentType)).toBe(MIME_TYPES.json);
  });

  it('should throw an error containing text content on HTTP failure', async () => {
    const mockError = 'Error message in plain text';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: () => Promise.resolve(mockError),
      headers: new Headers(),
    });

    await expect(fetchApi('/server-error', { method: METHODS.get })).rejects.toThrowError(
      new FetchApiError(mockError, 500, MIME_TYPES.text),
    );

    expect(fetch).toHaveBeenCalledWith(
      '/api/server-error',
      expect.objectContaining({
        method: METHODS.get,
      }),
    );
  });

  it('should return raw response when Content-Type header is missing', async () => {
    const mockResponse = { message: 'Success' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
      headers: new Headers(),
    });

    const result = await fetchApi('/missing-content-type', { method: METHODS.get });

    expect(result).toStrictEqual(JSON.stringify(mockResponse));
    expect(fetch).toHaveBeenCalledWith(
      '/api/missing-content-type',
      expect.objectContaining({
        method: METHODS.get,
      }),
    );
  });
});
