import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditStatusForm = (props) => {
  const [formItem, setFormItem] = useState(props.status);
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Durumu Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-5">
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Durum </Form.Label>
            <Form.Control
              type="text"
              placeholder="durum bilgisi giriniz..."
              value={formItem.status}
              onChange={(e) => {
                setFormItem({
                  id: formItem.id,
                  categoryId: formItem.categoryId,
                  status: e.target.value,
                  statusColorId: formItem.statusColorId,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatusColor">
            <Form.Label>Durum Rengi </Form.Label>
            <Form.Select
              type="text"
              value={formItem.statusColorId}
              placeholder="durum rengi seçiniz..."
              onChange={(e) => {
                setFormItem({
                  id: formItem.id,
                  categoryId: formItem.categoryId,
                  status: formItem.status,
                  statusColorId: parseInt(e.target.value),
                });
              }}
            >
              {props.statusColorList.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.text}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            variant="outline-dark"
            style={{ width: "100%" }}
            type="button"
            onClick={() => {
              props.editStatus(formItem);
            }}
          >
            Kaydet
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
};
export default EditStatusForm;
