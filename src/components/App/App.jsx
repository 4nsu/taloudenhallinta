import styles from './App.module.scss'
import { FloatingButton } from '../../shared/buttons'
import Content from '../Content'
import Header from '../Header'
import Item from '../Item'
import Menu from '../Menu'

function App() {

    return (
        <>
            <div className={styles.app}>
                <Header />
                <Content>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <FloatingButton secondary>+</FloatingButton>
                </Content>
                <Menu />
            </div>
        </>
    )
}

export default App
