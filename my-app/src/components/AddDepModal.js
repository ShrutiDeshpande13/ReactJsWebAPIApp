import React, {Component} from 'react';
import {Modal,Button,Row,Col, Form, FormGroup} from 'react-bootstrap'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.state={snackbaropen:false,snackbarmsg:''}
        this.handleSubmit=this.handleSubmit.bind(this)

    }
    snackbarclose=(event)=>{
        this.setState({snackbaropen:false});
    };
    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44372/api/Department',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:null,
                DepartmentName:event.target.DepartmentName.value
            })

        })
        .then(res=>res.json())
        .then((result)=>{
            //alert(result);
            this.setState({snackbaropen:true,snackbarmsg:result})
        },
        (error)=>{
            //alert('Failed')
            this.setState({snackbaropen:true,snackbarmsg:'Failed'})
        })
    }
    render(){
        return (
        <div className="container">
            <SnackBar
            anchorOrigin={{vertical:'center',horizontal:'center'}}
            open={this.state.snackbaropen}
            autoHideDuration={3000}
            onClose={this.snackbarclose}
        message={<span id="message-id">{this.state.snackbarmsg}</span>}
        action={[
        <IconButton
        key="Close"
        arial-label="Close"
        color="inherit"
        onClick={this.snackbarclose}>x</IconButton>    
        ]}
            />
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="DepartmentName">
                                <Form.Label>DepartmentName</Form.Label>
                                <Form.Control
                                type="text"
                                name="DepartmentName"
                                required
                                placeholder="DepartmentName"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button variant="primary" type="submit">
                                    Add Department
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
        );
    }
}