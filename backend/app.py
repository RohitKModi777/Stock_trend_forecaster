"""
app.py - Stock Trend Forecaster REST API Server
Flask backend providing real-time stock prediction telemetry,
model comparisons, historical validation audits, and asset summaries.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict_stock, get_history, get_summary
from data_loader import ASSET_PROFILES

app = Flask(__name__)
application = app  # Standard WSGI entrypoint alias
# Enable Cross-Origin Resource Sharing for frontend client access
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "online",
        "service": "StockTrend AI Telemetry & Quantitative Forecasting Engine",
        "version": "4.2.0",
        "endpoints": {
            "/predict?ticker={ticker}": "Multi-model next-day price forecast and corridors",
            "/history?ticker={ticker}": "Trailing session audit trail and forecast validation logs",
            "/summary?ticker={ticker}": "Market summary, 52-week bounds, and day volume",
            "/tickers": "List of calibrated benchmark stock assets"
        },
        "default_benchmark": "AAPL",
        "supported_models": ["LSTM (Keras)", "Ridge Regression", "XGBoost / GradientBoosting", "ARIMA", "TimesFM 3.0"]
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


@app.route("/tickers", methods=["GET"])
def get_tickers():
    tickers = list(ASSET_PROFILES.keys())
    return jsonify({"tickers": tickers}), 200


@app.route("/predict", methods=["GET"])
def predict_endpoint():
    ticker = request.args.get("ticker", "AAPL").strip()
    try:
        data = predict_stock(ticker)
        return jsonify(data), 200
    except Exception as e:
        app.logger.error(f"Error forecasting {ticker}: {e}")
        return jsonify({
            "error": f"Failed to compute prediction for ticker '{ticker}': {str(e)}",
            "ticker": ticker
        }), 500


@app.route("/history", methods=["GET"])
def history_endpoint():
    ticker = request.args.get("ticker", "AAPL").strip()
    try:
        data = get_history(ticker)
        return jsonify(data), 200
    except Exception as e:
        app.logger.error(f"Error fetching history for {ticker}: {e}")
        return jsonify({
            "error": f"Failed to retrieve history for ticker '{ticker}': {str(e)}",
            "ticker": ticker
        }), 500


@app.route("/summary", methods=["GET"])
def summary_endpoint():
    ticker = request.args.get("ticker", "AAPL").strip()
    try:
        data = get_summary(ticker)
        return jsonify(data), 200
    except Exception as e:
        app.logger.error(f"Error fetching summary for {ticker}: {e}")
        return jsonify({
            "error": f"Failed to retrieve summary for ticker '{ticker}': {str(e)}",
            "ticker": ticker
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"[*] StockTrend AI Telemetry API running on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)
