import styles from './EditItem.module.scss'
import ItemForm from '../ItemForm'
import { useLoaderData } from 'react-router-dom'

function EditItem(props) {

    const data = useLoaderData()

    return (
        <div className={styles.edititem}>
            <h2>Merkinnän muokkaaminen</h2>
            <ItemForm onItemSubmit={props.onItemSubmit} formData={data.item} />
        </div>
    )
}

export default EditItem