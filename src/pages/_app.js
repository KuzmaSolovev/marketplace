import Head from 'next/head';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DefaultSeo } from 'next-seo';
import { ToastContainer, Slide } from 'react-toastify';

import { queryClient } from '@api/base';
import { useSiteConfig } from '@shared/hooks';

import ErrorBoundary from '@components/ErrorBoundary';

import favicon from '@assets/favicon.ico';

import 'react-toastify/dist/ReactToastify.min.css';

const Web3ContextProvider = dynamic(() =>
  import('@features/web3/context').then((mod) => mod.Web3ContextProvider),
);

const NetworkMissmatchPopup = dynamic(() =>
  import('@features/web3/NetworkMissmatchPopup'),
);

const ProviderInstalledPopup = dynamic(() =>
  import('@features/web3/ProviderPopup'),
);

import '@styles/_base.scss';

const MyApp = ({ Component, pageProps }) => {
  const config = useSiteConfig();
  return (
    <>
      <DefaultSeo
        title={config.title}
        description={config.description}
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          site_name: config.siteName,
          description: config.description,
          url: config.url,
        }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href={favicon.src} type="image/png" sizes="16x16" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <Web3ContextProvider>
            <ErrorBoundary>
              <>
                <NetworkMissmatchPopup />
                <ProviderInstalledPopup />
                <Component {...pageProps} />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable={false}
                  pauseOnHover
                  transition={Slide}
                />
              </>
            </ErrorBoundary>
          </Web3ContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
