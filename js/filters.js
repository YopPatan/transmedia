transmedia.filter('trustUrl', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});

transmedia.filter('trustHtml', function($sce) {
    return function(html) {
        return $sce.trustAsHtml(html);
    };
});