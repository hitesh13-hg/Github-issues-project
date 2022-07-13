import * as React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import { ReactDOM } from 'react';
import history from '../../../utils/history';
import initialState from '../../../initialState';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
const store = configureStore(initialState, history);
import Home from '../Home';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import { BrowserRouter } from 'react-router-dom';

describe("tests for issues home page",()=>{
    it('check for the elements',()=>{
        render(<Provider store={store}><Home /></Provider>)
        expect(screen.getByText(/Issues of Redcarpet's Repository/i)).toBeInTheDocument();
       //expect(screen.getByPlaceholderText(/Search issues/i)).toBeInTheDocument();
        
    })

    it('chech for filters',()=>{
         render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>)
         

        const labelRadio = screen.getByLabelText('Open Issues');
        fireEvent.click(labelRadio);
        expect(labelRadio.checked).toEqual(true);

        const labelClosed = screen.getByLabelText('Closed Issues');
        fireEvent.click(labelClosed);
        expect(labelClosed.checked).toEqual(true); 
        
        const reset=screen.getByRole("button",{name:/Reset all/i});
        fireEvent.click(reset)
        expect(labelClosed.checked).toEqual(false);
        
        expect(labelRadio.checked).toEqual(false); 

    })

    it('check for async call for table',()=>{
        //render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>)

        //await waitFor(()=>expect(screen.getByText(/open issues/i)).toBeInTheDocument()) 
        act(async ()=>{
            await render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>)
        })
        expect(screen.getByText(/17 open issues/i)).toBeInTheDocument()

    })


})