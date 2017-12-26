import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {Racers} from './Racers'
import {Events} from './Events'
import {Disciplines} from './Disciplines'
import {Sponsors} from './Sponsors'
import {Statistics} from './Statistics';
import {Home} from './Home';

const App = () => (
    <div>
        <div className='head'><h1>Ski App</h1></div>
        <BrowserRouter>
            <div>
                <div className='rTable'>
                    <div className='rTableHeading'>
                        <div className='rTableHead' border='none'>
                            <Link to='/'>Home</Link>
                        </div>
                        <div className='rTableHead' border='none'>
                            <Link to='/events'>Events</Link>
                        </div>
                        <div className='rTableHead' border='none'>
                            <Link to='/racers'>Racers</Link>
                        </div>
                        <div className='rTableHead' border='none'>
                            <Link to='/disciplines'>Disciplines</Link>
                        </div>
                        <div className='rTableHead' border='none'>
                            <Link to='/sponsors'>Sponsors</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/events" component={Events}/>
                    <Route exact path="/racers" component={Racers}/>
                    <Route path="/racer/statistics/:id" component={Statistics}/>
                    <Route exact path="/disciplines" component={Disciplines}/>
                    <Route exact path="/sponsors" component={Sponsors}/>
                </div>
            </div>
        </BrowserRouter>
    </div>
)

export default App