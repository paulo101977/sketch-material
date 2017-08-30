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
    var styleText = MD.sharedTextStyle(BUTTON_STYLES.textStyle);
    if(styleText != 0) target.setStyle(styleText);

    var bgStyle = MD.sharedLayerStyle(BUTTON_STYLES.bgStyle);
    if(bgStyle != 0) buttonBg.setStyle(MD.sharedLayerStyle(BUTTON_STYLES.bgStyle));

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

    var pickedStyle = {
      bg: MD.sharedLayerStyle("…chip-bg", MD.hexToNSColor('E0E0E0', 1)),
      text: MD.sharedTextStyle("..BUTTON-TEXT-ICON", MD.hexToNSColor('D82482', 1)),
      symbol: 'dark'
    }

    //get oi size similar to sketch
    if(buttonType[0] == 'primary'){
      width = 344;
      height = 54;
    }
    else if(buttonType[1] == 'icon'
      || buttonType[1] == '-icon'
      || buttonType[1] == 'select'){
      width = 168;
      height = 72;
    }
    else if(buttonType[0] == 'secundary'){
      width = 146;
      height = 36;
    }
    else {
      //width = width + BUTTON_STYLES.marginRight + BUTTON_STYLES.marginLeft;
      //height = height + BUTTON_STYLES.marginTop + BUTTON_STYLES.marginBottom;
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

    /*var targetSymbols = this.document.documentData().allSymbols();
    for (var j = 0; j < targetSymbols.count(); j++) {
        var targetSymbol = targetSymbols.objectAtIndex(j);
        //if (targetSymbol.name().isEqualToString(symbolName)) {
            //return targetSymbol;
        //}
        log(targetSymbol.name())
        log('\n')
    }*/

    log('self.document')
    log(self.document.documentData().allSymbols())

    var basket = MD.findSymbolByName('ic_shopping_basket_black_24px');
    var buttonBasket = basket.newSymbolInstance();

    MD.getRect(buttonBasket).setX(targetRect.x + 12);
    MD.getRect(buttonBasket).setY(targetRect.y + 4);

     MD.findSymbolByName('');

    if(buttonType[1] == 'icon') {
      target.setStyle(pickedStyle.text);
      buttonGroup.addLayers([buttonBg, target, buttonBasket])
    }
    else buttonGroup.addLayers([buttonBg, target]);
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
