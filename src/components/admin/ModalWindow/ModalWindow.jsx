import './ModalWindow.scss';

export default function ModalWindow(props) {
  const { children, isVisible, setIsVisible } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-window">
      <div className="modal-window__content">{children}</div>
      <div
        className="modal-window__overlay"
        onClick={() => setIsVisible(false)}
      ></div>
    </div>
  );
}
