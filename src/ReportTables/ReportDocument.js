import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ReportChart1 from "./charts/NewCharts/ReportChart1";
import ReportChart2 from "./charts/NewCharts/ReportChart2";
import ReportChart3 from "./charts/NewCharts/ReportChart3";
import ProjectTableDocument from "./pdfTable/ProjectTableDoc";
import RoomsTableDocument from "./pdfTable/RoomsTableDoc";
import brandingImg from "../images/brand.jpg";

// Create styles
const styles = StyleSheet.create({
  document: {
    paddingTop: "2cm",
    paddingBottom: "2cm",
  },
  page: {
    paddingLeft: "2cm",
    paddingRight: "1cm",
  },
  section: {
    margin: 15,
    padding: 10,
  },
  sectionTitle: {
    padding: 2,
    fontSize: 18,
    textAlign: "center",
  },
  brandingImg: {
    height: 120,
    width: "100%",
  },
});

// Create Document Component
const ReportDoc = (props) => {
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View wrap={false}>
          <View wrap={false}>
            <Image
              style={styles.brandingImg}
              alt="branding"
              src={brandingImg}
            />
          </View>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Project table</Text>
          <View>
            <ProjectTableDocument project={props.project} />
          </View>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Rooms table</Text>
          <View>
            <RoomsTableDocument rooms={props.rooms} />
          </View>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Heat loss summary</Text>
          <View>
            <ReportChart1 project={props.project} />
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Heat loss (building elements)</Text>
          <View>
            <ReportChart2 rooms={props.rooms} />
          </View>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Annual heating consumption</Text>
          <View>
            <ReportChart3 rooms={props.rooms} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportDoc;
