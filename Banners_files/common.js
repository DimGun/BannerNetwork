// Generated by CoffeeScript 1.6.3
(function() {
  var $window, areLanguagesVisible, body, bottom, content, fileInputs, formModal, forms, languages, navigation, resizeContent, search, toggle, top,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $window = $(window);

  languages = $(".header-languages");

  areLanguagesVisible = null;

  $window.resize(_.throttle(function() {
    if (languages.attr('style')) {
      languages.removeAttr('style');
    }
    return areLanguagesVisible = languages.is(':visible');
  }, 500));

  toggle = $(".header-toggle");

  navigation = $(".navigation, .subnavigation");

  toggle.click(function(event) {
    var isNavigationVisible;
    event.preventDefault();
    isNavigationVisible = navigation.is(':visible');
    return navigation.fadeToggle('fast', function() {
      if (isNavigationVisible) {
        navigation.css({
          display: ''
        });
      }
      return setTimeout(function() {
        return resizeContent();
      });
    });
  });

  body = $('body');

  if (body.hasClass('is-flexible')) {
    top = $(".top");
    bottom = $(".bottom");
    content = $(".content");
    resizeContent = _.throttle(function(isFirst) {
      if (isFirst == null) {
        isFirst = false;
      }
      return content.animate({
        top: top.height(),
        bottom: bottom.height() + 1
      }, !isFirst ? 100 : 0);
    }, 300);
    resizeContent(true);
    $window.resize(function() {
      return resizeContent();
    });
  }

  forms = $(".form");

  fileInputs = forms.find(":file");

  fileInputs.on('mousedown mouseup mouseout', function(event) {
    var button, fileInput;
    fileInput = $(this);
    button = fileInput.parent().children('button');
    return button[event.type === 'mousedown' ? 'addClass' : 'removeClass']('is-active');
  });

  fileInputs.change(function() {
    var fileInput, fileInputFilename, filename;
    fileInput = $(this);
    fileInputFilename = fileInput.parent().children('.form-input-file-name');
    filename = fileInput.val().match(/[^\\/]*$/)[0];
    return fileInputFilename.text(filename);
  });

  forms.each(function() {
    var form, formTextInputs;
    form = $(this);
    formTextInputs = form.find(":text, textarea");
    form.submit(function(event) {
      var hasErrors;
      form = $(this);
      hasErrors = false;
      formTextInputs.each(function() {
        var formTextInput;
        formTextInput = $(this);
        if (!formTextInput.val()) {
          formTextInput.addClass('has-error');
          return hasErrors = true;
        } else {
          return formTextInput.removeClass('has-error');
        }
      });
      if (hasErrors) {
        return event.preventDefault();
      }
    });
    return formTextInputs.focus(function() {
      var formTextInput;
      formTextInput = $(this);
      return formTextInput.removeClass('has-error');
    });
  });

  search = location.search;

  search = search.replace(/^\?/, '');

  if (__indexOf.call(search.split('&'), "result=1") >= 0) {
    formModal = $(".form-modal");
    formModal.modal();
  }

}).call(this);

/*
//@ sourceMappingURL=common.map
*/
