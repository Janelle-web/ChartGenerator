import React from 'react';
import Form from 'react-bootstrap/Form';

export default class ColorPicker extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Form.Group controlId='colorPicker'>
                <Form.Label>
                    <h4>Color Picker</h4>
                </Form.Label>
                <Form.Control
                    as='select'
                    size='lg'
                    name='colorPicker'
                    value={this.props.val}
                    onChange={this.props.inputHandler}>
                    <option value='Orange'>Orange</option>
                    <option value='Green'>Green</option>
                    <option value='Red'>Red</option>
                    <option value='Blue'>Blue</option>
                    <option value='Purple'>Purple</option>
                    <option value='Yellow'>Yellow</option>
                    <option value='Pink'>Pink</option>
                </Form.Control>
                <Form.Text>
                    Select a color
                </Form.Text>
            </Form.Group>
        );
    }
}