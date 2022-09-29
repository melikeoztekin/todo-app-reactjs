import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditTodoForm = (props) => {
  /* form öğelerinin başlangıç değerlerini seçilen görevin var olan değerşeri yap */
  const [formItem, setFormItem] = useState(props.todo);
  /* düzenleme işleminde kategori ve durum seçili olana göre gelecek */
  const [categoryFilter, setCategoryFilter] = useState(props.todo.categoryId);
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Görevi Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-5">
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Kategori Adı </Form.Label>
            <Form.Select
              type="text"
              placeholder="kategori adı giriniz..."
              // value olarak düzenlenen  görevin değerlerini getir
              value={formItem.categoryId}
              onChange={(e) => {
                setCategoryFilter(parseInt(e.target.value));
                setFormItem({
                  id: formItem.id,
                  categoryId: parseInt(e.target.value),
                  statusId: 0,
                  description: formItem.description,
                });
              }}
            >
              {props.categoryList.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Durum </Form.Label>
            <Form.Select
              type="text"
              placeholder="durum bilgisi giriniz..."
              value={formItem.statusId}
              onChange={(e) => {
                setFormItem({
                  id: formItem.id,
                  categoryId: formItem.categoryId,
                  statusId: parseInt(e.target.value),
                  description: formItem.description,
                });
              }}
            >
              {props.statusList
                .filter((x) => x.categoryId == categoryFilter)
                .map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.status}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Açıklama </Form.Label>
            <Form.Control
              type="text"
              placeholder="görevin içeriği hakkında bilgi veriniz..."
              value={formItem.description}
              onChange={(e) => {
                setFormItem({
                  id: formItem.id,
                  categoryId: formItem.categoryId,
                  statusId: formItem.statusId,
                  description: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Button
            variant="outline-dark"
            style={{ width: "100%" }}
            type="button"
            onClick={() => {
              props.editTodo(formItem);
            }}
          >
            Kaydet
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
};
export default EditTodoForm;
