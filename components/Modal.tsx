import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

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

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <div>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
            <div className="flex items-center justify-between p-10 rounded-t">
              <h1 className="text-3xl font-semibold text-white">{title}</h1>
              <button
                className="p-1 ml-auto border-0 hover:opacity-70 transition text-white"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            <div className="relative p-10 flex-auto">{body}</div>
            <div className="flex flex-col p-10 gap-2">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
