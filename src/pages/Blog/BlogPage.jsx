// import CategoryList from "../../components/Category/CategoryList";
import { lazy, Suspense } from "react";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const BlogList = lazy(() => import("../../components/Blog/BlogList"));

export default function index() {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <BlogList />
      </Suspense>
    </MasterLayout>
  );
}
