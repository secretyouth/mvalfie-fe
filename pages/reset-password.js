import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import st from '../styles/main.module.scss'

import Loader from '../components/loader'
import Nav from '../components/nav'

import api, { storeToken } from '../helpers/api'

export default function Home() {
    const router = useRouter()
    const [form, setForm] = useState({ visible: false })
    const [error, showError] = useState(false)
    const [loader, showLoader] = useState(false)


    const login = async (e) => {
        e.preventDefault()
        showLoader(true)
        showError({ visible: false })
        console.log(router);
        try {
            form.code = router.query.code
            const response = await api.post('auth/reset-password', form)

            // success!
            storeToken(response.data, () => {
                router.push('/dashboard')
                showLoader(false)
            })
        } catch (err) {
            console.log('====================================')
            console.log(err)
            console.log('====================================')
            showLoader(false)
            showError({ visible: true, ...err.response.data })
        }
    }

    return (
        <div className={st.container}>
            <Head>
                {/* <title>Login | {process.env.Title || 'MV Alfie'}</title> */}
                <title>Reset Password | MV Alfie</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
            </Head>

            <Nav />

            {loader && <Loader full light lg />}

            <section className="block-container primary fluid login">
                <div className="blocks">
                    <div className="block image" />
                    <div className="block p-5 text-light flex flex-column align-items-start justify-content-center">
                        <div className="login-form">
                            <h1 className="h2">Reset Password</h1>
                            <form onSubmit={login}>
                                <input type="hidden" name="mastercard" id="mastercard" />
                                <div className="form-item">
                                    <label>
                                        New Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        onChange={(event) => setForm({ ...form, password: event.target.value })}
                                    />
                                </div>
                                <div className="form-item">
                                    <label>
                                        Confirm Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        onChange={(event) => setForm({ ...form, passwordConfirmation: event.target.value })}
                                    />
                                </div>
                                <div className="flex justify-content-between align-items-center mt-4">
                                    <button className="btn secondary">Reset &amp; Login</button>
                                </div>

                                {error.visible && <p className="error mt-2 mb-0">Invalid redirect code or password mismatch.</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
