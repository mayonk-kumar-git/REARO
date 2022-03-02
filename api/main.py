from flask import Flask, request, jsonify
from flask_restful import Api
import numpy as np
import pandas as pd
import pickle as pkl

app = Flask(__name__)
api = Api(app)

data = pd.read_csv('Cleaned_data.csv')
pipe = pkl.load(open("RidgeModel.pkl", 'rb'))


@app.route('/predict/<string:location>/<int:total_sqft>/<int:bath>/<int:bhk>', methods=['GET'])
def predict_price(location, total_sqft, bath, bhk):
    input_data = pd.DataFrame([[location, total_sqft, bath, bhk]],
                              columns=['location', 'total_sqft', 'bath', 'bhk'])
    prediction = pipe.predict(input_data)[0]
    prediction = prediction * 1e5
    prediction = np.round(prediction, 2)
    return{"location": location, "total_sqft": total_sqft, "bath": bath, "bhk": bhk, "prediction": prediction}


@app.route('/locations', methods=['GET'])
def unique_locations():
    uni_loc = (data['location'].unique()).tolist()
    uni_loc_return = []

    i = 0
    for los in uni_loc:
        uni_loc_return.append(
            {'id': i, 'label': los})
        i = i+1

    return (jsonify({"locations": uni_loc_return}))


# ------------------------------------------------------------------
# --------------Very Very Important ------------------------------
# if you want to link your Flask or any custome API with your app running on an emulator then make sure the "host" on which the emulator is running matches with the "host" of your api
# also make sure the port on which your app is runnig must not match with port of your api (infact for every application the port must be unique)
# Now the main question where to get this host. There are a couple of different ways you can get it ....
# 1.(the most simple option according to me) while you run your react native app by using "npm start" or any other way (expo start or yarn somethhing) you get a message Opening exe://<host>:<port> this is the host you are actually looking for. (you can find it below the QR code in the powershell saying Waiting exe://<host>:<port>)
# 2. (most accurate in my openion) follow the steps: start -> (search) network status -> (under Advanced network setting) change adapter options -> (from all the options select the option that your are currently connected to) -> (under general, connections) Details... -> IPv4 Address (there are other options also related to IPv4 but we are only interested in the specfic "IPv4 Address") ---- this IPv4 Address is the <host> you must host your api on
# 3. type "ipconfig" in your powershell --  you get a lot of option but we are looking for IPv4 Address (but there are two different IPv4 Address values so i generally dont prefer this one)
# --------------------------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000, host="192.168.94.218")
