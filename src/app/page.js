'use client'
import { useState } from "react";
import LoginForm from "./components/loginform/page";
import RegisterForm from "./components/registerform/page";

export default function Home() {
  const [active, setActive] = useState(false);

  const handleActiveTab = (msg) => {
    setActive(msg);
  }

  return (
    <main>
      <section>
        <div className="container">
          <div className="wrapper">
            <div className="forms-wrapper">
              <div className="login-wrapper"><LoginForm active={active} handleActiveTab={handleActiveTab} /></div>
              <div className="register-wrapper"><RegisterForm active={active} handleActiveTab={handleActiveTab} /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
