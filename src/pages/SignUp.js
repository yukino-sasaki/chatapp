// SignUp.js
import React, { useState } from 'react'
import firebase from '../config/firebase'


const SignUp = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [icon, setIcon] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(email, password)
            //firebase関係のことを行うオブジェクト。オブジェクトとは値にアクセスできる配列の子と
            .then(({ user }) => {
                const storageRef = firebase.storage().ref();
                const iconRef = storageRef.child(`icon / ${user.uid}`)
                iconRef.put(icon).then(function (snapshot) {

                    iconRef.getDownloadURL().then(function (url) {
                        user.updateProfile({
                            displayName: name,
                            photoURL: url
                        })
                    })
                }).catch((er) => {
                    console.log(er)
                })
            })
            .then(() => {

                console.log("succeed")
            })



        /* .then(() => { history.push("/") }) */


        console.log(email, password)
        /*  firebase.auth().createUserWithEmailAndPassword(email, password)
             .catch(err => {
                 console.log(err)
             }) */

    }


    //... (名前を入力するフォームを追加し、state'name'と紐付けましょう。)
    //handlesubmitとはけっきょくなんなのか.onsubmitが送信ボタンが押されたときに発動するイベントなので通常操作wお打ち消している
    //onchange...フォーム内の内容が変更されたときに起こるイベントの子と

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)//stateで更新されるのはなんとなくわかるのだが、この形でどうして更新されるのかがいまいち良くわからない。関数なわけでもないのに
                        }}
                        name='email'
                        type='email'
                        id='email'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        name='password'
                        type='password'
                        id='password'
                        placeholder='Password'
                    />
                </div>
                <input
                    type="file"
                    onChange={e => setIcon(e.target.files[0])}
                />
                <div>
                    <label htmlFor='name'>name</label>
                    <input
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        type="text"
                        id="text"
                        placeholder="Name"
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp