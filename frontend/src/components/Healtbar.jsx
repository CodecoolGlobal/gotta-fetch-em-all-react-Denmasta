import React from 'react'

export default function Healtbar({healt, currentHealt}){
    

    return (
        <div className='healtbar-container'>
            <div className='hp-bar' style={{width:`${(currentHealt/healt)*100}%`}}>
            </div>
            <span className='healtbar-text'>{healt}/{currentHealt === undefined ? healt : currentHealt}</span>
        </div>
    )
}