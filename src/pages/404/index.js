import { NextSeo } from 'next-seo';

import Error from '@components/Error';

const Page404 = () => {
  return (
    <>
      <NextSeo title={'Page not found | Kitsumon'} />
      <Error title="404" />
    </>
  );
};

export default Page404;
