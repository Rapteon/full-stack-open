const Notification = ({ message }) => {
    const style = {
        color: 'green',
        backgroundColor: 'lightgray',
        borderColor: 'green',
        borderRadius: '5px',
        borderWidth: '2px',
        padding: '10px',
        borderStyle: 'solid'
    }
    if (message === null) {
        return null
    }
    else {
        return (
            <div style={style}>
                <b>{message}</b>
            </div>
        )
    }
}

export default Notification