import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "jspdf-autotable";

export default function SalesTable() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [sellerFilter, setSellerFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this as needed

  useEffect(() => {
    fetch("http://localhost:8080/api/invoices")
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
        setFilteredSales(data);
      })
      .catch((error) => console.error("Error fetching sales:", error));
  }, []);

  const handleFilter = () => {
    let filtered = sales;

    if (dateFilter) {
      filtered = filtered.filter((sale) => sale.createdAt.startsWith(dateFilter));
    }
    if (sellerFilter) {
      filtered = filtered.filter((sale) => sale.seller?.name === sellerFilter);
    }
    if (customerFilter) {
      filtered = filtered.filter((sale) => sale.customer?.name === customerFilter);
    }
    if (productFilter) {
      filtered = filtered.filter((sale) =>
        sale.cart.some((item) => item.name.toLowerCase().includes(productFilter.toLowerCase()))
      );
    }
    if (minPrice) {
      filtered = filtered.filter((sale) => sale.totalAmount >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((sale) => sale.totalAmount <= parseFloat(maxPrice));
    }

    setFilteredSales(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  useEffect(() => {
    handleFilter();
  }, [dateFilter, sellerFilter, customerFilter, productFilter, minPrice, maxPrice]);

  const downloadCSV = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredSales.map((sale) => ({
        Seller: sale.seller?.name,
        Customer: sale.customer?.name,
        Products: sale.cart.map((item) => item.name).join(", "),
        Quantity: sale.cart.map((item) => item.quantity).join(", "),
        Price: sale.cart.map((item) => item.price).join(", "),
        TotalAmount: sale.totalAmount,
        Date: new Date(sale.createdAt).toLocaleDateString(),
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "sales_report.xlsx");
  };

  // Get paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mt-4">Sales Data</h2>

      {/* Download Section */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold">Sales Report</h3>
        <button onClick={downloadCSV} className="bg-green-500 text-white px-3 py-1 rounded">
          Download Sales Report
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <div className="grid grid-cols-5 gap-4">
          <input type="text" placeholder="Seller" value={sellerFilter} onChange={(e) => setSellerFilter(e.target.value)} className="border rounded px-3 py-1" />
          <input type="text" placeholder="Customer" value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)} className="border rounded px-3 py-1" />
          <input type="text" placeholder="Product Name" value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="border rounded px-3 py-1" />
          <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="border rounded px-3 py-1" />
          <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border rounded px-3 py-1" />
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="border rounded px-3 py-1" />
        </div>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="p-2">Seller</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Total Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentSales.map((sale) =>
              sale.cart.map((item, index) => (
                <tr key={`${sale._id}-${index}`} className="text-center border-b hover:bg-gray-100">
                  <td className="p-2">{index === 0 ? sale.sellerName || "N/A" : ""}</td>
                  <td className="p-2">{index === 0 ? sale.customerName || "N/A" : ""}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">Rs. {item.price}</td>
                  <td className="p-2 font-semibold">{index === 0 ? `Rs. ${sale.totalAmount}` : ""}</td>
                  <td className="p-2">{index === 0 ? new Date(sale.createdAt).toLocaleDateString() : ""}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 mx-1 border rounded bg-gray-200"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1 mx-1">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => (indexOfLastItem < filteredSales.length ? prev + 1 : prev))}
          className="px-3 py-1 mx-1 border rounded bg-gray-200"
          disabled={indexOfLastItem >= filteredSales.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
