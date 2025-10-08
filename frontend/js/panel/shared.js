import { getAdminInfos, logout } from "./funcs/utils.js";
import {
  insertNotificationHtmlTemplate,
  seenNotification,
} from "./funcs/notificatios.js";
import { showSwal } from "../funcs/utils.js";

window.seenNotification = seenNotification;

const $ = document;

window.addEventListener("load", () => {
  const adminNameElem = $.querySelector("#admin-name");
  const notificationsIconElem = $.querySelector("#notifications-icon");
  const notificationsBoxElem = $.querySelector(".home-notification-modal");
  const logoutBtnElem = document.querySelector("#logout-btn");

  getAdminInfos().then((admin) => {
    console.log(admin);
    // Protect Cms Routes
    if (admin.role === "ADMIN") {
      // Show Admin Name In Cms Homepage
      adminNameElem.innerHTML = admin.name;
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
          logout();
        }
      }
    );
  });
});
