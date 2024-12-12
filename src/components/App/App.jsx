import styles from './App.module.scss'
import Item from '../Item'

function App() {

  return (
    <>
      <div className={styles.app}>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  )
}

export default App
