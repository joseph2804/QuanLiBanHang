$(document).ready(function () {
    $('body').on('submit', 'form', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/login/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (data) {
                if (data.error) {
                    $('.username').val('');
                    $('.answer').text(data.message);
                } else {
                    $('.username').val('');
                    window.location.href = data.redirect;
                }
            }
        });
    })
})