import styles from './ItemForm.module.scss'
import Button from '../../shared/buttons'
import useForm from '../../shared/useform'
import { useNavigate } from 'react-router-dom'

function ItemForm(props) {

    const navigate = useNavigate()

    const submit = () => {
        let storedValues = Object.assign({}, values)
        storedValues.amount = parseFloat(storedValues.amount)
        storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID()
        props.onItemSubmit(storedValues)
        navigate(-1)
    }

    const initialState = props.formData ? props.formData : {
        type: "",
        amount: 0,
        paymentDate: "",
        periodStart: "",
        periodEnd: "",
        receiver: ""
    }

    const { values, handleChange, handleSubmit } = useForm(submit, initialState, false)

    const handleCancel = () => {
        navigate(-1)
    }

    const handleDelete = () => {
        props.onItemDelete(values.id)
        navigate(-1)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.itemform}>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor="type">Kulutyyppi</label>
                            <select id="type" name="type" onChange={handleChange} value={values.type}>
                                <option value="">(valitse)</option>
                                { props.typelist.map(
                                    type => <option key={type}>{type}</option>
                                ) }
                            </select>
                        </div>
                    </div>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor="amount">Summa</label>
                            <input id="amount" type="number" name="amount" step="0.01" onChange={handleChange} value={values.amount} />
                        </div>
                        <div>
                            <label htmlFor="paymentDate">Maksupäivä</label>
                            <input id="paymentDate" type="date" name="paymentDate" onChange={handleChange} value={values.paymentDate} />
                        </div>
                    </div>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor="periodStart">Laskutuskauden alku</label>
                            <input id="periodStart" type="date" name="periodStart" onChange={handleChange} value={values.periodStart} />
                        </div>
                        <div>
                            <label htmlFor="periodEnd">Laskutuskauden loppu</label>
                            <input id="periodEnd" type="date" name="periodEnd" onChange={handleChange} value={values.periodEnd} />
                        </div>
                    </div>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor="receiver">Saaja</label>
                            <input id="receiver" type="text" name="receiver" onChange={handleChange} value={values.receiver} />
                        </div>
                    </div>
                    <div className={styles.itemform_row}>
                        <div>
                            <Button onClick={handleCancel}>PERUUTA</Button>
                        </div>
                        <div>
                            <Button primary
                                disabled={
                                    values.type &&
                                        values.amount &&
                                        values.paymentDate &&
                                        values.receiver ? "" : "disabled"
                                }
                                type='submit'>
                                {props.formData ? "TALLENNA" : "LISÄÄ"}
                            </Button>
                        </div>
                    </div>
                    {props.onItemDelete ?
                        <div className={styles.itemform_row}>
                            <div>
                                <Button secondary onClick={handleDelete}>POISTA</Button>
                            </div>
                            <div></div>
                        </div>
                        : null
                    }
                </div>
            </form>
        </div>
    )

}

export default ItemForm