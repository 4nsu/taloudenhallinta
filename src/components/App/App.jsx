import styles from './App.module.scss'
import { ButtonContainer } from '../../shared/buttons'
import Content from '../Content'
import { FloatingButton } from '../../shared/buttons'
import Header from '../Header'
import Items from '../Items'
import Menu from '../Menu'

function App() {

    return (
        <>
            <ButtonContainer>
                <div className={styles.app}>
                    <Header />
                    <Content>
                        <Items />
                    </Content>
                    <Menu />
                </div>
            </ButtonContainer>
        </>
    )
}

export default App
