'use strict';

import React, {
  PropTypes,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import autobind from 'autobind-decorator';

export default class Tab extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    hidesTabTouch: PropTypes.bool
  };

  render() {
    let icon = React.Children.only(this.props.children);
    return (
      <TouchableWithoutFeedback
        onPress={this._handlePress}
        style={styles.container}>
        <View>
          {icon}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  @autobind
  _handlePress(event) {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
