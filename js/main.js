$(document).ready(function () {
    var paylink = window.location.hash.replace('#', '');
    var params = paylink.split('/');
    var amount = params[0];
    var asset = params[1].toUpperCase();
    var account = params[2];
    bitshares_js.bitshares_ws.Apis.instance("wss://bts-seoul.clockwork.gr", true).init_promise.then(function (res) {
        bitshares_js.bitshares_ws.Apis.instance().db_api().exec("get_accounts", [[account]]).then(function (details) {
            console.log(details);
            bitshares_js.bitshares_ws.Apis.instance().db_api().exec("get_assets", [[asset]]).then(function (asset_details) {
                console.log(asset_details);
            });
        });
    });
});