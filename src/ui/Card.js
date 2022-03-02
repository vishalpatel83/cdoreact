import React from 'react'
import classes from '../css/Card.module.css'
export const Card = (props) => {
    return (
        <div className={classes.Card}>
            {props.children}
        </div>
    )
}
