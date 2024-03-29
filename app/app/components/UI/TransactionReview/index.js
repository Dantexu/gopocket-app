import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { colors, fontStyles, baseStyles } from '../../../styles/common';
import { connect } from 'react-redux';
import { strings } from '../../../../locales/i18n';
import { getNormalizedTxState, getTicker } from '../../../util/transactions';
import { getTypeByChainId, renderAmount, renderFromWei } from '../../../util/number';
import { renderShortAddress } from '../../../util/address';
import TransactionHeader from '../TransactionHeader';
import { WALLET_CONNECT_ORIGIN } from '../../../util/walletconnect';
import NetworkFee from '../NetworkFee';
import { getActiveUrl } from '../../../util/browser';

const styles = StyleSheet.create({
	root: {
		width: '100%',
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30
	},
	title: {
		...fontStyles.bold,
		fontSize: 20,
		textAlign: 'center',
		color: colors.$202020,
		lineHeight: 28,
		paddingHorizontal: 20
	},
	fromWrapper: {
		marginTop: 26,
		flexDirection: 'row',
		alignItems: 'center'
	},
	toWrapper: {
		marginTop: 12,
		flexDirection: 'row',
		alignItems: 'center'
	},
	addressTitle: {
		width: 51,
		color: colors.$030319,
		...fontStyles.bold,
		fontSize: 16
	},
	address: {
		color: colors.$60657D,
		fontSize: 12
	},
	amountWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 18
	},
	amountTitle: {
		color: colors.$030319,
		...fontStyles.bold,
		fontSize: 16
	},
	amount: {
		color: colors.$030319,
		...fontStyles.bold,
		fontSize: 13
	},
	networkFee: {
		marginTop: 33
	}
});

/**
 * PureComponent that supports reviewing a transaction
 */
class TransactionReview extends PureComponent {
	static propTypes = {
		/**
		 * Transaction object associated with this transaction
		 */
		transaction: PropTypes.object,
		/**
		 * Browser/tab information
		 */
		browser: PropTypes.object,

		onFeesChange: PropTypes.func
	};

	getUrlFromBrowser() {
		const { browser, transaction } = this.props;
		if (transaction.origin && transaction.origin.includes(WALLET_CONNECT_ORIGIN)) {
			return transaction.origin.split(WALLET_CONNECT_ORIGIN)[1];
		}
		return getActiveUrl(browser);
	}

	onGasChange = (gasPriceBNWei, maxPriorityFeePerGasBN, maxFeePerGasBN, estimatedBaseFeeBN, limitGas) => {
		this.setState({ gasPriceBNWei });
		this.props.onFeesChange(gasPriceBNWei, maxPriorityFeePerGasBN, maxFeePerGasBN, estimatedBaseFeeBN, limitGas);
	};

	getType = () => {
		const { transaction } = this.props;
		let symbol = transaction.extra?.transferInformation?.symbol;
		if (symbol) {
			return symbol;
		}
		symbol = transaction.selectedAsset?.symbol;
		if (symbol) {
			return symbol;
		}
		return transaction.nativeCurrency ? getTicker(undefined, transaction.selectedAsset?.type) : 'ERC20';
	};

	render = () => {
		const {
			transaction,
			transaction: { value, origin }
		} = this.props;
		const currentPageInformation = { url: this.getUrlFromBrowser(), origin };
		let amount = renderFromWei(value);
		if (transaction.selectedAsset?.balance) {
			amount = transaction.selectedAsset.balance;
		}
		const type = getTypeByChainId(transaction.chainId);

		return (
			<View style={styles.root} testID={'approve-screen'}>
				<Text style={styles.title}>{strings('transaction.request')}</Text>
				<TransactionHeader currentPageInformation={currentPageInformation} />
				<View style={styles.fromWrapper}>
					<Text style={styles.addressTitle}>{strings('other.from')}</Text>
					<Text style={styles.address}>{renderShortAddress(transaction.from, 17)}</Text>
				</View>
				<View style={styles.toWrapper}>
					<Text style={styles.addressTitle}>{strings('other.to')}</Text>
					<Text style={styles.address}>{renderShortAddress(transaction.to, 17)}</Text>
				</View>
				{amount && amount > 0 && (
					<View style={styles.amountWrapper}>
						<Text style={styles.amountTitle}>{strings('other.amount')}</Text>
						<View style={baseStyles.flexGrow} />
						<Text style={styles.amount}>
							{renderAmount(amount)} {this.getType()}
						</Text>
					</View>
				)}
				<View style={styles.networkFee}>
					<NetworkFee transaction={transaction.transaction} type={type} onChange={this.onGasChange} />
				</View>
			</View>
		);
	};
}

const mapStateToProps = state => ({
	transaction: getNormalizedTxState(state),
	browser: state.browser
});

export default connect(mapStateToProps)(TransactionReview);
