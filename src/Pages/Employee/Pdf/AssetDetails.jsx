
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Components/Spinner";
import { PDFDownloadLink } from '@react-pdf/renderer';
import AssetDocument from './AssetDocument';
import { Helmet } from "react-helmet-async";
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

    if (isLoading) return <Spinner />;
    if (error) return <div>Error fetching asset details</div>;

    return (
        <div className="max-w-4xl mt-24 mb-12 mx-auto my-8 px-4">
            <Helmet>
                <title>Asset Details</title>
            </Helmet>
            <div className="page">
                {/* Company Information */}
                <div className="bg-gray-100 p-4 mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-primary">Company Info:</h2>
                    <strong>Company Name: {asset.companyName}</strong>
                    <br />
                    <strong>Company Hr: {asset.Item_Added_By}</strong>
                </div>

                {/* Asset Details */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-2 text-primary:">Asset Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <strong>Product Name:</strong> {asset.product_name}
                        </div>
                        <div>
                            <strong>Product Quantity:</strong> {asset.product_quantity}
                        </div>
                        <div>
                            <strong>Product Type:</strong> {asset.product_type}
                        </div>
                        <div>
                            <strong>Date Added:</strong> {new Date(asset.date_added).toLocaleDateString()}
                        </div>
                        <div>
                            <strong>Availability:</strong> {asset.availability}
                        </div>

                    </div>
                    <div className="mt-4">
                        <strong>Request Date:</strong> {new Date(asset.requestDate).toLocaleDateString()}
                    </div>
                    <div>
                        <strong>Requester Email:</strong> {asset.requesterEmail}
                    </div>
                    <div>
                        <strong>Requester Name:</strong> {asset.requesterName}
                    </div>
                    <div>
                        <strong>Notes:</strong> {asset.notes}
                    </div>
                    <div>
                        <strong>Status:</strong> {asset.status}
                    </div>
                    <div>
                        <strong>Approval Date:</strong> {asset.approvalDate ? new Date(asset.approvedDate).toLocaleDateString() : 'N/A'}
                    </div>

                    <div className="flex justify-center mt-10 cursor-pointer">
                        <PDFDownloadLink
                            document={<AssetDocument asset={asset} />}
                            fileName="asset-details.pdf"
                            className="px-4  tracking-wider   transition-colors duration-300 transform   focus:bg-gray-600 focus:outline-none text-2xl p-2 rounded-lg text-left font-bold bg-primary hover:bg-green-800 text-white"
                        >
                            {({ loading }) => (loading ? 'Loading document...' : 'Print')}
                        </PDFDownloadLink>
                    </div>
                </div>

                {/* Footer - Printing Date */}
                <div className="bg-gray-100 p-4 ">
                    <p className="text-right">Printing Date: {new Date().toLocaleDateString()}</p>
                </div>


            </div>
        </div>
    );
};

export default AssetDetails;


{/* <h1 className="text-3xl font-bold mb-4">Asset Details</h1>
            <div className="mb-4">
                <strong>Company Information</strong>
            </div>
            <div className="mb-4">
                <strong>Asset Name:</strong> {asset.product_name}
            </div>
            <div className="mb-4">
                <strong>Asset Quantity:</strong> {asset.product_quantity}
            </div>
            <div className="mb-4">
                <strong>Asset Type:</strong> {asset.product_type}
            </div>
            <div className="mb-4">
                <strong>Date Added:</strong> {new Date(asset.date_added).toLocaleDateString()}
            </div>
            <div className="mb-4">
                <strong>Availability:</strong> {asset.availability}
            </div>
            <div className="mb-4">
                <strong>Item Added By:</strong> {asset.Item_Added_By}
            </div>
            <div className="mb-4">
                <strong>Request Date:</strong> {new Date(asset.requestDate).toLocaleDateString()}
            </div>
            <div className="mb-4">
                <strong>Requester Email:</strong> {asset.requesterEmail}
            </div>
            <div className="mb-4">
                <strong>Requester Name:</strong> {asset.requesterName}
            </div>
            <div className="mb-4">
                <strong>Notes:</strong> {asset.notes}
            </div>
            <div className="mb-4">
                <strong>Status:</strong> {asset.status}
            </div>
            <div className="mb-4">
                <strong>Approval Date:</strong> {asset.approvalDate ? new Date(asset.approvedDate).toLocaleDateString() : 'N/A'}
            </div>
            <div className="mb-4">
                <strong>Printing Date:</strong> {new Date().toLocaleDateString()}
            </div> */}