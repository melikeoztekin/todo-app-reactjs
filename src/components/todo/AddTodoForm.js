import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTodoForm = (props) => {
  /* ekleme işleminde açılan selectlerde kategori seçilmeden durum bilgisi görüntülenmemesi için filtre */
  const [categoryFilter, setCategoryFilter] = useState(0);

  /* görev ekleme işleminde ilk değerler */
  const [formItem, setFormItem] = useState({
    id: 0,
    categoryId: 0,
    statusId: 0,
    description: "",
  });

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Görev Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Kategori</Form.Label>
            <Form.Select
              /* kategoriyi seçerek değerini okuma */
              onChange={(e) => {
                var data = e.target.value;
                setCategoryFilter(parseInt(data));
                setFormItem({
                  id: 0,
                  categoryId: parseInt(data),
                  statusId: formItem.statusId,
                  description: formItem.description,
                });
              }}
            >
              <option value={0}>Bir kategori seçin...</option>
              {props.categoryList.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Durum</Form.Label>
            <Form.Select
              onChange={(e) => {
                var data = e.target.value;
                setFormItem({
                  id: 0,
                  categoryId: formItem.categoryId,
                  statusId: parseInt(data),
                  description: formItem.description,
                });
              }}
            >
              <option value={0}>Bir durum seçin...</option>
              {props.statusList
                .filter((x) => x.categoryId == categoryFilter)
                .map((st) => (
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
              onChange={(e) => {
                setFormItem({
                  id: 0,
                  categoryId: formItem.categoryId,
                  statusId: formItem.statusId,
                  description: e.target.value,
                });
              }}
              placeholder="görevin içeriği hakkında bilgi veriniz."
            />
          </Form.Group>
          {/* bu butona tıklandığında yeni görevi görevler listesine ekle */}
          <Button
            type="button"
            variant="outline-dark"
            style={{ width: "100%" }}
            onClick={() => {
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
