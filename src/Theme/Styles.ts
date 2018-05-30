import RX = require('reactxp')
import Colors from './Colors'
import Fonts from './Fonts'
import Metrics from './Metrics'

const Styles = {
  statusBar: RX.Styles.createViewStyle({
    backgroundColor: Colors.navBarBackground,
    height: RX.UserInterface.measureWindow().height === 812 ? 20 : 0,
  }),
  containerFull: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: Colors.background,
  }),
  container: RX.Styles.createViewStyle({
    flex: 1,
    maxWidth: Metrics.tabBar.widthWide * 1.3 + Metrics.tabBar.width,
  }),
  containerOpaque: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: Colors.background,
  }),
  containerWrapper: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  scrollContainer: RX.Styles.createViewStyle({
    flex: 1,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,

  }),
  scrollContainerNoMargins: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: Colors.background,
  }),
  row: RX.Styles.createViewStyle({
    flexDirection: 'row',
  }),
  masterView: RX.Styles.createViewStyle({
    width: Metrics.tabBar.widthWide,
  }),
  masterViewContainer: RX.Styles.createViewStyle({
    backgroundColor: 'rgba(0,0,0,0.2)',
  }),
  detailView: RX.Styles.createViewStyle({
    backgroundColor: Colors.background,
    flex: 1,
    //maxWidth: Metrics.tabBar.widthFull * 2 + Metrics.tabBar.width,
  }),
  column: RX.Styles.createViewStyle({
    flexDirection: 'column',
    flex: 1,
  }),
  wideScreenSpacer: RX.Styles.createViewStyle({
    flex: 2,
  }),
  wideScreenContentWrapper: RX.Styles.createViewStyle({
    flex: 5,
  }),
  listItem: RX.Styles.createButtonStyle({
    // height: Metrics.listItemHeight,
    backgroundColor: Colors.transparent,
    alignSelf: 'stretch',
    padding: Metrics.baseMargin,
    flexDirection: 'row',
    borderRadius: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: Metrics.borderWidth,
    borderColor: Colors.borderColor,
  }),

  listItemIcon: RX.Styles.createViewStyle({
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: Colors.transparent,
    marginRight: Metrics.baseMargin,
  }),

  listItemIconEmpty: RX.Styles.createViewStyle({
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.light,
  }),

  listItemIconWrapper: RX.Styles.createViewStyle({
    flexDirection: 'row',
    alignItems: 'center',
  }),

  listItemDetail: RX.Styles.createTextStyle({
    color: Colors.light,
    fontSize: Fonts.size.medium,
    paddingLeft: Metrics.baseMargin,
  }),

  listItemBalance: RX.Styles.createViewStyle({
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'flex-end',
  }),

  listItemSelected: RX.Styles.createButtonStyle({
    backgroundColor: Colors.backgroundSelected,
  }),

  listItemTitle: RX.Styles.createTextStyle({
    color: Colors.light,
    fontSize: Fonts.size.medium,
    fontWeight: '100',
    marginBottom: Metrics.smallMargin,
  }),
  listItemAmount: RX.Styles.createTextStyle({
    color: Colors.light,
    fontSize: Fonts.size.large,
  }),
  listItemSubTitle: RX.Styles.createTextStyle({
    color: Colors.info,
    fontSize: Fonts.size.small,
  }),

  button: RX.Styles.createButtonStyle({
    height: Metrics.buttonHeight,
    backgroundColor: Colors.tint,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
  }),
  buttonIcon: RX.Styles.createTextStyle({
    fontSize: Fonts.size.h6,
    flexDirection: 'column',
    margin: Metrics.smallMargin,
  }),
  buttonLabel: RX.Styles.createTextStyle({
    color: Colors.buttonLabel,
    fontSize: Fonts.size.medium,
    flexDirection: 'column',
  }),
  buttonBranded: RX.Styles.createButtonStyle({
    backgroundColor: Colors.brand,
  }),
  buttonLabelBranded: RX.Styles.createTextStyle({
    color: Colors.buttonLabel,
  }),
  buttonLabelMain: RX.Styles.createTextStyle({
    color: Colors.buttonLabel,
  }),
  buttonSecondary: RX.Styles.createButtonStyle({
    backgroundColor: Colors.transparent,
  }),
  buttonLabelSecondary: RX.Styles.createTextStyle({
    color: Colors.brand,
  }),
  buttonMain: RX.Styles.createButtonStyle({
    backgroundColor: Colors.cta,
    marginBottom: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
  }),
  sectionTitle: RX.Styles.createTextStyle({
    color: Colors.info,
    fontSize: Fonts.size.sectionTitle,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.mediumMargin,
  }),
  sectionRow: RX.Styles.createViewStyle({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.sectionRowBackground,
    paddingRight: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
  }),
  icon: RX.Styles.createViewStyle({
    height: Metrics.iconSize,
    width: Metrics.iconSize,
  }),
  navBarItem: RX.Styles.createButtonStyle({
    flexDirection: 'row',
    paddingRight: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
  }),
  navBarItemLabel: RX.Styles.createTextStyle({
    color: Colors.brand,
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.smallMargin,
  }),
  modalMessageBackgroundView: RX.Styles.createViewStyle({
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: Colors.modalViewBackground,
    flexDirection: 'row',
  }),
  modalMessagePanel: RX.Styles.createViewStyle({
    backgroundColor: Colors.background,
    borderRadius: Metrics.borderRadius,
    margin: Metrics.baseMargin,
  }),
  modalMessageContainer: RX.Styles.createTextStyle({
    alignItems: 'center',
    padding: Metrics.mediumMargin,
    marginBottom: Metrics.baseMargin,
  }),
  modalMessageTitle: RX.Styles.createTextStyle({
    fontSize: Fonts.size.h5,
  }),
  modalMessageTitleError: RX.Styles.createViewStyle({
    backgroundColor: Colors.errorBackground,
  }),
  modalMessageTitleWarning: RX.Styles.createViewStyle({
    backgroundColor: Colors.warningBackground,
  }),
  modalMessageTitleSuccess: RX.Styles.createViewStyle({
    backgroundColor: Colors.successBackground,
  }),
  modalMessageBody: RX.Styles.createViewStyle({
    paddingLeft: Metrics.mediumMargin,
    paddingRight: Metrics.mediumMargin,
    paddingTop: Metrics.mediumMargin,
  }),
  modalMessageLabel: RX.Styles.createTextStyle({
    textAlign: 'center',
    marginBottom: Metrics.baseMargin,
    color: Colors.light,
  }),

  accountIconMicro: RX.Styles.createImageStyle({
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: Metrics.smallMargin,
    overflow: 'hidden',
  }),
  accountIconSmall: RX.Styles.createImageStyle({
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: Metrics.smallMargin,
    overflow: 'hidden',
  }),
  accountIconSmallAbsolute: RX.Styles.createImageStyle({
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: Metrics.smallMargin,
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
  }),
  accountIconMedium: RX.Styles.createImageStyle({
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  }),
  accountIconLarge: RX.Styles.createImageStyle({
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Metrics.baseMargin,
    overflow: 'hidden',
  }),

  navBar: RX.Styles.createViewStyle({
    backgroundColor: Colors.navBarBackground,
    height: RX.Platform.getType() === 'web' ? 44 : 64,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: RX.Platform.getType() === 'web' ? 10 : 30,
  }),
  navBarLabel: RX.Styles.createTextStyle({
    flex: 1,
    fontSize: Fonts.size.medium,
    color: Colors.light,
    fontWeight: '900',
  }),

  amountCode: RX.Styles.createTextStyle({
    color: Colors.light,
    fontSize: Fonts.size.medium,
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: Metrics.baseMargin,
  }),

  attachment: {
    wrapper: RX.Styles.createViewStyle({
      margin: Metrics.baseMargin,
    }),
    card: RX.Styles.createViewStyle({
      borderWidth: Metrics.borderWidth,
      borderRadius: Metrics.borderRadius,
      borderColor: Colors.borderColor,
      overflow: 'hidden',
    }),
    image: RX.Styles.createImageStyle({
      flex: 1,
      height: 200,
    }),
    siteRow: RX.Styles.createViewStyle({
      flexDirection: 'row',
      marginTop: Metrics.smallMargin,
      padding: Metrics.baseMargin,
      flex: 1,
    }),
    icon: RX.Styles.createImageStyle({
      height: 32,
      width: 32,
      borderRadius: 16,
      backgroundColor: Colors.light,
      marginRight: Metrics.baseMargin * 0.7,
      overflow: 'hidden',
    }),
    site: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.small,
      marginBottom: Metrics.smallMargin,
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.small,
      fontWeight: 'bold',
      marginBottom: Metrics.smallMargin,
    }),
    description: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
      marginBottom: Metrics.smallMargin,
      flex: 1,
    }),
    spinner: RX.Styles.createViewStyle({
      alignSelf: 'center',
    }),
  },
  feed: {
    item: RX.Styles.createViewStyle({
      paddingTop: Metrics.baseMargin,
      paddingBottom: Metrics.baseMargin,
      paddingLeft: Metrics.baseMargin,
      paddingRight: Metrics.baseMargin,
      borderBottomWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
      flex: 1,
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      flex: 1,
    }),
    subTitle: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
      flex: 1,
    }),
    txInfo: RX.Styles.createViewStyle({
      flexDirection: 'row',
      marginBottom: Metrics.baseMargin,
    }),
    txTitle: RX.Styles.createViewStyle({
      marginLeft: Metrics.baseMargin,
      flex: 1,
    }),
    txDetails: RX.Styles.createViewStyle({
      flex: 1,
      alignItems: 'flex-end',
    }),
    message: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.small,
      marginBottom: Metrics.baseMargin,
      flex: 1,
    }),
    actionRow: RX.Styles.createViewStyle({
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      marginTop: Metrics.baseMargin,
    }),
    actionButton: RX.Styles.createTextStyle({
      color: Colors.brand,
      fontSize: Fonts.size.small,
      flex: 1,
    }),
  },
  segmentedControl: {
    wrapper: RX.Styles.createViewStyle({
      flexDirection: 'row',
      borderRadius: Metrics.borderRadius,
      borderColor: Colors.brand,
      borderWidth: Metrics.borderWidth,
      overflow: 'hidden',
      height: Metrics.buttonHeight - 10,
      margin: Metrics.baseMargin,
    }),
    button: RX.Styles.createButtonStyle({
      backgroundColor: Colors.transparent,
      flex: 1,
    }),
    label: RX.Styles.createTextStyle({
      color: Colors.brand,
      fontSize: Fonts.size.medium - 4,
      alignSelf: 'center',
    }),
    selectedButton: RX.Styles.createButtonStyle({
      backgroundColor: Colors.brandBackGround,
      flex: 1,
    }),
    selectedLabel: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium - 4,
      alignSelf: 'center',
    }),
  },
  infoBox: {
    wrapper: RX.Styles.createViewStyle({
      marginTop: Metrics.baseMargin,
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.medium,
      alignSelf: 'center',
      marginBottom: Metrics.baseMargin,
    }),
  },
  textInput: {
    wrapper: RX.Styles.createViewStyle({
      flex: 1,
      marginLeft: Metrics.baseMargin,
      marginRight: Metrics.baseMargin,
      marginTop: Metrics.baseMargin,
    }),
    label: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
      marginBottom: Metrics.smallMargin,
    }),
    input: RX.Styles.createTextInputStyle({
      flex: 1,
      backgroundColor: Colors.backgroundSelected,
      height: Metrics.buttonHeight,
      paddingLeft: Metrics.baseMargin,
      borderWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
      borderRadius: Metrics.borderRadius,
      color: Colors.light,
      fontSize: Fonts.size.medium,
    }),
    inputReadonly: RX.Styles.createTextInputStyle({
      backgroundColor: Colors.transparent,
      // color: Colors.info,
      paddingLeft: 0,
      borderWidth: 0,
    }),
    inputBrand: RX.Styles.createTextInputStyle({
      paddingLeft: Metrics.baseMargin,
      borderWidth: Metrics.borderWidth,
      borderColor: Colors.brand,
    }),
    multiline: RX.Styles.createTextInputStyle({
      height: Metrics.buttonHeight * 2,
      paddingTop: Metrics.smallMargin * 2,
    }),
  },
  logo: RX.Styles.createImageStyle({
    alignSelf: 'center',
    height: 64,
    width: 64,
    marginTop: RX.Platform.getType() === 'web' ? 20 : 40,
    marginLeft: 10,
  }),
  visual: {
    image: RX.Styles.createImageStyle({
      flex: 1,
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Metrics.baseMargin,
      flexDirection: 'column',
    }),
    info: RX.Styles.createViewStyle({
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Metrics.baseMargin,
    }),
    logo: RX.Styles.createImageStyle({
      height: 206,
      width: 180,
      marginBottom: Metrics.baseMargin,
    }),
    button: RX.Styles.createTextStyle({
      color: Colors.brand,
      fontSize: Fonts.size.medium,
      textAlign: 'center',
      flex: 1,
    }),
    closeButton: RX.Styles.createButtonStyle({
      flex: 1,
      marginTop: Metrics.baseMargin,
      alignSelf: 'stretch',
    }),
    closeButtonLabel: RX.Styles.createTextStyle({
      color: Colors.brand,
      fontSize: Fonts.size.medium,
      flex: 1,
      alignSelf: 'flex-end',
      textAlign: 'left',
      marginRight: Metrics.baseMargin,
    }),
  },
  about: {
    wrapper: {
      marginTop: Metrics.baseMargin,
      marginBottom: Metrics.baseMargin * 4,
      marginLeft: Metrics.baseMargin,
      marginRight: Metrics.baseMargin,
    },
    h1: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.large,
      borderBottomWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
      marginTop: Metrics.baseMargin,
      marginBottom: Metrics.baseMargin * 2,
      paddingBottom: Metrics.smallMargin,
    }),
    h2: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.baseMargin,
    }),
    p: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.baseMargin,
    }),
    warning: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.baseMargin,
      textAlign: 'center',
    }),
    link: RX.Styles.createTextStyle({
      color: Colors.brand,
    }),
  },
  activityIndicator: RX.Styles.createViewStyle({
    margin: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }),
  accountInfo: {
    wrapper: RX.Styles.createViewStyle({
      margin: Metrics.baseMargin,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.baseMargin,
      textAlign: 'center',
    }),
  },
  graph: {
    yAxisLabel: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.micro,
      textAlign: 'left',
      marginLeft: Metrics.smallMargin,
    }),
    xAxisLabel: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.micro,
      textAlign: 'center',
      marginTop: Metrics.smallMargin,
    }),
  },
}

export default Styles
