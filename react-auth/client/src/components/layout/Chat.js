import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from "../../context/auth/authContext";
import styled from "styled-components";
import breakpoint, { map } from "styled-components-breakpoint";

const ListContainer = styled.div`
  grid-area: body;
  height: 100%;
`;
const List = styled.ul`
  display: flex;
  height: 100%;
  font-family: "Lato", sans-serif;
  font-size: 1.5rem;
  flex-direction: column;
  background-color: #bdbdbd;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  ::-webkit-scrollbar-thumb {
    background: #ff0000;
  }
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  ${breakpoint("md")`
    font-size: 1.5rem;
    `}
`;

const LeftChat = styled.li`
  display: flex;
  flex-direction: column;
  margin-left: 1.3rem;
  padding-top: 1rem;
  align-self: flex-start;
  max-width: 40%;
  ${breakpoint("md")`
    margin-left: 5rem;
    `}
`;

const LeftName = styled.span`
  color: black;
`;

const LeftMsg = styled.span`
  width: fit-content;
  background-color: yellow;
  word-break: break-all;
  padding: 0.8rem;
  border-radius: 0.5rem;
  margin-top: .3rem;
  color: black;
`;

const LeftTime = styled.span`
  font-size: .8rem;
  margin-top: .5rem;
  margin-left: 0.3rem;
`
const RightChat = styled.li`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-right: 1.3rem;
  padding-top: 1rem;
  align-self: flex-end;
  max-width: 40%;
  ${breakpoint("md")`
    margin-right: 5rem;
    `}
`;

const RightName = styled.span`
  color: black;
`;

const RightMsg = styled.span`
  width: fit-content;
  background-color: #2ce2e6;
  word-break: break-all;
  padding: 0.8rem;
  border-radius: 0.5rem;
  margin-top: 0.3rem;
  color: black;
`;

const RightTime = styled.span`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-right: 0.3rem;
`;

const Chat = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { messages } = props;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <ListContainer>
        <List>
          {messages.map(x =>
            x.name === localStorage.name ? (
              <LeftChat id='leftChat'>
                <LeftName>{x.name}</LeftName>
                <LeftMsg id='leftMsg'>{x.msg}</LeftMsg>
                <LeftTime>{x.time}</LeftTime>
              </LeftChat>
            ) : (
              <RightChat id='rightChat'>
                <RightName>{x.name}</RightName>
                <RightMsg id='rightMsg'>{x.msg}</RightMsg>
                <RightTime>{x.time}</RightTime>
              </RightChat>
            )
          )}
          <div ref={messagesEndRef} />
        </List>

    </ListContainer>
  );
}

export default Chat;
