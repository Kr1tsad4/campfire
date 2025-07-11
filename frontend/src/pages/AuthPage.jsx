import DateOfBirth from "../components/DateOfBirth";
import InputComponent from "../components/InputComponent";

function AuthPage() {
  return (
    <div className="bg-[#F8D6EB] min-h-screen text-[#482820] flex items-center justify-center">
      <div
        id="auth-container"
        className="bg-white p-6 rounded-lg shadow-md w-120"
      >
        <div className="text-[32px] font-[700] pl-0 mb-5">Register</div>
        <InputComponent id="username" placeholder="Username"/>
        <InputComponent id="password" placeholder="Password"/>
        <div className="flex flex-row">
          <InputComponent id="first-name"  placeholder="First name" width={40} />
          <InputComponent id="last-name" placeholder="Last name" width={40}/>
        </div>
        <InputComponent id="email" placeholder="Email"/>
        <DateOfBirth/>

        <div id="register-button" className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 p-[8px] font-[700]" >Sign Up</div>

      </div>
    </div>
  );
}

export default AuthPage;
