
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Content from './components/Content';
import RulesCharacters from './components/RulesCharacters';
import Footer from './components/Footer';



function App() {
  
  return (
    <div>
      <main>
        <Navigation />
        <Switch>
          <Route path="/" render={() => <Content />} exact />
          <Route path="/RulesCharacters" render={() => <RulesCharacters />} />
        </Switch>
        <Footer/>
        </main>
    </div>
   

  );
}

export default App;
