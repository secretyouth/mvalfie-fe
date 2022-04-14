import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import marked from 'marked'

import Loader from './loader'
import api, { getUser } from '../helpers/api'

const capitalize = (s) => {
    s[0].toUpperCase() + s.slice(1)
}

export default function Contact({ data = {}, overlay = false, showForm = true, general = false, closeForm, user }) {
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
            let subject = 'Booking Request - mvalfie.com.au'

            // if not general, grab details from the logged in user.
            if (user) subject = '[Owner] Booking Request - mvalfie.com.au'

            if (data.Email_subject) subject = data.Email_subject

            const emailer = {
                to: data.Form_email || 'info@mvalfieandco.com.au',
                replyTo: form.email.toLowerCase(),
                templateId: 'd-d8710e8c222e49a9a9484bc26ebf5ad3',
                subject,
                dynamicTemplateData: {
                    subject,
                    firstname: form.firstname,
                    boat: 'ALFIE',
                    name: `${form.firstname} ${form.lastname}`,
                    email: form.email.toLowerCase(),
                    phone: form.phone,
                    date: form.date,
                    duration: form.duration,
                    other: form.other,
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
                            <label>
                                Booking date <span>*</span>
                            </label>
                            <input
                                name="date"
                                type="date"
                                required
                                autoComplete="nope"
                                onChange={(event) => setForm({ ...form, date: event.target.value })}
                            />
                        </div>
                        <div className="form-item">
                            <label>
                                Duration <span>*</span>
                            </label>
                            <div className="dropdown">
                                <select name="duration" required onChange={(event) => setForm({ ...form, duration: event.target.value })}>
                                    <option value="">Please select...</option>
                                    {/* { data.Durations && data.durations.map((duration) =>
                                        <option value={duration}>{duration}</option>
                                    )} */}
                                </select>
                            </div>
                        </div>
                        <div className="form-item">
                            <label>Other information</label>
                            <textarea name="other" rows="10" onChange={(event) => setForm({ ...form, other: event.target.value })} />
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
