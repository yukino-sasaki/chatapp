// Room.js
import React, { useEffect, useState, useContext } from 'react'
import firebase from '../config/firebase'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../AuthService'
import styled from 'styled-components'



const Room = () => {
    const [messages, setMessages] = useState(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        firebase.firestore().collection('message')
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map(doc => {
                    return doc.data()
                })

                setMessages(messages)
                console.log(messages)
            })
    }, [])

    const user = useContext(AuthContext)

    const Img = styled.img`
        
        border-radius: 50%;
        height: 50px;
    `
    const Li = styled.li`
    list-style: none;
    height: 50px;
    diplay: flex;
        `

    const Span = styled.span`
    line-height: 50px;
    text-align: center;
    `

    console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.firestore().collection('message').add({
            content: value,
            user: user.displayName,
            url: user.photoURL
        })
    }

    if ({ user }) {
        <Redirect to="/" />
    }
    return (
        <>
            <h1>Room</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {messages?.map((message, i) => {
                        return (<Li key={i}>
                            <Img src={message.url}></Img>
                            <Span>{message.user} : </Span>
                            <Span>{message.content}</Span>
                        </Li>)
                    })}
                </ul>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button

                    type="submit">送信</button>
            </form>
            <button onClick={() => firebase.auth().signOut()}>Logout</button>

        </>
    )
}

export default Room