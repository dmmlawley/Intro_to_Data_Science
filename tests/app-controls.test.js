const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const match = html.match(/<script>\s*([\s\S]*)\s*<\/script>\s*<\/body>/);
if (!match) {
  throw new Error('Inline app script not found');
}

class FakeElement {
  constructor(id) {
    this.id = id;
    this._innerHTML = '';
    this.textContent = '';
    this.value = '';
    this.min = '';
    this.max = '';
    this.step = '';
    this.listeners = {};
    this.options = [];
  }

  set innerHTML(value) {
    this._innerHTML = value;
    if (value === '') {
      this.options = [];
      this.value = '';
    }
  }

  get innerHTML() {
    return this._innerHTML;
  }

  add(option) {
    this.options.push(option);
    if (!this.value) {
      this.value = option.value;
    }
  }

  addEventListener(type, handler) {
    this.listeners[type] = handler;
  }
}

global.Option = function Option(text, value) {
  return { text, value };
};

const ids = [
  'datasetSelect', 'datasetDescription', 'questionSelect', 'questionGuidance', 'filterSelect',
  'rangeInput', 'rangeMeta', 'sortSelect', 'chartTypeSelect', 'xFieldSelect', 'yFieldSelect',
  'summaryGrid', 'chartNote', 'chartStatus', 'findingText', 'comparisonText', 'misleadingText',
  'tableCaption', 'tableHost', 'pythonCode', 'chartCanvas'
];
const elements = Object.fromEntries(ids.map(id => [id, new FakeElement(id)]));
elements.chartTypeSelect.add(new Option('Bar chart', 'bar'));
elements.chartTypeSelect.add(new Option('Histogram', 'histogram'));
elements.chartTypeSelect.add(new Option('Scatter plot', 'scatter'));

global.document = {
  getElementById(id) {
    return elements[id];
  }
};

eval(match[1]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(elements.datasetSelect.options.length === 3, 'expected 3 dataset options');
assert(elements.questionSelect.options.length === 3, 'expected 3 question options for initial dataset');
assert(elements.chartStatus.textContent.length > 0, 'expected initial chart status text');

elements.datasetSelect.value = 'climate';
elements.datasetSelect.listeners.change();
assert(/air quality/i.test(elements.datasetDescription.textContent), 'climate dataset description should load');
assert(/at most/i.test(elements.rangeMeta.textContent), 'climate threshold text should use at most');
assert(elements.filterSelect.options.length === 3, 'climate dataset should reset filter options to all + 2 policies');

elements.chartTypeSelect.value = 'bar';
elements.xFieldSelect.value = 'cycle_journeys';
elements.chartTypeSelect.listeners.change();
assert(elements.xFieldSelect.value === 'town', 'bar chart should normalize x-axis back to category field');
assert(/Bar chart updated/i.test(elements.chartStatus.textContent), 'bar chart update should refresh status text');
assert(/sns\.barplot/.test(elements.pythonCode.textContent), 'python snippet should include barplot example');

console.log('app-controls.test.js passed');
