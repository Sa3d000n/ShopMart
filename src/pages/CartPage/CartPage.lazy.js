import React, { lazy, Suspense } from 'react';

const LazyCartPage = lazy(() => import('./CartPage'));

const CartPage = props => (
  <Suspense fallback={null}>
    <LazyCartPage {...props} />
  </Suspense>
);

export default CartPage;
