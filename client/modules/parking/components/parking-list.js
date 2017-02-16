import React from "react";
import IconButton from "material-ui/IconButton";
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

class ParkingList extends React.Component {
  constructor(props) {
    super(props);
  }

  clickList(id) {
    this.props.setSidebarDocked(false);
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

    const list = _.map(this.props.parkingMetadata, (d, i) => {
      const itemStyle = (i === this.props.currentParkingID) ? dynamicStyles.activeItemStyle : styles.itemStyle;
      return (
        <ListItem
          innerDivStyle={itemStyle}
          key={i}
          leftIcon={<FontIcon className="material-icons">local_parking</FontIcon>}
          primaryText={d.Street}
          secondaryText={d.BayType}
          onClick={this.clickList.bind(this, parseInt(i))}
        />);
    });

    return (
      <List style={styles.list}>
        {list}
      </List>
    );
  }
}

ParkingList.propTypes = {
  clickList: React.PropTypes.func.isRequired,
  currentParkingID: React.PropTypes.number.isRequired,
  parkingMetadata: React.PropTypes.object.isRequired,
  setSidebarDocked: React.PropTypes.func.isRequired,
};

ParkingList.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default ParkingList;
