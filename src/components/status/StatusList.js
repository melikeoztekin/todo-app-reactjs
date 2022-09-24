import React from "react";
import { Button, Col, ListGroup, Row, Modal } from "react-bootstrap";
import AddStatusForm from "./AddStatusForm";

const StatusList = (props) => {
  return (
    <div id="example-collapse-text">
      <Row>
        <Col xs={12} lg={6}>
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
                .filter((p) => p.categoryId == props.selectCategory.id)
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
                            (c) => c.id == x.statusColorId
                          )[0].bgColor,
                        }}
                      ></Col>
                      <Col xs={6}>{x.status}</Col>
                      <Col xs={2}>
                        <Button variant="outline-dark" title="Durumu düzenle.">
                          <i className="fa-solid fa-pencil"></i>
                        </Button>
                      </Col>
                      <Col xs={2}>
                        <Button
                          variant="outline-dark"
                          title="Durumu sil."
                          onClick={() => props.deleteStatus(x.id)}
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
    </div>
  );
};
export default StatusList;
