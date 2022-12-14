import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddStatusForm = (props) => {
  /* durum ekleme işleminde ilk değerler */
  const [formItem, setFormItem] = useState({
    id: 0,
    categoryId: props.selectCategory.id,
    status: "",
    statusColorId: 1,
  });

  return (
    <div>
      <Modal.Header>
        <Modal.Title>Yeni Durum Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Durum </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setFormItem({
                  id: 0,
                  categoryId: formItem.categoryId,
                  status: e.target.value,
                  statusColorId: parseInt(formItem.statusColorId),
                });
              }}
              placeholder="durum bilgisi giriniz..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatusColor">
            <Form.Label>Durum Rengi </Form.Label>
            <Form.Select
              value={formItem.statusColorId}
              onChange={(e) => {
                setFormItem({
                  id: 0,
                  categoryId: formItem.categoryId,
                  status: formItem.status,
                  statusColorId: parseFloat(e.target.value),
                });
              }}
            >
              {props.statusColorList.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.text}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            variant="outline-dark"
            style={{ width: "100%" }}
            type="button"
            onClick={() => props.addStatus(formItem)}
          >
            Ekle
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
};
export default AddStatusForm;
