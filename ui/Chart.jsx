import { h, Fragment } from "preact";

const STROKE = 1;

const labelStyle = {
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  color: "#808080",
};

const rotateStyles = {
  transform: "rotate(-90deg)",
  width: 35,
  transformOrigin: "center",
  marginTop: 50,
  marginRight: 20,
};

export const AxisLabel = ({ text, rotate }) => (
  <div>
    <span style={{ ...labelStyle, ...(rotate ? rotateStyles : {}) }}>
      {text}
    </span>
  </div>
);

export const LineChart = ({
  data,
  height = 200,
  width = 500,
  numberOfHorizontalGuides = 4,
  numberOfVerticalGuides = null,
  precision = 2,
}) => {
  const FONT_SIZE = width / 50;
  const maximumXFromData = Math.max(...data.map((e) => e.x));
  const maximumYFromData = Math.max(...data.map((e) => e.y));

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data
    .map((element) => {
      const x = (element.x / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(" ");

  const Axis = ({ points }) => (
    <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
  );

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  );

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  );

  const VerticalGuides = () => {
    const guideCount = numberOfVerticalGuides || data.length - 1;

    const startY = padding;
    const endY = height - padding;

    return new Array(guideCount).fill(0).map((_, index) => {
      const ratio = (index + 1) / guideCount;

      const xCoordinate = padding + ratio * (width - padding * 2);

      return (
        <Fragment key={index}>
          <polyline
            fill="none"
            stroke="#ccc"
            strokeWidth=".5"
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </Fragment>
      );
    });
  };

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width - padding;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const ratio = (index + 1) / numberOfHorizontalGuides;

      const yCoordinate = chartHeight - chartHeight * ratio + padding;

      return (
        <Fragment key={index}>
          <polyline
            fill="none"
            stroke={"#ccc"}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </Fragment>
      );
    });
  };

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2;

    return data.map((element, index) => {
      const x =
        (element.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: "#808080",
            fontSize: FONT_SIZE,
            fontFamily: "Helvetica",
          }}
        >
          {element.label}
        </text>
      );
    });
  };

  const LabelsYAxis = () => {
    const PARTS = numberOfHorizontalGuides;
    return new Array(PARTS + 1).fill(0).map((_, index) => {
      const x = FONT_SIZE;
      const ratio = index / numberOfHorizontalGuides;

      const yCoordinate =
        chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={yCoordinate}
          style={{
            fill: "#808080",
            fontSize: FONT_SIZE,
            fontFamily: "Helvetica",
          }}
        >
          {parseFloat(maximumYFromData * (index / PARTS)).toFixed(precision)}
        </text>
      );
    });
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      //style={{ border: "0.5px solid #ccc" }}
    >
      <XAxis />
      <LabelsXAxis />
      <YAxis />
      <LabelsYAxis />
      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />

      <polyline
        fill="none"
        stroke="#0074d9"
        strokeWidth={STROKE}
        points={points}
      />
    </svg>
  );
};

export const Chart = ({ data }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content auto",
        alignItems: "center",
      }}
    >
      <AxisLabel text="$" rotate />
      <div style={{ alignSelf: "flex-start" }}>
        <LineChart
          width={700}
          height={250}
          data={data}
          horizontalGuides={5}
          precision={2}
          verticalGuides={1}
        />
      </div>
      <div />
      <AxisLabel text="1y" />
    </div>
  );
};
