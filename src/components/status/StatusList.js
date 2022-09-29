import React, { useState } from "react";
import { Button, Col, ListGroup, Row, Modal } from "react-bootstrap";
import AddStatusForm from "./AddStatusForm";
import EditStatusForm from "./EditStatusForm";

const StatusList = (props) => {
  /* durum düzenleme işleminde seçilen durumun bilgilerinin gelmesi için */
  const [selectStatus, setSelectStatus] = useState();

  /* Durum düzenleme modalının başlangıçta kapalı gelmesi için */
  const [editStatusModal, setEditStatusModal] = useState(false);
  const handleEditStatusModalClose = () => setEditStatusModal(false);
  const handleEditStatusModalShow = (x) => {
    // Açılan modal içerisinde seçilen durum bilgilerinin gelmesi
    setSelectStatus(x);
    setEditStatusModal(true);
  };

  return (
    <div id="example-collapse-text">
      <Row>
        <Col xs={12} lg={6}>
          {/* Durum ekleme işlemi için oluşturulan modalda kullanılacak bilgilerin iletimi */}
          <AddStatusForm
            selectCategory={props.selectCategory}
            statusList={props.statusList}
            addStatus={props.addStatus}
            statusColorList={props.statusColorList}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Modal.Header>
            <Modal.Title>Kategori Durum Listesi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {props.statusList
                .filter((p) => p.categoryId === props.selectCategory.id)
                .map((x) => (
                  <ListGroup.Item key={x.id}>
                    <Row>
                      {/* kosul? kosulu sağlıyorsa :sağlamıyorsa  */}
                      <Col
                        xs={2}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 50,
                          backgroundColor: props.statusColorList.filter(
                            (c) => c.id === x.statusColorId
                          )[0].bgColor,
                        }}
                      ></Col>
                      <Col xs={6}>{x.status}</Col>
                      <Col xs={2}>
                        <Button
                          variant="outline-dark"
                          title="Durumu düzenle."
                          // durumu silmek istediğimde ilgili modalı aç
                          onClick={() => handleEditStatusModalShow(x)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </Button>
                      </Col>
                      <Col xs={2}>
                        <Button
                          variant="outline-dark"
                          title="Durumu sil."
                          // durumu sildiğimde kategoriler içinde olan durumu da sil
                          onClick={() =>
                            props.deleteStatus(x.id, props.selectCategory.id)
                          }
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Modal.Body>
        </Col>
      </Row>
      {/* Durum düzenleme işlemi için oluşturulan modalda kullanılacak bilgilerin iletimi */}
      <Modal show={editStatusModal} onHide={handleEditStatusModalClose}>
        <EditStatusForm
          status={selectStatus}
          editStatus={props.editStatus}
          categoryList={props.categoryList}
          statusColorList={props.statusColorList}
        />
      </Modal>
    </div>
  );
};
export default StatusList;
