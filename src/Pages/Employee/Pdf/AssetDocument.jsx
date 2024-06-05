
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    fontSize: 12,
  },
});

const AssetDocument = ({ asset }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Company Information</Text>
        <Text style={styles.text}>Asset Name: {asset.product_name}</Text>
        <Text style={styles.text}>Asset Type: {asset.product_type}</Text>
        <Text style={styles.text}>Request Date: {asset?.requestDate}</Text>
        <Text style={styles.text}>Approval Date: {asset?.approvalDate}</Text>
      </View>
      <Text style={styles.footer}>Printing Date: {new Date().toLocaleDateString()}</Text>
    </Page>
  </Document>
);

export default AssetDocument;
