import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import Spinner from '../../../Components/Spinner';
import { useQuery } from '@tanstack/react-query';
import useUserData from '../../../Hooks/useHRData';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Heading from '../../../Components/Heading';

const COLORS = ['#0088FE', '#FF8042'];

const StatsChart = () => {
    const axiosSecure = useAxiosSecure();
    const { loading: authLoading } = useAuth();
    const { userData, isLoading: userDataLoading } = useUserData();

    const { data: requests = [], isLoading: requestsLoading, isError, error } = useQuery({
        queryKey: ["Stats_chart", userData?.email],
        enabled: !authLoading && !!userData?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/Stats_chart/${userData?.email}`);
            return data;
        },
    });

    if (authLoading || userDataLoading || requestsLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;

    const returnableCount = requests.filter(item => item.product_type === 'Returnable').length;

    const nonReturnableCount = requests.filter(item => item.product_type === 'Non-returnable').length;

    const pieChartData = [
        { name: 'Returnable', value: returnableCount },
        { name: 'Non-returnable', value: nonReturnableCount }
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="my-24">
            {/* <h2 className="text-3xl mb-10 text-center text-primary">Total percentage of returnable items <br /> and
             non-returnable items</h2> */}
            <Heading className="mb-0" heading="Total percentage of returnable items and
             non-returnable items"></Heading>
            <ResponsiveContainer  width="100%" height={400}>
                <PieChart >
                    <Pie
                        
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatsChart;
