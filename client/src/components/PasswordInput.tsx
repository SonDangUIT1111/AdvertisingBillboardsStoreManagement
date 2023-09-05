import { useEffect, useState } from "react";
import "../styles/styles.css";
export const PasswordInput = () => {
  const hidePasswordInput = () => {
    const modal = document.querySelector(".js-modal-css");
    modal?.setAttribute("closing", "");
    modal?.addEventListener("animationemd", () => {
      modal.removeAttribute("closing");
      modal.classList.add("close-modal");
    });
  };

  const [letter1, setLetter1] = useState("");
  const [letter2, setLetter2] = useState("");
  const [letter3, setLetter3] = useState("");
  const [letter4, setLetter4] = useState("");
  const [letter5, setLetter5] = useState("");
  const [letter6, setLetter6] = useState("");
  const [letter7, setLetter7] = useState("");
  const [letter8, setLetter8] = useState("");
  const [letter9, setLetter9] = useState("");
  const [letter10, setLetter10] = useState("");
  let [focusNumber, setFocusNumber] = useState(1);
  useEffect(() => {
    document.getElementById("ip1")?.focus();
  }, []);

  const checkPassword = () => {
    //huy keydown event
  };
  const toTheNext = (value: number) => {
    const findId = "ip" + value.toString();
    document.getElementById(findId)?.focus();
  };
  document.addEventListener("keydown", (event) => {
    if (event.code === "Backspace") {
      if (focusNumber !== 1) {
        setFocusNumber(focusNumber - 1);
        const findId = "ip" + focusNumber.toString();
        document.getElementById(findId)?.focus();
      }
    }
  });
  console.log(focusNumber);
  return (
    <>
      <div className="modal-css js-modal-css">
        <div className="modal-css-container js-modal-css-container">
          <div className="modal-css-close js-modal-css-close"></div>
          <header className="modal-css-header">Nhập mật khẩu</header>
          <div className="modal-css-body p-3">
            <input
              type="password"
              id="ip1"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter1(e.target.value);
                if (e.target.value !== "") {
                  toTheNext(2);
                  setFocusNumber(2);
                }
              }}
            />
            <input
              type="password"
              id="ip2"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter2(e.target.value);
                if (e.target.value === "") {
                  toTheNext(1);
                } else {
                  toTheNext(3);
                  setFocusNumber(3);
                }
              }}
            />
            <input
              type="password"
              id="ip3"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter3(e.target.value);
                if (e.target.value === "") {
                  toTheNext(2);
                } else {
                  toTheNext(4);
                  setFocusNumber(4);
                }
              }}
            />
            <input
              type="password"
              id="ip4"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter4(e.target.value);
                if (e.target.value === "") {
                  toTheNext(3);
                } else {
                  toTheNext(5);
                  setFocusNumber(5);
                }
              }}
            />
            <input
              type="password"
              id="ip5"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter5(e.target.value);
                if (e.target.value === "") {
                  toTheNext(4);
                } else {
                  toTheNext(6);
                  setFocusNumber(6);
                }
              }}
            />
            <input
              type="password"
              id="ip6"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter6(e.target.value);
                if (e.target.value === "") {
                  toTheNext(5);
                } else {
                  toTheNext(7);
                  setFocusNumber(7);
                }
              }}
            />
            <input
              type="password"
              id="ip7"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter7(e.target.value);
                if (e.target.value === "") {
                  toTheNext(6);
                } else {
                  toTheNext(8);
                  setFocusNumber(8);
                }
              }}
            />
            <input
              type="password"
              id="ip8"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter8(e.target.value);
                if (e.target.value === "") {
                  toTheNext(7);
                } else {
                  toTheNext(9);
                  setFocusNumber(9);
                }
              }}
            />
            <input
              type="password"
              id="ip9"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter9(e.target.value);
                if (e.target.value === "") {
                  toTheNext(8);
                } else {
                  toTheNext(10);
                  setFocusNumber(10);
                }
              }}
            />
            <input
              type="password"
              id="ip10"
              className="input-password-css"
              maxLength={1}
              onChange={(e) => {
                setLetter10(e.target.value);
                checkPassword();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
