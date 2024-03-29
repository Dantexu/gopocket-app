import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, fontStyles } from '../../../styles/common';
import PropTypes from 'prop-types';
import iconArrow from '../../../images/move_arrow.png';
import TokenImage from '../TokenImage';
import iconArbi from '../../../images/ic_arb.png';
import iconPolygon from '../../../images/ic_polygon.png';
import iconEther from '../../../images/ic_ethereum.png';
import { strings } from '../../../../locales/i18n';
import Engine from '../../../core/Engine';

const logoBorderColor = '#DCDCDC';
const logoBgColor = '#ECEFF0';

const styles = StyleSheet.create({
	rowIcon: {
		flexDirection: 'row',
		marginTop: 42
	},
	colFrom: {
		alignItems: 'center'
	},
	colIcon: {
		alignItems: 'center',
		marginHorizontal: 26
	},
	colTo: {
		alignItems: 'center'
	},
	name: {
		marginTop: 10,
		fontSize: 14,
		...fontStyles.bold
	},
	ethLogo: {
		width: 30,
		height: 30,
		borderRadius: 30,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: logoBorderColor,
		backgroundColor: logoBgColor
	},
	symbolText: {
		fontSize: 12,
		color: colors.$030319
	},
	iconStyle: {
		width: 30,
		height: 30,
		alignItems: 'center'
	},
	iconNet: {
		width: 60,
		height: 60
	}
});

class MoveIndicator extends PureComponent {
	static propTypes = {
		asset: PropTypes.object
	};

	renderLogo = () => {
		const { asset } = this.props;
		return <TokenImage asset={asset} containerStyle={styles.ethLogo} iconStyle={styles.iconStyle} />;
	};

	getIcon(chainId) {
		const {
			state: {
				provider: { chainId: polygonChainId }
			}
		} = Engine.context.PolygonNetworkController;
		if (chainId === polygonChainId) {
			return iconPolygon;
		}
		return iconArbi;
	}

	getNetwork(chainId) {
		const {
			state: {
				provider: { chainId: polygonChainId }
			}
		} = Engine.context.PolygonNetworkController;
		if (chainId === polygonChainId) {
			return strings('other.polygon');
		}
		return strings('other.arbitrum');
	}

	render = () => {
		const {
			asset: { symbol, chainId }
		} = this.props;

		return (
			<View style={styles.rowIcon}>
				<View style={styles.colFrom}>
					<Image style={styles.iconNet} source={this.getIcon(chainId)} />
					<Text style={styles.name}>{this.getNetwork(chainId)}</Text>
				</View>
				<View style={styles.colIcon}>
					{this.renderLogo()}
					<Text style={styles.symbolText}>{symbol}</Text>
					<Image source={iconArrow} />
				</View>
				<View style={styles.colTo}>
					<Image style={styles.iconNet} source={iconEther} />
					<Text style={styles.name}>{strings('other.ethereum')}</Text>
				</View>
			</View>
		);
	};
}

export default MoveIndicator;
