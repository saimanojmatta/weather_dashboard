type Props = {};
const Loader = (props: Props) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container">
        <div className="cloud front">
          <span className="left-front"></span>
          <span className="right-front"></span>
        </div>
        <span className="sun sunshine"></span>
        <span className="sun"></span>
        <div className="cloud back">
          <span className="left-back"></span>
          <span className="right-back"></span>
        </div>
      </div>
    </div>
  );
};
export default Loader;
