import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import EditItem from './EditItem.jsx'
import { useLoaderData } from "react-router-dom"

describe('EditItem', () => {
    test('Muokkauslomake lähettää muokatut tiedot, kun vaadittavat kentät on täytetty.', async () => {

        // Alustetaan testauskirjaston käyttäjäinteraktiot.
        const user = userEvent.setup()

        // Muodostetaan kulutyypit-lista
        const typelist = ['Auto', 'Sähkö', 'Vakuutus']

        // Lomakkeen tiedot ennen muokkausta.
        const formdata = {
            type: typelist[2],
            amount: 543,
            paymentDate: '2025-01-31',
            receiver: 'Vakuutus Oy'
        }

        // Lomakkeelle muokattavat tiedot.
        const newFormdata = {
            type: typelist[0],
            amount: 743,
            paymentDate: '2025-01-29',
            receiver: 'Autokauppa Oy'
        }

        // Ylikirjoitetaan useLoaderData simuloiduksi funktioksi.
        vi.mock('react-router-dom', async (importOriginal) => {
            const originalModule = await importOriginal()
            return {
                ...originalModule,      // Palautetaan 'react-router-dom' exportit
                useLoaderData: vi.fn()  // Ylikirjoitetaan vain useLoaderData
            }
        })

        // Asetetaan formdata simuloidun useLoaderData-funktion palautusarvoksi.
        useLoaderData.mockReturnValue({ item: formdata })

        // Muodostetaan lomakekäsittelijää simuloiva funktio.
        // Testin kannalta on olennaista nähdä montako kertaa,
        // ja millä arvolla funktiota kutsuttiin.
        const handleItemSubmit = vi.fn(() => true)

        // Renderöidään komponentti.
        render(<EditItem onItemSubmit={handleItemSubmit}
                        typelist={typelist} />, {wrapper: BrowserRouter}
        )

        // Tyhjennetään kulutyyppi ja tarkistetaan:
        // - onko valinta tyhjä
        // - onko tallennusnappi disabloitu
        await user.selectOptions(screen.getByLabelText('Kulutyyppi'), '(valitse)')
        expect(screen.getByRole('option', {name: '(valitse)'}).selected).toBe(true)
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(true)

        // Valitaan uusi kulutyyppi ja tarkistetaan:
        // - onko kentän arvo sama kuin uusi arvo
        // - onko tallennusnappi aktiivinen
        await user.selectOptions(screen.getByLabelText('Kulutyyppi'), newFormdata.type)
        expect(screen.getByRole('option', {name: newFormdata.type}).selected).toBe(true)
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(false)

        // Tyhjennetään summa ja tarkistetaan:
        // - onko kentän arvo tyhjä
        // - onko tallennusnappi disabloitu
        await user.clear(screen.getByLabelText('Summa'))
        expect(screen.getByLabelText('Summa')).toHaveValue(null)
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(true)

        // Syötetään uusi summa ja tarkistetaan:
        // - onko kentän arvo sama kuin uusi arvo
        // - onko tallennusnappi aktiivinen
        await user.type(screen.getByLabelText('Summa'), newFormdata.amount.toString())
        expect(screen.getByLabelText('Summa')).toHaveValue(newFormdata.amount)
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(false)

        // Tyhjennetään maksupäivä ja tarkistetaan:
        // - onko kentän arvo tyhjä
        // - onko tallennusnappi disabloitu
        await user.clear(screen.getByLabelText('Maksupäivä'))
        expect(screen.getByLabelText('Maksupäivä').value).toBeFalsy()
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(true)

        // Syötetään uusi maksupäivä ja tarkistetaan:
        // - onko kentän arvo sama kuin uusi arvo
        // - onko tallennusnappi aktiivinen
        await user.type(screen.getByLabelText('Maksupäivä'), newFormdata.paymentDate)
        expect(screen.getByLabelText('Maksupäivä')).toHaveValue(newFormdata.paymentDate)
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(false)

        // Tyhjennetään saaja ja tarkistetaan:
        // - onko kentän arvo tyhjä
        // - onko tallennusnappi disabloitu
        await user.clear(screen.getByLabelText('Saaja'))
        expect(screen.getByLabelText('Saaja')).toHaveValue('')
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(true)
        
        // Syötetään saaja ja tarkistetaan:
        // - onko kentän arvo sama kuin uusi arvo
        // - onko tallennusnappi aktiivinen
        await user.type(screen.getByLabelText('Saaja'), newFormdata.receiver)
        expect(screen.getByLabelText('Saaja')).toHaveValue(newFormdata.receiver)
        expect(screen.getByRole('button', {name: 'TALLENNA'}).disabled).toBe(false)

        // Painetaan tallennusnappia ja tarkistetaan:
        // - kutsutaanko handleItemSubmit-funktiota vain kerran
        // - sisältääkö funktion parametrinaan saama olio lomakkeen uudet tiedot
        await user.click(screen.getByRole('button', {name: 'TALLENNA'}))
        expect(handleItemSubmit).toHaveBeenCalledTimes(1)
        const submittedItem = handleItemSubmit.mock.lastCall.shift()
        expect(submittedItem).toMatchObject(newFormdata)

    })
})