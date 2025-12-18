import { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    variant: 'default',
    onConfirm: null
  });

  const showAlert = ({ title, message, type = 'info', variant = 'default', onConfirm }) => {
    setAlert({
      isOpen: true,
      title,
      message,
      type,
      variant,
      onConfirm
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const showSuccess = (message, title = 'Success') => {
    showAlert({ title, message, type: 'info', variant: 'success' });
  };

  const showError = (message, title = 'Error') => {
    showAlert({ title, message, type: 'info', variant: 'error' });
  };

  const showWarning = (message, title = 'Warning') => {
    showAlert({ title, message, type: 'info', variant: 'warning' });
  };

  const showInfo = (message, title = 'Information') => {
    showAlert({ title, message, type: 'info', variant: 'info' });
  };

  const showConfirm = (message, onConfirm, title = 'Confirm') => {
    showAlert({ title, message, type: 'confirm', variant: 'default', onConfirm });
  };

  return {
    alert,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  };
};