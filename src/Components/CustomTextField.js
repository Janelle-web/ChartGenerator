import React from 'react';
import Form from 'react-bootstrap/Form';

export default class CustomTextField extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Form.Group controlId={this.props.customId}>
                <Form.Label>
                    <h4>{this.props.label}</h4>
                </Form.Label>
                <Form.Control 
                    type='text'
                    size='lg'
                    name={this.props.name}
                    placeholder={this.props.placeholder}    
                    value={this.props.val}
                    onChange={this.props.inputHandler}    
                    />
                <Form.Text>
                    {this.props.text}
                </Form.Text>
            </Form.Group>
        );
    }
}