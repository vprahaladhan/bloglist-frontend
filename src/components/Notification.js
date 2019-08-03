import React from 'react'

const Notification = ({message, msgColor}) => {
    const messageStyle = {
        color: msgColor,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    // messageStyle.color = msgColor

    return <div style={messageStyle}>{message}</div>
}

export default Notification