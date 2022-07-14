import * as React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReactDOM } from 'react';
import history from '../../../utils/history';
import initialState from '../../../initialState';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
const store = configureStore(initialState, history);
import Home from '../Home';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe("tests for issues home page",()=>{
    it('check for the elements',()=>{
        render(<Provider store={store}><Home /></Provider>)
        expect(screen.getByText(/Issues of Redcarpet's Repository/i)).toBeInTheDocument();
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

    it('check for async call for table',async(done)=>{
        render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>)
        await waitFor(()=>{
            //expect(screen.getByText(/loading/i)).not.toBeInTheDocument();
            expect(screen.getByText(/17 open issues/i)).toBeInTheDocument();
            expect(screen.getByText(/13 closed issues/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/search issues/i)).toBeInTheDocument();
            expect(screen.getByText(/Issue id/i)).toBeInTheDocument();
            expect(screen.getByText(/title/i)).toBeInTheDocument();
            expect(screen.getByText("Status")).toBeInTheDocument();
            expect(screen.getByText(/created at/i)).toBeInTheDocument();
            const b=screen.getByRole("button",{name:/add issue/i})
            fireEvent.click(b);
            const srch=screen.getByPlaceholderText(/search issues/i);
            fireEvent.change(srch,{target: {value: 'how'}});

            const labelRadio = screen.getByLabelText('Open Issues');
            fireEvent.click(labelRadio);
            fireEvent.change(srch,{target: {value: 'how'}});
    
            const labelClosed = screen.getByLabelText('Closed Issues');
            fireEvent.click(labelClosed);
            fireEvent.change(srch,{target: {value: 'how'}}); 
        }) 
       
       done();
    })
})