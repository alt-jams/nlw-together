import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'; 

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { ChangeTheme } from '../components/ChangeTheme';

import { useAuth } from '../Hooks/useAuth';
import { useRoom } from '../Hooks/useRoom';
import { useTheme } from '../Hooks/useTheme';

import logoImg from '../assets/images/logo.svg';
import darkModeLogoImg from '../assets/images/dark-mode-logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    
    const { title, questions } = useRoom(roomId);


    useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, [user, history])

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">,
                    { theme === 'light' ? ( 
                        <img src={logoImg} alt="Let me ask" /> 
                    ) : (
                        <img src={darkModeLogoImg} alt="Let me ask" />    
                    )}
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
                <ChangeTheme></ChangeTheme>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                type = "button"
                                onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>
                        );
                    })}
                </div>

            </main>
        </div>
    )
}