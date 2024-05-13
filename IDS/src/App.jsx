import { useState } from "react";
import "./App.css";

function App() {
  const [values, setValues] = useState({});
  const [err, setErr] = useState("");
  const [prediction, setPrediction] = useState(-1);
  const cols = [
    "Time",
    "Cardholder Name",
    "Card Number",
    "Card Issuer",
    "CVV",
    "Merchant Name",
    "Merchant Category",
    "Card Holder Age",
    "User Account Age",
    "User Transaction History",
    "Credit Limit",
    "Location of Transaction",
    "IP Address of the device used in the transcation",
    "Shipping Address",
    "Billing Address",
    "User Email Address",
    "Merchant Email Address",
    "User Phone Number",
    "Merchant Phone Number",
    "Country of Issuer",
    "CVV Verification",
    "Payment Gateway",
    "Encryption Type",
    "Merchant Affress",
    "Co-Cardholders",
    "Biometric Verification",
    "Time of the transaction",
    "Device Type",
    "Type of Account linked to the card",
    "Amount",
    "Class",
  ];

  const test1 = [
    0, -1.359807134, -0.072781173, 2.536346738, 1.378155224, -0.33832077,
    0.462387778, 0.239598554, 0.098697901, 0.36378697, 0.090794172,
    -0.551599533, -0.617800856, -0.991389847, -0.311169354, 1.468176972,
    -0.470400525, 0.207971242, 0.02579058, 0.40399296, 0.251412098,
    -0.018306778, 0.277837576, -0.11047391, 0.066928075, 0.128539358,
    -0.189114844, 0.133558377, -0.021053053, 149.62,
  ];

  const test2 = [
    406, -2.312226542, 1.951992011, -1.609850732, 3.997905588, -0.522187865,
    -1.426545319, -2.537387306, 1.391657248, -2.770089277, -2.772272145,
    3.202033207, -2.899907388, -0.595221881, -4.289253782, 0.38972412,
    -1.14074718, -2.830055675, -0.016822468, 0.416955705, 0.126910559,
    0.517232371, -0.035049369, -0.465211076, 0.320198199, 0.044519167,
    0.177839798, 0.261145003, -0.143275875, 0,
  ];

  console.log("prei", prediction);

  const handleInput = (e, key) => {
    const value = e.target.value;

    if (value) {
      setValues({
        ...values,
        [key]: value,
      });
    }

    if (err) {
      setErr("");
    }
  };

  const sendData = async () => {
    const data = values;
    const l = Object.keys(data).length;
    if (l < 30) {
      setErr("not enough values!!");
      return false;
    } else {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: data }),
      });

      const val = await response.json();

      setPrediction(val.prediction);
      console.log(val.prediction);
      console.log(val);
    }
  };

  const fillData = (flag) => {
    let test;
    if (flag == 1) {
      test = test1;
    } else {
      test = test2;
    }

    test.map((ele, idx) => {
      console.log(idx, cols[idx]);
      const inp = document.getElementById(cols[idx]);
      inp.value = ele;

      values[cols[idx]] = ele;
    });
  };

  return (
    <>
      <h1>Credit Card Fraud Detection</h1>
      <h3>{err && err}</h3>
      <h3>
        {prediction !== -1 &&
          prediction === 0 &&
          "The model predicts the transaction is NOT a Fraud transaction"}
      </h3>
      <h3>
        {prediction !== -1 &&
          prediction === 1 &&
          "The model predicts the transaction is a Fraud transaction"}
      </h3>

      <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {Array(15)
            .fill(0)
            .map((ele, idx) => (
              <div>
                <label for={cols[idx]}>{cols[idx]}</label>

                <input
                  type="number"
                  id={cols[idx]}
                  style={{ marginLeft: "12px" }}
                  onChange={(e) => handleInput(e, cols[idx])}
                />
              </div>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {Array(15)
            .fill(0)
            .map((ele, idx) => (
              <div>
                <label for={cols[idx + 15]}>{cols[idx + 15]}</label>
                <input
                  type="number"
                  id={cols[idx + 15]}
                  style={{ marginLeft: "12px" }}
                  onChange={(e) => handleInput(e, cols[idx + 15])}
                />
              </div>
            ))}
        </div>
      </div>

      <button style={{ marginTop: "10px" }} onClick={sendData}>
        Predict
      </button>

      <button style={{ marginTop: "10px" }} onClick={() => fillData(1)}>
        Test 1
      </button>

      <button style={{ marginTop: "10px" }} onClick={() => fillData(0)}>
        Test 2
      </button>
    </>
  );
}

export default App;
