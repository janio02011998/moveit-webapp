import { createContext, ReactNode, useState } from 'react';
import challegens from '../../challenges.json';

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
    resetChallenge: () => void;
    levelUp: () => void;
    startNewChallenge: () => void;
}

interface ChallegensProviderProps {
    children: ReactNode;
}

export function ChallegensProvider({ children }: ChallegensProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChanllengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challegens.length);
        const challegen = challegens[randomChallengeIndex];

        setActiveChallenge(challegen)
    }

    function resetChallenge() {
        setActiveChallenge(null);
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
                resetChallenge
            }}>
            {children}
        </ChallegensContext.Provider>
    )

}