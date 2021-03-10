import { useContext } from 'react';
import { ChallegensContext } from '../contexts/ChallegensContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallegensContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/janio02011998.png" alt="autor" />
            <div>
                <strong>Jânio Carvalho</strong>
                <p>
                    <img src="icons/level.svg" alt="Level   " />
                    Level {level}
                </p>
            </div>
        </div>
    );
}