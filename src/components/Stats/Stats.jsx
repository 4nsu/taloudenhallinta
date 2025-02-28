import styles from './Stats.module.scss'
import { Cell } from 'recharts'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LabelList, Legend, Pie, PieChart } from 'recharts'
import randomColor from 'randomcolor'
import { useLoaderData } from 'react-router-dom'

function Stats() {

    const locale = "fi-FI"
    const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })
    const rawData = useLoaderData()

    // Yhdistetään mahdollisesti samalle päivälle osuvat maksut,
    // jotta kaavion piirtyy yhdelle päivälle aina yksi datapiste.
    const groupedData = rawData.reduce(
        (result, item) => {
            const date = item.paymentDate

            if (result[date]) {
                result[date].amount += item.amount
            } else {
                result[date] = { date, amount: item.amount }
            }

            return result
        }, {}
    )

    // Muodostetaan linedata yhdistetyistä maksuista.
    const linedata = Object.values(groupedData).map(
        (item) => ({
            date: new Date(item.date).getTime(),
            amount: item.amount
        })
    )

    const reducer = (resultData, item) => {
        // Löytyykö kulutyyppi taulukosta.
        const index = resultData.findIndex(arrayItem => arrayItem.type === item.type)
        if (index >= 0) {
            // Kulutyyppi löytyy, kasvatetaan kokonaissummaa.
            resultData[index].amount += item.amount
        } else {
            // Jos kulutyyppiä ei löydy, se lisätään
            resultData.push({type: item.type, amount: item.amount})
        }

        return resultData
    }

    const piedata = rawData.reduce(reducer, [])
    const piecolors = randomColor({ count: piedata.length,
                                    seed: 'siemenluku',
                                    luminosity: 'dark' })

    return(
        <div className={styles.stats}>
            <h2>Tilastot</h2>
            <h3>Kulut aikajanalla</h3>
            <ResponsiveContainer height={350}>
                <LineChart data={linedata}>
                    <Line dataKey='amount' />
                    <XAxis  type='number'
                            dataKey='date'
                            domain={['dataMin','dataMax']}
                            tickFormatter={
                                value => new Date(value).toLocaleDateString(locale)
                            } />
                    <YAxis />
                    <Tooltip labelFormatter={
                                value => new Date(value).toLocaleDateString(locale)
                             }
                             formatter={
                                value => [numberFormat.format(value), "maksettu"]
                             } />
                </LineChart>
            </ResponsiveContainer>
            <h3>Kulut kulutyypeittäin</h3>
            <ResponsiveContainer height={350}>
                <PieChart>
                    <Pie data={piedata} dataKey='amount' nameKey='type'>
                        { piecolors.map( color => <Cell fill={color} key={color} /> ) }
                        <LabelList  dataKey='amount'
                                    position='inside'
                                    fill='#fff'
                                    formatter={
                                        value => numberFormat.format(value)
                                    } />
                    </Pie>
                    <Legend />
                    <Tooltip formatter={ value => numberFormat.format(value) } />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Stats