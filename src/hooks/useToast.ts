import { toast, ToastOptions } from 'react-toastify';

const useToast = () => {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const showSuccess = (message: string, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  };

  const showError = (message: string, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  };

  const showInfo = (message: string, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  };

  return { showSuccess, showError, showInfo };
};

export default useToast;