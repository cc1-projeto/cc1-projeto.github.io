$(function () {
    if (localStorage.getItem('userID') == null) {
        alert('Erro ao carregar o ID de Usuário.');
    }
    else {
        var userid = localStorage.getItem('userID');
        CarregarDetalhes(userid);
        $("#usuarioDetalhes").modal('show');
    }
});

function CarregarDetalhes(userID) {

    $.get('https://jsonplaceholder.typicode.com/users/', function (response, status){
        console.log(response, status);
    });

    var urlServico = 'https://jsonplaceholder.typicode.com/users/' + userID;
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        data: null,
        cache: false,
        success: function (retorno) {
            if (retorno.lenght == 0) {
                alert("Erro ao obter os dados de Users. Status: " + status);
            }
            else {
                var user = retorno;

                $('#txtStreet').val(user.address.street);
                $('#txtSuite').val(user.address.suite);
                $('#txtCity').val(user.address.city);
                $('#txtZipCode').val(user.address.zipcode);
                $('#txtLatitude').val(user.address.geo.lat);
                $('#txtLongitude').val(user.address.geo.lng);
                $('#txtPhone').val(user.phone);
                $('#txtWebsite').val(user.website);
                $('#txtCiaName').val(user.company.name);
                $('#txtCatchPhrase').val(user.company.catchPhrase);
                $('#txtBS').val(user.company.bs);

                localStorage.removeItem('userID');
            }
        }
    });
}