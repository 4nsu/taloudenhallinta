import styles from './Settings.module.scss'

function Settings(props) {
    return(
        <div className={styles.settings}>
            <h2>Asetukset</h2>
            <h3>Kulutyypit</h3>
            <div className={styles.settings_types}>
                { props.typelist.map(
                    type => <div key={type}>{type}</div>
                )}
            </div>
        </div>
    )
}

export default Settings