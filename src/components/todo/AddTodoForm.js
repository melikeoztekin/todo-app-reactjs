import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTodoForm = (props) => {
  const [formItem, setFormItem] = useState({
    id: 0,
    categoryId: 0,
    statusId: 0,
    description: "",
  });

  const handleChange = (e) => {
    setFormItem({
      id: 0,
      categoryId: e.target.value,
      statusId: formItem.statusId,
      description: formItem.description,
    });
  };
  const handleChange2 = (e) => {
    setFormItem({
      id: 0,
      categoryId: formItem.categoryId,
      statusId: e.target.value,
      description: formItem.description,
    });
  };
  const handleChange3 = (e) => {
    setFormItem({
      id: 0,
      categoryId: formItem.categoryId,
      statusId: formItem.statusId,
      description: e.target.value,
    });
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Görev Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Kategori</Form.Label>
            <Form.Select value={formItem.categoryId} onChange={handleChange}>
              <option value={0}>Kategori Seçiniz</option>
              {props.categoryList.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Durum</Form.Label>
            <Form.Select value={formItem.statusId} onChange={handleChange2}>
              <option value={0}>Durum Seçiniz</option>
              {props.statusList.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Açıklama </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              onChange={handleChange3}
              placeholder="görevin içeriği hakkında bilgi veriniz."
            />
          </Form.Group>
          <Button
            type="button"
            variant="outline-dark"
            style={{ width: "100%" }}
            onClick={() => {
              console.error(formItem);
              props.addTodo(formItem);
            }}
          >
            Kaydet
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
};
export default AddTodoForm;
