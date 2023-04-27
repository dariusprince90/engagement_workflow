import { useEffect } from 'react';

import ScreenOverlay from './ScreenOverlay';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Overlays/ScreenOverlay',
  component: ScreenOverlay,

  args: {
    children: 'this is some sample content'
  },

  argTypes: {
    children: {
      table: { type: { summary: 'string' } },
      control: 'text'
    }
  },

  parameters: {
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: {
        component:
          'A full-screen overlay which displays some content. ' +
          'The content is usually some type of alert or other component.'
      }
    }
  },

  decorators: [
    (story) => (
      <div className="new-engagement-instance-screen">
        {content}
        {story()}
      </div>
    )
  ]
};

// **********************************************************************
// * additional template vars

const content = (
  <div className="container-fluid">
    <h4>Phasellus venenatis nibh a interdum commodo</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae blandit nisi. Nunc lacinia imperdiet risus in
      vehicula. Ut pulvinar felis metus, et fermentum diam mollis non. Maecenas vulputate, leo vel posuere vulputate, ex
      quam vehicula ex, non efficitur dolor nisi eu lacus. Phasellus volutpat consequat diam, vulputate ullamcorper
      erat. Cras sollicitudin faucibus nunc eu faucibus. Donec consectetur venenatis turpis. Mauris ac erat a ex
      malesuada pharetra id vel leo. Maecenas at nisi in ex tristique vehicula. Ut vitae pellentesque tortor, eget
      ultricies tortor. Aliquam vitae mauris molestie, vehicula eros vel, suscipit leo. Ut sed ante posuere, vestibulum
      mi at, tincidunt sapien. Praesent et diam ut ipsum congue fermentum at sit amet justo.
    </p>
  </div>
);

// **********************************************************************
// * functions

// **********************************************************************
// * template

const Template = (args) => {

  // add some margin to the overlay so we have access to the "show code" button
  useEffect(() => {
    const overlays = document.getElementsByClassName('screen-overlay');
    for (let ix = 0; ix < overlays.length; ix++) {
      overlays[ix].style.marginBottom = '2rem';
    }
  }, []);

  const { children } = args;
  const props = { children };
  return <ScreenOverlay {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});

// **********************************************************************
// * with alert content

export const WithAlertContent = Template.bind({});
WithAlertContent.args = { children: <div className="alert alert-info">This is a sample alert.</div> };
WithAlertContent.parameters = { docs: { description: { story: 'Screen overlay with an alert as the content.' } } };
