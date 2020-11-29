carregarComentarios();

function carregarComentarios() {

    var postId = localStorage.getItem('postID');

    if (postId == null) {
        alert('Erro ao carregar o ID do POST.');
        return;
    }

    CarregarComentarios(postId);
}


function CarregarComentarios(postId) {

    var urlServico = 'https://jsonplaceholder.typicode.com/posts/' + postId + '/comments';
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        success: function (retorno) {

            var comentarioTemplate = $("#comentario-template");
            var comentarios = $('#comentario-post-' + postId);

            $.each(retorno, function (i, comentario) {
                var comentarioElemento = comentarioTemplate.clone().removeAttr('id').removeClass('d-none');

                comentarioElemento.find('.card-header').first().html(comentario.name);
                comentarioElemento.find('.comment').first().html(comentario.body);
                comentarioElemento.find('.blockquote-footer').first().html(comentario.email);
                comentarios.append(comentarioElemento);
            });
        }
    });
}