import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from "../components/Button";
import { useAuth } from '../Hooks/useAuth';
import { useTheme } from '../Hooks/useTheme';
import { database } from '../services/firebase';
import { ChangeTheme } from '../components/ChangeTheme';

import illustrationImg from "../assets/images/illustration.svg";
import darkModeLogoImg from "../assets/images/dark-mode-logo.svg";
import logoImg from "../assets/images/logo.svg";

import '../styles/pages/auth.scss';

export function NewRoom(){
    const { user } = useAuth();
    const { theme } = useTheme();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return(
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <ChangeTheme></ChangeTheme>
                    { theme === 'light' ? ( 
                        <img src={logoImg} alt="Let me ask" /> 
                    ) : (
                        <img src={darkModeLogoImg} alt="Let me ask" />    
                    )}
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}/>
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui!</Link></p>
                </div>
            </main>
        </div>
    )
}