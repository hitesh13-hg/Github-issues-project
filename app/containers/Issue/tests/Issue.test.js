import * as React from 'react'
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
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

    it('Tests for paragraph component',()=>{
      const id = '1221349943';
      render(<BrowserRouter history={history}><Provider store={store}><Issue match = {{params :{id}}}/></Provider></BrowserRouter>)
      const heading = screen.getByRole("heading",{level : 3});
      expect(heading).toBeInTheDocument();
    })
    
})

