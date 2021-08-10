import React from "react";
import { Text, View } from "@react-pdf/renderer";

const ProjectTableDocument = (props) => {
  const project = props.project;
  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Name</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Outside temp</Text>
          <Text style={tableCellHeaderStyleUnit}>[°C]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Ground temp</Text>
          <Text style={tableCellHeaderStyleUnit}>[°C]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Degree days</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Total floor area</Text>
          <Text style={tableCellHeaderStyleUnit}>[m²]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Specific heat loss</Text>
          <Text style={tableCellHeaderStyleUnit}>[W/m²]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Total-heat-loss</Text>
          <Text style={tableCellHeaderStyleUnit}>[W]</Text>
        </View>
      </View>
    );
  };

  const createTableRow = () => {
    return (
      <View style={tableRowStyle}>
        <View style={firstTableColStyle}>
          <Text style={tableCellStyle}>{project.name}</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>
            {parseFloat(project.outsideT.toFixed(2))} 
          </Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>
            {parseFloat(project.groundT.toFixed(2))}
          </Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>
            {parseFloat(project.dDays.toFixed(2))}
          </Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>
            {parseFloat(project.totalFloorArea.toFixed(2))}
          </Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>
            {parseFloat(project.specHeatLoss.toFixed(2))}
          </Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>
            {parseFloat(project.totalHeatLoss.toFixed(2))}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tableStyle}>
      {createTableHeader()}
      {createTableRow()}
    </View>
  );
};

// const pageStyle = {
//   paddingTop: 16,
//   paddingHorizontal: 40,
//   paddingBottom: 56,
// };

const tableStyle = {
  display: "table",
  width: "auto",
};

const tableRowStyle = {
  flexDirection: "row",
};

const firstTableColHeaderStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#325ea8",
  color: "#fff",
  fontSize: "10px",
};

const tableColHeaderStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#325ea8",
  color: "#fff",
  fontSize: "10px",
};

const firstTableColStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
};

const tableColStyle = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
};

const tableCellHeaderStyle = {
  textAlign: "center",
  marginTop: 4,
  fontWeight: "bold",
  fontSize: "10px",
};
const tableCellHeaderStyleUnit = {
  textAlign: "center",
  marginBottom: 4,
  fontWeight: "bold",
  fontSize: "8px",
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: "10px",
};

export default ProjectTableDocument;
