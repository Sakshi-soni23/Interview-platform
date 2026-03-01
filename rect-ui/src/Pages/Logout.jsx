import { motion, AnimatePresence } from "framer-motion";

const Logout = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-xl p-6 w-96 text-white shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-3">Confirm Logout</h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to end your session?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Logout;
