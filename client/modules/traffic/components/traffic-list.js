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

class TrafficList extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickTraffic(id) {
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

    const list = _.map(this.props.trafficMetadata, (d, i) => {
      const itemStyle = (d.ID === this.props.currentTrafficID) ? dynamicStyles.activeItemStyle : styles.itemStyle;
      const titleStr = d.Title.split("_");
      return (
        <ListItem
          innerDivStyle={itemStyle}
          key={i}
          leftIcon={<FontIcon className="material-icons">traffic</FontIcon>}
          primaryText={`${titleStr[2]} ${titleStr[3]}`}
          secondaryText={`Group: ${d.Group.toString()}`}
          onClick={this.onClickTraffic.bind(this, d.ID)}
        />);
    });

    return (
      <List style={styles.list}>
        {list}
      </List>
    );
  }
}

TrafficList.propTypes = {
  clickList: React.PropTypes.func.isRequired,
  currentTrafficID: React.PropTypes.number.isRequired,
  setSidebarDocked: React.PropTypes.func.isRequired,
  trafficMetadata: React.PropTypes.object.isRequired,
};

TrafficList.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default TrafficList;
