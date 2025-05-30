import { User } from '../types/user';

const UserCard = ({ user }: { user: User }) => (
  <div className="border p-4 rounded shadow">
    <h2 className="font-semibold">{user.name}</h2>
    <p>Email: {user.email}</p>
    <p>Phone: {user.phone}</p>
    <p>City: {user.address.city}</p>
  </div>
);

export default UserCard;
