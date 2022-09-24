import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCategoryForm = (props) => {
  const [formItem, setFormItem] = useState({
    id: 0,
    categoryName: "",
  });

  const handleChange = (e) => {
    setFormItem({
      id: 0,
      categoryName: e.target.value,
    });
  };
  return (
    <div>
      <h4>Yeni Kategori Oluştur</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="kategori adı yazınız..."
          />
        </Form.Group>
        <Button
          variant="outline-dark"
          type="button"
          style={{ width: "100%" }}
          onClick={() => props.addCategory(formItem)}
        >
          Ekle
        </Button>
      </Form>
    </div>
  );
};
export default AddCategoryForm;
