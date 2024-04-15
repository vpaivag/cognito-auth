import { useContext } from "react";
import { CognitoContext } from "../contexts/CognitoProvider";

export const useCognito = () => useContext(CognitoContext);