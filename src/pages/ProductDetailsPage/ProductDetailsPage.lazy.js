import React, { lazy, Suspense } from 'react';

const LazyProductDetailsPage = lazy(() => import('./ProductDetailsPage'));

const ProductDetailsPage = props => (
  <Suspense fallback={null}>
    <LazyProductDetailsPage {...props} />
  </Suspense>
);

export default ProductDetailsPage;
