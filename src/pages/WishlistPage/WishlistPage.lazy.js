import React, { lazy, Suspense } from 'react';

const LazyWishlistPage = lazy(() => import('./WishlistPage'));

const WishlistPage = props => (
  <Suspense fallback={null}>
    <LazyWishlistPage {...props} />
  </Suspense>
);

export default WishlistPage;
