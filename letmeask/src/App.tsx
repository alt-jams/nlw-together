import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { NewRoom } from "./pages/NewRoom";

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthContexProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContexProvider>
        <Switch>
          <Route path="/" exact component= {Home}/> 
          <Route path="/rooms/new" component= {NewRoom}/>
          <Route path="/rooms/:id" component= {Room}/>
        </Switch>
      </AuthContexProvider>
    </BrowserRouter>
  );
}

export default App;
