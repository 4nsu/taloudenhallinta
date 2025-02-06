import Item from '../components/Item'
import { MemoryRouter } from 'react-router-dom'

/**
 * Yksittäinen kulutietue, joista etusivun kululista koostuu.
 */
export default {
    title: 'Components/Item',
    component: Item,
    tags: ['autodocs'],
    decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
    argTypes: {
        data: { control: 'object',
                description: 'Komponentille annettava data. Pakollisia tietoja: id, type, amount, paymentDate, receiver.',
        },
    },
}

export const Default = {
    args: {
        data: {
            id:             "1",
            type:           "Sähkö",
            amount:         437.50,
            paymentDate:    "2023-03-20",
            periodStart:    "2022-12-01",
            periodEnd:      "2023-02-28",
            receiver:       "Caruna Oy"
        }
    }
}

export const OnlyRequiredData = {
    args: {
        data: {
            id:             "2",
            type:           "Puhelin",
            amount:         29.60,
            paymentDate:    "2023-03-28",
            receiver:       "Elisa"
        }
    }
}