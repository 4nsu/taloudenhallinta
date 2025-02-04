import styles from './Settings.module.scss'
import Button from '../../shared/buttons'

function Settings(props) {

    const handleTypeSubmit = (event) => {
        event.preventDefault()
        const newtype = event.target.elements.type.value
        props.onTypeSubmit(newtype)
        event.target.elements.type.value = ''
    }

    return(
        <div className={styles.settings}>
            <h2>Asetukset</h2>
            <h3>Kulutyypit</h3>
            <div className={styles.settings_types}>
                { props.typelist.map(
                    type => <div key={type}>{type}</div>
                )}
            </div>
            <form onSubmit={handleTypeSubmit}>
                <div className={styles.settings_form}>
                    <input type='text' name='type' />
                    <Button type='submit' primary>Lisää</Button>
                </div>
            </form>
        </div>
    )
}

export default Settings