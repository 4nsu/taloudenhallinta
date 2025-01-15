import styles from "./Buttons.module.scss"

function Button(props) {
    return (
        <button type='button' className={styles.button} {...props} />
    )
}

export { Button as default, Button }