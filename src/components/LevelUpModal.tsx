import { useContext } from 'react';
import { ChallegensContext } from '../contexts/ChallegensContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {

    const { level, closeUpLevelModal } = useContext(ChallegensContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level!</p>

                <button type="button" onClick={closeUpLevelModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal" />
                </button>
            </div>
        </div>
    )
}