import React from 'react';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import CustomTextField from './CustomTextField';
import ColorPicker from './ColorPicker';
import SettingsListing from './SettingsListing';
import ChartDisplay from './chartDisplay';

export default class ChartGenerator extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            chartTitle : '',
            chartDescription : '',
            currentLabel : '',
            currentNumber : '',
            currentColor : 'Red',
            settingsListing : [],
            colors : [],
            labels : [],
            numbers: [],
            displayChart : false,
            show : false,
            windowTitle : '',
            windowTitle : ''
        }

        this.inputHandler = this.inputHandler.bind(this);
        this.addSettings = this.addSettings.bind(this);
        this.displayChart = this.displayChart.bind(this);
        this.saveChart = this.saveChart.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    closeWindow(){
        //when user wants to close dialog box
        this.setState({
            show : false
        },()=>{
            console.log('The dialog box has been closed');
        });
    }    
    saveChart(){
        fetch('/api/savechart',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                title : this.state.chartTitle,
                description : this.state.chartDescription,
                labels : this.state.labels,
                colors : this.state.colors,
                numbers : this.state.numbers,
            })
        }).then((res)=>{
            return res.json();
        }).then((resAsJson)=>{
            if(resAsJson.success === true){
                //settings were saved successfully
                this.setState({
                    windowTitle : 'Success',
                    windowContent : resAsJson.message,
                    show : true
                })
            }else{
                //problems when saving settings
                this.setState({
                    windowTitle : 'ERROR',
                    windowContent : resAsJson.message,
                    show : true
                });
            }
        });
    }

    displayChart(){
        this.setState({
            displayChart : true
        },()=>{
            console.log('Creating a Chart')
        });
    }

    addSettings(event){
        let copySettings = this.state.settingsListing;
        //adding items to the array
        copySettings.push({
            label : this.state.currentLabel,
            number: this.state.currentNumber,
            color: this.state.currentColor
        });

        //updating the state variable
        this.setState({
            settingsListing : copySettings
        },()=>{
            console.log('Settings');
            console.log(this.state.settingsListing);
        });

        let copyColors = this.state.colors;
        //adding items into the array
        copyColors.push(this.state.currentColor);
        //updating state variable
        this.setState({
            colors : copyColors
        },()=>{
            console.log('Colors: ');
            console.log(this.state.colors);
        });

        let copyLabels = this.state.labels;
        //adding items into the array
        copyLabels.push(this.state.currentLabel);
        //updating state variable
        this.setState({
            labels : copyLabels
        },()=>{
            console.log('Labels: ');
            console.log(this.state.labels);
        });

        let copyNumbers = this.state.numbers;
        //adding items into the array, transform string to number
        copyNumbers.push(parseFloat(this.state.currentNumber));
        //updating state variable
        this.setState({
            numbers : copyNumbers
        },()=>{
            console.log('Number: ');
            console.log(this.state.numbers);
        });
    }

    inputHandler(event){
        if(event.target.name === 'chartTitle'){
            this.setState({
                chartTitle : event.target.value
            },()=>{
                console.log('The current chart title is: ' + this.state.chartTitle);
            });
        }

        if(event.target.name === 'chartDescription'){
            this.setState({
                chartDescription : event.target.value
            },()=>{
                console.log('The current chart description is: ' + this.state.chartDescription);
            });
        }

        if(event.target.name === 'currentLabel'){
            this.setState({
                currentLabel : event.target.value
            },()=>{
                console.log('The current chart label is: ' + this.state.currentLabel);
            });
        }

        if(event.target.name === 'currentNumber'){
            this.setState({
                currentNumber : event.target.value
            },()=>{
                console.log('The current chart number is: ' + this.state.currentNumber);
            });
        }

        if(event.target.name === 'colorPicker'){
            this.setState({
                currentColor : event.target.value
            },()=>{
                console.log('The current color is: ' + this.state.currentColor);
            });
        }
    
    }

    render(){
        return(
            <Jumbotron>
                <Card bg='dark' style={{color: 'gold'}}>
                    <Card.Header as='h1'
                        style={{textAlign: 'center'}}>
                        Chart Generator
                    </Card.Header>
                    <Card.Body>
                        <Card bg='dark' 
                            style={{color:'gold',
                            marginTop: '1.5em'}}>
                            <Card.Header as='h3'>
                                Title and Description
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <CustomTextField
                                                customId='chartTitle'
                                                label='Title'
                                                name='chartTitle'
                                                placeholder='Type in a brief title'
                                                val={this.state.chartTitle}
                                                inputHandler={this.inputHandler}
                                                text='Chart Title'/>
                                            </Col>
                                    </Row>    
                                        <Row>
                                            <Col>
                                            <CustomTextField
                                                customId='chartDescription'
                                                label='Description'
                                                name='chartDescription'
                                                placeholder='Type in a description'
                                                val={this.state.chartDescription}
                                                inputHandler={this.inputHandler}
                                                text='Chart Description'
                                            />
                                        </Col>
                                    </Row>    
                                </Container>
                                
                            </Card.Body>
                        </Card>

                        <Card bg='dark' 
                            style={{color:'gold',
                            marginTop: '1.5em'}}>
                            <Card.Header as='h3'>
                                Numeric Values and Labels
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <CustomTextField
                                                    customId='currentLabel'
                                                    label='Label'
                                                    name='currentLabel'
                                                    placeholder='Specify labels'
                                                    val={this.state.currentLabel}
                                                    inputHandler={this.inputHandler}
                                                    text='Chart Labels'
                                                />
                                        </Col>
                                        <Col>
                                            <CustomTextField
                                                    customId='currentNumber'
                                                    label='Numeric Value'
                                                    name='currentNumber'
                                                    placeholder='Specify Numbers'
                                                    val={this.state.currentNumber}
                                                    inputHandler={this.inputHandler}
                                                    text='Numeric Value'
                                                />
                                        </Col>
                                        <Col>
                                            <ColorPicker
                                                val={this.state.currentColor}
                                                inputHandler={this.inputHandler}
                                            />
                                        </Col>
                                        <Col>
                                            <Button 
                                            type='button'
                                            size='lg'
                                            variant='warning'
                                            style={{marginTop: '1.5em', padding: '1em'}}
                                            onClick={this.addSettings}>
                                            Add Settings</Button>
                                        </Col>

                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>

                        <Card bg='dark' 
                            style={{color:'gold',
                            marginTop: '1.5em'}}>
                            <Card.Header as='h3'>
                                Settings Listing
                            </Card.Header>
                            <Card.Body>
                                <SettingsListing
                                    settings={this.state.settingsListing}
                                />
                            </Card.Body>
                        </Card>

                        <Card bg='dark' 
                            style={{color:'gold',
                            marginTop: '1.5em'}}>
                            <Card.Header as='h3'>
                                Chart
                            </Card.Header>
                            <Card.Body>
                                {
                                    (this.state.displayChart === false)
                                    ?(
                                        <div style={{textAlign: 'center'}}>
                                            <Button type='button'
                                            variant='warning'
                                            size='lg'
                                            onClick={this.displayChart}>
                                                Create Chart
                                            </Button>
                                        </div>
                                    )
                                    :(
                                        //this.state.displayChart === true
                                        <ChartDisplay
                                            title={this.state.chartTitle}
                                            description={this.state.chartDescription}
                                            numbers={this.state.numbers}
                                            labels={this.state.labels}
                                            colors={this.state.colors}
                                        />
                                    )
                                }
                            </Card.Body>
                        </Card>
                                <Card bg='dark'
                                style={{color:'gold',
                                    marginTop: '1.5em'}}>
                                    <Card.Body>
                                    <ButtonGroup>
                                    {
                                        (this.state.displayChart === true)
                                        ?(
                                            <Button variant='warning'
                                                size='lg'
                                                type='button'
                                                onClick={this.saveChart}>
                                            Save Chart
                                            </Button>
                                        )
                                        :(null)
                                    }   
                                    <Button 
                                        href='/chartlisting'
                                        variant='warning'
                                        size='lg'>
                                        Charts Listing</Button>
                                    </ButtonGroup>    
                                    </Card.Body>
                                </Card>
                    </Card.Body>
                </Card>
                    <Modal show={this.state.show}>
                        <Modal.Header>
                            <Modal.Title>
                            {this.state.windowTitle}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>{this.state.windowContent}</h5>
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