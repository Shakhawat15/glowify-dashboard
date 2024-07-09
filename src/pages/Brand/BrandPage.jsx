import { lazy, Suspense } from "react";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const BrandList = lazy(() => import("../../components/Brand/BrandList"));

export default function index() {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <BrandList />
      </Suspense>
    </MasterLayout>
  );
}
