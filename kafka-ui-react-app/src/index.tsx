import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyleSheetManager } from 'styled-components';
import { ThemeModeProvider } from 'components/contexts/ThemeModeContext';
import App from 'components/App';
import { store } from 'redux/store';
import { shouldForwardProp } from 'lib/styledComponents';
import 'lib/constants';
import 'theme/index.scss';

const container =
  document.getElementById('root') || document.createElement('div');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={window.basePath || '/'}>
      <ThemeModeProvider>
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
          <App />
        </StyleSheetManager>
      </ThemeModeProvider>
    </BrowserRouter>
  </Provider>
);
