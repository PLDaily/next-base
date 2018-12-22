import withRedux from 'next-redux-wrapper';
import App, { Container } from 'next/app';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux';

class MyApp extends App<any> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component store={store} {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
export default withRedux(configureStore, (state) => state)(MyApp);
