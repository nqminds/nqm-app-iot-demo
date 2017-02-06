import React from "react";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import {List, ListItem} from "material-ui/List";
import * as ColorManipulator from "material-ui/utils/colorManipulator";
import * as _ from "lodash";

const disabledIconType = "check_box_outline_blank";
const enabledIconType = "check_box";
const styles = {
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemStyle: {
    borderRight: "4px solid transparent",
  },
};

class BusList extends React.Component {
  constructor(props) {
    super(props);

    this.onClickBus = this.onClickBus.bind(this);
  }

  onSelectBus(id) {
    this.props.selectBus(id);
  }

  onClickBus(id) {
    this.props.clickBus(id);
  }

  render() {
    const dynamicStyles = {
      activeItemStyle: {
        backgroundColor: ColorManipulator.darken(this.context.muiTheme.palette.canvasColor, 0.1),
        fontWeight: "bold",
        borderRight: `4px solid ${this.context.muiTheme.palette.accent1Color}`,
      },
    };

    let iconType;

    const list = _.map(this.props.data, (d, i) => {
      if (this.props.selectBusList[d.ID] === undefined)
        iconType = disabledIconType;
      else {
        if (this.props.selectBusList[d.ID])
          iconType = enabledIconType;
        else
          iconType = disabledIconType;
      }

      const titleList = d.Title.split("_");
      const itemStyle = (d.ID === this.props.currentBusID) ? dynamicStyles.activeItemStyle : styles.itemStyle;
      return (
        <ListItem
          innerDivStyle={itemStyle}
          key={i}
          leftIcon={<FontIcon className="material-icons">directions_bus</FontIcon>}
          rightIconButton={
            <IconButton onClick={this.onSelectBus.bind(this, d.ID)}>
              <FontIcon className="material-icons">{iconType}</FontIcon>
            </IconButton>}
          primaryText={`${titleList[0]} ${titleList[2]}`}
          secondaryText={titleList[1]}
          onClick={this.onClickBus.bind(this, d.ID)}
        />);
    });

    return (
      <List style={styles.list}>
        {list}
      </List>
    );
  }
}

BusList.propTypes = {
  clickBus: React.PropTypes.func.isRequired,
  currentBusID: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  selectBus: React.PropTypes.func.isRequired,
  selectBusList: React.PropTypes.object.isRequired,
};

BusList.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default BusList;
