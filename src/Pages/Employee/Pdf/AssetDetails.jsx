import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink } from '@react-pdf/renderer';
import AssetDocument from './AssetDocument';
const AssetDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: asset = {}, isLoading, error } = useQuery({
        queryKey: ['assetDetails', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assetOne/${id}`);
            return data;
        },
    });
    console.log(asset)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching asset details</div>;
    return (
        <div className="p-8 bg-white rounded-lg shadow-lg border-2 border-primary mt-12 mb-24">
            <h1 className="text-3xl font-bold mb-4">Asset Details</h1>
            <div className="mb-4">
                <strong>Company Information</strong>
            </div>
            <div className="mb-4">
                <strong>Asset Name:</strong> {asset.product_name}
            </div>
            <div className="mb-4">
                <strong>Asset Type:</strong> {asset.product_type}
            </div>
            <div className="mb-4">
                <strong>Request Date:</strong> {asset?.requestDate}
            </div>
            <div className="mb-4">
                <strong>Approval Date:</strong> {asset?.approvalDate}
            </div>
            <div className="mb-4">
                <strong>Printing Date:</strong> {new Date().toLocaleDateString()}
            </div>
            <PDFDownloadLink
                document={<AssetDocument asset={asset} />}
                fileName="asset-details.pdf"
                className="btn btn-primary"
            >
                {({ loading }) => (loading ? 'Loading document...' : 'Print')}
            </PDFDownloadLink>
        </div>
    );
};

export default AssetDetails;