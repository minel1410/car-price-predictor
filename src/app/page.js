"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ModelSelect = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [brandModelData, setBrandModelData] = useState([]);
  const [carValue, setCarValue] = useState(null)

  const [formData, setFormData] = useState({
    Mileage: 0,
    Engine_volume: 0,
    Engine_power: 0,
    Registered: true,
    Year: 0,
    brand_enc: 0,
    body_enc: 0,
    fuel_type_enc: 0,
    model_enc: 0
  });

  const fuelDict = {"Benzin": 0, "Dizel": 1, "Elektro": 2, "Hibrid": 3, "Plin": 4};
  const bodyDict = {
    "Caddy": 0,
    "Kabriolet": 1,
    "Karavan": 2,
    "Kombi": 3,
    "Limuzina": 4,
    "Malo auto": 5,
    "Monovolumen": 6,
    "Off Road": 7,
    "Ostalo": 8,
    "Pick up": 9,
    "SUV": 10,
    "Sportski/kupe": 11,
    "Terenac": 12,
  };

  useEffect(() => {
    axios
      .get("https://price-predictor-model-api.onrender.com/models")
      .then((response) => {
        const brandModelData = response.data;


        const transformedBrands = brandModelData.map((brand) => ({
          id: brand.brand_id,
          name: brand.models[0]?.brand_name || "Unknown Brand",
        }));


        transformedBrands.sort((a, b) => a.name.localeCompare(b.name));

        setBrands(transformedBrands);
        setBrandModelData(brandModelData);


        if (transformedBrands.length > 0) {
          setSelectedBrand(transformedBrands[0].id);
          setFormData({ ...formData, brand_enc: transformedBrands[0].id });
          const initialModels =
            brandModelData.find(
              (brand) => brand.brand_id === transformedBrands[0].id
            ).models || [];
          initialModels.sort((a, b) =>
            a.model_name.localeCompare(b.model_name)
          );
          setModels(initialModels);
        }
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

  const handleBrandChange = (event) => {
    const selectedBrandId = event.target.value;
    setSelectedBrand(selectedBrandId);
    setFormData({ ...formData, brand_enc: parseInt(selectedBrandId) });


    const filteredModels = brandModelData.find(brand => brand.brand_id === parseInt(selectedBrandId)).models;
    filteredModels.sort((a, b) => a.model_name.localeCompare(b.model_name));
    setModels(filteredModels || []);
    setSelectedModel('');
  };

  const handleModelChange = (event) => {
    const selectedModelId = event.target.value;
    setSelectedModel(selectedModelId);
    setFormData({ ...formData, model_enc: parseInt(selectedModelId) });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (event, field) => {
    const value = parseFloat(event.target.value);
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    console.log("Submitting form data:", formData);

    axios
      .post(
        "https://price-predictor-model-api.onrender.com/post_car",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {

        console.log("Form submitted successfully:", response.data);
        setCarValue(response.data.prediction);
      })
      .catch((error) => {

        console.error(
          "Error submitting form:",
          error.response ? error.response.data : error.message
        );
      });
  };


  return (
    <div className="px-14 md:px-32 py-4 bg-[#111827]">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-center md:text-5xl lg:text-6xl text-white">
        Car Price Predictor
      </h1>
      <p class="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400 text-center">
        Enter the required details to get the recommended car price.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="brand" className="block text-sm font-medium text-white">
          Select Brand:
        </label>
        <select
          id="brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <label htmlFor="model" className="block text-sm font-medium text-white">
          Select Model:
        </label>
        <select
          id="model"
          value={selectedModel}
          onChange={handleModelChange}
          disabled={!selectedBrand}
          className='className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"'
        >
          <option value="">Select Model</option>
          {Array.isArray(models) &&
            models.map((model) => (
              <option key={model.model_id} value={model.model_id}>
                {model.model_name}
              </option>
            ))}
        </select>

        <label
          htmlFor="Mileage"
          className="block text-sm font-medium text-white"
        >
          Mileage:
        </label>
        <input
          type="number"
          id="Mileage"
          name="Mileage"
          value={formData.Mileage}
          onChange={handleInputChange}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />

        <label
          htmlFor="Engine_volume"
          className="block text-sm font-medium text-white "
        >
          Engine Volume:
        </label>
        <input
          type="range"
          id="Engine_volume"
          name="Engine_volume"
          min="0.5"
          max="6.5"
          step="0.1"
          value={formData.Engine_volume}
          onChange={(event) => handleSliderChange(event, "Engine_volume")}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
        <span className="text-gray-200">{formData.Engine_volume} L</span>

        <label
          htmlFor="Engine_power"
          className="block text-sm font-medium text-white"
        >
          Engine Power (kW):
        </label>
        <input
          type="number"
          id="Engine_power"
          name="Engine_power"
          value={formData.Engine_power}
          onChange={handleInputChange}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />

        <label htmlFor="Year" className="block text-sm font-medium text-white ">
          Year:
        </label>
        <input
          type="range"
          id="Year"
          name="Year"
          min="1900"
          max={new Date().getFullYear()}
          step="1"
          value={formData.Year}
          onChange={(event) => handleSliderChange(event, "Year")}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
        />
        <span className="text-gray-200">{formData.Year}</span>

        <label
          htmlFor="body_enc"
          className="block text-sm font-medium text-white "
        >
          Body Type:
        </label>
        <select
          id="body_enc"
          name="body_enc"
          value={formData.body_enc}
          onChange={handleInputChange}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select Body Type --</option>
          {Object.entries(bodyDict).map(([key, value]) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </select>

        <label
          htmlFor="fuel_type_enc"
          className="block text-sm font-medium text-white "
        >
          Fuel Type:
        </label>
        <select
          id="fuel_type_enc"
          name="fuel_type_enc"
          value={formData.fuel_type_enc}
          onChange={handleInputChange}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Fuel Type</option>
          {Object.entries(fuelDict).map(([key, value]) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </select>

        <div class="flex items-center space-x-2">
          <input
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            type="checkbox"
            id="Registered"
            name="Registered"
            checked={formData.Registered}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="Registered" className="text-white">
            Registered
          </label>
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-md text-white bg-blue-500"
        >
          Submit
        </button>
      </form>
      {carValue && (
        <p className="border border-white rounded-lg bg-[#CCE5FF] text-[#004085] p-3 mt-4">
          Recommended car price: <span className="font-bold">{carValue}</span>
        </p>
      )}
    </div>
  );
};

export default ModelSelect;
