import React from 'react'; 
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import {Home} from './Home';

test('renders Search Bar',()=>{
    const component = render(<Home/>)
    component.getByText('Search')
    // console.log(component)
})
