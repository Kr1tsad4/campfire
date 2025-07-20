import { useNavigate } from "react-router-dom";

function LandingPage({ loginUser }) {
  const navigator = useNavigate();
  return (
    <div>
      <div className="navbar bg-[#2f9952ff] shadow-sm"> 
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">MAAM Party</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => navigator("/auth")} className="text-white">Login / Register</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-[500px] flex flex-col justify-center items-center text-center bg-[#beffd4ff]"> 
        <h1 className="text-5xl font-bold text-[#041c0cff] mb-4 drop-shadow-lg">
          Find or create your dream party easily here!
        </h1>
        <button
          className="bg-[#7ad89aff] text-white px-6 py-3 rounded-lg text-xl hover:bg-[#63b77fff] transition cursor-pointer"
          onClick={() => navigator("/home")}
        >
          Start the Party!
        </button>
      </div>

      <div className="py-12 bg-[#e3ffecff] text-center text-black">
        <h2 className="text-3xl font-semibold mb-8 text-[#041c0cff]">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-10 max-w-auto mx-auto">
          <div className="w-56 p-6 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-[#041c0cff]">Easy Party Search</h3>
            <p className="text-[#5F5F5F]">
              Quickly find parties by tags like game, music, travel, and more.
            </p>
          </div>

          <div className="w-56 p-6 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2 text-[#041c0cff]">Connect with Friends</h3>
            <p className="text-[#5F5F5F]">
              Invite friends or make new ones at the parties you join.
            </p>
          </div>

          <div className="w-56 p-6 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2 text-[#041c0cff]">Party Board</h3>
            <p className="text-[#5F5F5F]">
              A shared space where everyone can post, discover, and join new parties.
            </p>
          </div>

          <div className="w-56 p-6 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2 text-[#041c0cff]">Real-Time Group Chat</h3>
            <p className="text-[#5F5F5F]">
              Chat instantly with everyone in your party—before, during, and after the event.
            </p>
          </div>

          <div className="w-56 p-6 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold mb-2 text-[#041c0cff]">Create or Join Parties</h3>
            <p className="text-[#5F5F5F]">
              Start your own party or discover and join exciting events hosted by others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
