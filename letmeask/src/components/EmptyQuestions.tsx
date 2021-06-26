import emptyImg from '../assets/images/empty-questions.svg';

import '../styles/components/emptyQuestions.scss';

export function EmptyQuestions() {
    return (
        <div className="empty-questions">
            <img src={emptyImg} alt="Nenhuma pergunta" />
            <h2>Nenhuma pergunta por aqui...</h2>
            <p>Envie o código desta sala para seus amigos e <br /> comece a responder as perguntas!</p>
        </div>
    )
}