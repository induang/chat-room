import clsx from "clsx";
import closeIcon from "@/assets/close-eye.png";
import openIcon from "@/assets/eye.png";
import { FieldHookConfig, useField } from "formik";
import { useState } from "react";

interface IPasswordFieldProps {
  label: string;
}

export default function PasswordField(
  props: IPasswordFieldProps & FieldHookConfig<any>
) {
  const [field, meta] = useField(props);
  const [masked, setMasked] = useState(true);
  return (
    <>
      <label className="label">
        <span className="label-text text-xl">{props.label}:</span>
        <label className="swap">
          <input
            tabIndex={-1}
            type="checkbox"
            onChange={() => setMasked(!masked)}
          />
          <div className="swap-on w-6">
            <img src={openIcon} />
          </div>
          <div className="swap-off w-6">
            <img src={closeIcon} />
          </div>
        </label>
      </label>
      <input
        name={props.name}
        type={masked ? "password" : "text"}
        className={clsx(
          "input input-bordered",
          !Boolean(meta.touched && meta.error) || "input-error"
        )}
        value={field.value || ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      {!Boolean(meta.touched && meta.error) || (
        <label className="label">
          <span className="label-text-alt text-error">{meta.error}</span>
        </label>
      )}
    </>
  );
}
