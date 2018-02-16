import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
