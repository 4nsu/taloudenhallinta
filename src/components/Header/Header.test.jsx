import Header from './Header.jsx'
import { render, screen } from "@testing-library/react"

describe('Header', () => {
    test('Komponentti renderöityy tekstillä', () => {
        render(<Header />)

        const header = screen.getByText('Taloudenhallinta')
        expect(header).toBeInTheDocument()
    })
})