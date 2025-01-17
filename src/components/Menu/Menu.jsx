import styles from './Menu.module.scss'
import { MdViewList, MdTimeline, MdSettings } from "react-icons/md"
import { NavLink } from 'react-router-dom'

function Menu() {

    return (
        <div className={styles.menu}>
            <div><NavLink to=""><MdViewList /></NavLink></div>
            <div><NavLink to="/stats"><MdTimeline /></NavLink></div>
            <div><NavLink to="/settings"><MdSettings /></NavLink></div>
        </div>
    )

}

export default Menu