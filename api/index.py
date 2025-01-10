# api/index.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
from datetime import datetime

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # Sample tourism data
# monthly_visitors = [
#     {"month": "2023-01", "visitors": 45000, "domestic": 30000, "international": 15000},
#     {"month": "2023-02", "visitors": 48000, "domestic": 32000, "international": 16000},
#     # Add more months...
# ]
# Sample tourism data
monthly_visitors = [
    {"month": "2023-01", "visitors": 45000, "domestic": 30000, "international": 15000, "avg_stay_days": 4.2},
    {"month": "2023-02", "visitors": 48000, "domestic": 32000, "international": 16000, "avg_stay_days": 4.5},
    {"month": "2023-03", "visitors": 52000, "domestic": 35000, "international": 17000, "avg_stay_days": 4.8},
    {"month": "2023-04", "visitors": 55000, "domestic": 37000, "international": 18000, "avg_stay_days": 5.0},
    {"month": "2023-05", "visitors": 60000, "domestic": 40000, "international": 20000, "avg_stay_days": 5.2},
    {"month": "2023-06", "visitors": 75000, "domestic": 50000, "international": 25000, "avg_stay_days": 5.5},
    {"month": "2023-01", "visitors": 45000, "domestic": 30000, "international": 15000},
    {"month": "2023-02", "visitors": 48000, "domestic": 32000, "international": 16000},
    # Add more months...
]

visitor_demographics = {
    "age_groups": [
        {"group": "18-24", "percentage": 15},
        {"group": "25-34", "percentage": 30},
        {"group": "35-44", "percentage": 25},
        {"group": "45-54", "percentage": 20},
        {"group": "55+", "percentage": 10}
    ],
    "purpose": [
        {"type": "Leisure", "percentage": 65},
        {"type": "Business", "percentage": 15},
        {"type": "Family Visit", "percentage": 12},
        {"type": "Education", "percentage": 8}
    ]
}


popular_destinations = [
    {"name": "Banff National Park", "visitors": 120000, "rating": 4.8},
    {"name": "Lake Louise", "visitors": 90000, "rating": 4.9},
    {"name": "Jasper National Park", "visitors": 85000, "rating": 4.7},
]

@app.get("/")
async def root():
    return {"message": "Tourism API is running"}

@app.get("/api/visitors")
async def get_visitors():
    return monthly_visitors

@app.get("/api/demographics")
async def get_demographics():
    return visitor_demographics

@app.get("/api/popular-destinations")
async def get_popular_destinations():
    return popular_destinations