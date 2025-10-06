import React from "react";
import { Button } from "./ui/button";

const type = {
  INPUT: "input",
};

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText

}) {
  function renderInputByComponentType(getControlItem) {
    let element = null;

    const value = formData[getControlItem.name] || "";
    // Destructure the logo property from the control item
    const { logo, ...restProps } = getControlItem; 

    switch (getControlItem.componentType) {
      case type.INPUT:
        element = (
          <div className={`mb-4 flex items-center w-full px-5 py-2.5 rounded-full bg-[#33A5C0] ${logo ? 'gap-3' : ''}`}>
            {logo && <img src={logo} alt="Input Icon" className="w-5 h-5" />}
            
            <input 
              // Keep the aggressive Tailwind classes for focus removal
              className="bg-transparent border-transparent w-full text-white outline-none shadow-none 
                         focus:outline-none focus:ring-0 focus:shadow-none focus:border-transparent"
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
            />
          </div>
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      {/* FINAL ATTEMPT: Using a standard <style> block to inject the high-priority CSS 
        to override browser autofill styles, which cause the white background/line.
      */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          /* This uses a massive, transparent box shadow to cover the native background, effectively hiding it. */
          box-shadow: 0 0 0 1000px #33A5C0 inset !important;
          /* Ensure the text color stays white */
          -webkit-text-fill-color: white !important;
          /* Remove any potential border/outline applied by autofill */
          border: 0 !important;
          outline: 0 !important;
        }
      `}</style>
      <div className="flex flex-col ">
        
        {formControls.map((controlItem) => {
          return (
            <div className="grid w-full " key={controlItem.name}>
              {renderInputByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <Button type="submit" className="mt-3 w-full bg-white text-[#33A5C0] font-semibold hover:bg-gray-200 transition">
        {buttonText || "submit"}
      </Button>


    </form>
  );
}