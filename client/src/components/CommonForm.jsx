import React from "react";
import { Button } from "./ui/button";
import { assets } from "@/assets/assets"; 

const type = {
  INPUT: "input",
};

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,

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
              className="bg-transparent outline-none w-full text-white"
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
      <div className="flex flex-col ">
        
        {formControls.map((controlItem) => {
          return (
            <div className="grid w-full " key={controlItem.name}>
              {renderInputByComponentType(controlItem)}
            </div>
          );
        })}
      </div>

    </form>
  );
}