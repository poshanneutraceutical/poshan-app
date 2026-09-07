import { useCallback, useState } from "react";

const useModal = (
  initialOpen = false
) => {
  const [isOpen, setIsOpen] =
    useState(initialOpen);

  const [payload, setPayload] =
    useState(null);

  const openModal = useCallback(
    (data = null) => {
      setPayload(data);
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPayload(null);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  return {
    isOpen,
    payload,
    openModal,
    closeModal,
    toggleModal,
    setPayload
  };
};

export default useModal;