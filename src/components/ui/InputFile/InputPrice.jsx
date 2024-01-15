export default function InputPrice({ priceList, setPriceList }) {
  function addPrice() {
    const cloneArray = Array.from(priceList);
    cloneArray.push({ price: 0, size: '' });
    setPriceList(cloneArray);
  }

  function priceSync() {
    const initPrice = priceList[0].price;
    setPriceList(
      priceList.map((item) => ({ price: initPrice, size: item.size }))
    );
  }

  function deleteItem(index) {
    const cloneArray = [...priceList];
    cloneArray.splice(index, 1);
    setPriceList(cloneArray);
  }

  return (
    <div>
      <button onClick={priceSync}>Синхронизировать цену</button>

      {priceList.map((item, index) => (
        <div>
          <input
            type="text"
            onChange={(e) => {
              const cloneArray = [...priceList];
              cloneArray[index].price = e.target.value;
              setPriceList(cloneArray);
            }}
            value={item.price}
          />
          <input
            type="text"
            onChange={(e) => {
              const cloneArray = [...priceList];
              cloneArray[index].size = e.target.value;
              setPriceList(cloneArray);
            }}
            value={item.size}
          />
          <button onClick={() => deleteItem(index)}>Удалить</button>
        </div>
      ))}

      <button onClick={addPrice}>Добавить</button>
    </div>
  );
}
