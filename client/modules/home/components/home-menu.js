import React from "react";
import injectSheet from "react-jss";
import _ from "lodash";

import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import * as ColorManipulator from "material-ui/utils/colorManipulator";

const styles = {
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemStyle: {
    borderRight: "4px solid transparent",
  },
};

class HomeMenu extends React.Component {
  static menuData = [
    {
      text: "Home",
      icon: "home",
      route: "/",
    },
    {
      text: "Map",
      icon: "map",
      route: "/map",
    },
    {
    },
    {
      text: "Modal",
      icon: "help",
      route: "/modal",
    },
  ];
  static propTypes = {
    setSidebarFloating: React.PropTypes.func,
    sheet: React.PropTypes.object,
  };
  static contextTypes = {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.object,
  };
  handleMenuItem(route) {
    this.props.setSidebarFloating(false);
    this.context.router.push(route);
  }
  render() {
    const dynamicStyles = {
      activeItemStyle: {
        backgroundColor: ColorManipulator.darken(this.context.muiTheme.palette.canvasColor, 0.1),
        fontWeight: "bold",
        borderRight: `4px solid ${this.context.muiTheme.palette.accent1Color}`,
      },
    };

    const menuItems = _.map(HomeMenu.menuData, (itemData, idx) => {
      if (itemData.text) {
        const active = this.context.router.isActive(itemData.route);
        const itemStyle = active ? dynamicStyles.activeItemStyle : styles.itemStyle;
        return (
          <ListItem
            innerDivStyle={itemStyle}
            key={idx}
            primaryText={itemData.text}
            rightIcon={<FontIcon className="material-icons">{itemData.icon}</FontIcon>}
            onTouchTap={this.handleMenuItem.bind(this, itemData.route)}
          />
        );
      } else {
        return <Divider key={idx} />;
      }
    });

    const content = (
      <List style={styles.list}>
        {menuItems}
      </List>
    );

    return content;
  }
}

export default injectSheet(styles)(HomeMenu);
