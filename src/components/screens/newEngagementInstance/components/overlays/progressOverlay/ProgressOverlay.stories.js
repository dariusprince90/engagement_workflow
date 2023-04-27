import { useEffect } from 'react';
import ProgressOverlay from './ProgressOverlay';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Overlays/ProgressOverlay',
  component: ProgressOverlay,

  args: {
    alertType: 'info',
    message: 'Doing something...'
  },

  argTypes: {
    alertType: { control: 'select' },

    message: {
      table: { type: { summary: 'string' } },
      control: 'text'
    }
  },

  parameters: {
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'A full-screen overlay which displays progress information' }
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

    <h4>Curabitur ut aliquam lectus</h4>
    <p>
      Nam et vehicula elit, vitae ultricies est. Fusce convallis neque eget velit rutrum, varius egestas quam porttitor.
      Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean
      euismod commodo justo ac pulvinar. Nulla facilisi. Nunc mollis tempus massa, nec rutrum libero tempus at. Nullam
      pulvinar eros quis tortor maximus luctus. In vitae tellus enim. Sed fermentum auctor ex, non convallis arcu
      maximus at. Nunc elementum arcu at eros ultricies molestie. Aenean ut justo turpis.
    </p>

    <h4>Pellentesque sed fringilla enim</h4>
    <p>
      Fusce metus dui, ultricies sit amet metus ut, consectetur sollicitudin nibh. Sed tempor rutrum turpis ac dictum.
      Nullam porta congue quam non finibus. Proin et odio dictum, hendrerit tortor non, feugiat nulla. Sed pretium
      accumsan ligula id vehicula. Sed vel turpis purus. Donec sollicitudin nisi odio, sed fringilla ligula viverra nec.
      Vestibulum diam diam, laoreet eget porta nec, imperdiet at leo. Donec quis orci id magna congue viverra. Nam
      posuere lorem nec nisi sollicitudin cursus. Etiam imperdiet ultricies sem eget lobortis.
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

  const { alertType, message } = args;
  const props = { alertType, message };
  return <ProgressOverlay {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});
