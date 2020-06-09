'use strict';

export function registration() {

    validationForm();
    var password = $('.password');
    var rePassword = $('.re-password');
    $('#registerForm').submit(function (e) {
        
        e.preventDefault();
        if (rePassword.val() === password.val()) {

                $.ajax({
                    url: "/login/registration",
                    type: "POST",
                    data: $(this).serialize(),
                    success: function(respone) {
                        if(respone.error) {
                            $('.email').val('');
                            $('.answer').text(respone.message);
                        }
                        else {
                            $('.answer').text('');
                            window.location.href = respone.redirect;
                            
                        }
                    }
                });
        } else {
            rePassword.val('');
        }
    });
    
    function validationForm() {

        $('.re-password').keyup(function () {
            if($('.password').val() === $(this).val()) {
                $('.success').addClass('d-block');
                $('.success').addClass('text-success');
                $('.warning').removeClass('d-block');
            }
            else {
                $('.warning').addClass('d-block');
                $('.success').removeClass('d-block');
            }
        });
    }
};