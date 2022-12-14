import React, { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import { StatusList } from "../status";
import { Button, Col, ListGroup, Row, Modal } from "react-bootstrap";

const CategoryList = (props) => {
  /* kategori düzenleme işleminde seçilen kategorinin bilgilerinin gelmesi için */
  const [selectCategory, setSelectCategory] = useState();

  /* kategori düzenleme modalının başlangıçta kapalı gelmesi için */
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const handleEditCategoryModalClose = () => setEditCategoryModal(false);
  const handleEditCategoryModalShow = (x) => {
    // Açılan modal içerisinde seçilen kategori bilgilerinin gelmesi
    setSelectCategory(x);
    setEditCategoryModal(true);
  };

  /* durum ekleme işleminde modal kapalı gelmesi için ilk değeri false verildi */
  const [addStatusModal, setAddStatusModal] = useState(false);
  const handleAddStatusModalClose = () => setAddStatusModal(false);
  const handleAddStatusModalShow = (x) => {
    setSelectCategory(x);
    setAddStatusModal(true);
  };

  return (
    <div className="">
      <div className="border p-3 mb-5">
        <AddCategoryForm
          categoryList={props.categoryList}
          addCategory={props.addCategory}
        />
      </div>
      <div className="border p-3 mb-5">
        <ListGroup>
          <h4>Kategori Listesi</h4>
          {props.categoryList.map((x) => (
            <ListGroup.Item key={x.id}>
              <Row className="align-center">
                <Col xs={6}>{x.categoryName}</Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleAddStatusModalShow(x)}
                    title="Durum ekle."
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleEditCategoryModalShow(x)}
                    title="Kategoriyi düzenle."
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    title="Kategoriyi sil."
                    onClick={() => props.deleteCategory(x.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal show={editCategoryModal} onHide={handleEditCategoryModalClose}>
        <EditCategoryForm
          category={selectCategory}
          editCategory={props.editCategory}
        />
      </Modal>
      <Modal size="lg" show={addStatusModal} onHide={handleAddStatusModalClose}>
        <StatusList
          selectCategory={selectCategory}
          statusList={props.statusList}
          addStatus={props.addStatus}
          deleteStatus={props.deleteStatus}
          statusColorList={props.statusColorList}
          editStatus={props.editStatus}
        />
      </Modal>
    </div>
  );
};
export default CategoryList;
