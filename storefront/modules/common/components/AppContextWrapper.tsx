import React, { useState, useContext, useMemo } from 'react';

// Next 16 removed publicRuntimeConfig; read a NEXT_PUBLIC_* env var instead.
const disableEmailSupport =
  process.env.NEXT_PUBLIC_DISABLE_EMAIL_PROCESSES === 'true';

type AppContextType = {
  isCartOpen: boolean;
  emailSupportDisabled: boolean;
  toggleCart?: (p: any) => void;
};

export const AppContext = React.createContext<AppContextType>({
  isCartOpen: false,
  emailSupportDisabled: !!disableEmailSupport,
  toggleCart: () => null,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextWrapper = ({ children }) => {
  const [isCartOpen, toggleCart] = useState(false);

  const appContext = useMemo(
    () =>
      ({
        isCartOpen,
        emailSupportDisabled: !!disableEmailSupport,
        toggleCart,
      }) as AppContextType,
    [isCartOpen],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};
