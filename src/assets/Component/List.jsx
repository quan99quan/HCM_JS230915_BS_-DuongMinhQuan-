import React, { useState, useEffect } from "react";
import "../css/List.css";
export default function List() {
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState(false);
  const [editedItem, setEditedItem] = useState({ id: "", name: "" });
  const [error, setError] = useState("");
  const [showCancel, setShowCancel] = useState(false);

  const handleEdit = (item) => {
    setIsEditing(true);
    setShowCancel(true);
    setEditedItem(item);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setShowCancel(false);
    setEditedItem({ id: "", name: "" });
    setEditError(false);
  };
  const handleSave = () => {
    if (editedItem.name.trim() === "") {
      setEditError(true);
    } else {
      setIsEditing(false);
      setShowCancel(false);
      setList(list.map((item) => (item.id === editedItem.id ? editedItem : item)));
      setEditedItem({ id: "", name: "" });
      setEditError(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const itemName = e.target.name.value;
    if (itemName.trim() === "") {
      setError("Tên công việc không được để trống");
    } else {
      setList([
        ...list,
        {
          id: Math.random(),
          name: itemName,
        },
      ]);
      setError("");
      e.target.name.value = "";
    }
  };
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("list") || "[]");
    setList(storedList);
  }, []);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="body">
      <h2>Danh sách công việc</h2>
      <form
        onSubmit={handleSubmit}
      >
        <input type="text" name="name" placeholder="Nhập tên công việc" />
        
        <button type="submit" className="add">Thêm</button> <br />
        {error && <p className="error">{error}</p>}
      </form>
      <table>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td>
                <img
                  src="/src/assets/image/hình.jpg"
                  alt=""
                
                />
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" className="checkbox" />
                  
                  {isEditing && editedItem.id === item.id ? (
                    <input
                      type="text"
                      value={editedItem.name}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, name: e.target.value })
                      }
                      
                    />
                    
                  ) : (
                    <label>{item.name}</label>

                  )}{editError && <p className="error">Không được để trống</p>}
                </td>
                <td>
                {isEditing && editedItem.id === item.id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      {showCancel && <button onClick={handleCancel}>Hủy</button>}
                    </>
                  ) : (
                    <button onClick={() => handleEdit(item)}><i class="fa-solid fa-pen edit" ></i></button>
                  )}
                  <button
                    onClick={() => {
                      let check = window.confirm(
                        `Bạn có xác nhận xóa công việc '${item.name}' không`
                      );
                      if (check) {
                        setList(list.filter((i) => i.id !== item.id));
                      }
                    }}
                  >
                   <i class="fa-solid fa-trash-can delete"></i>
                  </button>
                </td>
              </tr>
              
            ))
          
          ) 
      
          }
        </tbody>
      </table>
    </div>
  );
}
