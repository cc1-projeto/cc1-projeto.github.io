var users = [];

$(function () {

    $('[data-toggle="tooltip"]').tooltip()


    if (localStorage.getItem('users') == null) {
        CarregarUsers();
    } else {
        var temp = localStorage.getItem('users');
        users = JSON.parse(temp);
    }

    criarElementosUsuario()
});

function CarregarPagina(pagina) {

    var paginaDados = $("#paginaDados");

    $.ajax({
        type: "GET",
        url: pagina,
        async: false,
        success: function (r) {
            paginaDados.html(r);
        }
    });

}

function CarregarUsers() {
    var urlServico = 'https://jsonplaceholder.typicode.com/users';
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        data: null,
        cache: false,
        success: function (retorno) {
            if (retorno.lenght == 0) {
                alert("Erro ao obter os dados de Users. Status: " + status);
            } else {
                for (var i = 0; i < retorno.length; i++) {
                    var item = retorno[i];

                    var user = {
                        Id: item.id,
                        Name: item.name,
                        Username: item.username,
                        Email: item.email
                    };

                    users.push(user);
                }
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    });
}


function criarElementosUsuario() {

    var template = $("#user-template");
    var usuarios = $("#users");

    $.each(users, function (i, usuario) {

        var usuarioElemento = template.clone().removeAttr('id').removeClass('d-none');

        usuarioElemento.find('.id').first().html(usuario.Id);
        usuarioElemento.find('.name').first().html(usuario.Name);
        usuarioElemento.find('.username').first().html(usuario.Username);
        usuarioElemento.find('.email').first().html(usuario.Email);

        usuarioElemento.find('.detalharUsuario').each(function () {
            $(this).click(function () {
                ExibirDetalhes(usuario.Id)
            });
        });

        usuarioElemento.find('.buscarPostsUsuario').each(function () {
            $(this).click(function () {
                ExibirPosts(usuario.Id)
            });
        });

        usuarioElemento.find('.buscarTodoUsuario').each(function () {
            $(this).click(function () {
                ExibirTodo(usuario.Id)
            });
        });

        usuarios.append(usuarioElemento);
    })
}


function ExibirDetalhes(userID) {
    localStorage.setItem('userID', userID);
    CarregarPagina('userdetail.html');
}

function ExibirPosts(userID) {
    localStorage.setItem('userID', userID);
    CarregarPagina('userposts.html');
}

function ExibirTodo(userID) {
    localStorage.setItem('userID', userID);
    CarregarPagina('todo.html');
}
