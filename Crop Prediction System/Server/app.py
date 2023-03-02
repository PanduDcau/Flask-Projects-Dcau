from __future__ import print_function
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report
from sklearn import metrics
from sklearn import tree
import pickle
import requests
import warnings
warnings.filterwarnings('ignore')
import sys
from json import *
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

crop_recommendation_model_path = 'D:/Development/Projects/Crop Prediction/Server/models/XGBoost.pkl'
crop_recommendation_model = pickle.load(open(crop_recommendation_model_path, 'rb'))

fertilizer_recommendation_model_path = 'D:/Development/Projects/Crop Prediction/Server/models/XGpipeline.pkl'
fertilizer_recommendation_model = pickle.load(open(fertilizer_recommendation_model_path, 'rb'))

@app.route("/crop", methods=['POST'])
def members1():

    try:
        N = int(request.json['N'])
        P = int(request.json['P'])
        K = int(request.json['K'])
        ph = float(request.json['Ph'])
        state = request.json['state']
        district = request.json['district']
        start_month = int(request.json['start_month'])
        end_month = int(request.json['end_month'])
    except:
        return jsonify({"crop": 'failed to get info', "data": request.json})
    # return jsonify({"crop": 'printing request', "data": request.json})

    temperature = 40
    humidity = 40
    rainfall = 80

    x = requests.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ district + ' ' + state + '.json?access_token=pk.eyJ1IjoicHJpeWFuc2h1LTIxIiwiYSI6ImNsMDgyM3E0MjA1azAzZG8xeWRiaHdsc2oifQ.oWBiEb85bfsTXNVeQVhWQg')

    coordinates =  x.json()['features'][0]['center']

    y = requests.get('https://api.openweathermap.org/data/2.5/weather?lat='+ str(coordinates[1]) +'&lon='+ str(coordinates[0]) +'&appid=0929da710f897e9bc07b54e8d6f82af2')
    humidity = y.json()['main']['humidity']
    temprature = y.json()['main']['temp']

    df=pd.read_csv("D:/Development/Projects/Crop Prediction/Server/data2.csv")
    # q = df.query('STATE_UT_NAME=="ANDAMAN And NICOBAR ISLANDS" and DISTRICT == "NICOBAR"', inplace = False)
    q = df.query('STATE_UT_NAME == "{}" and DISTRICT == "{}"'.format(state, district), inplace = False)

    total=0
    # l=12

    if start_month <= end_month: 
        l=(end_month-start_month)+1

        for i in range(start_month, end_month+1):
            try:
                total+=int(q[i:i+1].value)
            except:
                total-=1

    elif start_month > end_month:
        l = (end_month+12) - start_month + 1
        
        for i in range(start_month, 13):
            try:
                total+=int(q[i:i+1].value)
            except:
                total-=1
        
        for i in range(1, end_month+1):
            try:
                total+=int(q[i:i+1].value)
            except:
                total-=1

    avg_rainfall = total/l

    data = np.array([[N, P, K, temprature, humidity, ph, avg_rainfall]])

    # data = np.array([[104,18, 30, 23.603016, 60.3, 6.7, 140.91]])
    # data = np.array([[83, 45, 60, 28, 70.3, 7.0, 150.9]])
    my_prediction = crop_recommendation_model.predict(data)
    final_prediction = my_prediction[0]

    return jsonify({"crop": final_prediction, "data": y.json()['main'], 'l':l})

@app.route("/fertilizer", methods=['POST'])
def members2():

    try:
        N = int(request.json['N'])
        P = int(request.json['P'])
        K = int(request.json['K'])
        # ph = float(request.json['Ph'])
        state = request.json['state']
        district = request.json['district']
        moisture = float(request.json['moisture'])
        soil_type = request.json['soil_type']
        crop_type = request.json['crop_type']
        start_month = int(request.json['start_month'])
        end_month = int(request.json['end_month'])
    except:
        return jsonify({"crop": 'failed to get info2', "data": request.json})

    temperature = 40
    humidity = 40
    rainfall = 80

    x = requests.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ district + ' ' + state + '.json?access_token=pk.eyJ1IjoicHJpeWFuc2h1LTIxIiwiYSI6ImNsMDgyM3E0MjA1azAzZG8xeWRiaHdsc2oifQ.oWBiEb85bfsTXNVeQVhWQg')

    coordinates =  x.json()['features'][0]['center']

    y = requests.get('https://api.openweathermap.org/data/2.5/weather?lat='+ str(coordinates[1]) +'&lon='+ str(coordinates[0]) +'&appid=0929da710f897e9bc07b54e8d6f82af2')

    humidity = y.json()['main']['humidity']
    temprature = y.json()['main']['temp']

    df=pd.read_csv("D:/Development/Projects/Crop Prediction/Server/data2.csv")
    q = df.query('STATE_UT_NAME=="ANDAMAN And NICOBAR ISLANDS" and DISTRICT == "NICOBAR"', inplace = False)
    # q = df.query('STATE_UT_NAME == "{}" and DISTRICT == "{}"'.format(state, district), inplace = False)

    # total=0
    # for i in range(len(q)):
    #     total+=int(q[i:i+1].value)
    # avg_rainfall = total/len(q)

    total=0
    # l=12
    if start_month <= end_month: 
        l=(end_month-start_month)+1

        for i in range(start_month, end_month+1):
            try:
                total+=int(q[i:i+1].value)
            except:
                total-=1
            
    elif start_month > end_month:
        l = (end_month+12) - start_month + 1
        
        for i in range(start_month, 13):
            try:
                total+=int(q[i:i+1].value)
            except:
                total-=1
        
        for i in range(1, end_month+1):
            try:
                total+=int(q[i:i+1].value)
            except:
                total-=1
    # for i in range(x, y+1):
    #     k = i
    #     if k>12:
    #         k=k-12
    #     total+=int(q[k:k+1].value)
    # for i in range(len(q)):
    #     total+=int(q[i:i+1].value)

    # l=12
    avg_rainfall = total/l

    data = np.array([[ avg_rainfall, humidity, moisture, soil_type, crop_type, N, K, P ]])

    # data = np.array([[26, 52, 38, 4, 3,	37,	0, 0 ]])

    my_prediction = fertilizer_recommendation_model.predict(data)
    final_prediction = my_prediction[0]
    # final_prediction = 'dummie'

    
    fertname = {"0": "10-26-26", "1": "14-35-14", "2": "17-17-17", "3": "20-20", "4": "28-28", "5": "DAP", "6": "Urea"}


    # return jsonify({"crop": fertname[final_prediction], "data": data.tolist()})
    return jsonify({"crop": str(fertname[ str(final_prediction)]), "data": fertname})

if __name__ == "__main__":
    app.run(debug=True)