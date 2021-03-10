import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import challegens from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

export const ChallegensContext = createContext({} as ChallegensContextData);

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallegensContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    completeChallenge: () => void;
    resetChallenge: () => void;
    levelUp: () => void;
    startNewChallenge: () => void;
    closeUpLevelModal: () => void;
}

interface ChallegensProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export function ChallegensProvider({
    children,
    ...rest
}: ChallegensProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChanllengesCompleted] = useState(rest.challengesCompleted ?? 0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeUpLevelModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challegens.length);
        const challenge = challegens[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChanllengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallegensContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                experienceToNextLevel,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeUpLevelModal
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallegensContext.Provider>
    )

}