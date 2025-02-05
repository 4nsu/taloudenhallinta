import { useEffect, useState } from "react"

/**
 * Muuntaa muuttujan JSON-merkkijonoksi.
 * @param {any} value - Muutettava arvo.
 * @returns {string} JSON-merkkijono.
 */

const decode = (value) => {
    return JSON.stringify(value)
}

/**
 * Purkaa JSON-merkkijonon takaisin alkuperäiseksi muuttujaksi.
 * @param {string} value - JSON-merkkijono.
 * @returns {any} Palautettu arvo.
 */

const encode = (value) => {
    return JSON.parse(value)
}

/**
 * @typedef  {Array} useLocalStorageArray
 * @property {any} value
 *           localStorageen tallennettu tilamuuttuja, tai oletusarvo.
 * @property {function} setValue
 *           Päivittää localStoragessa olevan tilamuuttujan arvon.
 *           Funktio on useState-hookin palauttama set-funktio.
 * @property {function} resetValue
 *           Palauttaa oletusarvot.
 */

/**
 * React Hook, joka tallentaa ja lukee tilamuuttujan arvon localStoragesta.
 * 
 * @example
 * import useLocalStorage from './uselocalstorage.js'
 * 
 * // Alustetaan tilamuuttuja, joka hakee arvonsa localStoragesta
 * // avaimella 'dataKey'. Oletusarvoksi annetaan tyhjä taulukko.
 * const [data, setData] = useLocalStorage('dataKey',[])
 *
 * // Päivitetään localStoragessa olevaa arvoa.
 * const update = (value) => {
 *   let copy = data.slice()
 *   copy.push(value)
 *   setData(copy)
 * }
 * 
 * // Luetaan localStoragessa oleva arvo.
 * console.log(data)
 * 
 * @param   {string} key
 *          localStorageen tallennettavan arvon avain.
 * @param   {any} defaultState
 *          Oletusarvo, jos avainta ei löydy localStoragesta.
 * @returns {useLocalStorageArray}
 *          localStorageen tallennettu arvo (tai oletusarvo),
 *          sekä tallennuksen funktiot taulukkona.
 * 
 */

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