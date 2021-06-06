const overlay = document.querySelector(".modal-overlay");
const openmodal = document.querySelectorAll(".modal-open");
const search = $("#search");
const closemodal = document.querySelectorAll(".modal-close");
var table = undefined;

overlay.addEventListener("click", toggleModal);
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener("click", function (event) {
    event.preventDefault();
    toggleModal();
  });
}
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener("click", toggleModal);
}

search.on("keyup", (r) => {
  let query = search.val();
  console.log(query);
  table.search(query, false, false).draw();
});
table = $("#example")
  .DataTable({
    initComplete: function () {
      var cols = [this.api().columns(1), this.api().columns(2)];
      cols.forEach((col) => {
        let select = $('<select> <option value=""></option> </select>')
          .appendTo($(col.footer()).empty())
          .on("change", () => {
            var val = $.fn.dataTable.util.escapeRegex($(select).val());
            col.search(val ? "^" + val + "$" : "", true, false).draw();
          });
        col
          .data()
          .eq(0)
          .unique()
          .sort()
          .each((value) => {
            select.append(
              '<option value="' + value + '">' + value + "</option>"
            );
          });
      });
    },
    processing: true,
    serverSide: true,
    ajax: {
      url: "/user?json=true",
    },
    columnDefs: [
      {
        targets: 0,
        data: null,
        render: function (data, type, row, meta) {
          return `
                    <img class="avatar-sm" src="${row.avatar}">
                    <div class="flex flex-col">
                        <a href="\\user/${row.id}" target="_blank">${row.nom.toUpperCase() + " " + row.prenom
            }</a>
                        <span>${row.email}</span>
                        
                    </div>
                    `;
        },
      },
      {
        targets: 1,
        data: "role",
        render: function (data, type, row, meta) {
          return `<span class="${row.role}">${row.role}</span>`;
        },
      },
      {
        targets: 2,
        data: "activite",
        render: function (data, type, row, meta) {
          return `${row.activite}`;
        },
      },
      {
        targets: 3,
        data: null,
        render: function (data, type, row, meta) {
          return `<button class="button focus:outline-none" data-toggle='modal' data-target='modifier'> <svg  class="fill-current text-atgreen hover:text-atgreen-dark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293c-.128.128-.219.289-.263.464L3 21l5.242-1.03C8.418 19.926 8.579 19.835 8.707 19.707zM21 7.414c.781-.781.781-2.047 0-2.828L19.414 3c-.781-.781-2.047-.781-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg> </button>
                  <button class="button focus:outline-none" data-toggle='modal' data-target='supprimer'><svg  class="fill-current text-red-600 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform:;-ms-filter:"><path d="M6 7C5.447 7 5 7 5 7v13c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V7c0 0-.447 0-1 0H6zM16.618 4L15 2 9 2 7.382 4 3 4 3 6 8 6 16 6 21 6 21 4z"></path></svg></button>`;
        },
      },
    ],
    bFilter: false,
    api: true,
    responsive: true,
  })
  .columns.adjust()
  .responsive.recalc();
const supprimer = (f) => {
  xhr = new XMLHttpRequest();
  xhr.open("delete", "\\user/" + f);
  xhr.onload = () => {
    table.ajax.reload(null, false);
    toggleModal();
  };
  xhr.send();
};
const modifier = (f) => {
  if (
    !(
      $(".modal-content .modal-body #email").val() &&
      $(".modal-content .modal-body #nom").val() &&
      $(".modal-content .modal-body #prenom").val() &&
      $(".modal-content .modal-body #activite").val() &&
      $(".modal-content .modal-body #role").val()
    )
  )
    return console.log("all field required");

  let form = {
    email: $(".modal-content .modal-body #email").val(),
    nom: $(".modal-content .modal-body #nom").val(),
    prenom: $(".modal-content .modal-body #prenom").val(),
    activite: $(".modal-content .modal-body #activite").val(),
    role: $(".modal-content .modal-body #role").val(),
  };
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "\\user/" + f);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    $('.modal-content .modal-loader').addClass('hidden')
    toggleModal();
  };
  xhr.send(JSON.stringify(form));
  $('.modal-content .modal-loader').removeClass('hidden')
};
const creer = (f) => {
  if (
    !(
      $(".modal-content .modal-body #email").val() &&
      $(".modal-content .modal-body #nom").val() &&
      $(".modal-content .modal-body #prenom").val() &&
      $(".modal-content .modal-body #activite").val() &&
      $(".modal-content .modal-body #role").val() &&
      $(".modal-content .modal-body #password").val() &&
      $(".modal-content .modal-body #password_confirm").val() &&
      $(".modal-content .modal-body #username").val()
    )
  )
    return alert("all field required!!");
  if (
    $(".modal-content .modal-body #password").val() !=
    $(".modal-content .modal-body #password_confirm").val()
  )
    return alert("wrong password");
  let xhr = new XMLHttpRequest();
  xhr.open("post", "\\user");
  xhr.onload = () => {
    console.log(xhr.response);
    $('.modal-content .modal-loader').addClass('hidden');
    toggleModal();
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      username: $(".modal-content .modal-body #username").val(),
      email: $(".modal-content .modal-body #email").val(),
      password: $(".modal-content .modal-body #password").val(),
      nom: $(".modal-content .modal-body #nom").val(),
      prenom: $(".modal-content .modal-body #prenom").val(),
      activite: $(".modal-content .modal-body #activite").val(),
      role: $(".modal-content .modal-body #role").val(),
    })
  );
  $('.modal-content .modal-loader').removeClass('hidden')
};
document.onkeydown = function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape && document.body.classList.contains("modal-active")) {
    toggleModal();
  }
};

function toggleModal() {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");
}
$(document).on("click", (e) => {
  let data = $(e.target).data();
  let row = table.row(e.target.parentElement.parentElement).data();
  if (data.toggle == "modal") {
    switch (data.target) {
      case "supprimer":
        $(".modal-content .modal-title").text("Supprimer un utilisateur");
        $(".modal-content .modal-body").html(
          `<p>etes vous sur de vouloir supprimer <span class="font-semibold user-name">${row.nom.toUpperCase()} ${row.prenom
          } (${row.role})</span></p>`
        );
        $(".modal-content .modal-footer").html(`<button
        class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
    <button class="px-4  p-1.5 rounded-lg text-white bg-red-500 hover:bg-red-700 action">Supprimer</button>`);
        $(".modal-content .action")
          .text("Supprimer")
          .on("click", (e) => {
            supprimer(row.id);
          });
        $(".modal-content .cancel").click(toggleModal);
        toggleModal();
        break;
      case "creer":
        $(".modal-content .modal-title").text("Modifier un utilisateur");
        $(".modal-content .modal-body").html(`
        <div class="flex flex-row space-x-2">
                                
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
            type="text" name="nom" id="nom" placeholder="Nom" >
    </div>
        <div class="flex flex-row space-x-2">
                                
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
            type="text" name="username" id="username" placeholder="username" >
    </div>
    <div class="flex flex-row">

        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="text" name="prenom" id="prenom" placeholder="Prenom" >
    </div>
    <div class="flex flex-row">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="email" name="email" id="email" placeholder="Email" >
    </div>
    <div class="flex flex-row">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="password" name="password" id="password" placeholder="password" >
    </div>
    <div class="flex flex-row">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="password" name="password_confirm" id="password_confirm" placeholder="password_confirm" >
    </div>
    <div class="flex flex-row">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="text" name="role" id="role" placeholder="Role">
    </div>
    <div class="flex flex-row mb-2">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="text" name="activite" id="activite" placeholder="Activite" >
    </div>
        `);
        $(".modal-content .modal-footer").html(`<button
        class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
    <button class="px-4  p-1.5 rounded-lg text-white hover:bg-atblue-dark bg-atblue action">Supprimer</button>`);
        $(".modal-content .action")
          .text("Ajouter")
          .on("click", (e) => {
            creer();
          });
        $(".modal-content .cancel").click(toggleModal);
        toggleModal();
        break;
      case "modifier":
        $(".modal-content .modal-title").text("Modifier un utilisateur");
        $(".modal-content .modal-body").html(`
        <div class="flex flex-row space-x-2">
                                
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-100 placeholder-atgreen bg-gray-100'
            type="text" name="nom" id="nom" placeholder="Nom" value="${row?.nom.toUpperCase()}">
    </div>
    <div class="flex flex-row">

        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="text" name="prenom" id="prenom" placeholder="Prenom" value="${row?.prenom
          }">
    </div>
    <div class="flex flex-row">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="email" name="email" id="email" placeholder="Email" value="${row?.email
          }">
    </div>
    <div class="flex flex-row">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="text" name="role" id="role" placeholder="Role" value="${row?.role
          }">
    </div>
    <div class="flex flex-row mb-2">
        <input
            class='border px-1 focus:border-atblue outline-none rounded-lg border-gray-200 placeholder-atgreen bg-gray-100'
            type="text" name="activite" id="activite" placeholder="Activite" value="${row?.activite
          }">
    </div>
        `);
        $(".modal-content .modal-footer").html(`<button
        class="px-4 bg-transparent p-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-2 cancel">Annuler</button>
    <button class="px-4  p-1.5 rounded-lg text-white bg-atblue hover:bg-atblue-dark action">Supprimer</button>`);
        $(".modal-content .action")
          .text("Enregistrer")
          .on("click", (e) => {
            supprimer(row.id);
          });
        $(".modal-content .cancel").click(toggleModal);
        toggleModal();
        break;
    }
  }
});
