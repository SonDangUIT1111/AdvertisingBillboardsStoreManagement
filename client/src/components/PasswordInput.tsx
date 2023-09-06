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

  const hidePasswordInputWithNoAnimation = () => {
    const modal = document.querySelector(".js-modal-css");
    modal?.classList.add("close-modal");
  };

  let letter1 = "";
  let letter2 = "";
  let letter3 = "";
  let letter4 = "";
  let letter5 = "";
  let letter6 = "";
  let letter7 = "";
  let letter8 = "";
  let letter9 = "";
  let letter10 = "";
  let focusNumber = 1;
  let trig = false;
  useEffect(() => {
    document.getElementById("ip1")?.focus();
    const key = "isLog";
    const value = localStorage.getItem(key);
    if (typeof value === "string") {
      const data = JSON.parse(value);
      if (data && data.expiration && new Date().getTime() < data.expiration) {
        // Data is still valid
        const value = data.value;
        // Do something with the value
        if (value === "true") {
          hidePasswordInputWithNoAnimation();
        }
      } else {
        // Data has expired or is not found
      }
    }
  }, []);

  const checkPassword = () => {
    //huy keydown event
    // hidePasswordInput();
    // deleteAll();
    let passwordString =
      letter1 +
      letter2 +
      letter3 +
      letter4 +
      letter5 +
      letter6 +
      letter7 +
      letter8 +
      letter9 +
      letter10;
    if (passwordString === "thaisonart") {
      document.removeEventListener("keydown", downPress);
      hidePasswordInput();
      const key = "isLog";
      const value = "true";
      localStorage.setItem(key, value);
      const expiration = new Date().getTime() + 6000; // Expires in 1 hour
      const data = { value, expiration };
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      deleteAll();
      document.getElementById("wrong-txt")?.classList.remove("trigger");
      document.getElementById("ip1")?.focus();
      trig = true;
      focusNumber = 1;
    }
  };
  const deleteAll = () => {
    for (let i = 1; i <= 10; i++) {
      let index = "ip" + i.toString();
      const input = document.getElementById(index) as HTMLInputElement;
      input.value = "";
    }
  };
  const toTheNext = (value: number) => {
    focusNumber = value;
    const findId = "ip" + value.toString();
    document.getElementById(findId)?.focus();
    if (value === 11) {
      checkPassword();
    }
  };
  document.addEventListener("keydown", (event) => {
    downPress(event);
  });

  const downPress = (event: KeyboardEvent) => {
    if (trig) {
      document.getElementById("wrong-txt")?.classList.add("trigger");
      trig = false;
    }
    if (event.code === "Backspace") {
      if (focusNumber !== 1) {
        let index = "ip" + (focusNumber - 1).toString();
        const input = document.getElementById(index) as HTMLInputElement;
        input.value = "";
        toTheNext(focusNumber - 1);
      }
    }
  };
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
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter1 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip2"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter2 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip3"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter3 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip4"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter4 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip5"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter5 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip6"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter6 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip7"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter7 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip8"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter8 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip9"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter9 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(focusNumber + 1);
                }
              }}
            />
            <input
              type="password"
              id="ip10"
              className="input-password-css"
              maxLength={1}
              onClick={() => {
                toTheNext(focusNumber);
              }}
              onChange={(e) => {
                letter10 = e.target.value;
                if (e.target.value !== "") {
                  toTheNext(11);
                }
              }}
            />
            <input
              type="password"
              id="ip11"
              maxLength={0}
              className="trigger"
            />
          </div>
          <div className="wrong-password-text trigger" id="wrong-txt">
            Sai mật khẩu
          </div>
        </div>
      </div>
    </>
  );
};
