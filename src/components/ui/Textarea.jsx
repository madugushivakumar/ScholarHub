import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

const Textarea = forwardRef(function Textarea(
  {
    label,
    id,
    name,
    value,
    defaultValue,
    onChange,
    placeholder,
    rows = 3,
    error,
    helperText,
    required = false,
    disabled = false,
    className = "",
    textareaClassName = "",
    ...props
  },
  ref
) {
  const textareaId = id || name;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold text-slate-700 tracking-wide flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-red-500 ml-1 font-bold">*</span>}
          </span>
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full rounded-lg border text-sm transition-all duration-200 placeholder:text-slate-400 p-3 ${
          error
            ? "border-red-300 bg-red-50/30 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-slate-300 bg-white text-slate-800 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
        } disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed resize-y ${textareaClassName}`}
        {...props}
      />

      {error ? (
        <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Textarea;
