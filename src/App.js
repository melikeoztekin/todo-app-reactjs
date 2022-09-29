import "./App.css";
import React, { useState } from "react";
import Navi from "./components/navbar";
import { CategoryList } from "./components/category";
import { TodoList } from "./components/todo";
import { ToastContainer } from "react-toastify";
import { Container, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const App = () => {
  // const [okumaIslemi, yazmaIslemi]=useState(baslangicdegeri)

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      categoryId: 1,
      statusId: 2,
      description: "Raporlar hazırlanacak",
    },
    {
      id: 2,
      categoryId: 1,
      statusId: 1,
      description: "Sunumlar hazırlanacak",
    },
    {
      id: 3,
      categoryId: 2,
      statusId: 5,
      description: "Akşam yemeği yapılacak",
    },
    {
      id: 4,
      categoryId: 2,
      statusId: 7,
      description: "Çamaşırlar makineye atılacak.",
    },
  ]);

  const [categoryList, setCategoryList] = useState([
    {
      id: 1,
      categoryName: "Ofis",
    },
    {
      id: 2,
      categoryName: "Ev",
    },
  ]);

  const [statusList, setStatusList] = useState([
    {
      id: 1,
      categoryId: 1,
      status: "Başlanacak",
      statusColorId: 5,
    },
    {
      id: 2,
      categoryId: 1,
      status: "Başlandı",
      statusColorId: 6,
    },
    {
      id: 3,
      categoryId: 1,
      status: "Devam Ediyor",
      statusColorId: 7,
    },
    {
      id: 4,
      categoryId: 1,
      status: "Bitti",
      statusColorId: 9,
    },
    {
      id: 5,
      categoryId: 2,
      status: "Başlandı",
      statusColorId: 3,
    },
    {
      id: 6,
      categoryId: 2,
      status: "Devam Ediyor",
      statusColorId: 6,
    },
    {
      id: 7,
      categoryId: 2,
      status: "Bitti",
      statusColorId: 9,
    },
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
      btnBorderColor: "white",
      btnTextColor: "white",
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

  /* Yeni Görev Ekle */
  const addTodo = (item) => {
    if (
      item.categoryId === 0 &&
      item.statusId === 0 &&
      item.description === ""
    ) {
      toast.error("Görevi oluşturmak için formu doldurun.");
      return;
    }
    if (item.categoryId.value === 0) {
      toast.warning("Kategori boş geçilemez.");
      return;
    }
    if (item.statusId.value === 0) {
      toast.warning("Durum boş geçilemez.");
      return;
    }
    if (item.description === "") {
      toast.warning("Açıklama boş geçilemez.");
      return;
    }
    // Form doldurularak yeni öge oluşturma işlemi
    setTodoList([
      ...todoList,
      {
        id: todoList.length + 1,
        categoryId: parseInt(item.categoryId),
        statusId: parseInt(item.statusId),
        description: item.description,
      },
    ]);
    toast.success("Yeni görev eklendi.");
  };

  /* Görevi Sil */
  const deleteTodo = (id) => {
    if (window.confirm("Kategoriyi silmek istediğinizden emin misiniz?")) {
      // ilgili görev silindikten sonra kalanlar yeni bir değişkene atanır
      const newTodoList = todoList.filter((item) => item.id !== id);
      setTodoList(newTodoList);
    }
  };

  /* Görevi Düzenle */
  const editTodo = (item) => {
    let newArray = [];
    let index = todoList.findIndex((x) => x.id === item.id);
    if (index !== -1) {
      todoList.forEach((element, i) => {
        if (i === index) {
          newArray.push(item);
        } else {
          newArray.push(element);
        }
      });
      if (item.categoryId === 0) {
        toast.warning("Kategori bilgisi boş geçilemez.");
        return;
      }
      if (item.statusId === 0) {
        toast.warning("Durum bilgisi boş geçilemez.");
        return;
      }
      if (item.description === "") {
        toast.warning("Görev bilgisi boş geçilemez.");
        return;
      }
      setTodoList(newArray);
      toast.success("Görev güncellendi.");
    }
  };

  /* Kategori Ekleme */
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

  /* Kategori Silme */
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
      var newTodoList = todoList.filter((x) => x.categoryId !== id);

      setTodoList(newTodoList);
      const newStatusList = statusList.filter((item) => item.categoryId !== id);

      setStatusList(newStatusList);
      const newCategoryList = categoryList.filter((item) => item.id !== id);
      setCategoryList(newCategoryList);
    }
  };

  /* Kategori Düzenleme */
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

  /* Durum Ekleme */
  const addStatus = (item) => {
    //console.error(item);
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
        statusColorId: parseInt(item.statusColorId),
      },
    ]);
  };

  /* Durum Silme */
  const deleteStatus = (id, selectCategoryId) => {
    if (window.confirm(`Durumu silmek istediğinizden emin misiniz?`)) {
      const newStatusList = statusList.filter((item) => item.id !== id);
      const data = newStatusList.filter(
        (n) => n.categoryId === selectCategoryId
      );
      if (data.length > 0) {
        const deleted = data[0].id;

        let newTodoList = [];
        todoList.forEach((item) => {
          if (item.categoryId === selectCategoryId && item.statusId === id) {
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
        setStatusList(newStatusList);
        setTodoList(newTodoList);
      } else {
        alert("Kategoriye ait son durum bilgisi silinemez.");
      }
    }
  };

  /* Durum Düzenleme */
  const editStatus = (item) => {
    let newArray = [];
    let index = statusList.findIndex((x) => x.id === item.id);
    if (index !== -1) {
      statusList.forEach((element, i) => {
        if (i === index) {
          newArray.push(item);
        } else {
          newArray.push(element);
        }
      });
      if (item.status === "") {
        toast.warning("Durum bilgisi boş geçilemez.");
        return;
      }
      if (item.statusColorId === 0) {
        toast.warning("Renk seçiniz.");
        return;
      }
      setStatusList(newArray);
      toast.success("Durum güncellendi.");
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
            deleteCategory={deleteCategory}
            editCategory={editCategory}
            statusList={statusList}
            addStatus={addStatus}
            deleteStatus={deleteStatus}
            statusColorList={statusColorList}
            editStatus={editStatus}
          />
        </Col>
        <Col xs={12} sm={12} md={12} lg={9}>
          <TodoList
            todoList={todoList}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
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
