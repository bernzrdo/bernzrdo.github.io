
export function isDarkMode(){
    return matchMedia('(prefers-color-scheme: dark)').matches
}

export default function getColors(){
    return isDarkMode()

        // Dark Mode
        ? {
            background: '#000',
            grid: '#333'
        }

        // Light Mode
        : {
            background: '#fff',
            grid: '#ccc'
        }
        
}