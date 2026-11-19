import isPropValid from '@emotion/is-prop-valid';
import type { ShouldForwardProp } from 'styled-components';

// styled-components v6 no longer filters props before passing them to DOM
// elements; keep the v5 behaviour of only forwarding valid HTML attributes
export const shouldForwardProp: ShouldForwardProp<'web'> = (
  propName,
  target
) => (typeof target === 'string' ? isPropValid(propName) : true);
