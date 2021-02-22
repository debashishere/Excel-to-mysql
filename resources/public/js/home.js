$(document).ready(function () {
    const baseUrl = `https://exceltotable.herokuapp.com`


    const table = $('#table').DataTable({
        "ajax": "/api/excel/students",
        "columns": [
            { "data": "id", "title": "No" },
            { "data": "name", "title": "Name" },
            { "data": "roll_no", "title": "Roll No" },
            { "data": "class", "title": "Class" },
        ],
        "columnDefs": [
            { "targets": [0, 3], "searchable": false }
        ],

        "bScrollCollapse": true,
        "autoWidth": false,
        "bSort": false,



        initComplete: function () {
            $('#table_filter').css("display", "none")
            if ($(this).find('tbody tr').length <= 1) {
                $(this).parent().hide();
                $('.no_data').addClass("active");
            }
            $('#table tfoot th').each(function (index) {
                if (index == 1 || index == 2) {

                    var title = $(this).text();
                    $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                }
            });
            // Apply the search
            this.api().columns().every(function () {
                var that = this;

                $('input', this.footer()).on('keyup change clear', function () {
                    if (that.search() !== this.value) {
                        that
                            .search(this.value)
                            .draw();
                    }
                });
            });
        }
    });



    $("#upload_btn").on("click", async (event) => {
        try {
            event.preventDefault();
            let formData = new FormData();
            let file = $('#excel_file')[0].files[0];
            $('#excel_file').val('')
            formData.append("file", file)
            const url = baseUrl + '/api/excel/upload'
            let res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.status == 200) {
                console.log("file uploaded succefully");
                // alert file upload successfull message.
                showAlert("file upload successfull");
                $('.no_data').removeClass("active");
                $('#table').parent().show()

                table.ajax.reload();

            }
        }

        catch (err) {
            console.log("error while uploading the file", err);
        }
    });


    //************************FUNCTIONS******************************** */
    const showAlert = (message) => {
        $('#alert').addClass("active");
        $('#alert').html(`<p>${message}</p>`);
        setTimeout(function () {
            $('#alert').removeClass("active");
        }, 2000)
    }

})