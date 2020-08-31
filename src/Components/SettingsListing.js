import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class SettingsListing extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.settings.length === 0){
            //the array is empty, this will be runned
            return(
                <h3 style={{textAlign:'center'}}>
                No items available
                </h3>
            );
        }

        //saving array of settings
        const settings = this.props.settings;

        let htmlMarkup = [];
        settings.map(( settingsObject, index ) =>{
            htmlMarkup.push(
                <Row key={'index-' + index }
                style={{fontSize: '1.4em'}}>
                    <Col>{settingsObject.label}</Col>
                    <Col>{settingsObject.number}</Col>
                    <Col>{settingsObject.color}</Col>
                </Row>
            );
        });
        return(
            <Container>
                <Row>
                    <Col><h4>Labels</h4></Col>
                    <Col><h4>Numbers</h4></Col>
                    <Col><h4>Colors</h4></Col>
                </Row>
                {htmlMarkup}
            </Container>
        );
    }
}