import pandas as pd
import joblib
import pandas as pd
import joblib
from flask import Flask, request, jsonify
import warnings
import numpy as np
import holidays
import random

# Set seeds for reproducibility
np.random.seed(42)
random.seed(42)

# Ignore warnings
warnings.simplefilter(action='ignore', category=FutureWarning)


# Initialize Flask
app = Flask(__name__)

# Load the trained model

# Function to add holiday weekday columns
def add_holiday_weekday_columns(data):
    data['Date'] = pd.to_datetime(data['Date'])
    data['IsHoliday'] = data['Date'].apply(lambda x: int(x in holidays.US()))
    return data

# Predict inventory
@app.route('/predictStock', methods=['GET'])
def predict_stock():
    # Get parameters from the POST request

    product_id = request.args.get('productId', default='', type=str);
    start_date = request.args.get('start', default='', type=str);
    end_date = request.args.get('end', default='', type=str);

    rf_model = joblib.load(f'./trained_dataset/rf_inventory_model_Product_{product_id}.pkl')
    # return jsonify(product_id=product_id, start_date=start_date, end_date=end_date);

    future_dates = pd.date_range(start=start_date, end=end_date)
    future_data = pd.DataFrame({'Date': future_dates})
    future_data = add_holiday_weekday_columns(future_data)
    future_data['Day_of_Week'] = future_data['Date'].dt.dayofweek
    future_data['Month'] = future_data['Date'].dt.month
    future_data['Year'] = future_data['Date'].dt.year
    future_data['Product ID'] = product_id
    
    X_future = future_data.drop(columns=['Date', 'Product ID'])
    future_inventory_predictions = rf_model.predict(X_future)

    future_predictions_df = pd.DataFrame({
        'Date': future_dates.strftime('%d-%B-%Y'),  
        'Product ID': future_data['Product ID'],  
        'Predicted Inventory': future_inventory_predictions
    })

    future_predictions_json = future_predictions_df.to_json(orient='records')
    total_inventory_sum = int(future_predictions_df['Predicted Inventory'].sum())

    # Return the predictions and total sum as JSON response
    return jsonify(predictions=future_predictions_json, total_sum=total_inventory_sum)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
