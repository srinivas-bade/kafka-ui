import 'whatwg-fetch';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { ReadableStream } from 'node:stream/web';
import { TextDecoder, TextEncoder } from 'node:util';

import fetchMock from 'fetch-mock';

// fetch-mock 12 relies on the WHATWG ReadableStream global, which jsdom does not provide
if (typeof window.ReadableStream === 'undefined') {
  Object.assign(window, { ReadableStream });
}
// react-router 7 relies on the TextEncoder/TextDecoder globals, which jsdom does not provide
if (typeof window.TextEncoder === 'undefined') {
  Object.assign(window, { TextEncoder, TextDecoder });
}

fetchMock.mockGlobal();
