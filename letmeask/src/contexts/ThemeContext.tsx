import { useState, useEffect} from 'react';
import { createContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProps = {
    children: ReactNode;
}

type ThemeContextType = {
    theme: Theme;
    toogleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProps) {

    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        const storagedTheme = localStorage.getItem('theme');

        return (storagedTheme ?? 'light') as Theme;
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);

    function toogleTheme() {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toogleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}