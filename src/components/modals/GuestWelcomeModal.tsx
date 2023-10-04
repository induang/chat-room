import clsx from "clsx";
import { useState } from "react";

export default function GuestWelcomeModal({
  handleFillClick,
}: {
  handleFillClick: () => void;
}) {
  const [visible, setVisible] = useState(true);

  const handleFillClickInModal = () => {
    setVisible(false);
    handleFillClick();
  };

  return (
    <>
      <div className={clsx("modal", visible && "modal-open")}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Welcome!</h3>
          <p className="py-4">Click 'fill' to use a visitor account.</p>
          <p>email: yingduan_ge@epam.com</p>
          <p>password: password</p>
          <div className="modal-action">
            <label className="btn btn-error" onClick={handleFillClickInModal}>
              Fill
            </label>
            <label className="btn" onClick={() => setVisible(false)}>
              Close
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="guest-welcome-modal">
          Close
        </label>
      </div>
    </>
  );
}
