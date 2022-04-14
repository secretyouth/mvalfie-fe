import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import marked from 'marked'

import Loader from './loader'
import api, { getUser } from '../helpers/api'

const capitalize = (s) => {
    s[0].toUpperCase() + s.slice(1)
}

export default function SimpleContact({ data = {}, overlay = false, showForm = true, general = false, closeForm, user }) {
    const [form, setForm] = useState({})
    const [loader, showLoader] = useState(false)
    const [success, showSuccess] = useState(false)
    const [error, showError] = useState(false)
    const [close, closeAnimation] = useState(false)

    useEffect(() => {
        if (user) {
            setForm({ ...form, firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone })
        }
    }, [])

    const formClass = classNames({
        contact: true,
        hide: !showForm,
        'mt-3': true,
        overlay,
        animate__animated: true,
        animate__fadeIn: showForm && !close,
        animate__fadeOut: close,
    })

    const animateFormClose = () => {
        closeAnimation(true)
        setTimeout(() => {
            closeForm()
            closeAnimation(false)
        }, 750)
    }

    const sendForm = async (e) => {
        try {
            e.preventDefault()
            showError(false)
            showLoader(true)
            let subject = 'Contact Form - mvalfieandco.com.au'

            // if not general, grab details from the logged in user.
            if (user) subject = '[Owner] Contact Form - mvalfieandco.com.au'

            if (data.Email_subject) subject = data.Email_subject

            const emailer = {
                to: data.Form_email || 'info@mvalfieandco.com.au',
                replyTo: form.email.toLowerCase(),
                templateId: 'd-69030c6ffc584ee99afe183ac4db7dbe',
                subject,
                dynamicTemplateData: {
                    subject,
                    firstname: form.firstname,
                    name: `${form.firstname} ${form.lastname}`,
                    email: form.email.toLowerCase(),
                    phone: form.phone,
                    message: form.message,
                },
            }
            await api.post('email', emailer)

            fbq('track', 'Purchase', {
                value: 0.0,
                currency: 'AUD',
            })
            gtag('event', 'conversion', { send_to: 'AW-482978301/lE_RCISd8ugBEP3TpuYB' })

            setTimeout(() => {
                showSuccess(true)
                showLoader(false)
                showError(false)
            }, 500)
        } catch (err) {
            console.log('====================================')
            console.log(err)
            console.log('====================================')
            showLoader(false)
            showError(true)
        }
    }
    return (
        <div className={formClass}>
            <form className="mt-3 mw-lg w-100 text-light" onSubmit={sendForm}>
                {overlay && <i className="budicon-cross-ui icon-btn close lg" onClick={animateFormClose} />}
                <h2 className="">{data.Title}</h2>
                {data.Text && <div className="mb-4 markdown" dangerouslySetInnerHTML={{ __html: marked(data.Text) }} />}

                {loader && <Loader full light lg />}
                {success ? (
                    <div className="markdown success-text" dangerouslySetInnerHTML={{ __html: marked(data.Success_text) }} />
                ) : (
                    <>
                        {general && (
                            <>
                                <div className="form-item">
                                    <label>
                                        First name <span>*</span>
                                    </label>
                                    <input
                                        name="firstname"
                                        required
                                        autoComplete="nope"
                                        onChange={(event) => setForm({ ...form, firstname: event.target.value })}
                                    />
                                </div>
                                <div className="form-item">
                                    <label>
                                        Last name<span>*</span>
                                    </label>
                                    <input
                                        name="lastname"
                                        required
                                        autoComplete="nope"
                                        onChange={(event) => setForm({ ...form, lastname: event.target.value })}
                                    />
                                </div>
                                <div className="form-item">
                                    <label>
                                        Email address<span>*</span>
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="nope"
                                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                                    />
                                </div>
                                <div className="form-item">
                                    <label>Contact number</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        autoComplete="nope"
                                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-item">
                            <label>Message</label>
                            <textarea name="message" rows="10" onChange={(event) => setForm({ ...form, message: event.target.value })} />
                        </div>
                        <div className="flex justify-content-between align-items-center mt-4">
                            <button className="btn secondary">{data.Button_label || 'Submit'}</button>
                        </div>
                        {error && <p className="error mt-2 mb-0">There was an error submitting the form, please try again.</p>}
                    </>
                )}
            </form>
        </div>
    )
}
