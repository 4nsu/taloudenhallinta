import styles from './Item.module.scss'
import { Link } from 'react-router-dom'
import { MdNavigateNext } from 'react-icons/md'

function Item({ data, ...props }) {

    const locale = "fi-FI"
    const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)

    const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })
    const amount = numberFormat.format(data.amount)

    let average 
    let period 
    if (data.periodStart && data.periodEnd) {
        const periodStart = new Date(data.periodStart)
        const periodEnd = new Date(data.periodEnd)
        period = periodStart.toLocaleDateString(locale) + " - " + periodEnd.toLocaleDateString(locale)
        const days = (periodEnd - periodStart) / (24*60*60*1000)
        average = numberFormat.format(data.amount / days * 30)
    }

    return (
        <div className={styles.item}>
            <div className={styles.item_data}>
                <div className={styles.item_type}>{data.type}</div>
                <div className={styles.item_amount}>{amount}</div>
                <div className={styles.item_date}>{paymentDate}</div>
                <div className={styles.item_timespan}>{period}</div>
                <div className={styles.item_receiver}>{data.receiver}</div>
                <div className={styles.item_average}>{ average ? average + "/kk" : "" }</div>
            </div>
            <div className={styles.item_edit}>
                <Link to={"/edit/" + data.id}><MdNavigateNext /></Link>
            </div>
        </div>
    )
}

export default Item