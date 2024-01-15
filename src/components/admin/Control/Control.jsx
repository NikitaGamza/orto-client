export default function Control(props) {
  const { visibleAdd, setVisibleAdd } = props;

  return (
    <span>
      <h3 className="control-add-head">Добавить новый товар </h3>
      <input
        className="control-add"
        type="button"
        value={visibleAdd ? '-' : '+'}
        onClick={() => setVisibleAdd(!visibleAdd)}
      />
    </span>
  );
}
