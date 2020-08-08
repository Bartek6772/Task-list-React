import React from 'react';

import "./css/task.css";

const Task = props => {
    return(
        <div className="task">
            <input type="checkbox" name="checked" data-id={props.id} checked={props.checked} onChange={e => props.onCheck(props.id, {[e.target.name]: e.target.checked})} />
            <span className="task__name">{props.name}</span>
            <span className="task__date">
                {props.date}
            </span>
            <div className="task__icons">
                <i className="icon edit" onClick={() => props.onEditInit(props.id)}></i>
                <i className="icon trash" onClick={() => props.onRemove(props.id)}></i>
            </div>
        </div>
        
    )
}

export default Task;