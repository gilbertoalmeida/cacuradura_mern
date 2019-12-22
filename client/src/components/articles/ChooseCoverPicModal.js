import React, { useState } from "react";
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

function ChooseCoverPicModal({ writingPic }) {
  const [modal, toggle] = useState(false);
  const [feed_img_modal, setfeed_img_modal] = useState("");

  const changePic = feed_img_modal => {
    toggle(!modal);
    writingPic(feed_img_modal);
  };

  return (
    <div>
      <Button
        className="button-form-top register"
        onClick={() => toggle(!modal)}
      >
        <Translate id="authnavbar.registerbutton"></Translate>
      </Button>

      <Modal
        className="choose-img-modal"
        isOpen={modal}
        toggle={() => toggle(!modal)}
      >
        <ModalHeader toggle={() => toggle(!modal)}>
          <Translate id="registermodal.header"></Translate>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">
                <Translate id="registermodal.name"></Translate>
              </Label>
              <Translate>
                {({ translate }) => (
                  <Input
                    type="text"
                    value={feed_img_modal}
                    placeholder={translate("registermodal.name_placeholder")}
                    onChange={e => setfeed_img_modal(e.target.value)}
                  />
                )}
              </Translate>

              <Button
                onClick={() => changePic(feed_img_modal)}
                className="button-form-top submit-register"
                block
              >
                <Translate id="registermodal.submitbutton"></Translate>
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default withLocalize(ChooseCoverPicModal);
