export const Loader = ({ type }: { type: "layout" | "datalist" }) => {
  return (
    <div className="loader">
      <span className={`loader__${type}`}></span>
    </div>
  );
};
