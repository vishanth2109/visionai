import { useState } from "react";
import axios from "axios";
import UploadBox from "./components/UploadBox";

function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Phase 9: Model Selector
  const [selectedModel, setSelectedModel] = useState("mobilenet");

  // Phase 9: Prediction History
  const [history, setHistory] = useState([]);

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("model", selectedModel);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPredictions(response.data.predictions);

      // Save to prediction history
      if (response.data.predictions.length > 0) {
        setHistory((prev) => [
          {
            filename: image.name,
            model: selectedModel,
            topPrediction: response.data.predictions[0].label,
          },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center mb-8">
          <h1 className="text-5xl font-bold">
            VisionAI
          </h1>

          <p className="mt-4 text-gray-500">
            Upload an image and let AI identify what it sees.
          </p>
        </div>

        {/* Upload + Preview */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Upload */}
          <div className="bg-white rounded-3xl shadow-lg p-6">

            {/* Model Selector */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full mb-4 border rounded-xl p-3"
            >
              <option value="mobilenet">
                General Classifier
              </option>

              <option value="plant" disabled>
                Plant Disease Detector (Coming Soon)
              </option>

              <option value="waste" disabled>
                Waste Classifier (Coming Soon)
              </option>
            </select>

            <UploadBox setImage={setImage} />

            <button
              onClick={analyzeImage}
              disabled={!image || loading}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Analyzing..." : "Analyze Image"}
            </button>

          </div>

          {/* Preview */}
          <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-center">

            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="rounded-2xl max-h-96"
              />
            ) : (
              <p className="text-gray-400">
                Image preview will appear here
              </p>
            )}

          </div>

        </div>

        {/* Predictions */}
        {predictions.length > 0 && (
          <div className="mt-8 bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Predictions
            </h2>

            {predictions.map((prediction, index) => (
              <div key={index} className="mb-5">

                <div className="flex justify-between mb-2">
                  <span className="capitalize font-medium">
                    {prediction.label}
                  </span>

                  <span>
                    {(prediction.confidence * 100).toFixed(2)}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{
                      width: `${prediction.confidence * 100}%`,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>
        )}

        {/* Prediction History */}
        {history.length > 0 && (
          <div className="mt-8 bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              Recent Predictions
            </h2>

            {history.map((item, index) => (
              <div
                key={index}
                className="border-b py-3"
              >
                📷 {item.filename}
                {" → "}
                <span className="capitalize font-medium">
                  {item.topPrediction}
                </span>
                {" ("}
                {item.model}
                {")"}
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
