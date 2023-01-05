import React from 'react'

function IDE(){
    return(
        <div>
            <h1 className="explore ide-title">Test Your Code</h1>
            <div className="container-ide">
                <div className="box"></div>
                <div className="frame-box">
                    <iframe src="https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark"
                        className="iframe-style"
                        title="React"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
                    </iframe>
                </div>
                <div className="box"></div>
            </div>
        </div>
    )
}

export default IDE;