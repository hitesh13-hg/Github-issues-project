import * as React from 'react'
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Issue from '../Issue';

export default function Iss (){
  return (
    <div>hello world</div>
  )
}


describe("Tests for Issue details Page",()=>{
    it('basic test for working',()=>{
        expect(true).toEqual(true);
    })

    it('Tests for heading component',()=>{
        render(<Iss />)
        screen.debug();
        // const heading = screen.getByRole("heading",{level : 3});
        // expect(heading).toBeInTheDocument();
    })

    // it('Tests for paragraph component',()=>{
    //     render(<Issue />)
    //     const para = screen.getByTestId("issueBody");
    //     expect(para).toBeInTheDocument();
    // })
    
})

