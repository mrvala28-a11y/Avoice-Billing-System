import { motion, AnimatePresence } from "framer-motion";
import "./ConfirmLogout.css";

const ConfirmLogout = ({ open, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="confirm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="confirm-modal"
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h3>Logout Confirmation</h3>
            <p>
              Are you sure you want to logout from your account?
            </p>

            <div className="confirm-actions">
              <button className="btn cancel" onClick={onCancel}>
                Cancel
              </button>
              <button className="btn logout" onClick={onConfirm}>
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmLogout;
