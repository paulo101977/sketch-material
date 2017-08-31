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

    //set the style from sketch
    //var styleText = MD.sharedTextStyle(BUTTON_STYLES.textStyle);
    //if(styleText != 0) target.setStyle(styleText);

    //var bgStyle = MD.sharedLayerStyle(BUTTON_STYLES.bgStyle);
    //if(bgStyle != 0) buttonBg.setStyle(MD.sharedLayerStyle(BUTTON_STYLES.bgStyle));

    var text = target.stringValue();
    buttonGroup.setName('button–' + text.toLowerCase().split(' ').join(''));


    var buttonBgRect = MD.getRect(buttonBg);

    targetRect = MD.getRect(target);

    buttonBgRect.setX(targetRect.x);
    buttonBgRect.setY(targetRect.y);

    var width = targetRect.width;
    var height = targetRect.height;

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

    buttonBgRect.setWidth(width);
    buttonBgRect.setHeight(height);

    target.setStringValue(text.toUpperCase());

    buttonBg.layers().firstObject().setCornerRadiusFromComponents("2")

    //center text
    targetRect.setX(targetRect.x + (width/2 - targetRect.width/2));
    targetRect.setY(targetRect.y +(height/2 - targetRect.height/2));


     //MD.findSymbolByName('');

    var icon;

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
      log('icon')
      log(icon)
      var button = icon.newSymbolInstance();

      log('button name')
      log(button.name())

      MD.getRect(button).setX(targetRect.x + 12);
      MD.getRect(button).setY(targetRect.y + 4);
      //target.setStyle(pickedStyle.text);
      buttonGroup.addLayers([button])
    }

    buttonGroup.resizeToFitChildrenWithOption(0);

    target.select_byExpandingSelection(false, false);
    buttonGroup.select_byExpandingSelection(true, true);

    MD.current.addLayers([buttonGroup]);

    MD.current.removeLayer(target);

  }

  _generateButtons = function (type) {
    var buttonType = type.split(',');
    MD.import('buttonoi');

    if (selection.count() <= 0) {
      MD.message("Select a text layer to make button");
      return false;
    }

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      _makeButtons(target, buttonType);
    }
  }

  return {
    generateButtons: _generateButtons
  }
};
