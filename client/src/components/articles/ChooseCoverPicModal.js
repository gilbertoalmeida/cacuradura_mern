import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { withLocalize, Translate } from "react-localize-redux";

class ChooseCoverPicModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  fieldsOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit2 = e => {
    e.preventDefault();
    console.log(this.state.feed_img);
  };

  render() {
    return (
      <div>
        <Button className="button-form-top register" onClick={this.toggle}>
          <Translate id="authnavbar.registerbutton"></Translate>
        </Button>

        <Modal
          className="choose-img-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            <Translate id="registermodal.header"></Translate>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit2}>
              <FormGroup>
                <Label for="name">
                  <Translate id="registermodal.name"></Translate>
                </Label>
                <Translate>
                  {({ translate }) => (
                    <Input
                      type="text"
                      name="feed_img"
                      id="feed_img"
                      placeholder={translate("registermodal.name_placeholder")}
                      onChange={this.fieldsOnChange}
                    />
                  )}
                </Translate>
                <p>{this.state.feed_img}</p>

                <Input
                  type="text"
                  name="alt"
                  id="alt"
                  placeholder="alt from the img"
                  onChange={this.fieldsOnChange}
                />

                <Button className="button-form-top submit-register" block>
                  <Translate id="registermodal.submitbutton"></Translate>
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withLocalize(ChooseCoverPicModal);
