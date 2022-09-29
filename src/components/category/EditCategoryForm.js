import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditCategoryForm = (props) => {
  const [formItem, setFormItem] = useState(props.category);

  const handleChange = (e) => {
    setFormItem({
      id: formItem.id,
      categoryName: e.target.value,
    });
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Kategoriyi Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-5">
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Kategori Adı </Form.Label>
            <Form.Control
              type="text"
              placeholder="kategori adı giriniz..."
              value={formItem.categoryName}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="outline-dark"
            style={{ width: "100%" }}
            type="button"
            onClick={() => {
              props.editCategory(formItem);
            }}
          >
            Kaydet
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
};
export default EditCategoryForm;
