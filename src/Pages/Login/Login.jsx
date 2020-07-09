import React from 'react';
import Button from 'react-bootstrap/Button';
import './Login.css';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/actions/auth';
import { Form, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token !== null);

  const handleLogin = () => {
    dispatch(actions.auth(email, password, false));
  };


  const renderLogin = () => {
    return (
      <section
        className="login-section mt-5 bg-light text-center"
        style={{ width: '40rem' }}
      >
        <div className="container p-0">
          <Card>
            <Card.Header>
              <h2>Log in panel</h2>
            </Card.Header>
            <Card.Body>
              <Form>
                <div className="form-group text-left">
                  <label htmlFor="email">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    type="email"
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="password">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    type="password"
                  />
                </div>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button
                onClick={handleLogin}
                className="mb-1 "
                variant="success"
                type="submit"
                size="lg"
              >
                Log In
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </section>
    );
  };

  return (
    <div id="d1">
      {loading ? (
        <Spinner size={5} animation="border" />
      ) : token ? (
        <Redirect to="/stanowiska" />
      ) : (
        renderLogin()
      )}
    </div>
  );
};

export default Login;
