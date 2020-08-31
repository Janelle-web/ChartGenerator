import React from 'react';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Chart from 'chart.js';


import ChartsTable from './ChartsTable';

export default class ChartListing extends React.Component{
    constructor(props){
        super(props);

        this.chart = null;

        this.state ={
            chartsListing : [],
            currentTitle : '',
            currentDescription : '',
            currentColors : [],
            currentLabels : [],
            currentNumbers : [],
            show : false
        }

        this.handleClick= this.handleClick.bind(this);
        this.closeWindow= this.closeWindow.bind(this);
    }

    closeWindow(){
        this.setState({
            show: false
        },()=>{
            console.log('The dialogue window has been closed.')
        })
    }

    handleClick(chartId){
        //read settings of a specific chart from MongoDB
        fetch('/api/readchart/'+chartId,{
            method: 'GET'
        }).then((res)=>{
            return res.json();
        }).then((resAsJson)=>{
            let info = resAsJson.documents;
            //saving the information
            this.setState({
                currentTitle : info.title,
                currentDescription : info.description,
                currentColors : info.colors,
                currentLabels : info.labels,
                currentNumbers : info.numbers
            });
        }).then(()=>{
            console.log(this.state.currentTitle);
            console.log(this.state.currentDescription);
            console.log(this.state.currentLabels);
            console.log(this.state.currentColors);
            console.log(this.state.currentNumbers);
        }).then(()=>{
            this.setState({
                show : true
            },()=>{
                console.log('The dialog window has been opened.')
                //if chart was created previously
                if(this.chart){
                    this.chart.destroy();
                }

                //setting up the chart to be displayed
                this.chart = new Chart(this.refs.canvas,{
                    type : 'doughnut',
                    data : {
                        labels: this.state.currentLabels,
                        datasets : [
                            {
                                backgroundColor: this.state.currentColors,
                                data : this.state.currentNumbers
                            }
                        ]
                    },
                    options : {
                        responsive : true,
                        maintainAspectRatio: true,
                        title : {
                            display : true,
                            fontSize : 20,
                            text : [this.state.currentTitle, 
                                this.state.currentDescription]
                        },
                        legend : {
                            display : true,
                            position : 'left'
                        }
                    } 
                });
            });
        });
    }

    componentDidMount(){
        //this method runs automatically
        fetch('/api/readchart/all', {
            method : 'GET'
        }).then((res)=>{
            return res.json();
        }).then((resAsJson)=>{
            let copyArray = this.state.chartsListing;
            resAsJson.documents.map((object,index)=>{
                copyArray.push(object);
            });
            //update state variable
            this.setState((state, props)=>{
                return{
                    chartsListing : state.chartsListing.concat(copyArray)
                }
            },()=>{
                console.log(this.state.chartsListing)
            });
        });
    }

    render(){
        return(
            <Jumbotron>
                <Card bg='dark' text='white'>
                    <Card.Header 
                    as='h1'
                    style={{textAlign:'center'}}>
                        Charts Listing
                    </Card.Header>
                    <Card.Body>
                       <Container>
                           <Row>
                              <Col><h3>ID</h3></Col>
                              <Col><h3>Description</h3></Col>
                              <Col><h3>Actions</h3></Col>
                           </Row>
                       </Container>
                       <ChartsTable
                           chartsListing={this.state.chartsListing}
                           handleClick={this.handleClick}
                       />
                       <Card bg='dark'
                       style={{color: 'gold',
                       marginTop: '1.3em'}}>
                           <Card.Body>
                                <Button
                                    type='button'
                                    size='lg'
                                    variant='warning'
                                    href='/'>
                                    Go back to Chart Generator
                                </Button>
                           </Card.Body>
                       </Card>
                    </Card.Body>
                </Card>
                <Modal show={this.state.show}
                       size='lg'>
                        <Modal.Header>
                            <Modal.Title>
                            Chart
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <canvas 
                            id='myChart'
                            ref='canvas'></canvas>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button 
                            size='lg'
                            variant="warning" 
                            onClick={this.closeWindow}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </Jumbotron>
        );
    }
        
}