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
                $('#transferAmount').html(amount/Math.pow(10,asset_details[0].precision));
                $('#transferAsset').html(asset+' ('+asset_details[0].id+')');
                $('#transferAccount').html(account+' ('+details[0].id+')');
                $('body').removeClass('preloader');
                beet.get("Beet BitShares Payment Link", "BTS").then(app => {
                    app.BTS.transfer(
                        {
                            to: account,
                            amount:
                                {
                                    satoshis: amount,
                                    asset_id: asset_details[0].id
                                }
                        }
                    ).then(result => {
                        $('#request').hide();
                        $('#response').show();
                        $('#result').html('TX id: '+result.id);
                    }).catch(err => {
                        console.error(err);
                    });
                }).catch(err => {
                    console.error(err);
                });
            });
        });
    });
});