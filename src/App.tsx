import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import Login, { Button } from './pages/Login';
import ArticleView from './pages/ArticleView';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #929292;
  color: #fff;
  font-weight: bold;
  font-size: 1.4rem;
  box-shadow: 0 1px 5px #444;
  margin-bottom: 50px;

  a {
    color: #fff;
  }
`;

const App: React.FC = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [])

  const handleOnLogout = () => {
    setIsLoggedIn(false);
    ['token', 'tokenData'].forEach(item => localStorage.removeItem(item));
    history.push('/login');
  }

  return (
    <div>
      <Header>
        <div className="container">
          <Link to="/">Articles search</Link>
        </div>
        {isLoggedIn && (
          <Button onClick={handleOnLogout}>Logout</Button>
        )}
      </Header>

      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/articles/:id" component={ArticleView} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
