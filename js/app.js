define('app', [
    'ko',
    'slideController'
], function(knockout, slideController) {
    ko = knockout;
    VM = {
        tab: "&nbsp;&nbsp;&nbsp;&nbsp;",
        slideController: {
            lastSlider: 7,
            currentSlide: ko.observable(1),
        },
        general: {
            typeOfVariable: ko.observable('let'),
        },
        slide1: {
            title: ko.observable('KnockoutJS'),
        },
        slide2: {
            title: 'Index',
            variableName: 'index',
            index: ko.observableArray([
                'Observable',
                'Computed',
                'Bindings',
                'Subscribe',
            ]),
            formatedIndexes: function(item) {
                return '"' + item + '"';
            },
        },
        slide3: {
            title: ko.observable('Observable'),
            variableName: 'VM.slide3',
            libs: ko.observableArray(['KnockoutJS','VueJS','ReactJS','EmberJS']),
            showComma: function(index) {
                return (index() < (this.libs().length - 1));
            }
        },
        slide4: {
            title: ko.observable('Computed Observables'),
            variableName: 'VM.slide4',
            subtotal: ko.observable(200),
            discount: ko.observable(-50),
            total: null
        },
        slide5: {
            title: ko.observable('Bindings'),
            link: "https://codepen.io/lucascalazans/pen/GvVLBK"
        },
        slide6: {
            title: ko.observable('Subscribe'),
            variableName: 'VM.slide6',
            hadouken: ko.observable('')
        },
    }

    VM.slide6.hadouken.subscribe(function(newValue) {
        var hadouken = document.getElementsByClassName("hadouken")[0];
        hadouken && hadouken.classList.add("active");
    });

    VM.slide4.total = ko.computed(function() {
        return this.slide4.subtotal() + this.slide4.discount();
    }, VM);

    VM.slideController.currentSlide.subscribe(function(value) {
        let title = (VM['slide'+value] && VM['slide'+value].title) || 'KnockoutJS';
        if(typeof title == 'function') title = title();
        document.title = title;
    });

    ko.applyBindings(VM, document.getElementById('app'));
    slideController(VM.slideController);
});