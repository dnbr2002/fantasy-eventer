import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import { connnect } from 'react-red'



class AddPhoto extends Component {
    // static propTypes = {
    //     actions: PropTypes.object.isRequired
    //   };

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        
    }

    myaddCompetitor() {
        const competitor = {
            id: 3,
            description: 'molly3',
            imageLink: 'http://www.mkequestrian.com/wp-content/uploads/2016/02/Leto-CIC-PlantationCrop.jpg'
        }

        //this.props.actions.addCompetitor(competitor);
        console.log("hello");

    }

    componentWillReceiveProps(nexProps) {

    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log("VALUE::", event.target.elements.link.value)
        console.log("DESCRIPTION::", event.target.elements.description.value)

        const imageLink = event.target.elements.link.value
        const description = event.target.elements.description.value
        const competitor = {
            id: Number(new Date()),
            description: description,
            imageLink: imageLink
        }

        if (description && imageLink) {
            console.log("COMPETITOR::", competitor);

            this.props.actions.addCompetitor(competitor);
            console.log("ADDPHOTOPROPSSTATE2::", this.props.state);

        }

    }


    render() {
        console.log("ADDPHOTOPROPS::", this.props.actions.addCompetitor);
        console.log("ADDPHOTOPROPSSTATE::", this.props.state);
        return (
            <div>
                <h1>Add Competitor</h1>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Link" name="link" />
                        <input type="text" placeholder="Description" name="description" />
                        <button> Post </button>
                    </form>
                </div>

            </div>
        )
    }
}


// TaskItem.propTypes = {
//     removeTask: PropTypes.func.isRequired,
//     task: PropTypes.object.isRequired,
//     updateTask: PropTypes.func.isRequired
//   };
  


export default AddPhoto