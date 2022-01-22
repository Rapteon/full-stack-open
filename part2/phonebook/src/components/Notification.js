const Notification = ({message, isError}) => {
    const style = {
        color: 'green',
        backgroundColor: 'lightgray',
        borderColor: 'green',
        borderRadius: '5px',
        borderWidth: '2px',
        padding: '10px',
        borderStyle: 'solid'
    }
    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgray',
        borderColor: 'red',
        borderRadius: '5px',
        borderWidth: '2px',
        padding: '10px',
        borderStyle: 'solid'
    }
    
    if (message === null) {
        return null
    }
    else {
        if (! isError){
            return (
                <div style={style}>
                    <b>{message}</b>
                </div>
            )
        }
        else {
            return (
                <div style={errorStyle}>
                    <b>{message}</b>
                </div>
            )
        }
    }
}

export default Notification