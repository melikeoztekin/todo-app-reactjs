import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";
import { Button, Col, Row, Modal, Alert, Form } from "react-bootstrap";

const TodoList = (props) => {
  /* Görev ekleme işleminde modal kapalı gelmesi için ilk degeri false verildi */
  const [addTodoModal, setAddTodoModal] = useState(false);
  const handleAddTodoModalClose = () => setAddTodoModal(false);
  const handleAddTodoModalShow = () => setAddTodoModal(true);

  /* Görev filtreleme işleminde selectten seçim yapılmadan önce tüm görevleri listelemek için başlangıç değerini 0 verdik */
  const [newTodoFilter, setNewTodoFilter] = useState(0);
  const [newStatusFilter, setNewStatusFilter] = useState(0);

  /* görev düzenleme işleminde seçilen görevin bilgilerinin gelmesi için */
  const [selectTodo, setSelectTodo] = useState();

  /* Görev düzenleme modalının başlangıçta kapalı gelmesi için */
  const [editTodoModal, setEditTodoModal] = useState(false);
  const handleEditTodoModalClose = () => setEditTodoModal(false);
  const handleEditTodoModalShow = (x) => {
    // Açılan modal içerisinde seçilen görev bilgilerinin gelmesi
    setSelectTodo(x);
    setEditTodoModal(true);
  };

  return (
    <div>
      <Row className="p-3 mb-5">
        <h4>Görev Filtrele</h4>
        <Col>
          <Form.Select
            /* Select içinde bir değişiklik yapıldığında görevleri ona göre filtereleme işlemi */
            onChange={(e) => {
              var data = e.target.value;
              setNewTodoFilter(data);
            }}
          >
            {/* Selectte ilk olarak gösterilecek değer */}
            <option value={0}>Bir kategori seçin...</option>
            {/* Select içerisinde yazan kategori isimlerinin gelmesi için categoryList içinde gezerek isimleri alma işlemi */}
            {props.categoryList.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.categoryName}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            /* Kategori selecti içinde bir değişiklik yapıldığında durumları ona göre filtereleme işlemi */
            onChange={(e) => {
              var data = e.target.value;
              setNewStatusFilter(data);
            }}
          >
            <option value={0}>Bir durum seçin...</option>
            {props.statusList
              //başlangıçta kategori seçilmeden boş gelmesi için
              .filter((x) => x.categoryId == newTodoFilter)
              .map((st) => (
                <option key={st.id} value={st.id}>
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
          {/* bu butona tıklandığında bana görev ekleme modalını aç */}
          <Button variant="dark" onClick={handleAddTodoModalShow}>
            Yeni Görev Ekle
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Görevlerin seçilen kategori ve seçilen duruma göre görüntülenmesi durumu */}
          {props.todoList
            .filter((x) =>
              newTodoFilter == 0 && newStatusFilter == 0
                ? true
                : x.categoryId == newTodoFilter && newStatusFilter == 0
                ? true
                : x.statusId == newStatusFilter
            )
            .map((x) => (
              <Alert
                className="border"
                key={x.id}
                style={{
                  /* görevin arkaplan renginin ve yazı renginin seçilen durum bilgisine göre gelmesi */
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
                      props.categoryList.filter(
                        (cl) => cl.id == x.categoryId
                      )[0].categoryName
                    }
                  </span>
                  <span>
                    {
                      props.statusList.filter((sl) => sl.id === x.statusId)[0]
                        .status
                    }
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    className="mx-2"
                    variant="outline"
                    onClick={() => handleEditTodoModalShow(x)}
                    style={{
                      /* görevin butonlarınjın renginin seçilen duruma göre gelmesi */
                      borderColor: props.statusColorList.filter(
                        (c) =>
                          c.id ===
                          props.statusList.filter((s) => s.id === x.statusId)[0]
                            .statusColorId
                      )[0].btnBorderColor,
                      color: props.statusColorList.filter(
                        (c) =>
                          c.id ===
                          props.statusList.filter((s) => s.id === x.statusId)[0]
                            .statusColorId
                      )[0].btnTextColor,
                    }}
                  >
                    Düzenle
                  </Button>
                  {/* Bu butona tıklandığında ilgili görevi sil */}
                  <Button
                    variant="outline"
                    onClick={() => props.deleteTodo(x.id)}
                    style={{
                      borderColor: props.statusColorList.filter(
                        (c) =>
                          c.id ===
                          props.statusList.filter((s) => s.id === x.statusId)[0]
                            .statusColorId
                      )[0].btnBorderColor,
                      color: props.statusColorList.filter(
                        (c) =>
                          c.id ===
                          props.statusList.filter((s) => s.id === x.statusId)[0]
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
      {/* Görev ekleme işlemi için oluşturulan modalda kullanılacak bilgilerin iletimi */}
      <Modal show={addTodoModal} onHide={handleAddTodoModalClose}>
        <AddTodoForm
          categoryList={props.categoryList}
          statusList={props.statusList}
          addTodo={props.addTodo}
        />
      </Modal>
      {/* Görev düzenleme işlemi için oluşturulan modalda kullanılacak bilgilerin iletimi */}
      <Modal show={editTodoModal} onHide={handleEditTodoModalClose}>
        <EditTodoForm
          todo={selectTodo}
          editTodo={props.editTodo}
          categoryList={props.categoryList}
          statusList={props.statusList}
        />
      </Modal>
    </div>
  );
};
export default TodoList;
