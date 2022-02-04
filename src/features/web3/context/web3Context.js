import { useContext, createContext } from "react";

export const Web3StateContext = createContext();
export const Web3ActionsContext = createContext();

export const useWeb3State = () => useContext(Web3StateContext);
export const useWeb3Actions = () => useContext(Web3ActionsContext);
