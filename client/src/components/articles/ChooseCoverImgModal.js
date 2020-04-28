import React, { useState, useEffect } from "react";
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

function ChooseCoverImgModal({ coverImgInState, coverImg }) {
  const [modal, toggle] = useState(false);
  const [coverImgModal, setCoverImgModal] = useState("");

  useEffect(() => {
    setCoverImgModal(coverImg);
  }, [coverImg]);

  const changePic = coverImgModal => {
    toggle(!modal);
    coverImgInState(coverImgModal);
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
        <ModalHeader
          className="choose-img-modal__header"
          toggle={() => toggle(!modal)}
        >
          <Translate id="choose_cover_pic_modal.header"></Translate>
        </ModalHeader>
        <ModalBody className="choose-img-modal__body">
          <Form>
            <FormGroup>
              <Translate>
                {({ translate }) => (
                  <Input
                    type="text"
                    value={coverImgModal}
                    placeholder={translate("choose_cover_pic_modal.proportion")}
                    onChange={e => setCoverImgModal(e.target.value)}
                  />
                )}
              </Translate>

              <Button
                onClick={() => changePic(coverImgModal)}
                className="choose-img-modal__submit-button"
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

export default withLocalize(ChooseCoverImgModal);
