import clsx from "clsx";
import PasswordToggle from "../PasswordToggle";

export default ({ show }: { show: boolean }) => {
  const handleRegisterClick = () => {};
  return (
    <div className={clsx(show ? "" : "hidden")}>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">Email:</span>
        </label>
        <div className="input-group flex">
          <input type="text" className="input input-bordered grow" />
          <button className="btn btn-primary">SEND</button>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">Code:</span>
          <input type="text" className="input input-bordered" />
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-medium">User Name:</span>
        </label>
        <input type="text" className="input input-bordered" />
      </div>
      <PasswordToggle labelText="Password" />
      <PasswordToggle labelText="Confirm Password" />

      <button
        className="btn btn-block btn-primary mt-10"
        onClick={handleRegisterClick}
      >
        Sign
      </button>
    </div>
  );
};
