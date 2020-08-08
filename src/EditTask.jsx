import React, { Component } from 'react';


import "./../node_modules/semantic-ui-css/semantic.css";
import "./css/EditTask.css"

import {parseInputAsNumber} from "./utils";

class EditTask extends Component{

    render(){
        const lists = this.props.lists.map(el => {
            return(
                <option key={el.id} value={el.id}>{el.name}</option>
            );
        })
        const EditTaskClass = this.props.active === true ? "EditTask EditTask--visible" : "EditTask";
        
        return(
            <div className={EditTaskClass}>
                <div className="EditTask__header">
                    <i className="icon arrow left" onClick={() => this.props.onCancel()}></i>
                    <span>
                        {this.props.editedTask.name === "" ? "Add task" : "Edit task"}
                    </span>
                </div>
                <div className="EditTask__content">
                    <div className="ui input">
                        <input type="text"
                            placeholder="Name"
                            name="name"
                            value={this.props.editedTask.name}
                            onChange={e => this.props.onInputChange({[e.target.name]: e.target.value})}
                        />
                    </div>
                    <div className="ui input">
                        <input
                            type="date"
                            name="date" 
                            value={this.props.editedTask.date}
                            onChange={e => this.props.onInputChange({[e.target.name]: e.target.value})}
                        />
                    </div>
                    <select
                        className="ui dropdown"
                        name="listId"
                        value={this.props.editedTask.listId}
                        onChange={e => this.props.onInputChange(
                            {[e.target.name]: parseInputAsNumber(e.target.value)})
                        }
                    >
                        {lists}
                    </select>
                    <button className="ui button" onClick={() => this.props.onSave()}>
                        Save
                    </button>
                    <button className="ui button cancel" onClick={() => this.props.onCancel()}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

export default EditTask;