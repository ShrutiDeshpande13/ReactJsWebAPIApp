import React, {Component} from 'react';
import {Modal,Button,Row,Col, Form, FormGroup,FormControl} from 'react-bootstrap'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[], snackbaropen:false,snackbarmsg:''}
        this.handleSubmit=this.handleSubmit.bind(this)

    }
    componentDidMount(){
        fetch('https://localhost:44372/api/Department/')
        .then(response =>response.json())
        .then(data =>{
          this.setState({deps:data});  
        });
    }

    snackbarclose=(event)=>{
        this.setState({snackbaropen:false});
    };
    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44372/api/Employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeID:null,
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                MailId:event.target.MailId.value,
                DOJ:event.target.DOJ.value

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
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="EmployeeName">
                                <Form.Label>EmployeeName</Form.Label>
                                <Form.Control
                                type="text"
                                name="EmployeeName"
                                required
                                placeholder="EmployeeName"
                                />
                            </FormGroup>
                            <FormGroup controlId="Department">
                                <Form.Label>Department</Form.Label>
                                    <FormControl as="select">
                                        {this.state.deps.map(dep =>
                                        <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                        )}
                                    </FormControl>
                            </FormGroup>
                            <FormGroup controlId="MailId">
                                <Form.Label>MailId</Form.Label>
                                <Form.Control
                                type="text"
                                name="MailId"
                                required
                                placeholder="MailId"
                                />
                            </FormGroup>
                            <FormGroup controlId="DOJ">
                                <Form.Label>DOJ</Form.Label>
                                <Form.Control
                                type="date"
                                name="DOJ"
                                required
                                placeholder="DOJ"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button variant="primary" type="submit">
                                    Add Employee
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