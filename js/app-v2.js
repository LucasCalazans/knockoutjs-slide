define([
    'ko',
    'slideController',
    'text!../components/callVM-to-show.html',
    'text!../components/call-to-show.html'
], function(knockout, slideController, callVM, callHTML) {
    ko = knockout;
    VM = {
        tab: "&nbsp;&nbsp;&nbsp;&nbsp;",
        isModalOpened: ko.observable(false),
        modalVM: ko.observable(''),
        modalHTML: ko.observable(''),
        modal: {
            firstClass: ko.observable(false),
            lastClass: ko.observable(false),
            modalExpandFirst: function(element) {
                this.modal.lastClass(false);
                var current = this.modal.firstClass();
                this.modal.firstClass((current) ? false : true);
            },
            modalExpandLast: function(element) {
                this.modal.firstClass(false);
                var current = this.modal.lastClass();
                this.modal.lastClass((current) ? false : true);
            }
        },
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
                'Components',
                'Extenders',
                'Custom Bindings',
                'Others Important Operations',
            ]),
            formatedIndexes: function(item) {
                return '"' + item + '"';
            },
        },
        slide3: {
            title: ko.observable('Components'),
            componentName: 'call',
            openComponent: function() {
                this.isModalOpened(true);
                this.modalVM(callVM);
                this.modalHTML(callHTML);
            }
        },
        slide4: {
            title: ko.observable('Extenders'),
            link: 'http://knockoutjs.com/documentation/extenders.html'
        },
        slide5: {
            title: ko.observable('Custom Bindings')
        },
        slide6: {
            title: ko.observable('Others Important Operations')
        },
        slide7: {
            title: "Sim, já acabou jéssica!"
        }
    }

    VM.slideController.currentSlide.subscribe(function(value) {
        VM.isModalOpened(false);

        let title = (VM['slide'+value] && VM['slide'+value].title) || 'KnockoutJS';
        if(typeof title == 'function') title = title();
        document.title = title;
    });

    VM.isModalOpened.subscribe(function(value) {
        if(value) return;
        VM.modal.firstClass(false);
        VM.modal.lastClass(false);
    })

    document.body.addEventListener("keyup", event => {
        if(event.keyCode == 27 && VM.isModalOpened()) {
            VM.isModalOpened(false);
        }
    });

    ko.components.register(VM.slide3.componentName, {
        viewModel: { require: '../components/call'},
        template: { require: 'text!../components/call.html'}
    });

    ko.bindingHandlers.clickWithCtrl = {
        init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {
            let callback = valueAccessor();
            if(typeof callback != 'function') return;

            element.addEventListener("click", event => {
                if(!event.ctrlKey) return;
                callback.call(viewModel, element);
            });
        },
        update: (element, valueAccessor, allBindings, viewModel, bindingContext) => {
            // update logic
        }
    };

    ko.applyBindings(VM, document.getElementById('app'));

    slideController(VM.slideController);
});