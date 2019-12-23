import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
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
      <Button className="button-add-cover-img" onClick={() => toggle(!modal)}>
        <Translate id="choose_cover_pic_modal.add_cover_img"></Translate>
      </Button>

      <Modal
        className="choose-img-modal"
        isOpen={modal}
        toggle={() => toggle(!modal)}
      >
        <ModalHeader toggle={() => toggle(!modal)}>
          <Translate id="choose_cover_pic_modal.header"></Translate>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Translate>
                {({ translate }) => (
                  <Input
                    type="text"
                    value={feed_img_modal}
                    placeholder={translate("choose_cover_pic_modal.proportion")}
                    onChange={e => setfeed_img_modal(e.target.value)}
                  />
                )}
              </Translate>

              <Button
                onClick={() => changePic(feed_img_modal)}
                className="button-form-top submit-register"
                block
              >
                <Translate id="choose_cover_pic_modal.add_img"></Translate>
              </Button>
              <p>
                <Translate id="choose_cover_pic_modal.asterisk" />
              </p>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default withLocalize(ChooseCoverPicModal);
