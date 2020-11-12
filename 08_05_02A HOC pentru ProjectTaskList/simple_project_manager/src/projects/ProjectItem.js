import React, { Component } from 'react';
import ProjectTaskList from './ProjectTaskList';
import PropTypes from 'prop-types';
import Div from '../hoc/Div';

class ProjectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTaskList: false
        }
        this.onSetCurrent = this.onSetCurrent.bind(this);
        this.hideTaskList = this.hideTaskList.bind(this);
        this.onMoreInfo = this.onMoreInfo.bind(this);
    }

    onSetCurrent(e) {
        console.log(this.props);
        this.props.setCurrentProject(this.props.project);
        this.setState( () => ({ displayTaskList: true }) );
    }

    hideTaskList() {
        this.setState( () => ({ displayTaskList: false }) ); 
    }

    onMoreInfo() {
        this.props.openProjectInfoModal(this.props.project);
    }

    render(){
        return (
            <div className="col-8 pt-2">
                <div className="card card-inverse card-outline-default text-white"
                        style={ {backgroundColor: "#555", borderColor: "#555"} }>
                    <h4 className="card-header">
                        {this.props.project.name}
                        <span className="float-right badge badge-default">
                            {this.props.project.code}
                            <button onClick={this.onMoreInfo}
                                type="button" className="btn btn-secondary btn-sm ml-2">
                                More info</button>   
                            <button onClick={this.onSetCurrent}
                                type="button" className="btn btn-secondary btn-sm ml-2">
                                Set current</button>    
                        </span>
                    </h4>
                    <div className="card-text pt-2 pb-2 pl-4 pr-4">{this.props.project.description}</div>
                </div>
                {   this.state.displayTaskList &&
                    (this.props.currentProject && this.props.project.id === this.props.currentProject.id) &&
                    
                    ( 
                        <Div>
                            {   
                                this.props.showHideButton &&
                                <button onClick={this.hideTaskList} className="btn btn-info btn-sm ml-3 mt-1"> Hide </button>
                            }
                            <ProjectTaskList 
                                {...this.props}
                                tasks={ this.props.currentProject.tasks } />
                        </Div>
                    )
                }
            </div>
        );
    }
}

ProjectItem.defaultProps = { 
    showHideButton: true
}


ProjectItem.propTypes = { 
    showHideButton: PropTypes.bool,
    project: PropTypes.shape({ id: PropTypes.number, description: PropTypes.string}),
    currentProject: PropTypes.shape({ id: PropTypes.number}),
    openProjectInfoModal: PropTypes.func
}


export default ProjectItem;