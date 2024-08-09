'use client'

import { useTheme } from "next-themes"
import { useState, useEffect } from 'react'
import { Switch } from "../ui/switch"
import { Moon, Sun } from 'lucide-react'

export default function ThemeSwitcher() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setMounted(true)
        setSwitchState()
    }, [theme])

    function setSwitchState() {
        switch (theme) {
            case "dark": return setChecked(true)
            case "light": return setChecked(false)
            case "system": return setChecked(false)
        }
    }

    if (!mounted) {
        return null
    }

    return (
        <div className="flex items-center group">
            <div className="relative flex mr-3">
                <Sun className="absolute transition-all duration-500 ease-in-out group-hover:text-yellow-400 dark:opacity-0 dark:rotate-0 dark:scale-0 group-hover:rotate-180 group-hover:scale-110" size={14} />
                <Moon className="transition-all duration-500 ease-in-out group-hover:text-blue-400 opacity-0 rotate-90 scale-0 dark:opacity-100 dark:rotate-0 dark:scale-100 group-hover:rotate-180 group-hover:scale-110" size={14} />
            </div>
            <Switch
                className="scale-75"
                checked={checked}
                onCheckedChange={(e) => {
                    setChecked((prev) => !prev)
                    setTheme(e ? "dark" : "light")
                }}
            />
        </div>
    )
}