import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
    return (
        <div className={styles.register__container}>
            <div className={styles.register__tablet}>
                {window.innerWidth > 1200 ? (
                    <img src="/assets/desktop-frame.svg" alt="framedesktop"/>
                ) : (
                    <img src="/assets/tablet-frame.svg" alt="frametablet"/>
                )}

                <h3 className={styles.finance}>Finance App</h3>
                <div className={styles.firstelipse}></div>
                <div className={styles.secondelipse}>
                    <img src="/assets/ellipse.svg" alt="ellipse"/>
                </div>
            </div>
            <div className={styles.register__desktop}>
                <RegisterForm/>
            </div>
        </div>
    );
};

export default RegisterPage;
