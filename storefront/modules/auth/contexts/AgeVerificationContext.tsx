import React, { useState, useContext, useMemo, useCallback } from 'react';

type AgeVerificationContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AgeVerificationContext = React.createContext<AgeVerificationContextType>({
  isModalOpen: false,
  openModal: () => null,
  closeModal: () => null,
});

export const useAgeVerificationModal = () => useContext(AgeVerificationContext);

export const AgeVerificationProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const contextValue = useMemo(
    () => ({ isModalOpen, openModal, closeModal }),
    [isModalOpen, openModal, closeModal],
  );

  return (
    <AgeVerificationContext.Provider value={contextValue}>
      {children}
    </AgeVerificationContext.Provider>
  );
};
