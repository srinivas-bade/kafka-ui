import 'whatwg-fetch';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { ReadableStream } from 'node:stream/web';

import fetchMock from 'fetch-mock';

// fetch-mock 12 relies on the WHATWG ReadableStream global, which jsdom does not provide
if (typeof window.ReadableStream === 'undefined') {
  Object.assign(window, { ReadableStream });
}

fetchMock.mockGlobal();
