import { useCallback } from "react";

type UseModalHandlersProps = {
  setIsOpen: (value: boolean) => void;
  setErrors: (errors: {}) => void;
  refetch?: () => void;
};

export const useModalHandlers = ({ setIsOpen, setErrors, refetch }: UseModalHandlersProps) => {

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setErrors({});
    }
  }, [setIsOpen, setErrors]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (refetch) refetch();
    setErrors({});
  }, [setIsOpen, refetch, setErrors]);

  return {
    handleOpenChange,
    handleCancel,
  };
};