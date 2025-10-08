import { getAdminInfos, logout } from "./funcs/utils.js";
import {
  insertNotificationHtmlTemplate,
  seenNotification,
} from "./funcs/notificatios.js";
import { showSwal } from "../funcs/utils.js";

window.seenNotification = seenNotification;

window.addEventListener("load", () => {
  const adminWelcomeNameElem = document.querySelector("#admin-welcome-name");
  const adminNameElem = document.querySelector("#admin-name");
  const notificationsIconElem = document.querySelector("#notifications-icon");
  const notificationsBoxElem = document.querySelector(
    ".home-notification-modal"
  );
  const logoutBtnElem = document.querySelector("#logout-btn");

  getAdminInfos().then((admin) => {
    console.log(admin);
    // Protect Cms Routes
    if (admin.role === "ADMIN") {
      // Show Admin Name In Cms Homepage
      adminNameElem.innerHTML = admin.name;
      adminWelcomeNameElem.innerHTML = admin.name;
    } else {
      location.replace("../../login.html");
    }

    notificationsIconElem.addEventListener("mouseenter", () => {
      notificationsBoxElem.classList.add("active-modal-notfication");
    });

    notificationsBoxElem.addEventListener("mouseleave", () => {
      notificationsBoxElem.classList.remove("active-modal-notfication");
    });
    insertNotificationHtmlTemplate(admin.notifications);
  });

  logoutBtnElem.addEventListener("click", (event) => {
    event.preventDefault();

    showSwal(
      "آیا از Logout اطمینان دارید؟",
      "success", 
      ["نه", "آره"],
      (result) => {
        if (result) {
          showSwal(
            "با موفقیت خارج شدید",
            "success",
            "صفحه اصلی سایت",
            () => {
              logout()
              location.href = '../../index.html'
            }
          )
        }
      }
    );
  });
});
