import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../Hooks/useAuth';
import { useTheme } from '../Hooks/useTheme';
import { Button } from "../components/Button";

import { database } from '../services/firebase';

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import darkModeLogoImg from "../assets/images/dark-mode-logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { ChangeTheme } from '../components/ChangeTheme';

import '../styles/pages/auth.scss';

export function Home(){

    const history = useHistory();
    const { signInWithGoogle, user } = useAuth();
    const {theme} = useTheme();
    

    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');  
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Essa sala não existe.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('A sala já foi fechada');
            return;
        }

        history.push(`/rooms/${roomCode}`);
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
                    <ChangeTheme />
                    { theme === 'light' ? ( 
                        <img src={logoImg} alt="Let me ask" /> 
                    ) : (
                        <img src={darkModeLogoImg} alt="Let me ask" />    
                    )}

                    
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value = {roomCode}/>
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}