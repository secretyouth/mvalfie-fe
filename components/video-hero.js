import React, { useEffect } from 'react'
import $ from 'jquery'

export default function VideoHero({ video, videoMobile = null, poster, title, subtitle, name }) {
    useEffect(() => {
        // handler to play/pause video
        $(window).on('scroll', () => {
            // get the height of the window
            const windowHeightTrigger = $(window).height() / 6
            const scrollPos = $(window).scrollTop()
            const video = $('#hero-video')

            if (!video.get(0)) return true

            if (scrollPos > windowHeightTrigger) {
                video.get(0).pause()
                video.next('.blur').addClass('active')
            } else {
                video.get(0).play()
                video.next('.blur').removeClass('active')
            }
        })

        // check if mobile
        let videoSrc = video

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            videoSrc = videoMobile // TODO should be mobile video
        }

        $('#hero-video').attr('src', videoSrc)
        $('#hero-video').get(0).load()
    }, [])
    return (
        <section className="video-hero">
            <div className="video-wrapper">
                <video
                    playsInline
                    autoPlay
                    muted
                    loop
                    poster={poster}
                    className="video"
                    src={video}
                    id="hero-video"
                />
                <div className="blur" />
                <div className="video-overlay text-center pb-3">
                    { title && <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-1s">{title}</h2> }
                    { subtitle && <p className="h3 text-light animate__animated animate__fadeIn animate__delay-2s">{subtitle}</p> }
                    <div className="text-center animate__animated animate__bounce animate__repeat-2 animate__delay-1s">
                        <i className="text-light budicon-arrow-up-down xs" />
                        <p className="text-light">
                            <small>Discover {name}</small>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
