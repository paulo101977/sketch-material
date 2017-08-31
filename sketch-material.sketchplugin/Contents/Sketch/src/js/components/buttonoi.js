MD['ButtonOi'] = function () {

  // Globals
  var self = MD,
    selection = MD.context.selection;

  // Functions
  var _generateButtons;

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

  _makeButtons = function (target, buttonType) {
    var BUTTON_STYLES = _getStyles(buttonType);
    var buttonGroup = MD.addGroup('button'),
      buttonBg = MD.addShape(),
      buttonText = MD.addText();

    var name = '';

    buttonGroup.setName('button–' +
        (buttonType[0] + '' +  buttonType[1]).toLowerCase().split(' ').join(''));

    name = 'button–' +
        (buttonType[0] + '' +  buttonType[1]).toLowerCase().split(' ').join('');

    //remote unecessary text on string
    if(buttonType[1]) buttonType[1] = buttonType[1] + '';
    if(buttonType[1].indexOf('-') != -1) buttonType[1] = buttonType[1].split('-')[1];

    //get oi size similar to sketch
    if(buttonType[0] == 'primary'){
      width = 344;
      height = 54;
    }
    else if(buttonType[1] == 'icon'
      || buttonType[1] == '-icon'
      || buttonType[1] == '-select'
      || buttonType[1] == 'select'){
      width = 168;
      height = 72;
    }
    else if(buttonType[0] == 'secundary'){
      width = 146;
      height = 36;
    }
    else {
      width = 168;
      height = 72;
    }

    buttonBg.layers().firstObject().setCornerRadiusFromComponents("2")


    var icon;
    var button;

    if(buttonType[1] == 'icon'){
      icon = MD.findSymbolByName('ic_button_icon');
    }
    else if(buttonType[0] == 'secundary' && buttonType[1] == 'secundary'){
      icon = MD.findSymbolByName('ic_button_secundary');
    }
    else if(buttonType[0] == 'primary' && buttonType[1] == 'primary'){
      icon = MD.findSymbolByName('ic_button_primary');
    }
    else if(buttonType[1] == 'disabled'){
      icon = MD.findSymbolByName('ic_button_primary_disabled');
    }
    else if(buttonType[1] == 'select'){
      icon = MD.findSymbolByName('ic_button_select');
    }

    if(icon && icon != 0){
      button = icon.newSymbolInstance();
      button.setName(name);
      MD.getRect(button).setX(buttonGroup.x + 12);
      MD.getRect(button).setY(buttonGroup.y + 4);
    }


    MD.current.addLayers([button]);


  }

  _generateButtons = function (type) {
    var buttonType = type.split(',');
    MD.import('buttonoi');

    _makeButtons(null, buttonType);

  }

  return {
    generateButtons: _generateButtons
  }
};
