/*
ChartThrobMod is the modification of the original
ChartThrob script,a Photoshop-based tool for creating
and managing digital negatives/positives for many
alternative processes such as platinum printing,
ambrotype, cyanotype, gumoil, etc.

https://github.com/chainick/ChartThrobMod
Dmitry Chainick <dmitry.chainick@gmail.com>

*/

/* jshint ignore:start */
#target photoshop
app.bringToFront();
/* jshint ignore:end */



// global values
var gVersion = 1.15;
var gTitle = 'ChartThrobMod ' + gVersion;
var gDate = {en: '3 April 2021',
             ru: '3 апреля 2021'};

// Script stores the current locale in the variable $.locale
// The value null is set for using the locale of Photoshop
// You can use also other values such as 'en', 'ru', etc.
// For more info see loc_* variables
// $.locale = 'ru'; // try to use Russian translation
$.locale = null; // restore to the locale of the app


//------------------------
// Localized string values
//------------------------

// Localized strings for function userDialog
    var loc_UsrDlgPnlBuildNew = {en:'New Chart',
                                 ru:'Новая шкала'};
 var loc_UsrDlgPnlBuildNewTip = {en:'Use these controls when creating a new, positive chart for test-printing',
                                 ru:'Используйте данные элементы при создании позитива новой шкалы для пробной печати'};
    var loc_UsrDlgEditNewName = {en:'Document Name:',
                                 ru:'Имя документа:'};
   var loc_UsrDlgChartNameDef = {en:'New Chart',
                                 ru:'Новая шкала'};
 var loc_UsrDlgEditNewNameTip = {en:'New Document Name',
                                 ru:'Имя нового документа'};
      var loc_UsrDlgEditLabel = {en:'Chart Title:',
                                 ru:'Заголовок шкалы:'};
   var loc_UsrDlgEditLabelTip = {en:'Title on the image of New Chart',
                                 ru:'Заголовок на изображении новой шкалы'};
      var loc_UsrDlgChckBxDpi = {en:'Resolution (dpi):',
                                 ru:'Разрешение (dpi):'};
   var loc_UsrDlgChckBxDpiTip = {en:'DPI for New Chart (charts can be resized without harm)',
                                 ru:'Разрешение изображения новой шкалы (доступно для последующего изменения)'};

  var loc_UsrDlgChckBxNumbers = {en:'Numbers',
                                 ru:'Числовые значения'};
var loc_UsrDlgChckBxNumbersTip= {en:'Label Patch Values (Slows-down generation considerably)?',
                                 ru:'Отобразить числовые значения в каждой области (значительно увеличивает время работы)'};
 var loc_UsrDlgChckBxOutlines = {en:'Outlines',
                                 ru:'Границы областей'};
var loc_UsrDlgChckBxOutlinesTip={en:'Draw Patch Borders?',
                                 ru:'Отобразить границы областей'};

       var loc_UsrDlgBtnBuild = {en:'Build New Chart',
                                 ru:'Построить шкалу'};
    var loc_UsrDlgBtnBuildTip = {en:'Build New Chart Document',
                                 ru:'Построить шкалу в новом документе'};
///
     var loc_UsrDlgPnlAnalyze = {en:'Chart Analyze',
                                 ru:'Анализ шкалы'};
  var loc_UsrDlgPnlAnalyzeTip = {en:'Analyze Options for Scanned Chart',
                                 ru:'Опции анализа изображения отсканированной шкалы'};

  var loc_UsrDlgChckBxSamples = {en:'Display Sample Areas',
                                 ru:'Отобразить образцы'};
var loc_UsrDlgChckBxSamplesTip= {en:'Keep the Averaged Samples Around, and Outline Them',
                                 ru:'Отобразить на шкале усредненные образцы (в новом документе)'};
   var loc_UsrDlgChckBxNegOut = {en:'Negate Output Curve',
                                 ru:'Обратить кривую'};
var loc_UsrDlgChckBxNegOutTip = {en:'Negate final output curve, say to use as a QTR input',
                                 ru:'Обратить полученную кривую, например, для использования в QTR'};
        var loc_UsrDlgChckLog = {en:'Display Detailed Log',
                                 ru:'Отобразить детали'};
     var loc_UsrDlgChckLogTip = {en:'Display detailed service log in the report window',
                                 ru:'Отобразить детали в окне отчета'};
    var loc_UsrDlgStxtDocName = {en:'Document: %1',
                                 ru:'Документ: %1'};
 var loc_UsrDlgStxtDocNameTip = {en:'Analyzed document name',
                                 ru:'Имя анализируемого документа'};
     var loc_UsrDlgBtnAnalyze = {en:'Analyze',
                                 ru:'Анализировать шкалу'};
  var loc_UsrDlgBtnAnalyzeTip = {en:'Run analysis on scanned chart',
                                 ru:'Выполнить анализ отсканированного изображения шкалы (%1)'};
///
      var loc_UsrDlgBtnCancel = {en:'Cancel',
                                 ru:'Отмена'};
   var loc_UsrDlgBtnCancelTip = {en:'Close window',
                                 ru:'Закрыть окно'};
        var loc_UsrDlgBtnHelp = {en:'Help',
                                 ru:'Справка'};
     var loc_UsrDlgBtnHelpTip = {en:'Get ChartThrobMod Help!',
                                 ru:'Краткая справка ChartThrobMod'};
        var loc_UsrDlgBtnDone = {en:'Done',
                                 ru:'Готово'};

    var loc_UsrDlgAlertOddDpi = {en:'Odd dpi reset to 72 from %1',
                                 ru:'Пользовательское значение %1 dpi будет увеличено до 72 dpi'}; //

   var loc_UsrDlgCurveNameDef = {en:'Print Curve',
                                 ru:'Кривая печати'};
   var loc_UsrDlgCurveNameNeg = {en:'Negative Curve',
                                 ru:'Обращенная кривая'};

// Localized strings for function helpDialog
          var loc_HlpDlgTitle = {en:'%1 - Help',
                                 ru:'%1 - Справка'};
         var loc_HlpDlgLine01 = {en:'ChartThrobMod is a tool for preparing digital images ',
                                 ru:'ChartThrobMod - инструмент для подготовки цифровых изображений,'};
         var loc_HlpDlgLine02 = {en:'use in alternative processes.',
                                 ru:'используемых в альтернативных фотопроцессах.'};

         var loc_HlpDlgLine03 = {en:'Using the ChartThrobMod script, you can both make test charts',
                                 ru:'При помощи ChartThrobMod выполняется, как построение тестовой'};
         var loc_HlpDlgLine04 = {en:'for your own specific printing process, and profile the printed',
                                 ru:'шкалы для печати, так и профилирование ее фотоотпечатка.'};
         var loc_HlpDlgLine05 = {en:'results. ChartThrobMod can correct for both paper color and',
                                 ru:'ChartThrobMod учитывает цвет бумаги, а также цвет, характерный'};
         var loc_HlpDlgLine06 = {en:'process color, providing you with predictable printing.',
                                 ru:'для фотопроцесса, обеспечивая предсказуемую печать.'};

         var loc_HlpDlgLine07 = {en:'Normally, you need to run ChartThrobMod at least TWICE:',
                                 ru:'Как правило, ChartThrobMod запускается дважды:'};
         var loc_HlpDlgLine08 = {en:'Once to create a chart and once to analyze a print',
                                 ru:'первый раз для создания шкалы, и второй раз - для анализа'};
         var loc_HlpDlgLine09 = {en:'of that chart.',
                                 ru:'фотоотпечатка.'};

         var loc_HlpDlgLine11 = {en:'Steps:',
                                 ru:'Шаги:'};
         var loc_HlpDlgLine12 = {en:'1. Create a new (positive) chart using ChartThrobMod.',
                                 ru:'1. Создать новую шкалу (позитив) с помощью ChartThrobMod.'};
         var loc_HlpDlgLine13 = {en:'2. Print a chart (positive&&negative, depending on the process).',
                                 ru:'2. Распечатать шкалу (позитив или негатив, в зависимости от процесса).'};
         var loc_HlpDlgLine14 = {en:'3. Contact print using your process of choice.',
                                 ru:'3. Выполнить контактную печатью, выбранным процессом.'};
         var loc_HlpDlgLine15 = {en:'4. Scan the resulting positive.',
                                 ru:'4. Отсканировать полученный позитив фотоотпечатка.'};
         var loc_HlpDlgLine16 = {en:'5. Crop the scan to the original bounds of the chart.',
                                 ru:'5. Обрезать отсканированное изображение до исходных границ шкалы.'};
         var loc_HlpDlgLine17 = {en:'6. Evaluate the scanned chart using ChartThrobMod.',
                                 ru:'6. Выполнить анализ отсканированной шкалы с помощью ChartThrobMod.'};
         var loc_HlpDlgLine18 = {en:'7. Save the resulting Photoshop Curve.',
                                 ru:'7. Сохранить полученную кривую Photoshop.'};
         var loc_HlpDlgLine19 = {en:'8. Apply this curve to any B&W image you want to print',
                                 ru:'8. Применить кривую к любому черно-белому изображению,'};
         var loc_HlpDlgLine20 = {en:'using digital copy. Their tonal ranges will be',
                                 ru:'перед печатью его цифровой копии. Итоговый тональный диапазон'};
         var loc_HlpDlgLine21 = {en:'mapped directly to the optimal range for your process.',
                                 ru:'будет соответствовать диапазону используемого процесса.'};

         var loc_HlpDlgLine22 = {en:'ChartThrobMod can be used for platinum/palladium, cyanotype,',
                                 ru:'ChartThrobMod может применяться для таких процессов, как'};
         var loc_HlpDlgLine23 = {en:'silver printing, bromoils, etc.',
                                 ru:'амбротипия, цианотипия, платиновая печать, и многих других.'};

         var loc_HlpDlgLine24 = {en:'Remember, for repeatable results, your printing process',
                                 ru:'Помните, что для получения повторяемых результатов, процесс'};
         var loc_HlpDlgLine25 = {en:'should be repeatable. Follow the same printing steps and',
                                 ru:'печати также должен быть повторяемым. Каждый раз при печати, порядок'};
         var loc_HlpDlgLine26 = {en:'timings each time, use the same kind of paper, and',
                                 ru:'и длительность операций, а также тип используемой бумаги, должны быть'};
         var loc_HlpDlgLine27 = {en:'expose/develop uniformly across the entire paper',
                                 ru:'одними и теми же. Экспозиция и проявка должны выполняться равномерно'};
         var loc_HlpDlgLine28 = {en:'(at least when printing a chart).',
                                 ru:'по всей поверхности бумаги (по крайней мере, при печати шкалы).'};

         var loc_HlpDlgLine29 = {en:'About',
                                 ru:'О программе'};
         var loc_HlpDlgLine30 = {en:'Current version:',
                                 ru:'Текущая версия:'};
         var loc_HlpDlgLine31 = {en:'Download and Help:',
                                 ru:'Загрузка и справка:'};
         var loc_HlpDlgLine32 = {en:'Original Program: Kevin Bjorke,',
                                 ru:'Оригинальная версия: Кевин Бьорке,'};
         var loc_HlpDlgLine33 = {en:'Original Chart Design: Thomas Howard,',
                                 ru:'Оригинальный дизайн шкалы: Томас Ховард,'};
     var loc_HlpDlgVerRealise = {en:'%1, release %2',
                                 ru:'%1, выпуск %2'};


// Localized strings for function grayValues
  var loc_UsrDlgAlertPprColor = {en:'Paper base color: [%1,%2,%3]',
                                 ru:'Цвет бумаги: [%1,%2,%3]'}; //
var loc_UsrDlgAlertPprColorIdn= {en:'Paper base color was identified as [%1,%2,%3]\nwhich is unusually dark.\nPerhaps you accidentally scanned a negative image of the chart.\nBe sure to scan a positive print',
                                 ru:'Цвет бумаги определен как темный - [%1,%2,%3],\nчто вряд ли возможно.\nСкорее всего, вместо позитива был отсканирован негатив шкалы.\nУбедитесь, что анализируется позитивное изображение шкалы'}; //

// Localized strings for function determineDynamicRange
  var loc_UsrDlgAlertDynRange = {en:'Dynamic range is (%1) - [%2 to %3]',
                                 ru:'Динамический диапазон: (%1) - [%2 ... %3]'};
    var loc_UsrDlgAlertErrRng = {en:'Error - Bogus dynamic range Blank or inverted scan?',
                                 ru:'Ошибка: Фиктивный динамический диапазон (%1)\n[%2 ... %3]\nВозможно, изображение пусто или является негативом?'}; //
     var loc_dtrDynRngSmpVals = {en:'Sample Values',
                                 ru:'Измеренные значения'};
     var loc_dtrDynRngNrmVals = {en:'Normalized Values',
                                 ru:'Нормализованные значения'};
        var loc_dtrDynRngS100 = {en:'Sample %1 is %2',
                                 ru:'%1-й образец: %2'};

// Localized strings for function findValueThatGives
  var loc_UsrDlgAlertErrAbove = {en:'Sample values start above %1, sorry. Lowest was %2\nPlease report this error to bjorke@botzilla.com',
                                 ru:'Анализируемые образцы начинаются со значения %1.\nНаиболее низким было значение %2.\nПожалуйста, сообщите о данной ошибке по адресу bjorke@botzilla.com'};
  var loc_UsrDlgAlertErrBelow = {en:'Sample values never reach %1, sorry.\nHighest was %2\nPlease report this error to bjorke@botzilla.com',
                                 ru:'Анализируемые образцы никогда не достигают значения %1.\nНаиболее высоким было значение %2.\nПожалуйста, сообщите о данной ошибке по адресу bjorke@botzilla.com'};
       var loc_UsrDlgAlertRtn = {en:'Returning %1 from %2, index %3 (%4/%5)',
                                 ru:'Возвращение %1 из %2, индекс %3 (%4/%5)'};

// Localized strings for function patchStrip
// alert('No colors for new strip');

// Localized strings for function verifyCurve
var loc_UsrDlgAlertInvalidCrv = {en:'Invalid curve values!\nNon-progressive values...\nIs this image really a scanned chart?\nHas it been cropped properly?',
                                 ru:'Недопустимые значения кривой!\nЗначения определены как непоследовательные...\nДействительно ли данное изображение является отсканированной шкалой?\nИзображение обрезано верно?'};

// Localized strings for function curveLayer
 var loc_UsrDlgAlertUnableCrv = {en:'Unable to complete curve layer --\n'+'Try converting your scan to "RGB Color" using the "Image->Mode"\n'+'menu, then run ChartThrobMod again.',
                                 ru:'Невозможно завершить построение кривой.\nПопробуйте преобразовать отсканированное изображение в RGB-модель.\nДля этого выполните команду Изображение->Режим,\nи запустите ChartThrobMod еще раз.'};

// Localized strings for function scanResultsReport
           var loc_RptDlgText = {en:'%1 Report',
                                 ru:'%1 - Отчет'};
         var loc_RptDlgLine01 = {en:'ChartThrobMod Scan Analysis Complete.',
                                 ru:'Анализ изображения завершен.'};
         var loc_RptDlgLine02 = {en:'See the hidden "%1" Layer?',
                                 ru:'В палитре слоев создан корректирующий слой "%1".'};
         var loc_RptDlgLine03 = {en:'You can save this curve to disk for later use, or drag ',
                                 ru:'Чтобы использовать кривую в будущем, сохраните ее в файл'};
         var loc_RptDlgLine04 = {en:'the "%1" layer onto any other positive',
                                 ru:'или перетащите слой "%1" на любое позитивное'};
         var loc_RptDlgLine05 = {en:'B&&W image before printing a digital image.',
                                 ru:'черно-белое изображение и выполните печать.'};
         var loc_RptDlgLine06 = {en:'Lightest scan value was @ sample %1',
                                 ru:'Наиболее светлое значение образца: %1'};
         var loc_RptDlgLine07 = {en:'Darkest scan value was @ sample %1',
                                 ru:'Наиболее темное значение образца: %1'};
         var loc_RptDlgPnlLog = {en:'Detailed log',
                                 ru:'Детали'};

        var loc_RptDlgTextNeg = {en:'Negated Curve',
                                 ru:'Обращенная кривая'};
         var loc_RptDlgLine11 = {en:'The curve was negated (inverted), as you requested.',
                                 ru:'Кривая была обращена (инвертирована), как и указывалось.'};
        var loc_RptDlgTextSug = {en:'Suggestion:',
                                 ru:'Совет'};
         var loc_RptDlgLine13 = {en:'While the current curves are valid, you may want ',
                                 ru:'Пока текущие кривые действительны, выполните повторную'};
         var loc_RptDlgLine14 = {en:'to reprint this chart with a %1 exposure time,',
                                 ru:'печать с %1 экспозицией, чтобы выровнять средние '}; //
         var loc_RptDlgLine15 = {en:'to align mid-tones and optimal paper response.',
                                 ru:'тона и получить оптимальный отклик бумаги. Затем повторите '};
         var loc_RptDlgLine16 = {en:'Then scan & analyze the new %1-exposed chart print.',
                                 ru:'процедуру для нового (%1 проэкспонированного) отпечатка.'}; //
            var loc_RptDlgDec = {en:'decreased',
                                 ru:'меньшей'};
           var loc_RptDlgLess = {en:'less',
                                 ru:'менее'};
            var loc_RptDlgInc = {en:'increased',
                                 ru:'большей'};
           var loc_RptDlgMore = {en:'more',
                                 ru:'более'};

// Localized strings for function scanChart
    var loc_ScnChrtAlertNoDoc = {en:'Sorry, No Current Document\nTo use this script, crop a scanned print to the\noriginal chart boundaries.\nThe script will generate a correction curves layer\nthat will linearize the values of the scanned chart.\nUse this new curve to correct for the printing process\nwhen creating digital contact-printing negatives.',
                                 ru:'Текущий документ отсутствует\nЧтобы использовать данный сценарий, обрежьте отсканированный\nотпечаток до границ оригинальной шкалы.\nСценарий создаст корректирующий слой кривых, который\nлинеаризует значения отсканированной шкалы.\nИспользуйте данную кривую для корректировки процесса печати\nпри создании цифровых негативов для контактной печати.'};
       var loc_ScnChrtSmplDoc = {en:'ChartThrobMod_Samples',
                                 ru:'ChartThrobMod - Области образцов'};
    var loc_ScnChrtSmplDocSrc = {en:'Made from "%1" by ChartThrobMod.jsx',
                                 ru:'Создано из %1 при помощи ChartThrobMod.jsx'};
  var loc_ScnChrtAlertUnblCnv = {en:'Unable to convert the duplicate image\nto mode "%1" --\nTry converting your scan to "RGB Color"\nusing the "Image->Mode"\nmenu, then run ChartThrobMod again.',
                                 ru:'Не удается преобразовать копию изображения\nв режиме "%1". Попробуйте преобразовать\nотсканированное изображение в RGB-модель.\nДля этого выполните команду Изображение->Режим\nи запустите ChartThrobMod еще раз.'};//
   var loc_ScnChrtAlertNotVal = {en:'Sorry, not enough samples had values to estimate a curve',
                                 ru:'К сожалению, для оценки кривой недостаточно образцов.'};
      var loc_ScnChrtTitleLog = {en:'Cell / Center / Color RGB:',
                                 ru:'Ячейка / Центр / Цвет RGB:'};


// Localized strings for function buildChart
        var loc_BldChrtLine01 = {en:'More info: https://github.com/chainick/ChartThrobMod',
                                 ru:'Информация: https://github.com/chainick/ChartThrobMod'};
        var loc_BldChrtLine02 = {en:'Original Program: Kevin Bjorke, http://www.botzilla.com',
                                 ru:'Оригинальная версия: Кевин Бьорке, http://www.botzilla.com'};
        var loc_BldChrtLine03 = {en:'Original Chart Design: Thomas Howard, http://luminaryarts.com',
                                 ru:'Оригинальный дизайн шкалы: Томас Ховард, http://luminaryarts.com'};
        var loc_BldChrtLine04 = {en:'THIS IS A POSITIVE IMAGE WITH DARK TEXT ON WHITE',
                                 ru:'ЭТО ПОЗИТИВНОЕ ИЗОБРАЖЕНИЕ С ТЕМНЫМ ТЕКСТОМ НА БЕЛОМ ФОНЕ'};

// Localized strings for progress bar
  var loc_prgsDlgCrtMainTitle = {en:'%1 - Creating main chart (1/3)',
                                 ru:'%1 - Построение основной шкалы (1/3)'};
  var loc_prgsDlgCrtSideTitle = {en:'%1 - Creating right side chart (2/3)',
                                 ru:'%1 - Построение боковой шкалы (2/3)'};
   var loc_prgsDlgFinaleTitle = {en:'%1 - Finalizing creating (3/3)',
                                 ru:'%1 - Завершение построения (3/3)'};
     var loc_prgsDlgAnlzTitle = {en:'%1 - Analyzing chart',
                                 ru:'%1 - Анализ шкалы'};
         var loc_progressText = {en:'Processed %1%',
                                 ru:'Выполнено %1%'};

// Localized strings for function addLinkText
          var loc_linkTextTip = {en:'Click to open',
                                 ru:'Нажмите, чтобы открыть ссылку'};


// Enabling automatic localization
$.localize = true;
$.localization = true;

// these widths etc used to generate new charts
var gDPI = 300.0;
var gDPIScale = 1.0;
var gWidth = new UnitValue(1200, 'px');
var gHeight = new UnitValue(1210, 'px');
var gXMarg = new UnitValue(6, 'px');
var gYMarg = new UnitValue(75, 'px');
var gPatch = new UnitValue(100, 'px');
var gStripWidth = new UnitValue(85, 'px');
var gGradWidth = new UnitValue(50, 'px');
var gX21 = gXMarg * 2 + 10 * gPatch;
var gXGrad = gX21 + gStripWidth;
var gXBar = gXGrad + gGradWidth;
var gLabel = gTitle;
var gChartName = loc_UsrDlgChartNameDef;
var gCurveName = loc_UsrDlgCurveNameDef;

var gNoisy = false;
var gLog = new Array();

// some useful colors
var gBLACK = new SolidColor();
gBLACK.rgb.red = 0;
gBLACK.rgb.green = 0;
gBLACK.rgb.blue = 0;

var gWHITE = new SolidColor();
gWHITE.rgb.red = 255;
gWHITE.rgb.green = 255;
gWHITE.rgb.blue = 255;

var gRED = new SolidColor();
gRED.rgb.red = 255.0;
gRED.rgb.green = 0.0;
gRED.rgb.blue = 0.0;

// these fractions used to determine boundaries in scanned charts
var gBorderL = (gXMarg / gWidth);
var gBorderR = (1.0 - ((gXMarg + 10 * gPatch) / gWidth));
var gBorderT = (gYMarg / gHeight);
var gBorderB = (1.0 - ((gYMarg + 11 * gPatch) / gHeight));
var gSampleFraction = 0.55;

// dynamic range of scanned chart
var gMin = 255;
var gMax = 0;
var gDarkestSample = -1;
var gLightestSample = -1;

// runtime on/off flags
var gShowSamples = false;
var gText = false;
var gLines = true;
var gMakeChart = false;
var gNegate = false;

// functions ///////////////

function resetDpi(newDPI) {
    'use strict';
    // these widths etc used to generate new charts
    gDPI = newDPI;
    gDPIScale = newDPI / 300.0;
    gWidth = new UnitValue((gDPIScale * 1200), 'px');
    gHeight = new UnitValue((gDPIScale * 1210), 'px');
    gXMarg = new UnitValue((gDPIScale * 6), 'px');
    gYMarg = new UnitValue((gDPIScale * 75), 'px');
    gPatch = new UnitValue((gDPIScale * 100), 'px');
    gStripWidth = new UnitValue((gDPIScale * 85), 'px');
    gGradWidth = new UnitValue((gDPIScale * 50), 'px');
    gX21 = gXMarg * 2 + 10 * gPatch;
    gXGrad = gX21 + gStripWidth;
    gXBar = gXGrad + gGradWidth;
}


function helpDialog() {
    'use strict';

    // DIALOG
    // ======
    var dialog = new Window('dialog', undefined, undefined, {
        closeButton: true
    });
    dialog.text = localize(loc_HlpDlgTitle, gTitle);
    dialog.orientation = 'column';
    dialog.alignChildren = ['fill', 'top'];
    dialog.spacing = 0;
    dialog.margins = 16;

    // GROUP1
    var group1 = dialog.add('group');
    group1.orientation = 'column';
    group1.alignChildren = ['left', 'center'];
    group1.spacing = 0;
    group1.margins = 0;
    addStaticText(group1, loc_HlpDlgLine01);
    addStaticText(group1, loc_HlpDlgLine02);

    // GROUP2
    var group2 = dialog.add('group');
    group2.orientation = 'column';
    group2.alignChildren = ['left', 'center'];
    group2.spacing = 0;
    group2.margins = [0, 10, 0, 0];
    addStaticText(group2, loc_HlpDlgLine03);
    addStaticText(group2, loc_HlpDlgLine04);
    addStaticText(group2, loc_HlpDlgLine05);
    addStaticText(group2, loc_HlpDlgLine06);

    // GROUP3
    // ======
    var group3 = dialog.add('group');
    group3.orientation = 'column';
    group3.alignChildren = ['left', 'center'];
    group3.spacing = 0;
    group3.margins = [0, 10, 0, 0];
    addStaticText(group3, loc_HlpDlgLine07);
    addStaticText(group3, loc_HlpDlgLine08);
    addStaticText(group3, loc_HlpDlgLine09);

    // GROUP4
    // ======
    var group4 = dialog.add('group');
    group4.orientation = 'column';
    group4.alignChildren = ['fill', 'center'];
    group4.spacing = 0;
    group4.margins = [0, 10, 0, 0];

    // PANEL1
    // ======
    var panel1 = group4.add('panel');
    panel1.text = loc_HlpDlgLine11;
    panel1.orientation = 'column';
    panel1.alignChildren = ['left', 'top'];
    panel1.spacing = 0;
    panel1.margins = 10;
    addStaticText(panel1, loc_HlpDlgLine12);
    addStaticText(panel1, loc_HlpDlgLine13);
    addStaticText(panel1, loc_HlpDlgLine14);
    addStaticText(panel1, loc_HlpDlgLine15);
    addStaticText(panel1, loc_HlpDlgLine16);
    addStaticText(panel1, loc_HlpDlgLine17);
    addStaticText(panel1, loc_HlpDlgLine18);
    addStaticText(panel1, loc_HlpDlgLine19);
    addStaticText(panel1, loc_HlpDlgLine20);
    addStaticText(panel1, loc_HlpDlgLine21);

    // GROUP5
    var group5 = dialog.add('group');
    group5.orientation = 'column';
    group5.alignChildren = ['left', 'center'];
    group5.spacing = 0;
    group5.margins = [0, 10, 0, 0];
    addStaticText(group5, loc_HlpDlgLine22);
    addStaticText(group5, loc_HlpDlgLine23);

    // GROUP6
    var group6 = dialog.add('group');
    group6.orientation = 'column';
    group6.alignChildren = ['left', 'center'];
    group6.spacing = 0;
    group6.margins = [0, 10, 0, 0];
    addStaticText(group6, loc_HlpDlgLine24);
    addStaticText(group6, loc_HlpDlgLine25);
    addStaticText(group6, loc_HlpDlgLine26);
    addStaticText(group6, loc_HlpDlgLine27);
    addStaticText(group6, loc_HlpDlgLine28);

    // GROUP7
    var group7 = dialog.add('group');
    group7.orientation = 'column';
    group7.alignChildren = ['fill', 'center'];
    group7.spacing = 0;
    group7.margins = [0, 10, 0, 0];

    // PANEL2
    var panel2 = group7.add('panel');
    panel2.text = loc_HlpDlgLine29;
    panel2.orientation = 'column';
    panel2.alignChildren = ['left', 'top'];
    panel2.spacing = 0;
    panel2.margins = 10;

    // GROUP8
    var group8 = panel2.add('group');
    group8.orientation = 'row';
    group8.alignChildren = ['left', 'center'];
    group8.spacing = 2;
    addStaticText(group8, loc_HlpDlgLine30);
    var tempText = localize(loc_HlpDlgVerRealise, gTitle, gDate);
    addColorText(group8, tempText, [1, 0, 0]);

    // GROUP9
    var group9 = panel2.add('group');
    group9.orientation = 'row';
    group9.alignChildren = ['left', 'center'];
    group9.spacing = 2;
    addStaticText(group9, loc_HlpDlgLine31);
    addLinkText(group9, 'https://github.com/chainick/ChartThrobMod');

    // GROUP10
    var group10 = panel2.add('group');
    group10.orientation = 'row';
    group10.alignChildren = ['left', 'center'];
    group10.spacing = 2;
    addStaticText(group10, loc_HlpDlgLine32);
    addLinkText(group10, 'http://www.botzilla.com');

    // GROUP11
    var group11 = panel2.add('group');
    group11.orientation = 'row';
    group11.alignChildren = ['left', 'center'];
    group11.spacing = 2;
    addStaticText(group11, loc_HlpDlgLine33);
    addLinkText(group11, 'http://luminaryarts.com');

    // GROUP13
    var group13 = dialog.add('group');
    group13.orientation = 'column';
    group13.alignChildren = ['fill', 'top'];
    group13.spacing = 0;
    group13.margins = [0, 20, 0, 0];

    // GROUP14
    var group14 = group13.add('group');
    group14.orientation = 'row';
    group14.alignChildren = ['center', 'center'];
    group14.spacing = 10;
    group14.margins = 0;

    var okayBtn = group14.add('button');
    okayBtn.text = loc_UsrDlgBtnDone;

    dialog.defaultElement = okayBtn;

    okayBtn.onClick = function() {
        dialog.close();
    };

    dialog.show();
}


function userDialog() {
    'use strict';
    var pw, ph;
    var scannable = true;

    if (app.documents.length < 1) {
        gMakeChart = true;
        scannable = false;
    }

    // DIALOG
    // ======
    var dlg = new Window('dialog', undefined, undefined, {closeButton: true});
    dlg.text = gTitle;
    dlg.orientation = 'row';
    dlg.alignChildren = ['left', 'top'];
    dlg.spacing = 10;
    dlg.margins = 16;

    // LEFT SIDE GROUP
    // ===============
    var grpLeft = dlg.add('group');
    grpLeft.orientation = 'column';
    grpLeft.alignChildren = ['fill', 'top'];
    grpLeft.spacing = 10;
    grpLeft.margins = 0;

    // NEW CHART PANEL
    // ===============
    var pnlNewChart = grpLeft.add('panel');
    pnlNewChart.text = loc_UsrDlgPnlBuildNew;
    pnlNewChart.helpTip = loc_UsrDlgPnlBuildNewTip;
    pnlNewChart.orientation = 'column';
    pnlNewChart.alignChildren = ['fill', 'top'];
    pnlNewChart.spacing = 10;
    pnlNewChart.margins = 10;

    // DOC NAME GROUP
    // ==============
    var grpDocName = pnlNewChart.add('group');
    grpDocName.orientation = 'row';
    grpDocName.alignChildren = ['right', 'center'];
    grpDocName.spacing = 10;
    grpDocName.margins = 0;

    var stxtDocName = addStaticText(grpDocName, loc_UsrDlgEditNewName);
    stxtDocName.helpTip = loc_UsrDlgEditNewNameTip;

    var editDocName = grpDocName.add('edittext');
    editDocName.preferredSize.width = 120;
    editDocName.text = gChartName;
    editDocName.helpTip = loc_UsrDlgEditNewNameTip;

    // CHART LABEL GROUP
    // =================
    var grpChartLabel = pnlNewChart.add('group');
    grpChartLabel.orientation = 'row';
    grpChartLabel.alignChildren = ['right', 'center'];
    grpChartLabel.spacing = 10;
    grpChartLabel.margins = 0;

    var stxtChartLabel = addStaticText(grpChartLabel, loc_UsrDlgEditLabel);
    stxtChartLabel.helpTip = loc_UsrDlgEditLabelTip;

    var editChartLabel = grpChartLabel.add('edittext');
    editChartLabel.preferredSize.width = 120;
    editChartLabel.text = gLabel;
    editChartLabel.helpTip = loc_UsrDlgEditLabelTip;

    // DPI GROUP
    // =========
    var grpDPI = pnlNewChart.add('group');
    grpDPI.orientation = 'row';
    grpDPI.alignChildren = ['right', 'center'];
    grpDPI.spacing = 10;
    grpDPI.margins = 0;

    var stxtDPI = addStaticText(grpDPI, loc_UsrDlgChckBxDpi);
    stxtDPI.helpTip = loc_UsrDlgChckBxDpiTip;

    var editDPI = grpDPI.add('edittext');
    editDPI.preferredSize.width = 120;
    editDPI.text = gDPI;
    editDPI.helpTip = loc_UsrDlgChckBxDpiTip;

    // NUMBERS&OUTLINES GROUP
    // ======================
    var grpNumOut = pnlNewChart.add('group');
    grpNumOut.orientation = 'row';
    grpNumOut.alignChildren = ['center', 'center'];
    grpNumOut.spacing = 10;
    grpNumOut.margins = 0;

    var chbxNumbers = grpNumOut.add('checkbox');
    chbxNumbers.text = loc_UsrDlgChckBxNumbers; //Numbers
    chbxNumbers.helpTip = loc_UsrDlgChckBxNumbersTip;
    chbxNumbers.value = gText;

    var chbxOutlines = grpNumOut.add('checkbox');
    chbxOutlines.text = loc_UsrDlgChckBxOutlines; //Outlines
    chbxOutlines.helpTip = loc_UsrDlgChckBxOutlinesTip;
    chbxOutlines.value = gLines;

    // BUILD BUTTON GROUP
    // ==================
    var grpBuild = pnlNewChart.add('group');
    grpBuild.orientation = 'row';
    grpBuild.alignChildren = ['center', 'center'];
    grpBuild.spacing = 10;
    grpBuild.margins = [0, 10, 0, 0];

    var btnBuild = grpBuild.add('button');
    btnBuild.preferredSize.width = 150;
    btnBuild.name = 'buildNew';
    btnBuild.text = loc_UsrDlgBtnBuild; // Build
    btnBuild.helpTip = loc_UsrDlgBtnBuildTip;

    dlg.defaultElement = btnBuild;

    // scan panel
    if (scannable === true) {

        // ANALYZE CHART PANEL
        // ===================
        var pnlAnalyze = grpLeft.add('panel');
        pnlAnalyze.text = loc_UsrDlgPnlAnalyze; //Analyze Current Chart
        pnlAnalyze.helpTip = loc_UsrDlgPnlAnalyzeTip;
        pnlAnalyze.orientation = 'column';
        pnlAnalyze.alignChildren = ['fill', 'top'];
        pnlAnalyze.spacing = 10;
        pnlAnalyze.margins = [10, 20, 10, 20]; // [left, top, right, bottom]

        var chbxSamples = pnlAnalyze.add('checkbox');
        chbxSamples.text = loc_UsrDlgChckBxSamples;
        chbxSamples.value = gShowSamples;
        chbxSamples.helpTip = loc_UsrDlgChckBxSamplesTip;

        var chbxNegate = pnlAnalyze.add('checkbox');
        chbxNegate.text = loc_UsrDlgChckBxNegOut;
        chbxNegate.value = gNegate;
        chbxNegate.helpTip = loc_UsrDlgChckBxNegOutTip;

        var chbxExcmess = pnlAnalyze.add('checkbox');
        chbxExcmess.text = loc_UsrDlgChckLog;
        chbxExcmess.value = gNoisy;
        chbxExcmess.helpTip = loc_UsrDlgChckLogTip;

        var activDocNameFull = app.activeDocument.name;

        var allowedLen = 30;
        var activDocName = activDocNameFull.length < allowedLen ? activDocNameFull : activDocNameFull.slice(0, allowedLen) + '...';
        var stxtDocName = addStaticText(pnlAnalyze, localize(loc_UsrDlgStxtDocName, activDocName));
        stxtDocName.helpTip = loc_UsrDlgStxtDocNameTip;

        // ANALYZE BUTTON GROUP
        // ====================
        var grpAnalyze = pnlAnalyze.add('group');
        grpAnalyze.orientation = 'row';
        grpAnalyze.alignChildren = ['center', 'center'];
        grpAnalyze.spacing = 10;
        grpAnalyze.margins = [0, 10, 0, 0];

        var btnAnalyze = grpAnalyze.add('button');
        btnAnalyze.text = loc_UsrDlgBtnAnalyze; //Analyze
        btnAnalyze.name = 'analyze';
        btnAnalyze.helpTip = localize(loc_UsrDlgBtnAnalyzeTip, activDocNameFull);
        btnAnalyze.preferredSize.width = 150;

        dlg.defaultElement = btnAnalyze;
    }


    // RIGHT SIDE (BUTTONS) GROUP
    // ==========================
    var grpRight = dlg.add('group');
    grpRight.orientation = 'column';
    grpRight.alignChildren = ['fill', 'top'];
    grpRight.spacing = 10;
    grpRight.margins = 0;

    var btnHelp = grpRight.add('button');
    btnHelp.name = 'help';
    btnHelp.text = loc_UsrDlgBtnHelp;
    btnHelp.helpTip = loc_UsrDlgBtnHelpTip;

    var btnCancel = grpRight.add('button');
    btnCancel.name = 'cancel';
    btnCancel.text = loc_UsrDlgBtnCancel;
    btnCancel.helpTip = loc_UsrDlgBtnCancelTip;

    // need to set close-x to 'cancel'
    dlg.cancelElement = btnCancel;

    btnBuild.onClick = function() {
        gMakeChart = true;
        dlg.close(1);
    };

    if (scannable === true) {
        btnAnalyze.onClick = function() {
            gMakeChart = false;
            dlg.close(1);
        };
    }

    btnHelp.onClick = function() {
        dlg.close(3);
    };

    btnCancel.onClick = function() {
        dlg.close(2);
    };


    var result = dlg.show();

    if ((result === 2) || (result < 1)) {
        return (-1);
    }

    if (result === 3) {
        helpDialog();
        return (-2);
    }

    gText = chbxNumbers.value;
    gLines = chbxOutlines.value;
    gLabel = editChartLabel.text;
    gChartName = editDocName.text;
    var dv = parseInt(editDPI.text);

    if (isNaN(dv)) {
        dv = 72;
    }

    if (dv < 72) {
        alert(localize(loc_UsrDlgAlertOddDpi, dv));
        dv = 72;
    }

    resetDpi(dv);

    // if (app.documents.length > 0) {
    if (scannable === true) {
        gShowSamples = chbxSamples.value;
        gNegate = chbxNegate.value;
        gNoisy = chbxExcmess.value;
        if (gNegate) {
            gCurveName = localize(loc_UsrDlgCurveNameNeg);
        } else {
            gCurveName = localize(loc_UsrDlgCurveNameDef); // it doesn't work without localize
        }
    }
    return 1;
}


function toGray(C) {
    'use strict';
    return ((C.rgb.red + C.rgb.green + C.rgb.blue) / 3.0);
    // return (C.rgb.red*0.2+C.rgb.green*0.7+C.rgb.blue*0.1);
}


function grayValues(ColorSamples) {
    'use strict';
    var graySamp = new Array(ColorSamples.length);
    var paperColor = ColorSamples[0]; // paper tone will be in the first sample
    if (gNoisy) {
        //alert(localize(loc_UsrDlgAlertPprColor, paperColor.rgb.red, paperColor.rgb.green, paperColor.rgb.blue));
        gLog.push(localize(loc_UsrDlgAlertPprColor, paperColor.rgb.red, paperColor.rgb.green, paperColor.rgb.blue));
    }

    if ((paperColor.rgb.red < 128) ||
        (paperColor.rgb.green < 128) ||
        (paperColor.rgb.blue < 128)) {
        alert(localize(loc_UsrDlgAlertPprColorIdn, paperColor.rgb.red, paperColor.rgb.green, paperColor.rgb.blue));
    }

    var g = new SolidColor();
    var nred, ngreen, nblue, s;
    for (var i = 0; i < ColorSamples.length; i++) {
        s = ColorSamples[i];
        nred = 255 * s.rgb.red / paperColor.rgb.red;
        ngreen = 255 * s.rgb.green / paperColor.rgb.green;
        nblue = 255 * s.rgb.blue / paperColor.rgb.blue;
        if (nred > 255) {
            nred = 255;
        }
        if (ngreen > 255) {
            ngreen = 255;
        }
        if (nblue > 255) {
            nblue = 255;
        }
        // alert('s '+i+' rgb is '+s.rgb.red+'/'+s.rgb.green+'/'+s.rgb.blue+'\nResult rgb is '+nred+'/'+ngreen+'/'+nblue);
        g.rgb.red = nred;
        g.rgb.green = ngreen;
        g.rgb.blue = nblue;
        graySamp[i] = toGray(g);
    }
    return graySamp;
}

// show all values as numbers
function showAllGrays(GraySamples, TheText) {
    'use strict';
    var tmp = new Array();
    for (var i = 0; i < GraySamples.length; i++) {
        tmp.push('[' + i + ',' + GraySamples[i].toPrecision(4) + ']');
    }

    //gLog.push(TheText+':');
    tmp[0] = TheText + ':' + tmp[0];
    gLog.push(tmp.join(' '));
}

// look at the list of scanned values, and return a normalized copy
function determineDynamicRange(GraySamples) {
    'use strict';
    gMin = 256;
    gMax = -1;
    var i;
    for (i = 0; i < GraySamples.length; i++) {
        var s = GraySamples[i];

        if (s < 1) {
            if (gNoisy) {
                gLog.push(localize(loc_dtrDynRngS100, i, s));
            }
        }

        if (s <= gMin) {
            gMin = s;
            gDarkestSample = i;
        }

        if (s >= gMax) {
            gMax = s;
            gLightestSample = i;
        }
    }

    var nSamps = new Array(GraySamples.length); // will hold our normalized copies
    var dR = gMax - gMin;

    if (dR < 1) {
        alert(localize(loc_UsrDlgAlertErrRng, dR, gMin, gMax));
        for (i = 0; i < GraySamples.length; i++) { // just return linear values
            nSamps[i] = Math.floor(0.5 + (255.0 * i / (GraySamples.length - 1.0)));
        }
    } else {
        for (i = 0; i < GraySamples.length; i++) {
            nSamps[i] = Math.floor(0.5 + (255.0 * (GraySamples[i] - gMin) / dR));
        }
    }

    if (gNoisy === true) {
        showAllGrays(GraySamples, loc_dtrDynRngSmpVals); //Sample Values
        showAllGrays(nSamps, loc_dtrDynRngNrmVals); // Normalized Values
        //alert(localize(loc_UsrDlgAlertDynRange, dR.toPrecision(5), gMin.toPrecision(5), gMax.toPrecision(5)));
        gLog.push(localize(loc_UsrDlgAlertDynRange, dR.toPrecision(5), gMin.toPrecision(5), gMax.toPrecision(5)));
    }

    return nSamps;
}

// given the original gray value, where along the samples should we place
//  a new grayscale value, so as to get the same thing within the normalized
//  range?
function findValueThatGives(origValue, normalizedSamples) {
    'use strict';
    var lowerVal = -1;
    var L = normalizedSamples.length;
    var i;

    if (origValue === 0) {
        for (i = L - 2; i >= 0; i--) {
            if (origValue < normalizedSamples[i]) {
                i = i + 1;
                lowerVal = normalizedSamples[i];
                break;
            }
        }
    } else {
        for (i = 0; i < L; i++) {
            if (origValue > normalizedSamples[i]) {
                lowerVal = normalizedSamples[i];
                break;
            }
        }
    }

    if (lowerVal < 0) {
        if (origValue === 0) {
            i = L - 1;
            lowerVal = normalizedSamples[i];
        } else {
            // we should never reach here, since the samples are normalized
            alert(localize(loc_UsrDlgAlertErrAbove, origValue, normalizedSamples[L - 1]));
            return -1;
        }
    }
    var n = 0;
    var higherVal;
    if (origValue === lowerVal) {
        n = i; // that was easy
        higherVal = lowerVal;
    } else {
        if (i === 0) {
            // we should never reach here, since the samples are normalized
            alert(localize(loc_UsrDlgAlertErrBelow, origValue, normalizedSamples[0]));
            return -1;
        }
        higherVal = normalizedSamples[i - 1];
        var delta = higherVal - lowerVal;
        // use linear interpolation
        if (delta === 0) {
            // n = i - 1; // higher
            n = i; // lower
        } else {
            var placement = origValue - lowerVal;
            var t = placement / delta;
            n = i - t;
        }
    }
    var s = (255 * (1.0 - (n / (L - 1.0))));
    // alert('To get '+origValue+', we should use '+s+'\ndelta '+delta+' i '+i);
    if (gNoisy) {
        //alert(localize(loc_UsrDlgAlertRtn, s, origValue, i, lowerVal, higherVal));
        gLog.push(localize(loc_UsrDlgAlertRtn, s, origValue, i, lowerVal, higherVal));
    }

    return s;
}

function boundArray(Left, Right, Bottom, Top) {
    'use strict';
    var b = new Array(new Array(Left, Bottom), new Array(Right, Bottom), new Array(Right, Top), new Array(Left, Top));
    return (b);
}

// == new from listener ===
function drawGradient(x1, y1, x2, y2, color1, color2) {
    'use strict';
    var grdnID = charIDToTypeID('Grdn');
    // various IDs
    var hrznID = charIDToTypeID('Hrzn');
    var vrtcID = charIDToTypeID('Vrtc');
    var pxlID = charIDToTypeID('#Pxl');
    var pntID = charIDToTypeID('Pnt ');
    var fromID = charIDToTypeID('From');
    var tID = charIDToTypeID('T   ');
    var typeID = charIDToTypeID('Type');
    var grdtID = charIDToTypeID('GrdT');
    var lnrID = charIDToTypeID('Lnr ');
    var dthrID = charIDToTypeID('Dthr');
    var usmsID = charIDToTypeID('UsMs');
    var gradID = charIDToTypeID('Grad');
    var nmID = charIDToTypeID('Nm  ');
    var grdfID = charIDToTypeID('GrdF');
    var cstsID = charIDToTypeID('CstS');
    var intrID = charIDToTypeID('Intr');
    var clrsID = charIDToTypeID('Clrs');
    var clrID = charIDToTypeID('Clr ');
    var cynID = charIDToTypeID('Cyn ');
    var mgntID = charIDToTypeID('Mgnt');
    var ylwID = charIDToTypeID('Ylw ');
    var blckID = charIDToTypeID('Blck');
    var cmycID = charIDToTypeID('CMYC');
    var clryID = charIDToTypeID('Clry');
    var usrsID = charIDToTypeID('UsrS');
    var id91 = charIDToTypeID('TrnS');
    var mdpnID = charIDToTypeID('Mdpn');
    var prcID = charIDToTypeID('#Prc');
    var id87 = charIDToTypeID('Opct');
    var id86 = charIDToTypeID('TrnS');
    var id82 = charIDToTypeID('Opct');
    var id81 = charIDToTypeID('Trns');
    var id80 = charIDToTypeID('Clrt');
    var id68 = charIDToTypeID('Clrt');
    var lctnID = charIDToTypeID('Lctn');
    // location of gradient
    var desc5 = new ActionDescriptor();
    var desc6 = new ActionDescriptor();
    desc6.putUnitDouble(hrznID, pxlID, x1);
    desc6.putUnitDouble(vrtcID, pxlID, y1);
    desc5.putObject(fromID, pntID, desc6);
    var desc7 = new ActionDescriptor();
    desc7.putUnitDouble(hrznID, pxlID, x2);
    desc7.putUnitDouble(vrtcID, pxlID, y2);
    desc5.putObject(tID, pntID, desc7);
    desc5.putEnumerated(typeID, grdtID, lnrID);
    desc5.putBoolean(dthrID, true);
    desc5.putBoolean(usmsID, true);
    var desc8 = new ActionDescriptor();
    desc8.putString(nmID, 'Black, White');
    desc8.putEnumerated(grdfID, grdfID, cstsID);
    desc8.putDouble(intrID, 4096.000000);
    var list1 = new ActionList();
    var desc9 = new ActionDescriptor();
    var desc10 = new ActionDescriptor();
    desc10.putDouble(cynID, color1.cmyk.cyan);
    desc10.putDouble(mgntID, color1.cmyk.magenta);
    desc10.putDouble(ylwID, color1.cmyk.yellow);
    desc10.putDouble(blckID, color1.cmyk.black);
    // desc10.putDouble( cynID, 75.020000 );
    // desc10.putDouble( mgntID, 68.010000 );
    // desc10.putDouble( ylwID, 67.000000 );
    // desc10.putDouble( blckID, 90.190000 );
    desc9.putObject(clrID, cmycID, desc10);
    desc9.putEnumerated(typeID, clryID, usrsID);
    desc9.putInteger(lctnID, 0);
    desc9.putInteger(mdpnID, 50);
    list1.putObject(id68, desc9);
    var desc11 = new ActionDescriptor();
    var desc12 = new ActionDescriptor();
    desc12.putDouble(cynID, color2.cmyk.cyan);
    desc12.putDouble(mgntID, color2.cmyk.magenta);
    desc12.putDouble(ylwID, color2.cmyk.yellow);
    desc12.putDouble(blckID, color2.cmyk.black);
    // desc12.putDouble( cynID, 0.000000 );
    // desc12.putDouble( mgntID, 0.000000 );
    // desc12.putDouble( ylwID, 0.000000 );
    // desc12.putDouble( blckID, 0.000000 );
    desc11.putObject(clrID, cmycID, desc12);
    desc11.putEnumerated(typeID, clryID, usrsID);
    desc11.putInteger(lctnID, 4096);
    desc11.putInteger(mdpnID, 50);
    list1.putObject(id80, desc11);
    desc8.putList(clrsID, list1);
    var list2 = new ActionList();
    var desc13 = new ActionDescriptor();
    desc13.putUnitDouble(id82, prcID, 100.000000);
    desc13.putInteger(lctnID, 0);
    desc13.putInteger(mdpnID, 50);
    list2.putObject(id86, desc13);
    var desc14 = new ActionDescriptor();
    desc14.putUnitDouble(id87, prcID, 100.000000);
    desc14.putInteger(lctnID, 4096);
    desc14.putInteger(mdpnID, 50);
    list2.putObject(id91, desc14);
    desc8.putList(id81, list2);
    desc5.putObject(gradID, grdnID, desc8);
    executeAction(grdnID, desc5, DialogModes.NO);
}


function verticalGrad() {
    'use strict';
    var bd = boundArray(gXGrad, gXGrad + gGradWidth, 0, gHeight);
    app.activeDocument.selection.select(bd);
    var xc = gXGrad + (gGradWidth / 2);
    drawGradient(xc, gHeight, xc, 0, gBLACK, gWHITE);
    app.activeDocument.selection.deselect();
}


function drawBars(xStart, margin) {
    'use strict';
    var bd = boundArray(xStart, gWidth, 0, gHeight);
    app.activeDocument.selection.select(bd);
    app.activeDocument.selection.fill(gBLACK);
    bd = boundArray(xStart, gWidth - margin, margin, margin + (gHeight - margin) / 2);
    app.activeDocument.selection.select(bd);
    app.activeDocument.selection.fill(gWHITE);
    app.activeDocument.selection.deselect();
}


function gradLine(x, bottom, top, dv, lv) {
    'use strict';
    var bd = boundArray(x - 1, x + 1, bottom, top);
    app.activeDocument.selection.select(bd);
    var dark = new SolidColor();
    dark.rgb.red = dv;
    dark.rgb.green = dv;
    dark.rgb.blue = dv;
    var light = new SolidColor();
    light.rgb.red = lv;
    light.rgb.green = lv;
    light.rgb.blue = lv;
    drawGradient(x, bottom, x, top, light, dark);
    app.activeDocument.selection.deselect();
}


function horizLine(x0, x1, y, val) {
    'use strict';
    var c = new SolidColor();
    c.rgb.red = val;
    c.rgb.green = val;
    c.rgb.blue = val;
    var bd = boundArray(x0, x1, y - 1, y + 1);
    app.foreGroundColor = c;
    app.activeDocument.selection.select(bd);
    app.activeDocument.selection.fill(c);
    app.activeDocument.selection.deselect();
}


function grayPatch(bd, val) {
    'use strict';
    app.activeDocument.selection.select(bd);
    var c = new SolidColor();
    c.rgb.red = val;
    c.rgb.green = val;
    c.rgb.blue = val;
    app.activeDocument.selection.fill(c);
    app.activeDocument.selection.deselect();
}


function writeText(x, y, userString, val, just) {
    'use strict';
    var c = new SolidColor();
    c.rgb.red = val;
    c.rgb.green = val;
    c.rgb.blue = val;
    var newTextLayer = app.activeDocument.artLayers.add();
    newTextLayer.kind = LayerKind.TEXT;
    newTextLayer.textItem.font = 'ArialMT';
    newTextLayer.textItem.size = 20 * (72 / 300); // points, not pixels
    newTextLayer.textItem.contents = userString;
    newTextLayer.textItem.color = c;
    newTextLayer.textItem.position = new Array(x, y);
    newTextLayer.textItem.justification = just;
    return newTextLayer; // ignored so far
}


function make101() {
    'use strict';
    var n = 0;
    var p = 1;
    var b, x, y, v, i;

    var steps = 101;

    if (gText) {
        steps += 4; // extra 4 steps
    }

    if (gLines) {
        steps += 11; // extra 11 steps
    }
    // Progress bar window
    var prgrsDlgTitle = localize(loc_prgsDlgCrtMainTitle, gTitle);
    progress(steps, prgrsDlgTitle);

    for (var j = 0; j < 10; j++) {
        y = gYMarg + j * gPatch;
        for (i = 0; i < 10; i++) {
            x = gXMarg + i * gPatch;
            v = Math.floor(0.5 + (255 - 255 * (n / 100)));
            b = boundArray(x, x + gPatch, y, y + gPatch);
            grayPatch(b, v);

            if (gText) {
                var tv = 0;

                if (v < 128) {
                    tv = 255;
                }

                writeText(x + 6, y + 20, (n + '%'), tv, Justification.LEFT);
                writeText(x + gPatch - 6, y + 20, (255 - v), tv, Justification.RIGHT);

                if ((n % 5) === 0) {
                    writeText(x + 6, y + gPatch - 6, p, tv, Justification.LEFT);
                    p++;
                }

                app.activeDocument.flatten();
            }

            progress.increment(); // update progressbar
            n++;
        }
    }

    v = 0;
    y = gYMarg + 10 * gPatch;
    b = boundArray(gXMarg, gXMarg + gPatch, y, y + gPatch);
    grayPatch(b, v);


    if (gText) {
        progress.increment(); // update progressbar
        writeText(gXMarg + 6, y + 20, (n + '%'), 255, Justification.LEFT);

        progress.increment(); // update progressbar
        writeText(gXMarg + gPatch - 6, y + 20, '255', 255, Justification.RIGHT);

        progress.increment(); // update progressbar
        writeText(gXMarg + 6, y + gPatch - 6, p, 255, Justification.LEFT);

        progress.increment(); // update progressbar
        app.activeDocument.flatten();
    }

    if (gLines) {
        for (i = 0; i <= 10; i++) {
            progress.increment(); // update progressbar

            x = gXMarg + i * gPatch;
            v = 55 + 145 * (i / 10);
            if (i < 2) {
                gradLine(x, gYMarg - 1, gYMarg + 11 * gPatch + 1, 55, 200);
            } else {
                gradLine(x, gYMarg - 1, gYMarg + 10 * gPatch + 1, 55, 200);
            }
            y = gYMarg + i * gPatch;
            horizLine(gXMarg - 1, gXMarg + 10 * gPatch + 1, y, v);

        }

        progress.increment(); // update progressbar
        horizLine(gXMarg - 1, gXMarg + gPatch + 1, y + gPatch, v);
    }

    progress.increment(); // update progressbar
    progress.close();
}


function make21() {
    'use strict';
    var x2 = gX21 + gStripWidth;
    var ht = gHeight / 21.0;

    var prgrsDlgTitle = localize(loc_prgsDlgCrtSideTitle, gTitle);
    progress(21, prgrsDlgTitle); // Progress bar window
    for (var j = 0; j < 21; j++) {
        progress.increment(); // update progressbar
        var y = j * ht;
        var v = 255 - 255 * (j / 20);
        var b = boundArray(gX21, x2, y, y + ht + 1);
        grayPatch(b, v);
        if (gText) {
            var tv = 0;
            if (v < 128) {
                tv = 255;
            }
            writeText(gX21 + 6, y + 20, (j + 1), tv, Justification.LEFT);
            app.activeDocument.flatten();
        }
    }
    app.activeDocument.selection.deselect();

    progress.close();
}


function patchCenter(i, j) {
    'use strict';
    var w = app.activeDocument.width.value;
    var h = app.activeDocument.height.value;
    var rw = w * (1.0 - (gBorderR + gBorderL));
    var rh = h * (1.0 - (gBorderT + gBorderB));
    var px = Math.floor(0.5 + (w * gBorderL + rw * ((i + 0.5) / 10.0)));
    var py = Math.floor(0.5 + (h * gBorderT + rh * ((j + 0.5) / 11.0)));
    return new Array(px, py);
}

//
// define sampling area
function selectPatch(i, j) {
    'use strict';
    var c = patchCenter(i, j);
    var w = app.activeDocument.width.value;
    var h = app.activeDocument.height.value;
    var rw = w * (1.0 - (gBorderR + gBorderL));
    var rh = h * (1.0 - (gBorderT + gBorderB));
    var pw = 0.5 * rw * (gSampleFraction / 10.0); // uniform for entire document
    var ph = 0.5 * rh * (gSampleFraction / 11.0); // likewise
    var b = boundArray(c[0] - pw, c[0] + pw, c[1] - ph, c[1] + ph);
    app.activeDocument.selection.select(b);
}

// grab pixel color
var getColorAt = function(doc, x, y) {
    'use strict';

    function selectBounds(doc, b) {
        doc.selection.select([
            [b[0], b[1]],
            [b[2], b[1]],
            [b[2], b[3]],
            [b[0], b[3]]
        ]);
    }

    function findPV(h) {
        for (var i = 0; i <= 255; i++) {
            if (h[i]) {
                return i;
            }
        }
        return 0;
    }
    var onePix = new UnitValue(1, 'px');
    selectBounds(doc, [x, y, x + onePix, y + onePix]);
    var pColour = new SolidColor();
    pColour.rgb.red = findPV(doc.channels[0].histogram);
    pColour.rgb.green = findPV(doc.channels[1].histogram);
    pColour.rgb.blue = findPV(doc.channels[2].histogram);
    doc.selection.deselect(); // or, even better, undo
    return pColour;
};


// average the pixels in this area
function patch(i, j) {
    'use strict';
    var doc = app.activeDocument;
    selectPatch(i, j);
    doc.activeLayer.applyAverage();
    if (gShowSamples) {
        doc.selection.stroke(gRED, 1);
    }
    //
    var c = patchCenter(i, j);
    var p = getColorAt(doc, c[0], c[1]);
    if (gNoisy === true) {
        //alert('patchCenter('+i+','+j+') -> ['+c[0]+','+c[1]+'] -> ['+p.rgb.red+','+p.rgb.green+','+p.rgb.blue+']');
        gLog.push('[' + i + ',' + j + '] / [' + c[0] + ',' + c[1] + '] / [' + p.rgb.red + ',' + p.rgb.green + ',' + p.rgb.blue + ']');
    }
    return p;
}


function outStroke() {
    'use strict';
    var bd = boundArray(0, gWidth, 0, gHeight);
    app.activeDocument.selection.select(bd);
    app.activeDocument.selection.stroke(gBLACK, 1);
    app.activeDocument.selection.deselect(); // or, even better, undo
}


function patchStrip(colorList, patchSize) {
    'use strict';
    var n = colorList.length;
    if (n < 1) {
        alert('No colors for new strip');
        return;
    }
    var newDoc = app.documents.add(patchSize * n, patchSize, gDPI, 'CStrip', NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
    var c = new SolidColor();
    for (var i = 0; i < n; i++) {
        c = colorList[i];
        var l = i * patchSize;
        var b = boundArray(l, l + patchSize, 0, patchSize);
        newDoc.selection.select(b);
        newDoc.selection.fill(c);
    }
    newDoc.selection.deselect(); // or, even better, undo
}


var duplicateDocument = function(doc, name, merged) {
    'use strict';

    function _ftn() {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Frst'));
        desc.putReference(charIDToTypeID('null'), ref);

        if (name) {
            desc.putString(charIDToTypeID('Nm  '), name);
        }
        if (merged === true) {
            desc.putBoolean(charIDToTypeID('Mrgd'), true);
        }
        executeAction(charIDToTypeID('Dplc'), desc, DialogModes.NO);
        return app.activeDocument;
    }
    return _ftn();
};


function verifyCurve(curvePoints) {
    'use strict';
    var p, i, n;
    p = curvePoints[0][0];
    for (i = 1; i < curvePoints.length; i++) {
        n = curvePoints[i][0];
        if (n < p) {
            alert(loc_UsrDlgAlertInvalidCrv);
            return (-1);
        }
    }
    if (gNegate) {
        for (i = 0; i < curvePoints.length; i++) {
            curvePoints[i][1] = 255 - curvePoints[i][1];
        }
    }
    return 1;
}


function curveLayer(curvePoints) {
    'use strict';
    var desc14 = new ActionDescriptor();
    var ref9 = new ActionReference();
    ref9.putClass(charIDToTypeID('AdjL'));
    desc14.putReference(charIDToTypeID('null'), ref9);
    var desc15 = new ActionDescriptor();
    var desc16 = new ActionDescriptor();
    var list1 = new ActionList();
    var desc17 = new ActionDescriptor();
    var ref10 = new ActionReference();
    ref10.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Cmps'));
    desc17.putReference(charIDToTypeID('Chnl'), ref10);
    var list2 = new ActionList();
    for (var i = 0; i < curvePoints.length; i++) {
        var desc18 = new ActionDescriptor();
        desc18.putDouble(charIDToTypeID('Hrzn'), curvePoints[i][0]);
        desc18.putDouble(charIDToTypeID('Vrtc'), curvePoints[i][1]);
        list2.putObject(charIDToTypeID('Pnt '), desc18);
    }
    desc17.putList(charIDToTypeID('Crv '), list2);
    list1.putObject(charIDToTypeID('CrvA'), desc17);
    desc16.putList(charIDToTypeID('Adjs'), list1);
    desc15.putObject(charIDToTypeID('Type'), charIDToTypeID('Crvs'), desc16);
    desc14.putObject(charIDToTypeID('Usng'), charIDToTypeID('AdjL'), desc15);
    try {
        executeAction(charIDToTypeID('Mk  '), desc14, DialogModes.NO);
    } catch (e) {
        alert(loc_UsrDlgAlertUnableCrv);
        return 0;

    }
    return 1;
}

/////////////////////////////////////////////////////

function scanResultsReport() {
    'use strict';

    // DIALOG
    // ======
    var dlg = new Window('dialog', localize(loc_RptDlgText, gTitle), undefined, {
        closeButton: true
    });
    dlg.orientation = 'column';
    dlg.alignChildren = ['left', 'top'];
    dlg.spacing = 10;
    dlg.margins = 16;

    // GROUP1
    // ======
    var group1 = dlg.add('group');
    group1.orientation = 'column';
    group1.alignChildren = ['left', 'center'];
    group1.spacing = 10;
    group1.margins = 0;

    addStaticText(group1, loc_RptDlgLine01);

    // GROUP2
    // ======
    var group2 = dlg.add('group');
    group2.orientation = 'column';
    group2.alignChildren = ['left', 'center'];
    group2.spacing = 0;
    group2.margins = 0;

    addStaticText(group2, localize(loc_RptDlgLine02, gCurveName));
    addStaticText(group2, loc_RptDlgLine03);
    addStaticText(group2, localize(loc_RptDlgLine04, gCurveName));
    addStaticText(group2, loc_RptDlgLine05);

    // GROUP3
    // ======
    var group3 = dlg.add('group');
    group3.orientation = 'column';
    group3.alignChildren = ['left', 'center'];
    group3.spacing = 0;
    group3.margins = 0;

    addStaticText(group3, localize(loc_RptDlgLine06, gLightestSample));
    addStaticText(group3, localize(loc_RptDlgLine07, gDarkestSample));

    var shoulder = gLightestSample;
    var toe = 101 - gDarkestSample;
    var doSugg = false;
    var sugg = '';
    var sugg2 = '';

    if ((toe > (shoulder * 1.5)) && (toe > 5)) {
        doSugg = true;
        sugg = loc_RptDlgDec; // decreased
        sugg2 = loc_RptDlgLess; // less
    }

    if ((shoulder > (toe * 1.5)) && (shoulder > 5)) {
        doSugg = true;
        sugg = loc_RptDlgInc; // increased
        sugg2 = loc_RptDlgMore; // more
    }

    if (gNegate) {

        // NEGATE PANEL
        // ============
        var pnlNeg = dlg.add('panel');
        pnlNeg.preferredSize = [375, 0];
        pnlNeg.text = loc_RptDlgTextNeg;
        pnlNeg.orientation = 'column';
        pnlNeg.alignChildren = ['left', 'top'];
        pnlNeg.spacing = 0;
        pnlNeg.margins = 10;

        addStaticText(pnlNeg, loc_RptDlgLine11);
    }

    if (doSugg) {

        // SUGGESTION PANEL
        // ================
        var pnlSugg = dlg.add('panel');
        pnlSugg.preferredSize = [375, 0];
        pnlSugg.text = loc_RptDlgTextSug;
        pnlSugg.orientation = 'column';
        pnlSugg.alignChildren = ['left', 'top'];
        pnlSugg.spacing = 0;
        pnlSugg.margins = 10;

        addStaticText(pnlSugg, loc_RptDlgLine13);
        addStaticText(pnlSugg, localize(loc_RptDlgLine14, sugg));
        addStaticText(pnlSugg, loc_RptDlgLine15);
        addStaticText(pnlSugg, localize(loc_RptDlgLine16, sugg2));
    }

    if (gNoisy === true) {

        // LOG PANEL
        // =========
        var pnlLog = dlg.add('panel');
        pnlLog.preferredSize = [375, 0];
        pnlLog.text = loc_RptDlgPnlLog;
        pnlLog.orientation = 'column';
        pnlLog.alignChildren = ['left', 'top'];
        pnlLog.spacing = 0;
        pnlLog.margins = 10;

        var editLog = pnlLog.add('edittext {size: [350,100], properties: {name: "log", multiline: true, scrollable: true}}');
        editLog.enabled = true;
        editLog.active = true;
        editLog.text = gLog.join('\n');
    }

    // BUTTON GROUP
    // ============
    var grpBtn = dlg.add('group');
    grpBtn.orientation = 'row';
    grpBtn.alignChildren = ['center', 'center'];
    grpBtn.spacing = 10;
    grpBtn.margins = 0;
    grpBtn.alignment = ['center', 'top'];

    var okayBtn = grpBtn.add('button', undefined, undefined, {
        name: 'ok'
    });
    okayBtn.text = loc_UsrDlgBtnDone;
    dlg.defaultElement = okayBtn;

    okayBtn.onClick = function() {
        dlg.close(1);
    };

    var result = dlg.show();
}

//
// scan the active document
//
function scanChart() {
    'use strict';
    var i, j;
    if (app.documents.length < 1) { // stop if no document is opened.
        alert(loc_ScnChrtAlertNoDoc);
        return;
    }
    var origDoc = app.activeDocument;
    var samplerDoc = duplicateDocument(origDoc, localize(loc_ScnChrtSmplDoc), true);
    samplerDoc.info.source = localize(loc_ScnChrtSmplDocSrc, origDoc.name);
    samplerDoc.info.category = 'TextureMap';
    samplerDoc.flatten();
    if ((samplerDoc.mode === DocumentMode.BITMAP) ||
        (samplerDoc.mode === DocumentMode.CMYK) ||
        (samplerDoc.mode === DocumentMode.DUOTONE) ||
        (samplerDoc.mode === DocumentMode.GRAYSCALE) ||
        (samplerDoc.mode === DocumentMode.INDEXEDCOLOR)) {
        try {
            samplerDoc.changeMode(ChangeMode.RGB);
        } catch (e) {
            alert(localize(loc_ScnChrtAlertUnblCnv, ChangeMode.RGB));
            samplerDoc.close(SaveOptions.DONOTSAVECHANGES);
            return -1;
        }
    }
    app.activeDocument = samplerDoc;
    // stuff....
    var scannedValues = new Array(101);
    var n = 0;
    gLog.push(loc_ScnChrtTitleLog); //'Cell / Center / Color RGB:'

    var prgrsDlgTitle = localize(loc_prgsDlgAnlzTitle, gTitle);
    progress(scannedValues.length+1, prgrsDlgTitle); // Progress bar window
    for (j = 0; j < 10; j++) {
        for (i = 0; i < 10; i++) {
            scannedValues[n] = patch(i, j);
            progress.increment(); // update progressbar
            n++;
        }
    }

    progress.increment(); // update progressbar

    scannedValues[n] = patch(0, 10.0);
    var scannedGrayValues = grayValues(scannedValues);
    var normSamps = determineDynamicRange(scannedGrayValues);
    var curvePoints = []; // new Array();

    i = 0;
    for (j = 0; j < 14; j++) { // unfortunately PS allows only a few curve points
        var origPicVal = Math.floor(0.5 + (255.0 * j / 13.0));
        var mapToVal = findValueThatGives(origPicVal, normSamps);
        if (mapToVal >= 0) {
            curvePoints[i++] = [origPicVal, mapToVal];
        }
    }

    app.activeDocument = samplerDoc;
    if ((!gShowSamples) && (!gNoisy)) {
        samplerDoc.close(SaveOptions.DONOTSAVECHANGES);
    }

    app.activeDocument = origDoc;
    app.activeDocument.selection.deselect();
    if (gShowSamples) {
        app.activeDocument = samplerDoc;
        app.activeDocument.selection.deselect();
    }

    if (i < 2) {
        alert(loc_ScnChrtAlertNotVal);
        return -1;
    } else {
        if (verifyCurve(curvePoints) > 0) {
            if (!curveLayer(curvePoints)) {
                return -1;
            }
            app.activeDocument.activeLayer.name = gCurveName;
            app.activeDocument.activeLayer.visible = false;
        }
    }

    progress.close();
    //// progress bar
    return 0;
}

function buildChart() {
    'use strict';
    var newDoc = app.documents.add(gWidth, gHeight, gDPI, gChartName, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
    app.backGroundColor = gWHITE;
    app.activeDocument.flatten();
    make101();
    make21();
    var cCtr = gXMarg + gPatch * 5.5;
    var cBot = gYMarg + gPatch * 11;
    var cJust = Justification.CENTER;
    var L;
    var S = 16 * (72 / 300.0); // points, not pixels

    // Progress bar window
    var prgrsDlgTitle = localize(loc_prgsDlgFinaleTitle, gTitle);
    progress(9, prgrsDlgTitle);

    progress.increment(); // update progressbar
    L = writeText(cCtr, cBot - gDPIScale * 75, gTitle, 0, cJust); // cBot - gDPIScale * 75, y = 1100
    L.textItem.size = S;

    progress.increment(); // update progressbar
    L = writeText(cCtr, cBot - gDPIScale * 58, localize(loc_BldChrtLine01), 0, cJust);
    L.textItem.size = S;

    progress.increment(); // update progressbar
    L = writeText(cCtr, cBot - gDPIScale * 41, localize(loc_BldChrtLine02), 0, cJust);
    L.textItem.size = S;

    progress.increment(); // update progressbar
    L = writeText(cCtr, cBot - gDPIScale * 24, localize(loc_BldChrtLine03), 0, cJust);
    L.textItem.size = S;

    progress.increment(); // update progressbar
    L = writeText(cCtr, cBot - gDPIScale + 10, localize(loc_BldChrtLine04), 0, cJust);

    progress.increment(); // update progressbar
    app.activeDocument.flatten();
    verticalGrad();

    progress.increment(); // update progressbar
    app.activeDocument.flatten();
    drawBars(gXBar, 10);
    outStroke();

    progress.increment(); // update progressbar
    L = writeText(gXMarg + gPatch * 5, gYMarg - gDPIScale * 20, gLabel, 0, cJust);
    L.textItem.size = S * 3;

    progress.increment(); // update progressbar
    app.activeDocument.flatten();

    progress.close();
}


function addStaticText(par, txt) {
    var p = par.add('statictext');
    p.text = txt;
    return p;
}


// Make text colored
function addColorText(par, text, color) {
    try {
        if (!color) {
            throw e;
        }
        // add color to url text
        var parText = addStaticText(par, text);
        parText.graphics.foregroundColor = par.graphics.newPen(par.graphics.PenType.SOLID_COLOR, color, 1);
        return parText;
    } catch (e) {
        var parText = addStaticText(par, text);
        return parText;
    }
}


// Make clickable link from static text
function addLinkText(par, url) {
    try {
        // add blue color to url text
        var color = [0, 0, 0.85];
        var urlText = addColorText(par, url, color);
        urlText.helpTip = loc_linkTextTip;

        // open url by click
        with(par) {
            urlText.onClick = function() {
                var os = ($.os.indexOf('Win') != -1) ? 'Win' : 'Mac';
                if (os == 'Win') {
                    system('explorer ' + url);
                } else {
                    system('open ' + url);
                }
            };
        }
        return urlText;
    } catch (e) {
        var urlText = addStaticText(par, url);
        return urlText;
    }
}


// Progressbar window
function progress(steps, title) {

    var b, t, w;

    w = new Window('palette', title, undefined, {closeButton: false});
    t = w.add('statictext');
    t.preferredSize = [450, -1]; // 450 pixels wide, default height.

    if (steps) {
        b = w.add('progressbar', undefined, 0, steps);
        b.preferredSize = [450, -1]; // 450 pixels wide, default height.
    }

    progress.close = function() {
        w.close();
    };

    progress.increment = function() {
        b.value++;
        progress.updatetext();
    };

    progress.updatetext = function() {
        var curVal = Math.floor((b.value * 100) / steps);
        t.text = localize(loc_progressText, curVal);
        w.update();
    };

    w.show();
}


function main() {
    'use strict';
    try {
        var result = userDialog();

        if (result < 1) {

            // Help dialog was closed
            if (result === -2) {
                main();
            }

            return;
        }
        var strtRulerUnits = app.preferences.rulerUnits;
        if (strtRulerUnits !== Units.PIXELS) {
            app.preferences.rulerUnits = Units.PIXELS; // selections are always in pixels
        }
        if (gMakeChart) {
            buildChart();
        } else {
            if (scanChart() >= 0) {
                scanResultsReport();
            }
        }
        if (strtRulerUnits !== Units.PIXELS) {
            app.preferences.rulerUnits = strtRulerUnits;
        }

    } catch (e) {
        //
    }

}

main();