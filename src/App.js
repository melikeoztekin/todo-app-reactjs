import "./App.css";
import React, { useState } from "react";
import Navi from "./components/navbar";
import { CategoryList } from "./components/category";
import { TodoList } from "./components/todo";
import { ToastContainer } from "react-toastify";
import { Container, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const App = () => {
  const [todoList, setTodoList] = useState([
    // {
    //   id: 1,
    //   categoryId: 1,
    //   statusId: 1,
    //   description: "Matematik Ödevi",
    // },
    // {
    //   id: 2,
    //   categoryId: 2,
    //   statusId: 2,
    //   description: "Duş Al",
    // },
    // {
    //   id: 3,
    //   categoryId: 3,
    //   statusId: 3,
    //   description: "Türkçe Paragraf Test",
    // },
  ]);

  const [categoryList, setCategoryList] = useState([
    // {
    //   id: 1,
    //   categoryName: "Okul",
    // },
    // {
    //   id: 2,
    //   categoryName: "Ev",
    // },
    // {
    //   id: 3,
    //   categoryName: "Dershane",
    // },
  ]);

  const [statusList, setStatusList] = useState([
    // {
    //   id: 1,
    //   categoryId: 1,
    //   status: "Başlangıç",
    //   statusColorId: 1,
    // },
    // {
    //   id: 2,
    //   categoryId: 2,
    //   status: "Devam ediyor",
    //   statusColorId: 2,
    // },
    // {
    //   id: 3,
    //   categoryId: 3,
    //   status: "Bitti",
    //   statusColorId: 3,
    // },
  ]);

  const [statusColorList, setStatusColorList] = useState([
    {
      id: 1,
      bgColor: "whitesmoke",
      color: "black",
      btnBorderColor: "black",
      btnTextColor: "black",
      text: "Beyaz",
    },
    {
      id: 2,
      bgColor: "lightpink",
      color: "black",
      btnBorderColor: "black",
      btnTextColor: "black",
      text: "Açık Pembe",
    },

    {
      id: 3,
      bgColor: "lightcyan",
      color: "black",
      btnBorderColor: "black",
      btnTextColor: "black",
      text: "Açık Mavi",
    },

    {
      id: 4,
      bgColor: "lightyellow",
      color: "black",
      btnBorderColor: "black",
      btnTextColor: "black",
      text: "Açık Sarı",
    },
    {
      id: 5,
      bgColor: "lightgreen",
      color: "black",
      btnBorderColor: "black",
      btnTextColor: "black",
      text: "Açık Yeşil",
    },
    {
      id: 6,
      bgColor: "purple",
      color: "white",
      btnBorderColor: "white",
      btnTextColor: "white",
      text: "Mor",
    },
    {
      id: 7,
      bgColor: "blue",
      color: "white",
      btnBorderColor: "white",
      btnTextColor: "white",
      text: "Mavi",
    },
    {
      id: 8,
      bgColor: "yellow",
      color: "black",
      btnBorderColor: "black",
      btnTextColor: "black",
      text: "Sarı",
    },
    {
      id: 9,
      bgColor: "green",
      color: "white",
      btnBorderColor: "black",
      btnTextColor: "black",
      text: "Yeşil",
    },
    {
      id: 10,
      bgColor: "red",
      color: "white",
      btnBorderColor: "white",
      btnTextColor: "white",
      text: "Kırmızı",
    },
  ]);

  const addTodo = (item) => {
    if (
      item.categoryId === 0 &&
      item.statusId === 0 &&
      item.description === ""
    ) {
      toast.error("Görevi oluşturmak için formu doldurun.");
      return;
    }
    if (item.categoryId === 0) {
      toast.warning("Kategori boş geçilemez.");
      return;
    }
    if (item.statusId === 0) {
      toast.warning("Durum boş geçilemez.");
      return;
    }
    if (item.description === "") {
      toast.warning("Açıklama boş geçilemez.");
      return;
    }

    setTodoList([
      ...todoList,
      {
        id: todoList.length + 1,
        categoryId: item.categoryId,
        statusId: item.statusId,
        description: item.description,
      },
    ]);
    toast.success("Yeni görev eklendi.");
  };

  const deleteTodo = (id) => {
    if (window.confirm(`Görevi silmek istediğinizden emin misiniz?`)) {
      const newTodoList = todoList.filter((item) => item.id !== id);
      setTodoList(newTodoList);
    }
  };

  const addCategory = (item) => {
    if (item.categoryName === "") {
      toast.error("Kategori eklemek için formu doldurun.");
      return;
    }
    setCategoryList([
      ...categoryList,
      {
        id: categoryList.length + 1,
        categoryName: item.categoryName,
      },
    ]);
    toast.success("Yeni kategori eklendi.");
  };

  const editCategory = (item) => {
    let newArray = [];
    let index = categoryList.findIndex((x) => x.id === item.id);
    if (index !== -1) {
      categoryList.forEach((element, i) => {
        if (i === index) {
          newArray.push(item);
        } else {
          newArray.push(element);
        }
      });
      if (item.categoryName === "") {
        toast.warning("Kategori adı boş geçilemez.");
        return;
      }
      setCategoryList(newArray);
      toast.success("Kategori güncellendi.");
    }
  };

  const deleteCategory = (id) => {
    if (
      window.confirm(
        `${
          statusList.filter((st) => st.categoryId === id).length
        } adet durum\n${
          todoList.filter((td) => td.categoryId === id).length
        } adet görev silinecek.\nKategoriyi silmek istediğinizden emin misiniz?`
      )
    ) {
      const newCategoryList = categoryList.filter((item) => item.id !== id);
      setCategoryList(newCategoryList);
      const newTodoList = todoList.filter((item) => item.id !== id);
      setTodoList(newTodoList);
      const newStatusList = statusList.filter((item) => item.id !== id);
      setStatusList(newStatusList);
    }
  };

  const addStatus = (item) => {
    if (item.status === "") {
      toast.warning("Durum Bilgisi boş geçilemez.");
      return;
    }
    setStatusList([
      ...statusList,
      {
        id: statusList.length + 1,
        categoryId: item.categoryId,
        status: item.status,
        statusColorId: item.statusColorId,
      },
    ]);
  };

  const deleteStatus = (id) => {
    if (window.confirm(`Durumu silmek istediğinizden emin misiniz?`)) {
      const categoryId = statusList.filter((item) => item.id == id);
      const newStatusList = statusList.filter((item) => item.id !== id);
      setStatusList(newStatusList);
      const data = newStatusList.filter(
        (n) => n.categoryId == categoryId[0].categoryId
      );
      const deleted = data[data.length + 1].id;
      let newTodoList = [];
      todoList.forEach((item) => {
        if (item.id == id) {
          newTodoList.push({
            id: item.id,
            categoryId: item.categoryId,
            statusId: deleted,
            description: item.description,
          });
        } else {
          newTodoList.push(item);
        }
      });
      console.error(newTodoList);
      setTodoList(newTodoList);
    }
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Row>
        <Navi />
      </Row>
      <Row className="mt-3">
        <Col xs={12} sm={12} md={12} lg={3}>
          <CategoryList
            categoryList={categoryList}
            addCategory={addCategory}
            editCategory={editCategory}
            deleteCategory={deleteCategory}
            statusList={statusList}
            addStatus={addStatus}
            deleteStatus={deleteStatus}
            statusColorList={statusColorList}
          />
        </Col>
        <Col xs={12} sm={12} md={12} lg={9}>
          <TodoList
            todoList={todoList}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            categoryList={categoryList}
            statusList={statusList}
            statusColorList={statusColorList}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
