$(document).ready(function () {
  let url = "ajax/ajaxCard";
  let ajaxobj = new AjaxObject(url, "json");
  ajaxobj.getall();

  (function addUserData() {
    let openModalButton = document.querySelector("#modal-button--add");
    let addModal = new bootstrap.Modal(document.querySelector("#modal-add"));
    let addButton = document.querySelector("#addButton");
    let clearButton = document.querySelector("#addClearButton");

    openModalButton.addEventListener("click", () => addModal.show());
    addButton.addEventListener("click", addUser);
    clearButton.addEventListener("click", clearData);

    function addUser(e) {
      ajaxobj.cnname = $("#addChineseName").val();
      ajaxobj.enname = $("#addEngName").val();
      ajaxobj.sex = $(
        '#modal-add input:radio[name="genderOptions"]:checked'
      ).val();
      ajaxobj.tel = +$("#addTel").val();
      ajaxobj.email = $("#addEmail").val();
      // To be updated
      try {
        if (ajaxobj.hasOwnProperty(tel)) {
          ajaxobj.add();
          addModal.hide();
          e.preventDefault();
        }
      } catch {}
    }

    function clearData() {
      return document.querySelector("#addForm").reset();
    }
  })();

  (function searchUserData() {
    let openModalButton = document.querySelector("#modal-button--search");
    let searchModal = new bootstrap.Modal(
      document.querySelector("#modal-search")
    );
    let searchButton = document.querySelector("#searchButton");
    let clearButton = document.querySelector("#searchClearButton");

    openModalButton.addEventListener("click", () => searchModal.show());
    searchButton.addEventListener("click", searchData);
    clearButton.addEventListener("click", clearData);

    function searchData() {
      ajaxobj.cnname = $("#addChineseName").val();
      ajaxobj.enname = $("#addEngName").val();
      ajaxobj.sex = $(
        '#modal-add input:radio[name="genderOptions"]:checked'
      ).val();
      // To be updated
      ajaxobj.search();
      searchModal.hide();
    }

    function clearData() {
      return document.querySelector("#searchForm").reset();
    }
  })();

  (function editUserData() {
    let openModalButtons = document.querySelectorAll(".modal-button--edit");
    let editModal = new bootstrap.Modal(document.querySelector("#modal-edit"));
    let editButton = document.querySelector("#editButton");
    let clearButton = document.querySelector("#editClearButton");

    for (let button of openModalButtons) {
      button.addEventListener("click", () => editModal.show());
    }
    editButton.addEventListener("click", editUser);
    clearButton.addEventListener("click", clearData);

    function editUser() {
      let ajaxobj = new AjaxObject(url, "json");
      ajaxobj.modify_get();
    }

    function clearData() {
      return document.querySelector("#editForm").reset();
    }
  })();

  (function deleteUserData() {
    let openModalButtons = document.querySelectorAll(".modal-button--delete");
    let deleteModal = new bootstrap.Modal(
      document.querySelector("#modal-delete")
    );
    let deleteButton = document.querySelector("#deleteButton");

    for (let button of openModalButtons) {
      button.addEventListener("click", () => deleteModal.show());
    }
    deleteButton.addEventListener("click", deleteUser);

    function deleteUser() {
      let deleteid = $(this).attr("id").substring(12);
      let url = "ajax/ajaxCard";
      let ajaxobj = new AjaxObject(url, "json");
      ajaxobj.id = deleteid;
      ajaxobj.delete();
      deleteModal.hide();
    }
  })();

  (function initPopover() {
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );
  })();

  (function initTooltip() {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  })();

  (function highlightTd() {
    $(".table").on("mouseover mouseout", "td", function (e) {
      if (e.type === "mouseover") {
        $(this).parent().addClass("td--highlight");
        $("colgroup").eq($(this).index()).addClass("td--highlight");
      } else {
        $(this).parent().removeClass("td--highlight");
        $("colgroup").eq($(this).index()).removeClass("td--highlight");
      }
    });
  })();

  (function formValidation() {
    "use strict";
    let forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
});

function refreshTable(data) {
  $("#cardtable tbody > tr").remove();
  $.each(data, function (key, item) {
    let strsex = item.sex == 0 ? "男" : "女";
    let tel =
      item.tel !== undefined
        ? `${item.tel.slice(0, 4)} - ${item.tel.slice(4, 7)} - ${item.tel.slice(
            7,
            10
          )}`
        : null;

    let row = $("<tr></tr>");
    row.append(
      $("<td></td>").html(
        `<span data-bs-toggle="tooltip" data-bs-placement="top" title="[${strsex}] ${item.cnname}">${item.cnname}</span>`
      )
    );
    row.append(
      $("<td></td>").html(
        `<span data-bs-toggle="tooltip" data-bs-placement="top" title="[${strsex}] ${item.enname}">${item.enname}</span>`
      )
    );
    row.append($("<td></td>").html(strsex));
    row.append(
      $("<td></td>").html(
        `
        <button
        type="button"
        class="btn btn-sm btn--phone"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="top"
        data-bs-content="${tel}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-phone-vibrate-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm5 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM1.807 4.734a.5.5 0 1 0-.884-.468A7.967 7.967 0 0 0 0 8c0 1.347.334 2.618.923 3.734a.5.5 0 1 0 .884-.468A6.967 6.967 0 0 1 1 8c0-1.18.292-2.292.807-3.266zm13.27-.468a.5.5 0 0 0-.884.468C14.708 5.708 15 6.819 15 8c0 1.18-.292 2.292-.807 3.266a.5.5 0 0 0 .884.468A7.967 7.967 0 0 0 16 8a7.967 7.967 0 0 0-.923-3.734zM3.34 6.182a.5.5 0 1 0-.93-.364A5.986 5.986 0 0 0 2 8c0 .769.145 1.505.41 2.182a.5.5 0 1 0 .93-.364A4.986 4.986 0 0 1 3 8c0-.642.12-1.255.34-1.818zm10.25-.364a.5.5 0 0 0-.93.364c.22.563.34 1.176.34 1.818 0 .642-.12 1.255-.34 1.818a.5.5 0 0 0 .93.364C13.856 9.505 14 8.769 14 8c0-.769-.145-1.505-.41-2.182z"
            />
          </svg>
        </button>`
      )
    );
    row.append($("<td></td>").html(item.email ?? null));
    row.append(
      $("<td></td>").html(
        `
        <button
        type="button"
        class="btn btn-sm btn--edit-outline modal-button--edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
          />
        </svg>
      </button>
        `
      )
    );
    row.append(
      $("<td></td>").html(
        `
        <button
        type="button"
        class="btn btn-sm btn--delete modal-button--delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />
        </svg>
      </button>
        `
      )
    );
    $("#cardtable").append(row);
  });
}

function initEdit(response) {
  let modifyid = $("#cardtable").attr("id").substring(12);
  $("#editChineseName").val(response[0].cnname);
  $("#editEngName").val(response[0].enname);
  if (response[0].sex == 0) {
    $("#editMale").prop("checked", true);
    $("#editFemale").prop("checked", false);
  } else {
    $("#editMale").prop("checked", false);
    $("#editFemale").prop("checked", true);
  }
  $("#modifysid").val(modifyid);

  let editButton = document.querySelector("#editButton");
  editButton.addEventListener("click", editUser);

  function editUser(e) {
    let url = "ajax/ajaxCard";
    let ajaxobj = new AjaxObject(url, "json");

    ajaxobj.cnname = $("#editChineseName").val();
    ajaxobj.enname = $("#editEngName").val();
    ajaxobj.sex = $(
      '#modal-edit input:radio[name="genderOptions"]:checked'
    ).val();
    ajaxobj.tel = +$("#editTel").val();
    ajaxobj.email = $("#editEmail").val();
    ajaxobj.id = modifyid;
    ajaxobj.modify();

    e.preventDefault();
  }
}

/**
 *
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
  this.url = url;
  this.datatype = datatype;
}

AjaxObject.prototype.cnname = "";
AjaxObject.prototype.enname = "";
AjaxObject.prototype.sex = "";
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
  alert("Alert:");
};
AjaxObject.prototype.getall = function () {
  response =
    '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0", "tel":"0913245621", "email":"peterchen@gamil.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0", "tel":"0907214453", "email":"allen2283@gamil.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0", "tel":"0912334214", "email":"sharon2442@gamil.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1", "tel":"0927885321", "email":"yoki_2234@gamil.com"}]';
  refreshTable(JSON.parse(response));
};
AjaxObject.prototype.add = function () {
  response =
    '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1"},{"s_sn":"52","cnname":"新增帳號","enname":"NewAccount","sex":"1"}]';
  refreshTable(JSON.parse(response));
};
AjaxObject.prototype.modify = function () {
  response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
  refreshTable(JSON.parse(response));
};
AjaxObject.prototype.modify_get = function () {
  response =
    '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1"}]';
  initEdit(JSON.parse(response));
};
AjaxObject.prototype.search = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"}]';
  refreshTable(JSON.parse(response));
};
AjaxObject.prototype.delete = function () {
  response =
    '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
  refreshTable(JSON.parse(response));
};
