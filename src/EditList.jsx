import React from "react";

import "./../node_modules/semantic-ui-css/semantic.css";
import "./css/EditList.css";

const EditList = props => {
    const classes = props.active === true ? "EditList EditList--visible" : "EditList";
    return (
        <div className={classes}>
            <div className="ui input">
                <input type="text"
                    placeholder="Name"
                    name="name"
                    value={props.editedList.name}
                    onChange={e => props.onInputChange({[e.target.name]: e.target.value}, 2)}
                />
            </div>
            <button className="ui button" onClick={() => props.onSave()}>
                Save
            </button>
            <button className="ui button cancel" onClick={() => props.onCancel()}>
                Cancel
            </button>
        </div>
    )
}

export default EditList;