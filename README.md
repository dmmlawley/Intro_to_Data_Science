# Interactive Data Science Studio

This repository now contains a lightweight browser-based app for **Weeks 2 and 3** of a short introductory Data Science course for **16-18 year olds**.

## What the app teaches

### Week 2 · Exploring Data with Python and Pandas
- import and explore datasets using Pandas-style thinking
- filter, sort and summarise data
- use descriptive statistics to answer research questions

### Week 3 · Visualising Data and Finding Patterns
- select appropriate visualisations for different data types
- identify patterns, trends, correlations and outliers
- evaluate how visualisations can support or mislead interpretation

## What students can do
- choose between multiple relevant datasets
- investigate a challenge question
- filter records and raise evidence thresholds
- inspect summary statistics and a ranked data table
- switch between bar charts, histograms and scatter plots
- review matching Python, Pandas and Seaborn code for the same investigation

## Included datasets
The app includes three built-in classroom-friendly datasets:
- college achievement and wellbeing
- town transport and air quality
- student clubs, confidence and project success

These built-in datasets are generated directly inside `index.html`. A later extension could swap that generated data for teacher-supplied CSV files.

## Running the app
No build step is required.

### Option 1: open directly
Open `index.html` from the repository folder in a browser.

### Option 2: serve locally
From the repository root run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Teaching notes
- The interface is designed to let pupils investigate data before writing code.
- The Python panel shows the equivalent Pandas/Seaborn workflow, so teachers can bridge from interactive exploration into notebooks or live coding.
- The peer review prompts support discussion about misleading visualisations and stronger evidence.
