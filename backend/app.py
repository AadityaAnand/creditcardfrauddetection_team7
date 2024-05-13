
from flask import Flask, request, jsonify
import pandas as pd, numpy as np
import pickle
from flask_cors import CORS

# load the model from disk
filename = 'model_lr.pkl'
clf = pickle.load(open(filename, 'rb'))

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods = ['POST'])
def predict():
	if request.method == 'POST':
		data = request.json
		values = data.get("values")
		values = [float(v) for k,v in values.items()]

		vect = np.array(values).reshape(1, -1)
		my_prediction = clf.predict(vect)
		print(my_prediction)
		
	return jsonify({"prediction": int(my_prediction[0])})
	    
        


if __name__ == '__main__':
	app.run(debug=True)

	