import React from 'react'
import "./style.css"

function ResetButton({handleReset}) {
    return (
        <div onClick={handleReset} className='reset-button'>
            <span>Reset</span>
        </div>
    )
}

export default ResetButton
