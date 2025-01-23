import AppRouter from "../AppRouter"
import testdata from "./testdata.js"
import { useState } from "react"

function App() {

    const [data, setData] = useState(testdata)

    const handleItemSubmit = (newitem) => {
        let copy = data.slice()

        const index = copy.findIndex(item => item.id === newitem.id)
        if (index >= 0) {
            copy[index] = newitem
        } else {
            copy.push(newitem)
        }
        
        copy.sort( (a,b) => {
            const aDate = new Date(a.paymentDate)
            const bDate = new Date(b.paymentDate)
            return bDate - aDate
        })
        
        setData(copy)
    }

    return (
        <>
            <AppRouter data={data} onItemSubmit={handleItemSubmit} />
        </>
    )
}

export default App
