var React = require('react');

var findIndex = require('lodash/array/findIndex');
var utils = require('../lib/utils.js');
var autoHide = require('../decorators/autoHide');
var IndexSelector = autoHide(require('../components/IndexSelector'));

/**
 * Instantiate a dropdown element to choose the current targeted index
 * @param  {String|DOMElement} options.container CSS Selector or DOMElement to insert the widget
 * @param  {Array} options.indices Array of objects defining the different indices to choose from.
 * @param  {String} options.indices[0].name Name of the index to target
 * @param  {String} options.indices[0].label Label displayed in the dropdown
 * @param  {String|String[]} [options.cssClass] Class name(s) to be added to the generated select element
 * @param  {boolean} [hideWhenNoResults=false] Hide the container when no results match
 * @return {Object}
 */
function indexSelector({
    container = null,
    indices = null,
    cssClass,
    hideWhenNoResults = false
  }) {
  var containerNode = utils.getContainerNode(container);

  var usage = 'Usage: indexSelector({container, indices[, cssClass]})';
  if (container === null || indices === null) {
    throw new Error(usage);
  }

  return {
    init: function(state, helper) {
      var currentIndex = helper.getIndex();
      var isIndexInList = findIndex(indices, {name: currentIndex}) !== -1;
      if (!isIndexInList) {
        throw new Error('[stats]: Index ' + currentIndex + ' not present in `indices`');
      }
    },

    render: function({helper, results}) {
      var containerId = containerNode.id;
      React.render(
        <IndexSelector
          containerId={containerId}
          cssClass={cssClass}
          currentIndex={helper.getIndex()}
          indices={indices}
          hideWhenNoResults={hideWhenNoResults}
          hasResults={results.hits.length > 0}
          setIndex={helper.setIndex.bind(helper)}
        />,
        containerNode
      );
    }
  };
}

module.exports = indexSelector;
