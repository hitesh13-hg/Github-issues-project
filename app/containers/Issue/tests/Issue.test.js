import * as React from 'react'
import "@testing-library/jest-dom";
import { render, screen, waitFor ,fireEvent} from '@testing-library/react';
import Issue from '../Issue';
import { BrowserRouter } from 'react-router-dom';
import initialState from '../../../initialState';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
const store = configureStore(initialState, history);

export default function Iss (){
  return (
    <div>hello world</div>
  )
}


describe("Tests for Issue details Page",()=>{
    it('basic test for working',()=>{
        expect(true).toEqual(true);
    })

    it('Tests for paragraph component', async (done)=>{
      const id = '1221349943';
      const idc='1211568412';
      render(<BrowserRouter history={history}><Provider store={store}><Issue match = {{params :{id}}}/></Provider></BrowserRouter>);
      expect(screen.getByText(`Issue #${id}`)).toBeInTheDocument();
      await waitFor(()=>{
        expect(screen.getByText(/:autolink option adds non UTF-8 chars when email is next to Japanese text/i)).toBeInTheDocument();
        const b=screen.getByRole("button",{name:/open issue/i})
        fireEvent.click(b);
      }) 
      done();
    })

    it('Tests for paragraph component closed', async (done)=>{
      const id='1211568412';
      render(<BrowserRouter history={history}><Provider store={store}><Issue match = {{params :{id}}}/></Provider></BrowserRouter>);
      expect(screen.getByText(`Issue #${id}`)).toBeInTheDocument();
      await waitFor(()=>{
        const b=screen.getByRole("button",{name:/closed issue/i})
        fireEvent.click(b);
      }) 
      done();
    })
    
})

