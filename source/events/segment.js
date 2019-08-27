$(document).ready( function () {
  $('#segment label').on( 'click', function (data) {

    //window.location
    if (window.location.href.indexOf(this.id) <= -1) {
        window.location.href = '/events/' + this.id
    }
  });

});