from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        expenses = data.get('expenses', [])

        if len(expenses) < 2:
            return jsonify({'prediction': 0, 'message': 'Not enough data to predict'})

        # Prepare data for Linear Regression
        # X = Days (1, 2, 3...), y = Expense Amount
        X = np.array(range(len(expenses))).reshape(-1, 1)
        y = np.array(expenses).reshape(-1, 1)

        model = LinearRegression()
        model.fit(X, y)

        # Predict the next day/entry
        next_index = np.array([[len(expenses)]])
        prediction = model.predict(next_index)[0][0]

        return jsonify({'prediction': round(prediction, 2)})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000)

