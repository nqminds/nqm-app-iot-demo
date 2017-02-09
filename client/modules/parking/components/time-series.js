import React from "react";
import * as d3 from "d3";

/* Data consists of :
{value: 10, timestamp: unixTime}

*/

class TimeSeries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: props.height - 20,
      width: props.width - 70,
    };

    this.xScale = d3.scale.linear();
    this.yScale = d3.scale.linear();
    this.xAxis = d3.svg.axis()
      .scale(this.xScale)
      .orient("bottom")
      .ticks(4)
      .tickFormat(d3.format(""));
    this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient("left")
      .ticks(4)
      .tickFormat((d) => {
        if (d / 100000 > 0) {
          return `£${Math.round(d / 100000) / 10}M`;
        } else if (d / 1000 > 0) {
          return `£${Math.round(d / 100) / 10}K`;
        } else return `£${d}`;
      });
    this.line = d3.svg.line();

    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.draw(this.props);
  }

  draw(props) {
    props.data.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    const yMin = d3.min(props.data, (d) => {
      return d.value;
    });
    const yMax = d3.max(props.data, (d) => {
      return d.value;
    });
    this.yScale.domain([0.8 * yMin, 1.2 * yMax])
      .range([this.state.height, 0]);

    const xMin = d3.min(props.data, (d) => {
      return d.timestamp;
    });
    const xMax = d3.max(props.data, (d) => {
      return d.timestamp;
    });
    this.xScale.domain([xMin, xMax])
      .range([0, this.state.width]);

    this.line.interpolate("cardinal")
      .x((d) => {
        return this.xScale(d.timestamp);
      })
      .y((d) => {
        return this.yScale(d.value);
      });

    const svg = d3.select(`#${props.className}`);
    svg.select(`#x-axis${props.className}`)
      .transition()
      .call(this.xAxis);
    svg.select(`#y-axis${props.className}`)
      .transition()
      .call(this.yAxis);

    const yLabel = svg.select(`#yLabel${props.className}`);
    const yLength = yLabel.node().getComputedTextLength();
    yLabel.attr("transform", `translate(15, ${(this.props.height - yLength) * 0.5 + yLength})rotate(-90)`);

    const path = svg.select(`#line${props.className}`)
      .attr("d", this.line(props.data));
    const totalLength = path.node().getTotalLength();
    path.attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .ease("linear")
      .attr("stroke-dashoffset", 0);

    const dots = svg.select(`#dots${props.className}`)
      .selectAll(`.dot.${props.className}`)
      .data(props.data);
    dots.enter()
      .append("circle")
      .attr("class", `dot ${props.className}`)
      .style("fill", this.context.muiTheme.palette.accent1Color)
      .attr("r", 2.5)
      .attr("fill-opacity", 0);
    dots.transition()
      .delay((d, i) => {
        return i * 1000 / props.data.length;
      })
      .transition()
      .attr("fill-opacity", 1)
      .attr("cx", (d) => {
        return this.xScale(d.timestamp);
      })
      .attr("cy", (d) => {
        return this.yScale(d.value);
      });
  }

  render() {
    return (
      <svg
        id={this.props.className}
        height={this.props.height}
        width={this.props.width}
      >
        <text
          id={`yLabel${this.props.className}`}
        >
          {this.props.yLabel}
        </text>
        <g
          id={`offset${this.props.className}`}
          transform="translate(65, 0)"
        >
          <path
            id={`line${this.props.className}`}
            className="line"
          />
          <g id={`dots${this.props.className}`} />
          <g
            id={`x-axis${this.props.className}`}
            className="axis"
            transform={`translate(0, ${this.state.height})`}
          />
          <g
            id={`y-axis${this.props.className}`}
            className="axis"
          />
        </g>
      </svg>
    );
  }
}

TimeSeries.contextTypes = {
  muiTheme: React.PropTypes.object,
};

TimeSeries.propTypes = {
  className: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  yLabel: React.PropTypes.string.isRequired,
};

export default TimeSeries;
