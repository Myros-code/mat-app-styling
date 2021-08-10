import React from "react";
import { Text, View } from "@react-pdf/renderer";

const RoomsTableDocument = (props) => {
  const rooms = props.rooms;
  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>ID</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Name</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Room temp</Text>
          <Text style={tableCellHeaderStyleUnit}>[°C]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Floor area</Text>
          <Text style={tableCellHeaderStyleUnit}>[m²]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Room volume</Text>
          <Text style={tableCellHeaderStyleUnit}>[m³]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Ventilation-loss</Text>
          <Text style={tableCellHeaderStyleUnit}>[W]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Transmission-loss</Text>
          <Text style={tableCellHeaderStyleUnit}>[W]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Specific heat loss</Text>
          <Text style={tableCellHeaderStyleUnit}>[W/m²]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Response capacity</Text>
          <Text style={tableCellHeaderStyleUnit}>[W]</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Total heat loss</Text>
          <Text style={tableCellHeaderStyleUnit}>[W]</Text>
        </View>
      </View>
    );
  };

  const createTableRows = () => {
    return rooms.map((room, id) => {
      return (
        <View style={tableRowStyle} key={id}>
          <View style={firstTableColStyle}>
            <Text style={tableCellStyle}>{id}</Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>{room.name}</Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>{room.roomT}</Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>
              {parseFloat(room.area.toFixed(2))}
            </Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>
              {parseFloat(room.roomVolume.toFixed(2))}
            </Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>
              {parseFloat(room.venHeatLoss.toFixed(2))}
            </Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>
              {parseFloat(room.transmissionLoss.toFixed(2))}
            </Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>
              {parseFloat(room.specHeatLoss.toFixed(2))}
            </Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>
              {parseFloat(room.heatingPover.toFixed(2))}
            </Text>
          </View>

          <View style={tableColStyle}>
            <Text style={tableCellStyle}>
              {parseFloat(room.totalHeatLoss.toFixed(2))}
            </Text>
          </View>
        </View>
      );
    });
  };

  const rows = createTableRows();

  return (
    <View style={tableStyle}>
      {createTableHeader()}
      {rows}
    </View>
  );
};

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
  fontSize: "8px",
};

export default RoomsTableDocument;
