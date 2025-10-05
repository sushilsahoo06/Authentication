import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const type = {
  INPUT: "input",
  OTP: "otpInput" // New type defined
};

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputByComponentType(getControlItem) {
    let element = null;

    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case type.INPUT:
        element = (
          <Input
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
        );
        break;
      case type.OTP:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            // You can add additional props specific to OTP here, like 'maxLength'
            maxLength={getControlItem.maxLength} 
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break; // Stop execution after rendering OTP input

      default:
        // Fallback for any unknown component type
        element = (
          <Input
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
        );
        break;
    }
    return element;
  }
  
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => { 
          return (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <Label className="mb-1">{controlItem.label}</Label> 
              {renderInputByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <Button className="mt-3 w-full" type="submit">
        {buttonText || "submit"}
      </Button>
    </form>
  );
}