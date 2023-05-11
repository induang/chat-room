import clsx from "clsx";
import { FieldHookConfig, useField } from "formik";
import VerifyCodeSendBTN from "./VerifyCodeSendBTN";

interface IInputFieldProps {
  label: string;
}

export default function InputField(
  props: IInputFieldProps & FieldHookConfig<string>
) {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="label">
        <span className="label-text text-xl font-medium">{props.label}:</span>
      </label>
      <div className="input-group">
        <input
          name={props.name}
          type="text"
          className={clsx(
            "input input-bordered grow",
            !Boolean(meta.touched && meta.error) || "input-error"
          )}
          value={field.value || ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        <VerifyCodeSendBTN email={field.value} />
      </div>
      {!Boolean(meta.touched && meta.error) || (
        <label className="label">
          <span className="label-text-alt text-error">{meta.error}</span>
        </label>
      )}
    </>
  );
}
