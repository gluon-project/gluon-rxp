import RX = require('reactxp')
import Colors from './Colors'
import Fonts from './Fonts'
import Metrics from './Metrics'

const Styles = {
  statusBar: RX.Styles.createViewStyle({
    backgroundColor: Colors.navBarBackground,
    height: RX.UserInterface.measureWindow().height === 812 ? 20 : 0,
  }),
  bgImage: RX.Styles.createViewStyle({
    flex: 1,
  }),
  containerFull: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: Colors.background,
  }),
  containerFullTransparent: RX.Styles.createViewStyle({
    flex: 1,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    overflow: 'visible',
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
    fontWeight: '300',
    marginBottom: Metrics.smallMargin,
  }),
  listItemAmount: RX.Styles.createTextStyle({
    fontWeight: '300',
    color: Colors.light,
    fontSize: Fonts.size.large,
  }),
  listItemSubTitle: RX.Styles.createTextStyle({
    fontWeight: '100',
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
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    flexDirection: 'row',
  }),
  buttonIcon: RX.Styles.createTextStyle({
    fontSize: Fonts.size.h6,
    flexDirection: 'column',
    margin: Metrics.smallMargin,
  }),
  buttonLabel: RX.Styles.createTextStyle({
    fontWeight: '300',
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
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.brand,
  }),
  buttonLabelSecondary: RX.Styles.createTextStyle({
    color: Colors.brand,
  }),
  buttonMain: RX.Styles.createButtonStyle({
    backgroundColor: Colors.cta,
  }),
  sectionTitle: RX.Styles.createTextStyle({
    color: Colors.info,
    fontSize: Fonts.size.small,
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
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: Metrics.baseMargin,
    overflow: 'hidden',
  }),

  navBar: RX.Styles.createViewStyle({
    backgroundColor: Colors.navBarBackground2,
    height: RX.Platform.getType() === 'web' ? 64 : 64,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: RX.Platform.getType() === 'web' ? 30 : 30,
  }),
  navBarSystem: RX.Styles.createViewStyle({
    backgroundColor: Colors.navBarBackground,
    height: RX.Platform.getType() === 'web' ? 64 : 64,
    paddingTop: RX.Platform.getType() === 'web' ? 20 : 20,
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
      flex: 1,
    }),
    amount: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.small,
      flex: 1,
    }),
    subTitle: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
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
      borderRadius: Metrics.borderRadiusMax,
      borderColor: Colors.light,
      borderWidth: Metrics.borderWidth,
      overflow: 'hidden',
      height: Metrics.buttonHeight - 12,
      margin: Metrics.baseMargin,
    }),
    button: RX.Styles.createButtonStyle({
      backgroundColor: Colors.transparent,
      flex: 1,
    }),
    label: RX.Styles.createTextStyle({
      color: Colors.light,
      fontWeight: '300',
      fontSize: Fonts.size.medium,
      alignSelf: 'center',
    }),
    selectedButton: RX.Styles.createButtonStyle({
      backgroundColor: Colors.light,
      flex: 1,
    }),
    selectedLabel: RX.Styles.createTextStyle({
      fontWeight: '300',
      color: Colors.background,
      fontSize: Fonts.size.medium,
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
      marginLeft: Metrics.baseMargin,
      backgroundColor: Colors.transparent,
    }),
    input: RX.Styles.createTextInputStyle({
      flex: 1,
      backgroundColor: Colors.backgroundSelected,
      height: Metrics.buttonHeight,
      paddingLeft: Metrics.baseMargin,
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
      backgroundColor: Colors.transparent,
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.baseMargin,
    }),
    warning: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
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
      padding: Metrics.baseMargin,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderBottomWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.smallMargin,
      textAlign: 'center',
    }),
    subTitle: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
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
  chat: {
    messageBubble: RX.Styles.createViewStyle({
      marginBottom: Metrics.baseMargin,
      flex: 1,
      flexDirection: 'row',
    }),
    messageSenderAvatar: RX.Styles.createViewStyle({
      marginRight: Metrics.baseMargin,
      width: 32,
      height: 32,
      backgroundColor: Colors.backgroundSelected,
      borderRadius: 16,
      marginBottom: Metrics.smallMargin,
    }),
    messageSender: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
      marginBottom: Metrics.smallMargin,
    }),
    messageBody: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      fontWeight: '300',
      marginBottom: Metrics.baseMargin,
    }),
    inputRow: RX.Styles.createViewStyle({
      // height: 60,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // paddingRight: Metrics.baseMargin,
      paddingLeft: Metrics.baseMargin,
      // paddingBottom: Metrics.smallMargin,
      borderTopWidth: 1,
      borderColor: Colors.borderColor,
    }),
    messageSenderAvatarInput: RX.Styles.createViewStyle({
      width: 32,
      height: 32,
      backgroundColor: Colors.backgroundSelected,
      borderRadius: 16,
      marginBottom: Metrics.smallMargin,
    }),
    messageSendButton: RX.Styles.createTextStyle({
      color: Colors.brand,
      fontSize: Fonts.size.small,
    }),
    textInput: RX.Styles.createTextInputStyle({
      flex: 1,
      backgroundColor: Colors.transparent,
      height: Metrics.buttonHeight,
      paddingLeft: Metrics.baseMargin,
      color: Colors.light,
      fontSize: Fonts.size.medium,
    }),
  },
  claimBox: {
    wrapper: RX.Styles.createViewStyle({
      backgroundColor: Colors.lightBackground,
      borderRadius: 16,
      marginBottom: Metrics.baseMargin,
      padding: Metrics.baseMargin,
    }),
    issuer: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.micro,
      marginTop: Metrics.smallMargin,
      alignItems: 'center',
    }),
    claimType: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
    }),
    claimValue: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      padding: Metrics.baseMargin,
    }),
    claimValueView: RX.Styles.createViewStyle({
      alignItems: 'center',
    }),
  },
  contact: {
    group: RX.Styles.createViewStyle({
      marginBottom: Metrics.baseMargin,
    }),
    groupTitle: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      fontWeight: '300',
      textAlign: 'center',
      marginTop: Metrics.baseMargin,
      marginBottom: Metrics.smallMargin,
    }),
    groupListItem: RX.Styles.createViewStyle({
      marginBottom: 2,
      backgroundColor: Colors.lightBackground,
      padding: Metrics.baseMargin,
      borderRadius: Metrics.borderRadius,
    }),
    groupListItemTitle: RX.Styles.createTextStyle({
      color: Colors.light,
      textAlign: 'center',
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.baseMargin,
    }),
    groupListItemAvatar: RX.Styles.createTextStyle({
      marginBottom: Metrics.baseMargin,
      alignSelf: 'center',
    }),
    info: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
      marginLeft: Metrics.smallMargin,
    }),
    addressInfo: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
    }),
    groupedClaimSourceTitle: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      marginBottom: Metrics.smallMargin,
      marginLeft: Metrics.smallMargin,
    }),
    groupedClaimSourceTitleRow: RX.Styles.createViewStyle({
      flexDirection: 'row',
      borderTopWidth: Metrics.borderWidth,
      borderBottomWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
      paddingTop: Metrics.baseMargin,
      paddingBottom: Metrics.baseMargin,
      marginBottom: Metrics.baseMargin,
    }),
    groupedClaimDerailsRow: RX.Styles.createViewStyle({
      borderTopWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
      paddingTop: Metrics.baseMargin,
      paddingBottom: Metrics.baseMargin,
    }),
    detailsInfoRow: RX.Styles.createViewStyle({
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: Metrics.borderWidth,
      borderBottomWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
      paddingTop: Metrics.baseMargin,
      paddingBottom: Metrics.baseMargin,
      marginBottom: Metrics.baseMargin,
    }),
    detailsLabel: RX.Styles.createTextStyle({
      color: Colors.brand,
      fontSize: Fonts.size.small,
      marginLeft: Metrics.smallMargin,
    }),
    detailsSeparator: RX.Styles.createTextStyle({
      color: Colors.borderColor,
      fontSize: Fonts.size.small,
      marginLeft: Metrics.smallMargin,
      marginRight: Metrics.smallMargin,
    }),
    detailsWrapper: RX.Styles.createViewStyle({
      borderTopWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
      paddingBottom: Metrics.baseMargin,
    }),
    row: RX.Styles.createViewStyle({
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.smallMargin,
    }),
    detailsBoxLabel: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.micro,
      marginTop: Metrics.baseMargin,
      marginBottom: Metrics.smallMargin,
    }),
    detailsBoxValue: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.micro,
      marginBottom: Metrics.smallMargin,
    }),
  },
  riotWrapper: RX.Styles.createViewStyle({
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.borderRadiusMax,
  }),
  sectionTitleWrapper: RX.Styles.createViewStyle({
    marginTop: Metrics.baseMargin * 2,
    paddingBottom: Metrics.smallMargin,
    borderBottomWidth: Metrics.borderWidth,
    borderColor: Colors.borderColor,
    paddingLeft: Metrics.baseMargin,
  }),
  sectionTitleLabel: RX.Styles.createTextStyle({
    color: Colors.info,
    fontSize: Fonts.size.small,
    marginLeft: Metrics.baseMargin,
  }),
  claimButton: {
    button: RX.Styles.createViewStyle({
      flex: 0,
      minHeight: 60,
      minWidth: 65,
      borderRadius: Metrics.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.lightBackground,
      marginRight: Metrics.baseMargin,
      marginBottom: Metrics.baseMargin,
    }),
    label: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.small,
      marginTop: Metrics.smallMargin,
      fontWeight: '100',
    }),
    selectedButton: RX.Styles.createViewStyle({
      backgroundColor: Colors.transparent,
    }),
    selectedLabel: RX.Styles.createTextStyle({
      color: Colors.brand,
    }),
  },
  claimInputBox: {
    wrapper: RX.Styles.createViewStyle({
      backgroundColor: Colors.lightBackground,
      borderRadius: Metrics.borderRadius,
      marginLeft: Metrics.baseMargin,
      marginRight: Metrics.baseMargin,
      marginTop: Metrics.smallMargin,
      marginBottom: Metrics.baseMargin,
    }),
    titleRow: RX.Styles.createViewStyle({
      marginTop: Metrics.baseMargin,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.medium,
      marginLeft: Metrics.smallMargin,
    }),
    signerLabel: RX.Styles.createTextStyle({
      color: Colors.light,
      fontSize: Fonts.size.small,
    }),
  },
  section: {
    row: RX.Styles.createViewStyle({
      marginTop: Metrics.baseMargin,
      marginBottom: Metrics.smallMargin * 2,
      flexDirection: 'row',
      borderBottomWidth: Metrics.borderWidth,
      borderColor: Colors.borderColor,
    }),
    title: RX.Styles.createTextStyle({
      color: Colors.info,
      fontSize: Fonts.size.small,
      marginBottom: Metrics.smallMargin,
    }),
    padded: RX.Styles.createViewStyle({
      paddingLeft: Metrics.baseMargin,
    }),
  },
}

export default Styles
