import { useContext } from "react";
import { AuthContex } from "../contexts/AuthContext";

export function useAuth() {
    const value = useContext(AuthContex);
    return value;
}