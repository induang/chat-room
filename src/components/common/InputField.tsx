import clsx from "clsx";
import { FieldHookConfig, useField } from "formik";

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
        <span className="label-text text-xl">{props.label}:</span>
      </label>
      <input
        name={props.name}
        type="text"
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
