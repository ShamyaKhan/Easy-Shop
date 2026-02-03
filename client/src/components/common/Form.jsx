import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function Form({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isButtonDisabled,
}) {
  function renderInputsByComponentType(item) {
    let element = null;
    const value = formData[item.name] || "";

    switch (item.componentType) {
      case "input":
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [item.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.label} />
            </SelectTrigger>
            <SelectContent>
              {item.options && item.options.length > 0
                ? item.options.map((i) => (
                    <SelectItem key={i.id} value={i.id}>
                      {i.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={item.name}
            placeholder={item.placeholder}
            id={item.id}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: e.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: e.target.value,
              })
            }
          />
        );
    }
    return element;
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div key={item.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{item.label}</Label>
            {renderInputsByComponentType(item)}
          </div>
        ))}
      </div>
      <Button
        className={"mt-2 w-full"}
        type="submit"
        disabled={isButtonDisabled}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default Form;
