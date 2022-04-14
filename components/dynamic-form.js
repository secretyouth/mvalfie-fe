import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import marked from 'marked'

import Loader from './loader'
import api from '../helpers/api'

// <<<<<<< HEAD
// export default function DynamicForm({ data = {}, overlay = false, showForm = true, closeForm, user }) {
//     console.log('dynamicForm', data);
// =======
export default function DynamicForm({ data = {}, overlay = false, showForm = true, closeForm, user, hubspotHide = false}) {
// >>>>>>> master
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
        animate__fadeIn: showForm,
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

            let subject = data.Email_subject || 'Contact Form'

            // if not general, grab details from the logged in user.
            if (user) subject = '[Owner] Contact Form - mvalfieandco.com.au'


            const formItems = Object.keys(form).map((key, index) => ({
                title: key,
                content: form[key]
            }))

            const email = form.email || form.emailaddress || 'noreply@mvalfieandco.com.au'

            const emailer = {
                to: data.Form_email || 'info@mvalfieandco.com.au',
                replyTo: email.toLowerCase(),
                templateId: 'd-69030c6ffc584ee99afe183ac4db7dbe',
                subject,
                dynamicTemplateData: {
                    subject,
                    formItems
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
            showLoader(false)
            showError(true)
        }
    }

    return (
        <div className={formClass}>
            <form className="mt-3 mw-lg w-100 text-light" onSubmit={sendForm}>
                {hubspotHide && <input type="hidden" name="mastercard" id="mastercard" />}
                {overlay && <i className="budicon-cross-ui icon-btn close lg" onClick={animateFormClose} />}
                <h2 className="">{data.Title}</h2>
                {data.Text && <div className="mb-4 markdown" dangerouslySetInnerHTML={{ __html: marked(data.Text) }} />}

                {loader && <Loader full light lg />}
                {success ? (
                    data.Success_text ? <div className="markdown success-text" dangerouslySetInnerHTML={{ __html: marked(data.Success_text) }} /> : <p className="success-text">Thank you, your message was sent!</p>
                ) : (
                    <>
                        {data.Form_item && data.Form_item.map((item, index) => {
                            const itemName = item.Label.toLowerCase().replace(' ', '')
                            switch (item.Type) {
                                case 'Select': {
                                    const options = item.Options.split('|')
                                    return (
                                        <div className="form-item" key={index}>
                                            <label>
                                                {item.Label} {item.Required && <span>*</span>}
                                            </label>
                                            <div className="dropdown">
                                                <select name={itemName} required={item.Required} onChange={(event) => setForm({ ...form, [item.Label]: event.target.value })}>
                                                    <option value="">Please select...</option>
                                                    {options && options.map((option, index) =>
                                                        <option key={index} value={option}>{option}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                                case 'Textarea': {
                                    return (
                                        <div className="form-item" key={index}>
                                            <label>{item.Label} {item.Required && <span>*</span>}</label>
                                            <textarea name={itemName} rows="10" onChange={(event) => setForm({ ...form, [item.Label]: event.target.value })} />
                                        </div>
                                    )
                                }
                                case 'Email': {
                                    return (
                                        <div className="form-item" key={index}>
                                            <label>{item.Label} {item.Required && <span>*</span>}</label>
                                            <input
                                                type="email"
                                                name={itemName}
                                                required={item.Required}
                                                autoComplete="nope"
                                                onChange={(event) => setForm({ ...form, [item.Label]: event.target.value })}
                                            />
                                        </div>
                                    )
                                }
                                case 'Date': {
                                    return (
                                        <div className="form-item" key={index}>
                                            <label>{item.Label} {item.Required && <span>*</span>}</label>
                                            <input
                                                type="date"
                                                name={itemName}
                                                required={item.Required}
                                                autoComplete="nope"
                                                onChange={(event) => setForm({ ...form, [item.Label]: event.target.value })}
                                            />
                                        </div>
                                    )
                                }
                                default: {
                                    return (
                                        <div className="form-item" key={index}>
                                            <label>{item.Label} {item.Required && <span>*</span>}</label>
                                            <input
                                                name={itemName}
                                                required={item.Required}
                                                autoComplete="nope"
                                                onChange={(event) => setForm({ ...form, [item.Label]: event.target.value })}
                                            />
                                        </div>
                                    )
                                }
                            }
                        })}

                        <div className="flex justify-content-between align-items-center mt-4">
                            <button className="btn secondary">{data.Button_label || 'Submit'}</button>
                            {/* <span>{data.SecondaryText}</span><a href="javascript:void(0)">click here</a> */}
                        </div>
                        {error && <p className="error mt-2 mb-0">There was an error submitting the form, please try again.</p>}
                    </>
                )}
            </form>
        </div>
    )
}
