import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">YourBank</h1>
        <div>
          <button
            className="bg-white text-blue-700 px-4 py-2 rounded-lg mr-2 transition duration-300 hover:bg-blue-100"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="bg-white text-blue-700 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-100"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>

      
      <section className="text-center py-24 px-6 bg-white">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">
          Banking Made Simple
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Secure, fast, and reliable banking services tailored for you. Join us today and take control of your finances with ease.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="mt-8 bg-blue-700 text-white px-6 py-2 rounded-lg text-lg transition duration-300 hover:bg-blue-800"
        >
          Get Started
        </button>
      </section>

  
      <section className="py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg p-6 rounded-xl text-center transition duration-300 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-blue-800">Secure Transactions</h3>
          <p className="text-gray-600 mt-2">
            We ensure top-notch security for all your banking needs.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center transition duration-300 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-blue-800">Easy Access</h3>
          <p className="text-gray-600 mt-2">
            Bank anytime, anywhere with our seamless online services.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center transition duration-300 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-blue-800">24/7 Support</h3>
          <p className="text-gray-600 mt-2">
            Our support team is always available to assist you.
          </p>
        </div>
      </section>


      <footer className="bg-blue-700 text-white py-6 px-6 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">Contact Us</p>
            <p className="text-gray-300">Phone: (123) 456-7890</p>
            <p className="text-gray-300">Email: support@yourbank.com</p>
          </div>

    
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start">
              <a href="#" className="text-gray-300 hover:text-white mb-2">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white mb-2">
                LinkedIn
              </a>
            </div>

            <div className="flex flex-col items-start">
              <a href="#" className="text-gray-300 hover:text-white mb-2">
                About Us
              </a>
              <button
                onClick={() => navigate("/banklogin")}
                className="text-gray-300 hover:text-white mb-2 underline"
              >
                Bank Login
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
