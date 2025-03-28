import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";

const LoginPage = () => {
  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test@gmail.com");
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(name, email);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-6 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
      >
        Login
      </button>
    </form>
  );
};

export default LoginPage;
