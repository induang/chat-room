import clsx from "clsx";
import PasswordToggle from "../PasswordToggle";

export default ({ show }: { show: boolean }) => {
  const handleLoginClick = () => {};
  return (
    <div className={clsx(show ? "" : "hidden")}>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">Email:</span>
        </label>
        <input type="text" className="input input-bordered" />
      </div>
      <PasswordToggle labelText="Password" />
      <button
        className="btn btn-block btn-primary mt-10"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
};
