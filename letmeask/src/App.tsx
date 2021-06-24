import { BrowserRouter, Route, Switch} from 'react-router-dom';

import { AuthContexProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { NewRoom } from "./pages/NewRoom";
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContexProvider>
          <Switch>
            <Route path="/" exact component= {Home}/> 
            <Route path="/rooms/new" component= {NewRoom}/>
            <Route path="/rooms/:id" component= {Room}/>
            <Route path="/admin/rooms/:id" component={AdminRoom}/>
          </Switch>
        </AuthContexProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
