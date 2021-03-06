/** Creates a generic/global Galaxy environment, loads shared libraries and a fake server */
define([
    "jquery",
    "sinon-qunit",
    "libs/bootstrap",
    "test-data/bootstrapped",
    "test-data/fakeserver",
    "galaxy",
    "libs/jquery/select2",
    "libs/jquery/jstorage"
], function(
    $,
    sinon,
    bootstrap,
    bootstrapped,
    serverdata,
    appBase
){
    return {
        create: function() {
            window.Galaxy = new appBase.GalaxyApp( bootstrapped );
            window.Galaxy.currHistoryPanel = { model: new Backbone.Model() };
            window.fakeserver = sinon.fakeServer.create();
            window.WAIT_FADE_FAST = 300;
            for (var route in serverdata) {
                window.fakeserver.respondWith('GET', Galaxy.root + route, [ 200, { 'Content-Type': 'application/json' }, serverdata[ route ].data ]);
            }
        },
        destroy: function() {
            if (window.fakeserver) {
                window.fakeserver.restore();
                delete window.fakeserver;
            }
        }
    };
});