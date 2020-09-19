import React from 'react';
import $ from 'jquery';

window.setTimeout(function () {
    $(".alert").fadeTo(500, 0).slideUp(500, function () {
        $(this).remove();
    });
}, 3000);

const MyAlert = () => {
    return (
        <div class="alert alert-success" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>Success!</strong> You have been signed in successfully!
        </div>
    )
}

export default MyAlert;