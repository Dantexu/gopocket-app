import { BigNumber, utils as EthersUtils } from 'ethers';
import * as axios from 'axios';
import { BigNumber as BignumberJs } from 'bignumber.js';
import { BN, toChecksumAddress, stripHexPrefix, isValidAddress, addHexPrefix, isZeroAddress } from 'ethereumjs-util';
import * as EthjsUnit from 'ethjs-unit';
import * as RNFS from 'react-native-fs';
import { wordlists } from 'bip39';
import { Mutex } from 'async-mutex';
import URL from 'url-parse';
import * as ArbConfig from './ArbConfig.json';
import * as util from './util';
import * as ETH_JSON from './static-token/ethereum.json';
import * as BSC_JSON from './static-token/binance-smart-chain.json';
import * as POLYGON_JSON from './static-token/polygon-pos.json';
import * as HECO_JSON from './static-token/huobi-token.json';
import * as TRON_JSON from './static-token/tron.json';
import * as OP_JSON from './static-token/optimistic-ethereum.json';
import * as AVAX_JSON from './static-token/avalanche.json';
import * as ARB_JSON from './static-token/arbitrum.json';

export * from './approval/ApprovalEventsController';
export * from './assets/AssetsContractController';
export * from './assets/ArbContractController';
export * from './assets/OpContractController';
export * from './assets/BscContractController';
export * from './assets/PolygonContractController';
export * from './assets/TronContractController';
export * from './assets/HecoContractController';
export * from './assets/AvaxContractController';
export * from './assets/RpcContractController';
export * from './assets/AssetsController';
export * from './assets/AssetsDetectionController';
export * from './BaseController';
export * from './ComposableController';
export * from './keyring/KeyringController';
export * from './message-manager/MessageManager';
export * from './network/NetworkController';
export * from './network/ArbNetworkController';
export * from './network/OpNetworkController';
export * from './network/BscNetworkController';
export * from './network/PolygonNetworkController';
export * from './network/TronNetworkController';
export * from './network/HecoNetworkController';
export * from './network/AvaxNetworkController';
export * from './network/RpcNetworkController';
export * from './user/PreferencesController';
export * from './assets/TokenBalancesController';
export * from './assets/TokenRatesController';
export * from './transaction/TransactionController';
export * from './message-manager/PersonalMessageManager';
export * from './message-manager/TypedMessageManager';
export * from './binance/BscBridgeController';
export * from './security/SecurityController';
export * from './invite/InviteController';
export * from './assets/CollectiblesController';
export * from './assets/AssetsDataModel';
export * from './user/EnsController';
export * from './transaction/Sqlite';
export * from './assets/DefiProtocolController';

// ethers
export { BigNumber, EthersUtils };

export { util, ETH_JSON, BSC_JSON, POLYGON_JSON, HECO_JSON, TRON_JSON, OP_JSON, AVAX_JSON, ARB_JSON, axios, BignumberJs, EthjsUnit, RNFS, wordlists, Mutex, URL };
// ethereumjs-util
export { BN, toChecksumAddress, stripHexPrefix, isValidAddress, addHexPrefix, isZeroAddress };

export { ArbConfig };
