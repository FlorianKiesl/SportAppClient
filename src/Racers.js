import React from 'react';
import './index.css'
import Link from 'react-router-dom/Link';

export class Racers extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            items: [],
            isLoaded: false
        };
        this.getAllRacers = this.getAllRacers.bind(this);
        this.getAllRacers();
        this.getAllRacers;
    }

    getAllRacers(){

        fetch('http://localhost:8000/api/getAllElementsOfCollection')
        .then(res => res.json())
        .then((data) => {
            this.setState({
                isLoaded: true,
                items: data.items
            })
        }, (error) => {
            this.setState({
                isLoaded: true,
                error: error
            })
        })
    }

    newRacer(){
        const current_items = this.state.items;

        this.setState({
            items: current_items.concat([{
                _id: -1,
                name: '',
                surname: '',
                date_of_birth: new Date(),
                gender: 'female'
            }]),
        })
    }

    render() {
        const racers = this.state.items;
        return (
            <div margin-top='100px'>
                <h1>Racers</h1>
                <button onClick={() => this.newRacer()}>New Racer</button>
                <div className='rTable'>
                    <div className='rTableRow'>
                        <div className="rTableHead"><strong>Given Name</strong></div>
                        <div className="rTableHead"><strong>Surname</strong></div>
                        <div className="rTableHead"><strong>Birthdate</strong></div>
                        <div className="rTableHead"><strong>Gender</strong></div>
                        <div className="rTableHead"></div>
                        <div className="rTableHead"></div>
                    </div>
                    {racers.map(racer => (
                        <Racer item={racer} key={racer._id} onUpdate={() => this.getAllRacers()}/>
                    ))}
                </div>
            </div>
        )
    }
}

var dateFormat = require('dateformat');

class Racer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            item: this.props.item,
            adding: (this.props.item._id === -1 ? true : false),
            editing: (this.props.item._id === -1 ? true : false),
            _id: this.props.item._id,
            name: this.props.item.name,
            surname: this.props.item.surname,
            date_of_birth: this.props.item.date_of_birth,
            gender: this.props.item.gender,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    beginEdit(){
        this.setState({
            editing: !this.state.editing
        })
    }

    add(){
        let newRacer = {
            name: this.state.name,
            surname: this.state.surname,
            date_of_birth: this.state.date_of_birth,
            gender: this.state.gender,
            disciplines: [],
            sponsored_by: [],
            achievements: []
        }

        fetch('http://localhost:8000/api/postNewElement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            crossdomain: true,
            mode: "cors",
            body: JSON.stringify(newRacer)
        })
        .then((response) => {
            this.props.onUpdate();
        })
    }

    delete(){
        if (!(this.state._id === -1)) {
            fetch('http://localhost:8000/api/deleteElement/' + this.state._id, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                },
                crossdomain: true,
                mode: "cors",
            })
            .then((response) => {
                this.props.onUpdate();
            })
        }
        else {
            this.props.onUpdate();
        }

    }

    save() {
        this.setState({
            editing: false
        });
    }

    cancel() {
        this.setState({
            editing: false
        });
        this.props.onUpdate();
    }

    handleInputChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]:value
        })
    }

    render(){
        let birthdate = dateFormat(new Date(this.state.date_of_birth), 'yyyy-mm-dd');
        return(
            
            <div className='rTableRow' key={this.state.item._id}>
                <div className='rTableCell'>
                    {
                        !this.state.editing ? this.state.item.name : (<input name='name' value={this.state.name} onChange={this.handleInputChange} type='text'/>)
                    }
                </div>
                <div className='rTableCell'>
                    {
                        !this.state.editing ? this.state.item.surname : (<input name='surname' value={this.state.surname} onChange={this.handleInputChange} type='text'/>)
                    }
                </div>
                <div className='rTableCell'>
                    {
                        !this.state.editing ? birthdate : (<input name='date_of_birth' value={birthdate} onChange={this.handleInputChange} type='date'/>)
                    }
                </div>
                <div className='rTableCell'>
                    {
                        !this.state.editing ? this.state.item.gender : (
                        <select name='gender' value={this.state.gender} onChange={this.handleInputChange} >
                            <option value='female'>Female</option>
                            <option value='male'>Male</option>
                        </select>
                    )
                    }
                </div>
                {
                    !this.state.adding ?
                    <div className='rTableCell'>
                        <Link to={'racer/statistics/' + this.state._id} key={this.state.item._id}>Statistics</Link>
                    </div> : <div className='rTableCell'></div>
                }
                <div className='rTableCell'>
                    {
                        this.state.adding ?
                            <div>
                                <button onClick={() => this.add()}>Add</button>
                                <button onClick={() => this.cancel()}>Cancel</button>
                            </div>
                             : 
                            <div>
                                {
                                    this.state.editing ?
                                    <div>
                                    <button onClick={() => this.save()}>Save</button>
                                    <button onClick={() => this.cancel()}>Cancel</button>
                                    </div>
                                    :
                                    <div>
                                    <button onClick={() => this.beginEdit()}>Edit</button>
                                    <button onClick={() => this.delete()}>Delete</button>
                                    </div>
                                }
                            </div>
                    }

                </div>
            </div>
        );
    }
}

export default Racers