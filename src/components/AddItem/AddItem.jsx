import styles from './AddItem.module.scss'
import ItemForm from '../ItemForm'

function AddItem(props) {
    return (
        <div>
            <h2>Uuden merkinnän lisääminen</h2>
            <ItemForm />
        </div>
    )
}

export default AddItem