// import CategoryList from "../../components/Category/CategoryList";
import { lazy, Suspense } from "react";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const CategoryList = lazy(() =>
  import("../../components/Category/CategoryList")
);

export default function index() {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <CategoryList />
      </Suspense>
    </MasterLayout>
  );
}
