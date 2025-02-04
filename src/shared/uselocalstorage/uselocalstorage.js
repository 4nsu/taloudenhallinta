import { useEffect, useState } from "react"

// Muuttaa muuttujan JSON-merkkijonoksi
const decode = (value) => {
    return JSON.stringify(value)
}

// Purkaa JSON-merkkijonon muuttujaksi
const encode = (value) => {
    return JSON.parse(value)
}

const useLocalStorage = (key, defaultState) => {

    // Tilamuuttujan määrittely,
    // arvona joko localStorage-muuttuja tai alkuarvo.
    const [value, setValue] = useState(
        encode(localStorage.getItem(key) || null) || defaultState
    )

    // Tallennetaan tilamuuttuja localStorageen aina kun arvo muuttuu.
    useEffect(() => {
        localStorage.setItem(key, decode(value))
    }, [value])

    // Alkuarvojen palautusfunktio
    const resetValue = () => {
        setValue(defaultState)
    }

    return [value, setValue, resetValue]

}

export default useLocalStorage