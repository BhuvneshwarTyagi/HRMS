
import { FiUsers, FiDownload } from 'react-icons/fi';
import { BASE_URL } from "../../Config";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { useContext, useState } from "react";

export default function PayrollTable({ payrollData }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleDownloadPDF = async (payrollId, employeeName) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${BASE_URL}/payroll/fetch/generate-pdf/${payrollId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`,
                    },
                    responseType: 'blob',
                }
            );

            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = `payslip-${employeeName}-${new Date().toLocaleDateString()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(fileURL);

            toast.success('Payslip downloaded successfully!');
        } catch (error) {
            toast.error('Failed to download payslip');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FiUsers className="mr-2" />
                Payroll Records
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Employee ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Base Salary
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Days
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Present Days
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Calculated Salary
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Download
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payrollData.map((record, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{record.employeeId.Name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹{record.baseSalary}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{record.totalDays}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{record.presentDays}</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹{record.calculatedSalary.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{record.month}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleDownloadPDF(record._id, record.employeeId.Name)}
                                        disabled={loading}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <FiDownload className="h-4 w-4" />
                                                Download Payslip
                                            </>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {payrollData.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No payroll records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}