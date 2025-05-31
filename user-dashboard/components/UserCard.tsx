import { User } from '../types/user';
import { motion } from 'framer-motion';

const UserCard = ({ user }: { user: User }) => (
  <motion.div
    className="border p-4 rounded shadow hover:shadow-lg hover:border-purple-500 transition-all duration-300 cursor-pointer"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="font-semibold text-lg mb-2">{user.name}</h2>
    <p className="text-sm">Email: {user.email}</p>
    <p className="text-sm">Phone: {user.phone}</p>
    <p className="text-sm">City: {user.address.city}</p>
  </motion.div>
);

export default UserCard;