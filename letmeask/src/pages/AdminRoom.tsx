import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'; 
import { FaRegCheckCircle, FaCheckCircle } from 'react-icons/fa';
import { MdChatBubbleOutline, MdChatBubble } from 'react-icons/md';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { ChangeTheme } from '../components/ChangeTheme';

import { useAuth } from '../Hooks/useAuth';
import { useRoom } from '../Hooks/useRoom';
import { useTheme } from '../Hooks/useTheme';

import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import darkModeLogoImg from '../assets/images/dark-mode-logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/pages/room.scss';

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

    async function handleCheckQuestionAsAnswered(questionId: string, isAnswered: boolean) {
        if (isAnswered) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isAnswered: false,
                isHighlighted: false,
            });
        } else {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isAnswered: true,
            });
        }  
    }

    async function handleHighlightQuestion(questionId: string, isHighlighted: boolean, isAnswered: boolean) {
        if (!isAnswered) {
            if (isHighlighted) {
                await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                    isHighlighted: false,
                });
            } else {
                await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                    isHighlighted: true,
                });
            }  
        }      
    }

    return (
        <div id="page-room" className={theme}>
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
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                <button
                                type = "button"
                                onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}>
                                    {question.isAnswered ? (
                                        <FaCheckCircle size={22} color="#835afd"/>
                                    ) : (
                                        <FaRegCheckCircle size={22} color="#777786"/>
                                    )}
                                </button>

                                <button
                                type = "button"
                                onClick={() => handleHighlightQuestion(question.id, question.isHighlighted, question.isAnswered)}>
                                    { question.isHighlighted ? (
                                        <MdChatBubble size={22} color="#835afd" />
                                    ) : (
                                        <MdChatBubbleOutline  size={22} color="#777786"/>
                                    )}    
                                </button>

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