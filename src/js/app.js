require.config({
    baseUrl: "baseUrl",

    paths: {
        "name": "path"
    },

    shim: {
        '$': {
            deps: [],
            exports: '$'
        }
    }
});