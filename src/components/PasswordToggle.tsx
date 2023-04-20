import { useState } from "react";
import closeIcon from "../assets/close-eye.png";
import openIcon from "../assets/eye.png";

export default ({ labelText }: { labelText: string }) => {
  const [masked, setMasked] = useState(true);
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xl font-medium">{labelText}:</span>
        <label className="swap">
          <input type="checkbox" onChange={() => setMasked(!masked)} />
          <div className="swap-on w-6">
            <img src={openIcon} />
          </div>
          <div className="swap-off w-6">
            <img src={closeIcon} />
          </div>
        </label>
      </label>

      <input
        type={masked ? "password" : "text"}
        className="input input-bordered"
      />
    </div>
  );
};
