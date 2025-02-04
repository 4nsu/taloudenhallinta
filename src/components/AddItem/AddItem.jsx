import styles from './AddItem.module.scss'
import ItemForm from '../ItemForm'

function AddItem(props) {
    return (
        <div className={styles.additem}>
            <h2>Uuden merkinnän lisääminen</h2>
            <ItemForm onItemSubmit={props.onItemSubmit}
                      typelist={props.typelist} />
        </div>
    )
}

export default AddItem