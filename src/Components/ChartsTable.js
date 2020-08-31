import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class ChartsTable extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const listing = this.props.chartsListing;
        let htmlMarkup = [];
        listing.map((object,index)=>{
            htmlMarkup.push(
                <Row key={'index-' + index}
                style={{fontSize: '1.3em',
                marginTop: '1.2em'}}>
                    <Col>{object._id}</Col>
                    <Col>{object.description}</Col>
                    <Col>
                        <Button 
                        variant='warning'
                        type='button'
                        size='lg'
                        onClick={()=>{
                            this.props.handleClick(object._id)
                        }}>
                            Preview Chart
                        </Button>
                    </Col>
                </Row>
            );
        })
        return(
            <Card bg='dark' text='white'>
                <Card.Body>
                    <Container>
                      {htmlMarkup}
                    </Container>
                </Card.Body>
            </Card>
        );
    }
}