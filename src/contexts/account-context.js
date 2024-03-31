import { createContext } from 'react';

export const AccountContext = createContext({
  addAccount: (account) => {},
  deleteAccountAt: (id) => {},
  editAccountAt: (id, account) => {},
  cancelAddAccount: () => {},
});
