import { Suspense } from 'react';
import Loader from '../components/common/Loader/Loader';

const withSuspense = (Component) => {
  const WrappedWithSuspense = (props) => {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };

  WrappedWithSuspense.displayName = `withSuspense(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedWithSuspense;
};

export default withSuspense;
