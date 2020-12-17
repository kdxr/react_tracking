import React, { useContext, useEffect, useState } from "react";
import Costdetail from "../../../components/costDetail/costDetail";
import moment from "moment";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { Col, Row, Table } from "antd";
import UserContext from "../../../contexts/user-context";
import Axios from "axios";
import { ShopTwoTone } from "@ant-design/icons";

const Preview = () => {

  const [constdata, setconstData] = useState([]);
  const { stateUser } = useContext(UserContext);
  const showPDFname = [];
  const showPDcost = [];
  const showPDFdate = [];
  var kdxr_url = new URL(window.location.href); /// kdxr
  var get_pdid = kdxr_url.searchParams.get("pdid") || "0"; //kdxr
  const costDetailLocal = localStorage.getItem("Cost");
  var arrayss = undefined;
  const pid = parseInt(get_pdid);

  useEffect(() => {
    //console.log(pid);
    Axios({
      url: `${process.env.REACT_APP_API_URL}/cost/getcost`,
      data: { ProductId: pid },
      method: "PUT",
    })
      .then((res) => {
        setconstData(res.data.data);
        // dispatchUser &&
        //   dispatchUser({
        //     type: "setCostDetails",
        //     payload: res.data.data,
        //   });
      })
      .catch((err) => console.log(err));
  }, [pid]);

  // Create styles
  const styles = StyleSheet.create({
    body: {
      padding: 35,
      paddingBottom: 65,
      paddingHorizontal: 50,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      // fontFamily: "Oswald",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Oswald",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 40,
      textAlign: "right",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    tableCol1: {
      width: "40%",
      borderStyle: "solid",
      borderColor: "#fff",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 12,
      paddingTop: 15,
      // paddingBottom: 10,
    },
    tableRow: {
      margin: "0",
      flexDirection: "row",
    
    },
    tableCol: {
      width: "30%",
      borderStyle: "solid",
      borderColor: "#fff",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 12,
      paddingTop: 15,
      // paddingBottom: 10,
    },
    tableCol1Header: {
      width: "40%",
      borderStyle: "solid",
      borderColor: "#fff",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColHeader: {
      width: "30%",
      borderStyle: "solid",
      borderColor: "#fff",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    Textright: {
      textAlign: "right",
    },
    tableCellHeaderRight: {
      textAlign: "right",
      //width: "30%",
      borderWidth: 0,
    },
    tableCellHeaderRightanduotton: {
      textAlign: "right",
      marginTop: "90px",
      fontSize: 15,
    },
    signature: {
      textAlign: "right",
      marginTop: "20px",
      fontSize: 12,
    },
    signature1: {
      textAlign: "right",
      marginRight: "75px",
      marginTop: "70px",
      fontSize: 12,
    },
  });
  
/// Data ===================================================================
  let costSumary = 0; // รวมค่าใช้จ่ายทั้งหมด
  let pName = ''; //ชื่อโปรดัก
  
  for (let index = 0; index < constdata.length; index++) {
    const element = constdata[index]; //ข้อมูลค่าใช้จ่าย
    const date = new Date(moment(element["date_onsite"]).format()); //ข้อมูลวันที่
    const costDate = date.toLocaleDateString("th-TH", {  //แปลงวันทีี่ให้อยู่ในรูปแบบภาษาไทย
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    pName = element["name"]

// put data in table =====================================================
    showPDFname.push(
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <View key={index} style={styles.section}>
            <Text>
              {costDate}  {/* ข้อมูลวันที่ ที่ไป */}   
            </Text>  
          </View>
        </View>
        <View style={styles.tableCol1}>
          <View key={index} style={styles.section}>
            <Text>
              {element["des_data"]}  {/* ข้อมูลสถานที่ ที่ไป */}   
            </Text>    
          </View>
        </View>
        <View style={styles.tableCol}>
          <View key={index} style={styles.section}>
            <Text style={styles.Textright}>{element["cost"]}</Text>
            {/* <Text>{costDate}</Text> */}
          </View>
        </View>
      </View>
    );

    //Cal Sumary
    costSumary += element["cost"];

    // if(index === constdata.length) //หา last child
    // {

    // }
  }

  //console.log({ costDetails: stateUser });

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.body}>
          
          <Text style={styles.header} fixed>
            {" "}{pName}{" "}
          </Text>

          <View style={styles.tableRow}>
            <View style={styles.tableCol1Header}>
              <Text style={styles.tableCellHeader}>
                Date
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                The place
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeaderRight}>
                Cost
              </Text>
            </View>
          </View>
          {showPDFname}
          <Text style={styles.tableCellHeaderRightanduotton}>
            Net total {costSumary} Bath
          </Text>
          <Text style={styles.signature1}>Signature</Text>
          <Text style={styles.signature}>
            (		&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;)
          </Text>
          
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
    // <>{get_pdid}</>
  );
};

export default Preview;
