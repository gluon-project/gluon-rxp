import AndroidPlugin = require('../android/PluginBase')
import iOSPlugin = require('../ios/PluginBase')
import WebPlugin = require('../web/PluginBase')
import Interfaces = require('./Interfaces')

/* tslint:disable:no-unused-variable */
const _typeCheckerAndroid: Interfaces.PluginInterface = AndroidPlugin
const _typeCheckeriOS: Interfaces.PluginInterface = iOSPlugin
const _typeCheckerWeb: Interfaces.PluginInterface = WebPlugin
/* tslint:enable:no-unused-variable */
