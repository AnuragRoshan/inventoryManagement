# Import Libraries

import os
import numpy as np
import pandas as pd
import seaborn as sns
import scipy.stats as stats
import statsmodels.api as sm
import matplotlib.pyplot as plt
import plotly.express as px
%matplotlib inline

import warnings
warnings.filterwarnings(action="ignore")

for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))

# Data Preprocessing

df = pd.read_csv('/kaggle/input/demand-forecasting-kernels-only/train.csv')

test = pd.read_csv('/kaggle/input/demand-forecasting-kernels-only/test.csv')

df.head(10)

df.tail(10)

print(f'df.columns   : {df.columns}')
print(f'df.shape     : {df.shape}')

dtypes_cnt = df.dtypes.groupby(df.dtypes).size()
dtypes_col = df.columns.groupby(df.dtypes)

print("dtypes_cnt    :", dtypes_cnt.to_dict())
print("dtypes_col    :", dtypes_col)

df.select_dtypes(include=['int64', 'float64']).describe()

df.select_dtypes(include=['object']).describe()

df.info()

df.isna().sum()

print('column name'.ljust(20), '# unique values')
for col in df.columns:
    print(col.ljust(20), '=>', len(df[col].unique()))

categorical_columns = [col for col in df.columns if len(df[col].unique()) < 50]

for col in categorical_columns:
    print(col.ljust(20), '=>', df[col].unique())

# Data Visualization

# Distribution Plots:
def my_histplot(df, col, ax):
    sns.histplot(df[col], kde=True, ax=ax)
    ax.set_title(f'Histogram Plot of {col}')
def my_distplot(df, col, ax):
    sns.distplot(df[col], ax=ax)
    ax.set_title(f'Distribution Plot of {col}')
def my_kdeplot(df, col, ax):
    sns.kdeplot(df[col], ax=ax, fill=True)
    ax.set_title(f'KDE Plot of {col}')

# Relational Plots:
def my_scatterplot(df, col, ax):
    sns.scatterplot(df[col], ax=ax)
    ax.set_title(f'Scatter Plot of {col}')
def my_lineplot(df, col, ax):
    sns.lineplot(df[col], ax=ax)
    ax.set_title(f'Line Plot of {col}')
    
# Categorical Plots:
def my_pie_chart(df, col, ax):
    labels = df[col].value_counts()
    ax.pie(labels, labels=labels.index, autopct='%1.1f%%')
    ax.set_title(f'Pie Chart of {col}')
def my_countplot(df, col, ax):
    sns.countplot(x=df[col], ax=ax)
    ax.set_title(f'Count Plot of {col}')
    ax.set_xticklabels(ax.get_xticklabels(), rotation=90)
def my_boxplot(df, col, ax):
    sns.boxplot(df[col], ax=ax)
def my_violinplot(df, col, ax):
    sns.violinplot(df[col], ax=ax)
    
# Matrix Plots:
def my_heatmap(df, size):
    if size: plt.figure(figsize=size)
    sns.heatmap(df.corr(), annot=True, fmt=".1f", cmap='Blues', annot_kws={"size": 12})
    plt.title('Correlation Heatmap')
    plt.show()


def plot_charts_grid_single_feature(df, plot_func, size=(12, 4), n_col=1):
    if len(df.columns) == 0:
        return
    n_rows = (len(df.columns) + n_col-1) // n_col
    fig, axes = plt.subplots(n_rows, n_col, figsize=(size[0]*n_col, size[1]*n_rows))
    if len(df.columns) == 1:
        axes = np.array([axes])
    axes = axes.flatten()
    
    for i, label in enumerate(df.columns):
        plot_func(df, label, axes[i])
        axes[i].set_xlabel(label)

    for j in range(i+1, n_rows*n_col):
        axes[j].axis('off')
    
    plt.tight_layout()
    plt.show()

plot_charts_grid_single_feature(df.select_dtypes(include=['int64', 'float64']), my_distplot)

plot_charts_grid_single_feature(df[categorical_columns], my_pie_chart, size=(4, 4), n_col=3)

plot_charts_grid_single_feature(df[categorical_columns], my_countplot)

plot_charts_grid_single_feature(df.select_dtypes(include=['int64', 'float64']), my_boxplot, size=(2, 4), n_col=6)

plot_charts_grid_single_feature(df.select_dtypes(include=['int64', 'float64']), my_violinplot, size=(2, 4), n_col=6)

def plot_charts_grid_multiple_feature(df, columns, plot_func, y_col, size=(12, 4), n_col=1):
    if len(columns) == 0:
        return
    n_rows = (len(columns) + n_col-1) // n_col
    fig, axes = plt.subplots(n_rows, n_col, figsize=(size[0]*n_col, size[1]*n_rows))
    if len(columns) == 1:
        axes = np.array([axes])
    axes = axes.flatten()
    
    for i, label in enumerate(columns):
        plot_func(x=label, y=y_col, ax=axes[i], data=df)
        axes[i].set_xlabel(label)

    for j in range(i+1, n_rows*n_col):
        axes[j].axis('off')
    
    plt.tight_layout()
    plt.show()

plot_charts_grid_multiple_feature(df, categorical_columns, sns.boxplot, y_col='sales')

plot_charts_grid_multiple_feature(df, categorical_columns, sns.barplot, y_col='sales')

n_numeric_cols = len(df.select_dtypes(include=['int64', 'float64']).columns) // 3 * 2
my_heatmap(df.select_dtypes(include=['int64', 'float64']), size=(n_numeric_cols+1, n_numeric_cols+1))

# Feature Engineering and Transformation

df.head(10)

def add_columns(df):
    df["date"]       = pd.to_datetime(df["date"])
    df["year"]       = df["date"].dt.year
    df["month"]      = df["date"].dt.month
    df["day"]        = df["date"].dt.day
    df["weekday"]    = df["date"].dt.weekday
    df["weekofyear"] = df["date"].dt.isocalendar().week
    
    df["is_weekend"]     = df["weekday"].apply(lambda x: 1 if x >= 5 else 0)
    df["is_month_end"]   = df["date"].dt.is_month_end.astype(int)
    df["is_month_start"] = df["date"].dt.is_month_start.astype(int)

    df["store_item"]      = df["store"].astype(str) + "_" + df["item"].astype(str)
    start_date            = df["date"].min()
    df["days_from_start"] = (df["date"] - start_date).dt.days

add_columns(df)
add_columns(test)

df["lag_7"]  = df.groupby(["store", "item"])["sales"].shift(7)
df["lag_30"] = df.groupby(["store", "item"])["sales"].shift(30)

additional_columns = ['year', 'month', 'day', 'weekday', 'weekofyear', 'is_weekend', 'is_month_end', 'is_month_start', 'lag_7', 'lag_30']

categorical_columns = [col for col in df.columns if len(df[col].unique()) < 50]

df.head(10)

plot_charts_grid_single_feature(df[additional_columns], my_distplot)

plot_charts_grid_single_feature(df[['lag_7', 'lag_30']], my_lineplot)

plot_charts_grid_single_feature(df[categorical_columns], my_pie_chart, size=(4, 4), n_col=3)

plot_charts_grid_single_feature(df[categorical_columns], my_countplot)

plot_charts_grid_single_feature(df[additional_columns], my_boxplot, size=(2, 4), n_col=6)

plot_charts_grid_single_feature(df[additional_columns], my_violinplot, size=(2, 4), n_col=6)

store_sales = df.groupby("store")["sales"].sum()
item_sales  = df.groupby("item")["sales"].sum()

plot_charts_grid_single_feature(pd.concat([store_sales, item_sales], axis=1), my_lineplot)

# Outliers Detection

float_features = df.select_dtypes(include=['int64', 'float64']).columns

df[float_features].info()

def plot_column_with_outlier_effect(df, plot_func, outliers_indices, x_col, y_col):
    fig, ax = plt.subplots(1, 2, figsize=(12*2, 4))
    ax[0].set_title('Original Data')
    ax[1].set_title(f'Data without Outliers of {y_col}')
    plot_func(x=x_col, y=y_col, ax=ax[0], data=df)
    plot_func(x=x_col, y=y_col, ax=ax[1], data=df.drop(outliers_indices))
    plt.tight_layout()
    plt.show()

def outliers(df, col):
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 = 1.5 * IQR
    return df.index[(df[col] < lower_bound) | (df[col] > upper_bound)]

def detect_outliers(df, col):
    outliers_indices = [item for item in outliers(df, col)]
    print(f'length of {col} outliers_indices: {len(outliers_indices)}')
    for cat_col in categorical_columns:
        plot_column_with_outlier_effect(df, sns.boxplot, outliers_indices, x_col=cat_col, y_col=col)
        plot_column_with_outlier_effect(df, sns.barplot, outliers_indices, x_col=cat_col, y_col=col)

detect_outliers(df, 'sales')

# Single Feature Analysis

def plot_top_n(df, xlabel, ylabel, n=25, figsize=(12, 4)):
    plt.figure(figsize=figsize)
    sns.barplot(x=df.index, y=df)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    yminlim = df.min()
    ymaxlim = df.max()
    yrange = (ymaxlim - yminlim) * .05
    yminlim -= yrange
    ymaxlim += yrange
    plt.ylim(yminlim, ymaxlim)
    plt.title(f'Top {n} {xlabel} based on the {ylabel}')
    plt.xticks(rotation=90)
    plt.tight_layout()
    plt.show()

n = 25
for col in float_features:
    top_artists = df.groupby('sales')[col].mean().sort_values(ascending=False)
    plot_top_n(top_artists.head(n), 'sales', f'mean of {col}', n)

plt.figure(figsize=(14, 5))
sns.lineplot(data=df, x="date", y="sales", hue="store", palette="tab10", ci=None)
plt.title("Sales Over Time by Store")
plt.xlabel("Date")
plt.ylabel("Sales")
plt.show()

# Multiple Feature Analysis

def plot_pos_neg(df, columns, plot_func, y_col, size=(12, 4), n_col=1):
    if len(columns) == 0:
        return
    n_rows = (len(columns) + n_col-1) // n_col
    fig, axes = plt.subplots(n_rows, n_col, figsize=(size[0]*n_col, size[1]*n_rows))
    if len(columns) == 1:
        axes = np.array([axes])
    axes = axes.flatten()
    
    for i, label in enumerate(columns):
        plot_func(df[df[y_col] >= df[y_col].median()], x=label, kde=True, color='green', label='Above Median', element='step', alpha=0.5, ax=axes[i])
        plot_func(df[df[y_col] <  df[y_col].median()], x=label, kde=True, color='red',   label='Below Median', element='step', alpha=0.5, ax=axes[i])
        axes[i].set_xlabel(label)
        axes[i].set_title(f'Above Median vs. Below Median {y_col} for {label}')

    for j in range(i+1, n_rows*n_col):
        axes[j].axis('off')
    
    plt.tight_layout()
    plt.show()

plot_pos_neg(df, float_features, sns.histplot, 'sales')

# Predictive Models

train_test_df = pd.concat([df, test])
train_test_df_dummy = pd.get_dummies(train_test_df)

df_dummy, test_dummy = train_test_df_dummy[:len(df)], train_test_df_dummy[len(df):]
test_dummy = test_dummy.drop(columns=['sales'])

df_dummy.head(10)

print(f'df_dummy.columns   : {df_dummy.columns}')
print(f'df_dummy.shape     : {df_dummy.shape}')

dtype_str = df_dummy.dtypes.apply(lambda x: str(x))
dtypes_cnt = dtype_str.groupby(dtype_str).size()
dtypes_col = df_dummy.columns.groupby(dtype_str)

print("dtypes_cnt    :", dtypes_cnt.to_dict())
print("dtypes_col    :", dtypes_col)

df_dummy.select_dtypes(include=['int64', 'float64']).describe()

df_dummy.info()

df_dummy.select_dtypes(include=['float64']).isna().sum()

df_dummy.select_dtypes(include=['int64', 'float64']).describe()

import statistics
import lightgbm as lgb
import catboost as cat
import xgboost as xgb

from sklearn.metrics         import mean_squared_error, \
                                    mean_absolute_error, \
                                    mean_squared_log_error, \
                                    r2_score
from sklearn.pipeline        import Pipeline
from sklearn.preprocessing   import StandardScaler, \
                                    OneHotEncoder
from sklearn.compose         import ColumnTransformer
from sklearn.impute          import SimpleImputer

from sklearn.svm             import SVR
from sklearn.tree            import DecisionTreeRegressor
from sklearn.linear_model    import LinearRegression, \
                                    BayesianRidge, \
                                    Ridge, \
                                    LassoCV
from sklearn.model_selection import KFold, \
                                    cross_val_score, \
                                    train_test_split
from sklearn.ensemble        import GradientBoostingRegressor, \
                                    RandomForestRegressor, \
                                    ExtraTreesRegressor, \
                                    AdaBoostRegressor, \
                                    BaggingRegressor, \
                                    StackingRegressor, \
                                    VotingRegressor
from sklearn.neighbors       import KNeighborsRegressor
from sklearn.neural_network  import MLPRegressor

target = 'sales'
y = df_dummy[target]
X = df_dummy.drop(columns=[target])
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

categorical_cols = X.select_dtypes(include=['object']).columns
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns

numerical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])
categorical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])
preprocessor = ColumnTransformer([
    ('num', numerical_pipeline, numerical_cols),
    ('cat', categorical_pipeline, categorical_cols)
])

models = {
    'ExtraTreesRegressor':       ExtraTreesRegressor(),
    'CatBoostRegressor':         cat.CatBoostRegressor(silent=True),
    'XGBRegressor':              xgb.XGBRegressor(
                                    colsample_bytree=0.4603, 
                                    gamma=0.0468, 
                                    learning_rate=0.05, 
                                    max_depth=3, 
                                    min_child_weight=1.7817, 
                                    n_estimators=2200,
                                    reg_alpha=0.4640, 
                                    reg_lambda=0.8571,
                                    subsample=0.5213
                                 ),
    'LGBMRegressor':             lgb.LGBMRegressor(
                                    objective='regression',
                                    num_leaves=5,
                                    learning_rate=0.05, 
                                    n_estimators=720,
                                    max_bin = 55, 
                                    bagging_fraction = 0.8,
                                    bagging_freq = 5, 
                                    feature_fraction = 0.2319,
                                    feature_fraction_seed=9, 
                                    bagging_seed=9,
                                    min_data_in_leaf =6, 
                                    min_sum_hessian_in_leaf = 11
                                 ),
}

def evaluate_model(pipeline, X, y, kf):
    cv_mae = cross_val_score(pipeline, X, y, cv=kf, scoring='neg_mean_absolute_error')
    cv_mse = cross_val_score(pipeline, X, y, cv=kf, scoring='neg_mean_squared_error')
    cv_r2  = cross_val_score(pipeline, X, y, cv=kf, scoring='r2')
    
    mae = -statistics.mean(cv_mae)
    mse = -statistics.mean(cv_mse)
    rmse = np.sqrt(mse)
    r2 = statistics.mean(cv_r2)
    
    return mae, mse, rmse, r2

results = {}

kf = KFold(n_splits=5, shuffle=True)

for name, model in models.items():
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', model)
    ])
    
    mae, mse, rmse, r2 = evaluate_model(pipeline, X, y, kf)
    
    results[name] = {
        'MAE': mae,
        'MSE': mse,
        'RMSE': rmse,
        'R^2': r2
    }

results_df = pd.DataFrame(results).T
results_df

results_df.reset_index(inplace=True)
rmse_df = results_df[['index', 'RMSE']]

plt.figure(figsize=(12, 4))
sns.barplot(data=rmse_df, x='index', y='RMSE')

plt.title("Model Comparison - RMSE (5-Fold Cross-Validation)")
plt.xlabel("Model")
plt.ylabel("RMSE")
yminlim = rmse_df['RMSE'].min()
ymaxlim = rmse_df['RMSE'].max()
yrange = (ymaxlim - yminlim) * .05
yminlim -= yrange
ymaxlim += yrange
plt.ylim(yminlim, ymaxlim)
plt.xticks(rotation=90)
plt.tight_layout()
plt.show()

best_regressor_name = results_df.sort_values(by=['RMSE']).head(1)['index'].iloc[0]
best_regressor = models[best_regressor_name]

best_model = best_regressor.fit(X_train, y_train)

pred = best_model.predict(X_test)
np.sqrt(mean_squared_error(y_test, pred))

# Submission

submission = pd.DataFrame(test['id'], columns = ['id'])
submission['sales'] = best_model.predict(test_dummy)
submission['sales'] = np.expm1(submission['sales'])
submission.head()

submission.to_csv("submission.csv", index = False, header = True)