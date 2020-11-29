$(function () {
    if (localStorage.getItem('userID') == null) {
        alert('Erro ao carregar o ID de Usuário.');
    } else {
        var userid = localStorage.getItem('userID');
        carregarTodos(userid);
        $("#usuarioTodos").modal('show');
    }
});

function carregarTodos(userId) {

    var urlServico = 'https://jsonplaceholder.typicode.com/user/' + userId + '/todos';
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        success: function (retorno) {

            var todoTemplate = $("#todo-template");
            var todos = $('#todos');

            $.each(retorno, function (i, todo) {

                var todoId = 'todo-' + todo.id;
                var todoElemento = todoTemplate.clone().removeAttr('id').removeClass('d-none');

                todoElemento.find('input').first().attr('id', todoId).attr('checked', todo.completed);
                todoElemento.find('label').first().attr('for', todoId).html(todo.title);

                todos.append(todoElemento);
            });

            todoTemplate.remove();
        }
    });
}