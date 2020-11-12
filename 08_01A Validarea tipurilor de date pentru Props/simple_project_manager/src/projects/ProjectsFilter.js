
import React from 'react';

const ProjectsFilter = (props) => {
   
    let handleChange = (e) => {
        console.log('Filtered by: ', e.target.value);
        props.onFilterChange(e.target.value);
    }

    return (
        <fieldset>
            <legend>Search project:</legend>
            <input onChange={handleChange} />
        </fieldset>
    );

}


/*
    class ProjectsFilter extends Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
            console.log('Filtered by: ', e.target.value);
            this.props.onFilterChange(e.target.value);
        }

        render() {
            return (
                <fieldset>
                    <legend>Search project:</legend>
                    <input onChange={this.handleChange} />
                </fieldset>
            );
        }
    }
*/

export default ProjectsFilter;

