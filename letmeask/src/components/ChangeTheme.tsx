import { FaSun } from "react-icons/fa";
import { useTheme } from "../Hooks/useTheme";

import '../styles/changeTheme.scss';

export function ChangeTheme(){

    const { toggleTheme } = useTheme();

    return(      
        <button className= "toggle" onClick={toggleTheme}>
            <FaSun size={28} color="#5965E0"/>
        </button>
    ) 
}