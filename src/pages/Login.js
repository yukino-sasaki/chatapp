// Login.js
import React, { useState, useContext } from 'react'
import { AuthContext } from '../AuthService'
import firebase from '../config/firebase'
import { Redirect } from 'react-router-dom'

const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        console.log("test")
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push("/")
            })
            .catch(err => {
                console.log(err)
            })

    }

    const user = useContext(AuthContext)

    if (user) {
        return <Redirect to="/" />
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        onChange={e => { setEmail(e.target.value) }}
                        id='email'
                        name='email'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={e => { setPassword(e.target.value) }}
                        type='password'
                        id='password'
                        name='password'
                        placeholder='password'
                    />
                </div>
                <button

                    type='submit'>Login</button>
            </form>

        </>
    )
}

export default Login


/* .props..restprops以外の要素を引数として渡す */