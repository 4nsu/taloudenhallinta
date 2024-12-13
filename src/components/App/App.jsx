import styles from './App.module.scss'
import Header from '../Header'
import Item from '../Item'

function App() {

  return (
    <>
      <div className={styles.app}>
        <Header />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  )
}

export default App
