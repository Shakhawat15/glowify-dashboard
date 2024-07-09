export default function LazyLoader() {
  return (
    <>
      <div className={"LoadingOverlay d-none"}>
        <div className={"Line-Progress"}>
          <div className={"indeterminate"}></div>
        </div>
      </div>
    </>
  );
}
