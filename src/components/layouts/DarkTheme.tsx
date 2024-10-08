import { useEffect, useState } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";


function DarkTheme() {
    const [theme, setTheme] = useState(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }
        return "light";
    });

    useEffect(() => {
        console.log("Current theme:", theme);
        if (theme === "dark") {
            document.querySelector('html')?.classList.add('dark');
        } else {
            document.querySelector('html')?.classList.remove('dark');
        }
    }, [theme]);

    const handleChangeTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className="flex items-center px-5 py-1 rounded-2xl">
            <button
                className="bg-slate-100 p-3 rounded-full hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 flex items-center"
                onClick={handleChangeTheme}
            >
                {theme === "light" ? (
                    <LuSun className="text-2xl text-slate-500"/>
                ) : (
                    <LuMoonStar className="text-2xl"/>

                )}
            </button>
        </div>
    );
}

export default DarkTheme;
