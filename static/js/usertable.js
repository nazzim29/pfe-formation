$(document).ready(function () {
    var search = $('#search')
    .on('keyup click',(r)=>{
        let query = search.val()
        table.search(query,false,true).draw()
    })
    var table = $('#example').DataTable({
        initComplete: function () {
            var cols = [this.api().columns(1), this.api().columns(2)];
            cols.forEach((col) => {
                let select = $('<select> <option value=""></option> </select>')
                    .appendTo($(col.footer()).empty())
                    .on('change', () => {
                        var val = $.fn.dataTable.util.escapeRegex($(select).val())
                        col.search(val ? "^" + val + "$" : "", true, false).draw();
                    });
                col.data().eq(0).unique().sort().each((value) => {
                    select.append('<option value="' + value + '">' + value + "</option>");
                })
            })
        },
        "processing": true,
        "serverSide": true,
        "ajax": {
            'url' : "/user?json=true"
        },
        "columnDefs":[
            {
                'targets':0,
                'data': null,
                'render': function(data, type, row, meta) {
                    return `
                    <img class="avatar-sm" src="${row.avatar}">
                    <div class="flex flex-col">
                        <a href="\\user/${row.id}" target="_blank">${row.nom.toUpperCase()+" "+row.prenom}</a>
                        <span>${row.email}</span>
                        
                    </div>
                    `
                }
            },{
                'targets':1,
                'data': 'role',
                'render': function(data, type, row, meta) {
                    return `<span class="${row.role}">${row.role}</span>`
                }
            },{
                'targets':2,
                'data': 'activite',
                'render': function(data, type, row, meta) {
                    return `${row.activite}`
                }
            },{
                'targets':3,
                'data': null,
                'render': function(data, type, row, meta) {
                    return `<button class="button bg-atgreen-light  hover:bg-atgreen" onClick="afficher(${row.id})">Afficher</button>
                            <button class="button bg-yellow-500 hover:bg-yellow-600" onClick="modifier(${row.id})">Modifier</button>
                            <button class="button  bg-red-500 hover:bg-red-600" onClick="supprimer(${row.id})">Supprimer</button>`
                }
            }
        ],
        "bFilter": false,
        api: true,
        responsive: true
    }).columns.adjust().responsive.recalc()
});