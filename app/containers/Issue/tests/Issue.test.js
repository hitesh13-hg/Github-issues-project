import * as React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Issue from '../Issue'

describe("Tests for Issue details Page",()=>{
    it('basic test for working',()=>{
        expect(true).toEqual(true);
    })

    // it('Tests for heading component',()=>{
    //     render(<Issue />)
    //     const heading = screen.getByRole("heading",{level : 3});
    //     expect(heading).toBeInTheDocument();
    // })

    // it('Tests for paragraph component',()=>{
    //     render(<Issue />)
    //     const para = screen.getByTestId("issueBody");
    //     expect(para).toBeInTheDocument();
    // })

    //TODO UT for CapButton(custom components)
    
})

