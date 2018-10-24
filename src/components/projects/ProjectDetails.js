import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ProjectDetails = (props) => {
  

  const { project, auth } = props;
  // Guard Route
  if (!auth.uid) return <Redirect to='/signin' /> 

  const id = props.match.params.id
  // console.log('project details', props)


  if (project) {
    return (

      <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          
          <span className="card-title">{project.title} - {id}</span>
          <p>{project.content}</p>
        </div>

        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
          <div>{moment(project.createdAt.toDate()).calendar()}</div>
        </div>
      </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
 
}

/**
 * State - State of auth, project
 * ownProps - from ProjectDetails route props
 * 
 */
const mapStateToProps = (state, ownProps) => {
  // console.log('ProjectDetails state', state);
  // console.log('ProjectDetails ownProps', ownProps);
  const id = ownProps.match.params.id;
  
  const projects = state.firestore.data.projects;
  //console.log('ProjectDetails projects[id]', projects['4vouzIBrKY0SRjfSqjGj']);
  // get an item of the object "projects" collection by filtering the id. ie projects["4vouzIBrKY0SRjfSqjGj"]
  // it will return single item of an projects object
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}


export default compose(
  connect(mapStateToProps), // connect to redux
  firestoreConnect([{
      collection: 'projects'
    }])
)(ProjectDetails)

