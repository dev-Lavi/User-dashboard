import { User } from '../types/user';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Edit, Eye } from 'lucide-react';

interface UserCardProps {
  user: User;
  darkMode: boolean;
}

const UserCard = ({ user, darkMode }: UserCardProps) => (
  <motion.div
    className={`rounded-xl shadow-md p-6 border transition-all duration-300 ${
      darkMode
        ? "bg-gray-900 border-gray-800 hover:border-purple-500"
        : "bg-white border-gray-200 hover:border-purple-400"
    }`}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start space-x-4 mb-4">
      <img 
        src={`https://i.pravatar.cc/60?img=${user.id}`} 
        alt={user.name}
        className="h-14 w-14 rounded-full border-2 border-purple-500"
      />
      <div>
        <h2 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
          {user.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <MapPin size={14} className="mr-1" /> {user.address.city}
        </p>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center text-sm">
        <Mail size={16} className="text-gray-500 dark:text-gray-400 mr-2 w-5" />
        <span className="truncate">{user.email}</span>
      </div>
      <div className="flex items-center text-sm">
        <Phone size={16} className="text-gray-500 dark:text-gray-400 mr-2 w-5" />
        <span>{user.phone}</span>
      </div>
    </div>

    <div className="mt-4 flex space-x-2">
      <button 
        className={`text-sm px-3 py-1 rounded-lg transition-colors flex items-center ${
          darkMode 
            ? "bg-gray-800 hover:bg-gray-700 text-gray-300" 
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
      >
        <Edit size={14} className="mr-1" /> Edit
      </button>
      <button className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition-colors flex items-center">
        <Eye size={14} className="mr-1" /> View
      </button>
    </div>
  </motion.div>
);

export default UserCard;