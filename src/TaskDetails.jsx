import React from "react";
import "./css/TaskDetails.css";

const TaskDetails = props =>{

    const TaskDetailsClass = props.active === true ? "taskDetails taskDetails--visible" : "taskDetails";

    return (
        <div className={TaskDetailsClass}>
            <div className="taskDetails__header">
                <i className="icon arrow left" onClick={() => props.onClose()}></i>
                <span>
                    Szczegóły zadania
                </span>
            </div>
            <div className="taskDetails__content">
                <table className="content_table">
                    <thead>
                        <tr>
                            <td className="prop_name">Nazwa</td>
                            <td>{props.activeTask.name}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="prop_name">Data</td>
                            <td>{props.activeTask.date}</td>
                        </tr>
                        <tr>
                            <td className="prop_name">Opis</td>
                            <td>{props.activeTask.description}</td>
                        </tr>
                        <tr>
                            <td className="prop_name">Checked</td>
                            <td>{props.activeTask.checked.toString()}</td>
                        </tr>
                        <tr>
                            <td className="prop_name">Lista</td>
                            <td>{props.list.name}</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}
export default TaskDetails;