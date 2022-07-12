import * as React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';
describe("tests for issues home page",()=>{
    it('check for the elements',()=>{
        render(<Home />)
        expect(screen.getByText(/Issues of Redcarpet's Repository/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/search issues/i)).toBeInTheDocument();
        expect(screen.getByText(/17 open issues/i)).toBeInTheDocument();
        expect(screen.getByText(/13 closed issues/i)).toBeInTheDocument();
        
    })
})