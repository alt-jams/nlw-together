import { FaMoon } from "react-icons/fa";
import { useTheme } from "../Hooks/useTheme";

import '../styles/changeTheme.scss';

export function ChangeTheme(){

    const { toggleTheme, theme } = useTheme();

    return( 
        <div>
            <div className={`toggle-bg ${ theme === 'dark' ? 'active' : ''}`}></div> 
            <button className={`toggle ${ theme === 'dark' ? 'active' : ''}`}  onClick={toggleTheme}>
                <FaMoon size={26}/>
            </button>
        </div>        
    ) 
}