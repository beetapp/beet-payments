$( document ).ready(function() {
    var paylink = window.location.hash.replace('#','');
    var params = paylink.split('/');
    var amount=params[0];
    var asset=params[1];
    var account=params[2];
    console.log(params);
});