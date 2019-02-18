import React, { Component } from 'react';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormText, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import './Modal.css';

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

        // validation caracters for( password, email, etc)
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
        // validation in case nothing input
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class TagModal extends Component {
    constructor(props) {
        super(props);
    

    this.state = {
        firstName: null,
        formErrors: {
            firstName: "",
        },

        visible: true,
        modalIsOpen: false,
        backdrop: true,
        favorite: true,
        feed: true
    }
}
        // metodas for opening modals
    toggleModal() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    // metods for state check  in modal 
    favorite(){
        this.setState({
            favorite: !this.state.favorite
        })
        console.log(this.state.favorite)
    }
    myFeed() {
        this.setState({
            feed: !this.state.feed
        })
        console.log(this.state.feed)
    }


        // submit button
    handleSubmit = e => {
        e.preventDefault();

            if (formValid(this.state)) {
                alert(`
                --SUBMITING--
                Name: ${this.state.firstName}
                `)
            } else {
                alert ('INVALID NAME')
            }
        }
            // form validation
        handleChange = e => {
            e.preventDefault();
            const { name, value } = e.target;
            let formErrors = this.state.formErrors;


            switch (name) {
                case 'firstName':
                formErrors.firstName = value.length < 3 ? 'minimum 3 characters required' : "";
                break;
            default:
                break;
           }

           this.setState({ formErrors, [name]: value }, () => console.log(this.state))
        };
    
    render() {
        const { formErrors } = this.state;
        return (
        <div>
            <div >             
                <div className="boxx">
                        <div>
                            <div className="tagsIcon"><h3 className="tgii"><i className="fas fa-tags"></i></h3><h6  className="tgi">TAGS</h6></div>
                        </div>
                    <span className="plus" onClick={this.toggleModal.bind(this)}><h3><i className="fas fa-th-list"></i></h3><h6>Tags types</h6></span>
                    <span className="plus" onClick={this.toggleModal.bind(this)}><h3><i className="fa fa-plus"></i></h3><h6>new</h6></span>
                </div>
            </div>

            <Modal isOpen={this.state.modalIsOpen} >

              <ModalHeader toggle={this.toggleModal.bind(this)}><h4 className="tagHeader">Tag</h4></ModalHeader>


              <ModalBody>

                <form onSubmit={this.handleSubmit} noValidate></form>
                <Form inline>
                <label htmlFor="firstName">Name</label>
                </Form>
                <FormGroup>
                    <Input
                        type="text"
                        className={formErrors.firstName.length > 0 ? "error" : null}
                        placeholder="Name"
                        name="firstName"
                        noValidate
                        onChange={this.handleChange}
                    ></Input>
                        {formErrors.firstName.length > 0 && (   <span className="errorMessage">{formErrors.firstName}</span>    )}
                </FormGroup>
                <Form inline>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" onChange={this.myFeed.bind(this)} />{' '}
                        My feed
                    </Label>
                </FormGroup>

                <FormGroup check >
                    <Label check>
                        <Input type="checkbox" onChange={this.favorite.bind(this)} />{' '}
                        My favorites
                    </Label>
                </FormGroup>
                </Form>

                <FormGroup>
                    <Form inline>
                    <Label for="exampleSelect"><small>Type(Changing tag type will affect the entire tag, loss of information may occur)</small></Label>
                    </Form>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Fudbalski klub1</option>
                        <option>Fudbalski klub2</option>
                        <option>Fudbalski klub3</option>
                        <option>Fudbalski klub4</option>
                        <option>Fudbalski klub5</option>
                    </Input>
                </FormGroup>   

                <FormGroup>
                    <Label for="file">Photo</Label>
                    <Jumbotron>
                    <Input type="file" name="file" id="exampleFile" src="../2.png" alt="Smiley face" height="42" width="42" />
                    
                    
                    <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                    </FormText>
                    </Jumbotron>
                </FormGroup>

              </ModalBody>
              <ModalFooter>
                  <FormGroup className="cancelButton">
                  <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                  </FormGroup>
                  <FormGroup>
                  <Button color="primary" onClick={this.handleSubmit.bind(this)}>Save</Button>
                  </FormGroup>
              </ModalFooter>
            </Modal>
        </div>
        );
      }
}

export default TagModal;
