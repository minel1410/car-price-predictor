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

        // Dobijanje imena brendova i transformacija podataka
        const transformedBrands = brandModelData.map((brand) => ({
          id: brand.brand_id,
          name: brand.models[0]?.brand_name || "Unknown Brand",
        }));

        // Sortiranje brendova abecednim redom
        transformedBrands.sort((a, b) => a.name.localeCompare(b.name));

        setBrands(transformedBrands);
        setBrandModelData(brandModelData);

        // Postavljanje modela za prvi brend kao inicijalne modele i sortiranje abecednim redom
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

    // Filtriranje modela na osnovu izabranog brenda i sortiranje abecednim redom
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

    // Provjerite ispravnost formData
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
        // Ispišite odgovor za debugiranje
        console.log("Form submitted successfully:", response.data);
        setCarValue(response.data.prediction);
      })
      .catch((error) => {
        // Ispišite detaljne informacije o grešci
        console.error(
          "Error submitting form:",
          error.response ? error.response.data : error.message
        );
      });
  };


  return (
    <div className="px-14 md:px-32 py-16">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <label htmlFor="brand">Select Brand:</label>
        <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
          <option value="">-- Select Brand --</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>

        <label htmlFor="model">Select Model:</label>
        <select id="model" value={selectedModel} onChange={handleModelChange} disabled={!selectedBrand}>
          <option value="">-- Select Model --</option>
          {Array.isArray(models) && models.map(model => (
            <option key={model.model_id} value={model.model_id}>{model.model_name}</option>
          ))}
        </select>

        <label htmlFor="Mileage">Mileage:</label>
        <input type="number" id="Mileage" name="Mileage" value={formData.Mileage} onChange={handleInputChange} />

        <label htmlFor="Engine_volume">Engine Volume:</label>
        <input
          type="range"
          id="Engine_volume"
          name="Engine_volume"
          min="0.5"
          max="6.5"
          step="0.1"
          value={formData.Engine_volume}
          onChange={(event) => handleSliderChange(event, 'Engine_volume')}
        />
        <span>{formData.Engine_volume} L</span>

        <label htmlFor="Engine_power">Engine Power:</label>
        <input type="number" id="Engine_power" name="Engine_power" value={formData.Engine_power} onChange={handleInputChange} />

        <label htmlFor="Year">Year:</label>
        <input
          type="range"
          id="Year"
          name="Year"
          min="1900"
          max={new Date().getFullYear()}
          step="1"
          value={formData.Year}
          onChange={(event) => handleSliderChange(event, 'Year')}
        />
        <span>{formData.Year}</span>

        <label htmlFor="body_enc">Body Type:</label>
        <select id="body_enc" name="body_enc" value={formData.body_enc} onChange={handleInputChange}>
          <option value="">-- Select Body Type --</option>
          {Object.entries(bodyDict).map(([key, value]) => (
            <option key={value} value={value}>{key}</option>
          ))}
        </select>

        <label htmlFor="fuel_type_enc">Fuel Type:</label>
        <select id="fuel_type_enc" name="fuel_type_enc" value={formData.fuel_type_enc} onChange={handleInputChange}>
          <option value="">-- Select Fuel Type --</option>
          {Object.entries(fuelDict).map(([key, value]) => (
            <option key={value} value={value}>{key}</option>
          ))}
        </select>
        <div className='flex gap-5'>
          <label htmlFor="Registered">Registered:</label>
        <input
          type="checkbox"
          id="Registered"
          name="Registered"
          checked={formData.Registered}
          onChange={handleCheckboxChange}
        />
        </div>
        

        <button 
        type="submit" 
        className='w-full p-3 rounded-md text-white bg-blue-500'>
          Submit
        </button>
      </form>
      {carValue && <p>Preporucena cijena automobila: {carValue}</p>}
      
    </div>
  );
};

export default ModelSelect;
