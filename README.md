# [Car Price Predictor](https://car-price-predictor-six.vercel.app)

## Overview

<<<<<<< HEAD
The **Car Price Predictor** is a frontend application built using Next.js. This application allows users to input detailed information about their car to receive a predicted price. The user provides data such as the year, model, brand, mileage, engine volume, engine power, body type, and fuel type of their car. 
=======
The **Car Price Predictor** is a frontend application built using Next.js. This application allows users to input detailed information about their car to receive a predicted price. The user provides data such as the year, model, brand, mileage, engine volume, engine power, body type, and fuel type of their car.
>>>>>>> b0fdf98 (Add stylization)

## Features

- **User Input Form**: Allows users to enter car details including:
<<<<<<< HEAD
=======

>>>>>>> b0fdf98 (Add stylization)
  - **Brand**: Select from a dropdown list.
  - **Model**: Select from a dropdown list that updates based on the selected brand.
  - **Mileage**: Input in kilometers.
  - **Engine Volume**: Adjust using a slider.
  - **Engine Power**: Input in kilowats.
  - **Year**: Adjust using a slider.
  - **Body Type**: Select from a dropdown list.
  - **Fuel Type**: Select from a dropdown list.
  - **Registered**: Checkbox to indicate whether the car is registered.

- **Predicted Price**: After submission, the predicted price of the car is displayed based on the entered data.

## Technical Details

- **Frontend Framework**: Developed with Next.js for a responsive and interactive user experience.
- **API Integration**: Submits user data to an external API for price prediction. The API is hosted on a server that may enter sleep mode after periods of inactivity, which may cause a delay in response times. Users should expect that the prediction may take a few minutes in some cases due to this server behavior.

## Instructions

1. **Select Brand**: Choose a brand from the dropdown menu. The models will be populated based on the selected brand.
2. **Select Model**: Choose a model from the dropdown menu.
3. **Input Data**: Fill in the mileage, engine volume, engine power, and year using the input fields and sliders.
4. **Select Body Type**: Choose the body type from the dropdown menu.
5. **Select Fuel Type**: Choose the fuel type from the dropdown menu.
6. **Register Status**: Indicate if the car is registered by checking the checkbox.
7. **Submit**: Click the "Submit" button to send the data to the API and receive the predicted price.

## Notes

- **Response Time**: The API server hosting the model may enter sleep mode after periods of inactivity. As a result, the response time may be longer than expected. Please be patient if the prediction takes a few minutes to appear.
