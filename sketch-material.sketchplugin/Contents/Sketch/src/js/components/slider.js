MD['SliderOi'] = function () {

  // Globals
  var self = MD,
    selection = MD.context.selection;

  // Functions
  var _generateSlider;

  _getStyles = function (buttonType) {
    var textStyle = '..BUTTON-TEXT-PRIMARY', padding = 8;


    if (buttonType[0] == 'secundary') {
      textStyle = "..BUTTON-TEXT-SECUNDARY";
      padding = 16;
    }

    if (buttonType[0] == 'primary') {
      textStyle = "..BUTTON-TEXT-PRIMARY";
      padding = 16;
    }

    if (buttonType[1] == 'disabled') {
      textStyle = "..BUTTON-TEXT-DISABLED";
    }

    if (buttonType[1] == 'icon') {
      textStyle = "..BUTTON-TEXT-ICON";
    }

    buttonType[1] = buttonType[1] ? "-" + buttonType[1] : '';

    log('_getStyles')
    log('button, ' + '..button-' + buttonType[0] + buttonType[1] + '-bg\n')
    log('style, ' + textStyle + '\n')

    return {
      bgStyle: '..button-' + buttonType[0] + buttonType[1] + '-bg',
      textStyle: textStyle,
      marginRight: padding,
      marginLeft: padding,
      marginTop: 10,
      marginBottom: 10
    }
  }

  _makeSlider = function (target, buttonType) {
    //var BUTTON_STYLES = _getStyles(buttonType);
    var sliderGroup = MD.addGroup('button'),
      sliderBg = MD.addShape(),
      buttonText = MD.addText();

    var name = '';

    sliderGroup.setName('slider-oi');

    name = 'slider-oi';

    sliderBg.layers().firstObject().setCornerRadiusFromComponents("2")


    var icon = MD.findSymbolByName('ic_slider_component');
    var slider;


    if(icon && icon != 0){
      slider = icon.newSymbolInstance();
      slider.setName(name);
      MD.getRect(slider).setX(sliderGroup.x + 12);
      MD.getRect(slider).setY(sliderGroup.y + 4);
    }


    MD.current.addLayers([slider]);


  }

  _generateSlider = function (type) {
    MD.import('slideroi');

    _makeSlider(null);

  }

  return {
    generateSlider: _generateSlider
  }
};
