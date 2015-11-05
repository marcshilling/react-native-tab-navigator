# TabNavigator [![Slack](http://slack.exponentjs.com/badge.svg)](http://slack.exponentjs.com)
A tab bar that switches between scenes, written in JS for cross-platform support. It works on iOS and Android.

To use this component, you will need to enable the following Babel options:
 - es7.decorators
 - es7.classProperties
 - es6.modules

The look and feel is slightly different than the native navigator but it is better in some ways. Also it is pure JavaScript.

The API of this component may change in the future to be more like Navigator's, which works great once there is better support for nested Navigators in React Native.

## Usage

```js
<TabNavigator>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'home'}
    renderIcon={() => <Image source={...} />}
    renderSelectedIcon={() => <Image source={...} />}
    onPress={() => this.setState({ selectedTab: 'home' })}>
    {homeView}
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === 'profile'}
    renderIcon={() => <Image source={...} />}
    renderSelectedIcon={() => <Image source={...} />}
    onPress={() => this.setState({ selectedTab: 'profile' })}>
    {profileView}
  </TabNavigator.Item>
</TabNavigator>
```

See TabNavigatorItem's supported props for more info.

### Hiding the Tab Bar

You can hide the tab bar by using styles. For example:
```js
let tabBarHeight = 0;
<TabNavigator
  tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
  sceneStyle={{ paddingBottom: tabBarHeight }}
/>
```
