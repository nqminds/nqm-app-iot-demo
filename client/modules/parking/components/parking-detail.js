import React from "react";
import IconButton from "material-ui/IconButton";

const ParkingDetail = (InnerComponent) => class ParkingDetail extends React.Component {
  static propTypes = {
    setSidebarFloating: React.PropTypes.func,
    showClose: React.PropTypes.bool,
  }
  render() {
    let closeButton;
    if (this.props.showClose) {
      closeButton = (
        <IconButton
          style={{float: "right"}}
          iconClassName="material-icons"
          onTouchTap={() => (this.props.setSidebarFloating(false))}
        >close</IconButton>
      );
    }
    return (
      <div>
        {closeButton}
        <InnerComponent />
      </div>
    );
  }
};

export default ParkingDetail;
