import React from 'react';
import ChartListing from './ChartListing';
import ChartGenerator from './ChartGenerator';
import { 
    BrowserRouter,
    Switch,
    Route
 } from 'react-router-dom';

export default class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <ChartGenerator/>
                    </Route>
                    <Route path='/chartlisting'>
                        <ChartListing/>
                    </Route>
                    <Route>
                        <h1>ERROR 404: Page Not Found</h1>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}