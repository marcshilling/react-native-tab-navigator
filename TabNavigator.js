'use strict';

import { Set } from 'immutable';
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Layout from './Layout';
import StaticContainer from './StaticContainer';
import Tab from './Tab';
import TabBar from './TabBar';
import TabNavigatorItem from './TabNavigatorItem';

export default class TabNavigator extends React.Component {
  static propTypes = {
    ...View.propTypes,
    sceneStyle: View.propTypes.style,
    tabBarStyle: TabBar.propTypes.style
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderedSceneKeys: this._updateRenderedSceneKeys(props.children)
    };
  }

  componentWillReceiveProps(nextProps) {
    let { renderedSceneKeys } = this.state;
    this.setState({
      renderedSceneKeys: this._updateRenderedSceneKeys(
        nextProps.children,
        renderedSceneKeys,
      )
    });
  }

  _getSceneKey(item, index): string {
    return `scene-${(item.key !== null) ? item.key : index}`;
  }

  _updateRenderedSceneKeys(children, oldSceneKeys = Set()): Set {
    let newSceneKeys = Set().asMutable();
    React.Children.forEach(children, (item, index) => {
      let key = this._getSceneKey(item, index);
      if (oldSceneKeys.has(key) || item.props.selected) {
        newSceneKeys.add(key);
      }
    });
    return newSceneKeys.asImmutable();
  }

  render() {
    let { style, children, tabBarStyle, sceneStyle, ...props } = this.props;
    let scenes = [];

    React.Children.forEach(children, (item, index) => {
      let sceneKey = this._getSceneKey(item, index);
      if (!this.state.renderedSceneKeys.has(sceneKey)) {
        return;
      }

      let { selected } = item.props;
      let scene =
        <SceneContainer key={sceneKey} selected={selected} style={sceneStyle}>
          {item}
        </SceneContainer>;

      scenes.push(scene);
    });

    return (
      <View {...props} style={[styles.container, style]}>
        {scenes}
        <TabBar style={tabBarStyle}>
          {React.Children.map(children, this._renderTab)}
        </TabBar>
      </View>
    );
  }

  _renderTab = (item) => {
    let icon;
    if (item.props.selected) {
      if (item.props.renderSelectedIcon) {
        icon = item.props.renderSelectedIcon();
      } else if (item.props.renderIcon) {
        let defaultIcon = item.props.renderIcon();
        icon = React.cloneElement(defaultIcon, {
          style: [defaultIcon.props.style, styles.defaultSelectedIcon]
        });
      }
    } else if (item.props.renderIcon) {
      icon = item.props.renderIcon();
    }

    return (
      <Tab
        onPress={item.props.onPress}
        hidesTabTouch={this.props.hidesTabTouch}>
        {icon}
      </Tab>
    );
  }
}

class SceneContainer extends React.Component {
  static propTypes = {
    ...View.propTypes,
    selected: PropTypes.bool
  };

  render() {
    let { selected, ...props } = this.props;
    return (
      <View
        {...props}
        pointerEvents={selected ? 'auto' : 'none'}
        removeClippedSubviews={!selected}
        style={[
          styles.sceneContainer,
          selected ? null : styles.hiddenSceneContainer,
          props.style
        ]}>
        <StaticContainer shouldUpdate={selected}>
          {this.props.children}
        </StaticContainer>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sceneContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Layout.tabBarHeight
  },
  hiddenSceneContainer: {
    overflow: 'hidden',
    opacity: 0
  },
  defaultSelectedIcon: {
    tintColor: 'rgb(0, 122, 255)'
  }
});

TabNavigator.Item = TabNavigatorItem;
