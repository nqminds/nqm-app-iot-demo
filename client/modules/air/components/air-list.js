import React from "react";
import FontIcon from "material-ui/FontIcon";
import {List, ListItem} from "material-ui/List";
import * as ColorManipulator from "material-ui/utils/colorManipulator";
import * as _ from "lodash";

const styles = {
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemStyle: {
    borderRight: "4px solid transparent",
  },
};

class AirList extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickAir(id) {
    this.props.clickList(id);
  }

  render() {
    const dynamicStyles = {
      activeItemStyle: {
        backgroundColor: ColorManipulator.darken(this.context.muiTheme.palette.canvasColor, 0.1),
        fontWeight: "bold",
        borderRight: `4px solid ${this.context.muiTheme.palette.accent1Color}`,
      },
    };

    const list = _.map(this.props.airMetadata, (d, i) => {
      const itemStyle = (i === this.props.currentAirID) ? dynamicStyles.activeItemStyle : styles.itemStyle;
      return (
        <ListItem
          innerDivStyle={itemStyle}
          key={i}
          leftIcon={<FontIcon className="material-icons">cloud</FontIcon>}
          primaryText={d.LocalAuthorityName}
          secondaryText={`Site code: ${d.SiteCode}`}
          onClick={this.onClickAir.bind(this, i)}
        />);
    });

    return (
      <List style={styles.list}>
        {list}
      </List>
    );
  }
}

AirList.propTypes = {
  airMetadata: React.PropTypes.object.isRequired,
  clickList: React.PropTypes.func.isRequired,
  currentAirID: React.PropTypes.string.isRequired,
  setSidebarFloating: React.PropTypes.func.isRequired,
};

AirList.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default AirList;
