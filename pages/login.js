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
    const [showForgotPassword, setView] = useState(false)
    const [form, setForm] = useState({ visible: false })
    const [error, showError] = useState(false)
    const [success, showSuccess] = useState(false)
    const [loader, showLoader] = useState(false)

    const login = async (e) => {
        e.preventDefault()
        showLoader(true)
        showError({ visible: false })
        try {
            const response = await api.post('auth/local', form)

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

    const forgotPassword = async (e) => {
        e.preventDefault()
        showLoader(true)
        showError({ visible: false })
        try {
            await api.post('auth/forgot-password', { email: form.identifier })
            showLoader(false)
            showSuccess({ visible: true, content: 'Please check your email for a reset link.' })
        } catch (err) {
            console.log('====================================')
            console.log(err)
            console.log('====================================')
            showLoader(false)
            showError({ visible: true, ...err.response.data })
        }
    }

    const toggleView = () => {
        setView(!showForgotPassword)
        showError({ visible: false })
        showSuccess({ visible: false })
    }

    return (
        <div className={st.container}>
            <Head>
                <title>Login | {process.env.Title || 'MV Alfie'}</title>
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
                            { showForgotPassword ? (
                                <>
                                    <h1 className="h2">Forgot Password?</h1>
                                    {!success.visible ?
                                    <form onSubmit={forgotPassword}>
                                        <input type="hidden" name="mastercard" id="mastercard" />
                                        <div className="form-item">
                                            <label>
                                                Email address <span>*</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="nope"
                                                onChange={(event) => setForm({ ...form, identifier: event.target.value })}
                                            />
                                        </div>
                                        <div className="flex justify-content-between align-items-center mt-4">
                                            <button className="btn secondary">Reset</button>
                                        </div>

                                        {error.visible && <p className="error mt-2 mb-0">Password or email address is incorrect. Please try again.</p>}
                                    </form>
                                    :
                                    <p className="mt-2 mb-0">{success.content}</p>
                                    }
                                </>
                            ) : (
                                <>
                                <h1 className="h2">Owners Login</h1>
                                <form onSubmit={login}>
                                    <input type="hidden" name="mastercard" id="mastercard" />
                                    <div className="form-item">
                                        <label>
                                            Email address <span>*</span>
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="nope"
                                            onChange={(event) => setForm({ ...form, identifier: event.target.value })}
                                        />
                                    </div>
                                    <div className="form-item">
                                        <label>
                                            Password <span>*</span>
                                        </label>
                                        <input
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            onChange={(event) => setForm({ ...form, password: event.target.value })}
                                        />
                                    </div>
                                    <div className="flex justify-content-between align-items-center mt-4">
                                        <button className="btn secondary">Login</button>
                                        {/* <p className="mb-0">
                                            <a href="">Forgot password?</a>
                                        </p> */}

                                        <button type="button" onClick={toggleView}>Forgot password?</button>
                                    </div>

                                    {error.visible && <p className="error mt-2 mb-0">Password or email address is incorrect. Please try again.</p>}
                                </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
