import { useState } from "react"

const useForm = ( callback, initialState={}, resetOnSubmit=true ) => {

    // Esitellään useState-hooks,
    // johon käyttäjän lomakkeelle syöttämä tieto tallennetaan.
    const [values, setValues] = useState(initialState)

    // Syötekäsittelijä,
    // joka tallentaa kentän tiedot sen nimellä state-muuttujaan.
    const handleChange = (event) => {
        // Tallennetaan kenttään syötetty arvo ja kentän nimi välimuuttujiin.
        const value = event.target.value
        const key = event.target.name
        // Tallennetaan uusi arvo state-muuttujaan.
        // Hakasulkeilla määritetään avain dynaamisesti kentän nimen perusteella.
        setValues(prevValues => ({...prevValues, [key]: value}))
    }

    // Submit-käsittelijä
    const handleSubmit = (event) => {
        // Estää oletustoiminnan.
        if (event) {
            event.preventDefault()
        }
        // Kutsuu määriteltyä callback-funktiota.
        callback()
        // Tarvittaessa kutsuu myös lomaketiedot resetoivaa funktiota.
        if (resetOnSubmit) resetValues()
    }

    // Funktio, joka palauttaa lomakkeen tiedot alkutilanteeseen.
    const resetValues = () => {
        setValues(initialState)
    }

    // Palauttaa olion, joka sisältää käsittelijät ja tilamuuttujan.
    return {
        handleChange,
        handleSubmit,
        resetValues,
        setValues,
        values
    }

}

export default useForm