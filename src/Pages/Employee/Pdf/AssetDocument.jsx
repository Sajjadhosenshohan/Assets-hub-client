
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#4CAF50', // Primary green color
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomStyle: 'solid',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4CAF50',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    fontSize: 10,
    color: '#A0A0A0',
  },
});

const AssetDocument = ({ asset }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Asset Details</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Information:</Text>
        <Text style={styles.text}>Asset Name: {asset.product_name}</Text>
        <Text style={styles.text}>Asset Quantity: {asset.product_quantity}</Text>
        <Text style={styles.text}>Asset Type: {asset.product_type}</Text>
        <Text style={styles.text}>Date Added: {new Date(asset.date_added).toLocaleDateString()}</Text>
        <Text style={styles.text}>Availability: {asset.availability}</Text>
        <Text style={styles.text}>Item Added By: {asset.Item_Added_By}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Request Information</Text>
        <Text style={styles.text}>Request Date: {new Date(asset.requestDate).toLocaleDateString()}</Text>
        <Text style={styles.text}>Requester Email: {asset.requesterEmail}</Text>
        <Text style={styles.text}>Requester Name: {asset.requesterName}</Text>
        <Text style={styles.text}>Notes: {asset.notes}</Text>
        <Text style={styles.text}>Status: {asset.status}</Text>
        <Text style={styles.text}>Approval Date: {asset.approvalDate? new Date(asset.approvedDate).toLocaleDateString() : 'N/A'}</Text>
      </View>

      <Text style={styles.footer}>Printing Date: {new Date().toLocaleDateString()}</Text>
    </Page>
  </Document>
);

export default AssetDocument;
