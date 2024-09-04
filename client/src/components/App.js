import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/*" element={<h1>This page does not exist</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
