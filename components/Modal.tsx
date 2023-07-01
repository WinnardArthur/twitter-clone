import React, { useCallback } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: String;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: String;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  // Close modal
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
  }, [disabled, onClose]);

  // Submit function
  const handleSubmit = useCallback(() => {
    if (disabled) return;
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return <div>Modal</div>;
};

export default Modal;
