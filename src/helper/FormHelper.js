import { toast } from "react-toastify";

const EmailRegex = /\S+@\S+\.\S+/;
const MobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
  IsEmpty = (value) => {
    return value.length === 0;
  };

  IsMobile = (value) => {
    return MobileRegex.test(value);
  };

  IsEmail = (value) => {
    return !EmailRegex.test(value);
  };

  ErrorToast = (message) => {
    toast.error(message);
  };

  SuccessToast = (message) => {
    toast.success(message);
  };
}

export const { IsEmpty, IsMobile, IsEmail, ErrorToast, SuccessToast } =
  new FormHelper();
