import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import numpy as np
import random
import warnings
import holidays

# Set seeds for reproducibility
np.random.seed(42)
random.seed(42)

# Ignore warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

def add_holiday_weekday_columns(data):
    """
    Adds 'IsHoliday' and 'Weekday' columns to the provided data.
    
    Parameters:
    - data (pd.DataFrame): DataFrame containing a 'Date' column.

    Returns:
    - data (pd.DataFrame): DataFrame with added 'IsHoliday' and 'Weekday' columns.
    """
    # Convert 'Date' column to datetime format
    data['Date'] = pd.to_datetime(data['Date'])
    
    # Add 'IsHoliday' column: 1 if the date is a holiday, 0 otherwise
    data['IsHoliday'] = data['Date'].apply(lambda x: x in holidays.US()).astype(int)
        
    return data

# Load and preprocess the data
data = pd.read_csv('dataset.csv')
data = add_holiday_weekday_columns(data)

# Specify the number of products
num_products = 20

for i in range(1, num_products + 1):
    # Specify the product identifier
    product_id = f'Product_{i}'
    
    # Filter data for the specified product
    product_data = data[data['Product ID'] == product_id]

    # Convert 'Date' to datetime format and extract features
    product_data['Date'] = pd.to_datetime(product_data['Date'])
    product_data['Day_of_Week'] = product_data['Date'].dt.dayofweek
    product_data['Month'] = product_data['Date'].dt.month
    product_data['Year'] = product_data['Date'].dt.year

    # Split the data
    train_data, _ = train_test_split(product_data, test_size=0.2, random_state=42)

    # Prepare features and target variable
    X_train = train_data.drop(columns=['Inventory', 'Date', 'Sale Count', 'Product ID'])
    y_train = train_data['Inventory']

    # Train the Random Forest model
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)

    # Save the trained model
    joblib.dump(rf_model, f'rf_inventory_model_{product_id}.pkl')
