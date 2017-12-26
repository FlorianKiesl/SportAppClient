import React from 'react';
import {Link} from 'react-router-dom'

export class Statistics extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: {},
            isLoaded: false,
            error: ""
        }
        this.getRacer();
    }

    getRacer(){
        const id = this.props.match.params.id
        fetch('http://localhost:8000/api/getItemsByKeyValuePair/_id=' + id)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                isLoaded: true,
                item: data.items[0]
            })
        }, (error) => {
            this.setState({
                isLoaded: true,
                error: error
            })
        })
    }

    render(){
        return (
            <div>
                <h1>Statistics</h1>
                <div>
                    {JSON.stringify(this.state.item)}
                </div>
                <Link to='/racers'>Back</Link>
            </div>
        )

    }
}