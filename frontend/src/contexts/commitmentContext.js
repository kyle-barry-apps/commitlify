import { createContext, useState } from "react";

export const CommitmentContext = createContext();

export const CommitmentProvider = ({ children }) => {
  const [activeCommitment, setActiveCommitment] = useState();

  return (
    <CommitmentContext.Provider
      value={{ activeCommitment, setActiveCommitment }}
    >
      {children}
    </CommitmentContext.Provider>
  );
};
