import { useContext } from 'react';
import { ChallegensContext } from '../contexts/ChallegensContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallegensContext);
    const { resetCountdown  } = useContext(CountdownContext);
    
    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }   
    
    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.containerChallengeBox}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Icone padrão" />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeSucceedButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                            </button>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                            </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando desafios.
                </p>
                    </div>
                )}
        </div>
    );
}