import { useEffect, useState } from "react";

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
        <div className="flex rounded-2xl justify-center items-center dark:bg-slate-900">
            <button
                className="bg-slate-100 px-2 py-2 rounded-2xl hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                onClick={handleChangeTheme}>
                Theme
            </button>
        </div>
    );
}

export default DarkTheme;
