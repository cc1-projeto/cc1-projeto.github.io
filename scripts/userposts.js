$(function () {
    if (localStorage.getItem('userID') == null) {
        alert('Erro ao carregar o ID de Usuário.');
    } else {
        var userid = localStorage.getItem('userID');
        CarregarPosts(userid);
        $("#usuarioPosts").modal('show');
    }
});

function CarregarPosts(userID) {
    var urlServico = 'https://jsonplaceholder.typicode.com/users/' + userID + '/posts';
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        data: null,
        cache: false,
        success: function (retorno) {
            if (retorno.lenght == 0) {
                alert("Erro ao obter os posts do usuário. Status: " + status);
            } else {

                var template = $("#post-template");
                var comentarioTemplate = $(".comentario-template").first();
                var posts = $("#posts");

                // para cada post
                $.each(retorno, function (i, post) {


                    var headingId = 'heading-post-' + post.id;
                    var collapseId = 'collapse-post-' + post.id;
                    var postElemento = template.clone().removeAttr('id').removeClass('d-none');
                    var comentarioElemento = comentarioTemplate.clone().removeClass('comentario-template').removeClass('d-none');

                    postElemento.find('.card-header').first().attr('id', headingId);
                    postElemento.find('.btn-link').first()
                        .attr('data-target', "#" + collapseId)
                        .attr('arial-controls', collapseId)
                        .html(post.title);

                    postElemento.find('.collapse').first()
                        .attr('id', collapseId)
                        .attr('aria-labelledby', "#" + headingId);

                    comentarioElemento.find('.comentariosPost').first().attr('id', 'comentario-post-' + post.id)

                    comentarioElemento.find('a').first().click(function () {
                        exibirComentarios(post.id)
                    });

                    postElemento.find('.card-body').first().html(post.body).append(comentarioElemento);

                    if (i === 0) {
                        postElemento.find('.collapse').first().addClass('show');
                    }

                    posts.append(postElemento)
                })

                localStorage.removeItem('userID');
            }
        }
    });
}

function exibirComentarios(postID) {
    localStorage.setItem('postID', postID);

    $.ajax({
        type: "GET",
        url: 'comentarios.html',
        async: false,
        success: function (r) {
            $('#comentario-post-' + postID).html(r);
        }
    });
}