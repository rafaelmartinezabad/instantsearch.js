import { storiesOf } from 'dev-novel';
import { wrapWithHitsAndJquery } from '../../utils/wrap-with-hits.js';
import * as widgets from '../widgets/index.js';

const stories = storiesOf('PriceRanges');

export default () => {
  stories.add(
    'default',
    wrapWithHitsAndJquery(containerNode => {
      window.search.addWidget(
        widgets.priceRanges({
          containerNode,
          attributeName: 'price',
        })
      );
    })
  );
};
