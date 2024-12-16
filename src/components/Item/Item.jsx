import styles from './Item.module.scss'
import { MdNavigateNext } from 'react-icons/md'
 
function Item() {

  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>Sähkö</div>
        <div className={styles.item_amount}>437,50 €</div>
        <div className={styles.item_date}>20.3.2023</div>
        <div className={styles.item_timespan}>1.12.2022 - 28.2.2023</div>
        <div className={styles.item_receiver}>Caruna Oy</div>
        <div className={styles.item_average}>145,83 €/kk</div>
      </div>
      <div className={styles.item_edit}>
        <MdNavigateNext />
      </div>
    </div>
  )
}

export default Item