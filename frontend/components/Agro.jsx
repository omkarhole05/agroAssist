import React, { useState, useEffect } from "react";
import axios from "axios";
// main code
function Agro() {
    const [commodity, setCommodity] = useState("onion");
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  // Fetch prices whenever commodity changes
    useEffect(() => {
    const fetchPrices = async () => {
        try {
        setLoading(true);
        setError("");

        const res = await axios.get(
            `http://localhost:4000/api/agmarknet/prices?commodity=${commodity}
            &state=Maharashtra`
        );

        let data = res.data.records || res.data || [];
        if (!Array.isArray(data)) {
            data = [];
        }

        setPrices(data);
    } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Please try again later.");
        setPrices([]);
    } finally {
        setLoading(false);
    }
    };

    fetchPrices();
  }, [commodity]); // dependency: run when commodity changes

    return (
    <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Agmarknet Prices</h1>

      {/* Commodity Dropdown */}
    <div className="mb-4">
        <label className="mr-2 font-semibold">Commodity:</label>
        <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="border border-gray-300 p-1 rounded"
        >
            <option value="onion">Onion</option>
            <option value="tomato">Tomato</option>
            <option value="potato">Potato</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="bitter gourd">karle</option>
        </select>
    </div>

        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-500">{error}</p>}
        {!loading && !error && prices.length === 0 && (
        <p className="text-center mt-4">No data available.</p>
    )}

        {!loading && prices.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Market</th>
                    <th className="border border-gray-300 px-4 py-2">Min Price</th>
                    <th className="border border-gray-300 px-4 py-2">Max Price</th>
                    <th className="border border-gray-300 px-4 py-2">Modal Price</th>
                </tr>
            </thead>

        <tbody>
            {prices.map((item, idx) => (
                <tr key={idx}>
                    <td className="border border-gray-300 px-4 py-2">
                        {item.market}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                        {item.min_price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                        {item.max_price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                        {item.modal_price}
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>

    );
};

export default Agro;
