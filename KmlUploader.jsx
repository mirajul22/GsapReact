import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import * as toGeoJSON from "@tmcw/togeojson";
import length from "@turf/length"; // ✅ Correct Turf.js import

const KmlUploader = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState(null);

  // Handle file upload and parse KML
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const parser = new DOMParser();
      const kml = parser.parseFromString(e.target.result, "text/xml");
      const geoJson = toGeoJSON.kml(kml);
      setGeoJsonData(geoJson);
      processGeoJSON(geoJson);
    };
    reader.readAsText(file);
  };

  // Process GeoJSON to generate summary & details
  const processGeoJSON = (geoJson) => {
    const elementsCount = {};
    const lineLengths = {};

    geoJson.features.forEach((feature) => {
      const type = feature.geometry.type;

      // Count occurrences of different element types
      elementsCount[type] = (elementsCount[type] || 0) + 1;

      // Calculate length for LineString & MultiLineString
      if (type === "LineString" || type === "MultiLineString") {
        const lengthValue = length(feature, { units: "kilometers" }); // ✅ Corrected usage
        lineLengths[type] = (lineLengths[type] || 0) + lengthValue;
      }
    });

    setSummary(elementsCount);
    setDetails(lineLengths);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">KML File Uploader & Map Viewer</h1>

      {/* File Upload */}
      <input
        type="file"
        accept=".kml"
        onChange={handleFileUpload}
        className="mb-4 border p-2"
      />

      {/* Summary Button */}
      {summary && (
        <>
          <h2 className="text-lg font-semibold mt-4">Summary</h2>
          <table className="border-collapse border w-full mt-2">
            <thead>
              <tr>
                <th className="border p-2">Element Type</th>
                <th className="border p-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([type, count]) => (
                <tr key={type}>
                  <td className="border p-2">{type}</td>
                  <td className="border p-2">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Detailed Button */}
      {details && (
        <>
          <h2 className="text-lg font-semibold mt-4">Detailed Analysis</h2>
          <table className="border-collapse border w-full mt-2">
            <thead>
              <tr>
                <th className="border p-2">Element Type</th>
                <th className="border p-2">Total Length (km)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(details).map(([type, length]) => (
                <tr key={type}>
                  <td className="border p-2">{type}</td>
                  <td className="border p-2">{length.toFixed(2)} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Map Display */}
      {geoJsonData && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Map View</h2>
          <MapContainer center={[20, 78]} zoom={4} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <GeoJSON data={geoJsonData} />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default KmlUploader;
