import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import { Button, Col, Row, Modal, Alert, Form } from "react-bootstrap";

const TodoList = (props) => {
  const [addTodoModal, setAddTodoModal] = useState(false);
  const handleAddTodoModalClose = () => setAddTodoModal(false);
  const handleAddTodoModalShow = () => setAddTodoModal(true);

  return (
    <div>
      <Row className="p-3 mb-5">
        <h4>Görev Filtrele</h4>
        <Col>
          <Form.Select>
            {props.categoryList.map((ct) => (
              <option key={ct.id} value={ct.categoryName}>
                {ct.categoryName}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select>
            {props.statusList.map((st) => (
              <option key={st.id} value={st.status}>
                {st.status}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className="text-center">
        <h4>Görev Listesi</h4>
      </Row>
      <Row>
        <Col className="d-grid gap-2 mb-3 ">
          <Button variant="dark" onClick={handleAddTodoModalShow}>
            Yeni Görev Ekle
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.todoList.map((x) => (
            <Alert
              className="border"
              key={x.id}
              style={{
                backgroundColor: props.statusColorList.filter(
                  (c) =>
                    c.id ==
                    props.statusList.filter((s) => s.id == x.statusId)[0]
                      .statusColorId
                )[0].bgColor,
                color: props.statusColorList.filter(
                  (c) =>
                    c.id ==
                    props.statusList.filter((s) => s.id == x.statusId)[0]
                      .statusColorId
                )[0].color,
              }}
            >
              <div className="d-flex justify-content-between align-item-center">
                <Alert.Heading>{x.description}</Alert.Heading>
                <span>
                  {
                    props.categoryList.filter((cl) => cl.id == x.categoryId)[0]
                      .categoryName
                  }
                </span>
                <span>
                  {
                    props.statusList.filter((sl) => sl.id == x.statusId)[0]
                      .status
                  }
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  className="mx-2"
                  variant="outline"
                  style={{
                    borderColor: props.statusColorList.filter(
                      (c) =>
                        c.id ==
                        props.statusList.filter((s) => s.id == x.statusId)[0]
                          .statusColorId
                    )[0].btnBorderColor,
                    color: props.statusColorList.filter(
                      (c) =>
                        c.id ==
                        props.statusList.filter((s) => s.id == x.statusId)[0]
                          .statusColorId
                    )[0].btnTextColor,
                  }}
                >
                  Düzenle
                </Button>
                <Button
                  variant="outline"
                  onClick={() => props.deleteTodo(x.id)}
                  style={{
                    borderColor: props.statusColorList.filter(
                      (c) =>
                        c.id ==
                        props.statusList.filter((s) => s.id == x.statusId)[0]
                          .statusColorId
                    )[0].btnBorderColor,
                    color: props.statusColorList.filter(
                      (c) =>
                        c.id ==
                        props.statusList.filter((s) => s.id == x.statusId)[0]
                          .statusColorId
                    )[0].btnTextColor,
                  }}
                >
                  Sil
                </Button>
              </div>
            </Alert>
          ))}
        </Col>
      </Row>
      <Modal show={addTodoModal} onHide={handleAddTodoModalClose}>
        <AddTodoForm
          categoryList={props.categoryList}
          statusList={props.statusList}
          addTodo={props.addTodo}
        />
      </Modal>
    </div>
  );
};
export default TodoList;
