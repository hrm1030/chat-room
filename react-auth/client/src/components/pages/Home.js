import React, {  useState, useContext, useEffect, useLayoutEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Chat from '../layout/Chat';
import styled from 'styled-components';
import breakpoint, { map } from "styled-components-breakpoint";

import ReconnectingWebSocket from 'reconnecting-websocket';
import axios from 'axios';

const url = window.location.origin.replace(/^https/, 'wss');
const ws = new ReconnectingWebSocket(url);
// 
console.log(process.env)
const ChatContainer = styled.div`
  flex-direction: column;
  justify-content: space-between;
`;

ChatContainer.displayName = 'ChatContainer'

const Form = styled.form`
  grid-area: footer;
  display: block;
  height: 100%;
  bottom: 0;
  position: sticky;
  background-color: #ffffff;
`;

Form.displayName = 'Form';

const InputWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  display: flex;
  flex: 9;
  font-size: 20px;
  padding: 2rem;
  border: none;
  outline: none;
  border-radius: 0px;
  ${breakpoint("md")`
    padding: 3rem;
    `}
`;

Input.displayName = 'Input'

const Button = styled.button`
  display: flex;
  padding-top: 0.6rem;
  padding-right: 1rem;
  flex: 1;
  justify-content: center;
  font-size: 2.3rem;
  border: none;
  outline: none;
  background-color: white;
  color: #60adf0;
  ${breakpoint("md")`
    `}
`;

Button.displayName = 'Button';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { verifyLocalStorage, user, loading } = authContext;
  const [message, setMessage] = useState({ msg: '' });
  const [messages, setMessages] = useState([]);

  const { msg } = message;

  const onChange = e => setMessage({ [e.target.name] : e.target.value });

  const addChat = (msg, name, time) => {
    setMessages([...messages, {msg, name, time }]);
  }


  const onSubmit = e => {
    if(msg !== '') {
      e.preventDefault(); 
      let today = new Date();
      let time = today.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
      addChat(msg, localStorage.name, time);
      ws.send(JSON.stringify({msg, name: localStorage.name, time}));
    }
    e.preventDefault();
    setMessage({ msg: '' });
  };

  useEffect(() => {
        ws.onopen = () => console.log(JSON.stringify('WS Connected!'));

        ws.onerror = error => {
          console.log(`WebSocket error:`);
          console.log(error);
        };
                
        ws.onmessage = e => {
          const { msg, name, time } = JSON.parse(e.data);
          if (name !== localStorage.name) {
            addChat(msg, name, time);
          }
        };

        ws.onclose = () => {
          console.log("disconnected!");
        };
  })


  return (
    <>
      <ChatContainer>
        <Chat messages={messages} />
      </ChatContainer>
      <Form>
        <InputWrapper>
          <Input
            onChange={onChange}
            value={msg}
            name="msg"
            autoComplete="off"
            id="msgInput"
            placeholder="Type sentences......"
          />
          <Button type="submit" onClick={onSubmit}>
            <i class="far fa-paper-plane"></i>
          </Button>
        </InputWrapper>
      </Form>
    </>
  );
}

export default Home;
