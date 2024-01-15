import React, { useEffect, useState } from 'react';

export default function ProductCategory() {
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);
  useEffect(() => {
    if (isUpdate) {
      fetchCategories();
      setIsUpdate(false);
    }
  }, [isUpdate]);

  function onUpdate() {
    setIsUpdate(true);
  }

  async function fetchCategories() {
    const res = await fetch('/api/category');
    const data = await res.json();
    setCategoryList(data);
  }
  async function addCategory(category) {
    const body = {
      name: category,
    };
    await fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    onUpdate();
    setCategory('');
  }

  async function deleteCategory(id) {
    await fetch(`/api/category/${id}`, {
      method: 'DELETE',
    });
    onUpdate();
  }

  return (
    <div>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="button"
        value="Добавить"
        onClick={() => addCategory(category)}
      />
      {categoryList.map((item) => (
        <div>
          <p>{item.name}</p>
          <button onClick={() => deleteCategory(item._id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}
