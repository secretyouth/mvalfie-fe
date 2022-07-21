import React, { useEffect, useState } from 'react'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'
import $ from 'jquery'
import marked from 'marked'

export default function HubspotPortalForm({ data = {}, boat_name = '' }) {
    const { loaded, error, formCreated } = useHubspotForm({
        portalId: data.PortalID ? data.PortalID : '',
        formId: data.FormID ? data.FormID : '',
        target: '#my-hubspot-form-boat',
        onFormReady: function ($form, ctx) {
            boat_name = boat_name || ''
            if (boat_name != '') {
                switch (boat_name) {
                    case 'Bruce':
                        $form.find('select[name="location"]').val('Sydney').change()
                        $form.find('select[name="boat_preference"]').val('Bruce').change()
                        break
                    case 'V65 Princess':
                        $form.find('select[name="location"]').val('Whitsundays').change()
                        $form.find('select[name="boat_preference"]').val('V65 Princess').change()
                        break
                    default:
                }
            }
        },
    })

    useEffect(() => {
        window.jQuery = window.jQuery || $
    }, [])

    if (!loaded) return <div />

    return (
        loaded && (
            <section
                id="hubspotForm"
                className="block-container fluid flex-column contact-bg pt-10 pb-10"
                style={{ backgroundImage: data.Background_image ? `url(${data.Background_image.url})` : undefined }}
            >
                <div className="blocks one">
                    <div className="block primary p-5 mw-lg w-100 relative">
                        {data.FormName && <h2 className="accent">{data.FormName}</h2>}
                        {data.Text && <div className="mb-4 markdown" dangerouslySetInnerHTML={{ __html: marked(data.Text) }} />}
                        <div id="my-hubspot-form-boat"></div>
                    </div>
                </div>
            </section>
        )
    )
}
