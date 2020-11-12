import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import ProjectsFilter from './ProjectsFilter';
import ProjectsSearch from './ProjectsSearch';
import ProjectInfoModal from './ProjectInfoModal';
import db from '../apiserver/db';
import { project as projectSettings } from '../settings.json';

class ProjectList extends Component {

    constructor(){
        super();
        this.state = {
            currentProject: null,
            projects: db.projects,      // nu e good practice ca aici sa interogam serverul !
            allProjects: db.projects,
            allTasks: db.tasks,
            projectSettings: projectSettings,
            projectToShow: null,
            projectInfoOpen: false
        }
        this.setCurrentProject = this.setCurrentProject.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.openProjectInfoModal = this.openProjectInfoModal.bind(this);
        this.closeProjectInfoModal = this.closeProjectInfoModal.bind(this);
    }

    setCurrentProject(project) {
        let currentProjectTasks = this.state.allTasks
            .filter( task => task.project_id === project.id);
        console.log('Filtered tasks: ', currentProjectTasks);
        project.tasks = currentProjectTasks;
        this.setState( {currentProject: project} );
    }

    onFilterChange(searchText) {
        console.log(this.state);
        let filteredProjects = this.state.allProjects.filter( project => {
            return  project.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchText.toLowerCase());
        });
        this.setState( () => ({ projects: filteredProjects }))
    }

    openProjectInfoModal(project) {
        this.projectToShow = project;
        this.setState(() => ({
            projectToShow: project,
            projectInfoOpen: true
        }));
    }

    closeProjectInfoModal() {
        this.setState(() => ({
            projectToShow: null,
            projectInfoOpen: false
        }));
    }

    componentDidMount() {
        this.filterField && this.filterField.focus();
    }

    // onFilterChange = 'notfn';
    // <ProjectsSearch onFilterChange={this.onFilterChange} />
    render() {
        return (
            <div>
                <div className="row justify-content-center"> 
                    <div className="col-4 pt-2">
                        {true ?
                        <ProjectsSearch onFilterChange={this.onFilterChange} /> :
                        <ProjectsFilter
                            filterRef={(input) => { this.filterField = input }}
                            onFilterChange={this.onFilterChange} />
                        }
                    </div>
                    <div className="col-4 pt-2">
                        <h5 className="float-right"> Current project:  {this.state.currentProject && this.state.currentProject.name} </h5>
                    </div>
                </div>
                <div className="row justify-content-center"> 
                    {
                        this.state.projects.map(project => {
                            return (
                                <ProjectItem key={project.id} 
                                    {...this.state.projectSettings}
                                    currentProject={this.state.currentProject} 
                                    project={project} setCurrentProject={this.setCurrentProject}
                                    openProjectInfoModal={this.openProjectInfoModal} />
                            )
                        })
                    }
                </div>

                <ProjectInfoModal 
                    projectInfoOpen={this.state.projectInfoOpen}
                    project={this.state.projectToShow}
                    closeProjectInfoModal={this.closeProjectInfoModal} />

            </div>
        );
    }
}

export default ProjectList;
