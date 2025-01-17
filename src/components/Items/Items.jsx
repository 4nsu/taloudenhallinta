import styles from './Items.module.scss'
import { FloatingButton } from '../../shared/buttons'
import Item from '../Item/Item'
import { useLoaderData } from 'react-router-dom'

function Items() {
    const data = useLoaderData()
    const items = data.map(item => <Item key={item.id} data={item} />)

    return (
        <div className={styles.items}>
            { items }
            <FloatingButton secondary>+</FloatingButton>
        </div>
    )
}

export default Items