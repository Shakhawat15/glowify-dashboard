import { useSelector } from "react-redux";

export default function FullscreenLoader() {
  const loader = useSelector((state) => state.settings.loader);
  return (
    <>
      <div className={`${loader} LoadingOverlay`}>
        <div className={"Line-Progress"}>
          <div className={"indeterminate"}></div>
        </div>
      </div>
    </>
  );
}
