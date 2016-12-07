import React from "react";
import injectSheet from "react-jss";

import FlatButton from "material-ui/FlatButton";

const styles = {
  root: {
    padding: "4px 4px 0px 4px",
  },
};

class MapMenu extends React.Component {
  static propTypes = {
    activeDetail: React.PropTypes.string,
    sheet: React.PropTypes.object,
    showDetail: React.PropTypes.func,
  };
  static contextTypes = {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.object,
  };
  handleMenuItem() {
    this.props.showDetail(this.props.activeDetail ? "" : "overview");
  }
  render() {
    const {classes} = this.props.sheet;
    const content = (
      <div className={classes.root}>
        <FlatButton label="toggle details" onTouchTap={this.handleMenuItem.bind(this)} />
      </div>
    );

    return content;
  }
}

export default injectSheet(styles)(MapMenu);
