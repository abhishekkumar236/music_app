import React from "react";

type Field = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

type FormProps = {
  title?: string;
  fields: Field[];
  buttonText: string;
  onSubmit: (formData: Record<string, string>) => void;
};

const Form: React.FC<FormProps> = ({ title, fields, buttonText, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name) as string;
    });
    onSubmit(data);
  };

  return (
    <form className="flex flex-col space-y-9 p-7 w-2/3" onSubmit={handleSubmit}>
      {title && (
        <h1 className="flex text-4xl font-bold justify-start">{title}</h1>
      )}
      {fields.map((field, index) => (
        <div key={index} className="space-y-1">
          <label htmlFor={field.name} className="text-lg">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            className="bg-black h-14 border focus:outline-none focus:border-btn rounded-2xl w-full px-6"
            required={field.required}
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-btn h-14 rounded-full text-xl w-full hover:shadow-[0_0_15px_#FF2E43] transition-shadow duration-300"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
