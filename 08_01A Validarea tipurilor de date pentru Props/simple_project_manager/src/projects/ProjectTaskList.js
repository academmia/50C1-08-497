import React from 'react';

const ProjectTaskList = (props) => {
    console.log(props)
    let noTasksMessage = props.noTasksMessage ?
                    props.noTasksMessage :
                    'No tasks for this project!';
    return (
        
        <div className="pt-2">
            {
                !props.tasks.length ?   
                <div className="alert alert-secondary" role="alert">
                    {noTasksMessage}
                </div>
                :
                props.tasks.map(task => {
                    return (
                        <div key={task.id} className="card">
                            <div className="card-text pt-2 pb-2 pl-4 pr-4">
                                <em><strong>{task.subject}</strong>: {task.description} </em>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

ProjectTaskList.defaultProps = { 
    noTasksMessage: "NO TASKS!"
}

// ProjectTaskList.defaultProps = { 
//     projectSettings:  
//         {
//             noTasksMessage: "NO TASKS!"
//         }
// }


export default ProjectTaskList

